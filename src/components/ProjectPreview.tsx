import { FolderGit2 } from "lucide-react";
import { useId, type ReactNode } from "react";
import { useLang } from "../context/LangContext";
import type { ProjectMeta } from "../data/profile";
import ArchitectureDiagram from "./ArchitectureDiagram";

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  strong?: boolean;
}

/** Same node style as the Wikipedia Pulse architecture diagram. */
function Node({ x, y, w, h, label, sub, strong = false }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        className={strong ? "fill-bg stroke-subtle" : "fill-bg stroke-line"}
        strokeWidth="1"
      />
      <text x={x + w / 2} y={y + h / 2 - 2} textAnchor="middle" className="fill-fg font-sans" fontSize="12" fontWeight="500">
        {label}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="fill-subtle font-mono" fontSize="9.5">
        {sub}
      </text>
    </g>
  );
}

/** Tick inside a small circle: an automated quality gate between two stages. */
function Gate({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="7" className="fill-bg stroke-ok" strokeWidth="1" />
      <path
        d={`M${cx - 3} ${cy} l2 2.2 l4 -4.4`}
        className="stroke-ok"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const RETAIL_W = 96;
const RETAIL_H = 46;
const RETAIL_Y = 20;
const RETAIL_GAP = 36;
const RETAIL_XS = [4, 136, 268, 400];

function RetailFlow() {
  const { t } = useLang();
  const d = t.projects.visuals.retail;
  const uid = useId().replace(/:/g, "");
  const arrow = `arrow-${uid}`;
  const nodes = [
    { label: "Transactions", sub: d.raw },
    { label: "GCS", sub: d.landing },
    { label: "BigQuery", sub: d.warehouse },
    { label: "BigQuery ML", sub: d.ml },
  ];
  const midY = RETAIL_Y + RETAIL_H / 2;
  // BigQuery ML feeds two outputs, drawn below it.
  const mlX = RETAIL_XS[3];
  const outY = 104;
  const outH = 40;
  const outputs = [
    { label: d.forecast, sub: d.forecastSub, x: RETAIL_XS[2] },
    { label: d.segments, sub: d.segmentsSub, x: mlX },
  ];
  const mlCenter = mlX + RETAIL_W / 2;
  const splitY = RETAIL_Y + RETAIL_H + 16;

  return (
    <svg viewBox="0 0 500 150" role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="h-auto w-full">
      <title id={`${uid}-t`}>{d.title}</title>
      <desc id={`${uid}-d`}>{d.desc}</desc>
      <defs>
        <marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-subtle" />
        </marker>
      </defs>
      {RETAIL_XS.slice(0, -1).map((x) => (
        <g key={x}>
          <path
            d={`M${x + RETAIL_W} ${midY} H${x + RETAIL_W + RETAIL_GAP - 4}`}
            className="fill-none stroke-subtle"
            strokeWidth="1"
            markerEnd={`url(#${arrow})`}
          />
          <Gate cx={x + RETAIL_W + RETAIL_GAP / 2 - 2} cy={midY} />
        </g>
      ))}
      <g className="fill-none stroke-subtle" strokeWidth="1">
        <path d={`M${mlCenter} ${RETAIL_Y + RETAIL_H} V${outY - 4}`} markerEnd={`url(#${arrow})`} />
        <path
          d={`M${mlCenter} ${splitY} H${outputs[0].x + RETAIL_W / 2} V${outY - 4}`}
          markerEnd={`url(#${arrow})`}
        />
      </g>
      {nodes.map((n, i) => (
        <Node key={n.label} x={RETAIL_XS[i]} y={RETAIL_Y} w={RETAIL_W} h={RETAIL_H} label={n.label} sub={n.sub} />
      ))}
      {outputs.map((o) => (
        <Node key={o.label} x={o.x} y={outY} w={RETAIL_W} h={outH} label={o.label} sub={o.sub} />
      ))}
      <g className="font-mono" fontSize="9.5">
        <Gate cx={11} cy={124} />
        <text x={23} y={127} className="fill-subtle">
          {d.checks}
        </text>
      </g>
    </svg>
  );
}

function StarSchema() {
  const { t } = useLang();
  const d = t.projects.visuals.healthcare;
  const uid = useId().replace(/:/g, "");
  const fact = { x: 160, y: 50, w: 108, h: 46 };
  const dims = [
    { label: d.site, x: 12, y: 8 },
    { label: d.patient, x: 316, y: 8 },
    { label: d.date, x: 12, y: 100 },
    { label: d.diagnosis, x: 316, y: 100 },
  ];
  const dimW = 100;
  const dimH = 40;
  const cx = fact.x + fact.w / 2;
  const cy = fact.y + fact.h / 2;

  return (
    <svg viewBox="0 0 428 148" role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="h-auto w-full">
      <title id={`${uid}-t`}>{d.title}</title>
      <desc id={`${uid}-d`}>{d.desc}</desc>
      <g className="stroke-subtle" strokeWidth="1">
        {dims.map((dim) => (
          <line key={dim.label} x1={cx} y1={cy} x2={dim.x + dimW / 2} y2={dim.y + dimH / 2} />
        ))}
      </g>
      {dims.map((dim) => (
        <Node key={dim.label} x={dim.x} y={dim.y} w={dimW} h={dimH} label={dim.label} sub={d.dimension} />
      ))}
      <Node {...fact} label="Admissions" sub={d.fact} strong />
    </svg>
  );
}

type VisualId = ProjectMeta["id"];

/**
 * The one picture that explains each project: its architecture, flow or model.
 * A project without an entry falls back to a plain frame, so new projects can ship before their diagram.
 */
const VISUALS: Partial<Record<VisualId, (compact: boolean) => ReactNode>> = {
  // Full size keeps its labels legible by scrolling; compact zooms in on the middle, cropped like a screenshot.
  "wikipedia-pulse": (compact) => (
    <ArchitectureDiagram className={compact ? "w-[165%]! max-w-none shrink-0" : "min-w-[560px]"} />
  ),
  "retail-pipeline": () => <RetailFlow />,
  "healthcare-bi": () => <StarSchema />,
};

interface ProjectPreviewProps {
  project: ProjectMeta;
  /** Show the title in the frame's corner (thumbnails that have no heading of their own). */
  captioned?: boolean;
  className?: string;
}

/** A project's visual in a screenshot-like 16:9 frame — shared by the home thumbnails and the projects page. */
function ProjectPreview({ project, captioned = false, className = "" }: ProjectPreviewProps) {
  const visual = VISUALS[project.id]?.(true);
  return (
    <figure
      aria-label={project.title}
      className={`relative flex aspect-video items-center justify-center overflow-hidden bg-bg px-3 pt-8 pb-3 ${className}`}
    >
      {captioned && (
        <figcaption className="absolute top-3 left-4 z-10 text-xs font-medium text-subtle">{project.title}</figcaption>
      )}
      {visual ?? (
        <span aria-hidden="true" className="flex flex-col items-center gap-2 text-subtle">
          <FolderGit2 size={32} className="text-accent" />
          <span className="text-sm font-medium">{project.title}</span>
        </span>
      )}
    </figure>
  );
}

export default ProjectPreview;
