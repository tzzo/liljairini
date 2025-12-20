import { useDeviceOrientation, useMouse, useRafFn } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useParallaxEffect(options: { intensity?: number; smoothing?: number } = {}) {
  const intensity = options.intensity ?? 15
  const smoothing = options.smoothing ?? 0.08 // Lower = smoother (0.05-0.15 is good range)

  const { beta, gamma, isSupported: isOrientationSupported } = useDeviceOrientation()
  const { x, y } = useMouse()

  const permissionGranted = ref(false)
  const hasInteracted = ref(false)

  // Smoothed position values
  const currentX = ref(0)
  const currentY = ref(0)
  const targetX = ref(0)
  const targetY = ref(0)

  // Detect touch device (don't use mouse on mobile)
  const isTouchDevice = ref(false)
  if (import.meta.client) {
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  // iOS requires user interaction to request permission
  const requestPermission = async () => {
    if (hasInteracted.value) return
    hasInteracted.value = true

    const DeviceOrientationEventWithPermission = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DeviceOrientationEventWithPermission?.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEventWithPermission.requestPermission()
        permissionGranted.value = permission === 'granted'
      } catch {
        permissionGranted.value = false
      }
    } else {
      // Non-iOS or permission not required
      permissionGranted.value = true
    }
  }

  // Smooth animation loop for desktop mouse tracking
  useRafFn(() => {
    if (isTouchDevice.value) return

    if (import.meta.client) {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      targetX.value = ((x.value - centerX) / centerX) * intensity
      targetY.value = ((y.value - centerY) / centerY) * intensity

      // Lerp towards target (smooth interpolation)
      currentX.value += (targetX.value - currentX.value) * smoothing
      currentY.value += (targetY.value - currentY.value) * smoothing
    }
  })

  const transform = computed(() => {
    // Use orientation if available and permitted (mobile)
    if (isOrientationSupported.value && permissionGranted.value && gamma.value !== null && beta.value !== null) {
      const tiltX = Math.max(-intensity, Math.min(intensity, gamma.value * 0.5))
      const tiltY = Math.max(-intensity, Math.min(intensity, (beta.value - 45) * 0.5))
      return `translate(${tiltX}px, ${tiltY}px)`
    }

    // Mouse tracking only on non-touch devices (desktop)
    if (import.meta.client && !isTouchDevice.value) {
      return `translate(${currentX.value}px, ${currentY.value}px)`
    }

    return 'translate(0, 0)'
  })

  return {
    transform,
    requestPermission,
    isOrientationSupported,
    permissionGranted
  }
}
