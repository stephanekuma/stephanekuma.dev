<script setup lang="ts">
const menuOpen = ref(false)
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

const navLinks = computed(() => [
  { label: t('nav.services'), to: '/services' },
  { label: t('nav.parcours'), to: '/parcours' },
  { label: t('nav.projects'), to: '/projects' },
  { label: t('nav.blog'), to: '/blog' },
  { label: t('nav.contact'), to: '/contact' }
])

function isActive(to: string) {
  return route.path === localePath(to) || route.path.startsWith(`${localePath(to)}/`)
}
</script>

<template>
  <header
    role="banner"
    class="border-b border-[var(--term-border)] bg-[var(--term-bg)]/90 backdrop-blur sticky top-0 z-10"
  >
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="text-sm text-[var(--term-green)] transition-opacity duration-200 hover:opacity-80">
        stephane@lome<span class="text-[var(--term-text)]">:~$</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="sm:hidden cursor-pointer text-[var(--term-text)] border border-[var(--term-border)] rounded px-2 py-1 text-xs transition-colors duration-200 hover:border-[var(--term-dim)] inline-flex items-center gap-1.5"
          :aria-label="menuOpen ? t('common.close') : t('common.menu')"
          @click="menuOpen = !menuOpen"
        >
          <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" size="14" />
          {{ menuOpen ? t('common.close') : t('common.menu') }}
        </button>
        <nav
          :aria-label="t('nav.ariaLabel')"
          class="sm:flex gap-6 text-sm text-[var(--term-dim)] absolute sm:static top-full left-0 right-0 bg-[var(--term-bg)] sm:bg-transparent border-b sm:border-0 border-[var(--term-border)] px-6 sm:px-0 py-4 sm:py-0 flex-col sm:flex-row"
          :class="menuOpen ? 'flex' : 'hidden'"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="transition-colors duration-200 hover:text-[var(--term-green)]"
            :class="isActive(link.to) ? 'text-[var(--term-green)]' : ''"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
