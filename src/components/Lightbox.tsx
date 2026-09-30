import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../hooks/useLang";

export interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Full-screen image viewer: ←/→ to browse, Esc to close. */
function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const current = images[index];

  const go = (delta: number) => onIndexChange((index + delta + count) % count);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus();
  }, []);

  useEffect(() => {
    // Capture phase so Escape closes the lightbox without also closing the dialog beneath it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % count);
      } else if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, count, onClose, onIndexChange]);

  if (!current) return null;

  const navButton = "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.caption}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-12"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.projects.close}
        className="absolute right-4 top-4 rounded-md p-1 text-white/70 transition-colors hover:text-white"
      >
        <X size={22} aria-hidden="true" />
      </button>

      <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={current.src}
          src={current.src}
          alt={current.caption}
          className="max-h-[80vh] w-auto max-w-full animate-enter rounded-lg"
        />
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {current.caption}
          <span className="ml-2 tabular-nums text-white/40">
            {index + 1} / {count}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label={t.projects.previous}
            className={`${navButton} left-3 sm:left-6`}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label={t.projects.next}
            className={`${navButton} right-3 sm:right-6`}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

export default Lightbox;
