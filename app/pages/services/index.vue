<script setup lang="ts">
import { services } from '~/data/site'

useSeoMeta({
  title: 'services — stephane.dev',
  description: "Services de Kossi Stéphane Kuma : développement backend, frontend, mobile et audit d'architecture."
})
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">ls ./services</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Ce que je peux faire pour vous</h1>
      <p class="text-[var(--term-dim)] max-w-lg">Du développement pur à l'accompagnement architecture, selon où vous en êtes dans votre projet.</p>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-6">
        <div
          v-for="(service, index) in services"
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
          to="/services/process"
          class="inline-block text-sm text-[var(--term-green)] transition-transform duration-200 hover:underline hover:translate-x-1"
        >
          voir comment je travaille, étape par étape →
        </NuxtLink>
      </div>
    </section>

    <CtaSection title="Un besoin précis ?" description="Parlons-en, sans engagement." button-label="demander un devis" />
  </div>
</template>
