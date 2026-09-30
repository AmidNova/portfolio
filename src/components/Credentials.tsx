import { Award } from "lucide-react";
import { useLang } from "../hooks/useLang";
import { CERTIFICATIONS, type Certification } from "../data/profile";
import { SKILL_ICONS } from "../data/skillIcons";
import { Card, CardHeader } from "./Card";

const BADGE = "h-16 w-auto sm:h-24";

/** The official badge when there is one; otherwise the issuer's icon in a badge-sized frame. */
function CertBadge({ cert }: { cert: Certification }) {
  if (cert.badge) {
    return <img src={cert.badge} alt={cert.name} loading="lazy" className={`${BADGE} drop-shadow-md`} />;
  }
  const icon = cert.icon ? SKILL_ICONS[cert.icon] : undefined;
  return (
    <span role="img" aria-label={cert.name} className={`${BADGE} flex aspect-[4/5] items-center justify-center rounded-2xl border border-line bg-raised`}>
      {icon ? <icon.Icon aria-hidden="true" className="size-8 sm:size-11" style={{ color: icon.brand ?? "var(--color-fg)" }} /> : <Award aria-hidden="true" className="size-8 text-accent" />}
    </span>
  );
}

/** Certifications as badges (visual first), then spoken languages as compact chips. */
function Credentials() {
  const { t } = useLang();

  return (
    <Card id="credentials" labelledBy="credentials-title">
      <CardHeader
        id="credentials-title"
        icon={Award}
        title={t.cards.credentials.title}
        subtitle={t.cards.credentials.subtitle}
      />
      <div className="space-y-6">
        <div>
          <h3 id="certs-title" className="mb-3 text-sm font-medium text-subtle">
            {t.certifications.title}
          </h3>
          <ul aria-labelledby="certs-title" className="grid grid-cols-3 gap-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className="flex flex-col items-center rounded-xl border border-line bg-bg px-2 pt-4 pb-3 text-center">
                <CertBadge cert={c} />
                <p className="mt-3 text-xs font-semibold leading-snug sm:text-sm">{c.short}</p>
                <p className="mt-0.5 text-[0.6875rem] text-subtle sm:text-xs">
                  {c.level ? `${c.level} · ${c.issuer}` : c.issuer}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 id="langs-title" className="mb-3 text-sm font-medium text-subtle">
            {t.languages.title}
          </h3>
          <dl aria-labelledby="langs-title" className="flex flex-wrap gap-2">
            {t.languages.items.map((l) => (
              <div key={l.label} className="chip gap-1.5">
                <dt>{l.label}</dt>
                <dd className="text-subtle">· {l.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  );
}

export default Credentials;
