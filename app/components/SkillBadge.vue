<script setup lang="ts">
withDefaults(defineProps<{ highlight?: boolean }>(), { highlight: false })
</script>

<template>
  <span
    class="rounded px-3 py-1.5 bg-[var(--term-panel)] transition-transform duration-200 hover:-translate-y-0.5"
    :class="
      highlight
        ? 'text-sm border border-[var(--term-green)] text-[var(--term-green)]'
        : 'text-xs border border-[var(--term-border)] text-[var(--term-dim)] px-2.5 py-1'
    "
  >
    <slot />
  </span>
</template>
