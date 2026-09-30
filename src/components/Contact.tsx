import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { PiHandshakeFill } from "react-icons/pi";
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

/** Closing tile in kkmihai's shape: icon badge, title, one line, square icon buttons, then the raw address. */
function Contact() {
  const { t } = useLang();
  const iconButton = "btn size-12 border border-line bg-bg px-0 hover:border-subtle";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="card flex flex-1 flex-col items-center justify-center px-6 py-10 text-center"
    >
      <span className="flex size-24 items-center justify-center rounded-full border border-line bg-bg">
        <PiHandshakeFill aria-hidden="true" className="size-12 text-accent" />
      </span>
      <h2 id="contact-title" className="mt-6 text-2xl font-bold sm:text-[1.75rem]">
        {t.cards.contact.title}
      </h2>
      <p className="mt-2 max-w-sm font-medium leading-relaxed text-subtle">{t.contact.body}</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <a href={LINKS.email} aria-label={t.contact.cta} className={iconButton}>
          <Mail size={19} aria-hidden="true" />
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconButton}>
          <Linkedin size={19} aria-hidden="true" />
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconButton}>
          <Github size={19} aria-hidden="true" />
        </a>
      </div>
      <CopyEmail />
    </section>
  );
}

export default Contact;
