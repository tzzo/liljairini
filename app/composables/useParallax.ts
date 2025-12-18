interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.1, direction = 'vertical' } = options

  const offset = ref({ x: 0, y: 0 })
  const scrollY = ref(0)

  const updateScroll = () => {
    if (import.meta.server) return

    scrollY.value = window.scrollY
    offset.value = {
      x: direction === 'horizontal' ? scrollY.value * speed : 0,
      y: direction === 'vertical' ? scrollY.value * speed : 0
    }
  }

  const transform = computed(() => {
    return `translate3d(${offset.value.x}px, ${offset.value.y}px, 0)`
  })

  onMounted(() => {
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return {
    offset,
    scrollY,
    transform
  }
}
