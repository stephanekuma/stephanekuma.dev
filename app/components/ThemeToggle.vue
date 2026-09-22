<script setup lang="ts">
const { theme, toggle } = useTheme()
const { t } = useI18n()
</script>

<template>
  <button
    id="theme-toggle"
    type="button"
    class="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
    :aria-label="theme === 'dark' ? t('common.switchToLight') : t('common.switchToDark')"
    @click="toggle"
  >
    <Icon :name="theme === 'dark' ? 'lucide:moon' : 'lucide:sun'" size="18" />
  </button>
</template>
