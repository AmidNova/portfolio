import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: "0.75rem",
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 4rem",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          textDecoration: "none",
        }}
      >
        <span
          style={{ fontWeight: 800, fontSize: "0.85rem", color: "#1a1a2e" }}
        >
          SA
        </span>
        <span
          style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a2e" }}
        >
          Soro Amidou
        </span>
      </Link>

      {/* Pill nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "9999px",
          padding: "0.35rem",
          gap: "0.1rem",
          boxShadow:
            "0 4px 24px rgba(120,60,200,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              onMouseEnter={() => setHovered(link.label)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
                background: isActive
                  ? "#1a1a2e"
                  : hovered === link.label
                    ? "rgba(255,255,255,0.6)"
                    : "transparent",
                color: isActive ? "#ffffff" : "#4b5563",
                boxShadow: isActive ? "0 2px 12px rgba(26,26,46,0.2)" : "none",
              }}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Explore — bouton spécial 3D */}
        <button
          onMouseEnter={() => setHovered("Explore")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => alert("3D Library — coming soon 🚀")}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.25s ease",
            background:
              hovered === "Explore" ? "rgba(245,197,24,0.15)" : "transparent",
            color: "#f5c518",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          ✦ Explore
        </button>
      </div>

      {/* Socials + toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <a
          href="https://github.com"
          target="_blank"
          style={{
            color: "#6b7280",
            transition: "color 0.2s",
            display: "flex",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <Github size={19} />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          style={{
            color: "#6b7280",
            transition: "color 0.2s",
            display: "flex",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <Linkedin size={19} />
        </a>

        <a
          href="mailto:soro.amidou@isep.fr"
          style={{
            color: "#6b7280",
            transition: "color 0.2s",
            display: "flex",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a2e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <Mail size={19} />
        </a>

        <button
          onClick={toggleDark}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#1a1a2e",
            color: "#ffffff",
            border: "none",
            borderRadius: "9999px",
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2d2d5e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a2e")}
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
