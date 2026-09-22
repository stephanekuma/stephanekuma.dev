<script setup lang="ts">
const { t } = useI18n()
const { open: openHelp } = useShortcutsHelp()

const STORAGE_KEY = 'ee-hint-shown-count'
const MAX_SHOWS = 4
const AUTO_HIDE_MS = 12_000

const visible = ref(false)
let autoHideTimer: ReturnType<typeof setTimeout>

function readCount() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY) ?? '0')
  } catch {
    // localStorage unavailable — treat as already exhausted rather than show every load
    return MAX_SHOWS
  }
}

function recordShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(readCount() + 1))
  } catch {
    // ignore — worst case the hint reappears a bit more than intended
  }
}

onMounted(() => {
  if (readCount() >= MAX_SHOWS) return
  setTimeout(() => {
    visible.value = true
    recordShown()
    autoHideTimer = setTimeout(dismiss, AUTO_HIDE_MS)
  }, 2500)
})

onUnmounted(() => clearTimeout(autoHideTimer))

function dismiss() {
  visible.value = false
  clearTimeout(autoHideTimer)
}

function showShortcuts() {
  dismiss()
  openHelp()
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed bottom-5 right-5 z-[80] max-w-xs border border-[var(--term-border)] rounded-lg bg-[var(--term-bg)] shadow-2xl p-4"
      role="status"
    >
      <div class="flex items-start gap-3">
        <Icon name="lucide:sparkles" size="18" class="text-[var(--term-green)] shrink-0 mt-0.5" />
        <div class="min-w-0">
          <p class="text-sm font-semibold text-[var(--term-text)] mb-1">{{ t('onboarding.title') }}</p>
          <p class="text-xs text-[var(--term-dim)] leading-relaxed mb-3">{{ t('onboarding.text') }}</p>
          <div class="flex items-center gap-3 text-xs">
            <button type="button" class="cursor-pointer text-[var(--term-green)] hover:underline" @click="showShortcuts">
              {{ t('onboarding.showShortcuts') }}
            </button>
            <button type="button" class="cursor-pointer text-[var(--term-dim)] hover:text-[var(--term-text)] transition-colors" @click="dismiss">
              {{ t('onboarding.dismiss') }}
            </button>
          </div>
        </div>
        <button
          type="button"
          class="ml-auto shrink-0 cursor-pointer text-[var(--term-dim)] hover:text-[var(--term-green)] transition-colors"
          :aria-label="t('common.close')"
          @click="dismiss"
        >
          <Icon name="lucide:x" size="14" />
        </button>
      </div>
    </div>
  </Transition>
</template>
