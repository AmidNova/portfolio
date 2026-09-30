/** Pure helpers behind the projects page filter: derived from the data, so new projects need no code. */

interface Tagged {
  tags: string[];
}

/** Every tag once, most used first, then alphabetically — the filter's chip order. */
export function techOptions(projects: readonly Tagged[]): string[] {
  const counts = new Map<string, number>();
  for (const tag of projects.flatMap((p) => p.tags)) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([a, ca], [b, cb]) => cb - ca || a.localeCompare(b))
    .map(([tag]) => tag);
}

/** Projects that use every selected tech; no selection keeps them all. */
export function filterByTech<T extends Tagged>(projects: readonly T[], selected: readonly string[]): T[] {
  return projects.filter((p) => selected.every((tech) => p.tags.includes(tech)));
}

/** Reads `?tech=A,B` from the URL, dropping anything that is not a known tech. */
export function parseTechParam(param: string | null, known: readonly string[]): string[] {
  if (!param) return [];
  return param.split(",").filter((tech) => known.includes(tech));
}
