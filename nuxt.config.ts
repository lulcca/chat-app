export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/css/main.css',
  ],
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  mdc: {
    highlight: {
      langs: [
        'html',
        'javascript',
        'markdown',
        'typescript',
        'vue',
      ],
      theme: 'material-theme-palenight',
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/mdc',
  ],
  runtimeConfig: {
    openaiApiKey: '',
  },
});
