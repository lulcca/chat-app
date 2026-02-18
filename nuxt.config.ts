export default defineNuxtConfig({
  $production: {
    nitro: {
      storage: {
        db: {
          driver: 'netlify-blobs',
          name: 'db',
        },
      },
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
  ],
  nitro: {
    storage: {
      db: {
        base: './.data',
        driver: 'fs',
      },
    },
  },
});
