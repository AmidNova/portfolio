import { ArrowRight, BookOpen, Crown, Footprints } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";

// Same order as t.story.offClock.items: reading, chess, running.
const OFF_CLOCK_ICONS = [BookOpen, Crown, Footprints];

/** The short story, then a teaser of the person behind it — pinned to the card's bottom. */
function AboutSection() {
  const { t } = useLang();
  const offClock = t.story.offClock;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="space-y-4 leading-relaxed text-muted">
        {t.about.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-auto space-y-4">
        <div>
          <h3 className="mb-2 text-xs font-medium text-subtle">{offClock.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {offClock.items.map((item, i) => {
              const Icon = OFF_CLOCK_ICONS[i];
              return (
                <li key={item.title} className="chip" title={item.desc}>
                  {Icon && <Icon size={15} aria-hidden="true" className="text-accent" />}
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
        <Link to="/about" viewTransition className="group inline-flex items-center gap-1 text-sm font-medium text-fg">
          {t.about.more}
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export default AboutSection;
