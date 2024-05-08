import { useRouterStore } from '@/stores/router'
export default function useIOSTouchEvent() {
  const routerStore = useRouterStore()
  let touchStartX = 0
  let touchEndX = 0
  let touchStartY = 0
  let touchEndY = 0
  const threshold = 50 // 阈值

  function handleGesture() {
    let diffX = touchEndX - touchStartX
    let diffY = touchEndY - touchStartY

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // 检查是否是水平滑动
      if (diffX > 0 && touchStartX < threshold) {
        routerStore.setIsIosTouchEventBack(true)
      }
      if (diffX < 0 && touchStartX > window.innerWidth - threshold) {
        routerStore.setIsIosTouchEventForward(true)
      }
    }
  }

  window.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].pageX
      touchStartY = event.changedTouches[0].pageY
    },
    false
  )


  window.addEventListener('touchmove', (event) => {
    touchEndX = event.changedTouches[0].pageX
    touchEndY = event.changedTouches[0].pageY
    handleGesture()
  })
}
