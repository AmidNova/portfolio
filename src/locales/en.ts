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
    about: { subtitle: "From equations to pipelines." },
    projects: { subtitle: "From the real-time stream to the dashboard.", viewAll: "View all projects" },
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
      "In my projects, every stage checks its data before writing it, the orchestration reads as a single DAG and the whole stack restarts with one command.",
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
      subtitle: "Four data projects, from the real-time stream to the dashboard. Each has its own page: context, architecture, technical choices and limits.",
      back: "Back to home",
      featured: "Featured",
      code: "Code",
      codePrivate: "Code not public",
    },
    caseStudy: "View project",
    close: "Close",
    allProjects: "All projects",
    nextProject: "Next project",
    readDoc: "Technical documentation (PDF)",
    watchDemo: "Demo video",
    sectionDecisions: "Technical choices",
    sectionLimits: "Limits",
    flowLabel: "Pipeline",
    viewCode: "View the code",
    sectionArchitecture: "Architecture",
    sectionResults: "Results",
    techDoc: "Resources",
    enlarge: "Enlarge image",
    previous: "Previous image",
    next: "Next image",
    context: {
      label: "Project context",
      type: "Setting",
      period: "Period",
      data: "Data",
    },
    diagram: {
      title: "Wikipedia Pulse architecture",
      desc: "A producer pushes Wikimedia's edit stream into Kafka. Every day, an Airflow 3 DAG drains the topic, fetches pageviews and Wikidata IDs, computes emergence and lead-lag with PySpark, then indexes the results in Elasticsearch for Kibana.",
      sse: "continuous edits",
      api: "views · Wikidata",
      kafka: "buffer",
      airflow: "DAG · 12 tasks",
      spark: "emergence · lead-lag",
      es: "index",
      kibana: "dashboard as code",
    },
    visuals: {
      retail: {
        title: "Retail Data Pipeline flow",
        desc: "Raw transactions land in Cloud Storage, are loaded into a BigQuery warehouse, then prepared for BigQuery ML forecasts and segments. A Soda quality check guards every hand-off.",
        raw: "raw data",
        landing: "raw zone",
        warehouse: "warehouse",
        ml: "models",
        forecast: "Forecast",
        forecastSub: "30-day sales",
        segments: "Segments",
        segmentsSub: "RFM customers",
        checks: "blocking quality check",
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
        desc: "An admissions fact table joined to hospital, patient, date and diagnosis dimensions.",
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
        summary:
          "On Wikipedia, editors react to an event hours before readers do. This pipeline measures that gap every day across 5 languages and flags the articles that break from their usual behaviour.",
        metrics: [
          { value: "212,788", label: "edits captured in 5 days" },
          { value: "241", label: "emerging articles" },
          { value: "13 min", label: "per daily run" },
        ],
        context: {
          type: "Personal project · solo",
          period: "May – Oct 2026",
          data: "Wikimedia: edit stream, pageviews, Wikidata (public)",
        },
        limits: [
          "Five days of data only: the 28-day per-article history isn't filled yet, many medians are 0 and detection is still loose.",
          "The stack runs locally with Docker Compose; it isn't deployed to the cloud.",
          "On a single article the hourly correlation is noisy: lead-lag is read as a distribution, not article by article.",
        ],
      },
      "retail-pipeline": {
        summary:
          "An ELT pipeline on GCP that turns 500,000 raw e-commerce transactions into a BigQuery star-schema warehouse, with a blocking quality check after every layer.",
        metrics: [
          { value: "≈ 500k", label: "transactions loaded" },
          { value: "9", label: "dbt models" },
          { value: "8", label: "Soda check suites" },
        ],
        context: {
          type: "Personal project · solo",
          period: "2026",
          data: "Online Retail II (UCI), public dataset",
        },
        limits: [
          "A historical, frozen dataset (2009–2011): the DAG reloads the whole file, with no incremental load.",
          "dbt test only runs on main, since pull requests have no GCP secrets: a data regression is caught only after merging.",
        ],
      },
      "fraud-detection": {
        summary:
          "Spotting the money mules among an online bank's users from their profile and transaction history. The chosen model catches 53 of the 59 fraudsters in the test set, and SHAP explains every alert.",
        metrics: [
          { value: "53 / 59", label: "fraudsters caught (test)" },
          { value: "0.86", label: "PR-AUC (random: 0.03)" },
          { value: "688k", label: "transactions" },
        ],
        context: {
          type: "StrataScratch take-home · solo",
          period: "Oct 2026",
          data: "Online bank, provided by StrataScratch (not public)",
        },
        limits: [
          "Only 298 fraudsters, about 60 per evaluation set: scores carry roughly ± 0.05 of uncertainty.",
          "More realistic estimates than the headline: PR-AUC 0.76 when testing on newer accounts, 0.68 when deciding after only 30 days of activity.",
          "Labels only cover fraudsters who were caught, so the model partly learns past detection rules.",
          "The cost ratio behind the threshold is an assumption, not a business figure.",
        ],
      },
      "healthcare-bi": {
        summary:
          "A Power BI report on 55,500 hospital admissions: a star-schema model and four DAX KPIs, each tied to an alert threshold and to the person who has to act.",
        metrics: [
          { value: "55,500", label: "admissions (synthetic)" },
          { value: "4", label: "KPIs with alert thresholds" },
          { value: "10", label: "hospitals compared" },
        ],
        context: {
          type: "ISEP course project · team",
          period: "2025 – 2026",
          data: "Synthetic dataset provided by the course",
        },
        limits: [
          "The data is synthetic: cost or length-of-stay trends say nothing about real hospitals. The work is in the modelling, the KPIs and the governance.",
          "The $25.6M savings in the what-if scenario depend entirely on the chosen assumptions: an order of magnitude to discuss, not a forecast.",
        ],
      },
    },
    media: {
      "retail-pipeline": {
        architecture:
          "One Airflow DAG drives the whole run, from the raw Online Retail II file (about 500k UK e-commerce transactions, 2009–2011) to the Metabase dashboards. The CSV lands in Cloud Storage, then in BigQuery. dbt rebuilds it as a star schema (customer, date and product dimensions around an invoice fact table), then as report tables. Soda checks the data after each of the three layers. Two dbt models prepare the BigQuery ML inputs: daily revenue for a 30-day forecast, and RFM scores for customer segments.",
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
          "Soda runs after the load, the transform and the reports. A failed check stops the DAG, so a bad row stays in the layer where it appeared.",
          "dbt and Soda live in their own virtualenvs inside the Airflow image, so their dependencies never clash with Airflow's.",
          "Moved from Astro CLI to plain Airflow 2.7 (LocalExecutor, Docker Compose): the stack starts with one command and needs no vendor tooling.",
          "CI on every pull request: dbt compile checks the SQL without cloud access.",
        ],
      },
      "fraud-detection": {
        architecture:
          "9,944 users, 3% of them fraudsters, and 688,651 transactions. The notebook builds one row per user (transaction mix, amounts, timing, geography, how fast money leaves after a top-up), compares Logistic Regression, Random Forest and Gradient Boosting under 5-fold cross-validation on PR-AUC, then calibrates the winner and sets its alert threshold from the cost of a missed fraudster versus a false alarm. Feature code and evaluation helpers live in a Python package tested in CI.",
        flow: [
          { label: "Users + transactions", detail: "9,944 users · 688k rows" },
          { label: "Data checks", detail: "leaky STATE column dropped" },
          { label: "Features", detail: "one row per user · sequences" },
          { label: "Model selection", detail: "3 models · 5-fold CV · PR-AUC" },
          { label: "Gradient Boosting", detail: "calibrated · cost threshold" },
          { label: "SHAP · drift", detail: "explanations · PSI monitoring" },
        ],
        decisions: [
          "Dropped the account STATE column: a locked account gives the answer away. A model using it would look perfect and be useless.",
          "PR-AUC rather than accuracy: with 3% fraudsters, a model that flags nobody is already 97% accurate.",
          "The test set only reports results. Thresholds and models are picked on validation.",
        ],
        shots: {
          test: "Test set: confusion matrix and precision-recall curve",
          mix: "Transaction mix: fraudsters vs other users",
          shap: "SHAP: what pushes a user towards \"fraudster\"",
        },
      },
      "healthcare-bi": {
        architecture:
          "The brief: an oversight body wants to understand admissions, lengths of stay and costs across 10 US hospitals. The data is prepared in Power Query and DuckDB, then modelled as a star schema in Power BI (admissions fact, hospital, patient, date and diagnosis dimensions). Four DAX KPIs each carry a trigger threshold and the persona who acts on it. A what-if parameter puts a figure on lower costs.",
        flow: [
          { label: "Sources", detail: "55,500 admissions · 10 sites" },
          { label: "Power Query · DuckDB", detail: "preparation" },
          { label: "Star schema", detail: "Power BI model" },
          { label: "DAX KPIs", detail: "4 KPIs · alert thresholds" },
          { label: "What-if", detail: "adjustable scenario" },
          { label: "Power BI report", detail: "one owner per KPI" },
        ],
        decisions: [
          "Every KPI has a threshold and an owner. A number nobody can act on doesn't make the report.",
          "A what-if parameter rather than a fixed estimate, so the savings figure moves with the assumptions.",
          "Governance written down: source inventory, metric definitions, freshness, access control, limitations and an ethics statement.",
        ],
        shots: {
          overview: "Overview: admissions, billing, length of stay and YoY / YTD indicators",
          demographics: "Patient demographics: age, gender and blood type",
          conditions: "Medical conditions: volume, stay, cost and results by condition",
          stay: "Length of stay by condition, hospital and admission type",
          finance: "Costs by condition, hospital and insurer",
          outcomes: "Hospitals: patient volume and test results",
        },
      },
      "wikipedia-pulse": {
        architecture:
          "A producer listens to Wikimedia's SSE change stream around the clock and pushes every edit into Kafka. Once a day, a 12-task Airflow 3 DAG drains the topic, fetches pageviews (API and hourly dumps) and Wikidata IDs, then runs everything through three datalake layers: raw, formatted (Parquet, UTC) and usage (PySpark). The final tables are indexed in Elasticsearch; the Kibana dashboard is generated by a versioned script. First result: when edits lead (23% of the 4,347 measurable articles), reads follow with a 12-hour median lag.",
        decisions: [
          "Each article is compared with its own 28-day history (median and MAD), not with the day's other articles. It is emerging at a robust z-score ≥ 3.5 with at least 3 distinct editors, so the number of emerging articles follows the news instead of being a quota.",
          "Languages are grouped by Wikidata entity, not by title: \"Tour Eiffel\" and \"Eiffel Tower\" are the same subject, and two homonyms aren't merged.",
          "Every task checks its output and fails before writing when the data is plainly wrong: under 1,000 edits, a broken pageview join, more than 5% emerging.",
          "Business logic lives outside the DAG in unit-tested modules; CI reruns those tests and the DAG integrity check on every push.",
        ],
        shots: {
          dashboard: "Kibana dashboard on 5 days of real data (Oct 3–7, 2026)",
          dag: "October 7 run in Airflow 3: 12 tasks, 13 min 33 s",
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
