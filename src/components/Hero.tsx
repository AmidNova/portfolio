import { FileText, Github, GraduationCap, Languages, Linkedin, Mail, MapPin } from "lucide-react";
import Portrait from "../assets/images/Confident professional in office attire.webp";
import { useLang } from "../hooks/useLang";
import { LINKS } from "../data/profile";

/** Identity tile: who, what, where, and the ways to reach me — all above the fold. */
function Hero() {
  const { t } = useLang();
  const chips = [
    { icon: MapPin, label: t.hero.location },
    { icon: Languages, label: t.hero.chips.languages },
    { icon: GraduationCap, label: t.hero.chips.school },
  ];

  return (
    <section id="home" aria-labelledby="hero-title" className="card animate-enter p-6">
      <div className="flex items-start gap-5">
        <img
          src={Portrait}
          alt="Soro Amidou"
          width={100}
          height={100}
          className="size-24 shrink-0 rounded-xl object-cover object-top sm:size-[100px]"
          style={{ viewTransitionName: "portrait" }}
        />
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-ok/20 px-2.5 py-0.5 text-xs font-semibold text-ok-ink">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inset-0 animate-ping-once rounded-full bg-ok" />
              <span className="relative size-1.5 rounded-full bg-ok" />
            </span>
            {t.hero.badge}
          </p>
          <h1 id="hero-title" className="mt-2 text-2xl font-bold tracking-tight text-accent sm:text-[1.75rem]">
            Soro Amidou
          </h1>
          <p className="mt-0.5 text-base font-semibold">{t.hero.role}</p>
          <p className="mt-1 text-sm text-subtle">{t.hero.status}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2 rounded-lg bg-bg p-3">
        {chips.map(({ icon: Icon, label }) => (
          <li key={label} className="chip">
            <Icon size={15} aria-hidden="true" className="text-accent" />
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <a href={LINKS.resume} download className="btn btn-primary">
          <FileText size={16} aria-hidden="true" />
          {t.hero.resume}
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn">
          <Github size={16} aria-hidden="true" />
          GitHub
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          <Linkedin size={16} aria-hidden="true" />
          LinkedIn
        </a>
        <a href={LINKS.email} className="btn">
          <Mail size={16} aria-hidden="true" />
          Email
        </a>
      </div>
    </section>
  );
}

export default Hero;
