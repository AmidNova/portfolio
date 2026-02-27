import { Cloud, Layers, Lightbulb } from "lucide-react";

function Services() {
  const cards = [
    {
      icon: <Lightbulb size={36} strokeWidth={1.5} color="#1a1a2e" />,
      title: "Problem-First Engineering",
      description:
        "I don't code for the sake of coding. I start with the problem, understand the need, then build the simplest solution that actually works.",
    },
    {
      icon: <Layers size={36} strokeWidth={1.5} color="#1a1a2e" />,
      title: "Robust System Design",
      description:
        "I design systems that are clean, structured, and built to last. From database schema to API architecture, I think about maintainability from day one.",
    },
    {
      icon: <Cloud size={36} strokeWidth={1.5} color="#1a1a2e" />,
      title: "Cloud Infrastructure & DevOps",
      description:
        "I implement robust cloud foundations on AWS and GCP. By automating deployments and optimizing pipelines, I reduce technical debt and risk while increasing efficiency.",
    },
  ];

  return (
    <section
      style={{
        padding: "2rem 5rem 4rem",
        maxWidth: "72rem",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3rem",
          border: "1px solid #f0f0f0",
          borderRadius: "1.25rem",
          padding: "1rem",
        }}
      >
        {cards.map((card, i) => (
          <div key={i} style={{ padding: "1.5rem 0" }}>
            <div style={{ marginBottom: "1.5rem" }}>{card.icon}</div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.3,
                marginBottom: "1rem",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                lineHeight: 1.75,
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
