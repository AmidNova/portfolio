import { Plus } from "lucide-react";
import type { IconType } from "react-icons";
import { PiBriefcaseFill, PiBuildingsFill, PiSealCheckFill } from "react-icons/pi";
import { useLang } from "../context/LangContext";
import { CERTIFICATIONS, EXPERIENCE, LINKS, PROJECT_COUNT } from "../data/profile";

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
        className="card tile-link group flex flex-1 flex-col items-center justify-center gap-2 px-2 py-8 text-center"
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <span className="stat-figure font-mono text-5xl font-bold tracking-tighter tabular-nums sm:text-6xl">
            {value}
          </span>
          {isFloor && <Plus strokeWidth={4.5} className="size-9 text-accent sm:size-11" />}
        </span>
        <span aria-hidden="true" className="inline-flex max-w-full items-center gap-2 rounded-xl bg-raised px-2 py-1.5 text-xs font-medium text-subtle transition-colors group-hover:text-fg sm:px-3 sm:py-2 sm:text-base">
          {/* Three tiles share a phone's width: the label keeps the room, the icon waits for sm. */}
          <Icon className="hidden size-5 shrink-0 text-accent sm:block" />
          {label}
        </span>
      </a>
    </li>
  );
}

/** Profile-level numbers in kkmihai's tile shape, each counted from the data it links to. */
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
    {
      value: EXPERIENCE.length,
      label: t.cards.stats.experience,
      icon: PiBuildingsFill,
      href: "#experience",
    },
  ];

  return (
    <ul className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} />
      ))}
    </ul>
  );
}

export default StatTiles;
