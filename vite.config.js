import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works on GitHub Pages whether the repo is
// "Arvolen.github.io" (root URL) or any other name (sub-path URL).
export default defineConfig({
  plugins: [react()],
  base: './',
})
