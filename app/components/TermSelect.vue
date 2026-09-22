<script setup lang="ts">
const modelValue = defineModel<string>({ required: true })

const props = defineProps<{
  options: string[]
  id?: string
}>()

const open = ref(false)
const highlightedIndex = ref(0)
const rootEl = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
  if (open.value) {
    const current = props.options.indexOf(modelValue.value)
    highlightedIndex.value = current >= 0 ? current : 0
  }
}

function select(option: string) {
  modelValue.value = option
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (open.value) {
      e.stopPropagation()
      open.value = false
    }
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    if (open.value) select(props.options[highlightedIndex.value])
    else toggle()
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!open.value) {
      toggle()
      return
    }
    highlightedIndex.value = Math.min(props.options.length - 1, highlightedIndex.value + 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (open.value) highlightedIndex.value = Math.max(0, highlightedIndex.value - 1)
  }
}

function onClickOutside(e: MouseEvent) {
  if (open.value && rootEl.value && !rootEl.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootEl" class="relative" @keydown="onKeydown">
    <button
      :id="id"
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      class="w-full flex items-center justify-between gap-2 bg-[var(--term-panel)] border border-[var(--term-border)] rounded px-3 py-2.5 text-sm text-[var(--term-text)] cursor-pointer transition-colors duration-200 focus:outline-none focus:border-[var(--term-green)]"
      :class="open ? 'border-[var(--term-green)]' : ''"
      @click="toggle"
    >
      <span>{{ modelValue }}</span>
      <Icon
        name="lucide:chevron-down"
        size="16"
        class="text-[var(--term-dim)] shrink-0 transition-transform duration-200"
        :class="open ? 'rotate-180 text-[var(--term-green)]' : ''"
      />
    </button>

    <Transition name="fade">
      <ul
        v-if="open"
        role="listbox"
        class="absolute z-20 left-0 right-0 mt-1.5 border border-[var(--term-border)] rounded-lg bg-[var(--term-bg)] shadow-2xl py-1.5 max-h-60 overflow-y-auto"
      >
        <li
          v-for="(option, index) in options"
          :key="option"
          role="option"
          :aria-selected="option === modelValue"
          class="flex items-center justify-between gap-3 px-3 py-2 text-sm cursor-pointer transition-colors duration-150"
          :class="[
            option === modelValue ? 'text-[var(--term-green)]' : 'text-[var(--term-text)]',
            index === highlightedIndex ? 'bg-[var(--term-panel)]' : ''
          ]"
          @click="select(option)"
          @mouseenter="highlightedIndex = index"
        >
          {{ option }}
          <Icon v-if="option === modelValue" name="lucide:check" size="14" class="shrink-0" />
        </li>
      </ul>
    </Transition>
  </div>
</template>
