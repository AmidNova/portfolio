import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

const projectsBase = [
  {
    id: "kairos",
    title: "Kairos",
    tags: ["React", "Node.js", "TypeScript", "Python"],
    gradient: "linear-gradient(135deg, #f5c518 0%, #ff6b35 50%, #c026d3 100%)",
    link: null,
  },
  {
    id: "bozarts",
    title: "Bozarts",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    link: null,
  },
];

function Projects() {
  const [current, setCurrent] = useState(0);
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();
  const projects = projectsBase.map((p, i) => ({ ...p, ...t.projects.items[i] }));
  const project = projects[current];

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const navButtonBg = dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.06)";
  const navButtonBgHover = dark ? "rgba(255,255,255,0.12)" : "rgba(26,26,46,0.12)";
  const navButtonBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(26,26,46,0.1)";
  const tagBg = dark ? "rgba(255,255,255,0.05)" : "rgba(26,26,46,0.06)";
  const tagBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(26,26,46,0.1)";
  const statusBg = dark ? "rgba(245,197,24,0.12)" : "rgba(245,197,24,0.15)";

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? "4rem 1.25rem" : "6rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: c.accent.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          {t.projects.featured}
        </p>
        <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: c.text.primary, lineHeight: 1 }}>
          {t.projects.title}
        </h2>
      </div>

      {/* Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "2rem" : "4rem",
        alignItems: "center",
      }}>
        {/* Infos */}
        <div>
          {/* Counter */}
          <p style={{ fontSize: "0.8rem", color: c.text.faint, fontWeight: 500, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
            {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>

          {/* Titre + status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: c.text.primary, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {project.title}
            </h3>
            <span style={{
              fontSize: "0.75rem", fontWeight: 600,
              padding: "0.25rem 0.7rem", borderRadius: "999px",
              background: statusBg,
              color: c.accent.goldDim,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {project.status}
            </span>
          </div>

          <p style={{ fontSize: "1rem", color: c.text.muted, lineHeight: 1.75, marginBottom: "2rem" }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.75rem", color: c.text.faint, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
              {t.projects.techStack}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  background: tagBg,
                  border: `1px solid ${tagBorder}`,
                  color: dark ? "#bac2de" : "#4b5563",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={prev}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: navButtonBg,
                border: `1px solid ${navButtonBorder}`,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = navButtonBgHover)}
              onMouseLeave={e => (e.currentTarget.style.background = navButtonBg)}
            >
              <ArrowLeft size={16} color={c.text.primary} />
            </button>
            <button
              onClick={next}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: c.text.primary,
                border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <ArrowRight size={16} color={c.text.inverse} />
            </button>

            {project.link && (
              <a href={project.link} target="_blank" style={{
                marginLeft: "0.5rem",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: c.text.muted,
                fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = c.text.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = c.text.muted)}
              >
                <Globe size={14} /> Website
              </a>
            )}
          </div>
        </div>

        {/* Visuel */}
        <div style={{
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: project.gradient,
          height: isMobile ? "260px" : "420px",
          transition: "background 0.4s ease",
        }} />
      </div>

      {/* Show All */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
        <button style={{
          padding: "0.75rem 2rem",
          border: `1px solid ${dark ? "#45475a" : c.border.default}`,
          borderRadius: "999px",
          background: "transparent",
          color: dark ? "#7f849c" : c.text.muted,
          fontSize: "0.95rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#6b7280" : "#9ca3af";
            (e.currentTarget as HTMLButtonElement).style.color = c.text.primary;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#45475a" : c.border.default;
            (e.currentTarget as HTMLButtonElement).style.color = dark ? "#7f849c" : c.text.muted;
          }}
        >
          {t.projects.showAll}
        </button>
      </div>
    </section>
  );
}

export default Projects;
