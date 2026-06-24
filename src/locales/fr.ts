const fr = {
  nav: {
    home: "Accueil",
    work: "Projets",
    about: "À propos",
    dark: "Sombre",
    light: "Clair",
  },
  a11y: {
    skipToContent: "Aller au contenu principal",
  },
  hero: {
    greeting: "Bonjour, je suis Soro Amidou",
    bio: "Je me spécialise dans le développement d'applications full-stack et le déploiement de systèmes cloud scalables. J'aime transformer les idées en réalité concrète. Mon objectif est de concevoir des architectures robustes et livrer des logiciels qui résolvent de vrais problèmes.",
    seeWork: "Voir mes projets",
    contact: "Me contacter",
  },
  services: {
    label: "Ce que je fais",
    title: "Services",
    cards: [
      {
        title: "Ingénierie orientée problème",
        description:
          "Je ne code pas pour coder. Je commence par le problème, comprends le besoin, puis construis la solution la plus simple qui fonctionne vraiment.",
      },
      {
        title: "Conception de systèmes robustes",
        description:
          "Je conçois des systèmes propres, structurés et durables. Du schéma de base de données à l'architecture API, je pense à la maintenabilité dès le premier jour.",
      },
      {
        title: "Infrastructure Cloud & DevOps",
        description:
          "Je mets en place des infrastructures cloud robustes sur AWS et GCP. En automatisant les déploiements et en optimisant les pipelines, je réduis la dette technique et les risques tout en améliorant l'efficacité.",
      },
    ],
  },
  career: {
    soFar: "Mon parcours",
    title: "Parcours",
    hearMe: "Écoutez-moi en parler",
    needCopy: "Besoin de voir mon CV ?",
    resume: "CV",
    techTools: "Technologies & Outils",
    bullets: {
      isep: [
        "Étude des disciplines fondamentales de l'ingénierie : réseaux, architecture des systèmes et sécurité cloud.",
        "Spécialisation en Architecture des Systèmes d'Information avec un focus sur la conception de BDD, le Big Data et les systèmes d'entreprise.",
        "Projets pratiques en développement de systèmes, télécommunications et transformation digitale.",
        "Construction d'une base solide en mathématiques appliquées, algorithmes et bonnes pratiques du génie logiciel.",
      ],
      estm: [
        "Achèvement d'un programme préparatoire rigoureux de 3 ans en Mathématiques, Physique et Sciences de l'Ingénieur.",
        "Développement de solides bases analytiques et de résolution de problèmes à travers un cursus intensif.",
        "Préparation aux concours d'entrée des grandes écoles d'ingénieurs.",
      ],
      artci: [
        "Conception et développement d'une plateforme de gestion des images de signatures électroniques.",
        "Configuration et contrôle des données liées à l'inventaire du matériel et aux utilisateurs.",
        "Stack : Laravel, React.js, JSX, MySQL, CSS3.",
      ],
      bozarts: [
        "Développement d'une marketplace artisanale avec profils utilisateurs, annonces produits, panier et messagerie temps réel.",
        "Développé en PHP, MySQL, HTML, CSS et JavaScript avec une base de données normalisée.",
        "Gestion du contrôle d'accès utilisateurs et administration complète de la base de données.",
      ],
    },
  },
  projects: {
    featured: "À la une",
    title: "Projets",
    techStack: "Stack technique",
    showAll: "Voir tous les projets",
    caseStudy: "Étude de cas",
    watchDemo: "Voir la démo",
    readDoc: "Documentation complète (PDF)",
    close: "Fermer",
    sectionOverview: "Le projet",
    sectionArchitecture: "Architecture",
    sectionResults: "Résultats",
    techDoc: "Documentation technique",
    media: {
      "wikipedia-pulse": {
        architecture:
          "Deux sources alimentent le pipeline : le flux SSE temps réel de Wikimedia (lead indicator) et l'API Wikimedia en batch (lag indicator J+1). Kafka encaisse le flux ; un DAG Airflow de 6 tâches atomiques orchestre le tout. Spark calcule les usages bruts et un modèle ML Isolation Forest détecte les anomalies — les résultats sont indexés dans Elasticsearch puis visualisés dans Kibana.",
        shots: {
          metric: "KPIs en temps réel sur le flux d'éditions",
          trending1: "Articles tendance — détection des pics",
          trending2: "Tendances par thématique",
          scoop: "Détection de scoops — rafales d'éditions précoces",
          country: "Activité d'édition par pays",
          tempo: "Histogramme du tempo des éditions",
          velocity: "Vélocité éditoriale par article",
          ratio: "Analyse du ratio effort / attention",
        },
      },
    },
    items: [
      {
        description:
          "Pipeline d'analyse en temps réel du flux d'éditions Wikipédia. Ingestion via Kafka, orchestration Airflow, traitements Spark et détection d'anomalies par ML (Isolation Forest), indexation Elasticsearch et tableaux de bord Kibana — détection des tendances, scoops et vélocité éditoriale au fil des éditions.",
        status: "Projet personnel",
      },
      {
        description:
          "Plateforme d'alertes prix & stock alimentée par l'IA. Définissez un prix cible ou demandez une notification de réapprovisionnement — Kairos surveille et vous alerte instantanément.",
        status: "En développement",
      },
      {
        description:
          "Marketplace artisanale full-stack avec profils utilisateurs, annonces produits, panier d'achat et messagerie en temps réel. Développé en projet d'équipe à l'ISEP Paris.",
        status: "Projet académique",
      },
    ],
  },
  footer: {
    built: "© 2026 — Construit avec React & TypeScript",
    cta: "Travaillons ensemble",
    available: "Disponible pour de nouvelles opportunités",
    headline: "Construisons quelque chose de grand",
    sendMessage: "Me contacter",
  },
  about: {
    title: "À propos",
    tagline: "Étudiant ingénieur full-stack avec une vision système.",
    background: "Profil",
    bio1: "À l'aise sur toute la stack — de la conception d'API REST à l'infrastructure cloud et aux pipelines de données. J'ai construit et livré de vrais produits. Je cherche une alternance où la polyvalence est un atout.",
    bio2: "J'accorde de l'importance à une architecture propre, aux systèmes qui passent à l'échelle et aux logiciels qui résolvent vraiment quelque chose. Je vais vite, je pense en systèmes, et je ne m'arrête pas à la première version qui marche.",
    education: "Formation",
    educationItems: [
      "Diplôme d'Ingénieur – Architecture des Systèmes d'Information — ISEP Paris (2024 – 2027)",
      "Classes Préparatoires MPSI/MP — ESTM, Casablanca (2021 – 2024)",
    ],
    skills: "Compétences techniques",
    skillItems: [
      {
        label: "Full Stack",
        value:
          "React.js, Next.js, Tailwind CSS, TypeScript, Node.js, Express, NestJS, REST API",
      },
      {
        label: "Data & Cloud",
        value:
          "AWS, Azure, PostgreSQL, MongoDB, Cassandra, Apache Spark, Power BI",
      },
      {
        label: "Outils & Langages",
        value: "Python, SQL, Java, Git, Docker, Linux, Figma",
      },
    ],
    certifications: "Certifications",
    certificationItems: [
      "AWS Solutions Architect Associate",
      "Scrimba Full Stack Developer",
    ],
    languages: "Langues",
    languageItems: [
      { label: "Français", value: "Natif" },
      { label: "Anglais", value: "B2 – Professionnel" },
    ],
  },
};

export default fr;
