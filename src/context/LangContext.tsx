import { createContext, useContext, useState } from "react";

type Lang = "en" | "fr";

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      explore: "Explore",
      dark: "Dark",
      light: "Light",
    },
    hero: {
      greeting: "Hi, I'm Soro Amidou",
      bio: "I specialize in building full-stack applications and deploying scalable cloud systems. I love turning ideas into scalable reality. My focus is on building robust architecture and delivering software that solves real problems.",
      seeWork: "See My Work",
      contact: "Contact Me",
    },
    services: {
      label: "What I Do",
      title: "Services",
      cards: [
        {
          title: "Problem-First Engineering",
          description:
            "I don't code for the sake of coding. I start with the problem, understand the need, then build the simplest solution that actually works.",
        },
        {
          title: "Robust System Design",
          description:
            "I design systems that are clean, structured, and built to last. From database schema to API architecture, I think about maintainability from day one.",
        },
        {
          title: "Cloud Infrastructure & DevOps",
          description:
            "I implement robust cloud foundations on AWS and GCP. By automating deployments and optimizing pipelines, I reduce technical debt and risk while increasing efficiency.",
        },
      ],
    },
    career: {
      soFar: "So Far",
      title: "Career",
      hearMe: "Hear me talk about it",
      needCopy: "Need a copy?",
      resume: "Resume",
      techTools: "Technologies & Tools",
      bullets: {
        isep: [
          "Studying core engineering disciplines including networks, systems architecture, and cloud security.",
          "Specializing in Information Systems Architecture with focus on database design, Big Data, and enterprise systems.",
          "Hands-on projects in system development, telecom, and digital transformation.",
          "Building a solid foundation in applied mathematics, algorithms, and software engineering best practices.",
        ],
        estm: [
          "Completed a rigorous 3-year preparatory program in Mathematics, Physics, and Engineering Sciences.",
          "Developed strong analytical and problem-solving foundations through intensive coursework.",
          "Prepared for competitive engineering school entrance examinations.",
        ],
        artci: [
          "Designed and developed a platform for managing electronic signature images.",
          "Configured and controlled data related to equipment inventory and users.",
          "Stack: Laravel, React.js, JSX, MySQL, CSS3.",
        ],
        bozarts: [
          "Built an artisan marketplace with user profiles, product listings, shopping cart, and real-time messaging.",
          "Developed in PHP, MySQL, HTML, CSS and JavaScript with a normalized database.",
          "Managed user access control and full database administration.",
        ],
      },
    },
    projects: {
      featured: "Featured",
      title: "Projects",
      techStack: "Tech Stack",
      showAll: "Show All Projects",
      items: [
        {
          description:
            "AI-powered price & stock alert platform. Set a target price or request a restock notification — Kairos monitors it and alerts you instantly.",
          status: "In Development",
        },
        {
          description:
            "Full-stack artisan marketplace with user profiles, product listings, shopping cart, and real-time messaging. Built as a team project at ISEP Paris.",
          status: "Academic Project",
        },
      ],
    },
    footer: {
      built: "© 2026 — Built with React & TypeScript",
      cta: "Let's work together",
      available: "Available for new opportunities",
      headline: "Let's build something great",
      sendMessage: "Get in touch",
    },
    about: {
      title: "About",
      tagline: "Full-stack engineering student with a systems-first mindset.",
      background: "Background",
      bio1: "Comfortable across the stack — from REST API design to cloud infrastructure and data pipelines. I've built and shipped real products, not just side projects. Looking for an apprenticeship where breadth is an asset.",
      bio2: "I care about clean architecture, systems that scale, and software that actually solves something. I move fast, think in systems, and don't stop at the first working version.",
      education: "Education",
      educationItems: [
        "Engineering Degree – Information Systems Architecture — ISEP Paris (2024 – 2027)",
        "Preparatory Classes MPSI/MP — ESTM, Casablanca (2021 – 2024)",
      ],
      skills: "Technical Skills",
      skillItems: [
        { label: "Full Stack", value: "React.js, Next.js, Tailwind CSS, TypeScript, Node.js, Express, NestJS, REST API" },
        { label: "Data & Cloud", value: "AWS, Azure, PostgreSQL, MongoDB, Cassandra, Apache Spark, Power BI" },
        { label: "Tools & Languages", value: "Python, SQL, Java, Git, Docker, Linux, Figma" },
      ],
      certifications: "Certifications",
      certificationItems: [
        "AWS Solutions Architect Associate",
        "Scrimba Full Stack Developer",
      ],
      languages: "Languages",
      languageItems: [
        { label: "French", value: "Native" },
        { label: "English", value: "B2 – Professional" },
      ],
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      explore: "Explorer",
      dark: "Sombre",
      light: "Clair",
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
      soFar: "Jusqu'ici",
      title: "Parcours",
      hearMe: "Écoutez-moi en parler",
      needCopy: "Besoin d'une copie ?",
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
      items: [
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
        { label: "Full Stack", value: "React.js, Next.js, Tailwind CSS, TypeScript, Node.js, Express, NestJS, REST API" },
        { label: "Data & Cloud", value: "AWS, Azure, PostgreSQL, MongoDB, Cassandra, Apache Spark, Power BI" },
        { label: "Outils & Langages", value: "Python, SQL, Java, Git, Docker, Linux, Figma" },
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
  },
};

type Translations = typeof translations.en;

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dark: boolean;
  toggleDark: () => void;
}>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  dark: false,
  toggleDark: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark((d) => {
      document.body.classList.toggle("dark", !d);
      return !d;
    });
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], dark, toggleDark }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
