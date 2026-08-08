import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build 100% estático → gera a pasta dist/ pronta para Netlify, Cloudflare Pages,
// S3 ou qualquer hospedagem compartilhada. Sem servidor, sem API.
export default defineConfig({
  plugins: [react()],
  // base: './' permite hospedar em subpasta (ex.: dominio.com/site/) sem quebrar os assets.
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // GSAP em chunk separado: melhora o cache entre deploys.
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
})
