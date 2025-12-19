<script setup lang="ts">
const { t } = useI18n()

const socialLinks = [
  {
    href: 'https://www.instagram.com/liljairini/',
    label: 'Instagram',
    icon: 'instagram'
  },
  {
    href: 'https://www.tiktok.com/@liljairini',
    label: 'TikTok',
    icon: 'tiktok'
  },
  {
    href: 'https://open.spotify.com/artist/71UtY1hfa00hP9xNgPDs96',
    label: 'Spotify',
    icon: 'spotify'
  },
  {
    href: 'https://www.youtube.com/@liljairini',
    label: 'YouTube',
    icon: 'youtube'
  }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-social">
        <a
          v-for="link in socialLinks"
          :key="link.href"
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
        >
          {{ link.label }}
        </a>
      </div>

      <p class="footer-copyright">
        &copy; {{ currentYear }} Irini. {{ t('footer.allRightsReserved') }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--space-lg) var(--space-md);
  border-top: 1px solid rgba(233, 238, 255, 0.1);
}

.footer-container {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}

.footer-social-link {
  font-family: var(--font-display);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color var(--transition-fast);
}

.footer-social-link:hover {
  color: var(--color-accent-light);
}

.footer-copyright {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}
</style>
