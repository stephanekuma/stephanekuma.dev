<script setup lang="ts">
import { siteMeta, socialLinks } from '~/data/site'

const localePath = useLocalePath()
const { t } = useI18n()
const { open: openTerminal } = useCommandTerminal()
</script>

<template>
  <footer role="contentinfo" class="border-t border-[var(--term-border)] mt-auto">
    <div class="max-w-4xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--term-dim)]">
      <p>{{ siteMeta.location }}</p>
      <button
        type="button"
        class="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--term-dim)] cursor-pointer transition-colors duration-200 hover:text-[var(--term-green)]"
        @click="openTerminal"
      >
        <Icon name="lucide:terminal" size="12" />
        {{ t('terminal.hint') }}
      </button>
      <div class="flex gap-5">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors duration-200 hover:text-[var(--term-green)]"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-6 pb-6 flex flex-wrap gap-4 text-xs text-[var(--term-dim)]">
      <NuxtLink :to="localePath('/now')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('footer.now') }}</NuxtLink>
      <NuxtLink :to="localePath('/legal')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('footer.legal') }}</NuxtLink>
    </div>
  </footer>
</template>
