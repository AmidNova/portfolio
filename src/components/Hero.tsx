import {
  SiAmazonwebservices,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import PhotoPro from "../assets/images/Confident professional in office attire.png";

const skills = [
  { label: "React/Node", icon: <SiReact /> },
  { label: "Python", icon: <SiPython /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "AWS/Azure", icon: <SiAmazonwebservices /> },
];

function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#f8f7ff",
      }}
    >
      {/* Blob violet top center */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "60%",
          height: "70%",
          background:
            "radial-gradient(ellipse, rgba(167,139,250,0.45) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob rose top right */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "40%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(244,114,182,0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Blob lavande top left */}
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "-10%",
          width: "35%",
          height: "45%",
          background:
            "radial-gradient(ellipse, rgba(196,181,253,0.4) 0%, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      {/* Ligne incurvée SVG comme Moya */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          opacity: 0.15,
        }}
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path
          d="M-100,200 Q400,50 800,180 Q1200,310 1600,100"
          stroke="rgba(139,92,246,0.6)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-100,300 Q500,150 900,280 Q1300,410 1700,200"
          stroke="rgba(167,139,250,0.4)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      {/* Fade bas */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background: "linear-gradient(to top, #ffffff 20%, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Contenu */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "72rem",
          margin: "0 auto",
          paddingTop: "9rem",
          paddingBottom: "4rem",
          paddingLeft: "5rem",
          paddingRight: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "4rem",
          minHeight: "100vh",
          boxSizing: "border-box" as const,
        }}
      >
        <div style={{ flex: 1, maxWidth: "36rem" }}>
          <h1
            style={{
              fontSize: "3.75rem",
              fontWeight: 800,
              color: "#1a1a2e",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Hi, I'm Soro Amidou
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            I specialize in building full-stack applications and deploying
            scalable cloud systems. I love turning ideas into scalable reality.
            My focus is on building robust architecture and delivering software
            that solves real problems.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "0.75rem",
              marginBottom: "2.5rem",
              overflow: "hidden",
            }}
          >
            {skills.map((skill) => (
              <span
                key={skill.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "999px",
                  background: "#1e1b4b",
                  border: "1px solid rgba(139,92,246,0.3)",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {skill.icon}
                </span>
                {skill.label}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href="#work"
              style={{
                padding: "0.75rem 1.75rem",
                background: "#f5c518",
                color: "#1a1a2e",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(245,197,24,0.4)",
              }}
            >
              See My Work
            </a>
            <a
              href="mailto:soro.amidou@isep.fr"
              style={{
                padding: "0.75rem 1.75rem",
                border: "1px solid #d1d5db",
                color: "#4b5563",
                fontWeight: 600,
                fontSize: "0.9rem",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
            width: "420px",
            height: "580px",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <img
            src={PhotoPro}
            alt="Soro Amidou"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
