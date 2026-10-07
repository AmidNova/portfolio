"""Contact form endpoint: POST /contact on api.amidousoro.me (API Gateway HTTP API -> Lambda).

The request is checked in order — origin, method, size, fields, Turnstile — then the
message is stored in DynamoDB and e-mailed through SES. Either one is enough: a message
is only lost if both fail. Responses use one envelope: {success, data, error}.

`handle` takes its side effects as `Deps`, so the tests run it with fakes;
`handler` is the Lambda entry point and wires the real AWS and Turnstile calls.
"""

from __future__ import annotations

import base64
import json
import logging
import os
import re
import time
import urllib.parse
import urllib.request
import uuid
from dataclasses import dataclass
from typing import Any, Callable

log = logging.getLogger()
log.setLevel(logging.INFO)

MAX_BODY_BYTES = 10_000
RETENTION_SECONDS = 90 * 24 * 3600
NAME_MAX = 100
EMAIL_MAX = 254
MESSAGE_MIN, MESSAGE_MAX = 10, 5000
TOKEN_MAX = 2048
LANGS = {"fr", "en"}
# Deliberately simple: one @, a dot in the domain, no spaces. SES rejects the rest.
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")

Item = dict[str, Any]


@dataclass(frozen=True)
class Deps:
    verify_captcha: Callable[[str, str, str], bool]  # (token, ip, hostname) -> human?
    store: Callable[[Item], None]
    send: Callable[[Item], None]
    now: Callable[[], int]
    new_id: Callable[[], str]
    allowed_origins: str  # regex, matched against the whole Origin header


# --- responses -------------------------------------------------------------------


def _cors(origin: str | None) -> dict[str, str]:
    if not origin:
        return {}
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
    }


def _reply(status: int, origin: str | None, *, data: Any = None, error: str | None = None) -> dict:
    body = {"success": error is None, "data": data, "error": error}
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json", **_cors(origin)},
        "body": json.dumps(body),
    }


# --- validation ------------------------------------------------------------------


def _text(value: Any) -> str | None:
    return value.strip() if isinstance(value, str) else None


def _validate(payload: dict) -> tuple[Item, list[str]]:
    name = _text(payload.get("name"))
    email = _text(payload.get("email"))
    message = _text(payload.get("message"))
    token = _text(payload.get("token"))
    lang = payload.get("lang") if payload.get("lang") in LANGS else "en"

    bad = []
    # The name goes into an e-mail subject: no line breaks or control characters.
    if not name or len(name) > NAME_MAX or CONTROL_CHARS.search(name):
        bad.append("name")
    if not email or len(email) > EMAIL_MAX or not EMAIL_RE.match(email):
        bad.append("email")
    if not message or not MESSAGE_MIN <= len(message) <= MESSAGE_MAX:
        bad.append("message")
    if not token or len(token) > TOKEN_MAX:
        bad.append("token")

    fields = {"name": name, "email": email, "message": message, "lang": lang, "token": token}
    return fields, bad


def _parse(event: dict) -> dict | None:
    raw = event.get("body") or ""
    if event.get("isBase64Encoded"):
        raw = base64.b64decode(raw).decode("utf-8", errors="replace")
    try:
        payload = json.loads(raw)
    except ValueError:
        return None
    return payload if isinstance(payload, dict) else None


# --- the endpoint ----------------------------------------------------------------


def handle(event: dict, deps: Deps) -> dict:
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    origin = headers.get("origin")
    http = event.get("requestContext", {}).get("http", {})

    if not origin or not re.fullmatch(deps.allowed_origins, origin):
        return _reply(403, None, error="origin")
    if http.get("method") == "OPTIONS":
        return {"statusCode": 204, "headers": _cors(origin), "body": ""}
    if http.get("method") != "POST":
        return _reply(405, origin, error="method")
    if len(event.get("body") or "") > MAX_BODY_BYTES:
        return _reply(413, origin, error="too_large")

    payload = _parse(event)
    if payload is None:
        return _reply(400, origin, data={"fields": []}, error="invalid")
    fields, bad = _validate(payload)
    if bad:
        return _reply(400, origin, data={"fields": bad}, error="invalid")

    hostname = urllib.parse.urlsplit(origin).hostname or ""
    if not deps.verify_captcha(fields["token"], http.get("sourceIp", ""), hostname):
        log.info(json.dumps({"event": "captcha_failed"}))
        return _reply(403, origin, error="captcha")

    now = deps.now()
    item: Item = {
        "id": deps.new_id(),
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(now)),
        "expires_at": now + RETENTION_SECONDS,  # DynamoDB TTL deletes it after 90 days
        "name": fields["name"],
        "email": fields["email"],
        "message": fields["message"],
        "lang": fields["lang"],
        "origin": hostname,
    }

    stored = _attempt("store", deps.store, item)
    sent = _attempt("send", deps.send, item)
    # Logs carry the id and the outcome, never the visitor's name, address or text.
    log.info(json.dumps({"event": "message", "id": item["id"], "stored": stored, "sent": sent}))
    if not (stored or sent):
        return _reply(502, origin, error="unavailable")
    return _reply(200, origin, data={"id": item["id"]})


def _attempt(step: str, action: Callable[[Item], None], item: Item) -> bool:
    try:
        action(item)
        return True
    except Exception:  # one failing side keeps the other; the log tells which
        log.exception(json.dumps({"event": f"{step}_failed", "id": item["id"]}))
        return False


# --- real dependencies (Lambda) --------------------------------------------------

TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


def _verify_turnstile(secret: str, token: str, ip: str, hostname: str) -> bool:
    data = urllib.parse.urlencode({"secret": secret, "response": token, "remoteip": ip}).encode()
    try:
        with urllib.request.urlopen(TURNSTILE_URL, data=data, timeout=5) as res:
            result = json.load(res)
    except (OSError, ValueError):
        log.exception(json.dumps({"event": "captcha_unreachable"}))
        return False
    # The token must also have been issued on the page that sent the request.
    return bool(result.get("success")) and result.get("hostname") == hostname


def _email_text(item: Item) -> str:
    return (
        f"From: {item['name']} <{item['email']}>\n"
        f"Language: {item['lang']} · Site: {item['origin']} · {item['created_at']}\n"
        f"Id: {item['id']}\n\n"
        f"{item['message']}\n"
    )


def _real_deps() -> Deps:
    import boto3  # bundled with the Lambda runtime; imported here so tests don't need it

    table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
    ses = boto3.client("sesv2")
    secret = os.environ["TURNSTILE_SECRET"]

    def send(item: Item) -> None:
        ses.send_email(
            FromEmailAddress=os.environ["SENDER"],
            Destination={"ToAddresses": [os.environ["RECIPIENT"]]},
            ReplyToAddresses=[item["email"]],
            Content={
                "Simple": {
                    "Subject": {"Data": f"Portfolio — message from {item['name']}", "Charset": "UTF-8"},
                    "Body": {"Text": {"Data": _email_text(item), "Charset": "UTF-8"}},
                }
            },
        )

    return Deps(
        verify_captcha=lambda token, ip, host: _verify_turnstile(secret, token, ip, host),
        store=lambda item: table.put_item(Item=item),
        send=send,
        now=lambda: int(time.time()),
        new_id=lambda: str(uuid.uuid4()),
        allowed_origins=os.environ["ALLOWED_ORIGINS"],
    )


_deps: Deps | None = None


def handler(event: dict, _context: Any) -> dict:
    global _deps
    if _deps is None:  # built once per Lambda container, reused across requests
        _deps = _real_deps()
    return handle(event, _deps)
