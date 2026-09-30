/**
 * Reads the repo count the build injected (VITE_GITHUB_REPOS). Anything that
 * isn't a positive whole number falls back to the last known value, so a
 * failed API call never shows 0 or NaN.
 */
export function parseRepoCount(raw: string | undefined, fallback: number): number {
  const count = Number(raw);
  return raw && Number.isInteger(count) && count > 0 ? count : fallback;
}
