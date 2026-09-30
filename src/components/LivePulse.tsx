import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LangContext";
import { useWikiPulse } from "../hooks/useWikiPulse";
import { sparklinePath, sparklinePoints } from "../lib/pulse";

const WIDTH = 56;
const HEIGHT = 24;

interface NetworkInformation {
  saveData?: boolean;
}

const prefersSavingData = () =>
  (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;

/** Streams only while on screen and in a visible tab — the feed is ~70 kB/s. */
function useShouldStream(ref: React.RefObject<HTMLElement | null>): boolean {
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(() => document.visibilityState === "visible");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return inView && visible && !prefersSavingData();
}

/** The site's signature: Wikipedia's live edit rate, drawn as it happens. */
function LivePulse() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { status, series, perMinute } = useWikiPulse(useShouldStream(ref));

  // Fails quietly: no stream, no signature, no error message on a CV.
  if (status === "error") return null;

  const live = status === "live";
  const points = sparklinePoints(series, WIDTH, HEIGHT);
  const head = points.at(-1);
  const rate = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(perMinute);

  return (
    <div
      ref={ref}
      title={t.hero.pulse.title}
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-subtle transition-opacity duration-700 ${
        live ? "opacity-100" : "opacity-0"
      }`}
    >
      {live && (
        <span>
          <span className="font-medium tabular-nums text-fg">{rate}</span> {t.hero.pulse.label}
        </span>
      )}
      {/* After the figure, so the line grows into empty space during its first minute. */}
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" className="overflow-visible text-ok">
        <path d={sparklinePath(points)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        {live && head && <circle cx={head[0]} cy={head[1]} r="2" fill="currentColor" />}
      </svg>
    </div>
  );
}

export default LivePulse;
