interface PipelineProps {
  steps: string[];
  dark: boolean;
  /** seconds for one dot traversal */
  duration?: number;
}

/**
 * Animated data-flow strip: a dot travels left→right along a track behind
 * labelled nodes. Honors prefers-reduced-motion (dot hidden via CSS).
 */
function Pipeline({ steps, dark, duration = 4 }: PipelineProps) {
  const green = dark ? "#3fb950" : "#1a7f37";
  const track = dark ? "#30363d" : "#e4e4e7";
  const nodeBg = dark ? "#0d1117" : "#fafafa";
  const txt = dark ? "#adbac7" : "#3f3f46";

  return (
    <div style={{ position: "relative", padding: "0.5rem 0", overflow: "hidden" }}>
      {/* track */}
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: track }} />
      {/* travelling dot */}
      <span
        className="flow-dot"
        style={{
          position: "absolute",
          top: "calc(50% - 3px)",
          width: "6px",
          height: "6px",
          background: green,
          boxShadow: `0 0 8px ${green}`,
          animation: `flow-dot ${duration}s linear infinite`,
        }}
      />
      {/* nodes */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        {steps.map((s) => (
          <span
            key={s}
            style={{
              background: nodeBg,
              padding: "0.2rem 0.55rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: txt,
              border: `1px solid ${track}`,
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Pipeline;
