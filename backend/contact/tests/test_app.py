import base64
import json

import pytest

from contact.app import Deps, handle

ORIGIN = "https://amidousoro.me"
VALID = {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "message": "Hello, I would like to talk about an internship.",
    "lang": "en",
    "token": "turnstile-token",
}


class Recorder:
    """Fake dependencies: records what the handler stored and sent."""

    def __init__(self, captcha=True, store_fails=False, send_fails=False):
        self.captcha = captcha
        self.store_fails = store_fails
        self.send_fails = send_fails
        self.stored, self.sent, self.captcha_calls = [], [], []

    def deps(self):
        def verify(token, ip, hostname):
            self.captcha_calls.append((token, ip, hostname))
            return self.captcha

        def store(item):
            if self.store_fails:
                raise RuntimeError("dynamodb down")
            self.stored.append(item)

        def send(item):
            if self.send_fails:
                raise RuntimeError("ses down")
            self.sent.append(item)

        return Deps(
            verify_captcha=verify,
            store=store,
            send=send,
            now=lambda: 1_790_000_000,
            new_id=lambda: "msg-1",
            allowed_origins=r"https://(amidousoro\.me|aws\.amidousoro\.me|[a-z0-9-]+\.portfolio-ci3\.pages\.dev)|http://localhost:\d+",
        )


def event(body=VALID, method="POST", origin=ORIGIN, raw=None, b64=False):
    text = raw if raw is not None else json.dumps(body)
    if b64:
        text = base64.b64encode(text.encode()).decode()
    return {
        "requestContext": {"http": {"method": method, "sourceIp": "203.0.113.7"}},
        "headers": {"origin": origin, "content-type": "application/json"} if origin else {},
        "body": text,
        "isBase64Encoded": b64,
    }


def call(ev, rec=None):
    rec = rec or Recorder()
    res = handle(ev, rec.deps())
    return res, json.loads(res["body"]) if res.get("body") else None, rec


# --- happy path ------------------------------------------------------------------


def test_valid_message_is_stored_and_sent():
    res, body, rec = call(event())

    assert res["statusCode"] == 200
    assert body == {"success": True, "data": {"id": "msg-1"}, "error": None}
    assert rec.stored[0]["email"] == "ada@example.com"
    assert rec.sent[0]["id"] == "msg-1"


def test_stored_item_expires_after_90_days_and_keeps_no_ip():
    _, _, rec = call(event())

    item = rec.stored[0]
    assert item["expires_at"] == 1_790_000_000 + 90 * 24 * 3600
    assert "ip" not in item and "203.0.113.7" not in json.dumps(item)


def test_fields_are_trimmed():
    _, _, rec = call(event({**VALID, "name": "  Ada  ", "email": " ada@example.com "}))

    assert rec.stored[0]["name"] == "Ada"
    assert rec.stored[0]["email"] == "ada@example.com"


def test_base64_body_is_decoded():
    res, _, _ = call(event(b64=True))

    assert res["statusCode"] == 200


def test_captcha_checked_with_token_ip_and_page_host():
    _, _, rec = call(event())

    assert rec.captcha_calls == [("turnstile-token", "203.0.113.7", "amidousoro.me")]


# --- CORS ------------------------------------------------------------------------


def test_cors_headers_echo_an_allowed_origin():
    res, _, _ = call(event(origin="https://feat-x.portfolio-ci3.pages.dev"))

    assert res["headers"]["Access-Control-Allow-Origin"] == "https://feat-x.portfolio-ci3.pages.dev"
    assert res["headers"]["Vary"] == "Origin"


def test_preflight_answers_204_without_touching_anything():
    res, _, rec = call(event(method="OPTIONS", raw=""))

    assert res["statusCode"] == 204
    assert "POST" in res["headers"]["Access-Control-Allow-Methods"]
    assert rec.stored == [] and rec.captcha_calls == []


@pytest.mark.parametrize("origin", ["https://evil.example", "https://amidousoro.me.evil.example", None])
def test_unknown_origin_is_refused_without_cors_headers(origin):
    res, body, rec = call(event(origin=origin))

    assert res["statusCode"] == 403
    assert body["error"] == "origin"
    assert "Access-Control-Allow-Origin" not in res["headers"]
    assert rec.stored == []


# --- validation ------------------------------------------------------------------


