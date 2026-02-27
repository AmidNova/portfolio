import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: "kairos",
    title: "Kairos",
    description:
      "AI-powered price & stock alert platform. Set a target price or request a restock notification — Kairos monitors it and alerts you instantly.",
    tags: ["React", "Node.js", "TypeScript", "Python"],
    gradient: "linear-gradient(135deg, #f5c518 0%, #ff6b35 50%, #c026d3 100%)",
    status: "In Development",
    link: null,
  },
  {
    id: "bozarts",
    title: "Bozarts",
    description:
      "Full-stack artisan marketplace with user profiles, product listings, shopping cart, and real-time messaging. Built as a team project at ISEP Paris.",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    status: "Academic Project",
    link: null,
  },
];

function Projects() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  const project = projects[current];

  return (
    <section
      id="projects"
      style={{
        padding: "6rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#f5c518",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          Featured
        </p>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1a1a2e",
            lineHeight: 1,
          }}
        >
          Projects
        </h2>
      </div>

      {/* Carrousel */}
      <div
        style={{
          position: "relative",
          borderRadius: "1.5rem",
          overflow: "hidden",
          background: project.gradient,
          minHeight: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Overlay sombre en bas */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
          }}
        />

        {/* Contenu project */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.5rem",
            }}
          >
            <h3
              style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff" }}
            >
              {project.title}
            </h3>
            <span
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.2)",
                color: "#ffffff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {project.status}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              marginBottom: "1rem",
              maxWidth: "500px",
            }}
          >
            {project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#ffffff",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "underline",
                marginBottom: "1rem",
              }}
            >
              <Globe size={14} /> Website
            </a>
          )}

          {/* Tech stack */}
          <div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "0.5rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Nav boutons */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <ChevronLeft size={20} color="#1a1a2e" />
        </button>

        <button
          onClick={next}
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <ChevronRight size={20} color="#1a1a2e" />
        </button>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginTop: "1.5rem",
        }}
      >
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "999px",
              background: i === current ? "#1a1a2e" : "#d1d5db",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Show All */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <button
          style={{
            padding: "0.75rem 2rem",
            border: "1px solid #e5e7eb",
            borderRadius: "999px",
            background: "transparent",
            color: "#6b7280",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Show All Projects
        </button>
      </div>
    </section>
  );
}

export default Projects;
