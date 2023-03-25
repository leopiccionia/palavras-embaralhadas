import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import icons from 'unplugin-icons/vite'

export default defineConfig({
  base: '/palavras-embaralhadas/',
  plugins: [
    icons({
      defaultClass: 'icon',
    }),
    vue(),
  ],
})
