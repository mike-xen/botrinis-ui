// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@pinia-plugin-persistedstate/nuxt',
    "@formkit/auto-animate/nuxt",
  ],

  googleFonts: {
    families: {
      'Noto Serif': true,
      'Inter': true,
    }
  },

  devtools: {
    enabled: true,
  },
})
