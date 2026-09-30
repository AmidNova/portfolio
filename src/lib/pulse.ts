/** Seconds of history kept for the live sparkline. */
export const PULSE_WINDOW = 60;

/** Vertical inset so the stroke is never clipped at the top or bottom edge. */
const INSET = 2;

interface RecentChange {
  type?: unknown;
  server_name?: unknown;
}

/** True for an edit on any Wikipedia edition — the stream also carries Wikidata, Commons, logs… */
export function isWikipediaEdit(data: unknown): boolean {
  if (typeof data !== "object" || data === null) return false;
  const { type, server_name: server } = data as RecentChange;
  return type === "edit" && typeof server === "string" && server.endsWith(".wikipedia.org");
}

export function pushSample(series: readonly number[], value: number, capacity = PULSE_WINDOW): number[] {
  return [...series, value].slice(-capacity);
}

/** Per-second samples extrapolated to edits per minute. */
export function ratePerMinute(series: readonly number[]): number {
  if (series.length === 0) return 0;
  const total = series.reduce((sum, v) => sum + v, 0);
  return Math.round((total / series.length) * 60);
}

const round = (n: number) => Math.round(n * 10) / 10;

export type Point = [x: number, y: number];

/**
 * Chart coordinates for the series in a window of `capacity` samples: the line
 * draws itself from the left for the first minute, then scrolls.
 */
export function sparklinePoints(
  series: readonly number[],
  width: number,
  height: number,
  capacity = PULSE_WINDOW,
): Point[] {
  const max = Math.max(...series, 1);
  const step = width / Math.max(capacity - 1, 1);
  return series.map((v, i) => [round(i * step), round(height - INSET - (v / max) * (height - 2 * INSET))]);
}

export function sparklinePath(points: readonly Point[]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}
