import { ref, onMounted, onBeforeUnmount } from 'vue'

const timerMap = new Map()
export function useGlobalTimer(pageId,callback, interval = 3000) {
  const timerId = ref(null)

  onMounted(() => {
    startTimer()
  })

  onBeforeUnmount(() => {
    stopTimer()
  })

  function startTimer() {
    stopTimer()
    timerId.value = setInterval(callback, interval)
    timerMap.set(pageId, timerId.value)
  }

  function stopTimer() {
    const pageTimerId = timerMap.get(pageId)
    if (pageTimerId) {
      clearInterval(pageTimerId)
      timerMap.delete(pageId)
    }
  }

  return {
    startTimer,
    stopTimer
  }
}