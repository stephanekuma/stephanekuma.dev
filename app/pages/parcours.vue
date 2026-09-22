<script setup lang="ts">
import { coreSkills, secondarySkills } from '~/data/site'
import type { TimelineItem } from '~/components/Timeline.vue'

const { t } = useI18n()
const site = useSiteContent()

useSeoMeta({
  title: () => t('parcours.seo.title'),
  description: () => t('parcours.seo.description'),
  ogTitle: () => t('parcours.seo.title'),
  ogDescription: () => t('parcours.seo.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('parcours.seo.title'),
  twitterDescription: () => t('parcours.seo.description')
})

const items = computed<TimelineItem[]>(() =>
  site.value.careerHistory.map((job) => ({
    eyebrow: job.period,
    title: job.title,
    description: job.description,
    dot: job.current ? 'solid' : 'outline'
  }))
)
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('parcours.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Kossi Stéphane Kuma</h1>
      <p class="text-[var(--term-dim)] max-w-xl leading-relaxed mb-2">
        {{ t('parcours.intro1') }}
      </p>
      <p class="text-[var(--term-dim)] max-w-xl leading-relaxed mb-8">
        {{ t('parcours.intro2') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          href="/cv-stephane-kuma.pdf"
          download
          class="inline-flex items-center gap-2 cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-5 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
        >
          <Icon name="lucide:download" size="16" />
          {{ t('parcours.downloadCv') }}
        </a>
        <button
          type="button"
          class="inline-flex items-center gap-2 cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 no-print"
          @click="() => window.print()"
        >
          <Icon name="lucide:printer" size="16" />
          {{ t('parcours.print') }}
        </button>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-8 prompt">{{ t('parcours.timelinePrompt') }}</p>
        <Timeline :items="items" />
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-6 prompt">{{ t('parcours.skillsPrompt') }}</p>

        <p class="text-xs text-[var(--term-dim)] mb-3">{{ t('parcours.expertiseLabel') }}</p>
        <div class="flex flex-wrap gap-2 mb-10">
          <SkillBadge v-for="skill in coreSkills" :key="skill" highlight>{{ skill }}</SkillBadge>
        </div>

        <p class="text-xs text-[var(--term-dim)] mb-3">{{ t('parcours.secondaryLabel') }}</p>
        <div class="flex flex-wrap gap-2">
          <SkillBadge v-for="skill in secondarySkills" :key="skill">{{ skill }}</SkillBadge>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-10">
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('parcours.educationPrompt') }}</p>
          <div class="space-y-4 text-sm">
            <div v-for="item in site.education" :key="item.title">
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-[var(--term-dim)]">{{ item.place }}</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('parcours.offlinePrompt') }}</p>
          <p class="text-sm text-[var(--term-dim)]">{{ t('parcours.offlineText') }}</p>
        </div>
      </div>
    </section>

    <CtaSection :title="t('parcours.ctaTitle')" :description="t('parcours.ctaDescription')" />
  </div>
</template>
