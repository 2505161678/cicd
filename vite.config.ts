import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cicd/', // 设置 base 为仓库名
  plugins: [vue()],
});
