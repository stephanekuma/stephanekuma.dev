<script setup lang="ts">
import { clients, siteMeta, socialLinks } from '~/data/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteContent()

const githubLink = socialLinks.find((link) => link.label === 'GitHub')!
const linkedinLink = socialLinks.find((link) => link.label === 'LinkedIn')!

const quickContacts = computed(() => [
  { id: 'email', icon: 'lucide:mail', label: t('home.quickContact.email'), href: `mailto:${siteMeta.email}` },
  { id: 'phone', icon: 'lucide:phone', label: t('home.quickContact.phone'), href: `tel:${siteMeta.phone.replace(/\s+/g, '')}` },
  { id: 'whatsapp', icon: '', label: t('home.quickContact.whatsapp'), href: `https://wa.me/${siteMeta.phone.replace(/\D/g, '')}` },
  { id: 'book', icon: 'lucide:calendar', label: t('home.quickContact.book'), href: 'https://calendly.com/kumastephane' }
])

useSeoMeta({
  title: () => t('meta.homeTitle'),
  description: () => t('meta.homeDescription'),
  ogTitle: () => t('meta.homeTitle'),
  ogDescription: () => t('meta.homeDescription'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.homeTitle'),
  twitterDescription: () => t('meta.homeDescription')
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteMeta.name,
        jobTitle: siteMeta.title,
        worksFor: { '@type': 'Organization', name: siteMeta.company },
        url: siteMeta.url,
        email: `mailto:${siteMeta.email}`,
        address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
        sameAs: ['https://github.com/StephaneKuma', 'https://linkedin.com/in/stéphane-kossi-kuma'],
        knowsAbout: ['Laravel', 'Vue.js', 'Nuxt.js', 'NestJS', 'Flutter', 'Symfony', 'Next.js', 'Angular']
      })
    }
  ]
})

const phrases = computed(() =>
  locale.value === 'en'
    ? ['solution architect', 'founder of symplicia', 'amateur guitarist']
    : ['architecte solution', 'fondateur de symplicia', 'guitariste amateur']
)
const typed = ref('')
let timer: ReturnType<typeof setTimeout>

function startTyping() {
  clearTimeout(timer)
  let i = 0
  let j = 0
  let deleting = false

  function tick() {
    const current = phrases.value[i]
    if (!deleting) {
      j++
      typed.value = current.slice(0, j)
      if (j === current.length) {
        deleting = true
        timer = setTimeout(tick, 1400)
        return
      }
    } else {
      j--
      typed.value = current.slice(0, j)
      if (j === 0) {
        deleting = false
        i = (i + 1) % phrases.value.length
      }
    }
    timer = setTimeout(tick, deleting ? 40 : 70)
  }
  tick()
}

onMounted(startTyping)
onUnmounted(() => clearTimeout(timer))
watch(locale, startTyping)

const { data: posts } = await useFetch('/api/posts', { query: { locale } })
const { data: projects } = await useFetch('/api/projects', { query: { locale } })

