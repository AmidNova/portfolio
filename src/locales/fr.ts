const fr = {
  meta: {
    homeTitle: "Soro Amidou — Data Engineer",
    homeDescription:
      "Étudiant ingénieur à l'ISEP Paris, certifié AWS et Databricks. Pipelines temps réel (Kafka, Spark, Airflow), entrepôts BigQuery et BI. Recherche un stage en Data Engineering dès janvier 2027.",
    aboutTitle: "À propos — Soro Amidou",
    aboutDescription: "L'histoire complète : des équations au Data Engineering, par Soro Amidou.",
  },
  cards: {
    about: { subtitle: "Comment je suis venu à la donnée" },
    projects: { subtitle: "Pipelines, entrepôts et BI — chacun montré par son architecture", viewAll: "Voir tous les projets" },
    journey: { title: "Parcours", subtitle: "Où j'ai travaillé et étudié" },
    credentials: { title: "Certifications & langues", subtitle: "Compétences vérifiées et langues de travail" },
    services: {
      title: "Services",
      subtitle: "Ce que j'apporte à une équipe data",
      rows: [
        ["Pipelines ETL / ELT", "Streaming temps réel", "Entrepôts de données", "Orchestration Airflow"],
        ["Modélisation dimensionnelle", "Qualité des données", "Tableaux de bord BI", "Infra cloud as code"],
      ],
    },
    contact: { title: "Parlons de votre stage" },
    stats: {
      projects: "Projets",
      projectsLink: "sur GitHub",
      certifications: "Certifications",
      experience: "Expériences",
    },
  },
  nav: {
    home: "Accueil",
    projects: "Projets",
    experience: "Parcours",
    about: "À propos",
    toDark: "Passer en mode sombre",
    toLight: "Passer en mode clair",
    language: "Langue",
  },
  a11y: {
    skipToContent: "Aller au contenu principal",
  },
  hero: {
    role: "Data Engineer",
    tagline:
      "Étudiant ingénieur à l'ISEP Paris. Je construis des pipelines de données temps réel et l'infrastructure cloud qui les fait tourner.",
    status: "Recherche un stage en Data Engineering",
    available: "Dès janvier 2027",
    location: "Paris, France",
    badge: "Disponible dès janvier 2027",
    chips: {
      languages: "Français & anglais",
      school: "ISEP Paris",
      certs: "AWS · Databricks",
    },
    resume: "CV",
  },
  about: {
    title: "À propos",
    body: [
      "Je suis venu à l'ingénierie par la donnée : prendre un flux brut et désordonné, et en faire quelque chose de fiable sur lequel on peut agir. Aujourd'hui je travaille surtout avec Kafka, Airflow et Spark, et je déploie sur AWS avec une approche Solutions Architect.",
      "Ce qui m'intéresse, ce sont les systèmes qui tiennent après la première démo : des contrats de données clairs, une orchestration lisible et une infrastructure qu'on peut reconstruire depuis le code.",
    ],
    more: "L'histoire complète",
  },
  experience: {
    title: "Expérience",
    present: "Aujourd'hui",
    links: {
      website: "Site officiel",
      linkedin: "LinkedIn",
      x: "X (Twitter)",
    },
    entries: {
      bozarts: {
        role: "Développeur full-stack — projet d'équipe",
        bullets: [
          "Marketplace pour artisans : profils, annonces, panier et messagerie temps réel.",
          "Conception du schéma MySQL normalisé, gestion des droits d'accès et administration de la base.",
        ],
      },
      artci: {
        role: "Stagiaire développeur web",
        bullets: [
          "Module backend de gestion des signatures électroniques pour SIGFAE, plateforme nationale déployée dans tous les ministères ivoiriens.",
          "Stack : React, MySQL.",
        ],
      },
      isep: {
        role: "Diplôme d'ingénieur — Architecture des Systèmes d'Information",
        bullets: [
          "Spécialisation bases de données, Big Data et systèmes d'entreprise.",
          "Tronc commun réseaux, architecture des systèmes et sécurité cloud.",
        ],
      },
      estm: {
        role: "Classes préparatoires MPSI/MP — Mathématiques, Physique, Sciences de l'ingénieur",
        bullets: [],
      },
    },
  },
  education: {
    title: "Formation",
  },
  skills: {
    title: "Boîte à outils",
    subtitle: "Les outils data avec lesquels je travaille",
    hint: "› survolez un outil",
    count: "outils",
    certification: "Certification",
  },
  projects: {
    title: "Projets",
    caseStudy: "Étude de cas",
    close: "Fermer",
    watchDemo: "Vidéo de démo",
    readDoc: "Documentation technique (PDF)",
    sectionArchitecture: "Architecture",
    sectionResults: "Résultats",
    techDoc: "Ressources",
    enlarge: "Agrandir l'image",
    previous: "Image précédente",
    next: "Image suivante",
    diagram: {
      title: "Architecture de Wikipedia Pulse",
      desc: "Le flux temps réel de Wikimedia passe par Kafka puis Spark ; l'API batch alimente un DAG Airflow qui lance la détection d'anomalies Isolation Forest. Tout aboutit dans Elasticsearch, visualisé dans Kibana.",
      sse: "flux temps réel",
      api: "batch · J+1",
      kafka: "tampon",
      airflow: "DAG · 6 tâches",
      spark: "traitement",
      iforest: "détection d'anomalies",
      es: "index",
      kibana: "tableaux de bord",
      orchestration: "orchestration",
    },
    visuals: {
      retail: {
        title: "Flux du Retail Data Pipeline",
        desc: "Les transactions brutes arrivent dans Cloud Storage, sont chargées dans un entrepôt BigQuery, puis alimentent les prévisions et segments BigQuery ML. Un contrôle qualité automatique garde chaque passage.",
        raw: "données brutes",
        landing: "zone brute",
        warehouse: "entrepôt",
        ml: "modèles",
        forecast: "Prévision",
        forecastSub: "ventes à 30 jours",
        segments: "Segments",
        segmentsSub: "clients par valeur",
        checks: "contrôle qualité automatique",
      },
      healthcare: {
        title: "Schéma en étoile de Healthcare BI",
        desc: "Une table de faits des admissions reliée aux dimensions site hospitalier, patient, date et diagnostic.",
        fact: "table de faits",
        site: "Hôpital",
        patient: "Patient",
        date: "Date",
        diagnosis: "Diagnostic",
        dimension: "dimension",
      },
    },
    items: {
      "wikipedia-pulse": {
        status: "2026",
        summary:
          "Les articles Wikipédia s'emballent avant que les médias parlent d'un événement. Ce système capte ce signal en temps réel et signale les anomalies.",
        metrics: [
          { value: "365", label: "événements pré-viraux" },
          { value: "4 808", label: "articles suivis" },
          { value: "5", label: "langues" },
        ],
      },
      "retail-pipeline": {
        status: "2026",
        summary:
          "Des millions de transactions brutes transformées en entrepôt BigQuery fiable, avec un contrôle qualité à chaque étape — puis prévision des ventes à 30 jours et segmentation client.",
        metrics: [
          { value: "30 j", label: "horizon de prévision" },
          { value: "2", label: "modèles BigQuery ML" },
          { value: "100 %", label: "des étapes contrôlées" },
        ],
      },
      "healthcare-bi": {
        status: "2026",
        summary:
          "Un entrepôt en étoile sous Power BI pour piloter 10 hôpitaux : KPIs DAX reliés à des seuils d'alerte, scénario what-if et gouvernance documentée.",
        metrics: [
          { value: "55 500", label: "admissions" },
          { value: "10", label: "hôpitaux" },
          { value: "25,6 M$", label: "d'économies (what-if)" },
        ],
      },
    },
    media: {
      "wikipedia-pulse": {
        architecture:
          "Deux sources alimentent le pipeline : le flux SSE temps réel de Wikimedia (indicateur avancé) et l'API Wikimedia en batch (indicateur retardé, J+1). Kafka encaisse le flux ; un DAG Airflow de 6 tâches orchestre le tout. Spark calcule les usages bruts et un modèle Isolation Forest détecte les anomalies — les résultats sont indexés dans Elasticsearch puis visualisés dans Kibana.",
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
  },
  certifications: {
    title: "Certifications",
  },
  languages: {
    title: "Langues",
    items: [
      { label: "Français", value: "Langue maternelle" },
      { label: "Anglais", value: "B2 — professionnel" },
    ],
  },
  contact: {
    title: "Contact",
    body: "Je recherche un stage en Data Engineering à partir de janvier 2027. Le plus simple est de m'écrire par email — je réponds sous un à deux jours.",
    cta: "Envoyer un email",
  },
  story: {
    back: "Retour",
    title: "J'ai longtemps cru que je n'avais aucun talent.",
    lead: "En fait, je n'avais simplement pas encore trouvé mon médium.",
    chapters: [
      {
        title: "L'art que je ne savais pas faire",
        body: [
          "Enfant, je regardais les autres peindre, chanter, danser, avec l'impression de rester à la porte d'une pièce qui m'était interdite. Mes doigts étaient trop habitués aux équations, ma voix trop ordinaire.",
          "Je me suis dit que l'art n'était pas pour moi. Je me trompais sur ce qu'était l'art.",
        ],
        caption: "Louvre, Paris",
      },
      {
        title: "Le jour où les équations ont pris vie",
        body: [
          "Puis j'ai découvert le code, et quelque chose s'est déclenché. Je pouvais donner corps aux équations, représenter le monde réel dans une machine, rendre la logique sensible.",
          "Pour la première fois, j'ai compris : c'était mon médium.",
        ],
        caption: "Paris",
      },
      {
        title: "Les deux faces d'une même pièce",
        body: [
          "Je crois que les meilleurs ingénieurs savent aussi raconter : une idée qu'on ne sait pas transmettre n'existe pas.",
          "Alors quand j'ai remporté le concours d'éloquence de l'ISEP, j'ai eu l'impression que les deux faces s'emboîtaient enfin.",
        ],
        caption: "Concours d'éloquence — ISEP",
      },
    ],
    offClock: {
      title: "En dehors du travail",
      items: [
        { title: "Lecture", desc: "Histoire, philosophie, romans — plus c'est ancien, mieux c'est." },
        { title: "Échecs", desc: "Le goût des systèmes et de la stratégie. Chaque partie est un problème à résoudre." },
        { title: "Course à pied", desc: "Le seul moment où j'arrête de penser au code. Presque." },
      ],
    },
  },
};

export default fr;
