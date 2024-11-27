import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': '/src/',
      '~/': '/src/',
    },
  },

  base: '/',
  plugins: [vue()],
})
