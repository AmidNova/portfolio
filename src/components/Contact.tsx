import { Check, Copy, Github, Linkedin, Mail, MessagesSquare } from "lucide-react";
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
      className="group mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs text-subtle transition-colors hover:text-fg"
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

/** Closing tile: one clear action (email) plus the two profiles. */
function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="card flex flex-1 flex-col items-center justify-center px-6 py-10 text-center"
    >
      <span className="flex size-20 items-center justify-center rounded-full border border-line bg-bg">
        <MessagesSquare size={34} aria-hidden="true" className="text-accent" />
      </span>
      <h2 id="contact-title" className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
        {t.cards.contact.title}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{t.contact.body}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <a href={LINKS.email} className="btn btn-primary">
          <Mail size={16} aria-hidden="true" />
          {t.contact.cta}
        </a>
        <a
          href={LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="btn w-11 px-0"
        >
          <Linkedin size={17} aria-hidden="true" />
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn w-11 px-0">
          <Github size={17} aria-hidden="true" />
        </a>
      </div>
      <CopyEmail />
    </section>
  );
}

export default Contact;
