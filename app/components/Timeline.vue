<script setup lang="ts">
export interface TimelineItem {
  eyebrow: string
  eyebrowClass?: string
  title: string
  description: string
  dot?: 'solid' | 'outline'
}

defineProps<{ items: TimelineItem[] }>()
</script>

<template>
  <ol class="space-y-9 border-l border-[var(--term-border)] ml-2">
    <li v-for="(item, index) in items" :key="item.title" v-reveal="index" class="pl-6 relative group">
      <span
        class="absolute -left-[7px] top-1 w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125"
        :class="
          item.dot === 'outline'
            ? 'bg-[var(--term-border)] border border-[var(--term-dim)]'
            : 'bg-[var(--term-green)]'
        "
      />
      <p class="mb-1" :class="item.eyebrowClass ?? 'text-xs text-[var(--term-dim)]'">{{ item.eyebrow }}</p>
      <h3 class="font-semibold mb-1">{{ item.title }}</h3>
      <p class="text-sm text-[var(--term-dim)]">{{ item.description }}</p>
    </li>
  </ol>
</template>
