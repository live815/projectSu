export function useRefresh() {
  // 刷新页面
  const isRouteAlive = ref(true)
  provide('reload', () => {
    isRouteAlive.value = false
    nextTick(() => {
      isRouteAlive.value = true
    })
  })

  return {
    isRouteAlive
  }
}
