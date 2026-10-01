import { createHash } from "node:crypto";

// Inline <script> with no src and not a data block (JSON-LD is never executed, so CSP ignores it).
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/g;

/** CSP source expressions ('sha256-…') for every executable inline script in the page. */
export function inlineScriptHashes(html) {
  return [...html.matchAll(INLINE_SCRIPT)].map(
    ([, body]) => `'sha256-${createHash("sha256").update(body).digest("base64")}'`,
  );
}

/** The Content-Security-Policy value of the catch-all `/*` block of a Cloudflare _headers file. */
export function cspFromHeadersFile(text) {
  const block = text.split(/^\/\*\s*$/m)[1]?.split(/\n\s*\n/)[0] ?? "";
  const line = block.split("\n").find((l) => l.trim().startsWith("Content-Security-Policy:"));
  return line ? line.split(":").slice(1).join(":").trim() : undefined;
}

/** Inline-script hashes the policy doesn't allow; empty means the page's scripts will run. */
export function missingHashes(html, csp) {
  return inlineScriptHashes(html).filter((hash) => !csp.includes(hash));
}
