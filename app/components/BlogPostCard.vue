<script setup lang="ts">
import type { BlogPostSummary } from '~~/server/utils/content'

withDefaults(defineProps<{ post: BlogPostSummary; variant?: 'teaser' | 'full' }>(), {
  variant: 'full'
})
</script>

<template>
  <NuxtLink
    v-reveal
    :to="`/blog/${post.slug}`"
    class="block border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-1 hover:shadow-lg"
    :class="variant === 'teaser' ? 'p-5' : 'p-6'"
  >
    <p class="text-xs text-[var(--term-dim)]" :class="variant === 'teaser' ? 'mb-1' : 'mb-2'">
      {{ post.date }} · {{ post.tag }}
    </p>
    <component :is="variant === 'teaser' ? 'p' : 'h2'" :class="variant === 'teaser' ? 'font-medium text-sm' : 'text-lg font-semibold mb-2'">
      {{ post.title }}
    </component>
    <p v-if="variant === 'full'" class="text-sm text-[var(--term-dim)]">{{ post.excerpt }}</p>
  </NuxtLink>
</template>
