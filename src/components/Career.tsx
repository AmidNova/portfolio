import { ArrowDownToLine, Globe, Linkedin, Twitter, Video } from "lucide-react";
import { useState } from "react";
import iconDocker from "../assets/icons/docker2.svg";
import iconHtml from "../assets/icons/html.svg";
import iconJava from "../assets/icons/java.svg";
import iconJs from "../assets/icons/javascript.svg";
import iconLaravel from "../assets/icons/laravel.svg";
import iconMysql from "../assets/icons/mysql.svg";
import iconPhp from "../assets/icons/php.svg";
import iconPython from "../assets/icons/python.svg";
import logoArtci from "../assets/logo/logoartci.png";
import logoBozarts from "../assets/logo/logoBozarts.png";
import logoEstm from "../assets/logo/logoEtsm.jpg";
import logoIsep from "../assets/logo/logoIsep.png";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

const icon = (src: string) => (
  <img src={src} style={{ width: "18px", height: "18px" }} />
);

const experiences = [
  {
    id: "isep",
    company: "ISEP Paris",
    logo: logoIsep,
    type: "Education",
    subtitle: "General Engineering Degree — Specialization in Information Systems Architecture",
    period: "Sept 2022 — Sept 2025",
    location: "Paris, France",
    website: "https://www.isep.fr",
    twitter: "https://twitter.com/ISEP_Paris",
    linkedin: "https://www.linkedin.com/school/isep-paris/",
    tools: [
      { icon: icon(iconPython) },
      { icon: icon(iconJs) },
      { icon: icon(iconHtml) },
      { icon: icon(iconJava) },
    ],
    bullets: [],
  },
  {
    id: "estm",
    company: "ESTM Casablanca",
    logo: logoEstm,
    type: "Education",
    subtitle: "Classe Préparatoire MPSI/MP — Mathematics, Physics & Engineering Sciences",
    period: "2021 — 2024",
    location: "Casablanca, Morocco",
    website: "https://estem.ma/",
    twitter: null,
    linkedin: "https://www.linkedin.com/school/estemcasablanca/",
    tools: [
      { icon: icon(iconPython) },
      { icon: icon(iconMysql) },
    ],
    bullets: [],
  },
  {
    id: "artci",
    company: "ARTCI",
    logo: logoArtci,
    type: "Internship",
    subtitle: "Web Development Intern",
    period: "Jun 2023 — Sept 2023",
    location: "Côte d'Ivoire",
    website: "https://www.artci.ci",
    twitter: null,
    linkedin: null,
    tools: [
      { icon: icon(iconLaravel) },
      { icon: icon(iconMysql) },
      { icon: icon(iconHtml) },
      { icon: icon(iconJs) },
    ],
    bullets: [],
  },
  {
    id: "bozarts",
    company: "Bozarts",
    logo: logoBozarts,
    type: "Academic Project",
    subtitle: "Full-Stack Developer — Bozarts Project",
    period: "2024 — 2025",
    location: "Paris, Team Project",
    website: null,
    twitter: null,
    linkedin: null,
    tools: [
      { icon: icon(iconPhp) },
      { icon: icon(iconJs) },
      { icon: icon(iconDocker) },
      { icon: icon(iconMysql) },
      { icon: icon(iconHtml) },
    ],
    bullets: [],
  },
];

