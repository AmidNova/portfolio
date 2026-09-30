import logoArtci from "../assets/logo/logoartci.png";
import logoBozarts from "../assets/logo/logoBozarts.png";
import logoEstm from "../assets/logo/logoEtsm.jpg";
import logoIsep from "../assets/logo/logoIsep.png";
import resumeData from "../assets/papers/CV_Data_Amidou.pdf";

/** Language-independent profile data. Translated copy lives in src/locales. */

export const EMAIL = "amidousorox23@gmail.com";
export const LINKS = {
  github: "https://github.com/AmidNova",
  linkedin: "https://www.linkedin.com/in/amidou-soro-09b94a327/",
  email: `mailto:${EMAIL}`,
  resume: resumeData,
} as const;

/** "YYYY" or "YYYY-MM". `end: null` means ongoing. */
export interface Period {
  start: string;
  end: string | null;
}

export interface OrgLinks {
  website?: string;
  linkedin?: string;
  x?: string;
}

export interface TimelineEntry {
  id: "artci" | "bozarts" | "isep" | "estm";
  org: string;
  logo: string;
  links: OrgLinks;
  period: Period;
}

export const EXPERIENCE: TimelineEntry[] = [
  { id: "bozarts", org: "Bozarts — ISEP", logo: logoBozarts, links: {}, period: { start: "2024", end: "2025" } },
  {
    id: "artci",
    org: "ARTCI",
    logo: logoArtci,
    links: { website: "https://www.artci.ci" },
    period: { start: "2023-06", end: "2023-09" },
  },
];

export const EDUCATION: TimelineEntry[] = [
  {
    id: "isep",
    org: "ISEP Paris",
    logo: logoIsep,
    links: {
      website: "https://www.isep.fr",
      linkedin: "https://www.linkedin.com/school/isep-paris/",
      x: "https://x.com/ISEP_Paris",
    },
    period: { start: "2024", end: "2027" },
  },
  {
    id: "estm",
    org: "ESTM Casablanca",
    logo: logoEstm,
    links: {
      website: "https://estem.ma/",
      linkedin: "https://www.linkedin.com/school/estemcasablanca/",
    },
    period: { start: "2021", end: "2024" },
  },
];

export type SkillGroup = "data" | "cloud" | "bi" | "lang";

/** Same four groups as the résumé, so the site and the PDF tell one story. */
export const SKILLS: { group: SkillGroup; items: string[] }[] = [
  { group: "data", items: ["Apache Kafka", "Spark", "Airflow", "dbt", "Elasticsearch"] },
  { group: "cloud", items: ["GCP", "BigQuery", "AWS", "Databricks", "Docker", "Kubernetes", "Terraform"] },
  { group: "bi", items: ["Power BI", "DAX", "Power Query", "DuckDB"] },
  { group: "lang", items: ["Python", "SQL", "Bash", "TypeScript", "Git", "Linux"] },
];

export interface ProjectMeta {
  id: "wikipedia-pulse" | "retail-pipeline" | "healthcare-bi";
  title: string;
  tags: string[];
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: "wikipedia-pulse",
    title: "Wikipedia Pulse",
    tags: ["Kafka", "PySpark", "Airflow", "scikit-learn", "Elasticsearch", "Kibana"],
  },
  {
    id: "retail-pipeline",
    title: "Retail Data Pipeline",
    tags: ["GCP", "GCS", "BigQuery", "BigQuery ML", "SQL"],
  },
  {
    id: "healthcare-bi",
    title: "Healthcare BI",
    tags: ["Power BI", "DAX", "Power Query", "DuckDB", "Star schema"],
  },
];

export const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect — Associate", issuer: "Amazon Web Services" },
  { name: "Databricks Certified Data Engineer — Associate", issuer: "Databricks" },
];
