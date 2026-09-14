export default defineNuxtPlugin((nuxtApp) => {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (reduceMotion) return

      el.classList.add('reveal')

      const stagger = typeof binding.value === 'number' ? binding.value : 0
      if (stagger > 0) {
        el.style.transitionDelay = `${Math.min(stagger, 8) * 70}ms`
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
      observer.observe(el)
    }
  })
})
