// import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  // Este objeto abaixo se relaciona com o Nuxt-Security que eu desativei por causa de problema no build.
  // security: {
  //   corsHandler: {
  //     origin: '*',
  //     methods: '*',
  //     allowHeaders: '*',
  //     exposeHeaders: '*',
  //   }
  // },
  //...
  css: ['vuetify/lib/styles/main.sass'],
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    'nuxt-pdfmake',
    // 'nuxt-security',
    'nuxt3-leaflet',
    'nuxt-plotly'
  ],
  vite: {
    optimizeDeps: {
      include: ["plotly.js-dist-min"],
    },
    define: {
      'process.env.DEBUG': false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
