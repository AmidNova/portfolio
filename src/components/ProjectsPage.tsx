import { ArrowLeft, ArrowRight, Github, Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import ProjectPreview from "./ProjectPreview";

// Featured projects first; the rest keep their order in PROJECTS.
const ORDERED = [...PROJECTS].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

/** One project, summarized: picture, pitch, three figures, stack, then the ways in. */
function ProjectTile({ project }: { project: ProjectMeta }) {
  const { t } = useLang();
  const copy = t.projects.items[project.id];
  const page = `/projects/${project.id}`;
  const titleId = `project-title-${project.id}`;

  return (
    <article id={`project-${project.id}`} aria-labelledby={titleId} className="card flex scroll-mt-24 flex-col overflow-hidden">
      <ProjectPreview project={project} className="border-b border-line" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            <Link to={page} viewTransition className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          </h2>
          {project.featured && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
              <Star size={12} aria-hidden="true" className="fill-current" />
              {t.projects.page.featured}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{copy.summary}</p>

        {copy.metrics.length > 0 && (
          <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-lg border border-line">
            {copy.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse gap-0.5 px-3 py-2.5">
                <dt className="text-[0.6875rem] leading-snug text-subtle">{m.label}</dt>
                <dd className="font-semibold tracking-tight tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Always present so cards line up; a project without a public repo says so instead of hiding it. */}
      <div className="flex gap-2 border-t border-line p-4">
          <Link to={page} viewTransition className="btn btn-primary flex-1">
            {t.projects.caseStudy}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn flex-1">
              <Github size={16} aria-hidden="true" />
              {t.projects.page.code}
            </a>
          ) : (
            <span className="btn flex-1 cursor-default whitespace-nowrap px-3 text-subtle">
              <Lock size={14} aria-hidden="true" />
              {t.projects.page.codePrivate}
            </span>
          )}
        </div>
    </article>
  );
}

function ProjectsPage() {
  const { t } = useLang();
  useDocumentMeta(t.meta.projectsTitle, t.meta.projectsDescription);

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-14">
      <Link to="/" viewTransition className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft size={15} aria-hidden="true" />
        {t.projects.page.back}
      </Link>
      <header className="mt-6 mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.projects.page.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{t.projects.page.subtitle}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {ORDERED.map((p) => (
          <ProjectTile key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
