import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://videoplayerapi.onrender.com',
    },
  },

  routes: [
    { path: '/', component: '/src/components/Layout.jsx' },
    { path: '/AddVideo', component: '/src/components/AddVideo.jsx' },
    { path: '/seevideos/:id/:subtitle_id', component: '/src/components/SeeVideo.jsx' },
  ],
})
