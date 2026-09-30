import { ArrowLeft, Code2, Github, Lock, PlayCircle, RotateCcw, Star } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLang } from "../hooks/useLang";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { filterByTech, parseTechParam, techOptions } from "../lib/projectFilter";
import ProjectCaseStudy from "./ProjectCaseStudy";
import ProjectPreview from "./ProjectPreview";
import { projectMediaById } from "./projectMedia";

// Featured projects first; the rest keep their order in PROJECTS.
const ORDERED = [...PROJECTS].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
const TECHS = techOptions(PROJECTS);

interface ProjectTileProps {
  project: ProjectMeta;
  onOpenCaseStudy: (id: ProjectMeta["id"]) => void;
}

/** One project, summarized: picture, pitch, three figures, stack, then the ways in. */
function ProjectTile({ project, onOpenCaseStudy }: ProjectTileProps) {
  const { t } = useLang();
  const copy = t.projects.items[project.id];
  const hasCaseStudy = Boolean(projectMediaById[project.id]);
  const titleId = `project-title-${project.id}`;

  return (
    <article id={`project-${project.id}`} aria-labelledby={titleId} className="card flex scroll-mt-24 flex-col overflow-hidden">
      <ProjectPreview project={project} className="border-b border-line" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            {project.title}
          </h2>
          {project.featured && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">
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
          {hasCaseStudy && (
            <button type="button" onClick={() => onOpenCaseStudy(project.id)} className="btn btn-primary flex-1">
              <PlayCircle size={16} aria-hidden="true" />
              {t.projects.caseStudy}
            </button>
          )}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn flex-1">
              <Github size={16} aria-hidden="true" />
              {t.projects.page.code}
            </a>
          ) : (
            <span className="btn flex-1 cursor-default text-subtle opacity-60">
              <Lock size={14} aria-hidden="true" />
              {t.projects.page.codePrivate}
            </span>
          )}
        </div>
    </article>
  );
}

interface TechFilterProps {
  selected: string[];
  shown: number;
  onToggle: (tech: string) => void;
  onReset: () => void;
}

/** Tech chips that narrow the grid; state lives in the URL (?tech=A,B) so a filtered view can be shared. */
function TechFilter({ selected, shown, onToggle, onReset }: TechFilterProps) {
  const { t, lang } = useLang();
  const plural = new Intl.PluralRules(lang).select(shown) === "one" ? "one" : "other";

  return (
    <section aria-labelledby="tech-filter-title" className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 id="tech-filter-title" className="mb-3 flex items-center gap-2 text-sm font-medium text-subtle">
          <Code2 size={16} aria-hidden="true" className="text-accent" />
          {t.projects.page.filter}
        </h2>
        <ul className="flex flex-wrap gap-1.5">
          {TECHS.map((tech) => {
            const on = selected.includes(tech);
            return (
              <li key={tech}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => onToggle(tech)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    on ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-muted hover:border-subtle hover:text-fg"
                  }`}
                >
                  {tech}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
        <p role="status" className="text-sm text-subtle">
          <span className="font-semibold text-fg tabular-nums">{shown}</span> {t.projects.page.shown[plural]}
        </p>
        <button type="button" onClick={onReset} disabled={selected.length === 0} className="btn h-8 px-3 text-xs disabled:opacity-40">
          <RotateCcw size={13} aria-hidden="true" />
          {t.projects.page.reset}
        </button>
      </div>
    </section>
  );
}

function ProjectsPage() {
  const { t } = useLang();
  useDocumentMeta(t.meta.projectsTitle, t.meta.projectsDescription);
  const [params, setParams] = useSearchParams();
  const selected = parseTechParam(params.get("tech"), TECHS);
  const visible = filterByTech(ORDERED, selected);
  const [openId, setOpenId] = useState<ProjectMeta["id"] | null>(null);
  const open = PROJECTS.find((p) => p.id === openId);
  const openMedia = openId ? projectMediaById[openId] : undefined;

  const setSelected = (next: string[]) =>
    setParams(next.length ? { tech: next.join(",") } : {}, { replace: true, preventScrollReset: true });
  const toggle = (tech: string) =>
    setSelected(selected.includes(tech) ? selected.filter((s) => s !== tech) : [...selected, tech]);

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.projects.page.title}</h1>
        <p className="mt-4 leading-relaxed text-muted">{t.projects.page.subtitle}</p>
        <Link to="/" viewTransition className="btn btn-primary mt-6">
          <ArrowLeft size={16} aria-hidden="true" />
          {t.projects.page.back}
        </Link>
      </header>

      <TechFilter selected={selected} shown={visible.length} onToggle={toggle} onReset={() => setSelected([])} />

      {visible.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectTile key={p.id} project={p} onOpenCaseStudy={setOpenId} />
          ))}
        </div>
      ) : (
        <p className="card mt-4 p-10 text-center text-muted">{t.projects.page.empty}</p>
      )}

      {open && openMedia && <ProjectCaseStudy project={open} media={openMedia} onClose={() => setOpenId(null)} />}
    </div>
  );
}

export default ProjectsPage;
