export type Locale = 'fr' | 'en'

export interface BlogPostSummary {
  slug: string
  title: string
  excerpt: string
  date: string
  tag: string
}

export interface BlogPostBlock {
  type: 'p' | 'code'
  text: string
}

export interface BlogPost extends BlogPostSummary {
  readingTime: string
  tags: string[]
  body: BlogPostBlock[]
}

const eventSourcingBodyFr: BlogPostBlock[] = [
  {
    type: 'p',
    text: "Quand j'ai commencé à reconstruire Symplicia, la question de la persistance s'est posée très vite. Une architecture CRUD classique aurait suffi pour un MVP, mais elle rend difficile la traçabilité des changements d'état sur un bien locatif — qui a modifié quoi, et quand."
  },
  {
    type: 'p',
    text: "L'event sourcing avec EventStoreDB résout ce problème à la racine : chaque changement devient un événement immuable. On peut reconstruire l'état d'une annonce à n'importe quel instant, et ça simplifie énormément l'audit et le support client."
  },
  {
    type: 'code',
    text: `class LeaseCreated {
  constructor(tenantId, propertyId, startDate) {
    this.tenantId = tenantId;
    this.propertyId = propertyId;
    this.startDate = startDate;
  }
}`
  },
  {
    type: 'p',
    text: "Le vrai coût, c'est la complexité initiale — il faut penser en événements dès la modélisation du domaine, et ça change la façon d'écrire les tests. J'y reviendrai dans un prochain article sur la stratégie de test à cinq niveaux que j'utilise sur ce projet."
  },
  {
    type: 'p',
    text: "Pour aller plus loin sur le sujet, la documentation d'EventStoreDB (https://www.eventstore.com/) reste la meilleure ressource pour comprendre les patterns d'implémentation."
  }
]

const eventSourcingBodyEn: BlogPostBlock[] = [
  {
    type: 'p',
    text: "When I started rebuilding Symplicia, the persistence question came up very quickly. A classic CRUD architecture would have been enough for an MVP, but it makes it hard to trace state changes on a rental property — who changed what, and when."
  },
  {
    type: 'p',
    text: 'Event sourcing with EventStoreDB solves this problem at the root: every change becomes an immutable event. You can rebuild the state of a listing at any point in time, and it massively simplifies auditing and customer support.'
  },
  {
    type: 'code',
    text: `class LeaseCreated {
  constructor(tenantId, propertyId, startDate) {
    this.tenantId = tenantId;
    this.propertyId = propertyId;
    this.startDate = startDate;
  }
}`
  },
  {
    type: 'p',
    text: "The real cost is the upfront complexity — you have to think in events from the domain modeling stage onward, and it changes how you write tests. I'll come back to that in a future post about the five-level testing strategy I use on this project."
  },
  {
    type: 'p',
    text: "To go further on the topic, the EventStoreDB documentation (https://www.eventstore.com/) remains the best resource for understanding the implementation patterns."
  }
]

