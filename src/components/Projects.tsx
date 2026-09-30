import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import ProjectCaseStudy from "./ProjectCaseStudy";
import { projectMediaById } from "./projectMedia";
import ProjectVisual from "./ProjectVisuals";

interface CardProps {
  project: ProjectMeta;
  featured?: boolean;
  onOpen: (id: ProjectMeta["id"]) => void;
}

interface Metric {
  value: string;
  label: string;
}

/** Key figures: a row of three, stacked as a side column on the featured card at desktop width. */
function Metrics({ items, featured }: { items: Metric[]; featured: boolean }) {
  const layout = featured
    ? "grid-cols-3 divide-x lg:mt-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:self-start"
    : "grid-cols-3 divide-x";
  return (
    <dl className={`mt-6 grid divide-line rounded-lg border border-line ${layout}`}>
      {items.map((m) => (
        <div key={m.label} className="flex flex-col-reverse gap-0.5 px-3 py-3 lg:px-4">
          <dt className="text-xs leading-snug text-subtle">{m.label}</dt>
          <dd className={`font-semibold tracking-tight tabular-nums ${featured ? "text-2xl" : "text-xl"}`}>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectCard({ project, featured = false, onOpen }: CardProps) {
  const { t } = useLang();
  const copy = t.projects.items[project.id];
  const media = projectMediaById[project.id];

  return (
    <article
      aria-labelledby={`project-${project.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg transition-colors duration-200 hover:border-subtle"
    >
      {/* One picture per project: it says more about a data engineer than a screenshot. */}
      <div className="overflow-x-auto border-b border-line bg-card px-4 py-6 sm:px-8">
        <div className={featured ? "mx-auto max-w-3xl" : "mx-auto max-w-md"}>
          <ProjectVisual id={project.id} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8 lg:grid lg:grid-cols-[1fr_14rem] lg:gap-10" : ""}`}>
        <div className="flex flex-1 flex-col">
          <div className="flex items-baseline justify-between gap-3">
            <h3
              id={`project-${project.id}`}
              className={`inline-flex items-center gap-1 font-semibold tracking-tight ${featured ? "text-xl" : "text-lg"}`}
            >
              {project.title}
              {media && (
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="-translate-x-1 text-subtle opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                />
              )}
            </h3>
            <span className="shrink-0 text-xs tabular-nums text-subtle">{copy.status}</span>
          </div>
          <p className="mt-2 leading-relaxed text-muted">{copy.summary}</p>

          {/* Pinned to the bottom so side-by-side cards line up whatever their text length. */}
          <ul className={`flex flex-wrap gap-1.5 ${featured ? "mt-5" : "mt-auto pt-5"}`}>
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>

          {media && (
            <div className="mt-6">
              <button type="button" onClick={() => onOpen(project.id)} className="btn">
                {t.projects.caseStudy}
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {copy.metrics.length > 0 && <Metrics items={copy.metrics} featured={featured} />}
      </div>
    </article>
  );
}

function Projects() {
  const [openId, setOpenId] = useState<ProjectMeta["id"] | null>(null);
  const [featured, ...rest] = PROJECTS;
  const open = PROJECTS.find((p) => p.id === openId);
  const openMedia = openId ? projectMediaById[openId] : undefined;

  return (
    <>
      <div className="space-y-5">
        <ProjectCard project={featured} featured onOpen={setOpenId} />
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setOpenId} />
          ))}
        </div>
      </div>

      {open && openMedia && (
        <ProjectCaseStudy project={open} media={openMedia} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}

export default Projects;
