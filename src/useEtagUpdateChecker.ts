// 轮询检测 index.html 的 ETag，若变化则通知用户刷新页面
import { ref } from 'vue'

export function useEtagUpdateChecker({ interval = 10000, url = '/' } = {}) {
  const hasUpdate = ref(false)
  let lastEtag: string | null = null
  let timer: number | null = null

  async function checkEtag() {
    try {
      const res = await fetch(url, { method: 'HEAD', cache: 'no-store' })
      const etag = res.headers.get('etag')
      if (etag && lastEtag && etag !== lastEtag) {
        hasUpdate.value = true
        stop()
      }
      lastEtag = etag
    } catch (e) {
      // 网络错误忽略
    }
  }

  function start() {
    stop()
    checkEtag()
    timer = window.setInterval(checkEtag, interval)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  return { hasUpdate, start, stop }
}
