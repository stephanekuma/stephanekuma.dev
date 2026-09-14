<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    buttonLabel?: string
    buttonTo?: string
  }>(),
  {
    description: '',
    buttonLabel: 'me contacter',
    buttonTo: '/contact'
  }
)
</script>

<template>
  <section v-reveal class="border-t border-[var(--term-border)] bg-[var(--term-panel)]">
    <div class="max-w-4xl mx-auto px-6 py-16 text-center">
      <p class="text-[var(--term-green)] text-xs mb-3 prompt">./contact.sh</p>
      <h2 class="text-2xl sm:text-3xl font-bold mb-4">{{ title }}</h2>
      <p v-if="description" class="text-[var(--term-dim)] max-w-md mx-auto mb-8">{{ description }}</p>
      <NuxtLink
        :to="buttonTo"
        class="inline-block cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
        :class="description ? '' : 'mt-4'"
      >
        {{ buttonLabel }}
      </NuxtLink>
    </div>
  </section>
</template>
