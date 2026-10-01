import { Boxes, FolderGit2, PencilRuler, UserRound, Wrench } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import AboutSection from "./AboutSection";
import { Card, CardHeader } from "./Card";
import Marquee, { MarqueePause } from "./Marquee";
import ProjectPreview from "./ProjectPreview";
import Toolbox from "./Toolbox";

/** Thin tiles that wrap existing sections in the bento card shell. */
export function AboutCard() {
  const { t } = useLang();
  return (
    <Card id="about" labelledBy="about-title" className="flex flex-1 flex-col">
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
  <span className="block whitespace-nowrap rounded-xl bg-bg px-5 py-2.5 text-base font-bold tracking-tight text-accent">
    {service}
  </span>
);

export function ServicesCard() {
  const { t } = useLang();
  const [paused, setPaused] = useState(false);
  return (
    <Card id="services" labelledBy="services-title" className="flex flex-1 flex-col">
      <CardHeader
        id="services-title"
        icon={PencilRuler}
        title={t.cards.services.title}
        subtitle={t.cards.services.subtitle}
        action={<MarqueePause paused={paused} onToggle={() => setPaused((p) => !p)} label={t.cards.pauseMotion} />}
      />
      <div className="flex flex-1 flex-col justify-center gap-3">
        {t.cards.services.rows.map((row, i) => (
          <Marquee
            key={row[0]}
            items={row}
            keyOf={(s) => s}
            renderItem={servicePill}
            reverse={i % 2 === 1}
            paused={paused}
          />
        ))}
      </div>
    </Card>
  );
}

/** A project's thumbnail; opens the project's card on the projects page. */
const projectThumb = (project: ProjectMeta) => (
  <Link to={`/projects#project-${project.id}`} aria-label={project.title} className="tile-link block rounded-xl">
    <ProjectPreview project={project} captioned className="w-96 rounded-xl border border-line" />
  </Link>
);

/** Summary only: the projects scroll by, the detail lives behind "View all projects". */
export function ProjectsCard() {
  const { t } = useLang();
  const [paused, setPaused] = useState(false);
  return (
    <Card id="projects" labelledBy="projects-title">
      <CardHeader
        id="projects-title"
        icon={FolderGit2}
        title={t.projects.title}
        subtitle={t.cards.projects.subtitle}
        action={<MarqueePause paused={paused} onToggle={() => setPaused((p) => !p)} label={t.cards.pauseMotion} />}
      />
      <Marquee
        items={PROJECTS}
        keyOf={(p) => p.id}
        renderItem={projectThumb}
        paused={paused}
        className="marquee-slow"
      />
      <div className="relative z-10 -mt-12 flex justify-center">
        <Link to="/projects" className="btn btn-primary h-12 px-6 text-base shadow-lg shadow-black/40">
          <Boxes size={20} aria-hidden="true" />
          {t.cards.projects.viewAll}
        </Link>
      </div>
    </Card>
  );
}
