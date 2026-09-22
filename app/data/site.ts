export const siteMeta = {
  name: 'Kossi Stéphane Kuma',
  title: 'Architecte Solution',
  company: 'Agence Togo Digital',
  location: 'Lomé, Togo',
  url: 'https://stephane.dev',
  email: 'kumastephane@gmail.com',
  phone: '+228 93 41 36 39'
}

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/StephaneKuma' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/stephane-kossi-kuma' },
  { label: 'Email', href: `mailto:${siteMeta.email}` }
]

// Company/technology names are proper nouns and stay identical in both locales.
export const clients = ['Agence Togo Digital', 'RTK Agency', 'Kutiwa', 'Kimoasoft', 'Zoé Tech Group']
export const coreSkills = ['Laravel', 'Vue.js / Nuxt.js', 'Flutter', 'NestJS']
export const secondarySkills = [
  'Symfony', 'Next.js', 'Inertia.js', 'Angular', 'Kotlin', 'Django',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'CI/CD'
]

export type Locale = 'fr' | 'en'

export interface HeroStat {
  value: string
  label: string
}

export interface HomeSkillGroup {
  title: string
  items: string
  highlight: boolean
}

export interface Testimonial {
  quote: string
  author: string
}

export interface Service {
  index: string
  title: string
  description: string
  tags: string[]
}

export interface ProcessStep {
  index: string
  title: string
  description: string
}

export interface CareerEntry {
  period: string
  title: string
  description: string
  current?: boolean
}

export interface EducationEntry {
  title: string
  place: string
}

export interface LanguageEntry {
  flag: string
  label: string
}

export interface NowUpdate {
  label: string
  text: string
  icon: string
}

export interface LocalizedSiteContent {
  heroStats: HeroStat[]
  homeSkillGroups: HomeSkillGroup[]
  testimonials: Testimonial[]
  services: Service[]
  processSteps: ProcessStep[]
  careerHistory: CareerEntry[]
  education: EducationEntry[]
  languages: LanguageEntry[]
  nowUpdates: NowUpdate[]
}

