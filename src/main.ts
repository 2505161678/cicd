import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 注册Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration)
        
        // 监听更新事件
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // 新版本已安装，提示用户刷新
                showUpdateNotification()
              } else {
                // 首次安装
                console.log('Service Worker installed for the first time')
              }
            }
          }
        }
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error)
      })
  })
}

// 显示更新通知
function showUpdateNotification() {
  const notification = document.createElement('div')
  notification.className = 'update-notification'
  notification.innerHTML = `
    <div class="update-content">
      <p>新版本可用！</p>
      <p>请刷新页面以获取最新内容。</p>
      <button class="refresh-btn">立即刷新</button>
      <button class="dismiss-btn">稍后提醒</button>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // 添加按钮事件
  notification.querySelector('.refresh-btn')?.addEventListener('click', () => {
    window.location.reload()
    notification.remove()
  })
  
  notification.querySelector('.dismiss-btn')?.addEventListener('click', () => {
    notification.remove()
  })
}

// 添加更新通知样式
const style = document.createElement('style')
style.textContent = `
.update-notification {
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
`
document.head.appendChild(style)

// 注册Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration)
        
        // 监听更新事件
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // 新版本已安装，提示用户刷新
                showUpdateNotification()
              } else {
                // 首次安装
                console.log('Service Worker installed for the first time')
              }
            }
          }
        }
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error)
      })
  })
}

// 显示更新通知
function showUpdateNotification() {
  const notification = document.createElement('div')
  notification.className = 'update-notification'
  notification.innerHTML = `
    <div class="update-content">
      <p>新版本可用！</p>
      <p>请刷新页面以获取最新内容。</p>
      <button class="refresh-btn">立即刷新</button>
      <button class="dismiss-btn">稍后提醒</button>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // 添加按钮事件
  notification.querySelector('.refresh-btn')?.addEventListener('click', () => {
    window.location.reload()
    notification.remove()
  })
  
  notification.querySelector('.dismiss-btn')?.addEventListener('click', () => {
    notification.remove()
  })
}

// 添加更新通知样式
const style = document.createElement('style')
style.textContent = `
.update-notification {
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
`
document.head.appendChild(style)