<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: project, error } = await useFetch(`/api/projects/${slug}`)

if (error.value || !project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Projet introuvable', fatal: true })
}

useSeoMeta({
  title: () => `${project.value!.name} — stephane.dev`,
  description: project.value.tagline,
  ogTitle: () => `${project.value!.name} — stephane.dev`,
  ogDescription: project.value.tagline,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${project.value!.name} — stephane.dev`,
  twitterDescription: project.value.tagline
})
</script>

<template>
  <div v-if="project">
    <section class="max-w-4xl mx-auto px-6 pt-12 pb-4">
      <nav aria-label="fil d'ariane" class="text-xs text-[var(--term-dim)] mb-3">
        <NuxtLink to="/" class="transition-colors duration-200 hover:text-[var(--term-green)]">accueil</NuxtLink> /
        <NuxtLink to="/projects" class="transition-colors duration-200 hover:text-[var(--term-green)]">projets</NuxtLink> /
        <span class="text-[var(--term-text)]">{{ project.name }}</span>
      </nav>
      <NuxtLink
        to="/projects"
        class="inline-block text-xs text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:-translate-x-1"
      >
        ← retour aux projets
      </NuxtLink>
    </section>

    <section class="max-w-4xl mx-auto px-6 pb-10">
      <div class="flex items-center gap-2 text-xs text-[var(--term-green)] mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--term-green)]" />
        {{ project.status }}
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ project.name }}</h1>
      <p class="text-[var(--term-dim)] max-w-xl leading-relaxed mb-8">{{ project.description }}</p>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://github.com/StephaneKuma"
          class="text-xs cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold px-4 py-2.5 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
        >
          code source ↗
        </a>
        <a
          href="/cv-stephane-kuma.pdf"
          download
          class="text-xs cursor-pointer border border-[var(--term-border)] px-4 py-2.5 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          télécharger le CV
        </a>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">défi</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.challenge }}</p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">solution</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.solution }}</p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">résultat</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.result }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10">
        <p class="text-[var(--term-green)] text-xs mb-4 prompt">ls ./captures</p>
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">capture — accueil</div>
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">capture — dashboard</div>
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">capture — annonce</div>
        </div>
        <p class="text-xs text-[var(--term-dim)] mt-3">Emplacements réservés — remplace-les par tes vraies captures d'écran.</p>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid sm:grid-cols-2 gap-10">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">cat description.md</p>
          <p v-for="(paragraph, i) in project.longDescription" :key="i" class="text-sm text-[var(--term-dim)] leading-relaxed mb-4 last:mb-0">
            {{ paragraph }}
          </p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">cat stack.json</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <TagBadge v-for="tag in project.stack" :key="tag">{{ tag }}</TagBadge>
          </div>
          <div class="text-xs text-[var(--term-dim)] space-y-2">
            <p><strong class="text-[var(--term-text)] font-medium">rôle</strong> — {{ project.role }}</p>
            <p><strong class="text-[var(--term-text)] font-medium">statut</strong> — {{ project.status }}</p>
            <p><strong class="text-[var(--term-text)] font-medium">zone</strong> — {{ project.zone }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection title="Un projet similaire en tête ?" description="Parlons de votre besoin en architecture ou en développement." button-label="demander un projet" />
  </div>
</template>
