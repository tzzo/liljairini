<script setup lang="ts">
useSeoMeta({
  title: 'Contact | Irini',
  description: 'Get in touch with Irini - Booking and inquiries'
})

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/liljairini/',
    handle: '@liljairini'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@liljairini',
    handle: '@liljairini'
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/71UtY1hfa00hP9xNgPDs96',
    handle: 'Irini'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@liljairini',
    handle: '@liljairini'
  }
]
</script>

<template>
  <div class="contact">
    <div class="container">
      <header class="contact-header">
        <h1 class="contact-title">Contact</h1>
        <p class="contact-subtitle">Get in Touch</p>
      </header>

      <!-- Email Section -->
      <section class="contact-section">
        <h2 class="section-title">Booking & Inquiries</h2>
        <a href="mailto:irinimusiikki@gmail.com" class="email-link">
          irinimusiikki@gmail.com
        </a>
      </section>

      <!-- Social Links Section -->
      <section class="contact-section">
        <h2 class="section-title">Follow</h2>
        <ul class="social-list">
          <li v-for="link in socialLinks" :key="link.url" class="social-item">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <span class="social-name">{{ link.name }}</span>
              <span class="social-handle">{{ link.handle }}</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.contact {
  padding: var(--space-xl) 0;
  min-height: calc(100vh - var(--nav-height) - 200px);
  display: flex;
  align-items: center;
}

.contact-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.contact-title {
  font-size: var(--text-5xl);
  margin-bottom: var(--space-xs);
}

.contact-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
  margin: 0;
}

.contact-section {
  margin-bottom: var(--space-xl);
  text-align: center;
}

.section-title {
  font-size: var(--text-xl);
  color: var(--color-accent-light);
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.email-link {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 4px;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.email-link:hover {
  color: var(--color-accent-light);
  border-color: var(--color-accent-light);
}

.social-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
}

.social-item {
  flex: 0 0 auto;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-md);
  border: 1px solid rgba(233, 238, 255, 0.2);
  border-radius: 8px;
  min-width: 150px;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.social-link:hover {
  border-color: var(--color-accent);
  background: rgba(201, 145, 78, 0.1);
}

.social-name {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  margin-bottom: var(--space-xs);
}

.social-handle {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .contact-title {
    font-size: var(--text-4xl);
  }

  .email-link {
    font-size: var(--text-xl);
  }

  .social-list {
    flex-direction: column;
    align-items: center;
  }

  .social-link {
    width: 100%;
    max-width: 250px;
  }
}
</style>
