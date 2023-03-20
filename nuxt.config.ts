// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
      shim: false
    },
    app: {
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
