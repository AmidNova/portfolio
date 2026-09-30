import { Globe, Linkedin } from "lucide-react";
import type { ComponentType } from "react";
import { SiX } from "react-icons/si";
import { useLang } from "../context/LangContext";
import type { OrgLinks, TimelineEntry } from "../data/profile";
import { formatPeriod } from "../lib/format";

type IconProps = { size?: number; "aria-hidden"?: boolean | "true" };

const LINK_ICONS: { key: keyof OrgLinks; Icon: ComponentType<IconProps>; size: number }[] = [
  { key: "website", Icon: Globe, size: 15 },
  { key: "linkedin", Icon: Linkedin, size: 15 },
  { key: "x", Icon: SiX, size: 13 },
];

/** Official site, LinkedIn and X of an organisation, as quiet icon links. */
function OrgLinkIcons({ org, links }: { org: string; links: OrgLinks }) {
  const { t } = useLang();
  const present = LINK_ICONS.filter(({ key }) => links[key]);
  if (present.length === 0) return null;

  return (
    <ul className="flex shrink-0 items-center gap-2.5 pt-0.5">
      {present.map(({ key, Icon, size }) => (
        <li key={key} className="flex">
          <a
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${org} — ${t.experience.links[key]}`}
            title={t.experience.links[key]}
            className="text-subtle transition-colors hover:text-fg"
          >
            <Icon size={size} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

interface TimelineProps {
  entries: TimelineEntry[];
}

function Timeline({ entries }: TimelineProps) {
  const { t, lang } = useLang();

  return (
    <ol>
      {entries.map((entry, i) => {
        const copy = t.experience.entries[entry.id];
        const isLast = i === entries.length - 1;
        return (
          <li key={entry.id} className={`relative flex gap-4 ${isLast ? "" : "pb-8"}`}>
            {/* Thin rail linking one logo to the next. */}
            {!isLast && <span aria-hidden="true" className="absolute top-12 bottom-2 left-5 w-px bg-line" />}
            <img
              src={entry.logo}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="relative size-10 shrink-0 rounded-full border border-line bg-white object-contain p-1.5 dark:border-white/10"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{entry.org}</h3>
                <span className="ml-auto text-sm tabular-nums text-subtle">
                  {formatPeriod(entry.period, lang, t.experience.present)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-muted">{copy.role}</p>
                <OrgLinkIcons org={entry.org} links={entry.links} />
              </div>
              {copy.bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-muted marker:text-line">
                  {copy.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default Timeline;
