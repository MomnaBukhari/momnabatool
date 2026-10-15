import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Three.js is one large library. It is split into its own file and only
    // downloaded after the page has rendered, so the larger limit is deliberate.
    chunkSizeWarningLimit: 600,
  },
})
