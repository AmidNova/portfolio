import { describe, expect, it } from "vitest";
import { frenchSpacing, mapStrings } from "../lib/typography";

const NNBSP = " ";
const NBSP = " ";

describe("frenchSpacing", () => {
  it("binds high punctuation to the preceding word with a narrow no-break space", () => {
    expect(frenchSpacing("Stack : Laravel ; React ! Vraiment ?")).toBe(
      `Stack${NNBSP}: Laravel${NNBSP}; React${NNBSP}! Vraiment${NNBSP}?`,
    );
  });

  it("leaves URLs and punctuation without a leading space alone", () => {
    expect(frenchSpacing("https://amidousoro.me")).toBe("https://amidousoro.me");
    expect(frenchSpacing("Bonjour!")).toBe("Bonjour!");
  });

  it("uses no-break spaces inside guillemets", () => {
    expect(frenchSpacing("« bonjour »")).toBe(`«${NBSP}bonjour${NBSP}»`);
  });
});

describe("mapStrings", () => {
  it("transforms every string in a nested structure without mutating it", () => {
    const source = { a: "x", b: ["y", { c: "z" }], n: 3 };
    const result = mapStrings(source, (s) => s.toUpperCase());

    expect(result).toEqual({ a: "X", b: ["Y", { c: "Z" }], n: 3 });
    expect(source).toEqual({ a: "x", b: ["y", { c: "z" }], n: 3 });
  });
});
