<script setup lang="ts">
import { coreSkills, secondarySkills, siteMeta, socialLinks } from '~/data/site'

interface Line {
  type: 'input' | 'output' | 'error'
  text: string
}

const { isOpen, close } = useCommandTerminal()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const { theme, toggle: toggleTheme } = useTheme()

const lines = ref<Line[]>([])
const input = ref('')
const history = ref<string[]>([])
const historyIndex = ref(-1)
const inputEl = ref<HTMLInputElement | null>(null)
const scrollEl = ref<HTMLDivElement | null>(null)

const PAGES: Record<string, string> = {
  home: '/', accueil: '/', '~': '/',
  services: '/services',
  parcours: '/parcours', journey: '/parcours',
  projects: '/projects', projets: '/projects',
  blog: '/blog',
  contact: '/contact',
  now: '/now',
  legal: '/legal', mentions: '/legal'
}

const SOCIAL: Record<string, string> = {
  github: 'https://github.com/StephaneKuma',
  linkedin: 'https://linkedin.com/in/stéphane-kossi-kuma',
  email: `mailto:${siteMeta.email}`
}

function print(text: string, type: Line['type'] = 'output') {
  for (const line of text.split('\n')) lines.value.push({ type, text: line })
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
  })
}

function reset() {
  lines.value = []
  print(t('terminal.welcome'))
}

function runCommand(raw: string) {
  const trimmed = raw.trim()
  print(`$ ${raw}`, 'input')
  if (!trimmed) return

  history.value.push(raw)
  historyIndex.value = history.value.length

  const [cmd, ...args] = trimmed.split(/\s+/)
  const arg = args.join(' ')

  switch (cmd.toLowerCase()) {
    case 'help': {
      print(t('terminal.help.title'))
      for (const key of ['help', 'whoami', 'ls', 'cd', 'cat', 'open', 'theme', 'lang', 'date', 'echo', 'clear', 'exit']) {
        print(`  ${key.padEnd(8)} — ${t(`terminal.help.${key}`)}`)
      }
      break
    }
    case 'whoami':
      print(t('terminal.whoamiBio'))
      break
    case 'ls':
      print(Object.keys(PAGES).filter((k) => !['accueil', '~', 'journey', 'projets', 'mentions'].includes(k)).join('  '))
      break
    case 'cd': {
      if (!arg) {
        print(t('terminal.cdUsage'), 'error')
        break
      }
      const target = arg.replace(/^\.\.$/, 'home').toLowerCase()
      const path = PAGES[target]
      if (!path) {
        print(t('terminal.cdNotFound', { page: arg }), 'error')
        break
      }
      print(t('terminal.cdNavigating', { page: arg }))
      setTimeout(() => {
        router.push(localePath(path))
        close()
      }, 350)
      break
    }
    case 'cat': {
      const file = arg.toLowerCase().replace(/\.(json|md)$/, '')
      if (file === 'skills') {
        print(t('terminal.catSkills', { skills: [...coreSkills, ...secondarySkills].join(', ') }))
      } else if (file === 'contact') {
        print(t('terminal.catContact', { email: siteMeta.email, phone: siteMeta.phone, location: siteMeta.location }))
      } else if (file === 'cv' || file === 'resume') {
        print(t('terminal.catCv'))
        setTimeout(() => {
          const a = document.createElement('a')
          a.href = '/cv-stephane-kuma.pdf'
          a.download = ''
          a.click()
        }, 300)
      } else if (!arg) {
        print(t('terminal.catUsage'), 'error')
      } else {
        print(t('terminal.catNotFound', { file: arg }), 'error')
      }
      break
    }
    case 'open': {
      const network = arg.toLowerCase()
      if (!network) {
        print(t('terminal.openUsage'), 'error')
        break
      }
      const href = SOCIAL[network]
      if (!href) {
        print(t('terminal.openNotFound', { network: arg }), 'error')
        break
      }
      print(t('terminal.openOpening', { network: arg }))
      window.open(href, '_blank', 'noopener,noreferrer')
      break
    }
    case 'theme': {
      const value = arg.toLowerCase()
      if (value !== 'dark' && value !== 'light') {
        print(t('terminal.themeUsage'), 'error')
        break
      }
      if (value !== theme.value) toggleTheme()
      print(t('terminal.themeSet', { theme: value }))
      break
    }
    case 'lang': {
      const value = arg.toLowerCase()
      if (value !== 'fr' && value !== 'en') {
        print(t('terminal.langUsage'), 'error')
        break
      }
      print(t('terminal.langSet', { lang: value }))
      setTimeout(() => {
        router.push(switchLocalePath(value))
        close()
      }, 300)
      break
    }
    case 'date':
      print(new Date().toLocaleString(locale.value === 'en' ? 'en-US' : 'fr-FR'))
      break
    case 'echo':
      print(arg)
      break
    case 'clear':
      lines.value = []
      break
    case 'sudo':
      print(t('terminal.sudoDenied'), 'error')
      break
    case 'coffee':
    case 'make':
      print(t('terminal.coffee'))
      break
    case 'exit':
    case 'quit':
      print(t('terminal.exiting'))
      setTimeout(close, 200)
      break
    default:
      print(t('terminal.notFound', { cmd }), 'error')
  }

  scrollToBottom()
}

function onSubmit() {
  if (input.value.trim() === '') {
    runCommand('')
    return
  }
  runCommand(input.value)
  input.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (history.value.length === 0) return
    historyIndex.value = Math.max(0, historyIndex.value - 1)
    input.value = history.value[historyIndex.value] ?? ''
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    historyIndex.value = Math.min(history.value.length, historyIndex.value + 1)
    input.value = history.value[historyIndex.value] ?? ''
  } else if (e.key === 'Escape') {
    close()
  }
}

watch(isOpen, (open) => {
  if (open) {
    reset()
    nextTick(() => inputEl.value?.focus())
  }
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 sm:p-6"
      @click.self="close"
    >
      <div class="w-full max-w-xl border border-[var(--term-border)] rounded-lg bg-[var(--term-bg)] shadow-2xl overflow-hidden mt-16 sm:mt-0">
        <div class="flex items-center gap-2 border-b border-[var(--term-border)] px-4 py-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span class="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span class="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span class="ml-2 text-xs text-[var(--term-dim)]">{{ t('terminal.title') }}</span>
          <button type="button" class="ml-auto cursor-pointer text-[var(--term-dim)] hover:text-[var(--term-green)] transition-colors" :aria-label="t('common.close')" @click="close">
            <Icon name="lucide:x" size="14" />
          </button>
        </div>
        <div ref="scrollEl" class="px-4 py-3 h-72 overflow-y-auto text-sm leading-relaxed">
          <p
            v-for="(line, i) in lines"
            :key="i"
            :class="{
              'text-[var(--term-text)]': line.type === 'input',
              'text-[var(--term-dim)]': line.type === 'output',
              'text-red-400': line.type === 'error'
            }"
            class="whitespace-pre-wrap break-words"
          >
            {{ line.text }}
          </p>
        </div>
        <form class="flex items-center gap-2 border-t border-[var(--term-border)] px-4 py-3" @submit.prevent="onSubmit">
          <span class="text-[var(--term-green)] text-sm">$</span>
          <input
            ref="inputEl"
            v-model="input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            :placeholder="t('terminal.placeholder')"
            class="flex-1 bg-transparent text-sm text-[var(--term-text)] focus:outline-none"
            @keydown="onKeydown"
          >
        </form>
      </div>
    </div>
  </Transition>
</template>
