interface GyroOptions {
  maxOffset?: number
  sensitivity?: number
}

export function useGyro(options: GyroOptions = {}) {
  const { maxOffset = 10, sensitivity = 0.3 } = options

  const offset = ref({ x: 0, y: 0 })
  const isSupported = ref(false)
  const hasPermission = ref(false)

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const { beta, gamma } = event

    if (beta === null || gamma === null) return

    // beta: -180 to 180 (front-to-back tilt)
    // gamma: -90 to 90 (left-to-right tilt)

    const x = Math.max(-maxOffset, Math.min(maxOffset, gamma * sensitivity))
    const y = Math.max(-maxOffset, Math.min(maxOffset, (beta - 45) * sensitivity))

    offset.value = { x, y }
  }

  const requestPermission = async () => {
    if (import.meta.server) return false

    // Check if DeviceOrientationEvent exists and has requestPermission (iOS 13+)
    const DeviceOrientationEventConstructor = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DeviceOrientationEventConstructor.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEventConstructor.requestPermission()
        hasPermission.value = permission === 'granted'
        return hasPermission.value
      } catch {
        return false
      }
    }

    // Non-iOS devices don't need permission
    hasPermission.value = true
    return true
  }

  const start = async () => {
    if (import.meta.server) return

    const permitted = await requestPermission()
    if (permitted) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    }
  }

  const stop = () => {
    if (import.meta.server) return
    window.removeEventListener('deviceorientation', handleOrientation)
  }

  const transform = computed(() => {
    return `translate3d(${offset.value.x}px, ${offset.value.y}px, 0)`
  })

  onMounted(() => {
    isSupported.value = 'DeviceOrientationEvent' in window
  })

  onUnmounted(() => {
    stop()
  })

  return {
    offset,
    isSupported,
    hasPermission,
    transform,
    requestPermission,
    start,
    stop
  }
}
