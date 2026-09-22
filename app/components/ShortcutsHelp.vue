<script setup lang="ts">
const { isOpen, close } = useShortcutsHelp()
const { t } = useI18n()

const navShortcuts = [
  { keys: 'g h', label: 'shortcuts.home' },
  { keys: 'g s', label: 'shortcuts.services' },
  { keys: 'g j', label: 'shortcuts.journey' },
  { keys: 'g p', label: 'shortcuts.projects' },
  { keys: 'g b', label: 'shortcuts.blog' },
  { keys: 'g c', label: 'shortcuts.contact' },
  { keys: 'g n', label: 'shortcuts.now' }
]
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      @click.self="close"
    >
      <div class="w-full max-w-sm border border-[var(--term-border)] rounded-lg bg-[var(--term-bg)] shadow-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <p class="text-[var(--term-green)] text-sm font-semibold prompt">{{ t('shortcuts.title') }}</p>
          <button type="button" class="cursor-pointer text-[var(--term-dim)] hover:text-[var(--term-green)] transition-colors" :aria-label="t('common.close')" @click="close">
            <Icon name="lucide:x" size="14" />
          </button>
        </div>

        <div class="flex items-center justify-between text-sm mb-3">
          <span class="text-[var(--term-dim)]">{{ t('shortcuts.commandPalette') }}</span>
          <kbd class="text-xs border border-[var(--term-border)] rounded px-1.5 py-0.5 text-[var(--term-text)]">Ctrl K</kbd>
        </div>

        <p class="text-xs text-[var(--term-dim)] mt-5 mb-2">{{ t('shortcuts.navigation') }}</p>
        <div class="space-y-2">
          <div v-for="item in navShortcuts" :key="item.keys" class="flex items-center justify-between text-sm">
            <span class="text-[var(--term-dim)]">{{ t(item.label) }}</span>
            <kbd class="text-xs border border-[var(--term-border)] rounded px-1.5 py-0.5 text-[var(--term-text)]">{{ item.keys }}</kbd>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm mt-5 pt-4 border-t border-[var(--term-border)]">
          <span class="text-[var(--term-dim)]">{{ t('shortcuts.help') }}</span>
          <kbd class="text-xs border border-[var(--term-border)] rounded px-1.5 py-0.5 text-[var(--term-text)]">?</kbd>
        </div>

        <p class="text-xs text-[var(--term-dim)] mt-4 text-center">{{ t('shortcuts.closeHint') }}</p>
      </div>
    </div>
  </Transition>
</template>
