import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. CONFIGURACIÓN DE RUTA BASE PARA GITHUB PAGES
  base: "/2025FRONTED.GAMETRACKER/",
  
  // 2. INYECCIÓN DE LA CLAVE RAWG EN EL CÓDIGO DE PRODUCCIÓN
  // Esto soluciona el error 401 que ocurre cuando se ejecuta npm run deploy
  define: {
    'import.meta.env.VITE_RAWG_KEY': JSON.stringify('1d74913aa60c428c8a8f4bed0799fac4'),
  },
})