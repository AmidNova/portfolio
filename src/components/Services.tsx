import { Cloud, Layers, Lightbulb } from "lucide-react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

const iconConfigs = [
  { Icon: Lightbulb },
  { Icon: Layers   },
  { Icon: Cloud    },
];

function Services() {
  const { t, dark } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const c = useThemeColors();
  const cols = isMobile ? 1 : isTablet ? 1 : 3;

  const termBorder = dark ? "#30363d" : c.border.default;
  const cardBg = dark ? "#161b22" : "#ffffff";

  return (
    <section
      style={{
        padding: isMobile ? "5rem 1.25rem 4rem" : "5rem 2.5rem 6rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.95rem", color: c.text.muted, marginBottom: "0.5rem" }}>
          <span style={{ color: c.accent.gold }}>$</span> ls <span style={{ color: dark ? "#79c0ff" : "#0969da" }}>./services</span>
        </p>
        <h2 style={{ fontSize: isMobile ? "1.9rem" : "2.4rem", fontWeight: 800, color: c.text.primary, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
          {t.services.title}
        </h2>
        <p className="tnum" style={{ fontSize: "0.8rem", color: c.text.faint }}>
          → {t.services.cards.length} capabilities
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "1rem",
        }}
      >
        {t.services.cards.map((card, i) => {
          const { Icon } = iconConfigs[i];
          return (
            <div
              key={i}
              style={{
                position: "relative",
                padding: isMobile ? "1.75rem" : "2rem",
                background: cardBg,
                border: `1px solid ${termBorder}`,
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = c.accent.gold;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = termBorder;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Index */}
              <span style={{ position: "absolute", top: "1.25rem", right: "1.25rem", fontSize: "0.8rem", fontWeight: 600, color: c.accent.secondary }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon box */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  border: `1px solid ${c.accent.gold}`,
                  background: c.accent.goldSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Icon size={22} strokeWidth={1.75} color={c.accent.gold} />
              </div>

              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: c.text.primary,
                  lineHeight: 1.3,
                  marginBottom: "0.75rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.title}
              </h3>
              <p
                className="prose"
                style={{
                  fontSize: "0.92rem",
                  color: c.text.muted,
                  lineHeight: 1.8,
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
