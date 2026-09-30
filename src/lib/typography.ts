const NNBSP = " "; // narrow no-break space
const NBSP = " ";

/**
 * French typographic spacing: `: ; ! ?` never wrap onto a new line away from
 * the word they follow, and guillemets hug their content.
 */
export function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;!?])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ »/g, `${NBSP}»`);
}

/** Returns a deep copy of `value` with `fn` applied to every string leaf. */
export function mapStrings<T>(value: T, fn: (s: string) => string): T {
  if (typeof value === "string") return fn(value) as T;
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn)) as T;
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn)])) as T;
  }
  return value;
}
