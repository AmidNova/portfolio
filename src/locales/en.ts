const en = {
  meta: {
    homeTitle: "Soro Amidou — Data Engineer",
    homeDescription:
      "Engineering student at ISEP Paris, AWS and Databricks certified. Real-time pipelines (Kafka, Spark, Airflow), BigQuery warehouses and BI. Looking for a Data Engineering internship from January 2027.",
    aboutTitle: "About — Soro Amidou",
    aboutDescription: "The longer story: from equations to data engineering, by Soro Amidou.",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    about: "About",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    language: "Language",
  },
  a11y: {
    skipToContent: "Skip to main content",
  },
  hero: {
    role: "Data Engineer",
    tagline:
      "Engineering student at ISEP Paris. I build real-time data pipelines and the cloud infrastructure that runs them.",
    status: "Looking for a Data Engineering internship",
    available: "From January 2027",
    location: "Paris, France",
    pulse: {
      label: "Wikipedia edits/min",
      title: "Live from the public Wikimedia stream — the same source as Wikipedia Pulse",
    },
    // The only résumé is in French — say so rather than surprise an English reader.
    resume: "Résumé (FR)",
  },
  about: {
    title: "About",
    body: [
      "I got into engineering through data: taking a raw, messy stream and turning it into something people can trust and act on. Today I work mostly with Kafka, Airflow and Spark, and I deploy on AWS with a Solutions Architect mindset.",
      "I care about systems that keep working after the first demo — clear data contracts, orchestration you can reason about, and infrastructure you can rebuild from code.",
    ],
    more: "The longer story",
  },
  experience: {
    title: "Experience",
    present: "Present",
    links: {
      website: "Official website",
      linkedin: "LinkedIn",
      x: "X (Twitter)",
    },
    entries: {
      bozarts: {
        role: "Full-stack developer — team project",
        bullets: [
          "Built an artisan marketplace: user profiles, product listings, cart and real-time messaging.",
          "Designed the normalized MySQL schema and handled access control and database administration.",
        ],
      },
      artci: {
        role: "Web development intern",
        bullets: [
          "Built the electronic-signature management backend module for SIGFAE, a national platform deployed across every Ivorian ministry.",
          "Stack: React, MySQL.",
        ],
      },
      isep: {
        role: "Engineering degree — Information Systems Architecture",
        bullets: [
          "Specialisation in databases, Big Data and enterprise systems.",
          "Core courses in networks, systems architecture and cloud security.",
        ],
      },
      estm: {
        role: "Preparatory classes MPSI/MP — Mathematics, Physics, Engineering",
        bullets: [],
      },
    },
  },
  education: {
    title: "Education",
  },
  skills: {
    title: "Stack",
    groups: {
      data: "Data Engineering",
      cloud: "Cloud & Infra",
      bi: "Analytics & BI",
      lang: "Languages & tools",
    },
  },
  projects: {
    title: "Projects",
    caseStudy: "Case study",
    close: "Close",
    watchDemo: "Demo video",
    readDoc: "Technical documentation (PDF)",
    sectionArchitecture: "Architecture",
    sectionResults: "Results",
    techDoc: "Resources",
    enlarge: "Enlarge image",
    previous: "Previous image",
    next: "Next image",
    diagram: {
      title: "Wikipedia Pulse architecture",
      desc: "Wikimedia's real-time stream flows through Kafka into Spark; the batch API feeds an Airflow DAG that runs Isolation Forest anomaly detection. Both land in Elasticsearch and are visualised in Kibana.",
      sse: "real-time stream",
      api: "batch · D+1",
      kafka: "buffer",
      airflow: "DAG · 6 tasks",
      spark: "processing",
      iforest: "anomaly detection",
      es: "index",
      kibana: "dashboards",
      orchestration: "orchestration",
    },
    visuals: {
      retail: {
        title: "Retail Data Pipeline flow",
        desc: "Raw transactions land in Cloud Storage, are loaded into a BigQuery warehouse, then feed BigQuery ML forecasts and segments. An automated quality check guards every hand-off.",
        raw: "raw data",
        landing: "raw zone",
        warehouse: "warehouse",
        ml: "models",
        forecast: "Forecast",
        forecastSub: "30-day sales",
        segments: "Segments",
        segmentsSub: "customers by value",
        checks: "automated quality check",
      },
      healthcare: {
        title: "Healthcare BI star schema",
        desc: "An admissions fact table joined to hospital site, patient, date and diagnosis dimensions.",
        fact: "fact table",
        site: "Hospital",
        patient: "Patient",
        date: "Date",
        diagnosis: "Diagnosis",
        dimension: "dimension",
      },
    },
    items: {
      "wikipedia-pulse": {
        status: "2026",
        summary:
          "Wikipedia articles surge with edits before the media covers an event. This system catches that signal in real time and flags the anomalies.",
        metrics: [
          { value: "365", label: "pre-viral events" },
          { value: "4,808", label: "articles monitored" },
          { value: "5", label: "languages" },
        ],
      },
      "retail-pipeline": {
        status: "2026",
        summary:
          "Millions of raw retail transactions turned into a reliable BigQuery warehouse, with a quality gate at every stage — then 30-day sales forecasting and customer segmentation.",
        metrics: [
          { value: "30 days", label: "forecast horizon" },
          { value: "2", label: "BigQuery ML models" },
          { value: "100%", label: "of stages quality-checked" },
        ],
      },
      "healthcare-bi": {
        status: "2026",
        summary:
          "A Power BI star-schema warehouse to steer 10 hospitals: DAX KPIs tied to alert thresholds, a what-if scenario and documented governance.",
        metrics: [
          { value: "55,500", label: "admissions" },
          { value: "10", label: "hospitals" },
          { value: "$25.6M", label: "savings (what-if)" },
        ],
      },
    },
    media: {
      "wikipedia-pulse": {
        architecture:
          "Two sources feed the pipeline: Wikimedia's real-time SSE stream (lead indicator) and the Wikimedia API in batch (lag indicator, D+1). Kafka buffers the stream; a 6-task Airflow DAG orchestrates the flow. Spark computes raw usage and an Isolation Forest model flags anomalies — results are indexed in Elasticsearch and visualised in Kibana.",
        shots: {
          metric: "Real-time KPIs on the live edit stream",
          trending1: "Trending articles — surfacing spikes",
          trending2: "Trending breakdown by topic",
          scoop: "Scoop detection — early edit bursts",
          country: "Edit activity by country",
          tempo: "Edit tempo histogram over time",
          velocity: "Editorial velocity per article",
          ratio: "Effort / attention ratio analysis",
        },
      },
    },
  },
  certifications: {
    title: "Certifications",
  },
  languages: {
    title: "Languages",
    items: [
      { label: "French", value: "Native" },
      { label: "English", value: "B2 — professional" },
    ],
  },
  contact: {
    title: "Contact",
    body: "I'm looking for a Data Engineering internship starting January 2027. Email is the fastest way to reach me — I reply within a day or two.",
    cta: "Send an email",
  },
  story: {
    back: "Back",
    title: "I spent years convinced I had no talent.",
    lead: "Turns out I just hadn't found my medium.",
    chapters: [
      {
        title: "The art I couldn't make",
        body: [
          "Growing up, I watched others paint, sing and dance, and felt like I was standing outside a room I wasn't allowed into. My fingers were too used to equations, my voice too ordinary.",
          "I told myself art wasn't for me. I was wrong about what art was.",
        ],
        caption: "Louvre, Paris",
      },
      {
        title: "The day equations came alive",
        body: [
          "Then I discovered code, and something clicked. I could give body to equations, represent the real world inside a machine, and turn logic into something someone could feel.",
          "For the first time, I understood — this was my medium.",
        ],
        caption: "Paris",
      },
      {
        title: "Two sides of the same coin",
        body: [
          "I believe the best engineers are also storytellers: an idea that can't be communicated doesn't exist.",
          "So when I won the eloquence championship at ISEP, it felt like both sides finally clicked together.",
        ],
        caption: "Eloquence championship — ISEP",
      },
    ],
    offClock: {
      title: "Off the clock",
      items: [
        { title: "Reading", desc: "History, philosophy, novels — the older the better." },
        { title: "Chess", desc: "A love for systems and strategy. Every game is a problem to solve." },
        { title: "Running", desc: "The only time I stop thinking about code. Almost." },
      ],
    },
  },
};

export default en;
