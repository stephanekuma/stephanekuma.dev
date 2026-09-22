<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { data: project, error } = await useFetch(`/api/projects/${slug}`, { query: { locale } })

if (error.value || !project.value) {
  throw createError({ statusCode: 404, statusMessage: t('projects.detail.notFound'), fatal: true })
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
      <nav :aria-label="t('projects.detail.breadcrumb')" class="text-xs text-[var(--term-dim)] mb-3">
        <NuxtLink :to="localePath('/')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('projects.detail.breadcrumbHome') }}</NuxtLink> /
        <NuxtLink :to="localePath('/projects')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('projects.detail.breadcrumbProjects') }}</NuxtLink> /
        <span class="text-[var(--term-text)]">{{ project.name }}</span>
      </nav>
      <NuxtLink
        :to="localePath('/projects')"
        class="inline-flex items-center gap-1 text-xs text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:-translate-x-1"
      >
        <Icon name="lucide:arrow-left" size="12" /> {{ t('projects.detail.backToProjects') }}
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
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold px-4 py-2.5 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
        >
          {{ t('projects.detail.sourceCode') }} <Icon name="lucide:arrow-up-right" size="14" />
        </a>
        <a
          href="/cv-stephane-kuma.pdf"
          download
          class="text-xs cursor-pointer border border-[var(--term-border)] px-4 py-2.5 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
        >
          {{ t('projects.detail.downloadCv') }}
        </a>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">{{ t('projects.detail.challenge') }}</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.challenge }}</p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">{{ t('projects.detail.solution') }}</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.solution }}</p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">{{ t('projects.detail.result') }}</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ project.result }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10">
        <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('projects.detail.screenshotsPrompt') }}</p>
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">{{ t('projects.detail.screenshotHome') }}</div>
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">{{ t('projects.detail.screenshotDashboard') }}</div>
          <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-dim)]">{{ t('projects.detail.screenshotListing') }}</div>
        </div>
        <p class="text-xs text-[var(--term-dim)] mt-3">{{ t('projects.detail.screenshotsNote') }}</p>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid sm:grid-cols-2 gap-10">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('projects.detail.descriptionPrompt') }}</p>
          <p v-for="(paragraph, i) in project.longDescription" :key="i" class="text-sm text-[var(--term-dim)] leading-relaxed mb-4 last:mb-0">
            {{ paragraph }}
          </p>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('projects.detail.stackPrompt') }}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <TagBadge v-for="tag in project.stack" :key="tag">{{ tag }}</TagBadge>
          </div>
          <div class="text-xs text-[var(--term-dim)] space-y-2">
            <p><strong class="text-[var(--term-text)] font-medium">{{ t('projects.detail.role') }}</strong> — {{ project.role }}</p>
            <p><strong class="text-[var(--term-text)] font-medium">{{ t('projects.detail.status') }}</strong> — {{ project.status }}</p>
            <p><strong class="text-[var(--term-text)] font-medium">{{ t('projects.detail.zone') }}</strong> — {{ project.zone }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection :title="t('projects.detail.ctaTitle')" :description="t('projects.detail.ctaDescription')" :button-label="t('projects.detail.ctaButton')" />
  </div>
</template>
