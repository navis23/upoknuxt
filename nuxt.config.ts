// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
      shim: false
    },
    app: {
      head: {
        charset: 'utf-16',
        viewport: 'width=device-width, initial-scale=1',
        title: 'E-Inventory Permata Motor',
        meta: [
          // <meta name="description" content="My amazing site">
          { name: 'description', content: 'E-Inventory system for Permata Motor Based on Gresik' }
        ],
      },
      pageTransition: { name: 'slide-fade', mode: 'out-in' }
    },
    modules: [
      'nuxt-icon',
      '@pinia/nuxt',
      'nuxt-headlessui',
      '@formkit/nuxt',
      '@nuxt/image-edge'
    ],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
    },    
    pinia: {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        'storeToRefs',
      ],
    },
    headlessui: {
      prefix: 'Headless'
    }
    
    
})
