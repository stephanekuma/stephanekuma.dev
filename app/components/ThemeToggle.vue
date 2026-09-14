<script setup lang="ts">
const { theme, sync, toggle } = useTheme()

onMounted(sync)
</script>

<template>
  <button
    id="theme-toggle"
    type="button"
    class="cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
    :aria-label="theme === 'dark' ? 'passer en thème clair' : 'passer en thème sombre'"
    @click="toggle"
  >
    {{ theme === 'dark' ? '☾' : '☀' }}
  </button>
</template>
