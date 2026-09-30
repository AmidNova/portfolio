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

/** Where a tool was proven: a project on this page, or a certification. */
export type ToolProof = ProjectMeta["id"] | "certifications";

/**
 * Every data tool, thrown in the toolbox. Order is deliberately mixed so the pile looks tipped out, not sorted.
 * `proof` links a tool to where it was used; tools without one are listed but not linked.
 */
export const TOOLBOX: { name: string; proof?: ToolProof }[] = [
  { name: "Kafka", proof: "wikipedia-pulse" },
  { name: "Python", proof: "wikipedia-pulse" },
  { name: "BigQuery", proof: "retail-pipeline" },
  { name: "Power BI", proof: "healthcare-bi" },
  { name: "Spark", proof: "wikipedia-pulse" },
  { name: "AWS", proof: "certifications" },
  { name: "SQL", proof: "retail-pipeline" },
  { name: "Docker", proof: "retail-pipeline" },
  { name: "Airflow", proof: "wikipedia-pulse" },
  { name: "Databricks", proof: "certifications" },
  { name: "DuckDB", proof: "healthcare-bi" },
  { name: "Kubernetes" },
  { name: "GCP", proof: "retail-pipeline" },
  { name: "Elasticsearch", proof: "wikipedia-pulse" },
  { name: "Azure" },
  { name: "Terraform" },
  { name: "dbt", proof: "retail-pipeline" },
  { name: "Kibana", proof: "wikipedia-pulse" },
];

/**
 * One entry per project. Adding a project = an entry here + its copy in src/locales
 * (t.projects.items); the projects page, its filters and counters follow on their own.
 */
export interface ProjectMeta {
  id: "wikipedia-pulse" | "retail-pipeline" | "healthcare-bi";
  title: string;
  tags: string[];
  /** Public source repository; no repo, no "Code" button. */
  repo?: string;
  /** Pinned first and badged on the projects page. */
  featured?: boolean;
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: "wikipedia-pulse",
    title: "Wikipedia Pulse",
    tags: ["Kafka", "PySpark", "Airflow", "scikit-learn", "Elasticsearch", "Kibana"],
    repo: "https://github.com/AmidNova/wikipedia-pulse",
    featured: true,
  },
  {
    id: "retail-pipeline",
    title: "Retail Data Pipeline",
    tags: ["GCP", "GCS", "BigQuery", "Airflow", "dbt", "Soda", "BigQuery ML", "Metabase", "Docker"],
    repo: "https://github.com/AmidNova/retail-gcp-pipeline",
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
  { name: "Full-Stack Developer", issuer: "Scrimba" },
];

/** Public GitHub repositories (12 on 2026-09-30); shown as a floor, hence the "+". */
export const PROJECT_COUNT = 12;
