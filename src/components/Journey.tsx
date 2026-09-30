import { Route } from "lucide-react";
import { useId, useState } from "react";
import { useLang } from "../hooks/useLang";
import { EDUCATION, EXPERIENCE } from "../data/profile";
import { Card, CardHeader } from "./Card";
import Timeline from "./Timeline";

type Tab = "experience" | "education";

/** Experience and education in one tile, switched by tabs. */
function Journey() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("experience");
  const uid = useId();
  const tabs: { key: Tab; label: string }[] = [
    { key: "experience", label: t.experience.title },
    { key: "education", label: t.education.title },
  ];

  return (
    <Card id="experience" labelledBy="journey-title" className="flex-1">
      <CardHeader id="journey-title" icon={Route} title={t.cards.journey.title} subtitle={t.cards.journey.subtitle} />
      <div role="tablist" aria-label={t.cards.journey.title} className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-bg p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`${uid}-${key}-tab`}
            aria-selected={tab === key}
            aria-controls={`${uid}-${key}-panel`}
            onClick={() => setTab(key)}
            className="h-9 rounded-md text-sm font-medium text-subtle transition-colors hover:text-fg aria-selected:bg-card aria-selected:text-fg aria-selected:shadow-sm aria-selected:ring-1 aria-selected:ring-line"
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${uid}-${tab}-panel`} aria-labelledby={`${uid}-${tab}-tab`}>
        <Timeline entries={tab === "experience" ? EXPERIENCE : EDUCATION} />
      </div>
    </Card>
  );
}

export default Journey;
