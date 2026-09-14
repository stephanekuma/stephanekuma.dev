<script setup lang="ts">
import { nowUpdates } from '~/data/site'

useSeoMeta({
  title: 'now — stephane.dev',
  description: 'Sur quoi Kossi Stéphane Kuma travaille en ce moment.'
})
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">cat now.md</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-2">Maintenant</h1>
      <p class="text-xs text-[var(--term-dim)] mb-6">dernière mise à jour : septembre 2026</p>
      <p class="text-[var(--term-dim)] max-w-lg">
        Un aperçu de ce qui occupe mon temps en ce moment, mis à jour de temps en temps. Inspiré du
        <a href="https://nownownow.com/about" class="text-[var(--term-green)] transition-opacity duration-200 hover:underline hover:opacity-80">now page movement</a>.
      </p>
    </section>

    <section class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 space-y-8">
        <div v-for="(update, index) in nowUpdates" :key="update.label" v-reveal="index">
          <p class="text-[var(--term-green)] text-xs mb-2 prompt">{{ update.label }}</p>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ update.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
