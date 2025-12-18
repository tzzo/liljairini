// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content'],

  // Enable SSR and prerendering for static site
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/media', '/contact']
    }
  },

  // TypeScript strict mode
  typescript: {
    strict: true
  },

  // App configuration
  app: {
    head: {
      title: 'Irini | Official Website',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Official website of Irini - Music artist' },
        { property: 'og:title', content: 'Irini | Official Website' },
        { property: 'og:description', content: 'Official website of Irini - Music artist' },
        { property: 'og:image', content: '/irini.png' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap' }
      ]
    }
  },

  // Global CSS
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/global.css'
  ],

  // Content module configuration
  content: {
    // Enable YAML parsing
  }
})
