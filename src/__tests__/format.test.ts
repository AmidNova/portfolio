import { formatMonth, formatPeriod } from "../lib/format";

describe("format", () => {
  it("laisse une année seule telle quelle", () => {
    expect(formatMonth("2024", "fr")).toBe("2024");
  });

  it("formate un mois selon la langue", () => {
    expect(formatMonth("2023-06", "en")).toBe("Jun 2023");
    expect(formatMonth("2023-06", "fr")).toBe("juin 2023");
  });

  it("formate une période, en cours comprise", () => {
    expect(formatPeriod({ start: "2021", end: "2024" }, "fr", "Aujourd'hui")).toBe("2021 — 2024");
    expect(formatPeriod({ start: "2024-09", end: null }, "en", "Present")).toBe("Sep 2024 — Present");
  });

  it("ne répète pas une période d'un seul point", () => {
    expect(formatPeriod({ start: "2025", end: "2025" }, "fr", "")).toBe("2025");
  });
});
