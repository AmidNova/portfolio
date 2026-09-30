import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "../hooks/useLang";
import { EMAIL, LINKS } from "../data/profile";

const FEEDBACK_MS = 2000;

type CopyState = "idle" | "copied" | "failed";

/** The address itself, one click from the clipboard — for readers without a mail client. */
function CopyEmail() {
  const { t } = useLang();
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const id = setTimeout(() => setState("idle"), FEEDBACK_MS);
    return () => clearTimeout(id);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  const Icon = state === "copied" ? Check : Copy;
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${t.contact.copy} ${EMAIL}`}
      className="group mt-3 -ml-2 inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs text-subtle transition-colors hover:text-fg"
    >
      {EMAIL}
      <Icon size={13} aria-hidden="true" className={state === "copied" ? "text-ok" : ""} />
      <span role="status" className="font-sans">
        {state === "copied" && t.contact.copied}
        {state === "failed" && t.contact.copyFailed}
      </span>
    </button>
  );
}

/** Closing tile: availability, one clear action (email), the two profiles, and the raw address to copy. */
function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" aria-labelledby="contact-title" className="card flex flex-1 flex-col justify-between gap-8 p-6 sm:p-8">
      <div>
        <p className="inline-flex items-center gap-2 text-xs font-medium text-ok">
          <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
          {t.hero.badge}
        </p>
        <h2 id="contact-title" className="mt-4 text-2xl font-semibold sm:text-[1.75rem]">
          {t.cards.contact.title}
        </h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">{t.contact.body}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <a href={LINKS.email} className="btn btn-primary">
            <Mail size={16} aria-hidden="true" />
            {t.contact.cta}
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn w-10 px-0">
            <Linkedin size={17} aria-hidden="true" />
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn w-10 px-0">
            <Github size={17} aria-hidden="true" />
          </a>
        </div>
        <CopyEmail />
      </div>
    </section>
  );
}

export default Contact;
