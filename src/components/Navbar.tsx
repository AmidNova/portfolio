import { ChevronDown, Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

function LangDropdown() {
  const { lang, setLang, dark } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: dark ? "#cdd6f4" : "#1a1a2e",
          letterSpacing: "0.05em",
          padding: "0.25rem 0",
        }}
      >
        {lang.toUpperCase()}
        <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 0.5rem)",
          right: 0,
          background: dark ? "#1e1e2e" : "#ffffff",
          border: dark ? "1px solid #313244" : "1px solid #e5e7eb",
          borderRadius: "0.625rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          minWidth: "80px",
          zIndex: 100,
        }}>
          {(["en", "fr"] as const).map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.6rem 1rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: lang === l ? 700 : 400,
                background: lang === l
                  ? (dark ? "rgba(205,214,244,0.08)" : "#f3f4f6")
                  : "transparent",
                color: lang === l
                  ? (dark ? "#cdd6f4" : "#1a1a2e")
                  : (dark ? "#7f849c" : "#6b7280"),
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t, dark, toggleDark } = useLang();
  const { isMobile } = useResponsive();

  const links = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
  ];

  const iconColor = dark ? "#6c7086" : "#6b7280";
  const iconHoverColor = dark ? "#cdd6f4" : "#1a1a2e";

  return (
    <>
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
          padding: isMobile ? "1rem 1.5rem" : "1.25rem 4rem",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}>
          <span style={{ fontWeight: 800, fontSize: "1.05rem", color: dark ? "#cdd6f4" : "#1a1a2e" }}>SA</span>
          <span style={{ fontWeight: 600, fontSize: "1.05rem", color: dark ? "#cdd6f4" : "#1a1a2e" }}>Soro Amidou</span>
        </Link>

        {/* Desktop — pill nav */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: dark ? "rgba(17,17,27,0.88)" : "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: dark ? "1px solid rgba(49,50,68,0.8)" : "1px solid rgba(26,26,46,0.08)",
              borderRadius: "9999px",
              padding: "0.35rem",
              gap: "0.1rem",
              boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(203,166,247,0.05)" : "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "9999px",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    background: isActive
                      ? (dark ? "#cdd6f4" : "#1a1a2e")
                      : hovered === link.label
                        ? (dark ? "rgba(205,214,244,0.08)" : "rgba(255,255,255,0.6)")
                        : "transparent",
                    color: isActive ? (dark ? "#1e1e2e" : "#ffffff") : (dark ? "#bac2de" : "#4b5563"),
                    boxShadow: isActive ? (dark ? "0 2px 16px rgba(203,166,247,0.2)" : "0 2px 12px rgba(26,26,46,0.2)") : "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <span
              style={{
                position: "relative",
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: dark ? "#585b70" : "#9ca3af",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "default",
              }}
            >
              ✦ {t.nav.explore}
              <span style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                background: dark ? "rgba(245,197,24,0.15)" : "rgba(245,197,24,0.2)",
                color: "#f5c518",
                padding: "0.15rem 0.45rem",
                borderRadius: "9999px",
                marginLeft: "0.15rem",
              }}>
                {t.nav.comingSoon}
              </span>
            </span>
          </div>
        )}

        {/* Desktop — right side */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            {/* Lang switcher */}
            <LangDropdown />
            <a href="https://github.com/AmidNova" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: iconColor, transition: "color 0.2s", display: "flex" }} onMouseEnter={(e) => (e.currentTarget.style.color = iconHoverColor)} onMouseLeave={(e) => (e.currentTarget.style.color = iconColor)}>
              <Github size={19} />
            </a>
            <a href="https://www.linkedin.com/in/amidou-soro-09b94a327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: iconColor, transition: "color 0.2s", display: "flex" }} onMouseEnter={(e) => (e.currentTarget.style.color = iconHoverColor)} onMouseLeave={(e) => (e.currentTarget.style.color = iconColor)}>
              <Linkedin size={19} />
            </a>
            <a href="mailto:amidousorox23@gmail.com" aria-label="Envoyer un email" style={{ color: iconColor, transition: "color 0.2s", display: "flex" }} onMouseEnter={(e) => (e.currentTarget.style.color = iconHoverColor)} onMouseLeave={(e) => (e.currentTarget.style.color = iconColor)}>
              <Mail size={19} />
            </a>
            <button
              aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
              onClick={toggleDark}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "72px",
                height: "36px",
                borderRadius: "9999px",
                background: dark ? "#1e1e2e" : "#e2e2e8",
                border: dark ? "1px solid #313244" : "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            >
              {/* Sliding circle */}
              <span style={{
                position: "absolute",
                top: "4px",
                left: dark ? "calc(100% - 32px)" : "4px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: dark ? "#45475a" : "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
                color: "#ffffff",
              }}>
                {dark ? <Moon size={14} /> : <Sun size={14} />}
              </span>
              {/* Background icons */}
              <span style={{ position: "absolute", left: "10px", color: dark ? "#585b70" : "transparent", display: "flex", transition: "color 0.3s" }}>
                <Sun size={14} />
              </span>
              <span style={{ position: "absolute", right: "10px", color: dark ? "transparent" : "#9ca3af", display: "flex", transition: "color 0.3s" }}>
                <Moon size={14} />
              </span>
            </button>
          </div>
        )}

        {/* Mobile — right side */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
              onClick={toggleDark}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "64px",
                height: "32px",
                borderRadius: "9999px",
                background: dark ? "#1e1e2e" : "#e2e2e8",
                border: dark ? "1px solid #313244" : "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            >
              <span style={{
                position: "absolute",
                top: "3px",
                left: dark ? "calc(100% - 29px)" : "3px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: dark ? "#45475a" : "#1a1a2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
                color: "#ffffff",
              }}>
                {dark ? <Moon size={13} /> : <Sun size={13} />}
              </span>
              <span style={{ position: "absolute", left: "9px", color: dark ? "#585b70" : "transparent", display: "flex", transition: "color 0.3s" }}>
                <Sun size={13} />
              </span>
              <span style={{ position: "absolute", right: "9px", color: dark ? "transparent" : "#9ca3af", display: "flex", transition: "color 0.3s" }}>
                <Moon size={13} />
              </span>
            </button>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#cdd6f4" : "#1a1a2e", display: "flex", padding: "0.25rem" }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
            background: dark ? "rgba(17,17,27,0.97)" : "rgba(248,247,255,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: location.pathname === link.path ? "#f5c518" : (dark ? "#cdd6f4" : "#1a1a2e"),
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <span
            style={{
              fontSize: "2rem", fontWeight: 700,
              color: dark ? "#585b70" : "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "default",
            }}
          >
            ✦ {t.nav.explore}
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: dark ? "rgba(245,197,24,0.15)" : "rgba(245,197,24,0.2)",
              color: "#f5c518",
              padding: "0.2rem 0.5rem",
              borderRadius: "9999px",
            }}>
              {t.nav.comingSoon}
            </span>
          </span>
          <LangDropdown />
          <div style={{ display: "flex", gap: "1.75rem" }}>
            <a href="https://github.com/AmidNova" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: dark ? "#bac2de" : "#1a1a2e" }}><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/amidou-soro-09b94a327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: dark ? "#bac2de" : "#1a1a2e" }}><Linkedin size={24} /></a>
            <a href="mailto:amidousorox23@gmail.com" aria-label="Envoyer un email" style={{ color: dark ? "#bac2de" : "#1a1a2e" }}><Mail size={24} /></a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
