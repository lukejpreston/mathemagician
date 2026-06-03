import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/mathemagician/',
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sanctum: resolve(__dirname, 'sanctum/index.html'),
        scroll: resolve(__dirname, 'scroll/index.html'),
        tower: resolve(__dirname, 'tower/index.html'),
        about: resolve(__dirname, 'about/index.html'),
      },
    },
  },
})
