<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const messages: Record<number, { command: string; title: string; text: string }> = {
  403: {
    command: 'cat ./acces-refuse',
    title: '403',
    text: "bash: permission denied — vous n'avez pas accès à cette page."
  },
  404: {
    command: 'cat ./page-demandee',
    title: '404',
    text: "bash: page introuvable — elle a peut-être été déplacée ou n'a jamais existé."
  },
  500: {
    command: 'cat ./erreur-serveur',
    title: '500',
    text: "bash: une erreur inattendue est survenue côté serveur. Réessayez dans un instant."
  },
  503: {
    command: 'cat ./service-indisponible',
    title: '503',
    text: 'bash: service temporairement indisponible — maintenance en cours ou charge trop élevée.'
  }
}

const info = computed(() => messages[props.error.statusCode] ?? messages[500])

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="text-[var(--term-text)] min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-1 flex items-center" role="main">
      <section class="max-w-4xl mx-auto px-6 py-24 text-center">
        <p class="text-[var(--term-green)] text-sm mb-4 prompt">{{ info.command }}</p>
        <h1 class="text-5xl sm:text-7xl font-bold mb-4">{{ info.title }}<span class="cursor-blink" /></h1>
        <p class="text-[var(--term-dim)] max-w-md mx-auto mb-10">{{ info.text }}</p>
        <button
          type="button"
          class="inline-block cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
          @click="goHome"
        >
          retour à l'accueil
        </button>
      </section>
    </main>
    <TheFooter />
  </div>
</template>
