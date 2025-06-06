<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from 'vue'
import { useEtagUpdateChecker } from './useEtagUpdateChecker'

const { start , hasUpdate} = useEtagUpdateChecker({ url: window.location.pathname })
const reload = () => {
  window.location.reload()
}
onMounted(() => {
  start()
})
</script>

<template>
  <div>
  </div> 
  <HelloWorld msg="" />
  <div v-if="hasUpdate" class="update-notice">
    检测到页面有新版本，<button @click="reload">点击刷新!!!!</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.update-notice {
  margin: 20px auto;
  padding: 16px 24px;
  background: #fffbe6;
  color: #ad6800;
  border: 1px solid #ffe58f;
  border-radius: 6px;
  display: inline-block;
  font-size: 1.1em;
}
.update-notice button {
  margin-left: 12px;
  background: #ffd666;
  color: #ad6800;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-weight: bold;
}
.update-notice button:hover {
  background: #ffe58f;
}
</style>
