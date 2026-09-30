import { createElement } from "react";
import type { IconBaseProps, IconType } from "react-icons";
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
  SiGooglebigquery,
  SiGooglecloud,
  SiKibana,
  SiKubernetes,
  SiPython,
  SiScrimba,
  SiTerraform,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

/** Power BI's three rising bars — simple-icons no longer ships Microsoft marks. */
const PowerBiIcon: IconType = ({ size = "1em", ...props }: IconBaseProps) =>
  createElement(
    "svg",
    { viewBox: "0 0 24 24", width: size, height: size, fill: "currentColor", ...props },
    createElement("rect", { x: 3, y: 12, width: 5, height: 10, rx: 1.5, opacity: 0.55 }),
    createElement("rect", { x: 9.5, y: 7, width: 5, height: 15, rx: 1.5, opacity: 0.8 }),
    createElement("rect", { x: 16, y: 2, width: 5, height: 20, rx: 1.5 }),
  );

export interface SkillIcon {
  Icon: IconType;
  /** Brand colour, lifted where the official one disappears on a near-black card; omitted for black marks. */
  brand?: string;
}

export const SKILL_ICONS: Record<string, SkillIcon> = {
  Kafka: { Icon: SiApachekafka },
  Python: { Icon: SiPython, brand: "#5A9FD4" },
  BigQuery: { Icon: SiGooglebigquery, brand: "#669DF6" },
  "Power BI": { Icon: PowerBiIcon, brand: "#F2C811" },
  Spark: { Icon: SiApachespark, brand: "#E25A1C" },
  AWS: { Icon: FaAws, brand: "#FF9900" },
  SQL: { Icon: TbSql },
  Airflow: { Icon: SiApacheairflow, brand: "#4DA3FF" },
  Databricks: { Icon: SiDatabricks, brand: "#FF3621" },
  DuckDB: { Icon: SiDuckdb, brand: "#FFC700" },
  GCP: { Icon: SiGooglecloud, brand: "#4285F4" },
  Elasticsearch: { Icon: SiElasticsearch, brand: "#00BFB3" },
  Azure: { Icon: VscAzure, brand: "#2F9BFF" },
  dbt: { Icon: SiDbt, brand: "#FF694B" },
  Kibana: { Icon: SiKibana, brand: "#F04E98" },
  Docker: { Icon: SiDocker, brand: "#2496ED" },
  Kubernetes: { Icon: SiKubernetes, brand: "#5B8DEF" },
  Terraform: { Icon: SiTerraform, brand: "#A67FE0" },
  // Not a tool: stands in for the Scrimba certificate, which has no badge image.
  Scrimba: { Icon: SiScrimba },
};
