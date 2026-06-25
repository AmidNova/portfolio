import { ArrowLeft, ArrowRight, Globe, Maximize2 } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";
import ProjectCaseStudy from "./ProjectCaseStudy";
import { projectMediaById } from "./projectMedia";

const projectsBase = [
  {
    id: "wikipedia-pulse",
    title: "Wikipedia Pulse",
    tags: ["Apache Kafka", "Airflow", "Spark", "Isolation Forest", "Elasticsearch", "Kibana", "Python"],
    gradient: "linear-gradient(135deg, #0a2540 0%, #1e6091 50%, #34a0a4 100%)",
    link: null,
  },
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
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();
  const projects = projectsBase.map((p, i) => ({ ...p, ...t.projects.items[i] }));
  const project = projects[current];
  const media = projectMediaById[project.id];
  const cover = media?.cover ?? media?.images[0]?.src;

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const navButtonBg = dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.06)";
  const navButtonBgHover = dark ? "rgba(255,255,255,0.12)" : "rgba(26,26,46,0.12)";
  const navButtonBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(26,26,46,0.1)";
  const tagBg = dark ? "rgba(255,255,255,0.05)" : "rgba(26,26,46,0.06)";
  const tagBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(26,26,46,0.1)";
  const statusBg = dark ? c.accent.goldSoft : c.accent.goldSoft;
  const termBorder = dark ? "#30363d" : c.border.default;
  const cardBg = dark ? "#161b22" : "#ffffff";
  const titleBarBg = dark ? "#0d1117" : "#f3f3f1";

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
        <p style={{ fontSize: "0.95rem", color: c.text.muted, marginBottom: "0.5rem" }}>
          <span style={{ color: c.accent.gold }}>$</span> ls <span style={{ color: dark ? "#79c0ff" : "#0969da" }}>./projects</span>
        </p>
        <h2 style={{ fontSize: isMobile ? "1.9rem" : "2.4rem", fontWeight: 800, color: c.text.primary, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
          {t.projects.title}
        </h2>
        <p className="tnum" style={{ fontSize: "0.8rem", color: c.text.faint }}>
          → {projects.length} results
        </p>
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
          <p className="tnum" style={{ fontSize: "0.8rem", color: c.text.faint, fontWeight: 500, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
            {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>

          {/* Titre + status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: c.text.primary, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {project.title}
            </h3>
            <span style={{
              fontSize: "0.72rem", fontWeight: 600,
              padding: "0.25rem 0.65rem", borderRadius: 0,
              background: statusBg,
              border: `1px solid ${c.accent.goldSoft}`,
              color: c.accent.goldDim,
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              {project.status}
            </span>
          </div>

          <p className="prose" style={{ fontSize: "1rem", color: c.text.muted, lineHeight: 1.8, marginBottom: "2rem" }}>
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
                  padding: "0.28rem 0.7rem",
                  borderRadius: 0,
                  background: tagBg,
                  border: `1px solid ${tagBorder}`,
                  color: dark ? "#adbac7" : "#3a3a33",
                  fontSize: "0.82rem",
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
                width: "42px", height: "42px", borderRadius: 0,
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
                width: "42px", height: "42px", borderRadius: 0,
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

            {media && (
              <button
                onClick={() => setCaseStudyOpen(true)}
                style={{
                  marginLeft: "0.5rem",
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 1.1rem", borderRadius: 0,
                  background: c.accent.gold, border: `1px solid ${c.accent.gold}`,
                  color: dark ? "#0b1f17" : "#ffffff",
                  fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <Maximize2 size={14} /> {t.projects.caseStudy}
              </button>
            )}

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

        {/* Visuel — framed window */}
        <div
          onClick={media ? () => setCaseStudyOpen(true) : undefined}
          style={{
            border: `1px solid ${termBorder}`,
            background: cardBg,
            overflow: "hidden",
            cursor: media ? "pointer" : "default",
            position: "relative",
          }}
        >
          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 0.85rem", background: titleBarBg, borderBottom: `1px solid ${termBorder}` }}>
            <span style={{ fontSize: "0.78rem", color: c.accent.gold }}>$</span>
            <span style={{ fontSize: "0.78rem", color: c.text.faint }}>
              ~/projects/{project.id}
            </span>
          </div>
          {/* Cover */}
          <div style={{ background: project.gradient, height: isMobile ? "240px" : "380px", overflow: "hidden", position: "relative" }}>
            {cover && (
              <img
                src={cover}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            )}
            {media && (
              <span style={{
                position: "absolute", bottom: "0.75rem", right: "0.75rem",
                fontSize: "0.75rem", fontWeight: 600,
                padding: "0.25rem 0.6rem",
                background: "rgba(13,17,23,0.8)", color: "#ededec",
                border: "1px solid rgba(255,255,255,0.15)",
              }}>
                &gt; open case study
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Show All */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
        <button style={{
          padding: "0.7rem 1.8rem",
          border: `1px solid ${dark ? "#3d444d" : c.border.default}`,
          borderRadius: 0,
          background: "transparent",
          color: dark ? "#6e7681" : c.text.muted,
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#6b7280" : "#9ca3af";
            (e.currentTarget as HTMLButtonElement).style.color = c.text.primary;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = dark ? "#3d444d" : c.border.default;
            (e.currentTarget as HTMLButtonElement).style.color = dark ? "#6e7681" : c.text.muted;
          }}
        >
          {t.projects.showAll}
        </button>
      </div>

      {caseStudyOpen && media && (
        <ProjectCaseStudy
          projectId={project.id}
          title={project.title}
          description={project.description}
          tags={project.tags}
          media={media}
          onClose={() => setCaseStudyOpen(false)}
        />
      )}
    </section>
  );
}

export default Projects;
