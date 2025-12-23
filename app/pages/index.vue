<script setup lang="ts">
const { t } = useI18n()
const { transform, requestPermission } = useParallaxEffect({ intensity: 15 })

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description')
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" @click="requestPermission">
      <div class="hero-image-wrapper">
        <div class="hero-image-layer" :style="{ transform }">
          <img
            src="/irini.png"
            alt="Irini"
            class="hero-image"
          >
        </div>
      </div>

      <div class="hero-overlay">
        <IriniLogo :width="280" :height="105" class="hero-logo" animated />
        <!--<p class="hero-tagline">{{ t('home.tagline') }}</p>-->
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
  max-width: 800px;
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
    height: auto;
  }

  .bio-title,
  .featured-title {
    font-size: var(--text-5xl);
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}
</style>
