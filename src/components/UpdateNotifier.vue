<template>
  <div v-if="showUpdate" class="update-notice">
    <div class="update-content">
      <p>新版本可用！</p>
      <p>请刷新页面以获取最新内容。</p>
      <button @click="refreshPage">立即刷新</button>
      <button @click="dismissUpdate">稍后提醒</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showUpdate = ref(false)
const updateInterval = ref(null)

const checkForUpdates = async () => {
  try {
    const response = await fetch('/api/health')
    if (response.ok) {
      const data = await response.json()
      if (data.version !== window.__APP_VERSION__) {
        showUpdate.value = true
      }
    }
  } catch (error) {
    console.error('更新检查失败:', error)
  }
}

const refreshPage = () => {
  window.location.reload()
}

const dismissUpdate = () => {
  showUpdate.value = false
  // 5分钟后再次检查
  setTimeout(() => {
    showUpdate.value = true
  }, 5 * 60 * 1000)
}

onMounted(() => {
  // 每5分钟检查一次更新
  updateInterval.value = setInterval(checkForUpdates, 5 * 60 * 1000)
  // 页面加载时也检查一次
  checkForUpdates()
})

onUnmounted(() => {
  if (updateInterval.value) {
    clearInterval(updateInterval.value)
  }
})
</script>

<style scoped>
.update-notice {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.update-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.update-content p {
  margin: 0;
  color: #333;
}

.update-content button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}

.update-content button:hover {
  background-color: #0056b3;
}

.update-content button:last-child {
  background-color: #6c757d;
}

.update-content button:last-child:hover {
  background-color: #545b62;
}
</style>
