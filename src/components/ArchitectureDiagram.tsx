import { useId } from "react";
import { useLang } from "../hooks/useLang";

type NodeKey = "sse" | "api" | "kafka" | "airflow" | "spark" | "es" | "kibana";

const W = 118;
const H = 46;
const STEP = 144;
const col = (i: number) => 8 + i * STEP;

// Stream lane on top, batch lane below, both drained by the daily DAG, then one line to the dashboard.
const NODES: { key: NodeKey; label: string; x: number; y: number }[] = [
  { key: "sse", label: "Wikimedia SSE", x: col(0), y: 24 },
  { key: "api", label: "Wikimedia API", x: col(0), y: 112 },
  { key: "kafka", label: "Kafka", x: col(1), y: 24 },
  { key: "airflow", label: "Airflow 3", x: col(2), y: 68 },
  { key: "spark", label: "PySpark", x: col(3), y: 68 },
  { key: "es", label: "Elasticsearch", x: col(4), y: 68 },
  { key: "kibana", label: "Kibana", x: col(5), y: 68 },
];

const EDGES = [
  `M${col(0) + W} 47 H${col(1) - 4}`, // SSE → Kafka
  `M${col(1) + W} 47 H${col(2) - 12} V84 H${col(2) - 4}`, // Kafka → Airflow
  `M${col(0) + W} 135 H${col(2) - 12} V98 H${col(2) - 4}`, // API → Airflow
  `M${col(2) + W} 91 H${col(3) - 4}`, // Airflow → PySpark
  `M${col(3) + W} 91 H${col(4) - 4}`, // PySpark → Elasticsearch
  `M${col(4) + W} 91 H${col(5) - 4}`, // Elasticsearch → Kibana
];

/** Native, theme-aware diagram of the Wikipedia Pulse data flow. */
function ArchitectureDiagram({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const d = t.projects.diagram;
  const uid = useId().replace(/:/g, "");
  const arrow = `arrow-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${col(5) + W + 8} 180`}
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
    </svg>
  );
}

export default ArchitectureDiagram;
