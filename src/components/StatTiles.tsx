import { Plus } from "lucide-react";
import type { IconType } from "react-icons";
import { PiBriefcaseFill, PiSealCheckFill } from "react-icons/pi";
import { useLang } from "../context/LangContext";
import { CERTIFICATIONS, LINKS, PROJECT_COUNT } from "../data/profile";

interface Stat {
  value: number;
  /** Shows the value is a floor, e.g. 12 public repos → "12+". */
  isFloor?: boolean;
  label: string;
  /** Extra words for the accessible name only, e.g. "on GitHub". */
  context?: string;
  icon: IconType;
  href: string;
  external?: boolean;
}

/** Big metal-gradient figure, accent "+" for floors, pill label — each tile links to its proof. */
function StatTile({ value, isFloor, label, context, icon: Icon, href, external }: Stat) {
  const name = [`${value}${isFloor ? "+" : ""}`, label, context].filter(Boolean).join(" ");
  return (
    <li className="flex">
      <a
        href={href}
        aria-label={name}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="card group flex flex-1 flex-col items-center justify-center gap-2 px-2 py-8 text-center transition-colors hover:border-subtle/40"
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <span className="stat-figure font-mono text-5xl font-bold tracking-tighter tabular-nums sm:text-6xl">
            {value}
          </span>
          {isFloor && <Plus strokeWidth={4.5} className="size-9 text-accent sm:size-11" />}
        </span>
        <span aria-hidden="true" className="inline-flex items-center gap-2 rounded-xl bg-raised px-3 py-2 text-sm font-medium text-subtle transition-colors group-hover:text-fg sm:text-base">
          <Icon className="size-5 shrink-0 text-accent" />
          {label}
        </span>
      </a>
    </li>
  );
}

/** Profile-level numbers in kkmihai's tile shape; the third slot waits for its figure. */
function StatTiles() {
  const { t } = useLang();
  const stats: Stat[] = [
    {
      value: PROJECT_COUNT,
      isFloor: true,
      label: t.cards.stats.projects,
      context: t.cards.stats.projectsLink,
      icon: PiBriefcaseFill,
      href: LINKS.github,
      external: true,
    },
    {
      value: CERTIFICATIONS.length,
      label: t.cards.stats.certifications,
      icon: PiSealCheckFill,
      href: "#credentials",
    },
  ];

  return (
    <ul className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
      <li role="presentation" aria-hidden="true" className="card min-h-40" />
    </ul>
  );
}

export default StatTiles;
