import { useEffect, useState } from "react";
import PhotoPro from "../assets/images/Confident professional in office attire.webp";
import { useLang } from "../context/LangContext";
import { useResponsive, usePrefersReducedMotion } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

const stack = ["React/Node", "Python", "TypeScript", "AWS/Azure", "Kafka", "Airflow"];

/** Types `text` char-by-char while `active`, then calls onDone once. */
function Typed({ text, active, onDone }: { text: string; active: boolean; onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (n >= text.length) { onDone(); return; }
    const t = setTimeout(() => setN((v) => v + 1), 42);
    return () => clearTimeout(t);
  }, [active, n, text, onDone]);
  return <>{active ? text.slice(0, n) : text}</>;
}

function Hero() {
  const { t, dark } = useLang();
  const { isMobile, isTablet } = useResponsive();
  const reduced = usePrefersReducedMotion();
  const c = useThemeColors();

  // Boot sequence: command i types, then its output reveals, then i+1 starts.
  const STEPS = 4;
  const [stage, setStage] = useState(reduced ? STEPS : 0);
  const advance = (i: number) => setStage((s) => (s === i ? i + 1 : s));

  const termBorder = dark ? "#30363d" : c.border.default;
  const cardBg = dark ? "#161b22" : "#ffffff";
  const titleBarBg = dark ? "#0d1117" : "#f3f3f1";
  const green = c.accent.gold;
  const pathBlue = dark ? "#79c0ff" : "#0969da";
  const flag = c.accent.secondary;

  const Prompt = () => <span style={{ color: green }}>$</span>;
  const cursor = (show: boolean) =>
    show ? <span className="term-cursor" style={{ color: c.text.primary }} aria-hidden="true" /> : null;

  const TitleBar = ({ label }: { label: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 0.9rem", background: titleBarBg, borderBottom: `1px solid ${termBorder}` }}>
      <span style={{ fontSize: "0.8rem", color: green }}>$</span>
      <span style={{ fontSize: "0.8rem", color: c.text.faint }}>{label}</span>
    </div>
  );

  const cmdStyle = { fontSize: "0.95rem", color: c.text.muted, marginBottom: "0.6rem" } as const;

  return (
    <section id="home" style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "72rem",
          margin: "0 auto",
          paddingTop: isMobile ? "6rem" : "8rem",
          paddingBottom: "4rem",
          paddingLeft: isMobile ? "1.25rem" : "2.5rem",
          paddingRight: isMobile ? "1.25rem" : "2.5rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: isMobile ? "2rem" : "2.5rem",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Terminal window */}
        <div style={{
          flex: 1,
          maxWidth: isMobile ? "100%" : "40rem",
          border: `1px solid ${termBorder}`,
          background: cardBg,
          boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}>
          <TitleBar label="soro@portfolio: ~/whoami" />
          <div style={{ padding: isMobile ? "1.5rem 1.25rem" : "2rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>

            {/* whoami */}
            <div>
              <p style={cmdStyle}>
                <Prompt /> <Typed text=" whoami" active={stage === 0} onDone={() => advance(0)} />{cursor(stage === 0)}
              </p>
              {stage > 0 && (
                <h1 style={{
                  fontSize: isMobile ? "2.2rem" : isTablet ? "3rem" : "3.6rem",
                  fontWeight: 800,
                  color: c.text.primary,
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                }}>
                  {t.hero.greeting}
                </h1>
              )}
            </div>

            {/* bio */}
            {stage > 0 && (
              <div>
                <p style={cmdStyle}>
                  <Prompt /> <Typed text=" cat bio.txt" active={stage === 1} onDone={() => advance(1)} />{cursor(stage === 1)}
                </p>
                {stage > 1 && (
                  <p className="prose" style={{ fontSize: "1rem", color: c.text.secondary, lineHeight: 1.8 }}>
                    {t.hero.bio}
                  </p>
                )}
              </div>
            )}

            {/* stack */}
            {stage > 1 && (
              <div>
                <p style={cmdStyle}>
                  <Prompt /> <span style={{ color: c.text.secondary }}>ls</span> <span style={{ color: flag }}><Typed text="--stack" active={stage === 2} onDone={() => advance(2)} /></span>{cursor(stage === 2)}
                </p>
                {stage > 2 && (
                  <div className="hide-scrollbar" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {stack.map((s) => (
                      <span key={s} style={{
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: c.text.secondary,
                        border: `1px solid ${termBorder}`,
                        padding: "0.25rem 0.6rem",
                        whiteSpace: "nowrap",
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            {stage > 2 && (
              <div>
                <p style={cmdStyle}>
                  <Prompt /> <span style={{ color: pathBlue }}>./run</span>{cursor(stage >= 3)}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="#work"
                    style={{
                      padding: "0.65rem 1.4rem",
                      background: green,
                      color: dark ? "#0b1f17" : "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      border: `1px solid ${green}`,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                  >
                    &gt; {t.hero.seeWork}
                  </a>
                  <a
                    href="mailto:amidousorox23@gmail.com"
                    style={{
                      padding: "0.65rem 1.4rem",
                      border: `1px solid ${termBorder}`,
                      color: c.text.primary,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      background: "transparent",
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = green;
                      (e.currentTarget as HTMLAnchorElement).style.color = green;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = termBorder;
                      (e.currentTarget as HTMLAnchorElement).style.color = c.text.primary;
                    }}
                  >
                    {t.hero.contact}
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Photo — framed */}
        <div style={{
          flexShrink: 0,
          width: isMobile ? "100%" : isTablet ? "280px" : "340px",
          alignSelf: "center",
          border: `1px solid ${termBorder}`,
          background: cardBg,
          boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <TitleBar label="~/portrait.webp" />
          <div style={{ width: "100%", height: isMobile ? "320px" : isTablet ? "360px" : "440px", overflow: "hidden" }}>
            <img
              src={PhotoPro}
              alt="Soro Amidou"
              fetchPriority="high"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
