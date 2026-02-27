import { Github, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #f3f4f6",
        padding: "3rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left */}
      <div>
        <p
          style={{
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#1a1a2e",
            marginBottom: "0.25rem",
          }}
        >
          SA <span style={{ color: "#f5c518" }}>·</span> Soro Amidou
        </p>
        <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
          © 2025 — Built with React & TypeScript
        </p>
      </div>

      {/* Center — CTA */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "0.85rem",
            color: "#6b7280",
            marginBottom: "0.75rem",
          }}
        >
          Interested in working together?
        </p>
        <a
          href="mailto:soro.amidou@isep.fr"
          style={{
            padding: "0.6rem 1.5rem",
            background: "#1a1a2e",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.85rem",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          Send Me a Message
        </a>
      </div>

      {/* Right — socials */}
      <div style={{ display: "flex", gap: "1.25rem" }}>
        <a
          href="https://github.com"
          target="_blank"
          style={{ color: "#9ca3af" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          style={{ color: "#9ca3af" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:soro.amidou@isep.fr"
          style={{ color: "#9ca3af" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        >
          <Mail size={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
