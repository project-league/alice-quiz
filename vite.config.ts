import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves the app from /<repo-name>/
export default defineConfig({
  base: '/alice-quiz/',
  plugins: [react()],
})
