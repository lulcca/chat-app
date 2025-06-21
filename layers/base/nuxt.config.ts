export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    './layers/base/app/assets/css/main.css',
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
    '@nuxt/ui',
    '@nuxtjs/mdc',
  ],
});
