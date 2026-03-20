// TODO: Repenser la page About comme une histoire narrative (storytelling chronologique ou thématique)
import PhotoPro from "../assets/images/Confident professional in office attire.png";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

const divider = (dark: boolean) => (
  <div style={{ height: "1px", background: dark ? "#1e1e35" : "#f0f0f0", margin: "2.5rem 0" }} />
);

const sectionLabel = (text: string) => (
  <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#9ca3af", marginBottom: "1.25rem" }}>
    {text}
  </p>
);

function About() {
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();

  return (
    <section
      style={{
        padding: isMobile ? "6rem 1.25rem 4rem" : "8rem 5rem 6rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header + photo */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 300px",
        gap: isMobile ? "2.5rem" : "5rem",
        alignItems: "flex-start",
        marginBottom: "0",
      }}>
        <div>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f5c518", marginBottom: "1rem" }}>
            {t.about.title}
          </p>
          <h1 style={{
            fontSize: isMobile ? "1.9rem" : "2.6rem",
            fontWeight: 800,
            color: dark ? "#f0f0f0" : "#1a1a2e",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "2rem",
          }}>
            {t.about.tagline}
          </h1>

          {sectionLabel(t.about.background)}
          <p style={{ fontSize: "1rem", color: dark ? "#a0a0b8" : "#4b5563", lineHeight: 1.85, marginBottom: "1rem" }}>
            {t.about.bio1}
          </p>
          <p style={{ fontSize: "1rem", color: dark ? "#a0a0b8" : "#4b5563", lineHeight: 1.85 }}>
            {t.about.bio2}
          </p>
        </div>

        {/* Photo */}
        <div style={{
          width: "100%",
          height: isMobile ? "280px" : "380px",
          borderRadius: "1.25rem",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.4)" : "0 20px 50px rgba(0,0,0,0.1)",
        }}>
          <img src={PhotoPro} alt="Soro Amidou" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
        </div>
      </div>

      {divider(dark)}

      {/* Education */}
      {sectionLabel(t.about.education)}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {t.about.educationItems.map((item, i) => (
          <p key={i} style={{ fontSize: "1rem", color: dark ? "#c0c0d0" : "#1a1a2e", lineHeight: 1.7 }}>
            {item}
          </p>
        ))}
      </div>

      {divider(dark)}

      {/* Skills */}
      {sectionLabel(t.about.skills)}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {t.about.skillItems.map((s) => (
          <div key={s.label} style={{ display: "flex", gap: "1.5rem", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "baseline" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", minWidth: "140px", flexShrink: 0 }}>
              {s.label}
            </span>
            <span style={{ fontSize: "0.95rem", color: dark ? "#8080a0" : "#6b7280", lineHeight: 1.6 }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {divider(dark)}

      {/* Certifications + Languages */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem" }}>
        <div>
          {sectionLabel(t.about.certifications)}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {t.about.certificationItems.map((c, i) => (
              <p key={i} style={{ fontSize: "0.95rem", color: dark ? "#c0c0d0" : "#4b5563" }}>— {c}</p>
            ))}
          </div>
        </div>
        <div>
          {sectionLabel(t.about.languages)}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {t.about.languageItems.map((l) => (
              <p key={l.label} style={{ fontSize: "0.95rem", color: dark ? "#c0c0d0" : "#4b5563" }}>
                <span style={{ fontWeight: 600, color: dark ? "#f0f0f0" : "#1a1a2e" }}>{l.label}</span> — {l.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
