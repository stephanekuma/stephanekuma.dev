<script setup lang="ts">
import { contactInfo, languages, socialLinks } from '~/data/site'

useSeoMeta({
  title: 'contact — stephane.dev',
  description: "Contactez Kossi Stéphane Kuma pour un projet, une mission ou un audit d'architecture.",
  ogTitle: 'contact — stephane.dev',
  ogDescription: "Contactez Kossi Stéphane Kuma pour un projet, une mission ou un audit d'architecture.",
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'contact — stephane.dev',
  twitterDescription: "Contactez Kossi Stéphane Kuma pour un projet, une mission ou un audit d'architecture."
})

const form = reactive({
  name: '',
  email: '',
  type: 'nouveau projet',
  message: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    errorMessage.value = 'Merci de remplir tous les champs obligatoires.'
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: form })
    successMessage.value = 'Message envoyé — je vous réponds sous 48h.'
    form.name = ''
    form.email = ''
    form.type = 'nouveau projet'
    form.message = ''
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || "Une erreur est survenue, réessayez dans un instant."
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">mail --compose</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Discutons de votre projet</h1>
      <p class="text-[var(--term-dim)] max-w-lg mb-6">
        Mission, audit d'architecture, ou juste une idée à valider — écrivez-moi, je réponds sous 48h.
      </p>
      <a
        href="https://calendly.com/kumastephane"
        class="inline-flex items-center gap-2 cursor-pointer text-sm border border-[var(--term-border)] rounded px-4 py-2.5 transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5"
      >
        📅 réserver un créneau directement
      </a>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-5 gap-10">
        <form class="sm:col-span-3 space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="name" class="block text-xs text-[var(--term-dim)] mb-2">nom</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              placeholder="votre nom"
            >
          </div>
          <div>
            <label for="email" class="block text-xs text-[var(--term-dim)] mb-2">email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              placeholder="vous@exemple.com"
            >
          </div>
          <div>
            <label for="type" class="block text-xs text-[var(--term-dim)] mb-2">type de demande</label>
            <select
              id="type"
              v-model="form.type"
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
            >
              <option>nouveau projet</option>
              <option>audit d'architecture</option>
              <option>collaboration / partenariat</option>
              <option>autre</option>
            </select>
          </div>
          <div>
            <label for="message" class="block text-xs text-[var(--term-dim)] mb-2">message</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              placeholder="décrivez votre projet en quelques lignes"
            />
          </div>
          <Transition name="fade">
            <p v-if="errorMessage" class="text-xs text-red-400">{{ errorMessage }}</p>
          </Transition>
          <Transition name="fade">
            <p v-if="successMessage" class="text-xs text-[var(--term-green)]">{{ successMessage }}</p>
          </Transition>
          <button
            type="submit"
            :disabled="submitting"
            class="cursor-pointer bg-[var(--term-green)] text-[var(--term-oncolor)] font-semibold text-sm px-6 py-3 rounded transition-all duration-200 hover:bg-[var(--term-green-hover)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {{ submitting ? 'envoi...' : 'envoyer le message' }}
          </button>
        </form>

        <aside class="sm:col-span-2 space-y-6">
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">cat contact.json</p>
            <ul class="text-sm text-[var(--term-dim)] space-y-2">
              <li v-for="item in contactInfo" :key="item.label">
                <strong class="text-[var(--term-text)] font-medium">{{ item.label }}</strong> — {{ item.value }}
              </li>
            </ul>
          </div>
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">cat langues.json</p>
            <div class="flex gap-2">
              <span v-for="lang in languages" :key="lang.label" class="text-xs border border-[var(--term-border)] rounded-full px-3 py-1">
                {{ lang.flag }} {{ lang.label }}
              </span>
            </div>
          </div>
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">ls ./reseaux</p>
            <div class="flex flex-col gap-2 text-sm">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                class="inline-block w-fit text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:translate-x-1"
              >
                {{ link.label }} ↗
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
