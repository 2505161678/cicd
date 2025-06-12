import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VITE_APP_VERSION } from './env'

// 在创建应用之前设置全局版本变量
window.__APP_VERSION__ = VITE_APP_VERSION

export default defineConfig({
  plugins: [vue()],
  define: {
    __APP_VERSION__: JSON.stringify(VITE_APP_VERSION)
  }
})