export type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark')

  function sync() {
    if (import.meta.server) return
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    theme.value = current === 'light' ? 'light' : 'dark'
  }

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = next
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  }

  return { theme, sync, toggle }
}
