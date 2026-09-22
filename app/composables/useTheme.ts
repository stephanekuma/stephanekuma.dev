export type Theme = 'dark' | 'light'

export function useTheme() {
  const theme = useState<Theme>('theme', () => {
    if (import.meta.server) return 'dark'
    try {
      return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme just won't persist
    }
  }

  return { theme, toggle }
}
