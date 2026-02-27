import { Globe, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    id: "isep",
    company: "ISEP Paris",
    logo: "./src/assets/logo/logoIsep.png",
    type: "Education",
    subtitle:
      "General Engineering Degree — Specialization in Information Systems Architecture",
    period: "Sept 2022 — Sept 2025",
    location: "Paris, France",
    website: "https://www.isep.fr",
    twitter: "https://twitter.com/ISEP_Paris",
    linkedin: "https://www.linkedin.com/school/isep-paris/",
    tools: [
      {
        icon: (
          <img
            src="/src/assets/icons/python.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/javascript.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/html.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/java.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
    ],
    bullets: [
      "Studying core engineering disciplines including networks, systems architecture, and cloud security.",
      "Specializing in Information Systems Architecture with focus on database design, Big Data, and enterprise systems.",
      "Hands-on projects in system development, telecom, and digital transformation.",
      "Building a solid foundation in applied mathematics, algorithms, and software engineering best practices.",
    ],
  },
  {
    id: "estm",
    company: "ESTM Casablanca",
    logo: "./src/assets/logo/logoEtsm.jpg",
    type: "Education",
    subtitle:
      "Classe Préparatoire MPSI/MP — Mathematics, Physics & Engineering Sciences",
    period: "2021 — 2024",
    location: "Casablanca, Morocco",
    website: "https://estem.ma/",
    twitter: null,
    linkedin: "https://www.linkedin.com/school/estemcasablanca/",
    tools: [
      {
        icon: (
          <img
            src="/src/assets/icons/python.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/mysql.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
    ],
    bullets: [
      "Completed a rigorous 3-year preparatory program in Mathematics, Physics, and Engineering Sciences.",
      "Developed strong analytical and problem-solving foundations through intensive coursework.",
      "Prepared for competitive engineering school entrance examinations.",
    ],
  },
  {
    id: "artci",
    company: "ARTCI",
    logo: "./src/assets/logo/logoArtci.png",
    type: "Internship",
    subtitle: "Web Development Intern",
    period: "Jun 2023 — Sept 2023",
    location: "Côte d'Ivoire",
    website: "https://www.artci.ci",
    twitter: null,
    linkedin: null,
    tools: [
      {
        icon: (
          <img
            src="/src/assets/icons/laravel.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/react.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/mysql.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/html.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
    ],
    bullets: [
      "Designed and developed a platform for managing electronic signature images.",
      "Configured and controlled data related to equipment inventory and users.",
      "Stack: Laravel, React.js, JSX, MySQL, CSS3.",
    ],
  },
  {
    id: "bozarts",
    company: "ISEP Paris",
    logo: "./src/assets/logo/logoIsep.png",
    type: "Academic Project",
    subtitle: "Full-Stack Developer — Bozarts Project",
    period: "2024 — 2025",
    location: "Paris, Team Project",
    website: null,
    twitter: null,
    linkedin: null,
    tools: [
      {
        icon: (
          <img
            src="/src/assets/icons/php.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/javascript.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/docker2.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/mysql.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
      {
        icon: (
          <img
            src="/src/assets/icons/html.svg"
            style={{ width: "18px", height: "18px" }}
          />
        ),
      },
    ],
    bullets: [
      "Built an artisan marketplace with user profiles, product listings, shopping cart, and real-time messaging.",
      "Developed in PHP, MySQL, HTML, CSS and JavaScript with a normalized database.",
      "Managed user access control and full database administration.",
    ],
  },
];

function Career() {
  const [active, setActive] = useState("isep");
  const current = experiences.find((e) => e.id === active)!;

  return (
    <section
      id="work"
      style={{ padding: "2rem 5rem 6rem", maxWidth: "72rem", margin: "0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "3rem",
        }}
      >
        <div style={{ position: "relative" }}>
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
            So Far
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#1a1a2e",
                lineHeight: 1,
              }}
            >
              Career
            </h2>
            <div style={{ position: "relative" }}>
              <svg
                width="80"
                height="50"
                viewBox="0 0 80 50"
                fill="none"
                style={{ position: "absolute", left: "-10px", top: "-35px" }}
              >
                <path
                  d="M10 40 Q30 5 60 15"
                  stroke="#e8a0a0"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M55 10 L62 17 L52 18"
                  stroke="#e8a0a0"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  position: "absolute",
                  top: "-55px",
                  left: "10px",
                  fontSize: "0.8rem",
                  color: "#e8a0a0",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                  fontFamily: "Georgia, serif",
                }}
              >
                Hear me talk about it
              </span>
              <button
                onClick={() => alert("Video coming soon 🎥")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                🎬
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            Need a copy?
          </span>
          <a
            href="/cv.pdf"
            download
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              color: "#6b7280",
              fontSize: "0.82rem",
              fontWeight: 500,
              textDecoration: "none",
              background: "#fafafa",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1a1a2e";
              e.currentTarget.style.color = "#1a1a2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            📄 Resume
          </a>
        </div>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "3rem",
        }}
      >
        {/* Liste gauche */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActive(exp.id)}
              style={{
                textAlign: "left",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: active === exp.id ? 700 : 400,
                fontSize: "0.9rem",
                color: active === exp.id ? "#1a1a2e" : "#9ca3af",
                background: active === exp.id ? "#f3f4f6" : "transparent",
                borderLeft:
                  active === exp.id
                    ? "3px solid #f5c518"
                    : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {exp.company}
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: "#9ca3af",
                  marginTop: "0.1rem",
                }}
              >
                {exp.type}
              </span>
            </button>
          ))}
        </div>

        {/* Détail droite */}
        <div>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            {current.logo && (
              <img
                src={current.logo}
                alt={current.company}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                  borderRadius: "0.5rem",
                  border: "1px solid #f0f0f0",
                  padding: "4px",
                  background: "#fff",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.25rem",
                  flexWrap: "wrap",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#1a1a2e",
                  }}
                >
                  {current.company}
                </h3>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "999px",
                    background: "#f3f4f6",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {current.type}
                </span>
                {current.website && (
                  <a
                    href={current.website}
                    target="_blank"
                    style={{ color: "#9ca3af", display: "flex" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#1a1a2e")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9ca3af")
                    }
                  >
                    <Globe size={16} />
                  </a>
                )}
                {current.twitter && (
                  <a
                    href={current.twitter}
                    target="_blank"
                    style={{ color: "#9ca3af", display: "flex" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#1a1a2e")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9ca3af")
                    }
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {current.linkedin && (
                  <a
                    href={current.linkedin}
                    target="_blank"
                    style={{ color: "#9ca3af", display: "flex" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#0077b5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9ca3af")
                    }
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#4b5563",
                  marginBottom: "0.25rem",
                }}
              >
                {current.subtitle}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                {current.period} · {current.location}
              </p>
            </div>
          </div>

          {/* Technologies & Tools */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#6b7280",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Technologies & Tools
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {current.tools.map((tool, i) => (
                <div
                  key={i}
                  title={tool.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.5rem 0.75rem",
                    background: "#f9fafb",
                    border: "1px solid #f0f0f0",
                    borderRadius: "0.5rem",
                    minWidth: "52px",
                  }}
                >
                  {tool.icon}
                  <span style={{ fontSize: "0.6rem", color: "#9ca3af" }}>
                    {tool.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bullets */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {current.bullets.map((bullet, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: "#f5c518",
                    fontWeight: 700,
                    marginTop: "0.1rem",
                    flexShrink: 0,
                  }}
                >
                  •
                </span>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#4b5563",
                    lineHeight: 1.7,
                  }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Career;
