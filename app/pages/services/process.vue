<script setup lang="ts">
import { processSteps } from '~/data/site'
import type { TimelineItem } from '~/components/Timeline.vue'

useSeoMeta({
  title: 'process — stephane.dev',
  description: 'Comment Kossi Stéphane Kuma organise un projet, du cadrage à la livraison.'
})

const items: TimelineItem[] = processSteps.map((step) => ({
  eyebrow: step.index,
  eyebrowClass: 'text-xs text-[var(--term-green)] mb-1',
  title: step.title,
  description: step.description
}))
</script>

<template>
  <div>
    <nav aria-label="fil d'ariane" class="max-w-4xl mx-auto px-6 pt-8 text-xs text-[var(--term-dim)]">
      <NuxtLink to="/services" class="transition-colors duration-200 hover:text-[var(--term-green)]">services</NuxtLink> /
      <span class="text-[var(--term-text)]">process</span>
    </nav>

    <section class="max-w-4xl mx-auto px-6 py-10">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">cat process.md</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Comment je travaille</h1>
      <p class="text-[var(--term-dim)] max-w-lg">Une méthode simple, pensée pour éviter les mauvaises surprises des deux côtés.</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <Timeline :items="items" />
      </div>
    </section>

    <CtaSection title="On démarre ?" button-label="me contacter" />
  </div>
</template>
