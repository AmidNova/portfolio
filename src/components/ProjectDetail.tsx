import { ArrowLeft, ArrowRight, ExternalLink, FileText, Github, Lock } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS, type ProjectMeta } from "../data/profile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useLang } from "../hooks/useLang";
import Lightbox, { type LightboxImage } from "./Lightbox";
import NotFound from "./NotFound";
import { ProjectVisual } from "./ProjectPreview";
import { projectMediaById, srcSetOf } from "./projectMedia";

interface FlowStep {
  label: string;
  detail: string;
}

/** What a project's page may say beyond its summary; each project fills only what it has. */
interface MediaCopy {
  architecture?: string;
  shots?: Record<string, string>;
  flow?: FlowStep[];
  decisions?: string[];
}

/** /projects/:id — one project told in full: context, figures, architecture, choices, results, limits. */
function ProjectDetail() {
  const { id } = useParams();
  const index = PROJECTS.findIndex((p) => p.id === id);
  const project = PROJECTS[index];
  if (!project) return <NotFound />;
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  // Keyed so the zoom state resets when moving to the next project.
  return <ProjectArticle key={project.id} project={project} next={next} />;
}

function ProjectArticle({ project, next }: { project: ProjectMeta; next: ProjectMeta }) {
  const { t } = useLang();
  const copy = t.projects.items[project.id];
  useDocumentMeta(`${project.title} · Soro Amidou`, copy.summary);
  const media = projectMediaById[project.id];
  const mediaCopy: MediaCopy | undefined = t.projects.media[project.id as keyof typeof t.projects.media];
  const shots = mediaCopy?.shots ?? {};
  const images = media?.images ?? [];
  const gallery: LightboxImage[] = images.map((shot) => ({
    src: shot.src,
    caption: shots[shot.captionKey] ?? project.title,
  }));
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  return (
    <article aria-labelledby="project-title" className="mx-auto max-w-[900px] px-4 pt-10 sm:px-6 sm:pt-14">
      <Link to="/projects" viewTransition className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft size={15} aria-hidden="true" />
        {t.projects.allProjects}
      </Link>

      <header className="mt-6">
        <h1 id="project-title" className="text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{copy.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Github size={16} aria-hidden="true" />
              {t.projects.viewCode}
            </a>
          ) : (
            <span className="btn cursor-default text-subtle">
              <Lock size={14} aria-hidden="true" />
              {t.projects.page.codePrivate}
            </span>
          )}
          {media?.doc && (
            <a href={media.doc} target="_blank" rel="noopener noreferrer" className="btn">
              <FileText size={15} aria-hidden="true" />
              {t.projects.readDoc}
            </a>
          )}
        </div>
      </header>

      <dl className="mt-10 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-card">
        {copy.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse gap-1 px-4 py-4 sm:px-6 sm:py-5">
            <dt className="text-xs leading-snug text-subtle sm:text-sm">{m.label}</dt>
            <dd className="text-xl font-semibold tracking-tight tabular-nums sm:text-3xl">{m.value}</dd>
          </div>
        ))}
      </dl>

      <ProjectContext project={project} />

      <figure className="mt-10 overflow-x-auto rounded-xl border border-line bg-card px-4 py-6">
        <ProjectVisual project={project} />
      </figure>

      {mediaCopy?.architecture && (
        <Section title={t.projects.sectionArchitecture}>
          <p className="leading-relaxed text-muted">{mediaCopy.architecture}</p>
          {mediaCopy.flow && <FlowSteps steps={mediaCopy.flow} label={t.projects.flowLabel} />}
        </Section>
      )}

      {mediaCopy?.decisions && (
        <Section title={t.projects.sectionDecisions}>
          <NumberedList items={mediaCopy.decisions} />
        </Section>
      )}

      {gallery.length > 0 && (
        <Section title={t.projects.sectionResults}>
          <div className="grid gap-6">
            {gallery.map((shot, i) => (
              <figure key={shot.src}>
                <button
                  type="button"
                  onClick={() => setZoomIndex(i)}
                  aria-label={`${t.projects.enlarge} — ${shot.caption}`}
                  className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line transition-colors hover:border-subtle"
                >
                  <img
                    src={shot.src}
                    srcSet={srcSetOf(images[i])}
                    sizes="(min-width: 900px) 852px, 100vw"
                    width={images[i].width}
                    height={images[i].height}
                    alt=""
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </button>
                <figcaption className="mt-2 text-sm text-subtle">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
          {zoomIndex !== null && (
            <Lightbox images={gallery} index={zoomIndex} onIndexChange={setZoomIndex} onClose={() => setZoomIndex(null)} />
          )}
        </Section>
      )}

      {media?.video && (
        <Section title={t.projects.watchDemo}>
          <video src={media.video} controls preload="metadata" className="w-full rounded-lg border border-line bg-black" />
        </Section>
      )}

      <Section title={t.projects.sectionLimits}>
        <ul className="space-y-2.5">
          {copy.limits.map((limit) => (
            <li key={limit} className="flex gap-3 leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-subtle" />
              {limit}
            </li>
          ))}
        </ul>
      </Section>

      <nav aria-label={t.projects.nextProject} className="mt-16 border-t border-line pt-6">
        <Link to={`/projects/${next.id}`} viewTransition className="group -m-2 flex items-center justify-between gap-4 rounded-xl p-2">
          <span>
            <span className="block text-sm text-subtle">{t.projects.nextProject}</span>
            <span className="text-xl font-semibold tracking-tight">{next.title}</span>
          </span>
          <ArrowRight size={22} aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      </nav>
    </article>
  );
}

/** Who, when, on what data, with which tools: the facts a reader checks before trusting the figures. */
function ProjectContext({ project }: { project: ProjectMeta }) {
  const { t } = useLang();
  const ctx = t.projects.items[project.id].context;
  const data = project.dataUrl ? (
    <a
      href={project.dataUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 underline decoration-line underline-offset-4 hover:decoration-fg"
    >
      {ctx.data}
      <ExternalLink size={13} aria-hidden="true" />
    </a>
  ) : (
    ctx.data
  );
  const rows: { term: string; value: ReactNode }[] = [
    { term: t.projects.context.type, value: ctx.type },
    { term: t.projects.context.period, value: ctx.period },
    { term: t.projects.context.data, value: data },
  ];

  return (
    <section aria-label={t.projects.context.label} className="mt-4 rounded-xl border border-line p-5 sm:p-6">
      <dl className="grid gap-4 sm:grid-cols-3">
        {rows.map((row) => (
          <div key={row.term}>
            <dt className="text-xs font-medium tracking-wide text-subtle uppercase">{row.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 leading-relaxed text-muted">
          <span className="mt-0.5 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** The data flow as numbered stages, wrapping on narrow screens instead of scrolling. */
function FlowSteps({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="mt-5 flex flex-wrap items-stretch gap-2">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center gap-2">
          <div className="rounded-lg border border-line bg-card px-3 py-2">
            <p className="flex items-baseline gap-2 text-sm font-medium">
              <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              {step.label}
            </p>
            <p className="mt-0.5 text-xs text-subtle">{step.detail}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="hidden text-subtle sm:inline">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

export default ProjectDetail;
