<script setup lang="ts">
const { t } = useI18n()
const repos = ref('—')
const followers = ref('—')

onMounted(async () => {
  try {
    const data = await $fetch<{ public_repos?: number; followers?: number }>(
      'https://api.github.com/users/StephaneKuma'
    )
    if (data.public_repos !== undefined) repos.value = String(data.public_repos)
    if (data.followers !== undefined) followers.value = String(data.followers)
  } catch {
    // GitHub API unreachable or rate-limited — keep the placeholder dashes
  }
})
</script>

<template>
  <div class="grid grid-cols-3 gap-4 text-center">
    <div class="border border-[var(--term-border)] rounded-lg p-4 bg-[var(--term-panel)] transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5">
      <p class="text-xl font-bold text-[var(--term-green)] transition-opacity duration-300">{{ repos }}</p>
      <p class="text-xs text-[var(--term-dim)] mt-1">{{ t('github.publicRepos') }}</p>
    </div>
    <div class="border border-[var(--term-border)] rounded-lg p-4 bg-[var(--term-panel)] transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5">
      <p class="text-xl font-bold text-[var(--term-green)] transition-opacity duration-300">{{ followers }}</p>
      <p class="text-xs text-[var(--term-dim)] mt-1">{{ t('github.followers') }}</p>
    </div>
    <div class="border border-[var(--term-border)] rounded-lg p-4 bg-[var(--term-panel)] transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5">
      <a
        href="https://github.com/StephaneKuma"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xl font-bold text-[var(--term-green)] cursor-pointer inline-flex justify-center transition-transform duration-200 hover:scale-125"
      >
        <Icon name="lucide:arrow-up-right" size="20" />
      </a>
      <p class="text-xs text-[var(--term-dim)] mt-1">{{ t('github.viewProfile') }}</p>
    </div>
  </div>
</template>
