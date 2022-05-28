import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/devServer": {
        target: "", // here is dev server host
        changeOrigin: true,
        rewrite: path => path.replace(/^\/devServer/, '')
      }
    },
    fs: {
      strict: false
    }
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ]
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [] // here is third party ui library, see more detail in your library document
    }),
  ],
})
