import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/palavras-embaralhadas/',
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
})
