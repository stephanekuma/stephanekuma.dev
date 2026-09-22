<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="text-[var(--term-text)] min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-content">{{ t('common.skipToContent') }}</a>
    <TheHeader />
    <main class="flex-1" id="main-content" role="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
