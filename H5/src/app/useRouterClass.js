import { useBetCartStore } from '@/stores/betCart'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export function useRouterClass() {
  const betCartStore = useBetCartStore()
  const currentRoute = useRoute()
  const isShowTabbar = computed(() => currentRoute.meta?.isShowTabbar)
  const isShowBetCart = computed(() => currentRoute.meta?.isShowBetCart)
  const getClass = computed(() => {
    if (isShowTabbar.value && betCartStore.betList.length && isShowBetCart.value) {
      return 'padding-large'
    } else if (isShowTabbar.value) {
      return 'padding-mid'
    } else if (betCartStore.betList.length && isShowBetCart.value) {
      return 'padding-sm'
    } else {
      return ''
    }
  })
  const isHomePage = computed(() => {
    return currentRoute.name === 'home'
  })
  console.log(currentRoute)
  return {
    getClass,
    isShowTabbar,
    isHomePage
  }
}
