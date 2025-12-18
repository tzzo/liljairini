<script setup lang="ts">
const parallax = useParallax({ speed: 0.15 })
const gyro = useGyro({ maxOffset: 8, sensitivity: 0.2 })

const heroImageStyle = computed(() => {
  return {
    transform: `${parallax.transform.value} ${gyro.transform.value}`
  }
})

onMounted(() => {
  if (gyro.isSupported.value) {
    gyro.start()
  }
})

useSeoMeta({
  title: 'Irini | Official Website',
  description: 'Welcome to the official website of Irini - Music artist'
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <img
          src="/irini-bg.png"
          alt=""
          class="hero-bg-image"
          aria-hidden="true"
        >
      </div>

      <div class="hero-content">
        <div class="hero-image-wrapper">
          <img
            src="/irini.png"
            alt="Irini"
            class="hero-image"
            :style="heroImageStyle"
          >
        </div>

        <div class="hero-text">
          <IriniLogo :width="280" :height="105" class="hero-logo" />
          <p class="hero-tagline">Music Artist</p>
        </div>
      </div>

      <div class="hero-scroll-indicator">
        <span>Scroll</span>
        <div class="scroll-line" />
      </div>
    </section>

    <!-- Bio Section -->
    <section class="bio">
      <div class="container">
        <h2 class="bio-title">About</h2>
        <p class="bio-text">
          Irini is a Finnish music artist known for her unique blend of electronic
          and pop music. With a distinctive voice and innovative sound design,
          she creates atmospheric soundscapes that transport listeners to new
          emotional territories.
        </p>
      </div>
    </section>

    <!-- Featured Music Section -->
    <section class="featured">
      <div class="container">
        <h2 class="featured-title">Listen Now</h2>
        <div class="featured-embed">
          <SpotifyEmbed type="artist" id="71UtY1hfa00hP9xNgPDs96" :height="400" />
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-md);
  text-align: center;
}

.hero-image-wrapper {
  position: relative;
  max-width: 500px;
  will-change: transform;
}

.hero-image {
  width: 100%;
  height: auto;
  transition: transform 0.1s ease-out;
}

.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.hero-logo {
  color: var(--color-text);
}

.hero-tagline {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0;
}

.hero-scroll-indicator {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-text-muted), transparent);
  animation: scroll-pulse 2s ease-in-out infinite;
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
  font-size: var(--text-3xl);
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
  font-size: var(--text-3xl);
  margin-bottom: var(--space-lg);
  color: var(--color-accent-light);
}

.featured-embed {
  max-width: 600px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-image-wrapper {
    max-width: 300px;
  }

  .hero-logo {
    width: 200px;
    height: auto;
  }

  .bio-title,
  .featured-title {
    font-size: var(--text-2xl);
  }
}
</style>