const blogPostsFr: BlogPost[] = [
  {
    slug: 'pourquoi-event-sourcing-plateforme-multi-tenant',
    title: "Pourquoi l'event sourcing pour une plateforme multi-tenant",
    excerpt: "Retour sur les raisons qui m'ont poussé à choisir EventStoreDB pour Symplicia plutôt qu'une architecture CRUD classique.",
    date: '2026-09-02',
    tag: 'architecture',
    readingTime: '6 min de lecture',
    tags: ['event sourcing', 'architecture', 'multi-tenant', 'symplicia'],
    body: eventSourcingBodyFr
  },
  {
    slug: 'keycloak-realm-per-tenant',
    title: "Keycloak en mode realm-per-tenant : ce que j'ai appris",
    excerpt: "Les pièges d'une isolation stricte par tenant, et comment j'ai fini par structurer les realms.",
    date: '2026-08-14',
    tag: 'infra',
    readingTime: '5 min de lecture',
    tags: ['keycloak', 'infra', 'multi-tenant'],
    body: []
  },
  {
    slug: 'coder-le-jour-guitare-le-soir',
    title: 'Coder le jour, gratter la guitare le soir',
    excerpt: "Comment je structure mes semaines entre développement, sport et musique sans m'épuiser.",
    date: '2026-07-30',
    tag: 'perso',
    readingTime: '4 min de lecture',
    tags: ['perso'],
    body: []
  },
  {
    slug: 'laravel-vs-nestjs',
    title: 'Laravel vs NestJS : comment je choisis selon le projet',
    excerpt: 'Les critères concrets qui me font pencher pour l\'un ou l\'autre selon le client et le contexte.',
    date: '2026-07-10',
    tag: 'backend',
    readingTime: '5 min de lecture',
    tags: ['laravel', 'nestjs', 'backend'],
    body: []
  },
  {
    slug: 'structurer-une-app-flutter',
    title: "Structurer une app Flutter pour qu'elle survive à 2 ans de maintenance",
    excerpt: "Architecture de dossiers, gestion d'état et découpage en modules pour éviter la dette technique.",
    date: '2026-06-22',
    tag: 'mobile',
    readingTime: '7 min de lecture',
    tags: ['flutter', 'mobile'],
    body: []
  },
  {
    slug: 'ce-que-la-revue-de-code-m-a-appris',
    title: "Ce que la revue de code m'a appris en encadrant une équipe",
    excerpt: 'Retour sur deux ans à superviser des devs juniors chez Kimoasoft, et les erreurs à ne pas répéter.',
    date: '2026-06-01',
    tag: 'équipe',
    readingTime: '5 min de lecture',
    tags: ['équipe', 'code review'],
    body: []
  },
  {
    slug: 'migrer-symfony-5-vers-laravel-9',
    title: 'Migrer un projet Symfony 5 vers Laravel 9 sans tout casser',
    excerpt: 'Stratégie de migration progressive utilisée sur un système de gestion scolaire en production.',
    date: '2026-05-18',
    tag: 'backend',
    readingTime: '6 min de lecture',
    tags: ['symfony', 'laravel', 'backend'],
    body: []
  }
]

const blogPostsEn: BlogPost[] = [
  {
    slug: 'pourquoi-event-sourcing-plateforme-multi-tenant',
    title: 'Why event sourcing for a multi-tenant platform',
    excerpt: 'A look back at why I chose EventStoreDB for Symplicia over a classic CRUD architecture.',
    date: '2026-09-02',
    tag: 'architecture',
    readingTime: '6 min read',
    tags: ['event sourcing', 'architecture', 'multi-tenant', 'symplicia'],
    body: eventSourcingBodyEn
  },
  {
    slug: 'keycloak-realm-per-tenant',
    title: 'Keycloak in realm-per-tenant mode: what I learned',
    excerpt: 'The pitfalls of strict per-tenant isolation, and how I ended up structuring the realms.',
    date: '2026-08-14',
    tag: 'infra',
    readingTime: '5 min read',
    tags: ['keycloak', 'infra', 'multi-tenant'],
    body: []
  },
  {
    slug: 'coder-le-jour-guitare-le-soir',
    title: 'Coding by day, playing guitar by night',
    excerpt: 'How I structure my weeks between development, sport and music without burning out.',
    date: '2026-07-30',
    tag: 'personal',
    readingTime: '4 min read',
    tags: ['personal'],
    body: []
  },
  {
    slug: 'laravel-vs-nestjs',
    title: 'Laravel vs NestJS: how I choose based on the project',
    excerpt: 'The concrete criteria that push me toward one or the other depending on the client and context.',
    date: '2026-07-10',
    tag: 'backend',
    readingTime: '5 min read',
    tags: ['laravel', 'nestjs', 'backend'],
    body: []
  },
  {
    slug: 'structurer-une-app-flutter',
    title: 'Structuring a Flutter app so it survives 2 years of maintenance',
    excerpt: 'Folder architecture, state management and modular splitting to avoid technical debt.',
    date: '2026-06-22',
    tag: 'mobile',
    readingTime: '7 min read',
    tags: ['flutter', 'mobile'],
    body: []
  },
  {
    slug: 'ce-que-la-revue-de-code-m-a-appris',
    title: 'What code review taught me while leading a team',
    excerpt: 'Looking back at two years supervising junior devs at Kimoasoft, and the mistakes not to repeat.',
    date: '2026-06-01',
    tag: 'team',
    readingTime: '5 min read',
    tags: ['team', 'code review'],
    body: []
  },
  {
    slug: 'migrer-symfony-5-vers-laravel-9',
    title: 'Migrating a Symfony 5 project to Laravel 9 without breaking everything',
    excerpt: 'The progressive migration strategy used on a production school management system.',
    date: '2026-05-18',
    tag: 'backend',
    readingTime: '6 min read',
    tags: ['symfony', 'laravel', 'backend'],
    body: []
  }
]

