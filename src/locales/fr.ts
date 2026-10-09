const fr = {
  meta: {
    homeTitle: "Soro Amidou · Data Engineer",
    homeDescription:
      "Étudiant ingénieur à l'ISEP Paris, certifié AWS et Databricks. Pipelines temps réel (Kafka, Spark, Airflow), entrepôts BigQuery et BI. Recherche un stage en Data Engineering dès janvier 2027.",
    projectsTitle: "Projets · Soro Amidou",
    projectsDescription: "Pipelines temps réel, entrepôts BigQuery, BI et machine learning : les projets data de Soro Amidou, avec architecture, chiffres et code.",
    aboutTitle: "À propos · Soro Amidou",
    aboutDescription: "L'histoire complète : des équations au Data Engineering, par Soro Amidou.",
    contactTitle: "Contact · Soro Amidou",
    contactDescription: "Écrire à Soro Amidou au sujet d'un stage en Data Engineering à partir de janvier 2027.",
  },
  cards: {
    pauseMotion: "Mettre le défilement en pause",
    about: { subtitle: "Des équations aux pipelines." },
    projects: { subtitle: "Pipelines, entrepôts, BI et ML, chacun expliqué par son schéma.", viewAll: "Voir tous les projets" },
    journey: { title: "Parcours", subtitle: "Où j'ai travaillé et étudié" },
    credentials: { title: "Certifications & langues", subtitle: "Compétences vérifiées et langues de travail" },
    services: {
      title: "Services",
      subtitle: "Là où je peux aider une équipe data.",
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
    main: "Principale",
    language: "Langue",
    menu: "Menu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  notFound: {
    metaTitle: "Page introuvable · Soro Amidou",
    title: "Page introuvable",
    body: "Cette adresse ne mène nulle part. Le lien est peut-être ancien, ou il manque une lettre.",
    projects: "Voir les projets",
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
        role: "Développeur full-stack, projet d'équipe",
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
        role: "Diplôme d'ingénieur, Architecture des systèmes d'information",
        bullets: [
          "Spécialisation bases de données, Big Data et systèmes d'entreprise.",
          "Tronc commun réseaux, architecture des systèmes et sécurité cloud.",
        ],
      },
      estm: {
        role: "Classes préparatoires MPSI/MP : mathématiques, physique, sciences de l'ingénieur",
        bullets: [],
      },
    },
  },
  education: {
    title: "Formation",
  },
  skills: {
    title: "Boîte à outils",
    subtitle: "Ma boîte à outils",
    hint: "› survolez un outil",
    hintTouch: "› touchez un outil pour voir où je l'utilise",
    count: "outils",
    certification: "Certification",
  },
  projects: {
    title: "Projets",
    page: {
      title: "Mes projets",
      subtitle: "Pipelines, entrepôts, BI et ML, chacun expliqué par son schéma. Filtre par techno, ouvre une étude de cas ou lis le code.",
      back: "Retour à l'accueil",
      filter: "Technologies",
      shown: { one: "projet affiché", other: "projets affichés" },
      reset: "Réinitialiser",
      empty: "Aucun projet ne combine toutes ces technologies. Retire un filtre ou réinitialise.",
      featured: "Phare",
      code: "Code",
      codePrivate: "Code non public",
    },
    caseStudy: "Étude de cas",
    close: "Fermer",
    watchDemo: "Vidéo de démo",
    readDoc: "Documentation technique (PDF)",
    sectionDecisions: "Choix clés",
    flowLabel: "Pipeline",
    viewCode: "Voir le code",
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
      fraud: {
        title: "Flux de Fraudster Detection",
        desc: "Les utilisateurs et leurs transactions deviennent une ligne de variables par utilisateur, un Gradient Boosting calibré les note, et un seuil fondé sur les coûts transforme la note en alerte. SHAP explique chaque note.",
        data: "Données",
        dataSub: "688 k transactions",
        features: "Variables",
        featuresSub: "une ligne par utilisateur",
        model: "Gradient Boosting",
        modelSub: "calibré",
        alert: "Alerte",
        alertSub: "seuil fondé sur les coûts",
        shap: "SHAP",
        shapSub: "pourquoi cette note",
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
          "Des millions de transactions brutes transformées en entrepôt BigQuery fiable, avec un contrôle qualité à chaque étape, puis prévision des ventes à 30 jours et segmentation client.",
        metrics: [
          { value: "30 j", label: "horizon de prévision" },
          { value: "2", label: "modèles BigQuery ML" },
          { value: "100 %", label: "des étapes contrôlées" },
        ],
      },
      "fraud-detection": {
        status: "2026",
        summary:
          "Repérer les mules financières parmi les clients d'une banque en ligne à partir de leur profil et de leurs transactions : un modèle Gradient Boosting qui attrape 9 fraudeurs sur 10, et explique pourquoi.",
        metrics: [
          { value: "53 / 59", label: "fraudeurs détectés (test)" },
          { value: "0,86", label: "PR-AUC (hasard : 0,03)" },
          { value: "688 k", label: "transactions" },
        ],
      },
      "healthcare-bi": {
        status: "2026",
        summary:
          "Un entrepôt en étoile sous Power BI pour piloter 10 hôpitaux : KPIs DAX reliés à des seuils d'alerte, scénario what-if et gouvernance documentée.",
        metrics: [
          { value: "55 500", label: "admissions" },
          { value: "10", label: "hôpitaux" },
          { value: "25,6 M$", label: "d'économies (what‑if)" },
        ],
      },
    },
    media: {
      "retail-pipeline": {
        architecture:
          "Un seul DAG Airflow pilote tout, du fichier brut Online Retail II (environ 500 000 transactions e-commerce britanniques, 2009–2011) jusqu'aux dashboards. Le CSV arrive dans Cloud Storage puis dans BigQuery ; dbt le réorganise en schéma en étoile (dimensions client, date et produit autour d'une table de faits des factures), puis en tables de reporting. Soda contrôle les données après chacune des trois couches : une ligne fausse reste bloquée là où elle apparaît au lieu d'atteindre un dashboard. Deux modèles dbt alimentent BigQuery ML : le chiffre d'affaires quotidien pour une prévision à 30 jours, et des scores RFM pour segmenter les clients.",
        flow: [
          { label: "CSV brut", detail: "~500 000 transactions" },
          { label: "Cloud Storage", detail: "zone brute" },
          { label: "BigQuery", detail: "chargement · contrôle Soda" },
          { label: "Étoile dbt", detail: "3 dimensions + faits · contrôle Soda" },
          { label: "Rapports dbt", detail: "pays, produit, année · contrôle Soda" },
          { label: "BigQuery ML", detail: "prévision 30 j · RFM" },
          { label: "Metabase", detail: "dashboards" },
        ],
        decisions: [
          "Un contrôle qualité après chaque couche : Soda passe après le chargement, la transformation et les rapports, et un contrôle en échec arrête le DAG à cette couche.",
          "dbt et Soda tournent dans leurs propres virtualenvs dans l'image Airflow : leurs dépendances n'entrent jamais en conflit avec celles d'Airflow.",
          "Migration d'Astro CLI vers Airflow 2.7 standard (LocalExecutor, Docker Compose) : la stack démarre en une commande, sans outil propriétaire.",
          "CI à chaque pull request : dbt compile vérifie le SQL sans accès au cloud ; dbt test tourne sur BigQuery depuis main.",
        ],
      },
      "fraud-detection": {
        architecture:
          "Un cas pratique StrataScratch sur une banque en ligne : 9 944 utilisateurs (3 % de fraudeurs) et 688 651 transactions. Le notebook construit une ligne par utilisateur (répartition des transactions, montants, rythme, géographie, vitesse à laquelle l'argent ressort après un rechargement), compare Régression logistique, Random Forest et Gradient Boosting en validation croisée à 5 plis sur la PR-AUC, puis calibre le gagnant et fixe son seuil d'alerte d'après le coût d'un fraudeur raté face à une fausse alerte. Le calcul des variables et l'évaluation vivent dans un package Python testé.",
        flow: [
          { label: "Users + transactions", detail: "9 944 utilisateurs · 688 k lignes" },
          { label: "Contrôles", detail: "colonne STATE (fuite) écartée" },
          { label: "Variables", detail: "une ligne par utilisateur · séquences" },
          { label: "Choix du modèle", detail: "3 modèles · CV 5 plis · PR-AUC" },
          { label: "Gradient Boosting", detail: "calibré · seuil par les coûts" },
          { label: "SHAP · dérive", detail: "explications · suivi PSI" },
        ],
        decisions: [
          "Colonne STATE écartée : un compte bloqué donne la réponse, un modèle qui l'utilise paraîtrait parfait et ne servirait à rien.",
          "PR-AUC plutôt qu'accuracy : avec 3 % de fraudeurs, un modèle qui ne signale personne a déjà 97 % d'accuracy.",
          "Le jeu de test ne choisit rien : seuils et modèles sont fixés sur la validation, le test sert seulement à rapporter.",
          "Des estimations honnêtes à côté du chiffre phare : PR-AUC 0,76 en entraînant sur les comptes anciens et en testant sur les récents, 0,68 en décidant après 30 jours d'activité seulement.",
        ],
        shots: {
          test: "Jeu de test : matrice de confusion et courbe précision-rappel",
          mix: "Répartition des transactions : fraudeurs vs autres utilisateurs",
          shap: "SHAP : ce qui pousse un utilisateur vers « fraudeur »",
        },
      },
      "healthcare-bi": {
        architecture:
          "55 500 admissions hospitalières sur 10 sites américains, modélisées en étoile sous Power BI. Quatre KPIs DAX avancés portent chacun un seuil de déclenchement et la persona qui agit : le rapport dit qui doit bouger, pas seulement ce qui a changé. Un scénario what‑if paramétrique chiffre l'enjeu : 25,6 M$ d'économies potentielles.",
        flow: [
          { label: "Sources", detail: "55 500 admissions · 10 sites" },
          { label: "Power Query · DuckDB", detail: "préparation" },
          { label: "Schéma en étoile", detail: "modèle Power BI" },
          { label: "KPIs DAX", detail: "4 KPIs · seuils d'alerte" },
          { label: "What-if", detail: "25,6 M$ d'économies potentielles" },
          { label: "Rapport Power BI", detail: "un responsable par KPI" },
        ],
        decisions: [
          "Chaque KPI est relié à un seuil et à un décideur : un chiffre sans responsable ni déclencheur n'entre pas dans le rapport.",
          "Un paramètre what-if plutôt qu'une estimation figée : le chiffre d'économies suit les hypothèses.",
          "Gouvernance documentée de bout en bout : inventaire des sources, définitions des métriques, fraîcheur, contrôle d'accès, metadata snapshot, limites et déclaration éthique.",
        ],
      },
      "wikipedia-pulse": {
        architecture:
          "Deux sources alimentent le pipeline : le flux SSE temps réel de Wikimedia (indicateur avancé) et l'API Wikimedia en batch (indicateur retardé, J+1). Kafka encaisse le flux ; un DAG Airflow de 6 tâches orchestre le tout. Spark calcule les usages bruts et un modèle Isolation Forest détecte les anomalies. Les résultats sont indexés dans Elasticsearch puis visualisés dans Kibana.",
        shots: {
          metric: "KPIs en temps réel sur le flux d'éditions",
          trending1: "Articles tendance : détection des pics",
          trending2: "Tendances par thématique",
          scoop: "Détection de scoops : rafales d'éditions précoces",
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
      { label: "Anglais", value: "B2, usage professionnel" },
    ],
  },
  contact: {
    title: "Contact",
    body: "Je cherche un stage en Data Engineering à partir de janvier 2027. Laissez un message et je vous réponds promptement.",
    cta: "Envoyer un email",
    copy: "Copier",
    copied: "Copié",
    copyFailed: "Copie impossible",
    write: "Écrire un message",
    form: {
      title: "Écrire un message",
      lead: "Pour un stage, un projet ou une question : il arrive dans ma boîte mail, et je réponds depuis ma propre adresse.",
      name: "Nom",
      email: "Email",
      emailHint: "Pour que je puisse vous répondre.",
      message: "Message",
      send: "Envoyer",
      sending: "Envoi…",
      errors: {
        name: "Indiquez votre nom (100 caractères au plus).",
        email: "Indiquez une adresse email valide.",
        message: "Écrivez au moins 10 caractères (5 000 au plus).",
        token: "Validez la vérification anti-robot au-dessus du bouton.",
        captcha: "La vérification anti-robot a échoué. Réessayez-la.",
        unavailable: "Le message n'a pas pu être envoyé pour le moment.",
        network: "Le message n'a pas pu être envoyé : vérifiez votre connexion.",
        fallback: "Vous pouvez aussi m'écrire directement :",
        checkUnavailable: "La vérification anti-robot n'a pas pu se charger (bloqueur ou pas de connexion).",
      },
      sentTitle: "Message envoyé",
      sentBody: "Merci. Je réponds à l'adresse indiquée, en général sous deux jours.",
      another: "Envoyer un autre message",
      privacy: "Votre message est conservé 90 jours, puis supprimé. Il ne sert qu'à vous répondre.",
    },
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
        caption: "Concours d'éloquence, ISEP",
      },
    ],
    offClock: {
      title: "En dehors du travail",
      items: [
        { title: "Lecture", desc: "Histoire, philosophie, romans : plus c'est ancien, mieux c'est." },
        { title: "Échecs", desc: "Le goût des systèmes et de la stratégie. Chaque partie est un problème à résoudre." },
        { title: "Course à pied", desc: "Le seul moment où j'arrête de penser au code. Presque." },
      ],
    },
  },
};

export default fr;
