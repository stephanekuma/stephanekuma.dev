<script setup lang="ts">
const { t, locale } = useI18n()
const site = useSiteContent()

useSeoMeta({
  title: () => t('now.seo.title'),
  description: () => t('now.seo.description')
})

const localTime = ref('')
let clockTimer: ReturnType<typeof setInterval>

function updateClock() {
  localTime.value = new Date().toLocaleTimeString(locale.value === 'en' ? 'en-US' : 'fr-FR', {
    timeZone: 'Africa/Lome',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 30_000)
})
onUnmounted(() => clearInterval(clockTimer))
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('now.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-3">{{ t('now.heading') }}</h1>

      <div class="inline-flex items-center gap-2 text-xs border border-[var(--term-border)] rounded-full px-3 py-1.5 mb-4">
        <span class="w-1.5 h-1.5 rounded-full bg-[var(--term-green)] animate-pulse" />
        <ClientOnly>
          <span>{{ t('now.localTime', { time: localTime }) }}</span>
          <template #fallback><span>{{ t('now.liveStatus') }}</span></template>
        </ClientOnly>
      </div>

      <p class="text-xs text-[var(--term-dim)] mb-6">{{ t('now.lastUpdate') }}</p>
      <p class="text-[var(--term-dim)] max-w-lg">
        {{ t('now.introBefore') }}
        <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" class="text-[var(--term-green)] transition-opacity duration-200 hover:underline hover:opacity-80">{{ t('now.introLink') }}</a>.
      </p>
    </section>

    <section class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-2 gap-4">
        <div
          v-for="(update, index) in site.nowUpdates"
          :key="update.label"
          v-reveal="index"
          class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--term-dim)]"
        >
          <div class="flex items-center gap-2 text-[var(--term-green)] text-xs mb-3 prompt">
            <Icon :name="update.icon" size="14" />
            {{ update.label }}
          </div>
          <p class="text-sm text-[var(--term-dim)] leading-relaxed">{{ update.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
