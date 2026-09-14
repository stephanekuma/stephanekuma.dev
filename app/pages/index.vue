<script setup lang="ts">
import { clients, heroStats, homeSkillGroups, siteMeta, testimonials } from '~/data/site'

useSeoMeta({
  title: 'stephane@lome:~$',
  description: "Architecte Solution & développeur Full Stack Web & Mobile à Lomé, Togo. Parcours, projets et blog technique.",
  ogTitle: 'stephane@lome:~$',
  ogDescription: "Architecte Solution & développeur Full Stack Web & Mobile à Lomé, Togo. Parcours, projets et blog technique.",
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'stephane@lome:~$',
  twitterDescription: "Architecte Solution & développeur Full Stack Web & Mobile à Lomé, Togo. Parcours, projets et blog technique."
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteMeta.name,
        jobTitle: siteMeta.title,
        worksFor: { '@type': 'Organization', name: siteMeta.company },
        url: siteMeta.url,
        email: `mailto:${siteMeta.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
        sameAs: ['https://github.com/StephaneKuma', 'https://linkedin.com/in/stéphane-kossi-kuma'],
        knowsAbout: ['Laravel', 'Vue.js', 'Nuxt.js', 'NestJS', 'Flutter', 'Symfony', 'Next.js', 'Angular']
      })
    }
  ]
})

const phrases = ['architecte solution', 'fondateur de symplicia', 'guitariste amateur']
const typed = ref('')
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  let i = 0
  let j = 0
  let deleting = false

  function tick() {
    const current = phrases[i]
    if (!deleting) {
      j++
      typed.value = current.slice(0, j)
      if (j === current.length) {
        deleting = true
        timer = setTimeout(tick, 1400)
        return
      }
    } else {
      j--
      typed.value = current.slice(0, j)
      if (j === 0) {
        deleting = false
        i = (i + 1) % phrases.length
      }
    }
    timer = setTimeout(tick, deleting ? 40 : 70)
  }
  tick()
})

onUnmounted(() => clearTimeout(timer))

const { data: posts } = await useFetch('/api/posts')
const { data: projects } = await useFetch('/api/projects')

const latestPosts = computed(() => posts.value?.slice(0, 2) ?? [])
const featuredProject = computed(() => projects.value?.[0])
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-20 sm:py-28 grid sm:grid-cols-[1fr_220px] gap-10 items-center">
      <div>
        <p class="text-[var(--term-green)] text-sm mb-4 prompt">whoami</p>
        <div class="inline-flex items-center gap-2 text-xs border border-[var(--term-border)] rounded-full px-3 py-1.5 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--term-green)] animate-pulse" />
          ouvert aux missions et collaborations
        </div>
        <h1 class="text-3xl sm:text-5xl font-bold leading-tight mb-6">
          Kossi Stéphane Kuma<span class="text-[var(--term-green)]">.</span><br />
          <span class="text-[var(--term-text)]">{{ typed }}</span><span class="cursor-blink" />
        </h1>
        <p class="text-[var(--term-dim)] max-w-lg mb-10 leading-relaxed">
          Architecte Solution à l'Agence Togo Digital, développeur Full Stack Web & Mobile depuis 6+ ans. Laravel,
          Vue.js et Flutter au quotidien — NestJS, Next.js et Django à l'occasion. Basé à Lomé, je construis aussi
          mes propres projets sur mon temps libre.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/projects"
            class="cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-5 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            voir mes projets
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            me contacter
          </NuxtLink>
          <a
            href="/cv-stephane-kuma.pdf"
            download
            class="cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            télécharger le CV
          </a>
        </div>
      </div>
      <div class="w-full aspect-square rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] overflow-hidden group">
        <img
          src="/profile.jpg"
          alt="Photo de Kossi Stéphane Kuma"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div v-for="stat in heroStats" :key="stat.label" class="transition-transform duration-200 hover:-translate-y-1">
          <p class="text-2xl font-bold text-[var(--term-green)]">{{ stat.value }}</p>
          <p class="text-xs text-[var(--term-dim)] mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">cat skills.json</p>
          <NuxtLink to="/parcours" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]">parcours complet →</NuxtLink>
        </div>
        <div class="grid sm:grid-cols-4 gap-4 text-sm">
          <div
            v-for="group in homeSkillGroups"
            :key="group.title"
            class="rounded-lg p-4 bg-[var(--term-panel)] border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            :class="group.highlight ? 'border-[var(--term-green)]' : 'border-[var(--term-border)]'"
          >
            <p class="text-xs mb-2" :class="group.highlight ? 'text-[var(--term-green)]' : 'text-[var(--term-dim)]'">{{ group.title }}</p>
            <p>{{ group.items }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="featuredProject" v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">ls ./projets --featured</p>
          <NuxtLink to="/projects" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]">tous les projets →</NuxtLink>
        </div>
        <ProjectCard :project="featuredProject" variant="featured" />
      </div>
    </section>

    <section v-if="latestPosts.length" v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">tail -n 3 blog.log</p>
          <NuxtLink to="/blog" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]">tous les articles →</NuxtLink>
        </div>
        <div class="space-y-4">
          <BlogPostCard v-for="post in latestPosts" :key="post.slug" :post="post" variant="teaser" />
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10">
        <p class="text-xs text-[var(--term-dim)] mb-5 text-center">ils m'ont fait confiance</p>
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[var(--term-dim)]">
          <span v-for="client in clients" :key="client" class="transition-colors duration-200 hover:text-[var(--term-text)]">{{ client }}</span>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-6 prompt">curl api.github.com/users/StephaneKuma</p>
        <GithubStatsWidget />
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <p class="text-[var(--term-green)] text-xs mb-2 prompt">cat temoignages.json</p>
        <p class="text-xs text-[var(--term-dim)] mb-8">exemples à remplacer par de vrais retours clients ou collègues</p>
        <div class="grid sm:grid-cols-3 gap-4">
          <div
            v-for="t in testimonials"
            :key="t.author"
            class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--term-dim)]"
          >
            <p class="text-sm text-[var(--term-text)] mb-4 leading-relaxed">{{ t.quote }}</p>
            <p class="text-xs text-[var(--term-dim)]">{{ t.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      title="Un projet en tête ?"
      description="Discutons de votre idée, qu'il s'agisse d'une refonte, d'un audit d'architecture ou d'un projet from scratch."
      button-label="demander un projet"
    />
  </div>
</template>
