<script setup lang="ts">
const { t, locale } = useI18n()

useSeoMeta({
  title: () => t('projects.index.seo.title'),
  description: () => t('projects.index.seo.description'),
  ogTitle: () => t('projects.index.seo.title'),
  ogDescription: () => t('projects.index.seo.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('projects.index.seo.title'),
  twitterDescription: () => t('projects.index.seo.description')
})

const { data: projects } = await useFetch('/api/projects', { query: { locale } })
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('projects.index.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ t('projects.index.heading') }}</h1>
      <p class="text-[var(--term-dim)] max-w-lg">{{ t('projects.index.intro') }}</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 space-y-6">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />

        <div class="border border-dashed border-[var(--term-border)] rounded-lg p-6 text-sm text-[var(--term-dim)]">
          <span class="text-[var(--term-green)]">#</span> {{ t('projects.index.more') }}
        </div>
      </div>
    </section>

    <CtaSection
      :title="t('projects.index.ctaTitle')"
      :description="t('projects.index.ctaDescription')"
      :button-label="t('projects.index.ctaButton')"
    />
  </div>
</template>
