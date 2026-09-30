import { useLang } from "../context/LangContext";
import { CERTIFICATIONS } from "../data/profile";

/** Certifications and spoken languages, side by side. */
function Credentials() {
  const { t } = useLang();

  return (
    <div className="mt-24 grid gap-10 sm:mt-32 sm:grid-cols-2">
      <section aria-labelledby="certs-title">
        <h2 id="certs-title" className="mb-5 text-xl font-semibold tracking-tight">
          {t.certifications.title}
        </h2>
        <ul className="space-y-3">
          {CERTIFICATIONS.map((c) => (
            <li key={c.name}>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-sm text-subtle">{c.issuer}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="langs-title">
        <h2 id="langs-title" className="mb-5 text-xl font-semibold tracking-tight">
          {t.languages.title}
        </h2>
        <dl className="space-y-3">
          {t.languages.items.map((l) => (
            <div key={l.label}>
              <dt className="text-sm font-medium">{l.label}</dt>
              <dd className="text-sm text-subtle">{l.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export default Credentials;
