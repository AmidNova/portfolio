import { FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import Portrait from "../assets/images/Confident professional in office attire.webp";
import { useLang } from "../context/LangContext";
import { LINKS } from "../data/profile";
import LivePulse from "./LivePulse";

const stagger = (i: number) => ({ animationDelay: `${i * 70}ms` });

function Hero() {
  const { t } = useLang();

  return (
    <section id="home" aria-labelledby="hero-title" className="pt-14 sm:pt-20">
      <div className="flex items-start justify-between gap-6">
        <div className="animate-enter" style={stagger(0)}>
          <h1 id="hero-title" className="text-5xl font-semibold tracking-[-0.035em] sm:text-6xl">
            Soro Amidou
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 text-lg text-muted">
            <span className="font-medium text-fg">{t.hero.role}</span>
            <span aria-hidden="true" className="hidden text-line sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={16} aria-hidden="true" />
              {t.hero.location}
            </span>
          </p>
        </div>
        <img
          src={Portrait}
          alt="Soro Amidou"
          width={112}
          height={112}
          className="size-20 shrink-0 animate-enter rounded-full portrait object-cover object-top sm:size-28"
          style={{ ...stagger(1), viewTransitionName: "portrait" }}
        />
      </div>

      <p className="mt-7 max-w-xl animate-enter text-lg leading-relaxed text-muted" style={stagger(2)}>
        {t.hero.tagline}
      </p>

      <div className="mt-7 flex animate-enter flex-wrap gap-2" style={stagger(3)}>
        <a href={LINKS.resume} download className="btn btn-primary">
          <FileText size={15} aria-hidden="true" />
          {t.hero.resume}
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn">
          <Github size={15} aria-hidden="true" />
          GitHub
        </a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          <Linkedin size={15} aria-hidden="true" />
          LinkedIn
        </a>
        <a href={LINKS.email} className="btn">
          <Mail size={15} aria-hidden="true" />
          Email
        </a>
      </div>

      {/* Status strip: what I'm looking for on the left, the live signature on the right. */}
      <div
        className="mt-10 flex animate-enter flex-col gap-3 rounded-xl border border-line bg-card px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
        style={stagger(4)}
      >
        <p className="flex items-center gap-2.5">
          <span className="relative flex size-2 shrink-0" aria-hidden="true">
            <span className="absolute inset-0 animate-ping-once rounded-full bg-ok" />
            <span className="relative size-2 rounded-full bg-ok" />
          </span>
          <span>
            {t.hero.status}
            <span className="block text-subtle">{t.hero.available}</span>
          </span>
        </p>
        <LivePulse />
      </div>
    </section>
  );
}

export default Hero;
