import type { CSSProperties } from "react";
import { useLang } from "../context/LangContext";
import { SKILLS } from "../data/profile";
import { SKILL_ICONS } from "../data/skillIcons";

function Skills() {
  const { t } = useLang();

  return (
    <dl className="divide-y divide-line border-y border-line">
      {SKILLS.map(({ group, items }) => (
        <div key={group} className="grid gap-2 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
          <dt className="pt-0.5 text-sm text-subtle">{t.skills.groups[group]}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {items.map((item) => {
              const icon = SKILL_ICONS[item];
              return (
                <span key={item} className="tag group/tag gap-1.5 transition-colors hover:text-fg">
                  {icon && (
                    <icon.Icon
                      aria-hidden="true"
                      size={14}
                      style={{ "--brand": icon.brand ?? "var(--color-fg)" } as CSSProperties}
                      className="shrink-0 text-subtle transition-colors duration-200 group-hover/tag:text-(--brand)"
                    />
                  )}
                  {item}
                </span>
              );
            })}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default Skills;
