<script setup lang="ts">
import Parallax from 'parallax-js'

const { t } = useI18n()

const parallaxScene = ref<HTMLElement | null>(null)
let parallaxInstance: Parallax | null = null

const needsMotionPermission = ref(false)
const motionEnabled = ref(false)

const initParallax = () => {
  if (parallaxScene.value && !parallaxInstance) {
    parallaxInstance = new Parallax(parallaxScene.value, {
      relativeInput: true,
      hoverOnly: false,
      calibrateX: true,
      calibrateY: true,
      invertX: false,
      invertY: false,
      limitX: 15,
      limitY: 15,
      scalarX: 4,
      scalarY: 4,
      frictionX: 0.1,
      frictionY: 0.1
    })
  }
}

const requestMotionPermission = async () => {
  const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<'granted' | 'denied'>
  }

  if (typeof DeviceOrientationEventWithPermission.requestPermission === 'function') {
    try {
      const permission = await DeviceOrientationEventWithPermission.requestPermission()
      if (permission === 'granted') {
        motionEnabled.value = true
        needsMotionPermission.value = false
        // Reinitialize parallax after permission granted
        if (parallaxInstance) {
          parallaxInstance.destroy()
          parallaxInstance = null
        }
        initParallax()
      }
    } catch (error) {
      console.error('Motion permission denied:', error)
    }
  }
}

onMounted(() => {
  // Check if iOS and needs permission
  const DeviceOrientationEventWithPermission = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<'granted' | 'denied'>
  }

  if (typeof DeviceOrientationEventWithPermission.requestPermission === 'function') {
    needsMotionPermission.value = true
  } else {
    motionEnabled.value = true
  }

  initParallax()
})

onUnmounted(() => {
  parallaxInstance?.destroy()
  parallaxInstance = null
})

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description')
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div ref="parallaxScene" class="hero-image-wrapper">
        <div data-depth="0.2" class="hero-image-layer">
          <img
            src="/irini.png"
            alt="Irini"
            class="hero-image"
          >
        </div>
      </div>

      <div class="hero-overlay">
        <IriniLogo :width="280" :height="105" class="hero-logo" />
        <p class="hero-tagline">{{ t('home.tagline') }}</p>
      </div>

    </section>

    <!-- Bio Section -->
    <section class="bio">
      <div class="container">
        <h2 class="bio-title">{{ t('home.aboutTitle') }}</h2>
        <p class="bio-text">
          {{ t('home.aboutText') }}
        </p>
      </div>
    </section>

    <!-- Featured Music Section -->
    <section class="featured">
      <div class="container">
        <h2 class="featured-title">{{ t('home.listenNow') }}</h2>
        <div class="featured-grid">
          <div class="featured-embed">
            <YouTubeEmbed video-id="5fx8svFglk0" title="Irini Music Video" />
          </div>
          <div class="featured-embed">
            <SpotifyEmbed type="artist" id="71UtY1hfa00hP9xNgPDs96" :height="352" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  max-width: 1400px;
  overflow: hidden;
  margin: 0 auto;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
}

.hero-image-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100svh;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.hero-overlay {
  position: absolute;
  left: 50%;
  bottom: 25%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  text-align: center;
  z-index: 2;
}

.hero-logo {
  color: var(--color-text);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.hero-tagline {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.motion-permission-btn {
  position: absolute;
  bottom: calc(var(--space-lg) + 80px);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-sm) var(--space-md);
  background: rgba(201, 145, 78, 0.2);
  border: 1px solid var(--color-accent);
  border-radius: 8px;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
  z-index: 10;
}

.motion-permission-btn:hover {
  background: rgba(201, 145, 78, 0.4);
}

.motion-permission-btn:active {
  transform: translateX(-50%) scale(0.98);
}

@keyframes scroll-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.2);
  }
}

/* Bio Section */
.bio {
  padding: var(--space-xl) 0;
}

.bio-title {
  font-size: var(--text-6xl);
  margin-bottom: var(--space-md);
  color: var(--color-accent-light);
}

.bio-text {
  font-size: var(--text-lg);
  line-height: 1.8;
  max-width: 700px;
  color: var(--color-text-muted);
}

/* Featured Section */
.featured {
  padding: var(--space-xl) 0;
}

.featured-title {
  font-size: var(--text-6xl);
  margin-bottom: var(--space-lg);
  color: var(--color-accent-light);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  max-width: 1000px;
}

.featured-embed {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-logo {
    width: 200px;
    height: auto;
  }

  .bio-title,
  .featured-title {
    font-size: var(--text-2xl);
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
