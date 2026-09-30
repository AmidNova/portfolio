import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

function AboutSection() {
  const { t } = useLang();

  return (
    <div className="space-y-4 leading-relaxed text-muted">
      {t.about.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <Link to="/about" viewTransition className="group inline-flex items-center gap-1 text-sm font-medium text-fg">
        {t.about.more}
        <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default AboutSection;
