import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import PhotoPro     from "../assets/images/Confident professional in office attire.webp";
import PhotoLouvre  from "../assets/images/MoiAuLouvre.webp";
import PhotoSeul    from "../assets/images/MoiSeul.webp";
import PhotoLit     from "../assets/images/MoiQuiLit.webp";
import PhotoScene   from "../assets/images/MoiAUnConcoursEloquence.webp";
import PhotoTrophee from "../assets/images/MoiEtTrophéEloquence.webp";
import { useLang }       from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PASSIONS = [
  { title: "Reading", desc: "Too much, honestly. History, philosophy, novels — the older the better." },
  { title: "Chess",   desc: "A love for systems and strategy. Every game is a problem to solve." },
  { title: "Running", desc: "The only time I stop thinking about code. Almost." },
] as const;

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.08 }
    );

    const root = ref.current;
    if (root) {
      root
        .querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
        .forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Shared hover handlers ────────────────────────────────────────────────────

function liftOnHover(e: MouseEvent<HTMLElement>) {
  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
}
function resetLift(e: MouseEvent<HTMLElement>) {
  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
}

// ─── Component ────────────────────────────────────────────────────────────────

function About() {
  const ref = useRevealOnScroll();
  const { dark }     = useLang();
  const { isMobile } = useResponsive();

  // Palette — adapts to dark mode
  const bg  = dark ? "#0d0d1a" : "#fafaf8";
  const bgB = dark ? "#111120" : "#f2f0fb";
  const txt = dark ? "#ededf0" : "#111";
  const sub = dark ? "#6a6a90" : "#525252";

  // ─ Layout helpers ─
  const panel: CSSProperties = {
    display: "flex",
    overflow: "hidden",
    flexDirection: isMobile ? "column" : "row",
  };

  const textSide = (extra?: CSSProperties): CSSProperties => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: isMobile ? "4rem 1.5rem" : "5rem 5.5rem",
    ...extra,
  });

  const photoSide = (extra?: CSSProperties): CSSProperties => ({
    flex: isMobile ? "0 0 auto" : "0 0 46%",
    height: isMobile ? "68vw" : "auto",
    minHeight: isMobile ? "260px" : "auto",
    overflow: "hidden",
    ...extra,
  });

  const coverImg: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
  };

  // ─ Shared text styles ─
  const h2: CSSProperties = {
    fontSize: isMobile ? "2rem" : "clamp(2rem, 3vw, 2.75rem)",
    fontWeight: 800,
    color: txt,
    lineHeight: 1.15,
    marginBottom: "2rem",
    letterSpacing: "-0.025em",
  };

  const body: CSSProperties = {
    fontSize: "1rem",
    color: sub,
    lineHeight: 2.05,
    maxWidth: "400px",
  };

  return (
    <>
      <style>{`
        .reveal-up    { opacity: 0; transform: translateY(48px);  transition: opacity .95s cubic-bezier(.16,1,.3,1), transform .95s cubic-bezier(.16,1,.3,1); }
        .reveal-left  { opacity: 0; transform: translateX(-52px); transition: opacity 1.05s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1); }
        .reveal-right { opacity: 0; transform: translateX(52px);  transition: opacity 1.05s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1); }
        .reveal-up.visible, .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: translate(0); }
        .delay-1 { transition-delay: .10s; }
        .delay-2 { transition-delay: .25s; }
        .delay-3 { transition-delay: .40s; }
        .delay-4 { transition-delay: .55s; }
        .eyebrow { display: block; font-size: .64rem; font-weight: 700; letter-spacing: .3em; text-transform: uppercase; color: #f5c518; margin-bottom: 1.1rem; }
        .divider { width: 32px; height: 1px; background: #f5c518; margin-bottom: 2.5rem; }
      `}</style>

      <div ref={ref} style={{ background: bg, overflowX: "hidden" }}>

        {/* ─── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{ ...panel, minHeight: "100vh", background: bg }}>
          <div style={textSide({ padding: isMobile ? "8rem 1.5rem 4rem" : "8rem 5.5rem" })}>
            <span className="reveal-up eyebrow">The story so far</span>
            <h1
              className="reveal-up delay-1"
              style={{
                fontSize: isMobile ? "2.75rem" : "clamp(2.8rem, 4.5vw, 4.25rem)",
                fontWeight: 900,
                color: txt,
                lineHeight: 1.06,
                marginBottom: "1.75rem",
                letterSpacing: "-0.03em",
              }}
            >
              I spent years convinced
              <br />
              <span style={{ color: "#a87bfd" }}>I had no talent.</span>
            </h1>
            <p className="reveal-up delay-2" style={{ fontSize: "1.1rem", color: sub, lineHeight: 1.9, maxWidth: "360px", marginBottom: "3rem" }}>
              Turns out I just hadn't found my medium.
            </p>
            <div className="reveal-up delay-3" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "26px", height: "1px", background: "#f5c518" }} />
              <span style={{ fontSize: "0.66rem", letterSpacing: "0.15em", color: dark ? "#36365a" : "#ccc", textTransform: "uppercase" }}>
                Scroll
              </span>
            </div>
          </div>

          {isMobile ? (
            <div style={{ height: "70vw", overflow: "hidden", flexShrink: 0 }}>
              <img src={PhotoPro} alt="Soro Amidou" loading="lazy" style={coverImg} />
            </div>
          ) : (
            <div className="reveal-right" style={photoSide({ flex: "0 0 46%" })}>
              <img src={PhotoPro} alt="Soro Amidou" loading="lazy" style={coverImg} />
            </div>
          )}
        </section>

        {/* ─── Chapter I — The art I couldn't make ──────────────────────────── */}
        <section style={{ ...panel, minHeight: isMobile ? "auto" : "82vh", background: bgB }}>
          <div className="reveal-left" style={photoSide({ position: "relative" })}>
            <img src={PhotoLouvre} alt="Au Louvre" loading="lazy" style={coverImg} />
            <span style={{
              position: "absolute", bottom: "1.25rem", left: "1.25rem",
              background: "#f5c518", color: "#1a1a2e",
              fontSize: "0.63rem", fontWeight: 700, letterSpacing: "0.08em", padding: "0.3rem 0.8rem",
            }}>
              Louvre, Paris
            </span>
          </div>
          <div style={textSide()}>
            <div className="divider reveal-up" />
            <span className="reveal-up eyebrow">Chapter I</span>
            <h2 className="reveal-up delay-1" style={h2}>The art I couldn't make</h2>
            <p className="reveal-up delay-2" style={{ ...body, marginBottom: "1.25rem" }}>
              Growing up, I watched others paint, sing, dance — and I felt like I was standing outside
              a room I wasn't allowed into. My fingers were too used to equations. My voice too ordinary.
              My body too rigid for rhythm.
            </p>
            <p className="reveal-up delay-3" style={body}>
              I told myself art wasn't for me. I was wrong about what art <em>was</em>.
            </p>
          </div>
        </section>

        {/* ─── Chapter II — The day equations came alive ─────────────────────── */}
        <section style={{ ...panel, minHeight: isMobile ? "auto" : "82vh", background: bg }}>
          <div style={textSide({ order: isMobile ? 2 : 1 })}>
            <div className="divider reveal-up" />
            <span className="reveal-up eyebrow">Chapter II</span>
            <h2 className="reveal-up delay-1" style={h2}>The day equations came alive</h2>
            <p className="reveal-up delay-2" style={{ ...body, marginBottom: "1.25rem" }}>
              Then I discovered code. And something clicked that I can't fully explain.
            </p>
            <p className="reveal-up delay-3" style={{ ...body, marginBottom: "1.25rem" }}>
              I could give body and life to equations. Represent the real world inside a machine.
              Turn logic into something someone could <em>feel</em>.
            </p>
            <p className="reveal-up delay-4" style={body}>
              For the first time, I understood — this was my medium.
            </p>
          </div>
          <div className="reveal-right" style={photoSide({ order: isMobile ? 1 : 2 })}>
            <img src={PhotoSeul} alt="Soro Amidou" loading="lazy" style={coverImg} />
          </div>
        </section>

        {/* ─── Pull quote ────────────────────────────────────────────────────── */}
        <section style={{ padding: isMobile ? "7rem 1.5rem" : "11rem 5rem", textAlign: "center", background: bgB }}>
          <div className="reveal-up" style={{ maxWidth: "780px", margin: "0 auto" }}>
            <div style={{
              fontSize: isMobile ? "5rem" : "9rem", lineHeight: 0.8,
              color: "#f5c518", fontFamily: "Georgia, serif",
              opacity: 0.4, marginBottom: "1.5rem",
            }}>"</div>
            <p style={{
              fontSize: isMobile ? "1.45rem" : "clamp(1.45rem, 2.8vw, 2.35rem)",
              fontWeight: 600, color: txt, lineHeight: 1.5,
              fontStyle: "italic", letterSpacing: "-0.015em",
            }}>
              I didn't find creativity. I found out it had been there all along — just waiting for the right language.
            </p>
          </div>
        </section>

        {/* ─── Interlude — Stage (cinematic full-screen) ─────────────────────── */}
        <section style={{ position: "relative", height: isMobile ? "70vw" : "88vh", overflow: "hidden" }}>
          <img
            src={PhotoScene}
            alt="Sur scène au concours d'éloquence — ISEP"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }} />
          <div className="reveal-up" style={{
            position: "absolute",
            bottom: isMobile ? "2rem" : "5rem",
            left:  isMobile ? "1.5rem" : "5.5rem",
            right: isMobile ? "1.5rem" : "30%",
          }}>
            <span style={{
              display: "block", fontSize: "0.64rem", fontWeight: 700,
              color: "#f5c518", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem",
            }}>
              Interlude
            </span>
            <h2 style={{
              fontSize: isMobile ? "2.25rem" : "clamp(2.75rem, 6vw, 5rem)",
              fontWeight: 900, color: "#fff", lineHeight: 1.02,
              letterSpacing: "-0.03em", textShadow: "0 4px 40px rgba(0,0,0,0.4)",
            }}>
              The night I<br />found my voice.
            </h2>
          </div>
        </section>

        {/* ─── Interlude — Trophy ────────────────────────────────────────────── */}
        <section style={{ ...panel, minHeight: isMobile ? "auto" : "72vh", background: "#1a1a2e" }}>
          <div className="reveal-left" style={photoSide({ position: "relative" })}>
            <img src={PhotoTrophee} alt="Trophée éloquence ISEP" loading="lazy" style={coverImg} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 65%, rgba(26,26,46,0.65) 100%)",
              pointerEvents: "none",
            }} />
          </div>
          <div style={textSide()}>
            <p className="reveal-up" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", lineHeight: 2.05, marginBottom: "1.25rem", maxWidth: "400px" }}>
              I've always believed that the best engineers aren't just builders — they're storytellers.
              Ideas that can't be communicated don't exist.
            </p>
            <p className="reveal-up delay-1" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", lineHeight: 2.05, marginBottom: "2.5rem", maxWidth: "400px" }}>
              So when I competed in an eloquence championship at ISEP — and walked away with the trophy —
              it felt like two sides of the same coin finally clicking together.
            </p>
            <div className="reveal-up delay-2" style={{
              display: "inline-flex", alignItems: "center", gap: "0.75rem",
              padding: "0.6rem 1.25rem",
              border: "1px solid rgba(245,197,24,0.3)",
              borderRadius: "9999px", alignSelf: "flex-start",
            }}>
              <span>🏆</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c9a43a", letterSpacing: "0.03em" }}>
                Éloquence Championship — ISEP
              </span>
            </div>
          </div>
        </section>

        {/* ─── Chapter IV — Outside the terminal ────────────────────────────── */}
        <section style={{ ...panel, minHeight: isMobile ? "auto" : "76vh" }}>
          <div style={{ ...textSide({ order: isMobile ? 2 : 1 }), background: "#1a1a2e" }}>
            <div className="divider reveal-up" />
            <span className="reveal-up eyebrow">Chapter IV</span>
            <h2 className="reveal-up delay-1" style={{ ...h2, color: "#ededf0" }}>
              Outside the terminal
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {PASSIONS.map((item, i) => (
                <div key={item.title} className={`reveal-up delay-${i + 1}`} style={{
                  padding: "1.75rem 0",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ededf0", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right" style={{ ...photoSide({ order: isMobile ? 1 : 2 }), position: "relative" }}>
            <img src={PhotoLit} alt="Reading" loading="lazy" style={{ ...coverImg, filter: "brightness(0.88) saturate(0.9)" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(26,26,46,0.55) 0%, transparent 40%)",
              pointerEvents: "none",
            }} />
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────────────────────────── */}
        <section style={{ padding: isMobile ? "9rem 1.5rem" : "14rem 5rem", textAlign: "center", background: bg }}>
          <div className="divider reveal-up" style={{ margin: "0 auto 1.1rem" }} />
          <span className="reveal-up eyebrow" style={{ textAlign: "center" }}>Now you know me</span>
          <h2
            className="reveal-up delay-1"
            style={{
              fontSize: isMobile ? "2.5rem" : "clamp(2.75rem, 5.5vw, 4.25rem)",
              fontWeight: 900, color: txt, lineHeight: 1.06,
              marginBottom: "1.5rem", letterSpacing: "-0.035em",
            }}
          >
            Let's build something<br />that matters.
          </h2>
          <p className="reveal-up delay-2" style={{ fontSize: "1.05rem", color: sub, lineHeight: 1.85, maxWidth: "380px", margin: "0 auto 3.5rem" }}>
            I'm available for internships, collaborations, and projects that solve real problems.
          </p>
          <div className="reveal-up delay-3" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="mailto:amidousorox23@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "1rem 2.5rem",
                background: "#f5c518", color: "#1a1a2e",
                fontWeight: 700, fontSize: "1rem",
                textDecoration: "none", borderRadius: "9999px",
                transition: "transform .25s ease",
              }}
              onMouseEnter={liftOnHover}
              onMouseLeave={resetLift}
            >
              Get in touch
            </a>
            <Link
              to="/"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "1rem 2.5rem",
                border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", borderRadius: "9999px",
                transition: "transform .25s ease",
              }}
              onMouseEnter={liftOnHover}
              onMouseLeave={resetLift}
            >
              See my work
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

export default About;
