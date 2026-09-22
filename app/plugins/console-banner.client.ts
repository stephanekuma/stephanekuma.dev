export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const banner = [
    '   _____ __            __                          __         ',
    '  / ___// /____  ____  / /_  ____ _____  ___     ____/ /__ _   __',
    '  \\__ \\/ __/ _ \\/ __ \\/ __ \\/ __ \\/ __ \\/ _ \\   / __  / _ \\ | / /',
    ' ___/ / /_/  __/ /_/ / / / / /_/ / / / /  __/  / /_/ /  __/ |/ / ',
    '/____/\\__/\\___/ .___/_/ /_/\\____/_/ /_/\\___/   \\__,_/\\___/|___/  ',
    '              /_/                                                 '
  ].join('\n')

  // eslint-disable-next-line no-console
  console.log(`%c${banner}`, 'color: #33d17a; font-family: monospace; font-weight: bold;')
  console.log(
    '%cHey, curious dev 👋 — thanks for peeking under the hood.',
    'color: #c9d1cf; font-family: monospace;'
  )
  console.log(
    '%cThe source is on GitHub: %chttps://github.com/StephaneKuma',
    'color: #6b7d76; font-family: monospace;',
    'color: #33d17a; font-family: monospace;'
  )
  console.log(
    '%cPsst — press Ctrl+K on this site for a little surprise.',
    'color: #6b7d76; font-family: monospace; font-style: italic;'
  )
})
