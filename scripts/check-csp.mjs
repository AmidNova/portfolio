// CI guard: the CSP pins the inline theme script by hash. Editing that script without
// updating public/_headers and vercel.json would silently block it in production.
import { readFileSync } from "node:fs";
import { cspFromHeadersFile, missingHashes } from "./csp.mjs";

const html = readFileSync("dist/index.html", "utf8");
const cloudflare = cspFromHeadersFile(readFileSync("public/_headers", "utf8"));
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"))
  .headers?.find((rule) => rule.source === "/(.*)")
  ?.headers.find((h) => h.key === "Content-Security-Policy")?.value;

const problems = [];
if (!cloudflare) problems.push("public/_headers has no Content-Security-Policy under /*");
if (!vercel) problems.push("vercel.json has no Content-Security-Policy for /(.*)");
if (cloudflare && vercel && cloudflare !== vercel) problems.push("public/_headers and vercel.json CSPs differ");
for (const hash of cloudflare ? missingHashes(html, cloudflare) : []) {
  problems.push(`inline script hash ${hash} is missing from the CSP`);
}

if (problems.length) {
  for (const p of problems) console.error(`::error::${p}`);
  process.exit(1);
}
console.log("CSP covers every inline script, and both hosts serve the same policy.");
