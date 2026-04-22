// TODO: Si le site est en FR, servir le CV en français (cv_fullStack_fr.pdf) — cohérence linguistique
import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

function Footer() {
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();

  return (
    <footer
      style={{
        borderTop: `1px solid ${dark ? c.border.default : c.border.subtle}`,
        background: dark ? c.bg.page : "transparent",
        padding: isMobile ? "2.5rem 1.25rem" : "3rem 5rem",
        maxWidth: "72rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "2rem" : "0",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* Left */}
      <div>
        <p style={{ fontWeight: 800, fontSize: "1rem", color: c.text.primary, marginBottom: "0.25rem" }}>
          SA <span style={{ color: c.accent.gold }}>·</span> Soro Amidou
        </p>
        <p style={{ fontSize: "0.95rem", color: c.text.faint }}>{t.footer.built}</p>
      </div>

      {/* Center — CTA */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.95rem", color: c.text.muted, marginBottom: "0.75rem" }}>
          {t.footer.cta}
        </p>
        <a
          href="mailto:amidousorox23@gmail.com"
          style={{
            padding: "0.6rem 1.5rem",
            background: c.text.primary,
            color: c.text.inverse,
            fontWeight: 600,
            fontSize: "0.95rem",
            borderRadius: "9999px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
        >
          {t.footer.sendMessage}
        </a>
      </div>

      {/* Right — socials */}
      <div style={{ display: "flex", gap: "1.25rem" }}>
        {[
          { href: "https://github.com/AmidNova", label: "GitHub", Icon: Github },
          { href: "https://www.linkedin.com/in/amidou-soro-09b94a327/", label: "LinkedIn", Icon: Linkedin },
          { href: "mailto:amidousorox23@gmail.com", label: "Email", Icon: Mail },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            style={{ color: c.icon.default, display: "flex", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = c.icon.hover)}
            onMouseLeave={e => (e.currentTarget.style.color = c.icon.default)}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