const fr: LocalizedSiteContent = {
  heroStats: [
    { value: '6+', label: "ans d'expérience" },
    { value: '8', label: 'postes occupés' },
    { value: '3', label: 'pays (Togo, Sénégal, remote)' },
    { value: '10+', label: 'technologies maîtrisées' }
  ],

  homeSkillGroups: [
    { title: 'expertise backend', items: 'Laravel, NestJS', highlight: true },
    { title: 'expertise frontend', items: 'Vue.js, Nuxt.js', highlight: true },
    { title: 'annexes', items: 'Symfony, Django, Angular, Next.js', highlight: false },
    { title: 'mobile & outils', items: 'Flutter, Kotlin, Docker', highlight: false }
  ],

  testimonials: [
    {
      quote: "« Livraison rapide et code propre. Stéphane a su cadrer un besoin flou en solution technique claire. »",
      author: '— Client, mission freelance'
    },
    {
      quote: "« Une vraie force de proposition sur l'architecture, au-delà du simple développement. »",
      author: '— Ancien collègue, Kimoasoft'
    },
    {
      quote: '« Communication fluide et respect des délais du début à la fin du projet. »',
      author: '— Client, projet mobile Flutter'
    }
  ],

  services: [
    {
      index: '01',
      title: 'Développement backend',
      description: "Conception et développement d'API RESTful robustes et sécurisées.",
      tags: ['Laravel', 'NestJS', 'Symfony']
    },
    {
      index: '02',
      title: 'Développement frontend',
      description: 'Interfaces web modernes, rapides et maintenables.',
      tags: ['Vue.js', 'Nuxt.js', 'Next.js']
    },
    {
      index: '03',
      title: 'Applications mobiles',
      description: 'Apps mobiles cross-platform performantes, du prototype à la mise en production.',
      tags: ['Flutter', 'Kotlin']
    },
    {
      index: '04',
      title: 'Architecture & audit technique',
      description: "Revue d'architecture, choix technologiques et mise en place de bonnes pratiques.",
      tags: ['Clean Architecture', 'DDD']
    }
  ],

  processSteps: [
    {
      index: '01 — cadrage',
      title: 'Comprendre le besoin',
      description: "Échange initial pour clarifier l'objectif, les contraintes et le périmètre réel du projet."
    },
    {
      index: '02 — architecture & devis',
      title: 'Proposer une solution',
      description: 'Choix technologiques justifiés, découpage en lots, estimation de délais et de coûts.'
    },
    {
      index: '03 — développement itératif',
      title: 'Construire par étapes',
      description: "Livraisons régulières et points d'avancement, pour ajuster le cap si besoin plutôt qu'à la fin."
    },
    {
      index: '04 — tests & recette',
      title: 'Vérifier avant de livrer',
      description: 'Tests fonctionnels et techniques, puis validation avec vous avant mise en production.'
    },
    {
      index: '05 — livraison & support',
      title: 'Rester disponible après coup',
      description: 'Mise en production accompagnée, documentation et disponibilité pour les ajustements post-lancement.'
    }
  ],

  careerHistory: [
    {
      period: "février 2026 — aujourd'hui · Lomé, Togo",
      title: 'Architecte Solution — Agence Togo Digital',
      description: 'Architecture système, documentation technique et livraison sur plusieurs projets de digitalisation publique.',
      current: true
    },
    {
      period: 'mars 2025 — février 2026 · Lomé, Togo',
      title: 'Full Stack Developer (consultant) — Agence Togo Digital',
      description: "Conception et développement du backend (NestJS) d'une plateforme touristique nationale critique. Contribution aux décisions d'architecture pour la performance et la scalabilité."
    },
    {
      period: "décembre 2024 — aujourd'hui · Togo, remote",
      title: 'Full Stack Developer — RTK Agency',
      description: "Développement et maintenance d'API RESTful haute performance et d'applications web complexes avec Laravel et Vue.js/Nuxt.js. Contribution à des projets mobiles Flutter et frontend."
    },
    {
      period: 'avril 2024 — mars 2025 · Sénégal, remote',
      title: 'Software Engineer Consultant — Kutiwa',
      description: 'Construction et déploiement d\'API robustes avec Laravel pour plusieurs projets clients. Contribution à des projets Symfony, Flutter et WinDev.'
    },
    {
      period: 'octobre 2022 — octobre 2024 · Lomé, Togo',
      title: 'Full Stack Developer — Kimoasoft',
      description: "Direction du développement d'applications web et mobiles complètes avec Laravel, Vue.js/Nuxt.js et Flutter. Supervision d'une petite équipe et des revues de code."
    },
    {
      period: 'septembre 2022 — octobre 2022 · Lomé, Togo',
      title: 'Web Developer — Zoé Tech Group',
      description: "Migration complète d'un système de gestion scolaire de Symfony 5 vers Laravel 9. Refonte de l'UI pour améliorer significativement l'UX."
    },
    {
      period: 'janvier 2021 — mars 2022 · Lomé, Togo',
      title: 'Web / Mobile Developer — Agence Web E-Services',
      description: 'Conception et intégration d\'applications web, mobiles et desktop. Développement de modules clients optimisés et réutilisables.'
    },
    {
      period: 'décembre 2019 — mars 2020 · Lomé, Togo',
      title: 'Web Developer — Ingénieurs & Experts',
      description: "Développement de modules PHP et JavaScript. Application des bonnes pratiques de développement et d'intégration continue."
    }
  ],

  education: [
    { title: 'Licence en génie logiciel', place: 'Defitech II, Lomé — 2016 à 2019, mention bien' },
    { title: 'Baccalauréat, série C4', place: "Collège Notre Dame de l'Église, Lomé — 2015 à 2016" }
  ],

  languages: [
    { flag: '🇫🇷', label: 'français — natif' },
    { flag: '🇬🇧', label: 'anglais — intermédiaire' }
  ],

  nowUpdates: [
    {
      label: 'travail',
      icon: 'lucide:briefcase',
      text: "Architecte Solution à l'Agence Togo Digital — architecture système et documentation sur plusieurs projets de digitalisation publique en cours."
    },
    {
      label: 'side project',
      icon: 'lucide:rocket',
      text: 'Reconstruction de Symplicia Rent avec une architecture DDD/CQRS/Event Sourcing — la phase actuelle porte sur la stratégie de test à cinq niveaux.'
    },
    {
      label: 'apprentissage',
      icon: 'lucide:graduation-cap',
      text: "J'approfondis l'event sourcing et les architectures multi-tenant à isolation stricte (realm-per-tenant avec Keycloak)."
    },
    {
      label: 'à côté',
      icon: 'lucide:music',
      text: 'Guitare et fitness, pour décompresser entre deux sessions de code.'
    }
  ]
}

