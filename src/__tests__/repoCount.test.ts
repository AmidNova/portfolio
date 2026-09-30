import { parseRepoCount } from "../lib/repoCount";

describe("parseRepoCount", () => {
  it("garde le nombre lu sur GitHub au build", () => {
    expect(parseRepoCount("14", 11)).toBe(14);
  });

  it("retombe sur la valeur connue quand le build n'a rien pu lire", () => {
    expect(parseRepoCount(undefined, 11)).toBe(11);
    expect(parseRepoCount("", 11)).toBe(11);
  });

  it("refuse une valeur absurde plutôt que d'afficher 0 ou NaN", () => {
    expect(parseRepoCount("abc", 11)).toBe(11);
    expect(parseRepoCount("0", 11)).toBe(11);
    expect(parseRepoCount("-3", 11)).toBe(11);
    expect(parseRepoCount("2.5", 11)).toBe(11);
  });
});
