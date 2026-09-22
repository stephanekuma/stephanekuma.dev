const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
]

const NAV_ROUTES: Record<string, string> = {
  h: '/',
  s: '/services',
  j: '/parcours',
  p: '/projects',
  b: '/blog',
  c: '/contact',
  n: '/now'
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  // Resolve these once, within the plugin's Nuxt context — the returned refs
  // and functions are plain closures we can safely reuse later inside a raw
  // DOM event listener, which runs outside Vue's injection context.
  const terminal = useCommandTerminal()
  const help = useShortcutsHelp()
  const matrix = useMatrixRain()
  const router = useRouter()
  const localePath = useLocalePath()

  let konamiBuffer: string[] = []
  let awaitingNavKey = false
  let navTimer: ReturnType<typeof setTimeout> | undefined

  window.addEventListener('keydown', (e) => {
    // Ctrl/Cmd+K always toggles the terminal, even while typing elsewhere.
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      terminal.toggle()
      return
    }

    if (e.key === 'Escape') {
      if (help.isOpen.value) help.close()
      return
    }

    // Konami code tracks raw key events regardless of focus.
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
    konamiBuffer.push(key)
    konamiBuffer = konamiBuffer.slice(-KONAMI_SEQUENCE.length)
    if (konamiBuffer.join(',') === KONAMI_SEQUENCE.join(',')) {
      matrix.trigger()
      konamiBuffer = []
    }

    if (terminal.isOpen.value || isTypingTarget(e.target)) return

    if (e.key === '?') {
      help.isOpen.value ? help.close() : help.open()
      return
    }

    if (awaitingNavKey) {
      awaitingNavKey = false
      clearTimeout(navTimer)
      const path = NAV_ROUTES[e.key.toLowerCase()]
      if (path) router.push(localePath(path))
      return
    }

    if (e.key === 'g') {
      awaitingNavKey = true
      navTimer = setTimeout(() => {
        awaitingNavKey = false
      }, 1000)
    }
  })
})