function Career() {
  const [active, setActive] = useState("isep");
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();
  const bullets = t.career.bullets as Record<string, string[]>;
  const current = {
    ...experiences.find((e) => e.id === active)!,
    bullets: bullets[active] ?? [],
  };

  const metaIconColor = c.text.faint;
  const statusBadgeBg = dark ? "rgba(245,197,24,0.1)" : "rgba(245,197,24,0.12)";

  return (
    <section
      id="work"
      style={{
        padding: isMobile ? "5rem 1.25rem 6rem" : "5rem 5rem 6rem",
        maxWidth: "72rem",
        margin: "0 auto",
        background: dark ? c.bg.page : "transparent",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: isMobile ? "1.25rem" : "0",
          marginBottom: "3rem",
        }}
      >
        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: c.accent.gold,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            {t.career.soFar}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2
              style={{
                fontSize: isMobile ? "2rem" : "2.5rem",
                fontWeight: 800,
                color: c.text.primary,
                lineHeight: 1,
              }}
            >
              {t.career.title}
            </h2>
            {!isMobile && (
              <button
                onClick={() => alert("Video coming soon 🎥")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.5rem 1rem 0.5rem 0.5rem",
                  border: "1px solid rgba(232,160,160,0.35)",
                  borderRadius: "9999px",
                  background: "rgba(232,160,160,0.07)",
                  cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,160,160,0.14)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,160,160,0.6)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,160,160,0.07)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,160,160,0.35)";
                }}
              >
                {/* Video bubble */}
                <span style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: c.accent.goldDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Video size={13} color="white" strokeWidth={2} />
                </span>
                <span style={{
                  fontSize: "0.88rem",
                  color: c.accent.goldDim,
                  fontStyle: "italic",
                  fontFamily: "Georgia, serif",
                  whiteSpace: "nowrap",
                }}>
                  {t.career.hearMe}
                </span>
              </button>
            )}
          </div>
        </div>

        <a
          href="/cv_fullStack_en.pdf"
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.6rem 1.1rem 0.6rem 0.7rem",
            borderRadius: "9999px",
            background: c.brand.ink,
            color: c.brand.inkContrast,
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.01em",
            boxShadow: "0 2px 12px rgba(26,26,46,0.18)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(26,26,46,0.28)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(26,26,46,0.18)";
          }}
        >
          <span style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: c.accent.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <ArrowDownToLine size={13} color={c.text.onAccent} strokeWidth={2.5} />
          </span>
          {t.career.resume}
        </a>
      </div>

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "220px 1fr",
          gap: isMobile ? "1.5rem" : "3rem",
        }}
      >
        {/* Liste */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            gap: "0.25rem",
            overflowX: isMobile ? "auto" : "visible",
            paddingBottom: isMobile ? "0.5rem" : "0",
          }}
        >
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActive(exp.id)}
              style={{
                textAlign: "left",
                padding: isMobile ? "0.5rem 0.85rem" : "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontWeight: active === exp.id ? 700 : 400,
                fontSize: "1rem",
                whiteSpace: isMobile ? "nowrap" : "normal",
                flexShrink: isMobile ? 0 : 1,
                color: active === exp.id ? c.text.primary : c.text.faint,
                background: active === exp.id ? (dark ? "#1e1e2e" : "#f3f4f6") : "transparent",
                borderLeft: isMobile ? "none" : (active === exp.id ? `3px solid ${c.accent.gold}` : "3px solid transparent"),
                borderBottom: isMobile ? (active === exp.id ? `2px solid ${c.accent.gold}` : "2px solid transparent") : "none",
                transition: "all 0.2s",
              }}
            >
              {exp.company}
              {!isMobile && (
                <span style={{ display: "block", fontSize: "1rem", fontWeight: 400, color: c.text.faint, marginTop: "0.1rem" }}>
                  {exp.type}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Détail */}
        <div style={{
          padding: isMobile ? "1.5rem" : "2rem",
          borderRadius: "1.25rem",
          background: c.bg.elevated,
          border: `1px solid ${dark ? c.bg.muted : "rgba(0,0,0,0.06)"}`,
          boxShadow: dark ? "none" : "0 4px 24px rgba(0,0,0,0.05)",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {current.logo && (
                <img
                  src={current.logo}
                  alt={current.company}
                  style={{ width: "52px", height: "52px", objectFit: "contain", borderRadius: "0.75rem", border: `1px solid ${dark ? c.border.default : "#cdd6f4"}`, padding: "6px", background: "#fff", flexShrink: 0 }}
                />
              )}
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: c.text.primary, marginBottom: "0.2rem" }}>
                  {current.company}
                </h3>
                <p style={{ fontSize: "0.9rem", color: c.text.muted }}>
                  {current.subtitle}
                </p>
              </div>
            </div>

            <span style={{
              fontSize: "0.72rem", fontWeight: 600, flexShrink: 0,
              padding: "0.25rem 0.65rem", borderRadius: "999px",
              background: statusBadgeBg,
              color: c.accent.goldDim, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {current.type}
            </span>
          </div>

          {/* Metadata */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
            paddingBottom: "1.25rem",
            borderBottom: `1px solid ${dark ? c.bg.muted : "#f3f4f6"}`,
            marginBottom: "1.25rem",
          }}>
            <span style={{ fontSize: "0.875rem", color: c.text.faint, fontWeight: 500 }}>
              {current.period}
            </span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
            <span style={{ fontSize: "0.875rem", color: c.text.faint }}>{current.location}</span>

            <div style={{ display: "flex", gap: "0.6rem", marginLeft: "auto" }}>
              {current.website && (
                <a href={current.website} target="_blank" rel="noopener noreferrer" style={{ color: metaIconColor, display: "flex", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = c.text.primary)} onMouseLeave={e => (e.currentTarget.style.color = metaIconColor)}>
                  <Globe size={15} />
                </a>
              )}
              {current.twitter && (
                <a href={current.twitter} target="_blank" rel="noopener noreferrer" style={{ color: metaIconColor, display: "flex", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = c.text.primary)} onMouseLeave={e => (e.currentTarget.style.color = metaIconColor)}>
                  <Twitter size={15} />
                </a>
              )}
              {current.linkedin && (
                <a href={current.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: metaIconColor, display: "flex", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = c.external.linkedin)} onMouseLeave={e => (e.currentTarget.style.color = metaIconColor)}>
                  <Linkedin size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Tech tools */}
          <div style={{ marginBottom: current.bullets.length ? "1.25rem" : 0 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: c.text.faint, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              {t.career.techTools}
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {current.tools.map((tool, i) => (
                <div key={i} style={{
                  padding: "0.4rem 0.6rem",
                  background: dark ? "rgba(255,255,255,0.04)" : "#f9fafb",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#cdd6f4"}`,
                  borderRadius: "0.5rem",
                }}>
                  {tool.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Bullets */}
          {current.bullets.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {current.bullets.map((bullet, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: c.accent.gold, fontWeight: 700, marginTop: "0.2rem", flexShrink: 0, fontSize: "0.75rem" }}>▸</span>
                  <p style={{ fontSize: "0.9rem", color: dark ? c.text.muted : "#4b5563", lineHeight: 1.7 }}>{bullet}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Career;
