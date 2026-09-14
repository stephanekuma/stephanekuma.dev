<script setup lang="ts">
useSeoMeta({
  title: 'projets — stephane.dev',
  description: 'Projets personnels de Kossi Stéphane Kuma : Symplicia et autres side projects.',
  ogTitle: 'projets — stephane.dev',
  ogDescription: 'Projets personnels de Kossi Stéphane Kuma : Symplicia et autres side projects.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'projets — stephane.dev',
  twitterDescription: 'Projets personnels de Kossi Stéphane Kuma : Symplicia et autres side projects.'
})

const { data: projects } = await useFetch('/api/projects')
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">ls -la ./projets</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Projets personnels</h1>
      <p class="text-[var(--term-dim)] max-w-lg">Ce que je construis en dehors du travail — parfois lancé, parfois encore en chantier.</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 space-y-6">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />

        <div class="border border-dashed border-[var(--term-border)] rounded-lg p-6 text-sm text-[var(--term-dim)]">
          <span class="text-[var(--term-green)]">#</span> d'autres projets arrivent ici au fil du temps.
        </div>
      </div>
    </section>

    <CtaSection
      title="Envie de collaborer sur un projet ?"
      description="Que ce soit pour une mission, un audit ou une idée à faire naître, contactez-moi."
      button-label="demander un projet"
    />
  </div>
</template>