const latestPosts = computed(() => posts.value?.slice(0, 2) ?? [])
const featuredProject = computed(() => projects.value?.[0])
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-20 sm:py-28 grid sm:grid-cols-[1fr_220px] gap-10 items-center">
      <div>
        <p class="text-[var(--term-green)] text-sm mb-4 prompt">whoami</p>
        <div class="inline-flex items-center gap-2 text-xs border border-[var(--term-border)] rounded-full px-3 py-1.5 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--term-green)] animate-pulse" />
          {{ t('home.badge') }}
        </div>
        <h1 class="text-3xl sm:text-5xl font-bold leading-tight mb-6">
          Kossi Stéphane Kuma<span class="text-[var(--term-green)]">.</span><br />
          <span class="text-[var(--term-text)]">{{ typed }}</span><span class="cursor-blink" />
        </h1>
        <p class="text-[var(--term-dim)] max-w-lg mb-10 leading-relaxed">
          {{ t('home.intro') }}
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            :to="localePath('/projects')"
            class="cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-5 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            {{ t('home.viewProjects') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            {{ t('home.contactMe') }}
          </NuxtLink>
          <a
            href="/cv-stephane-kuma.pdf"
            download
            class="cursor-pointer border border-[var(--term-border)] text-sm px-5 py-3 rounded transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            {{ t('home.downloadCv') }}
          </a>
        </div>
      </div>
      <div class="relative w-full aspect-square group">
        <div class="w-full h-full rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] overflow-hidden">
          <img
            src="/profile.jpg"
            :alt="t('home.profileAlt')"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-6 bg-gradient-to-t from-[var(--term-bg)]/95 via-[var(--term-bg)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <p class="text-[10px] uppercase tracking-wide font-medium text-[var(--term-text)] translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {{ t('home.quickContact.title') }}
            </p>
            <div class="flex items-center gap-3">
              <a
                v-for="(contact, index) in quickContacts"
                :key="contact.id"
                :href="contact.href"
                :aria-label="contact.label"
                target="_blank"
                rel="noopener noreferrer"
                class="group/tip relative w-9 h-9 rounded-full cursor-pointer border border-[var(--term-border)] bg-[var(--term-bg)] flex items-center justify-center text-[var(--term-text)] translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-[var(--term-green)] hover:text-[var(--term-green)] hover:-translate-y-1"
                :style="{ transitionDelay: `${index * 60}ms` }"
              >
                <WhatsappIcon v-if="contact.id === 'whatsapp'" :size="15" />
                <Icon v-else :name="contact.icon" size="15" />
                <span
                  class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--term-border)] bg-[var(--term-bg)] px-2 py-1 text-[11px] font-medium text-[var(--term-text)] opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100"
                >
                  {{ contact.label }}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div class="absolute -bottom-3 -right-3 flex items-center gap-2">
          <a
            :href="githubLink.href"
            :aria-label="githubLink.label"
            target="_blank"
            rel="noopener noreferrer"
            class="group/tip relative w-10 h-10 rounded-full cursor-pointer border border-[var(--term-border)] bg-[var(--term-bg)] shadow-lg flex items-center justify-center text-[var(--term-text)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-green)] hover:text-[var(--term-green)]"
          >
            <Icon name="lucide:github" size="18" />
            <span
              class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--term-border)] bg-[var(--term-bg)] px-2 py-1 text-[11px] font-medium text-[var(--term-text)] opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100"
            >
              {{ githubLink.label }}
            </span>
          </a>
          <a
            :href="linkedinLink.href"
            :aria-label="linkedinLink.label"
            target="_blank"
            rel="noopener noreferrer"
            class="group/tip relative w-10 h-10 rounded-full cursor-pointer border border-[var(--term-border)] bg-[var(--term-bg)] shadow-lg flex items-center justify-center text-[var(--term-text)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--term-green)] hover:text-[var(--term-green)]"
          >
            <Icon name="lucide:linkedin" size="18" />
            <span
              class="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--term-border)] bg-[var(--term-bg)] px-2 py-1 text-[11px] font-medium text-[var(--term-text)] opacity-0 shadow-lg transition-opacity duration-150 group-hover/tip:opacity-100"
            >
              {{ linkedinLink.label }}
            </span>
          </a>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div v-for="stat in site.heroStats" :key="stat.label" class="transition-transform duration-200 hover:-translate-y-1">
          <p class="text-2xl font-bold text-[var(--term-green)]">{{ stat.value }}</p>
          <p class="text-xs text-[var(--term-dim)] mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">{{ t('home.skillsPrompt') }}</p>
          <NuxtLink :to="localePath('/parcours')" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)] inline-flex items-center gap-1">{{ t('home.seeFullJourney') }} <Icon name="lucide:arrow-right" size="12" /></NuxtLink>
        </div>
        <div class="grid sm:grid-cols-4 gap-4 text-sm">
          <div
            v-for="group in site.homeSkillGroups"
            :key="group.title"
            class="rounded-lg p-4 bg-[var(--term-panel)] border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            :class="group.highlight ? 'border-[var(--term-green)]' : 'border-[var(--term-border)]'"
          >
            <p class="text-xs mb-2" :class="group.highlight ? 'text-[var(--term-green)]' : 'text-[var(--term-dim)]'">{{ group.title }}</p>
            <p>{{ group.items }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="featuredProject" v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">{{ t('home.featuredPrompt') }}</p>
          <NuxtLink :to="localePath('/projects')" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)] inline-flex items-center gap-1">{{ t('home.seeAllProjects') }} <Icon name="lucide:arrow-right" size="12" /></NuxtLink>
        </div>
        <ProjectCard :project="featuredProject" variant="featured" />
      </div>
    </section>

    <section v-if="latestPosts.length" v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="flex items-center justify-between mb-8">
          <p class="text-[var(--term-green)] text-xs prompt">{{ t('home.blogPrompt') }}</p>
          <NuxtLink :to="localePath('/blog')" class="text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)] inline-flex items-center gap-1">{{ t('home.seeAllPosts') }} <Icon name="lucide:arrow-right" size="12" /></NuxtLink>
        </div>
        <div class="space-y-4">
          <BlogPostCard v-for="post in latestPosts" :key="post.slug" :post="post" variant="teaser" />
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-10">
        <p class="text-xs text-[var(--term-dim)] mb-5 text-center">{{ t('home.trustedPrompt') }}</p>
        <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[var(--term-dim)]">
          <span v-for="client in clients" :key="client" class="transition-colors duration-200 hover:text-[var(--term-text)]">{{ client }}</span>
        </div>
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14">
        <p class="text-[var(--term-green)] text-xs mb-6 prompt">{{ t('home.githubPrompt') }}</p>
        <GithubStatsWidget />
      </div>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <p class="text-[var(--term-green)] text-xs mb-2 prompt">{{ t('home.testimonialsPrompt') }}</p>
        <p class="text-xs text-[var(--term-dim)] mb-8">{{ t('home.testimonialsNote') }}</p>
        <div class="grid sm:grid-cols-3 gap-4">
          <div
            v-for="testimonial in site.testimonials"
            :key="testimonial.author"
            class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--term-dim)]"
          >
            <p class="text-sm text-[var(--term-text)] mb-4 leading-relaxed">{{ testimonial.quote }}</p>
            <p class="text-xs text-[var(--term-dim)]">{{ testimonial.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      :title="t('home.ctaTitle')"
      :description="t('home.ctaDescription')"
      :button-label="t('home.ctaButton')"
    />
  </div>
</template>
