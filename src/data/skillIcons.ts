import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiDatabricks,
  SiDbt,
  SiDocker,
  SiDuckdb,
  SiElasticsearch,
  SiGit,
  SiGnubash,
  SiGooglebigquery,
  SiGooglecloud,
  SiKubernetes,
  SiLinux,
  SiPython,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { TbChartBar, TbSql } from "react-icons/tb";

export interface SkillIcon {
  Icon: IconType;
  /** Brand colour revealed on hover; omitted for near-black marks so they stay legible in dark mode. */
  brand?: string;
}

export const SKILL_ICONS: Record<string, SkillIcon> = {
  Python: { Icon: SiPython, brand: "#3776AB" },
  SQL: { Icon: TbSql },
  "Apache Kafka": { Icon: SiApachekafka },
  Airflow: { Icon: SiApacheairflow, brand: "#017CEE" },
  Spark: { Icon: SiApachespark, brand: "#E25A1C" },
  dbt: { Icon: SiDbt, brand: "#FF694B" },
  "Power BI": { Icon: TbChartBar, brand: "#F2C811" },
  DuckDB: { Icon: SiDuckdb, brand: "#FFC700" },
  GCP: { Icon: SiGooglecloud, brand: "#4285F4" },
  BigQuery: { Icon: SiGooglebigquery, brand: "#669DF6" },
  Databricks: { Icon: SiDatabricks, brand: "#FF3621" },
  Elasticsearch: { Icon: SiElasticsearch, brand: "#00BFB3" },
  AWS: { Icon: FaAws, brand: "#FF9900" },
  Docker: { Icon: SiDocker, brand: "#2496ED" },
  Kubernetes: { Icon: SiKubernetes, brand: "#326CE5" },
  Terraform: { Icon: SiTerraform, brand: "#844FBA" },
  Git: { Icon: SiGit, brand: "#F05032" },
  Linux: { Icon: SiLinux },
  Bash: { Icon: SiGnubash, brand: "#4EAA25" },
  TypeScript: { Icon: SiTypescript, brand: "#3178C6" },
};
