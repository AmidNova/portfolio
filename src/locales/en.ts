const en = {
  meta: {
    homeTitle: "Soro Amidou · Data Engineer",
    homeDescription:
      "Engineering student at ISEP Paris, AWS and Databricks certified. Real-time pipelines (Kafka, Spark, Airflow), BigQuery warehouses and BI. Looking for a Data Engineering internship from January 2027.",
    projectsTitle: "Projects · Soro Amidou",
    projectsDescription: "Real-time pipelines, BigQuery warehouses, BI and machine learning: Soro Amidou's data projects, with architecture, figures and code.",
    aboutTitle: "About · Soro Amidou",
    aboutDescription: "The longer story: from equations to data engineering, by Soro Amidou.",
    contactTitle: "Contact · Soro Amidou",
    contactDescription: "Write to Soro Amidou about a Data Engineering internship from January 2027.",
  },
  cards: {
    pauseMotion: "Pause the scrolling",
    about: { subtitle: "From equations to pipelines." },
    projects: { subtitle: "Pipelines, warehouses, BI and ML, each explained by its diagram.", viewAll: "View all projects" },
    journey: { title: "Journey", subtitle: "Where I've worked and studied" },
    credentials: { title: "Certifications & languages", subtitle: "Verified skills and the languages I work in" },
    services: {
      title: "Services",
      subtitle: "Where I can help a data team.",
      rows: [
        ["ETL / ELT pipelines", "Real-time streaming", "Data warehousing", "Airflow orchestration"],
        ["Dimensional modelling", "Data quality", "BI dashboards", "Cloud infra as code"],
      ],
    },
    contact: { title: "Let's talk about your internship" },
    stats: {
      projects: "Projects",
      projectsLink: "on GitHub",
      certifications: "Certifications",
      experience: "Experiences",
    },
  },
  nav: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    about: "About",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    main: "Main",
    language: "Language",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  notFound: {
    metaTitle: "Page not found · Soro Amidou",
    title: "Page not found",
    body: "This address leads nowhere. The link may be old, or a letter is missing.",
    projects: "See the projects",
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
    // The only résumé is in French — say so rather than surprise an English reader.
    badge: "Available from January 2027",
    chips: {
      languages: "French & English",
      school: "ISEP Paris",
    },
    resume: "Résumé (FR)",
  },
  about: {
    title: "About",
    body: [
      "I got into engineering through data: taking a raw, messy stream and turning it into something people can trust and act on. Today I work mostly with Kafka, Airflow and Spark, and I deploy on AWS with a Solutions Architect mindset.",
      "I care about systems that keep working after the first demo: clear data contracts, orchestration you can reason about, and infrastructure you can rebuild from code.",
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
        role: "Full-stack developer, team project",
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
        role: "Engineering degree, Information Systems Architecture",
        bullets: [
          "Specialisation in databases, Big Data and enterprise systems.",
          "Core courses in networks, systems architecture and cloud security.",
        ],
      },
      estm: {
        role: "Preparatory classes MPSI/MP: mathematics, physics, engineering",
        bullets: [],
      },
    },
  },
  education: {
    title: "Education",
  },
  skills: {
    title: "Toolbox",
    subtitle: "My toolbox",
    hint: "› hover a tool",
    hintTouch: "› tap a tool to see where I use it",
    count: "tools",
    certification: "Certification",
  },
  projects: {
    title: "Projects",
    page: {
      title: "My projects",
      subtitle: "Pipelines, warehouses, BI and ML, each explained by its diagram. Filter by tech, open a case study or read the code.",
      back: "Back to home",
      filter: "Technologies",
      shown: { one: "project shown", other: "projects shown" },
      reset: "Reset",
      empty: "No project combines all these technologies. Remove a filter or reset.",
      featured: "Featured",
      code: "Code",
      codePrivate: "Code not public",
    },
    caseStudy: "Case study",
    close: "Close",
    watchDemo: "Demo video",
    readDoc: "Technical documentation (PDF)",
    sectionDecisions: "Key decisions",
    flowLabel: "Pipeline",
    viewCode: "View the code",
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
      fraud: {
        title: "Fraudster Detection flow",
        desc: "Users and their transactions become one row of features per user, a calibrated Gradient Boosting model scores them, and a cost-based threshold turns the score into an alert. SHAP explains every score.",
        data: "Bank data",
        dataSub: "688k transactions",
        features: "Features",
        featuresSub: "one row per user",
        model: "Gradient Boosting",
        modelSub: "calibrated",
        alert: "Alert",
        alertSub: "cost-based threshold",
        shap: "SHAP",
        shapSub: "why this score",
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
          "Millions of raw retail transactions turned into a reliable BigQuery warehouse, with a quality gate at every stage, then 30-day sales forecasting and customer segmentation.",
        metrics: [
          { value: "30 days", label: "forecast horizon" },
          { value: "2", label: "BigQuery ML models" },
          { value: "100%", label: "of stages quality-checked" },
        ],
      },
      "fraud-detection": {
        status: "2026",
        summary:
          "Spotting the money mules among an online bank's users from their profile and transaction history: a Gradient Boosting model that catches 9 fraudsters in 10, and explains why.",
        metrics: [
          { value: "53 / 59", label: "fraudsters caught (test)" },
          { value: "0.86", label: "PR-AUC (random: 0.03)" },
          { value: "688k", label: "transactions" },
        ],
      },
      "healthcare-bi": {
        status: "2026",
        summary:
          "A Power BI star-schema warehouse to steer 10 hospitals: DAX KPIs tied to alert thresholds, a what-if scenario and documented governance.",
        metrics: [
          { value: "55,500", label: "admissions" },
          { value: "10", label: "hospitals" },
          { value: "$25.6M", label: "savings (what‑if)" },
        ],
      },
    },
    media: {
      "retail-pipeline": {
        architecture:
          "One Airflow DAG drives the whole run, from the raw Online Retail II file (about 500k UK e-commerce transactions, 2009–2011) to the dashboards. The CSV lands in Cloud Storage and loads into BigQuery; dbt rebuilds it as a star schema (customer, date and product dimensions around an invoice fact table), then as report tables. Soda checks the data after each of the three layers, so a bad row stops where it appears instead of reaching a dashboard. Two dbt models feed BigQuery ML: daily revenue for a 30-day forecast, and RFM scores for customer segments.",
        flow: [
          { label: "Raw CSV", detail: "~500k transactions" },
          { label: "Cloud Storage", detail: "raw landing" },
          { label: "BigQuery", detail: "load · Soda check" },
          { label: "dbt star schema", detail: "3 dims + fact · Soda check" },
          { label: "dbt reports", detail: "country, product, year · Soda check" },
          { label: "BigQuery ML", detail: "30-day forecast · RFM" },
          { label: "Metabase", detail: "dashboards" },
        ],
        decisions: [
          "A quality gate after every layer: Soda runs after the load, the transform and the reports, and a failed check stops the DAG at that layer.",
          "dbt and Soda live in their own virtualenvs inside the Airflow image, so their dependencies never clash with Airflow's.",
          "Moved from Astro CLI to plain Airflow 2.7 (LocalExecutor, Docker Compose): the stack starts with one command and needs no vendor tooling.",
          "CI on every pull request: dbt compile checks the SQL without cloud access; dbt test runs against BigQuery on main.",
        ],
      },
      "fraud-detection": {
        architecture:
          "A StrataScratch take-home on an online bank: 9,944 users (3% fraudsters) and 688,651 transactions. The notebook builds one row per user (transaction mix, amounts, timing, geography, how fast money leaves after a top-up), compares Logistic Regression, Random Forest and Gradient Boosting under 5-fold cross-validation on PR-AUC, then calibrates the winner and sets its alert threshold from the cost of a missed fraudster versus a false alarm. Feature code and evaluation helpers live in a tested Python package.",
        flow: [
          { label: "Users + transactions", detail: "9,944 users · 688k rows" },
          { label: "Data checks", detail: "leaky STATE column dropped" },
          { label: "Features", detail: "one row per user · sequences" },
          { label: "Model selection", detail: "3 models · 5-fold CV · PR-AUC" },
          { label: "Gradient Boosting", detail: "calibrated · cost threshold" },
          { label: "SHAP · drift", detail: "explanations · PSI monitoring" },
        ],
        decisions: [
          "Dropped the account STATE column: a locked account gives the answer away, so a model using it would look perfect and be useless.",
          "PR-AUC rather than accuracy: with 3% fraudsters, a model that flags nobody is already 97% accurate.",
          "The test set chooses nothing: thresholds and models are picked on validation, the test set only reports.",
          "Honest estimates next to the headline: PR-AUC 0.76 when trained on older accounts and tested on newer ones, 0.68 when deciding after only 30 days of activity.",
        ],
        shots: {
          test: "Test set: confusion matrix and precision-recall curve",
          mix: "Transaction mix: fraudsters vs other users",
          shap: "SHAP: what pushes a user towards \"fraudster\"",
        },
      },
      "healthcare-bi": {
        architecture:
          "55,500 hospital admissions across 10 US sites, modelled as a star schema in Power BI. Four advanced DAX KPIs each carry a trigger threshold and the persona who acts on it, so the report says who should move, not just what changed. A parameter-driven what‑if scenario puts a figure on the stakes: $25.6M in potential savings.",
        flow: [
          { label: "Sources", detail: "55,500 admissions · 10 sites" },
          { label: "Power Query · DuckDB", detail: "preparation" },
          { label: "Star schema", detail: "Power BI model" },
          { label: "DAX KPIs", detail: "4 KPIs · alert thresholds" },
          { label: "What-if", detail: "$25.6M potential savings" },
          { label: "Power BI report", detail: "one owner per KPI" },
        ],
        decisions: [
          "Every KPI is tied to a threshold and a decision-maker: a number with no owner and no trigger doesn't make the report.",
          "A what-if parameter rather than a fixed estimate, so the savings figure moves with the assumptions.",
          "Governance written down end to end: source inventory, metric definitions, freshness, access control, metadata snapshot, limitations and an ethics statement.",
        ],
      },
      "wikipedia-pulse": {
        architecture:
          "Two sources feed the pipeline: Wikimedia's real-time SSE stream (lead indicator) and the Wikimedia API in batch (lag indicator, D+1). Kafka buffers the stream; a 6-task Airflow DAG orchestrates the flow. Spark computes raw usage and an Isolation Forest model flags anomalies. Results are indexed in Elasticsearch and visualised in Kibana.",
        shots: {
          metric: "Real-time KPIs on the live edit stream",
          trending1: "Trending articles: surfacing spikes",
          trending2: "Trending breakdown by topic",
          scoop: "Scoop detection: early edit bursts",
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
      { label: "English", value: "B2, professional use" },
    ],
  },
  contact: {
    title: "Contact",
    body: "I'm looking for a Data Engineering internship starting January 2027. Leave a message and I'll get back to you promptly.",
    cta: "Send an email",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Couldn't copy",
    write: "Write a message",
    form: {
      title: "Write a message",
      lead: "About an internship, a project or a question: it reaches my inbox, and I reply from my own address.",
      name: "Name",
      email: "Email",
      emailHint: "So I can reply.",
      message: "Message",
      send: "Send",
      sending: "Sending…",
      errors: {
        name: "Please enter your name (100 characters at most).",
        email: "Please enter a valid email address.",
        message: "Please write at least 10 characters (5,000 at most).",
        token: "Please complete the human check above the button.",
        captcha: "The human check failed. Please try it again.",
        unavailable: "The message couldn't be sent right now.",
        network: "The message couldn't be sent: check your connection.",
        fallback: "You can also write to me directly:",
        checkUnavailable: "The human check couldn't load (a blocker, or no connection).",
      },
      sentTitle: "Message sent",
      sentBody: "Thank you. I'll reply to the address you gave, usually within two days.",
      another: "Send another message",
      privacy: "Your message is kept 90 days, then deleted. It's only used to reply to you.",
    },
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
          "For the first time, I understood: this was my medium.",
        ],
        caption: "Paris",
      },
      {
        title: "Two sides of the same coin",
        body: [
          "I believe the best engineers are also storytellers: an idea that can't be communicated doesn't exist.",
          "So when I won the eloquence championship at ISEP, it felt like both sides finally clicked together.",
        ],
        caption: "Eloquence championship, ISEP",
      },
    ],
    offClock: {
      title: "Off the clock",
      items: [
        { title: "Reading", desc: "History, philosophy, novels: the older the better." },
        { title: "Chess", desc: "A love for systems and strategy. Every game is a problem to solve." },
        { title: "Running", desc: "The only time I stop thinking about code. Almost." },
      ],
    },
  },
};

export default en;
