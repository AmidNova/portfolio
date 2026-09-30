import { Award } from "lucide-react";
import { useLang } from "../hooks/useLang";
import { CERTIFICATIONS } from "../data/profile";
import { Card, CardHeader } from "./Card";

/** Certifications and spoken languages, side by side in one tile. */
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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-medium text-subtle">{t.certifications.title}</h3>
          <ul className="space-y-2">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name} className="rounded-lg bg-bg px-4 py-3">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-subtle">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium text-subtle">{t.languages.title}</h3>
          <dl className="space-y-2">
            {t.languages.items.map((l) => (
              <div key={l.label} className="rounded-lg bg-bg px-4 py-3">
                <dt className="text-sm font-medium">{l.label}</dt>
                <dd className="text-xs text-subtle">{l.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  );
}

export default Credentials;
