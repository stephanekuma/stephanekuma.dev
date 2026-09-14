<script setup lang="ts">
useSeoMeta({
  title: 'blog — stephane.dev',
  description: "Notes techniques sur l'architecture logicielle, l'event sourcing et le développement web & mobile.",
  ogTitle: 'blog — stephane.dev',
  ogDescription: "Notes techniques sur l'architecture logicielle, l'event sourcing et le développement web & mobile.",
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'blog — stephane.dev',
  twitterDescription: "Notes techniques sur l'architecture logicielle, l'event sourcing et le développement web & mobile."
})

const { data: posts } = await useFetch('/api/posts')

const search = ref('')
const activeTag = ref('all')
const currentPage = ref(1)
const pageSize = 4

const tagCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const post of posts.value ?? []) {
    counts[post.tag] = (counts[post.tag] ?? 0) + 1
  }
  return counts
})

const tags = computed(() => Object.keys(tagCounts.value).sort())

const filtered = computed(() => {
  const query = search.value.trim().toLowerCase()
  return (posts.value ?? []).filter((post) => {
    const matchesTag = activeTag.value === 'all' || post.tag === activeTag.value
    const matchesQuery =
      !query || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
    return matchesTag && matchesQuery
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

watch(totalPages, (total) => {
  if (currentPage.value > total) currentPage.value = total
})

const pageItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

function setActiveTag(tag: string) {
  activeTag.value = tag
  currentPage.value = 1
}

watch(search, () => {
  currentPage.value = 1
})
</script>

<template>
  <div>
    <section class="max-w-5xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">tail -f blog.log</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Blog</h1>
      <p class="text-[var(--term-dim)] max-w-lg mb-2">
        Notes techniques sur l'architecture logicielle et les projets en cours. Articles d'exemple à remplacer par
        tes vrais billets.
      </p>
      <a href="/rss.xml" class="inline-block text-xs text-[var(--term-green)] transition-transform duration-200 hover:underline hover:translate-x-1">s'abonner au flux RSS →</a>
    </section>

    <section class="border-t border-[var(--term-border)]">
      <div class="max-w-5xl mx-auto px-6 py-10 grid sm:grid-cols-[1fr_220px] gap-10">
        <div>
          <input
            v-model="search"
            type="text"
            placeholder="rechercher un article..."
            class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)] mb-6"
          >

          <p v-if="activeTag !== 'all'" class="text-xs text-[var(--term-dim)] mb-4">
            catégorie : <span class="text-[var(--term-green)]">{{ activeTag }}</span> ·
            <button type="button" class="cursor-pointer underline transition-colors duration-200 hover:text-[var(--term-green)]" @click="setActiveTag('all')">réinitialiser</button>
          </p>

          <p v-if="filtered.length === 0" class="text-sm text-[var(--term-dim)]">Aucun article ne correspond à ta recherche.</p>

          <div class="space-y-6">
            <BlogPostCard v-for="post in pageItems" :key="post.slug" :post="post" />
          </div>

          <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10 text-sm">
            <button
              type="button"
              class="w-8 h-8 rounded border border-[var(--term-border)] text-[var(--term-dim)] cursor-pointer transition-all duration-200 hover:text-[var(--term-green)] hover:border-[var(--term-dim)] disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              ←
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="w-8 h-8 rounded border cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              :class="
                page === currentPage
                  ? 'border-[var(--term-green)] text-[var(--term-green)]'
                  : 'border-[var(--term-border)] text-[var(--term-dim)] hover:text-[var(--term-green)] hover:border-[var(--term-dim)]'
              "
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              type="button"
              class="w-8 h-8 rounded border border-[var(--term-border)] text-[var(--term-dim)] cursor-pointer transition-all duration-200 hover:text-[var(--term-green)] hover:border-[var(--term-dim)] disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              →
            </button>
          </div>
        </div>

        <aside class="space-y-8">
          <div>
            <p class="text-xs text-[var(--term-dim)] mb-3 prompt">ls ./categories</p>
            <div class="flex flex-col border border-[var(--term-border)] rounded-lg overflow-hidden divide-y divide-[var(--term-border)] max-h-72 overflow-y-auto">
              <button
                type="button"
                class="text-left text-sm px-3 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-[var(--term-panel)] flex items-center justify-between"
                :class="activeTag === 'all' ? 'text-[var(--term-green)]' : 'text-[var(--term-dim)]'"
                @click="setActiveTag('all')"
              >
                <span>tous les articles</span>
              </button>
              <button
                v-for="tag in tags"
                :key="tag"
                type="button"
                class="text-left text-sm px-3 py-2.5 cursor-pointer transition-colors duration-200 hover:bg-[var(--term-panel)] hover:text-[var(--term-green)] flex items-center justify-between"
                :class="activeTag === tag ? 'text-[var(--term-green)]' : 'text-[var(--term-dim)]'"
                @click="setActiveTag(tag)"
              >
                <span>{{ tag }}</span>
                <span class="text-xs text-[var(--term-dim)]">{{ tagCounts[tag] }}</span>
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs text-[var(--term-dim)] mb-3 prompt">cat auteur.md</p>
            <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-4">
              <p class="text-sm font-medium mb-1">Kossi Stéphane Kuma</p>
              <p class="text-xs text-[var(--term-dim)] mb-3">Architecte Solution · développeur full stack</p>
              <NuxtLink to="/contact" class="inline-block text-xs text-[var(--term-green)] transition-transform duration-200 hover:underline hover:translate-x-1">me contacter →</NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <CtaSection
      title="Envie que j'écrive sur un sujet précis ?"
      description="Ou tout simplement un projet à me confier — écrivez-moi."
    />
  </div>
</template>
