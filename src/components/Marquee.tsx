import type { ReactNode } from "react";

interface MarqueeProps<T> {
  items: T[];
  keyOf: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** Scroll right-to-left by default; `reverse` flips it so stacked rows cross. */
  reverse?: boolean;
  className?: string;
}

/**
 * Endless row of items. The list is rendered twice and the track slides by half its
 * width, so the loop is seamless; the copy is hidden from assistive tech.
 */
function Marquee<T>({ items, keyOf, renderItem, reverse = false, className = "" }: MarqueeProps<T>) {
  const copy = (hidden: boolean) => (
    <ul className="marquee-copy" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={keyOf(item)} className="shrink-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`} data-reverse={reverse || undefined}>
      <div className="marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

export default Marquee;
