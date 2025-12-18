<script setup lang="ts">
useSeoMeta({
  title: 'Media | Irini',
  description: 'Listen to music and watch videos from Irini'
})
</script>

<template>
  <div class="media">
    <div class="container">
      <header class="media-header">
        <h1 class="media-title">Media</h1>
        <p class="media-subtitle">Music & Videos</p>
      </header>

      <!-- Spotify Section -->
      <section class="media-section">
        <h2 class="section-title">Music</h2>
        <p class="section-description">
          Stream on Spotify
        </p>
        <div class="embed-wrapper">
          <SpotifyEmbed type="artist" id="71UtY1hfa00hP9xNgPDs96" :height="400" />
        </div>
      </section>

      <!-- YouTube Section -->
      <section class="media-section">
        <h2 class="section-title">Videos</h2>
        <p class="section-description">
          Watch on YouTube
        </p>
        <div class="video-grid">
          <div class="video-item">
            <YouTubeEmbed video-id="5fx8svFglk0" title="Irini Music Video" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.media {
  padding: var(--space-xl) 0;
}

.media-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.media-title {
  font-size: var(--text-5xl);
  margin-bottom: var(--space-xs);
}

.media-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
  margin: 0;
}

.media-section {
  margin-bottom: var(--space-xl);
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-accent-light);
  margin-bottom: var(--space-xs);
}

.section-description {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.embed-wrapper {
  max-width: 600px;
}

.video-grid {
  display: grid;
  gap: var(--space-md);
  max-width: 800px;
}

.video-item {
  width: 100%;
}

@media (max-width: 768px) {
  .media-title {
    font-size: var(--text-4xl);
  }

  .section-title {
    font-size: var(--text-xl);
  }
}
</style>
