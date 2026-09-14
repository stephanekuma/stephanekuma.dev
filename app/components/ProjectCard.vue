<script setup lang="ts">
import type { Project } from '~~/server/utils/content'

withDefaults(defineProps<{ project: Project; variant?: 'featured' | 'full' }>(), {
  variant: 'full'
})
</script>

<template>
  <NuxtLink
    v-reveal
    :to="`/projects/${project.slug}`"
    class="group block border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-1 hover:shadow-lg"
    :class="variant === 'featured' ? 'p-6' : 'p-7'"
  >
    <div class="flex items-center gap-2 text-xs text-[var(--term-green)] mb-3">
      <span class="w-1.5 h-1.5 rounded-full bg-[var(--term-green)]" />
      {{ project.status }}
    </div>

    <component :is="variant === 'featured' ? 'h3' : 'h2'" :class="variant === 'featured' ? 'text-lg font-semibold mb-2' : 'text-xl font-semibold mb-3'">
      {{ project.name }}
    </component>

    <p class="text-sm text-[var(--term-dim)]" :class="variant === 'full' ? 'mb-5 max-w-xl leading-relaxed' : ''">
      {{ variant === 'featured' ? project.tagline : project.description }}
    </p>

    <template v-if="variant === 'full'">
      <div class="flex flex-wrap gap-2 mb-5">
        <TagBadge v-for="tag in project.stack" :key="tag">{{ tag }}</TagBadge>
      </div>
      <div class="flex gap-6 text-xs text-[var(--term-dim)] border-t border-[var(--term-border)] pt-4">
        <span><strong class="text-[var(--term-text)] font-medium">rôle</strong> — {{ project.role }}</span>
        <span><strong class="text-[var(--term-text)] font-medium">statut</strong> — {{ project.status }}</span>
        <span class="text-[var(--term-green)] ml-auto inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1">voir le détail →</span>
      </div>
    </template>
  </NuxtLink>
</template>
