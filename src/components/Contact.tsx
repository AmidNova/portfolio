import { Github, Linkedin, Mail, MessagesSquare } from "lucide-react";
import { useLang } from "../context/LangContext";
import { EMAIL, LINKS } from "../data/profile";

/** Closing tile: one clear action (email) plus the two profiles. */
function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="card flex flex-col items-center justify-center px-6 py-10 text-center"
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
      <p className="mt-4 font-mono text-xs text-subtle">{EMAIL}</p>
    </section>
  );
}

export default Contact;
