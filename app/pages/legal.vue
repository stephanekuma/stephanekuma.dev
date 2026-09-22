<script setup lang="ts">
import { siteMeta } from '~/data/site'

const { t } = useI18n()

useSeoMeta({
  title: () => t('legal.seo.title')
})
</script>

<template>
  <section class="max-w-2xl mx-auto px-6 py-16">
    <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('legal.prompt') }}</p>
    <h1 class="text-3xl font-bold mb-10">{{ t('legal.heading') }}</h1>

    <div class="space-y-8 text-sm text-[var(--term-dim)] leading-relaxed">
      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">{{ t('legal.editorTitle') }}</h2>
        <p>{{ siteMeta.name }} — {{ siteMeta.location }}.<br />{{ t('legal.contactLabel') }} : {{ siteMeta.email }}</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">{{ t('legal.hostingTitle') }}</h2>
        <p>{{ t('legal.hostingText') }}</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">{{ t('legal.dataTitle') }}</h2>
        <p>{{ t('legal.dataText') }}</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">{{ t('legal.cookiesTitle') }}</h2>
        <p>{{ t('legal.cookiesText') }}</p>
      </div>

      <div>
        <h2 class="text-[var(--term-text)] font-semibold mb-2">{{ t('legal.rightsTitle') }}</h2>
        <p>{{ t('legal.rightsText', { email: siteMeta.email }) }}</p>
      </div>

      <p class="text-xs text-[var(--term-dim)] pt-4 border-t border-[var(--term-border)]">
        {{ t('legal.disclaimer') }}
      </p>
    </div>
  </section>
</template>
