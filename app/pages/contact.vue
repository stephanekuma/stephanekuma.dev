<script setup lang="ts">
import { siteMeta, socialLinks } from '~/data/site'

const { t, locale } = useI18n()
const site = useSiteContent()

useSeoMeta({
  title: () => t('contact.seo.title'),
  description: () => t('contact.seo.description'),
  ogTitle: () => t('contact.seo.title'),
  ogDescription: () => t('contact.seo.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('contact.seo.title'),
  twitterDescription: () => t('contact.seo.description')
})

const typeOptions = computed(() => [
  t('contact.form.typeOptions.newProject'),
  t('contact.form.typeOptions.audit'),
  t('contact.form.typeOptions.partnership'),
  t('contact.form.typeOptions.other')
])

const form = reactive({
  name: '',
  email: '',
  type: '',
  message: ''
})

watch(typeOptions, (options) => {
  if (!form.type || !options.includes(form.type)) form.type = options[0]
}, { immediate: true })

const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    errorMessage.value = t('contact.form.requiredError')
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form, locale: locale.value } })
    successMessage.value = t('contact.form.successMessage')
    form.name = ''
    form.email = ''
    form.type = typeOptions.value[0]
    form.message = ''
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || t('contact.form.genericError')
  } finally {
    submitting.value = false
  }
}

const contactInfo = computed(() => [
  { label: t('contact.labels.email'), value: siteMeta.email },
  { label: t('contact.labels.phone'), value: siteMeta.phone },
  { label: t('contact.labels.location'), value: siteMeta.location },
  { label: t('contact.labels.delay'), value: t('contact.labels.delayValue') }
])
</script>

<template>
  <div>
    <section class="max-w-4xl mx-auto px-6 py-16">
      <p class="text-[var(--term-green)] text-sm mb-3 prompt">{{ t('contact.prompt') }}</p>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ t('contact.heading') }}</h1>
      <p class="text-[var(--term-dim)] max-w-lg mb-6">
        {{ t('contact.intro') }}
      </p>
      <a
        href="https://calendly.com/kumastephane"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 cursor-pointer text-sm border border-[var(--term-border)] rounded px-4 py-2.5 transition-all duration-200 hover:border-[var(--term-dim)] hover:-translate-y-0.5"
      >
        <Icon name="lucide:calendar" size="16" />
        {{ t('contact.calendly') }}
      </a>
    </section>

    <section v-reveal class="border-t border-[var(--term-border)]">
      <div class="max-w-4xl mx-auto px-6 py-14 grid sm:grid-cols-5 gap-10">
        <form class="sm:col-span-3 space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="name" class="block text-xs text-[var(--term-dim)] mb-2">{{ t('contact.form.name') }}</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              :placeholder="t('contact.form.namePlaceholder')"
            >
          </div>
          <div>
            <label for="email" class="block text-xs text-[var(--term-dim)] mb-2">{{ t('contact.form.email') }}</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              :placeholder="t('contact.form.emailPlaceholder')"
            >
          </div>
          <div>
            <label for="type" class="block text-xs text-[var(--term-dim)] mb-2">{{ t('contact.form.type') }}</label>
            <TermSelect id="type" v-model="form.type" :options="typeOptions" />
          </div>
          <div>
            <label for="message" class="block text-xs text-[var(--term-dim)] mb-2">{{ t('contact.form.message') }}</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="w-full bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
              :placeholder="t('contact.form.messagePlaceholder')"
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
            {{ submitting ? t('contact.form.submitting') : t('contact.form.submit') }}
          </button>
        </form>

        <aside class="sm:col-span-2 space-y-6">
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">{{ t('contact.infoPrompt') }}</p>
            <ul class="text-sm text-[var(--term-dim)] space-y-2">
              <li v-for="item in contactInfo" :key="item.label">
                <strong class="text-[var(--term-text)] font-medium">{{ item.label }}</strong> — {{ item.value }}
              </li>
            </ul>
          </div>
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">{{ t('contact.languagesPrompt') }}</p>
            <div class="flex gap-2">
              <span v-for="lang in site.languages" :key="lang.label" class="text-xs border border-[var(--term-border)] rounded-full px-3 py-1">
                {{ lang.flag }} {{ lang.label }}
              </span>
            </div>
          </div>
          <div class="border border-[var(--term-border)] rounded-lg bg-[var(--term-panel)] p-5">
            <p class="text-[var(--term-green)] text-xs mb-3 prompt">{{ t('contact.socialPrompt') }}</p>
            <div class="flex flex-col gap-2 text-sm">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 w-fit text-[var(--term-dim)] transition-all duration-200 hover:text-[var(--term-green)] hover:translate-x-1"
              >
                {{ link.label }} <Icon name="lucide:arrow-up-right" size="12" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
