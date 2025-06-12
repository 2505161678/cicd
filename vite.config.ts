import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VITE_APP_VERSION } from './env'
import { VitePWA } from 'vite-plugin-pwa'

// 在创建应用之前设置全局版本变量
window.__APP_VERSION__ = VITE_APP_VERSION

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Vue App',
        short_name: 'MyApp',
        description: 'My Vue 3 PWA App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  define: {
    __APP_VERSION__: JSON.stringify(VITE_APP_VERSION)
  }
})