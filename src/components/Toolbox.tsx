import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "../context/LangContext";
import { PROJECTS, TOOLBOX, type ToolProof } from "../data/profile";
import { SKILL_ICONS } from "../data/skillIcons";

/** Fixed tilts (°) and vertical nudges (px), cycled over the pile: tipped out, yet identical on every visit. */
const TILTS = [-6, 4, -2, 7, -4, 3, -7, 2, 5, -3, 6, -5, 1, -6, 4, -2, 3, -4];
const NUDGES = [2, -3, 1, 4, -2, 3, -1, 2, -4, 1, 3, -2, 4, -1, 2, -3, 1, 3];

/** Drops once, the first time the box scrolls into view. */
function useDropOnView(ref: React.RefObject<HTMLElement | null>): boolean {
  const [dropped, setDropped] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || dropped) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDropped(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, dropped]);

  return dropped;
}

function Toolbox() {
  const { t } = useLang();
  const boxRef = useRef<HTMLDivElement>(null);
  const dropped = useDropOnView(boxRef);
  // Tool under the pointer or keyboard focus, echoed in the tray's caption.
  const [active, setActive] = useState<string | null>(null);

  const proofOf = (proof: ToolProof) =>
    proof === "certifications"
      ? { href: "#credentials", label: t.skills.certification }
      : { href: `#project-${proof}`, label: PROJECTS.find((p) => p.id === proof)?.title ?? "" };

  return (
    <div ref={boxRef} data-dropped={dropped || undefined} className="toolbox relative rounded-xl border border-line px-4 pt-6 pb-9 sm:px-6">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-3">
        {TOOLBOX.map((tool, i) => {
          const icon = SKILL_ICONS[tool.name];
          const proof = tool.proof && proofOf(tool.proof);
          const chip = (
            <>
              {icon && (
                <icon.Icon size={18} aria-hidden="true" className="shrink-0" style={{ color: icon.brand ?? "var(--color-fg)" }} />
              )}
              {tool.name}
            </>
          );
          const show = () => setActive(proof ? `${tool.name} → ${proof.label}` : tool.name);
          const hide = () => setActive(null);
          const chipClass =
            "toolbox-chip inline-flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 text-[0.8125rem] font-medium";
          return (
            <li
              key={tool.name}
              className="toolbox-tile relative hover:z-10 focus-within:z-10"
              style={{ "--i": i, "--r": `${TILTS[i % TILTS.length]}deg`, "--y": `${NUDGES[i % NUDGES.length]}px` } as CSSProperties}
            >
              {proof ? (
                <a
                  href={proof.href}
                  aria-label={`${tool.name} — ${proof.label}`}
                  className={chipClass}
                  onMouseEnter={show}
                  onMouseLeave={hide}
                  onFocus={show}
                  onBlur={hide}
                >
                  {chip}
                </a>
              ) : (
                <span className={chipClass} onMouseEnter={show} onMouseLeave={hide}>
                  {chip}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div aria-hidden="true" className="absolute inset-x-4 bottom-3 flex justify-between gap-4 font-mono text-[0.6875rem] text-subtle">
        <span className={`truncate transition-colors ${active ? "text-fg" : ""}`}>{active ?? t.skills.hint}</span>
        <span className="shrink-0">
          {TOOLBOX.length} {t.skills.count}
        </span>
      </div>
    </div>
  );
}

export default Toolbox;