export interface Project {
  slug: string
  name: string
  status: string
  tagline: string
  description: string
  role: string
  zone: string
  stack: string[]
  challenge: string
  solution: string
  result: string
  longDescription: string[]
}

const projectsFr: Project[] = [
  {
    slug: 'symplicia-rent',
    name: 'Symplicia Rent',
    status: 'en reconstruction',
    tagline: "Plateforme SaaS de gestion locative pour l'Afrique de l'Ouest francophone. Architecture DDD/CQRS/Event Sourcing, multi-tenant.",
    description: "Plateforme B2B SaaS de gestion locative, pensée pour l'Afrique de l'Ouest francophone. À terme, elle doit devenir une marketplace centralisant les annonces de location, de vente de terrains et les services liés au logement — pour remplacer les groupes WhatsApp non structurés utilisés aujourd'hui.",
    role: 'fondateur, architecte',
    zone: "Afrique de l'Ouest francophone",
    stack: ['NestJS', 'KrakenD', 'Keycloak', 'EventStoreDB', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Traefik', 'Nuxt 3'],
    challenge: "Les annonces de location circulent surtout via des groupes WhatsApp non structurés, difficiles à filtrer et sans garantie de fiabilité.",
    solution: 'Une plateforme SaaS multi-tenant centralisant annonces, gestion locative et services liés au logement, avec une architecture event-driven robuste.',
    result: 'Reconstruction en cours, avec une stratégie de test à cinq niveaux pour garantir la fiabilité avant le lancement public.',
    longDescription: [
      'Architecture complète en DDD/CQRS/Event Sourcing, avec isolation stricte par tenant. Chaque locataire de la plateforme dispose de son propre realm d\'authentification et de sa propre base de données.',
      'Le frontend est un monorepo Nuxt 3 avec quatre applications distinctes, couvrant les différents profils d\'utilisateurs de la plateforme.'
    ]
  }
]

const projectsEn: Project[] = [
  {
    slug: 'symplicia-rent',
    name: 'Symplicia Rent',
    status: 'being rebuilt',
    tagline: 'SaaS rental management platform for French-speaking West Africa. Multi-tenant DDD/CQRS/Event Sourcing architecture.',
    description: "B2B SaaS rental management platform, built for French-speaking West Africa. Eventually it should become a marketplace centralizing rental listings, land sale listings and housing-related services — replacing the unstructured WhatsApp groups used today.",
    role: 'founder, architect',
    zone: 'French-speaking West Africa',
    stack: ['NestJS', 'KrakenD', 'Keycloak', 'EventStoreDB', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Traefik', 'Nuxt 3'],
    challenge: 'Rental listings mostly circulate through unstructured WhatsApp groups, hard to filter and with no reliability guarantee.',
    solution: 'A multi-tenant SaaS platform centralizing listings, rental management and housing-related services, backed by a robust event-driven architecture.',
    result: 'Rebuild in progress, with a five-level testing strategy to guarantee reliability before the public launch.',
    longDescription: [
      'Full DDD/CQRS/Event Sourcing architecture, with strict per-tenant isolation. Each tenant on the platform gets its own authentication realm and its own database.',
      'The frontend is an Nuxt 3 monorepo with four distinct applications, covering the platform\'s different user profiles.'
    ]
  }
]

const blogPostsByLocale: Record<Locale, BlogPost[]> = { fr: blogPostsFr, en: blogPostsEn }
const projectsByLocale: Record<Locale, Project[]> = { fr: projectsFr, en: projectsEn }

function resolveLocale(locale?: string | string[]): Locale {
  const value = Array.isArray(locale) ? locale[0] : locale
  return value === 'en' ? 'en' : 'fr'
}

export function getBlogPosts(locale?: string | string[]): BlogPost[] {
  return blogPostsByLocale[resolveLocale(locale)]
}

export function getBlogPost(slug: string, locale?: string | string[]): BlogPost | undefined {
  return getBlogPosts(locale).find((post) => post.slug === slug)
}

export function getProjects(locale?: string | string[]): Project[] {
  return projectsByLocale[resolveLocale(locale)]
}

export function getProject(slug: string, locale?: string | string[]): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug)
}
