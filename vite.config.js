import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/20251210_VC-Project01/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
