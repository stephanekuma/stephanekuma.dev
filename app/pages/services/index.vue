<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const site = useSiteContent()

useSeoMeta({
  title: () => t('services.seo.title'),
  description: () => t('services.seo.description')
})
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('services.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ t('services.heading') }}</h1>
      <p class="text-[var(--term-dim)] max-w-lg">{{ t('services.intro') }}</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-6">
        <div
          v-for="(service, index) in site.services"
          :key="service.title"
          v-reveal="index"
          class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--term-dim)]"
        >
          <p class="text-[var(--term-green)] text-xs mb-3 prompt">{{ service.index }}</p>
          <h2 class="text-lg font-semibold mb-2">{{ service.title }}</h2>
          <p class="text-sm text-[var(--term-dim)] mb-4">{{ service.description }}</p>
          <div class="flex flex-wrap gap-2">
            <TagBadge v-for="tag in service.tags" :key="tag">{{ tag }}</TagBadge>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 text-center">
        <NuxtLink
          :to="localePath('/services/process')"
          class="inline-flex items-center gap-1 text-sm text-[var(--term-green)] transition-transform duration-200 hover:underline hover:translate-x-1"
        >
          {{ t('services.processLink') }} <Icon name="lucide:arrow-right" size="14" />
        </NuxtLink>
      </div>
    </section>

    <CtaSection :title="t('services.ctaTitle')" :description="t('services.ctaDescription')" :button-label="t('services.ctaButton')" />
  </div>
</template>
