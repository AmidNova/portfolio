import type { Period } from "../data/profile";

export type Lang = "en" | "fr";

const LOCALES: Record<Lang, string> = { en: "en-US", fr: "fr-FR" };

/** "2024" stays "2024"; "2023-06" becomes "Jun 2023" / "juin 2023". */
export function formatMonth(value: string, lang: Lang): string {
  const [year, month] = value.split("-");
  if (!month) return year;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  const label = new Intl.DateTimeFormat(LOCALES[lang], { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
  return label.replace(".", "");
}

export function formatPeriod(period: Period, lang: Lang, presentLabel: string): string {
  const start = formatMonth(period.start, lang);
  const end = period.end === null ? presentLabel : formatMonth(period.end, lang);
  return start === end ? start : `${start} – ${end}`;
}
