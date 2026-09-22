<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

const knownCodes = [403, 404, 500, 503]

const info = computed(() => {
  const code = knownCodes.includes(props.error.statusCode) ? props.error.statusCode : 500
  return {
    command: t(`error.${code}.command`),
    title: t(`error.${code}.title`),
    text: t(`error.${code}.text`)
  }
})

function goHome() {
  clearError({ redirect: localePath('/') })
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
          {{ t('common.backToHome') }}
        </button>
      </section>
    </main>
    <TheFooter />
  </div>
</template>
