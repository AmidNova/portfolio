import { FileText, Play, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";
import type { ProjectMedia } from "./projectMedia";

interface ProjectCaseStudyProps {
  projectId: string;
  title: string;
  description: string;
  tags: string[];
  media: ProjectMedia;
  onClose: () => void;
}

function ProjectCaseStudy({ projectId, title, description, tags, media, onClose }: ProjectCaseStudyProps) {
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();

  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const mediaContent = t.projects.media?.[projectId as keyof typeof t.projects.media];
  const shots = mediaContent?.shots ?? {};
  const architecture = (mediaContent as { architecture?: string } | undefined)?.architecture;
  const cardBg = dark ? "#21262d" : "#ffffff";
  const chipBg = dark ? "rgba(255,255,255,0.05)" : "rgba(26,26,46,0.06)";
  const chipBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(26,26,46,0.1)";

  const sectionLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.8rem",
    color: c.text.faint,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    marginBottom: "0.75rem",
    fontWeight: 600,
  };
  const boxStyle = {
    background: chipBg,
    border: `1px solid ${chipBorder}`,
    borderRadius: 0,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column" as const,
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: isMobile ? "1rem" : "3rem",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: cardBg,
          borderRadius: 0,
          maxWidth: "60rem",
          width: "100%",
          padding: isMobile ? "1.5rem" : "2.5rem",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: isMobile ? "1.6rem" : "2.2rem", fontWeight: 800, color: c.text.primary, letterSpacing: "-0.02em" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label={t.projects.close}
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              borderRadius: 0,
              border: `1px solid ${chipBorder}`,
              background: chipBg,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} color={c.text.primary} />
          </button>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              padding: "0.3rem 0.8rem",
              borderRadius: 0,
              background: chipBg,
              border: `1px solid ${chipBorder}`,
              color: dark ? "#adbac7" : "#4b5563",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Overview */}
        <section style={{ marginBottom: "2rem" }}>
          <p style={sectionLabelStyle}>{t.projects.sectionOverview}</p>
          <p className="prose" style={{ fontSize: "1rem", color: c.text.muted, lineHeight: 1.8 }}>
            {description}
          </p>
        </section>

        {/* Architecture */}
        {(architecture || media.architectureImage) && (
          <section style={{ marginBottom: "2rem" }}>
            <p style={sectionLabelStyle}>{t.projects.sectionArchitecture}</p>
            {architecture && (
              <p className="prose" style={{ fontSize: "1rem", color: c.text.muted, lineHeight: 1.8, marginBottom: media.architectureImage ? "1.25rem" : 0 }}>
                {architecture}
              </p>
            )}
            {media.architectureImage && (
              <img
                src={media.architectureImage}
                alt={`${title} — architecture`}
                loading="lazy"
                style={{
                  width: "100%",
                  maxHeight: "min(70vh, 560px)",
                  objectFit: "contain",
                  borderRadius: 0,
                  border: `1px solid ${chipBorder}`,
                  background: dark ? "#161b22" : "#f8f8fb",
                  padding: "1rem",
                  display: "block",
                }}
              />
            )}
          </section>
        )}

        {/* Results */}
        {media.images.length > 0 && (
          <section style={{ marginBottom: (media.doc || media.video) ? "2rem" : 0 }}>
            <p style={sectionLabelStyle}>{t.projects.sectionResults}</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "1rem",
            }}>
              {media.images.map((shot) => {
                const caption = (shots as Record<string, string>)[shot.captionKey] ?? "";
                return (
                  <figure key={shot.src} style={{ margin: 0 }}>
                    <img
                      src={shot.src}
                      alt={caption || title}
                      loading="lazy"
                      style={{ width: "100%", borderRadius: 0, border: `1px solid ${chipBorder}`, display: "block" }}
                    />
                    {caption && (
                      <figcaption style={{ fontSize: "0.8rem", color: c.text.faint, marginTop: "0.4rem" }}>
                        {caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom: small demo video (left) + full doc link (right) */}
        {(media.video || media.doc) && (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "1.25rem",
            alignItems: "stretch",
          }}>
            {media.video && (
              <div style={boxStyle}>
                <p style={sectionLabelStyle}>
                  <Play size={14} color={c.accent.gold} /> {t.projects.watchDemo}
                </p>
                <video
                  src={media.video}
                  controls
                  preload="metadata"
                  style={{
                    width: "100%",
                    maxHeight: "min(32vh, 240px)",
                    aspectRatio: "16 / 9",
                    objectFit: "contain",
                    borderRadius: 0,
                    border: `1px solid ${chipBorder}`,
                    background: dark ? "#0d1117" : "#0a0a0a",
                    display: "block",
                  }}
                />
              </div>
            )}

            {media.doc && (
              <div style={{
                ...boxStyle,
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}>
                <p style={{ ...sectionLabelStyle, marginBottom: 0 }}>
                  <FileText size={14} color={c.accent.gold} /> {t.projects.techDoc}
                </p>
                <a
                  href={media.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.4rem",
                    borderRadius: 0,
                    background: c.text.primary,
                    color: c.text.inverse,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <FileText size={16} /> {t.projects.readDoc}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ProjectCaseStudy;
