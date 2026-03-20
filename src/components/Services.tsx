import { Cloud, Layers, Lightbulb } from "lucide-react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

const iconConfigs = [
  { Icon: Lightbulb },
  { Icon: Layers   },
  { Icon: Cloud    },
];

function Services() {
  const { t, dark } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const cols = isMobile ? 1 : isTablet ? 1 : 3;

  return (
    <section
      style={{
        padding: isMobile ? "2rem 1.25rem 4rem" : "2rem 5rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#f5c518", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          {t.services.label}
        </p>
        <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 800, color: dark ? "#f0f0f0" : "#1a1a2e", lineHeight: 1 }}>
          {t.services.title}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "1.25rem",
        }}
      >
        {t.services.cards.map((card, i) => {
          const { Icon } = iconConfigs[i];
          return (
            <div
              key={i}
              style={{
                padding: isMobile ? "1.75rem" : "2rem",
                borderRadius: "1.25rem",
                background: dark ? "#13131f" : "#ffffff",
                border: dark ? "1px solid #1e1e35" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: dark
                  ? "0 0 0 1px rgba(255,255,255,0.03)"
                  : "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = dark
                  ? "0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.4)"
                  : "0 8px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = dark
                  ? "0 0 0 1px rgba(255,255,255,0.03)"
                  : "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "0.875rem",
                  background: dark ? "rgba(245,197,24,0.1)" : "#1a1a2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Icon size={24} strokeWidth={1.75} color={dark ? "#f5c518" : "#f5c518"} />
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: dark ? "#f0f0f0" : "#1a1a2e",
                  lineHeight: 1.3,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: dark ? "#8080a0" : "#6b7280",
                  lineHeight: 1.75,
                }}
              >
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
