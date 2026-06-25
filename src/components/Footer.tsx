// TODO: Si le site est en FR, servir le CV en français (cv_fullStack_fr.pdf) — cohérence linguistique
import { Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";
import { useThemeColors } from "../theme";

function Footer() {
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();
  const c = useThemeColors();

  const termBorder = dark ? "#30363d" : c.border.default;

  return (
    <footer
      style={{
        borderTop: `1px solid ${termBorder}`,
        background: dark ? c.bg.page : "transparent",
        padding: isMobile ? "2.5rem 1.25rem" : "2.5rem 2.5rem",
        maxWidth: "72rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "1.75rem" : "0",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* Left — prompt identity */}
      <div>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.3rem" }}>
          <span style={{ color: c.accent.gold }}>soro</span>
          <span style={{ color: c.text.faint }}>@portfolio</span>
          <span style={{ color: c.text.muted }}>:~$</span>
        </p>
        <p style={{ fontSize: "0.82rem", color: c.text.faint }}>
          <span style={{ color: c.text.muted }}>#</span> {t.footer.built}
        </p>
      </div>

      {/* Center — CTA */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: c.text.muted, marginBottom: "0.75rem" }}>
          {t.footer.cta}
        </p>
        <a
          href="mailto:amidousorox23@gmail.com"
          style={{
            padding: "0.6rem 1.4rem",
            background: c.accent.gold,
            color: dark ? "#0b1f17" : "#ffffff",
            fontWeight: 700,
            fontSize: "0.9rem",
            border: `1px solid ${c.accent.gold}`,
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
        >
          &gt; {t.footer.sendMessage}
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
            onMouseEnter={e => (e.currentTarget.style.color = c.accent.gold)}
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
