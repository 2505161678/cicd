// Service Worker版本号
const CACHE_NAME = 'my-app-cache-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/assets/vue.svg'
]

// 安装Service Worker并缓存静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// 拦截网络请求并提供缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// 监听激活事件，清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 监听推送事件
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json()
    if (data.type === 'update') {
      event.waitUntil(
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'update' })
          })
        })
      )
    }
  }
})

// 监听消息事件
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})
