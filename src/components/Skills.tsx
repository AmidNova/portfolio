import imgApache    from "../assets/icons/apache.svg";
import imgAws        from "../assets/icons/aws.svg";
import imgAzure      from "../assets/icons/azure.svg";
import imgBash       from "../assets/icons/bash.svg";
import imgCicd       from "../assets/icons/ci-cd.svg";
import imgCloudflare from "../assets/icons/cloudflare.svg";
import imgDocker     from "../assets/icons/docker2.svg";
import imgFedora     from "../assets/icons/fedora.svg";
import imgGit        from "../assets/icons/git.svg";
import imgHtml       from "../assets/icons/html.svg";
import imgJava       from "../assets/icons/java.svg";
import imgJs         from "../assets/icons/javascript.svg";
import imgK8s        from "../assets/icons/kubernetes.svg";
import imgLaravel    from "../assets/icons/laravel.svg";
import imgMysql      from "../assets/icons/mysql.svg";
import imgNext       from "../assets/icons/nextjs.svg";
import imgNode       from "../assets/icons/nodejs.svg";
import imgPhp        from "../assets/icons/php.svg";
import imgPg         from "../assets/icons/postgresql.svg";
import imgPython     from "../assets/icons/python.svg";
import imgTailwind   from "../assets/icons/tailwindcss.svg";
import imgTerraform  from "../assets/icons/terraform.svg";
import imgThree      from "../assets/icons/Three.js.svg";
import imgTs         from "../assets/icons/typescript.svg";
import imgVue        from "../assets/icons/vuejs.svg";
import { useLang }       from "../context/LangContext";
import { useResponsive } from "../hooks/useResponsive";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: "JavaScript", img: imgJs },
  { label: "TypeScript",  img: imgTs },
  { label: "Python",      img: imgPython },
  { label: "Java",        img: imgJava },
  { label: "PHP",         img: imgPhp },
  { label: "HTML",        img: imgHtml },
  { label: "Next.js",     img: imgNext },
  { label: "Vue.js",      img: imgVue },
  { label: "Node.js",     img: imgNode },
  { label: "Laravel",     img: imgLaravel },
  { label: "Tailwind",    img: imgTailwind },
  { label: "Three.js",    img: imgThree },
  { label: "PostgreSQL",  img: imgPg },
  { label: "MySQL",       img: imgMysql },
  { label: "Docker",      img: imgDocker },
  { label: "Kubernetes",  img: imgK8s },
  { label: "Terraform",   img: imgTerraform },
  { label: "AWS",         img: imgAws },
  { label: "Azure",       img: imgAzure },
  { label: "Cloudflare",  img: imgCloudflare },
  { label: "CI/CD",       img: imgCicd },
  { label: "Git",         img: imgGit },
  { label: "Bash",        img: imgBash },
  { label: "Fedora",      img: imgFedora },
  { label: "Apache",      img: imgApache },
];

// ─── Component ────────────────────────────────────────────────────────────────

function Skills() {
  const { dark } = useLang();
  const { isMobile } = useResponsive();

  const bg      = dark ? "#11111b" : "#f5f5f0";
  const txt     = dark ? "#cdd6f4" : "#1a1a2e";
  const badgeBg = dark ? "#181825" : "#fff";
  const border  = dark ? "rgba(205,214,244,0.12)" : "rgba(0,0,0,0.15)";
  const shadow  = dark
    ? "0 2px 8px rgba(0,0,0,0.4)"
    : "0 2px 8px rgba(0,0,0,0.06)";

  return (
    <section style={{ background: bg, padding: isMobile ? "5rem 1.5rem" : "8rem 5rem" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Header */}
        <p style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#f5c518",
          marginBottom: "0.65rem",
        }}>
          Core
        </p>
        <h2 style={{
          fontSize: isMobile ? "2rem" : "clamp(2rem, 3vw, 2.75rem)",
          fontWeight: 800,
          color: txt,
          letterSpacing: "-0.025em",
          marginBottom: "3rem",
        }}>
          Skills
        </h2>

        {/* Badge grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {SKILLS.map(({ label, img }) => (
            <div
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.55rem 1.1rem",
                background: badgeBg,
                border: `1px dashed ${border}`,
                borderRadius: "0.625rem",
                boxShadow: shadow,
                fontSize: "0.9rem",
                fontWeight: 600,
                color: txt,
                whiteSpace: "nowrap",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = dark
                  ? "0 6px 20px rgba(0,0,0,0.5)"
                  : "0 6px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = shadow;
              }}
            >
              <img src={img} alt="" width={20} height={20} style={{ display: "block" }} />
              {label}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
