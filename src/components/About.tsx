import PhotoPro from "../assets/images/Confident professional in office attire.png";

function About() {
  return (
    <section
      id="about"
      style={{
        padding: "6rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1a1a2e",
          }}
        >
          About
        </h2>
        <p
          style={{ color: "#9ca3af", marginTop: "0.5rem", fontSize: "0.9rem" }}
        >
          soro.amidou@isep.fr
        </p>
      </div>

      {/* Photo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "4rem",
        }}
      >
        <div
          style={{
            width: "420px",
            height: "480px",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src={PhotoPro}
            alt="Soro Amidou"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </div>

      {/* Contenu deux colonnes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "3rem 4rem",
        }}
      >
        {/* Background */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e" }}>
            Background
          </h3>
        </div>
        <div>
          <p
            style={{
              color: "#4b5563",
              lineHeight: 1.8,
              fontSize: "0.95rem",
              marginBottom: "1rem",
            }}
          >
            I am a full-stack engineering student at ISEP Paris, specializing in
            Information Systems Architecture. I build full-stack applications,
            deploy scalable cloud systems, and deliver applied solutions at the
            intersection of software engineering and AI.
          </p>
          <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Passionate about clean architecture, real-time performance, and
            software that solves real problems. I connect technical execution
            with meaningful impact.
          </p>
        </div>

        {/* Séparateur */}
        <div
          style={{ gridColumn: "1 / -1", height: "1px", background: "#f3f4f6" }}
        />

        {/* Education */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e" }}>
            Education
          </h3>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {[
            "Bachelor's in Information Systems Architecture — ISEP Paris (2022 — Present)",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <span
                style={{ color: "#f5c518", fontWeight: 700, flexShrink: 0 }}
              >
                •
              </span>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Séparateur */}
        <div
          style={{ gridColumn: "1 / -1", height: "1px", background: "#f3f4f6" }}
        />

        {/* Skills */}
        <div>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e" }}>
            Skills
          </h3>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[
            {
              label: "Frontend",
              value: "React, Next.js, TypeScript, HTML, CSS, JavaScript",
            },
            {
              label: "Backend",
              value: "Node.js, Express.js, PHP, Laravel, Python",
            },
            { label: "Database", value: "MySQL, PostgreSQL" },
            { label: "Tools", value: "Git, Docker, VS Code, Figma" },
            {
              label: "Languages",
              value: "Java, Python, JavaScript, TypeScript, PHP",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <span
                style={{ color: "#f5c518", fontWeight: 700, flexShrink: 0 }}
              >
                •
              </span>
              <p
                style={{
                  color: "#4b5563",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "#1a1a2e" }}>{s.label}:</strong>{" "}
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
