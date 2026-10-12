import { ArrowRight, Boxes, FolderGit2, PencilRuler, UserRound, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { PROJECTS } from "../data/profile";
import AboutSection from "./AboutSection";
import { Card, CardHeader } from "./Card";
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

export function ServicesCard() {
  const { t } = useLang();
  return (
    <Card id="services" labelledBy="services-title" className="flex flex-1 flex-col">
      <CardHeader id="services-title" icon={PencilRuler} title={t.cards.services.title} subtitle={t.cards.services.subtitle} />
      <ul className="flex flex-1 flex-wrap content-center gap-2">
        {t.cards.services.rows.flat().map((service) => (
          <li key={service} className="rounded-lg bg-bg px-3.5 py-2 text-sm font-semibold tracking-tight text-accent">
            {service}
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Every project in one glance — name, stack, headline figure — each row opening the project's page. */
export function ProjectsCard() {
  const { t } = useLang();
  return (
    <Card id="projects" labelledBy="projects-title">
      <CardHeader id="projects-title" icon={FolderGit2} title={t.projects.title} subtitle={t.cards.projects.subtitle} />
      <ul className="-mx-2 divide-y divide-line">
        {PROJECTS.map((project) => {
          const figure = t.projects.items[project.id].metrics[0];
          return (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                viewTransition
                className="group flex items-center gap-4 rounded-lg px-2 py-3.5 transition-colors hover:bg-bg"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-subtle">{project.tags.slice(0, 4).join(" · ")}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-semibold tabular-nums">{figure.value}</span>
                  <span className="block text-xs text-subtle">{figure.label}</span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/projects" viewTransition className="btn mt-4 w-full">
        <Boxes size={18} aria-hidden="true" />
        {t.cards.projects.viewAll}
      </Link>
    </Card>
  );
}
