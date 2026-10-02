// CI guard: the CSP pins the inline theme script by hash. Editing that script without
// updating public/_headers would silently block it in production. Cloudflare serves
// that file and infra/aws builds the CloudFront headers from it: one place to fix.
import { readFileSync } from "node:fs";
import { cspFromHeadersFile, missingHashes } from "./csp.mjs";

const html = readFileSync("dist/index.html", "utf8");
const cloudflare = cspFromHeadersFile(readFileSync("public/_headers", "utf8"));

const problems = [];
if (!cloudflare) problems.push("public/_headers has no Content-Security-Policy under /*");
for (const hash of cloudflare ? missingHashes(html, cloudflare) : []) {
  problems.push(`inline script hash ${hash} is missing from the CSP`);
}

if (problems.length) {
  for (const p of problems) console.error(`::error::${p}`);
  process.exit(1);
}
console.log("CSP covers every inline script.");
