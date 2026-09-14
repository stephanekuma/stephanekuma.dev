<script setup lang="ts">
import { siteMeta, socialLinks } from '~/data/site'
</script>

<template>
  <footer role="contentinfo" class="border-t border-[var(--term-border)] mt-auto">
    <div class="max-w-4xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--term-dim)]">
      <p>{{ siteMeta.location }}</p>
      <div class="flex gap-5">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.href"
          class="transition-colors duration-200 hover:text-[var(--term-green)]"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-6 pb-6 flex flex-wrap gap-4 text-xs text-[var(--term-dim)]">
      <NuxtLink to="/now" class="transition-colors duration-200 hover:text-[var(--term-green)]">./now</NuxtLink>
      <NuxtLink to="/legal" class="transition-colors duration-200 hover:text-[var(--term-green)]">mentions légales</NuxtLink>
    </div>
  </footer>
</template>
