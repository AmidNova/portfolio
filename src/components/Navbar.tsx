import { ChevronDown, Github, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

function LangDropdown() {
  const { lang, setLang, dark } = useLang();
  const c = useThemeColors();
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
          fontFamily: "inherit",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: c.text.primary,
          letterSpacing: "0.02em",
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
          background: dark ? "#161b22" : "#ffffff",
          border: `1px solid ${c.border.default}`,
          borderRadius: 0,
          boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.1)",
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
                fontFamily: "inherit",
                fontSize: "0.85rem",
                fontWeight: lang === l ? 700 : 400,
                background: lang === l
                  ? (dark ? "rgba(63,185,80,0.1)" : c.accent.goldSoft)
                  : "transparent",
                color: lang === l ? c.accent.gold : c.text.muted,
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
  const c = useThemeColors();

  const links = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.work, path: "/#work" },
    { label: t.nav.about, path: "/about" },
  ];

  const iconColor = c.icon.default;
  const iconHoverColor = c.icon.hover;

  const barBg = dark ? "rgba(13,17,23,0.92)" : "rgba(250,250,250,0.92)";
  const barBorder = dark ? "1px solid #30363d" : `1px solid ${c.border.default}`;

  const toggleBg = dark ? "#21262d" : "#ededec";
  const toggleBorder = dark ? `1px solid ${c.border.default}` : "1px solid rgba(0,0,0,0.1)";
  const toggleKnob = dark ? "#3d444d" : c.brand.ink;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0.85rem 1.25rem" : "0.85rem 2.5rem",
          background: barBg,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: barBorder,
        }}
      >
        {/* Prompt logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", fontSize: isMobile ? "0.9rem" : "1rem", fontWeight: 700 }}>
          <span style={{ color: c.accent.gold }}>soro</span>
          <span style={{ color: c.text.faint }}>@portfolio</span>
          <span style={{ color: c.text.muted }}>:~$</span>
          <span className="term-cursor" style={{ color: c.text.primary }} aria-hidden="true" />
        </Link>

        {/* Desktop — nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const lit = isActive || hovered === link.label;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHovered(link.label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: "none",
                    color: isActive ? c.accent.gold : (hovered === link.label ? c.accent.secondary : c.text.muted),
                    transition: "color 0.18s ease",
                  }}
                >
                  <span style={{ color: isActive ? c.accent.gold : c.accent.secondary, opacity: lit ? 1 : 0, transition: "opacity 0.18s ease" }}>&gt;</span>
                  {link.label.toLowerCase()}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop — right side */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
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
                height: "32px",
                borderRadius: 0,
                background: toggleBg,
                border: toggleBorder,
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
                height: "24px",
                borderRadius: 0,
                background: toggleKnob,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
                color: "#ffffff",
              }}>
                {dark ? <Moon size={14} /> : <Sun size={14} />}
              </span>
              <span style={{ position: "absolute", left: "9px", color: dark ? "#585b70" : "transparent", display: "flex", transition: "color 0.3s" }}>
                <Sun size={13} />
              </span>
              <span style={{ position: "absolute", right: "9px", color: dark ? "transparent" : c.text.faint, display: "flex", transition: "color 0.3s" }}>
                <Moon size={13} />
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
                width: "60px",
                height: "30px",
                borderRadius: 0,
                background: toggleBg,
                border: toggleBorder,
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            >
              <span style={{
                position: "absolute",
                top: "3px",
                left: dark ? "calc(100% - 27px)" : "3px",
                width: "24px",
                height: "22px",
                borderRadius: 0,
                background: toggleKnob,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
                color: "#ffffff",
              }}>
                {dark ? <Moon size={13} /> : <Sun size={13} />}
              </span>
              <span style={{ position: "absolute", left: "8px", color: dark ? "#585b70" : "transparent", display: "flex", transition: "color 0.3s" }}>
                <Sun size={12} />
              </span>
              <span style={{ position: "absolute", right: "8px", color: dark ? "transparent" : c.text.faint, display: "flex", transition: "color 0.3s" }}>
                <Moon size={12} />
              </span>
            </button>
            <button onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} style={{ background: "none", border: "none", cursor: "pointer", color: c.text.primary, display: "flex", padding: "0.25rem" }}>
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
            background: dark ? "rgba(13,17,23,0.98)" : "rgba(250,250,250,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.75rem",
          }}
        >
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: isActive ? c.accent.gold : c.text.primary,
                  textDecoration: "none",
                }}
              >
                <span style={{ color: c.accent.gold }}>&gt;</span>
                {link.label.toLowerCase()}
              </Link>
            );
          })}
          <LangDropdown />
          <div style={{ display: "flex", gap: "1.75rem" }}>
            <a href="https://github.com/AmidNova" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: c.text.muted }}><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/amidou-soro-09b94a327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: c.text.muted }}><Linkedin size={24} /></a>
            <a href="mailto:amidousorox23@gmail.com" aria-label="Envoyer un email" style={{ color: c.text.muted }}><Mail size={24} /></a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
