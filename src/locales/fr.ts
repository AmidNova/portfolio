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
    about: { subtitle: "Des équations aux pipelines." },
    projects: { subtitle: "Du flux temps réel au tableau de bord.", viewAll: "Voir tous les projets" },
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
      "Dans mes projets, chaque étape vérifie ses données avant de les écrire, l'orchestration se lit dans un seul DAG et toute la stack se relance en une commande.",
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
      subtitle: "Quatre projets data, du flux temps réel au tableau de bord. Chacun a sa page : contexte, architecture, choix techniques et limites.",
      back: "Retour à l'accueil",
      featured: "Phare",
      code: "Code",
      codePrivate: "Code non public",
    },
    caseStudy: "Voir le projet",
    close: "Fermer",
    allProjects: "Tous les projets",
    nextProject: "Projet suivant",
    readDoc: "Documentation technique (PDF)",
    watchDemo: "Vidéo de démo",
    sectionDecisions: "Choix techniques",
    sectionLimits: "Limites",
    flowLabel: "Pipeline",
    viewCode: "Voir le code",
    sectionArchitecture: "Architecture",
    sectionResults: "Résultats",
    techDoc: "Ressources",
    enlarge: "Agrandir l'image",
    previous: "Image précédente",
    next: "Image suivante",
    context: {
      label: "Contexte du projet",
      type: "Cadre",
      period: "Période",
      data: "Données",
    },
    diagram: {
      title: "Architecture de Wikipedia Pulse",
      desc: "Un producer pousse le flux d'éditions Wikimedia dans Kafka. Chaque jour, un DAG Airflow 3 vide le topic, récupère les pages vues et les identifiants Wikidata, calcule l'émergence et le lead-lag avec PySpark, puis indexe les résultats dans Elasticsearch pour Kibana.",
      sse: "éditions en continu",
      api: "vues · Wikidata",
      kafka: "tampon",
      airflow: "DAG · 12 tâches",
      spark: "émergence · lead-lag",
      es: "index",
      kibana: "dashboard as code",
    },
    visuals: {
      retail: {
        title: "Flux du Retail Data Pipeline",
        desc: "Les transactions brutes arrivent dans Cloud Storage, sont chargées dans un entrepôt BigQuery, puis préparées pour les prévisions et segments BigQuery ML. Un contrôle qualité Soda garde chaque passage.",
        raw: "données brutes",
        landing: "zone brute",
        warehouse: "entrepôt",
        ml: "modèles",
        forecast: "Prévision",
        forecastSub: "ventes à 30 jours",
        segments: "Segments",
        segmentsSub: "clients RFM",
        checks: "contrôle qualité bloquant",
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
        desc: "Une table de faits des admissions reliée aux dimensions hôpital, patient, date et diagnostic.",
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
        summary:
          "Sur Wikipédia, les éditeurs réagissent à un événement des heures avant les lecteurs. Ce pipeline mesure cet écart chaque jour sur 5 langues et repère les articles qui sortent de leur comportement habituel.",
        metrics: [
          { value: "212 788", label: "éditions captées en 5 jours" },
          { value: "241", label: "articles émergents" },
          { value: "13 min", label: "par run quotidien" },
        ],
        context: {
          type: "Projet personnel · seul",
          period: "Mai – oct. 2026",
          data: "Wikimedia : flux d'éditions, pages vues, Wikidata (public)",
        },
        limits: [
          "Cinq jours de données seulement : l'historique de 28 jours par article n'est pas encore rempli, beaucoup de médianes valent 0 et la détection reste large.",
          "La stack tourne en local avec Docker Compose ; elle n'est pas déployée dans le cloud.",
          "Sur un article isolé, la corrélation horaire est bruitée : le lead-lag se lit en distribution, pas article par article.",
        ],
      },
      "retail-pipeline": {
        summary:
          "Un pipeline ELT sur GCP qui transforme 500 000 transactions e-commerce brutes en entrepôt BigQuery en étoile, avec un contrôle qualité bloquant après chaque couche.",
        metrics: [
          { value: "≈ 500 k", label: "transactions chargées" },
          { value: "9", label: "modèles dbt" },
          { value: "8", label: "suites de contrôles Soda" },
        ],
        context: {
          type: "Projet personnel · seul",
          period: "2026",
          data: "Online Retail II (UCI), jeu public",
        },
        limits: [
          "Jeu de données historique et figé (2009–2011) : le DAG recharge le fichier complet, sans chargement incrémental.",
          "dbt test ne tourne que sur main, faute de secrets GCP sur les pull requests : une régression de données n'est détectée qu'après la fusion.",
        ],
      },
      "fraud-detection": {
        summary:
          "Repérer les mules financières parmi les clients d'une banque en ligne à partir de leur profil et de leurs transactions. Le modèle retenu détecte 53 des 59 fraudeurs du jeu de test, et SHAP explique chaque alerte.",
        metrics: [
          { value: "53 / 59", label: "fraudeurs détectés (test)" },
          { value: "0,86", label: "PR-AUC (hasard : 0,03)" },
          { value: "688 k", label: "transactions" },
        ],
        context: {
          type: "Exercice take-home StrataScratch · seul",
          period: "Oct. 2026",
          data: "Banque en ligne, fourni par StrataScratch (non public)",
        },
        limits: [
          "Seulement 298 fraudeurs, une soixantaine par jeu d'évaluation : les scores ont une incertitude d'environ ± 0,05.",
          "Estimations plus réalistes que le chiffre phare : PR-AUC 0,76 en testant sur les comptes récents, 0,68 en décidant après 30 jours d'activité.",
          "Les étiquettes ne couvrent que les fraudeurs déjà repérés : le modèle apprend en partie les anciennes règles de détection.",
          "Le ratio de coûts qui fixe le seuil est une hypothèse, pas un chiffre métier.",
        ],
      },
      "healthcare-bi": {
        summary:
          "Un rapport Power BI sur 55 500 admissions hospitalières : modèle en étoile et quatre KPIs DAX, chacun relié à un seuil d'alerte et à la personne qui doit agir.",
        metrics: [
          { value: "55 500", label: "admissions (synthétiques)" },
          { value: "4", label: "KPIs avec seuil d'alerte" },
          { value: "10", label: "hôpitaux comparés" },
        ],
        context: {
          type: "Projet de cours ISEP · en équipe",
          period: "2025 – 2026",
          data: "Jeu synthétique fourni par le cours",
        },
        limits: [
          "Les données sont synthétiques : les tendances de coûts ou de durées ne disent rien de vrais hôpitaux. Le travail porte sur la modélisation, les KPIs et la gouvernance.",
          "Les 25,6 M$ d'économies du scénario what-if dépendent entièrement des hypothèses choisies : un ordre de grandeur pour discuter, pas une prévision.",
        ],
      },
    },
    media: {
      "retail-pipeline": {
        architecture:
          "Un seul DAG Airflow pilote tout, du fichier brut Online Retail II (environ 500 000 transactions e-commerce britanniques, 2009–2011) jusqu'aux dashboards Metabase. Le CSV arrive dans Cloud Storage puis dans BigQuery. dbt le réorganise en schéma en étoile (dimensions client, date et produit autour d'une table de faits des factures), puis en tables de reporting. Soda contrôle les données après chacune des trois couches. Deux modèles dbt préparent les données de BigQuery ML : le chiffre d'affaires quotidien pour une prévision à 30 jours, et des scores RFM pour segmenter les clients.",
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
          "Soda passe après le chargement, la transformation et les rapports. Un contrôle en échec arrête le DAG : une ligne fausse reste bloquée dans la couche où elle apparaît.",
          "dbt et Soda tournent dans leurs propres virtualenvs dans l'image Airflow, pour que leurs dépendances n'entrent jamais en conflit avec celles d'Airflow.",
          "Migration d'Astro CLI vers Airflow 2.7 standard (LocalExecutor, Docker Compose) : la stack démarre en une commande, sans outil propriétaire.",
          "CI à chaque pull request : dbt compile vérifie le SQL sans accès au cloud.",
        ],
      },
      "fraud-detection": {
        architecture:
          "9 944 utilisateurs, dont 3 % de fraudeurs, et 688 651 transactions. Le notebook construit une ligne par utilisateur (répartition des transactions, montants, rythme, géographie, vitesse à laquelle l'argent ressort après un rechargement), compare Régression logistique, Random Forest et Gradient Boosting en validation croisée à 5 plis sur la PR-AUC, puis calibre le gagnant et fixe son seuil d'alerte d'après le coût d'un fraudeur raté face à une fausse alerte. Le calcul des variables et l'évaluation vivent dans un package Python testé par la CI.",
        flow: [
          { label: "Users + transactions", detail: "9 944 utilisateurs · 688 k lignes" },
          { label: "Contrôles", detail: "colonne STATE (fuite) écartée" },
          { label: "Variables", detail: "une ligne par utilisateur · séquences" },
          { label: "Choix du modèle", detail: "3 modèles · CV 5 plis · PR-AUC" },
          { label: "Gradient Boosting", detail: "calibré · seuil par les coûts" },
          { label: "SHAP · dérive", detail: "explications · suivi PSI" },
        ],
        decisions: [
          "Colonne STATE écartée : un compte bloqué donne la réponse. Un modèle qui l'utilise paraîtrait parfait et ne servirait à rien.",
          "PR-AUC plutôt qu'accuracy : avec 3 % de fraudeurs, un modèle qui ne signale personne a déjà 97 % d'accuracy.",
          "Le jeu de test ne sert qu'à rapporter les résultats. Seuils et modèles sont fixés sur la validation.",
        ],
        shots: {
          test: "Jeu de test : matrice de confusion et courbe précision-rappel",
          mix: "Répartition des transactions : fraudeurs vs autres utilisateurs",
          shap: "SHAP : ce qui pousse un utilisateur vers « fraudeur »",
        },
      },
      "healthcare-bi": {
        architecture:
          "Le brief : un organisme de supervision veut comprendre les admissions, les durées de séjour et les coûts de 10 hôpitaux américains. Les données sont préparées dans Power Query et DuckDB, puis modélisées en étoile sous Power BI (faits des admissions, dimensions hôpital, patient, date et diagnostic). Quatre KPIs DAX portent chacun un seuil de déclenchement et la persona qui agit. Un paramètre what-if chiffre l'effet d'une baisse des coûts.",
        flow: [
          { label: "Sources", detail: "55 500 admissions · 10 sites" },
          { label: "Power Query · DuckDB", detail: "préparation" },
          { label: "Schéma en étoile", detail: "modèle Power BI" },
          { label: "KPIs DAX", detail: "4 KPIs · seuils d'alerte" },
          { label: "What-if", detail: "scénario paramétrable" },
          { label: "Rapport Power BI", detail: "un responsable par KPI" },
        ],
        decisions: [
          "Chaque KPI a un seuil et un responsable. Un chiffre sans personne pour agir dessus n'entre pas dans le rapport.",
          "Un paramètre what-if plutôt qu'une estimation figée : le chiffre d'économies suit les hypothèses.",
          "Gouvernance documentée : inventaire des sources, définitions des métriques, fraîcheur, contrôle d'accès, limites et déclaration éthique.",
        ],
        shots: {
          overview: "Vue d'ensemble : admissions, facturation, durée de séjour et indicateurs YoY / YTD",
          demographics: "Démographie des patients : âge, genre et groupe sanguin",
          conditions: "Conditions médicales : volume, durée, coût et résultats par pathologie",
          stay: "Durée de séjour selon la pathologie, l'hôpital et le type d'admission",
          finance: "Coûts par pathologie, hôpital et assureur",
          outcomes: "Hôpitaux : volume de patients et résultats des tests",
        },
      },
      "wikipedia-pulse": {
        architecture:
          "Un producer écoute en continu le flux SSE des modifications Wikimedia et pousse chaque édition dans Kafka. Une fois par jour, un DAG Airflow 3 de 12 tâches vide le topic, récupère les pages vues (API et dumps horaires) et les identifiants Wikidata, puis fait passer le tout par trois couches de datalake : raw, formatted (Parquet, UTC) et usage (PySpark). Les tables finales sont indexées dans Elasticsearch ; le dashboard Kibana est généré par un script versionné. Premier résultat : quand les éditions mènent (23 % des 4 347 articles mesurables), les lectures suivent avec 12 h de retard en médiane.",
        decisions: [
          "Chaque article est comparé à son propre historique sur 28 jours (médiane et MAD), pas aux autres articles du jour. Il est émergent avec un z-score robuste ≥ 3,5 et au moins 3 éditeurs distincts : le nombre d'émergents suit l'actualité au lieu d'être un quota.",
          "Les langues sont regroupées par entité Wikidata, pas par titre : « Tour Eiffel » et « Eiffel Tower » sont le même sujet, et deux homonymes ne sont pas confondus.",
          "Chaque tâche vérifie sa sortie et échoue avant d'écrire si les données sont manifestement fausses : moins de 1 000 éditions, jointure des vues cassée, plus de 5 % d'émergents.",
          "La logique métier vit hors du DAG, dans des modules testés unitairement ; la CI relance ces tests et l'intégrité du DAG à chaque push.",
        ],
        shots: {
          dashboard: "Dashboard Kibana sur 5 jours de données réelles (3–7 oct. 2026)",
          dag: "Run du 7 octobre dans Airflow 3 : 12 tâches, 13 min 33 s",
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
