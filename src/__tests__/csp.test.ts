import { inlineScriptHashes, cspFromHeadersFile, missingHashes } from "../../scripts/csp.mjs";

const html = `<head>
<script type="application/ld+json">{"@type":"Person"}</script>
</head><body>
<script>
  document.body.classList.add("dark");
</script>
<script type="module" src="/assets/index.js"></script>
</body>`;

describe("csp", () => {
  it("hache seulement les scripts inline exécutables (pas le JSON-LD ni les scripts externes)", () => {
    const hashes = inlineScriptHashes(html);
    expect(hashes).toHaveLength(1);
    expect(hashes[0]).toMatch(/^'sha256-[A-Za-z0-9+/]+=*'$/);
  });

  it("lit la CSP de la section /* d'un fichier _headers", () => {
    const file = "# comment\n/*\n  Content-Security-Policy: default-src 'self'\n  X-Frame-Options: DENY\n\n/assets/*\n  Cache-Control: immutable\n";
    expect(cspFromHeadersFile(file)).toBe("default-src 'self'");
  });

  it("signale le hash absent de la CSP, et rien quand il y est", () => {
    const [hash] = inlineScriptHashes(html);
    expect(missingHashes(html, "script-src 'self'")).toEqual([hash]);
    expect(missingHashes(html, `script-src 'self' ${hash}`)).toEqual([]);
  });
});
