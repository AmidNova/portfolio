import { useId } from "react";
import { useLang } from "../context/LangContext";

type NodeKey = "sse" | "api" | "kafka" | "airflow" | "spark" | "iforest" | "es" | "kibana";

const W = 118;
const H = 46;

// Two lanes (stream on top, batch below) converging on the index.
const NODES: { key: NodeKey; label: string; x: number; y: number }[] = [
  { key: "sse", label: "Wikimedia SSE", x: 8, y: 24 },
  { key: "api", label: "Wikimedia API", x: 8, y: 112 },
  { key: "kafka", label: "Kafka", x: 160, y: 24 },
  { key: "airflow", label: "Airflow", x: 160, y: 112 },
  { key: "spark", label: "Spark", x: 312, y: 24 },
  { key: "iforest", label: "Isolation Forest", x: 312, y: 112 },
  { key: "es", label: "Elasticsearch", x: 464, y: 68 },
  { key: "kibana", label: "Kibana", x: 616, y: 68 },
];

const EDGES = [
  "M126 47 H156", // SSE → Kafka
  "M126 135 H156", // API → Airflow
  "M278 47 H308", // Kafka → Spark
  "M278 135 H308", // Airflow → Isolation Forest
  "M430 47 H446 V84 H460", // Spark → Elasticsearch
  "M430 135 H446 V98 H460", // Isolation Forest → Elasticsearch
  "M582 91 H612", // Elasticsearch → Kibana
];

/** Native, theme-aware diagram of the Wikipedia Pulse data flow. */
function ArchitectureDiagram({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const d = t.projects.diagram;
  const uid = useId().replace(/:/g, "");
  const arrow = `arrow-${uid}`;

  return (
    <svg
      viewBox="0 0 744 196"
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
      className={`h-auto w-full ${className}`}
    >
      <title id={`${uid}-title`}>{d.title}</title>
      <desc id={`${uid}-desc`}>{d.desc}</desc>
      <defs>
        <marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-subtle" />
        </marker>
      </defs>

      <g className="fill-none stroke-subtle" strokeWidth="1">
        {EDGES.map((path) => (
          <path key={path} d={path} markerEnd={`url(#${arrow})`} />
        ))}
        {/* Airflow orchestrates the Spark jobs. */}
        <path d="M262 112 L326 72" strokeDasharray="3 3" markerEnd={`url(#${arrow})`} />
      </g>

      {NODES.map((n) => (
        <g key={n.key}>
          <rect x={n.x} y={n.y} width={W} height={H} rx="6" className="fill-bg stroke-line" strokeWidth="1" />
          <text
            x={n.x + W / 2}
            y={n.y + 20}
            textAnchor="middle"
            className="fill-fg font-sans"
            fontSize="12"
            fontWeight="500"
          >
            {n.label}
          </text>
          <text x={n.x + W / 2} y={n.y + 35} textAnchor="middle" className="fill-subtle font-mono" fontSize="9.5">
            {d[n.key]}
          </text>
        </g>
      ))}

      <g className="font-mono" fontSize="9.5">
        <path d="M612 184 H640" className="stroke-subtle" strokeDasharray="3 3" />
        <text x="646" y="187" className="fill-subtle">
          {d.orchestration}
        </text>
      </g>
    </svg>
  );
}

export default ArchitectureDiagram;
