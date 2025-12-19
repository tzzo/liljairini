<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const navLinks = computed(() => [
  { to: localePath('/contact'), label: t('nav.contact') }
])

const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()

const availableLocales = computed(() =>
  locales.value.filter((l) => typeof l !== 'string' && l.code !== locale.value)
)
</script>

<template>
  <nav class="nav">
    <div class="nav-container">
      <NuxtLink :to="localePath('/')" class="nav-logo">
        <IriniLogo :width="120" :height="45" />
      </NuxtLink>

      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="nav-link"
            :class="{ 'is-active': route.path === link.to }"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
        <li class="nav-lang-switcher">
          <NuxtLink
            v-for="loc in availableLocales"
            :key="loc.code"
            :to="switchLocalePath(loc.code)"
            class="nav-link nav-lang"
          >
            {{ loc.name }}
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
  width: 80px;
  @media (min-width: 768px) {
    width: 120px;
  }
}

.nav-logo:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  align-items: center;
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

.nav-lang-switcher {
  margin-left: var(--space-sm);
  padding-left: var(--space-md);
  border-left: 1px solid rgba(233, 238, 255, 0.2);
}

.nav-lang {
  font-size: var(--text-sm);
  text-transform: uppercase;
}

@media (max-width: 480px) {
  .nav-links {
    gap: var(--space-md);
  }

  .nav-link {
    font-size: var(--text-base);
  }

  .nav-lang-switcher {
    margin-left: var(--space-xs);
    padding-left: var(--space-sm);
  }
}
</style>
