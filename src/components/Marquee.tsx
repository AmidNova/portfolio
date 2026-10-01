import { Pause, Play } from "lucide-react";
import type { ReactNode } from "react";

interface MarqueeProps<T> {
  items: T[];
  keyOf: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** Scroll right-to-left by default; `reverse` flips it so stacked rows cross. */
  reverse?: boolean;
  /** Frozen in place by the card's pause button. */
  paused?: boolean;
  className?: string;
}

/**
 * Endless row of items. The list is rendered twice and the track slides by half its
 * width, so the loop is seamless; the copy is inert and hidden from assistive tech.
 */
function Marquee<T>({ items, keyOf, renderItem, reverse = false, paused = false, className = "" }: MarqueeProps<T>) {
  const copy = (hidden: boolean) => (
    // inert: the copy's links must not be reached twice by keyboard or assistive tech.
    <ul className="marquee-copy" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {items.map((item) => (
        <li key={keyOf(item)} className="shrink-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`} data-reverse={reverse || undefined} data-paused={paused || undefined}>
      <div className="marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

interface MarqueePauseProps {
  paused: boolean;
  onToggle: () => void;
  label: string;
}

/**
 * Pause control for a card's marquees (WCAG 2.2.2: motion longer than 5s can be stopped).
 * Hidden when the visitor asks for reduced motion, since nothing moves then.
 */
export function MarqueePause({ paused, onToggle, label }: MarqueePauseProps) {
  const Icon = paused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className="grid size-8 shrink-0 place-items-center rounded-lg border border-line text-subtle transition-colors hover:text-fg motion-reduce:hidden"
    >
      <Icon size={14} aria-hidden="true" />
    </button>
  );
}

export default Marquee;
