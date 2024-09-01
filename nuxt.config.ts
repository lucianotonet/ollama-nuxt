// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'static',
    routeRules: {
      '/api/**': { proxy: 'http://127.0.0.1:11434/api/**', cors: true },
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
})
