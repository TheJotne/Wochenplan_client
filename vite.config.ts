import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import tailwindcss from 'tailwindcss'
// https://vitejs.dev/config/
export default defineConfig({
  base: "/Wochenplan_client",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    commonjsOptions: {
      exclude: ['pdfmake/*', "pdfFonts/*"],
    },
  }

})

