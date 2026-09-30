import { Mail } from "lucide-react";
import { useLang } from "../context/LangContext";
import { EMAIL, LINKS } from "../data/profile";

function Contact() {
  const { t } = useLang();

  return (
    <div className="rounded-xl border border-line bg-card p-6">
      <p className="max-w-lg leading-relaxed text-muted">{t.contact.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={LINKS.email} className="btn btn-primary">
          <Mail size={15} aria-hidden="true" />
          {t.contact.cta}
        </a>
        <span className="font-mono text-xs text-subtle">{EMAIL}</span>
      </div>
    </div>
  );
}

export default Contact;