const en: LocalizedSiteContent = {
  heroStats: [
    { value: '6+', label: 'years of experience' },
    { value: '8', label: 'roles held' },
    { value: '3', label: 'countries (Togo, Senegal, remote)' },
    { value: '10+', label: 'technologies mastered' }
  ],

  homeSkillGroups: [
    { title: 'backend expertise', items: 'Laravel, NestJS', highlight: true },
    { title: 'frontend expertise', items: 'Vue.js, Nuxt.js', highlight: true },
    { title: 'also familiar with', items: 'Symfony, Django, Angular, Next.js', highlight: false },
    { title: 'mobile & tooling', items: 'Flutter, Kotlin, Docker', highlight: false }
  ],

  testimonials: [
    {
      quote: '"Fast delivery and clean code. Stéphane turned a vague need into a clear technical solution."',
      author: '— Client, freelance mission'
    },
    {
      quote: '"A real driving force on architecture, well beyond plain development."',
      author: '— Former colleague, Kimoasoft'
    },
    {
      quote: '"Smooth communication and deadlines met from start to finish of the project."',
      author: '— Client, Flutter mobile project'
    }
  ],

  services: [
    {
      index: '01',
      title: 'Backend development',
      description: 'Design and development of robust, secure RESTful APIs.',
      tags: ['Laravel', 'NestJS', 'Symfony']
    },
    {
      index: '02',
      title: 'Frontend development',
      description: 'Modern, fast and maintainable web interfaces.',
      tags: ['Vue.js', 'Nuxt.js', 'Next.js']
    },
    {
      index: '03',
      title: 'Mobile applications',
      description: 'High-performance cross-platform mobile apps, from prototype to production.',
      tags: ['Flutter', 'Kotlin']
    },
    {
      index: '04',
      title: 'Architecture & technical audit',
      description: 'Architecture review, technology choices and rollout of best practices.',
      tags: ['Clean Architecture', 'DDD']
    }
  ],

  processSteps: [
    {
      index: '01 — scoping',
      title: 'Understand the need',
      description: 'Initial conversation to clarify the goal, constraints and real scope of the project.'
    },
    {
      index: '02 — architecture & quote',
      title: 'Propose a solution',
      description: 'Justified technology choices, work broken into batches, time and cost estimates.'
    },
    {
      index: '03 — iterative development',
      title: 'Build step by step',
      description: 'Regular deliveries and check-ins, to adjust course along the way rather than at the end.'
    },
    {
      index: '04 — testing & acceptance',
      title: 'Verify before shipping',
      description: 'Functional and technical testing, then sign-off with you before going to production.'
    },
    {
      index: '05 — delivery & support',
      title: 'Stay available afterwards',
      description: 'Guided rollout, documentation and availability for post-launch adjustments.'
    }
  ],

  careerHistory: [
    {
      period: "February 2026 — present · Lomé, Togo",
      title: 'Solution Architect — Agence Togo Digital',
      description: 'System architecture, technical documentation and delivery across several public digitalization projects.',
      current: true
    },
    {
      period: 'March 2025 — February 2026 · Lomé, Togo',
      title: 'Full Stack Developer (consultant) — Agence Togo Digital',
      description: "Design and development of the backend (NestJS) for a critical national tourism platform. Contributed to architecture decisions for performance and scalability."
    },
    {
      period: "December 2024 — present · Togo, remote",
      title: 'Full Stack Developer — RTK Agency',
      description: "Development and maintenance of high-performance RESTful APIs and complex web applications with Laravel and Vue.js/Nuxt.js. Contributed to Flutter mobile and frontend projects."
    },
    {
      period: 'April 2024 — March 2025 · Senegal, remote',
      title: 'Software Engineer Consultant — Kutiwa',
      description: 'Built and deployed robust APIs with Laravel for several client projects. Contributed to Symfony, Flutter and WinDev projects.'
    },
    {
      period: 'October 2022 — October 2024 · Lomé, Togo',
      title: 'Full Stack Developer — Kimoasoft',
      description: "Led development of full web and mobile applications with Laravel, Vue.js/Nuxt.js and Flutter. Supervised a small team and code reviews."
    },
    {
      period: 'September 2022 — October 2022 · Lomé, Togo',
      title: 'Web Developer — Zoé Tech Group',
      description: 'Full migration of a school management system from Symfony 5 to Laravel 9. UI overhaul to significantly improve UX.'
    },
    {
      period: 'January 2021 — March 2022 · Lomé, Togo',
      title: 'Web / Mobile Developer — Agence Web E-Services',
      description: 'Design and integration of web, mobile and desktop applications. Development of optimized, reusable client modules.'
    },
    {
      period: 'December 2019 — March 2020 · Lomé, Togo',
      title: 'Web Developer — Ingénieurs & Experts',
      description: 'Development of PHP and JavaScript modules. Applied development and continuous integration best practices.'
    }
  ],

  education: [
    { title: "Bachelor's degree in Software Engineering", place: 'Defitech II, Lomé — 2016 to 2019, with honors' },
    { title: 'High school diploma, science track (C4)', place: "Collège Notre Dame de l'Église, Lomé — 2015 to 2016" }
  ],

  languages: [
    { flag: '🇫🇷', label: 'French — native' },
    { flag: '🇬🇧', label: 'English — intermediate' }
  ],

  nowUpdates: [
    {
      label: 'work',
      icon: 'lucide:briefcase',
      text: 'Solution Architect at Agence Togo Digital — system architecture and documentation across several ongoing public digitalization projects.'
    },
    {
      label: 'side project',
      icon: 'lucide:rocket',
      text: 'Rebuilding Symplicia Rent with a DDD/CQRS/Event Sourcing architecture — the current phase focuses on a five-level testing strategy.'
    },
    {
      label: 'learning',
      icon: 'lucide:graduation-cap',
      text: "Deepening my knowledge of event sourcing and strictly isolated multi-tenant architectures (realm-per-tenant with Keycloak)."
    },
    {
      label: 'off the clock',
      icon: 'lucide:music',
      text: 'Guitar and fitness, to decompress between two coding sessions.'
    }
  ]
}

const contentByLocale: Record<Locale, LocalizedSiteContent> = { fr, en }

export function getSiteContent(locale: string): LocalizedSiteContent {
  return contentByLocale[locale as Locale] ?? contentByLocale.fr
}
