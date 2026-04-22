import {
  SiAmazonwebservices,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import PhotoPro from "../assets/images/Confident professional in office attire.webp";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

const skills = [
  { label: "React/Node", icon: <SiReact /> },
  { label: "Python", icon: <SiPython /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "AWS/Azure", icon: <SiAmazonwebservices /> },
];

// Light-mode skill pill background — deliberate editorial indigo, outside the theme palette.
const SKILL_PILL_BG_LIGHT = "#1e1b4b";

function Hero() {
  const { t, dark } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const c = useThemeColors();

  const photoBorder = dark ? `1px solid ${c.border.default}` : "1px solid #e5e5e5";
  const ctaOutlineBorder = dark ? "rgba(255,255,255,0.12)" : "rgba(26,26,46,0.15)";
  const ctaOutlineBorderHover = dark ? "rgba(255,255,255,0.25)" : "rgba(26,26,46,0.3)";
  const ctaOutlineBgHover = dark ? "rgba(255,255,255,0.06)" : "rgba(26,26,46,0.05)";

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contenu */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "72rem",
          margin: "0 auto",
          paddingTop: isMobile ? "7rem" : "9rem",
          paddingBottom: "4rem",
          paddingLeft: isMobile ? "1.25rem" : "5rem",
          paddingRight: isMobile ? "1.25rem" : "5rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "2.5rem" : "4rem",
          minHeight: "100vh",
          boxSizing: "border-box" as const,
        }}
      >
        {/* Photo mobile — en haut */}
        {isMobile && (
          <div style={{ width: "100%", height: "320px", borderRadius: "1.25rem", overflow: "hidden", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.15)", border: photoBorder }}>
            <img src={PhotoPro} alt="Soro Amidou" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        )}

        <div style={{ flex: 1, maxWidth: isMobile ? "100%" : "36rem" }}>
          <h1
            style={{
              fontSize: isMobile ? "2.5rem" : isTablet ? "3.2rem" : "4rem",
              fontWeight: 800,
              color: c.text.primary,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              letterSpacing: "-0.02em",
            }}
          >
            {t.hero.greeting}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: dark ? c.text.muted : "#4b5563",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            {t.hero.bio}
          </p>

          {/* Skills */}
          <div className="hide-scrollbar" style={{ display: "flex", flexWrap: "nowrap", gap: "0.75rem", marginBottom: "2.5rem", overflowX: "auto" }}>
            {skills.map((skill) => (
              <span
                key={skill.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "999px",
                  background: dark ? c.bg.elevated : SKILL_PILL_BG_LIGHT,
                  border: dark ? "1px solid rgba(203,166,247,0.25)" : "1px solid rgba(139,92,246,0.3)",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "1rem",
                  whiteSpace: "nowrap" as const,
                }}
              >
                <span style={{ fontSize: "1rem", display: "flex", alignItems: "center" }}>{skill.icon}</span>
                {skill.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#work"
              style={{
                padding: "0.8rem 1.9rem",
                background: c.accent.gold,
                color: c.text.onAccent,
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(245,197,24,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(245,197,24,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(245,197,24,0.35)";
              }}
            >
              {t.hero.seeWork}
            </a>
            <a
              href="mailto:amidousorox23@gmail.com"
              style={{
                padding: "0.8rem 1.9rem",
                border: `1px solid ${ctaOutlineBorder}`,
                color: dark ? "#bac2de" : c.brand.ink,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                background: "transparent",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = ctaOutlineBgHover;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = ctaOutlineBorderHover;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = ctaOutlineBorder;
              }}
            >
              {t.hero.contact}
            </a>
          </div>
        </div>

        {/* Photo desktop */}
        {!isMobile && (
          <div style={{ flexShrink: 0, width: isTablet ? "320px" : "420px", height: isTablet ? "440px" : "580px", borderRadius: "1.5rem", overflow: "hidden", boxShadow: dark ? "0 30px 80px rgba(0,0,0,0.6)" : "0 30px 80px rgba(0,0,0,0.18)", border: photoBorder }}>
            <img src={PhotoPro} alt="Soro Amidou" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
