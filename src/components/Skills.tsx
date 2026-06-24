import imgAirflow    from "../assets/icons/airflow.svg";
import imgApache    from "../assets/icons/apache.svg";
import imgKafka      from "../assets/icons/apachekafka.svg";
import imgAws        from "../assets/icons/aws.svg";
import imgAzure      from "../assets/icons/azure.svg";
import imgBash       from "../assets/icons/bash.svg";
import imgCicd       from "../assets/icons/ci-cd.svg";
import imgCloudflare from "../assets/icons/cloudflare.svg";
import imgDbt        from "../assets/icons/dbt.svg";
import imgDocker     from "../assets/icons/docker2.svg";
import imgElastic    from "../assets/icons/elastic-search.svg";
import imgFedora     from "../assets/icons/fedora.svg";
import imgGit        from "../assets/icons/git.svg";
import imgHtml       from "../assets/icons/html.svg";
import imgJava       from "../assets/icons/java.svg";
import imgJs         from "../assets/icons/javascript.svg";
import imgKibana     from "../assets/icons/kibana.svg";
import imgK8s        from "../assets/icons/kubernetes.svg";
import imgLaravel    from "../assets/icons/laravel.svg";
import imgMongo      from "../assets/icons/mongodb.svg";
import imgMysql      from "../assets/icons/mysql.svg";
import imgNext       from "../assets/icons/nextjs.svg";
import imgNode       from "../assets/icons/nodejs.svg";
import imgNumpy      from "../assets/icons/numpy.svg";
import imgPandas     from "../assets/icons/pandas.svg";
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

interface Skill {
  label: string;
  img: string;
}

type GroupKey = "data" | "devops" | "cloud" | "web";

const GROUPS: { key: GroupKey; items: Skill[] }[] = [
  {
    key: "data",
    items: [
      { label: "Python",        img: imgPython },
      { label: "pandas",        img: imgPandas },
      { label: "NumPy",         img: imgNumpy },
      { label: "Apache Kafka",  img: imgKafka },
      { label: "Airflow",       img: imgAirflow },
      { label: "dbt",           img: imgDbt },
      { label: "Elasticsearch", img: imgElastic },
      { label: "Kibana",        img: imgKibana },
      { label: "PostgreSQL",    img: imgPg },
      { label: "MySQL",         img: imgMysql },
      { label: "MongoDB",       img: imgMongo },
    ],
  },
  {
    key: "devops",
    items: [
      { label: "Docker",      img: imgDocker },
      { label: "Kubernetes",  img: imgK8s },
      { label: "Terraform",   img: imgTerraform },
      { label: "CI/CD",       img: imgCicd },
      { label: "Git",         img: imgGit },
      { label: "Bash",        img: imgBash },
      { label: "Linux",       img: imgFedora },
      { label: "Apache",      img: imgApache },
    ],
  },
  {
    key: "cloud",
    items: [
      { label: "AWS",         img: imgAws },
      { label: "Azure",       img: imgAzure },
      { label: "Cloudflare",  img: imgCloudflare },
    ],
  },
  {
    key: "web",
    items: [
      { label: "TypeScript",  img: imgTs },
      { label: "JavaScript",  img: imgJs },
      { label: "Node.js",     img: imgNode },
      { label: "Next.js",     img: imgNext },
      { label: "Vue.js",      img: imgVue },
      { label: "Laravel",     img: imgLaravel },
      { label: "PHP",         img: imgPhp },
      { label: "Java",        img: imgJava },
      { label: "HTML",        img: imgHtml },
      { label: "Tailwind",    img: imgTailwind },
      { label: "Three.js",    img: imgThree },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface SkillBadgeProps {
  skill: Skill;
  dark: boolean;
}

function SkillBadge({ skill, dark }: SkillBadgeProps) {
  const txt     = dark ? "#cdd6f4" : "#1a1a2e";
  const badgeBg = dark ? "#181825" : "#fff";
  const border  = dark ? "rgba(205,214,244,0.12)" : "rgba(0,0,0,0.15)";
  const shadow  = dark ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.06)";

  return (
    <div
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
      <img src={skill.img} alt="" width={20} height={20} style={{ display: "block" }} />
      {skill.label}
    </div>
  );
}

function Skills() {
  const { t, dark } = useLang();
  const { isMobile } = useResponsive();

  const bg    = dark ? "#11111b" : "#f5f5f0";
  const txt   = dark ? "#cdd6f4" : "#1a1a2e";
  const muted = dark ? "#a6adc8" : "#4b5563";
  const divider = dark ? "rgba(205,214,244,0.08)" : "rgba(0,0,0,0.08)";

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
          {t.skills.label}
        </p>
        <h2 style={{
          fontSize: isMobile ? "2rem" : "clamp(2rem, 3vw, 2.75rem)",
          fontWeight: 800,
          color: txt,
          letterSpacing: "-0.025em",
          marginBottom: "3.5rem",
        }}>
          {t.skills.title}
        </h2>

        {/* Grouped by role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {GROUPS.map((group, i) => {
            const g = t.skills.groups[group.key];
            return (
              <div
                key={group.key}
                style={{
                  paddingTop: i === 0 ? 0 : "2.5rem",
                  borderTop: i === 0 ? "none" : `1px solid ${divider}`,
                }}
              >
                <h3 style={{
                  fontSize: isMobile ? "1.35rem" : "1.6rem",
                  fontWeight: 800,
                  color: txt,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.6rem",
                }}>
                  {g.title}
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: muted,
                  lineHeight: 1.7,
                  maxWidth: "46rem",
                  marginBottom: "1.5rem",
                }}>
                  {g.blurb}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {group.items.map((skill) => (
                    <SkillBadge key={skill.label} skill={skill} dark={dark} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Skills;
