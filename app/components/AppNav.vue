<script setup lang="ts">
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/media', label: 'Media' },
  { to: '/contact', label: 'Contact' }
]

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="nav">
    <div class="nav-container">
      <NuxtLink to="/" class="nav-logo" @click="closeMenu">
        <IriniLogo :width="120" :height="45" />
      </NuxtLink>

      <button
        class="nav-toggle"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation"
        @click="toggleMenu"
      >
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
      </button>

      <ul class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="nav-link"
            :class="{ 'is-active': route.path === link.to }"
            @click="closeMenu"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(15, 61, 140, 0.8);
  backdrop-filter: blur(10px);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
  height: 100%;
}

.nav-logo {
  display: flex;
  align-items: center;
  color: var(--color-text);
  transition: opacity var(--transition-fast);
}

.nav-logo:hover {
  opacity: 0.8;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-xs);
  background: none;
  border: none;
  cursor: pointer;
}

.nav-toggle-bar {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-link {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-text);
}

.nav-link.is-active {
  border-bottom: 1px solid var(--color-accent);
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    background: rgba(15, 61, 140, 0.98);
    transform: translateX(100%);
    transition: transform var(--transition-smooth);
  }

  .nav-links.is-open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: var(--text-2xl);
  }
}
</style>
