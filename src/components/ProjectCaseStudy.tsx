import { FileText, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../hooks/useLang";
import type { ProjectMeta } from "../data/profile";
import ArchitectureDiagram from "./ArchitectureDiagram";
import Lightbox, { type LightboxImage } from "./Lightbox";
import type { ProjectMedia } from "./projectMedia";

interface FlowStep {
  label: string;
  detail: string;
}

/** What a project's case study may say; each project fills only what it has. */
interface MediaCopy {
  architecture?: string;
  shots?: Record<string, string>;
  flow?: FlowStep[];
  decisions?: string[];
}

interface ProjectCaseStudyProps {
  project: ProjectMeta;
  media: ProjectMedia;
  onClose: () => void;
}

function ProjectCaseStudy({ project, media, onClose }: ProjectCaseStudyProps) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = t.projects.items[project.id];
  const mediaCopy: MediaCopy | undefined = t.projects.media[project.id as keyof typeof t.projects.media];
  const shots = mediaCopy?.shots ?? {};
  const gallery: LightboxImage[] = media.images.map((shot) => ({
    src: shot.src,
    caption: shots[shot.captionKey] ?? project.title,
  }));
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const closeZoom = () => setZoomIndex(null);

  // Escape closes, background scroll locks, focus moves in and is restored on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl animate-enter rounded-xl border border-line bg-bg p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-subtle">{t.projects.caseStudy}</p>
            <h2 id="case-title" className="mt-1 text-2xl font-semibold tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.close}
            className="-m-1 rounded-md p-1 text-muted transition-colors hover:text-fg"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 leading-relaxed text-muted">{copy.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        {mediaCopy?.architecture && (
          <section className="mt-10">
            <h3 className="mb-3 text-[15px] font-semibold">{t.projects.sectionArchitecture}</h3>
            <p className="text-sm leading-relaxed text-muted">{mediaCopy.architecture}</p>
            {project.id === "wikipedia-pulse" && (
              <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-card px-4 py-5">
                <ArchitectureDiagram className="min-w-[560px]" />
              </div>
            )}
            {mediaCopy.flow && <FlowSteps steps={mediaCopy.flow} label={t.projects.flowLabel} />}
          </section>
        )}

        {mediaCopy?.decisions && (
          <section className="mt-10">
            <h3 className="mb-3 text-[15px] font-semibold">{t.projects.sectionDecisions}</h3>
            <ul className="space-y-2.5">
              {mediaCopy.decisions.map((decision) => (
                <li key={decision} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {decision}
                </li>
              ))}
            </ul>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mt-10">
            <h3 className="mb-3 text-[15px] font-semibold">{t.projects.sectionResults}</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {gallery.map((shot, i) => (
                <figure key={shot.src}>
                  <button
                    type="button"
                    onClick={() => setZoomIndex(i)}
                    aria-label={`${t.projects.enlarge} — ${shot.caption}`}
                    className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-line transition-colors hover:border-subtle"
                  >
                    <img src={shot.src} alt="" loading="lazy" className="w-full" />
                  </button>
                  <figcaption className="mt-1.5 text-xs text-subtle">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {zoomIndex !== null && (
          <Lightbox images={gallery} index={zoomIndex} onIndexChange={setZoomIndex} onClose={closeZoom} />
        )}

        {(media.video || media.doc || project.repo) && (
          <section className="mt-10">
            <h3 className="mb-3 text-[15px] font-semibold">{t.projects.techDoc}</h3>
            {media.video && (
              <figure>
                <video
                  src={media.video}
                  controls
                  preload="metadata"
                  className="w-full rounded-lg border border-line bg-black"
                />
                <figcaption className="mt-1.5 text-xs text-subtle">{t.projects.watchDemo}</figcaption>
              </figure>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {media.doc && (
                <a href={media.doc} target="_blank" rel="noopener noreferrer" className="btn">
                  <FileText size={15} aria-hidden="true" />
                  {t.projects.readDoc}
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn">
                  <Github size={15} aria-hidden="true" />
                  {t.projects.viewCode}
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>,
    document.body,
  );
}

/** The data flow as numbered stages, wrapping on narrow screens instead of scrolling. */
function FlowSteps({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="mt-4 flex flex-wrap items-stretch gap-2">
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

export default ProjectCaseStudy;
