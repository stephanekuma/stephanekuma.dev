<script setup lang="ts">
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value as { code: string; name?: string }[]).filter((l) => l.code !== locale.value)
)
</script>

<template>
  <div class="flex items-center gap-1.5 text-xs text-[var(--term-dim)]" :aria-label="t('common.language')">
    <Icon name="lucide:languages" size="14" />
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="uppercase cursor-pointer border border-[var(--term-border)] rounded px-1.5 py-0.5 transition-colors duration-200 hover:text-[var(--term-green)] hover:border-[var(--term-dim)]"
      :hreflang="loc.code"
    >
      {{ loc.code }}
    </NuxtLink>
  </div>
</template>
