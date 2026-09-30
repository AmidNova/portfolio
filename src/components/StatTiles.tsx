import { Activity, BadgeCheck, Hospital } from "lucide-react";
import { useLang } from "../context/LangContext";

const ICONS = [Activity, Hospital, BadgeCheck];

/** Three real numbers from the projects and credentials — no inflated counters. */
function StatTiles() {
  const { t } = useLang();

  return (
    <ul className="grid grid-cols-3 gap-4">
      {t.cards.stats.map((stat, i) => {
        const Icon = ICONS[i];
        return (
          <li key={stat.label} className="card flex flex-col items-center justify-center gap-3 px-2 py-6 text-center">
            <span className="bg-gradient-to-b from-fg to-subtle bg-clip-text text-3xl font-bold tracking-tight tabular-nums text-transparent sm:text-4xl">
              {stat.value}
            </span>
            <span className="chip text-xs sm:text-[0.8125rem]">
              {Icon && <Icon size={14} aria-hidden="true" className="shrink-0 text-accent" />}
              {stat.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default StatTiles;
