<script setup lang="ts">
const { isActive } = useMatrixRain()
const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let drops: number[] = []
const fontSize = 16
const chars = 'アイウエオカキクケコサシスセソ01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#$'

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  const columns = Math.floor(canvas.value.width / fontSize)
  drops = new Array(columns).fill(1)
}

function draw() {
  if (!ctx || !canvas.value) return
  ctx.fillStyle = 'rgba(10, 14, 12, 0.08)'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillStyle = '#33d17a'
  ctx.font = `${fontSize}px monospace`

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)]
    ctx.fillText(char, i * fontSize, drops[i] * fontSize)
    if (drops[i] * fontSize > canvas.value.height && Math.random() > 0.975) {
      drops[i] = 0
    }
    drops[i]++
  }
  raf = requestAnimationFrame(draw)
}

function start() {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(draw)
}

function stop() {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
}

watch(isActive, async (active) => {
  if (active) {
    await nextTick()
    start()
  } else {
    stop()
  }
})

onUnmounted(stop)
</script>

<template>
  <Transition name="fade">
    <div v-if="isActive" class="fixed inset-0 z-[100] pointer-events-none">
      <canvas ref="canvas" class="w-full h-full" />
      <p class="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--term-green)] prompt bg-[var(--term-bg)]/80 px-3 py-1.5 rounded">
        wake up, neo... 👾
      </p>
    </div>
  </Transition>
</template>
