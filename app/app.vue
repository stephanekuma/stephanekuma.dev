<script setup lang="ts">
const { locale } = useI18n()
const head = useLocaleHead()
const { theme } = useTheme()

useHead({
  htmlAttrs: computed(() => ({
    lang: head.value.htmlAttrs?.lang ?? locale.value,
    dir: head.value.htmlAttrs?.dir,
    'data-theme': theme.value
  })),
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? [])
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommandTerminal />
  <ShortcutsHelp />
  <MatrixRain />
  <EasterEggHint />
</template>
