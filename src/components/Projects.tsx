import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

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
  const projects = projectsBase.map((p, i) => ({ ...p, ...t.projects.items[i] }));
  const project = projects[current];

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

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
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#f5c518", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          {t.projects.featured}
        </p>
        <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: dark ? "#f0f0f0" : "#1a1a2e", lineHeight: 1 }}>
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
          <p style={{ fontSize: "0.8rem", color: "#9ca3af", fontWeight: 500, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
            {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>

          {/* Titre + status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: dark ? "#f0f0f0" : "#1a1a2e", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {project.title}
            </h3>
            <span style={{
              fontSize: "0.75rem", fontWeight: 600,
              padding: "0.25rem 0.7rem", borderRadius: "999px",
              background: dark ? "rgba(245,197,24,0.12)" : "rgba(245,197,24,0.15)",
              color: "#c9a43a",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {project.status}
            </span>
          </div>

          <p style={{ fontSize: "1rem", color: dark ? "#a0a0b8" : "#6b7280", lineHeight: 1.75, marginBottom: "2rem" }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
              {t.projects.techStack}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(26,26,46,0.06)",
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(26,26,46,0.1)",
                  color: dark ? "#c0c0d0" : "#4b5563",
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
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.06)",
                border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(26,26,46,0.1)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = dark ? "rgba(255,255,255,0.12)" : "rgba(26,26,46,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.06)")}
            >
              <ArrowLeft size={16} color={dark ? "#f0f0f0" : "#1a1a2e"} />
            </button>
            <button
              onClick={next}
              style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: dark ? "#f0f0f0" : "#1a1a2e",
                border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <ArrowRight size={16} color={dark ? "#1a1a2e" : "#ffffff"} />
            </button>

            {project.link && (
              <a href={project.link} target="_blank" style={{
                marginLeft: "0.5rem",
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                color: dark ? "#a0a0b8" : "#6b7280",
                fontSize: "0.9rem", fontWeight: 500, textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = dark ? "#f0f0f0" : "#1a1a2e")}
                onMouseLeave={e => (e.currentTarget.style.color = dark ? "#a0a0b8" : "#6b7280")}
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
          border: dark ? "1px solid #3d3d5e" : "1px solid #e5e7eb",
          borderRadius: "999px",
          background: "transparent",
          color: dark ? "#8080a0" : "#6b7280",
          fontSize: "0.95rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#6b7280" : "#9ca3af";
            (e.currentTarget as HTMLButtonElement).style.color = dark ? "#f0f0f0" : "#1a1a2e";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#3d3d5e" : "#e5e7eb";
            (e.currentTarget as HTMLButtonElement).style.color = dark ? "#8080a0" : "#6b7280";
          }}
        >
          {t.projects.showAll}
        </button>
      </div>
    </section>
  );
}

export default Projects;
