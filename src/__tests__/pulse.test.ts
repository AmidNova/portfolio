import { describe, expect, it } from "vitest";
import { isWikipediaEdit, pushSample, ratePerMinute, sparklinePath, sparklinePoints } from "../lib/pulse";

describe("isWikipediaEdit", () => {
  it("accepts edits on any Wikipedia language edition", () => {
    expect(isWikipediaEdit({ type: "edit", server_name: "fr.wikipedia.org" })).toBe(true);
    expect(isWikipediaEdit({ type: "edit", server_name: "en.wikipedia.org" })).toBe(true);
  });

  it("rejects other projects, other change types and malformed payloads", () => {
    expect(isWikipediaEdit({ type: "edit", server_name: "www.wikidata.org" })).toBe(false);
    expect(isWikipediaEdit({ type: "log", server_name: "fr.wikipedia.org" })).toBe(false);
    expect(isWikipediaEdit({ type: "edit" })).toBe(false);
    expect(isWikipediaEdit(null)).toBe(false);
    expect(isWikipediaEdit("edit")).toBe(false);
  });
});

describe("pushSample", () => {
  it("appends and keeps only the most recent samples, without mutating the input", () => {
    const series = [1, 2, 3];
    expect(pushSample(series, 4, 3)).toEqual([2, 3, 4]);
    expect(series).toEqual([1, 2, 3]);
  });
});

describe("ratePerMinute", () => {
  it("extrapolates per-second samples to a per-minute rate", () => {
    expect(ratePerMinute([10, 20])).toBe(900);
    expect(ratePerMinute([])).toBe(0);
  });
});

describe("sparklinePoints", () => {
  it("scales values to the box with a small inset", () => {
    expect(sparklinePoints([0, 10], 100, 24, 2)).toEqual([
      [0, 22],
      [100, 2],
    ]);
  });

  it("draws a partially filled window from the left, so the line grows as data arrives", () => {
    expect(sparklinePoints([5, 5], 100, 24, 3)).toEqual([
      [0, 2],
      [50, 2],
    ]);
  });
});

describe("sparklinePath", () => {
  it("joins points into an SVG path", () => {
    expect(
      sparklinePath([
        [0, 22],
        [100, 2],
      ]),
    ).toBe("M0 22 L100 2");
  });

  it("returns an empty path for no data", () => {
    expect(sparklinePath([])).toBe("");
  });
});
