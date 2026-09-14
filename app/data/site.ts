export const siteMeta = {
  name: 'Kossi Stéphane Kuma',
  title: 'Architecte Solution',
  company: 'Agence Togo Digital',
  location: 'Lomé, Togo',
  url: 'https://stephane.dev',
  email: 'kumastephane@gmail.com',
  phone: '+228 93 41 36 39'
}

export const navLinks = [
  { label: './services', to: '/services' },
  { label: './parcours', to: '/parcours' },
  { label: './projets', to: '/projects' },
  { label: './blog', to: '/blog' },
  { label: './contact', to: '/contact' }
]

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/StephaneKuma' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/stéphane-kossi-kuma' },
  { label: 'Email', href: `mailto:${siteMeta.email}` }
]

export const heroStats = [
  { value: '6+', label: "ans d'expérience" },
  { value: '8', label: 'postes occupés' },
  { value: '3', label: 'pays (Togo, Sénégal, remote)' },
  { value: '10+', label: 'technologies maîtrisées' }
]

export const homeSkillGroups = [
  { title: 'expertise backend', items: 'Laravel, NestJS', highlight: true },
  { title: 'expertise frontend', items: 'Vue.js, Nuxt.js', highlight: true },
  { title: 'annexes', items: 'Symfony, Django, Angular, Next.js', highlight: false },
  { title: 'mobile & outils', items: 'Flutter, Kotlin, Docker', highlight: false }
]

export const clients = ['Agence Togo Digital', 'RTK Agency', 'Kutiwa', 'Kimoasoft', 'Zoé Tech Group']

export const testimonials = [
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
]

export const services = [
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
]

export const processSteps = [
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
]

export const careerHistory = [
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
]

export const coreSkills = ['Laravel', 'Vue.js / Nuxt.js', 'Flutter', 'NestJS']

export const secondarySkills = [
  'Symfony', 'Next.js', 'Inertia.js', 'Angular', 'Kotlin', 'Django',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'CI/CD'
]

export const education = [
  { title: 'Licence en génie logiciel', place: 'Defitech II, Lomé — 2016 à 2019, mention bien' },
  { title: 'Baccalauréat, série C4', place: "Collège Notre Dame de l'Église, Lomé — 2015 à 2016" }
]

export const contactInfo = [
  { label: 'email', value: siteMeta.email },
  { label: 'téléphone', value: siteMeta.phone },
  { label: 'lieu', value: siteMeta.location },
  { label: 'délai', value: 'réponse sous 48h' }
]

export const languages = [
  { flag: '🇫🇷', label: 'français — natif' },
  { flag: '🇬🇧', label: 'anglais — intermédiaire' }
]

export const nowUpdates = [
  {
    label: 'travail',
    text: "Architecte Solution à l'Agence Togo Digital — architecture système et documentation sur plusieurs projets de digitalisation publique en cours."
  },
  {
    label: 'side project',
    text: 'Reconstruction de Symplicia Rent avec une architecture DDD/CQRS/Event Sourcing — la phase actuelle porte sur la stratégie de test à cinq niveaux.'
  },
  {
    label: 'apprentissage',
    text: "J'approfondis l'event sourcing et les architectures multi-tenant à isolation stricte (realm-per-tenant avec Keycloak)."
  },
  {
    label: 'à côté',
    text: 'Guitare et fitness, pour décompresser entre deux sessions de code.'
  }
]
