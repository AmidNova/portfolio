import { Boxes, FolderGit2, PencilRuler, UserRound, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import AboutSection from "./AboutSection";
import { Card, CardHeader } from "./Card";
import Marquee from "./Marquee";
import ProjectVisual from "./ProjectVisuals";
import Toolbox from "./Toolbox";

/** Thin tiles that wrap existing sections in the bento card shell. */
export function AboutCard() {
  const { t } = useLang();
  return (
    <Card id="about" labelledBy="about-title" className="flex-1">
      <CardHeader id="about-title" icon={UserRound} title={t.about.title} subtitle={t.cards.about.subtitle} />
      <AboutSection />
    </Card>
  );
}

export function StackCard() {
  const { t } = useLang();
  return (
    <Card id="skills" labelledBy="skills-title">
      <CardHeader id="skills-title" icon={Wrench} title={t.skills.title} subtitle={t.skills.subtitle} />
      <Toolbox />
    </Card>
  );
}

const servicePill = (service: string) => (
  <span className="block whitespace-nowrap rounded-2xl bg-bg px-7 py-4 text-xl font-bold tracking-tight text-accent">
    {service}
  </span>
);

export function ServicesCard() {
  const { t } = useLang();
  return (
    <Card id="services" labelledBy="services-title" className="flex flex-1 flex-col">
      <CardHeader
        id="services-title"
        icon={PencilRuler}
        title={t.cards.services.title}
        subtitle={t.cards.services.subtitle}
      />
      <div className="flex flex-1 flex-col justify-center gap-3">
        {t.cards.services.rows.map((row, i) => (
          <Marquee key={row[0]} items={row} keyOf={(s) => s} renderItem={servicePill} reverse={i % 2 === 1} />
        ))}
      </div>
    </Card>
  );
}

/** A project's architecture diagram, framed like a screenshot. */
const projectThumb = (project: ProjectMeta) => (
  <figure
    aria-label={project.title}
    className="relative flex aspect-video w-80 items-center rounded-xl border border-line bg-bg px-4 pt-8 pb-4"
  >
    <figcaption className="absolute top-3 left-4 text-xs font-medium text-subtle">{project.title}</figcaption>
    <ProjectVisual id={project.id} compact />
  </figure>
);

/** Summary only: the projects scroll by, the detail lives behind "View all projects". */
export function ProjectsCard() {
  const { t } = useLang();
  return (
    <Card id="projects" labelledBy="projects-title">
      <CardHeader
        id="projects-title"
        icon={FolderGit2}
        title={t.projects.title}
        subtitle={t.cards.projects.subtitle}
      />
      <Marquee items={PROJECTS} keyOf={(p) => p.id} renderItem={projectThumb} className="marquee-slow" />
      <div className="relative z-10 -mt-12 flex justify-center">
        <Link to="/projects" className="btn btn-primary h-12 px-6 text-base shadow-lg shadow-black/40">
          <Boxes size={20} aria-hidden="true" />
          {t.cards.projects.viewAll}
        </Link>
      </div>
    </Card>
  );
}
