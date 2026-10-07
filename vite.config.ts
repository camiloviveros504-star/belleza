import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    // Three.js (~1 MB) va en su propio chunk diferido: solo se descarga para la escena 3D del inicio.
    chunkSizeWarningLimit: 1100,
  },
})
