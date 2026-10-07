import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { EMAIL, LINKS } from "../data/profile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLang } from "../hooks/useLang";
import {
  CONTACT_LIMITS,
  sendContactMessage,
  validateContact,
  type ContactError,
  type ContactField,
} from "../lib/contactApi";
import { useTurnstile } from "../lib/turnstile";

type Status = "idle" | "sending" | "sent";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-fg transition-colors " +
  "placeholder:text-subtle hover:border-subtle aria-[invalid=true]:border-red-500";

/** The address as a fallback whenever the form can't do its job. */
function EmailFallback({ intro }: { intro: string }) {
  return (
    <p className="mt-1 text-sm">
      {intro}{" "}
      <a href={LINKS.email} className="link font-mono">
        {EMAIL}
      </a>
    </p>
  );
}

function Sent({ onAnother }: { onAnother: () => void }) {
  const { t } = useLang();
  const f = t.contact.form;
  return (
    <div role="status" className="flex flex-col items-center py-6 text-center">
      <CheckCircle2 size={40} aria-hidden="true" className="text-ok" />
      <h2 className="mt-4 text-xl font-bold">{f.sentTitle}</h2>
      <p className="mt-2 max-w-sm leading-relaxed text-muted">{f.sentBody}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link to="/" viewTransition className="btn btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          {t.projects.page.back}
        </Link>
        <button type="button" onClick={onAnother} className="btn">
          {f.another}
        </button>
      </div>
    </div>
  );
}

/** /contact: a message straight to the inbox (API Gateway → Lambda → SES), Turnstile-checked. */
function ContactPage() {
  const { t, lang, dark } = useLang();
  const f = t.contact.form;
  useDocumentMeta(t.meta.contactTitle, t.meta.contactDescription);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [error, setError] = useState<ContactError | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const widgetRef = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(widgetRef, lang, dark);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const msg = { name, email, message, lang, token: turnstile.token };
    const bad = validateContact(msg);
    setInvalid(bad);
    setError(null);
    if (bad.length) {
      document.getElementById(`contact-${bad[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    const result = await sendContactMessage(msg);
    if (result.ok) {
      setStatus("sent");
      return;
    }
    setStatus("idle");
    setError(result.error);
    setInvalid(result.fields);
    turnstile.reset(); // a token works once; a retry needs a new one
  };

  const another = () => {
    setMessage("");
    setInvalid([]);
    setStatus("idle");
  };

  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    "aria-invalid": invalid.includes(field) || undefined,
    "aria-describedby": invalid.includes(field) ? `contact-${field}-error` : undefined,
  });
  const fieldError = (field: ContactField) =>
    invalid.includes(field) && (
      <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-red-500">
        {f.errors[field]}
      </p>
    );

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-6 sm:px-6">
      <Link to="/" viewTransition className="btn mb-4">
        <ArrowLeft size={16} aria-hidden="true" />
        {t.projects.page.back}
      </Link>

      <section aria-labelledby="contact-page-title" className="card mx-auto max-w-2xl px-5 py-8 sm:px-8">
        {status === "sent" ? (
          <Sent onAnother={another} />
        ) : (
          <>
            <h1 id="contact-page-title" className="text-2xl font-bold sm:text-3xl">
              {f.title}
            </h1>
            <p className="mt-2 leading-relaxed text-muted">{f.lead}</p>

            <form noValidate onSubmit={submit} className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className="text-sm font-semibold">
                  {f.name}
                </label>
                <input
                  {...fieldProps("name")}
                  type="text"
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.nameMax}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
                {fieldError("name")}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-semibold">
                  {f.email}
                </label>
                <input
                  {...fieldProps("email")}
                  type="email"
                  autoComplete="email"
                  maxLength={CONTACT_LIMITS.emailMax}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
                {fieldError("email") || <p className="mt-1.5 text-sm text-subtle">{f.emailHint}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-semibold">
                  {f.message}
                </label>
                <textarea
                  {...fieldProps("message")}
                  rows={7}
                  maxLength={CONTACT_LIMITS.messageMax}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-y`}
                />
                <div className="flex justify-between gap-4">
                  {fieldError("message") || <span />}
                  <span aria-hidden="true" className="mt-1.5 shrink-0 font-mono text-xs text-subtle">
                    {message.length}/{CONTACT_LIMITS.messageMax}
                  </span>
                </div>
              </div>

              <div>
                {/* Turnstile draws its widget here; reserving its height avoids a layout shift. */}
                <div ref={widgetRef} id="contact-token" tabIndex={-1} className="min-h-[65px]" />
                {fieldError("token")}
                {turnstile.failed && (
                  <div className="text-sm text-muted">
                    <p>{f.errors.checkUnavailable}</p>
                    <EmailFallback intro={f.errors.fallback} />
                  </div>
                )}
              </div>

              {error && error !== "invalid" && (
                <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm">
                  <p>{f.errors[error]}</p>
                  {error !== "captcha" && <EmailFallback intro={f.errors.fallback} />}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-sm text-xs leading-relaxed text-subtle">{f.privacy}</p>
                <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                  <Send size={16} aria-hidden="true" />
                  {status === "sending" ? f.sending : f.send}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default ContactPage;
