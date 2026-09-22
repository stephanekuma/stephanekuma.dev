<script setup lang="ts">
import type { TimelineItem } from '~/components/Timeline.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const site = useSiteContent()

useSeoMeta({
  title: () => t('process.seo.title'),
  description: () => t('process.seo.description')
})

const items = computed<TimelineItem[]>(() =>
  site.value.processSteps.map((step) => ({
    eyebrow: step.index,
    eyebrowClass: 'text-xs text-[var(--term-green)] mb-1',
    title: step.title,
    description: step.description
  }))
)
</script>

<template>
  <div>
    <nav :aria-label="t('process.breadcrumb')" class="max-w-4xl mx-auto px-6 pt-8 text-xs text-[var(--term-dim)]">
      <NuxtLink :to="localePath('/services')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('process.breadcrumbServices') }}</NuxtLink> /
      <span class="text-[var(--term-text)]">{{ t('process.breadcrumbCurrent') }}</span>
    </nav>

    <section class="max-w-4xl mx-auto px-6 py-10">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('process.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ t('process.heading') }}</h1>
      <p class="text-[var(--term-dim)] max-w-lg">{{ t('process.intro') }}</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <Timeline :items="items" />
      </div>
    </section>

    <CtaSection :title="t('process.ctaTitle')" :button-label="t('process.ctaButton')" />
  </div>
</template>