@pytest.mark.parametrize(
    "patch, field",
    [
        ({"name": ""}, "name"),
        ({"name": "x" * 101}, "name"),
        ({"email": "not-an-email"}, "email"),
        ({"email": "a@b"}, "email"),
        ({"email": "x" * 250 + "@example.com"}, "email"),
        ({"message": "too short"}, "message"),
        ({"message": "x" * 5001}, "message"),
        ({"token": ""}, "token"),
        ({"name": 42}, "name"),
    ],
)
def test_invalid_field_is_rejected_with_its_name(patch, field):
    res, body, rec = call(event({**VALID, **patch}))

    assert res["statusCode"] == 400
    assert body["success"] is False
    assert body["error"] == "invalid"
    assert field in body["data"]["fields"]
    assert rec.stored == [] and rec.captcha_calls == []


def test_header_injection_in_name_is_rejected():
    res, body, _ = call(event({**VALID, "name": "Ada\r\nBcc: victim@example.com"}))

    assert res["statusCode"] == 400
    assert "name" in body["data"]["fields"]


def test_unknown_lang_falls_back_to_english():
    _, _, rec = call(event({**VALID, "lang": "de"}))

    assert rec.stored[0]["lang"] == "en"


@pytest.mark.parametrize("raw", ["not json", "[1, 2]", ""])
def test_malformed_body_is_rejected(raw):
    res, body, _ = call(event(raw=raw))

    assert res["statusCode"] == 400
    assert body["error"] == "invalid"


def test_oversized_body_is_rejected_before_parsing():
    res, body, _ = call(event(raw="x" * 20_000))

    assert res["statusCode"] == 413
    assert body["error"] == "too_large"


def test_other_methods_are_refused():
    res, _, _ = call(event(method="GET", raw=""))

    assert res["statusCode"] == 405


# --- captcha and failures --------------------------------------------------------


def test_failed_captcha_is_refused_and_nothing_is_kept():
    res, body, rec = call(event(), Recorder(captcha=False))

    assert res["statusCode"] == 403
    assert body["error"] == "captcha"
    assert rec.stored == [] and rec.sent == []


def test_message_kept_when_email_fails():
    res, body, rec = call(event(), Recorder(send_fails=True))

    assert res["statusCode"] == 200
    assert body["success"] is True
    assert len(rec.stored) == 1


def test_message_sent_when_storage_fails():
    res, _, rec = call(event(), Recorder(store_fails=True))

    assert res["statusCode"] == 200
    assert len(rec.sent) == 1


def test_error_when_message_is_neither_stored_nor_sent():
    res, body, _ = call(event(), Recorder(store_fails=True, send_fails=True))

    assert res["statusCode"] == 502
    assert body == {"success": False, "data": None, "error": "unavailable"}


# --- Turnstile verification and e-mail body ---------------------------------------

import io  # noqa: E402

from contact import app  # noqa: E402


class FakeResponse(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


def fake_urlopen(answer=None, error=None, sink=None):
    def urlopen(url, data, timeout):
        if sink is not None:
            sink.append((url, data, timeout))
        if error:
            raise error
        return FakeResponse(json.dumps(answer).encode())

    return urlopen


def test_turnstile_accepts_a_success_for_the_same_host(monkeypatch):
    calls = []
    monkeypatch.setattr(app.urllib.request, "urlopen", fake_urlopen({"success": True, "hostname": "amidousoro.me"}, sink=calls))

    assert app._verify_turnstile("s3cr3t", "tok", "203.0.113.7", "amidousoro.me") is True
    url, data, timeout = calls[0]
    assert url == app.TURNSTILE_URL and timeout == 5
    assert b"secret=s3cr3t" in data and b"response=tok" in data and b"remoteip=203.0.113.7" in data


@pytest.mark.parametrize(
    "answer",
    [{"success": False, "hostname": "amidousoro.me"}, {"success": True, "hostname": "evil.example"}, {}],
)
def test_turnstile_refuses_failures_and_tokens_from_another_site(monkeypatch, answer):
    monkeypatch.setattr(app.urllib.request, "urlopen", fake_urlopen(answer))

    assert app._verify_turnstile("s", "tok", "ip", "amidousoro.me") is False


def test_turnstile_unreachable_fails_closed(monkeypatch):
    monkeypatch.setattr(app.urllib.request, "urlopen", fake_urlopen(error=OSError("timeout")))

    assert app._verify_turnstile("s", "tok", "ip", "amidousoro.me") is False


def test_email_text_carries_sender_reply_context_and_message():
    text = app._email_text(
        {"id": "msg-1", "name": "Ada", "email": "ada@example.com", "lang": "fr",
         "origin": "amidousoro.me", "created_at": "2026-10-02T17:00:00Z", "message": "Bonjour !"}
    )

    assert "Ada <ada@example.com>" in text and "msg-1" in text and text.rstrip().endswith("Bonjour !")
