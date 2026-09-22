export function useCommandTerminal() {
  const isOpen = useState('terminal-open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  return { isOpen, open, close, toggle }
}

export function useShortcutsHelp() {
  const isOpen = useState('shortcuts-help-open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close }
}

export function useMatrixRain() {
  const isActive = useState('matrix-rain-active', () => false)

  function trigger(durationMs = 6000) {
    if (isActive.value) return
    isActive.value = true
    setTimeout(() => {
      isActive.value = false
    }, durationMs)
  }

  return { isActive, trigger }
}
