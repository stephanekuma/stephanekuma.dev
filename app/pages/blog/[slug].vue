<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = route.params.slug as string

const { data: post, error } = await useFetch(`/api/posts/${slug}`, { query: { locale } })

if (error.value || !post.value) {
  throw createError({ statusCode: 404, statusMessage: t('blog.detail.notFound'), fatal: true })
}

const { data: allPosts } = await useFetch('/api/posts', { query: { locale } })
const relatedPosts = computed(() => (allPosts.value ?? []).filter((p) => p.slug !== slug).slice(0, 2))

useSeoMeta({
  title: () => `${post.value!.title} — stephane.dev`,
  description: post.value.excerpt,
  ogTitle: () => `${post.value!.title} — stephane.dev`,
  ogDescription: post.value.excerpt,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${post.value!.title} — stephane.dev`,
  twitterDescription: post.value.excerpt
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.title,
        datePublished: post.value.date,
        author: { '@type': 'Person', name: 'Kossi Stéphane Kuma' },
        publisher: { '@type': 'Person', name: 'Kossi Stéphane Kuma' }
      })
    },
    {
      key: 'giscus',
      src: 'https://giscus.app/client.js',
      async: true,
      crossorigin: 'anonymous',
      'data-repo': 'StephaneKuma/stephane.dev',
      'data-repo-id': '',
      'data-category': 'Comments',
      'data-category-id': '',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'dark_dimmed',
      'data-lang': locale
    }
  ]
})

const linkCopied = ref(false)

function shareLinkedIn() {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer')
}

function shareTwitter() {
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener,noreferrer')
}

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href)
  linkCopied.value = true
  setTimeout(() => (linkCopied.value = false), 1500)
}
</script>

<template>
  <article v-if="post" class="max-w-2xl mx-auto px-6 py-16">
    <nav :aria-label="t('blog.detail.breadcrumb')" class="text-xs text-[var(--term-dim)] mb-3">
      <NuxtLink :to="localePath('/')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('blog.detail.breadcrumbHome') }}</NuxtLink> /
      <NuxtLink :to="localePath('/blog')" class="transition-colors duration-200 hover:text-[var(--term-green)]">{{ t('blog.detail.breadcrumbBlog') }}</NuxtLink> /
      <span class="text-[var(--term-text)]">{{ post.tag }}</span>
    </nav>
    <NuxtLink
      :to="localePath('/blog')"
      class="inline-flex items-center gap-1 text-xs text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:-translate-x-1"
    >
      <Icon name="lucide:arrow-left" size="12" /> {{ t('blog.detail.backToBlog') }}
    </NuxtLink>

    <div class="flex items-center gap-3 text-xs text-[var(--term-dim)] mt-6 mb-3">
      <span>{{ post.date }}</span>
      <span>·</span>
      <span class="text-[var(--term-green)]">{{ post.tag }}</span>
      <span>·</span>
      <span>{{ post.readingTime }}</span>
    </div>

    <h1 class="text-2xl sm:text-3xl font-bold mb-6 leading-snug">{{ post.title }}</h1>

    <div class="flex items-center gap-3 mb-8 pb-8 border-b border-[var(--term-border)]">
      <div class="w-9 h-9 rounded-full bg-[var(--term-green)] text-[var(--term-oncolor)] flex items-center justify-center text-xs font-semibold">KK</div>
      <div>
        <p class="text-sm font-medium">Kossi Stéphane Kuma</p>
        <p class="text-xs text-[var(--term-dim)]">{{ t('common.jobTitle') }}</p>
      </div>
    </div>

    <div class="aspect-video rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] flex items-center justify-center text-xs text-[var(--term-dim)] mb-10">
      {{ t('blog.detail.coverPlaceholder') }}
    </div>

    <div class="prose-body text-[var(--term-text)] leading-relaxed space-y-5 text-[15px]">
      <template v-if="post.body.length">
        <template v-for="(block, i) in post.body" :key="i">
          <p v-if="block.type === 'p'">{{ block.text }}</p>
          <div v-else class="rounded-lg border border-[var(--term-border)] bg-[var(--term-panel)] p-5 my-8">
            <p class="text-xs text-[var(--term-green)] mb-2 prompt">{{ t('blog.detail.codeExtract') }}</p>
            <pre class="text-xs text-[var(--term-dim)] overflow-x-auto"><code>{{ block.text }}</code></pre>
          </div>
        </template>
      </template>
      <template v-else>
        <p>{{ post.excerpt }}</p>
        <p class="text-xs text-[var(--term-dim)]">{{ t('blog.detail.comingSoon') }}</p>
      </template>
    </div>

    <div class="flex flex-wrap gap-2 mt-10">
      <TagBadge v-for="tag in post.tags" :key="tag">{{ tag }}</TagBadge>
    </div>

    <div class="flex items-center gap-4 mt-8 pt-8 border-t border-[var(--term-border)]">
      <p class="text-xs text-[var(--term-dim)]">{{ t('blog.detail.share') }}</p>
      <button type="button" class="cursor-pointer text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]" aria-label="LinkedIn" @click="shareLinkedIn">
        <Icon name="lucide:linkedin" size="16" />
      </button>
      <button type="button" class="cursor-pointer text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]" aria-label="Twitter / X" @click="shareTwitter">
        <Icon name="lucide:twitter" size="16" />
      </button>
      <button type="button" class="cursor-pointer inline-flex items-center gap-1.5 text-xs text-[var(--term-dim)] transition-colors duration-200 hover:text-[var(--term-green)]" @click="copyLink">
        <Icon :name="linkCopied ? 'lucide:check' : 'lucide:link'" size="14" />
        {{ linkCopied ? t('blog.detail.linkCopied') : t('blog.detail.copyLink') }}
      </button>
    </div>

    <div v-if="relatedPosts.length" class="mt-14">
      <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('blog.detail.similarPrompt') }}</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <NuxtLink
          v-for="related in relatedPosts"
          :key="related.slug"
          :to="localePath(`/blog/${related.slug}`)"
          class="cursor-pointer border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] overflow-hidden transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="aspect-video bg-[var(--term-thumb)] flex items-center justify-center text-xs text-[var(--term-dim)]">{{ related.tag }}</div>
          <div class="p-4">
            <p class="text-xs text-[var(--term-dim)] mb-1">{{ related.tag }} · {{ related.date }}</p>
            <p class="text-sm font-medium">{{ related.title }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="border-t border-[var(--term-border)] mt-12 pt-8 flex items-center justify-between">
      <NuxtLink :to="localePath('/blog')" class="inline-flex items-center gap-1 text-sm text-[var(--term-green)] transition-transform duration-200 hover:underline hover:-translate-x-1"><Icon name="lucide:arrow-left" size="14" /> {{ t('blog.detail.allArticles') }}</NuxtLink>
      <NuxtLink :to="localePath('/contact')" class="inline-flex items-center gap-1 text-sm text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:translate-x-1">{{ t('blog.detail.questionContact') }} <Icon name="lucide:arrow-right" size="14" /></NuxtLink>
    </div>

    <div class="mt-14 pt-10 border-t border-[var(--term-border)]">
      <p class="text-[var(--term-green)] text-xs mb-4 prompt">{{ t('blog.detail.commentsPrompt') }}</p>
      <div id="giscus-container" />
      <i18n-t keypath="blog.detail.commentsNote" tag="p" class="text-xs text-[var(--term-dim)] mt-3">
        <template #link>
          <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" class="text-[var(--term-green)] hover:underline">giscus.app</a>
        </template>
      </i18n-t>
    </div>
  </article>
</template>
