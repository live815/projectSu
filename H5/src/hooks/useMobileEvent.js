import { useRouter, useRoute } from 'vue-router'
import { getMobilePlatform } from '@/utils/index'
import service from '@/utils/request'

export function useMobileEvent() {
  const router = useRouter()
  const route = useRoute()

  const token = new URLSearchParams(window.location.search).get('token')
  const isEmbeddedInMobile = token !== null && token === '' // 未登陆
  const isIOS = window.webkit && window.webkit.messageHandlers
  const isAndroid = getMobilePlatform() === 'Android' && window.android

  // APP登入
  const loginRedirect = () => {
    if (isEmbeddedInMobile) {
      if (isIOS && window.webkit.messageHandlers.loginRedirect) {
        window.webkit.messageHandlers.loginRedirect.postMessage('loginRedirect')
      } else if (isAndroid) window.android.loginRedirect('loginRedirect')
    } else router.push(`/login?redirect=${route?.fullPath}`)
  }

  // APP充值
  const depositRedirect = () => {
    if (token !== null) {
      if (isIOS && window.webkit.messageHandlers.depositRedirect) {
        window.webkit.messageHandlers.depositRedirect.postMessage('depositRedirect')
      } else if (isAndroid) window.android.depositRedirect('depositRedirect')
    } else router.push('/deposit')
  }

  // APP跳转到首页
  const homePageRedirect = () => {
    if (token !== null) {
      if (isIOS && window.webkit.messageHandlers.HomePageRedirect) {
        window.webkit.messageHandlers.HomePageRedirect.postMessage('HomePageRedirect')
      } else if (isAndroid) window.android.HomePageRedirect('HomePageRedirect')
    } else router.push('/')
  }

  // APP跳转到赛事详情
  const matchRedirect = (matchId) => {
    if (token !== null) {
      if (isIOS && window.webkit.messageHandlers.MatchPageRedirect) {
        window.webkit.messageHandlers.MatchPageRedirect.postMessage(matchId)
      } else if (isAndroid) window.android.MatchPageRedirect(matchId)
    } else router.push(`match-detail/${matchId}`)
  }

  // APP跳转到V体育
  const sportRedirect = () => {
    if (token !== null) {
      if (isIOS && window.webkit.messageHandlers.sportRedirect) {
        window.webkit.messageHandlers.sportRedirect.postMessage('sportRedirect')
      } else if (isAndroid) window.android.sportRedirect('sportRedirect')
    } else router.push(`/sports`)
  }

  onMounted(async () => {
    if (token) service.defaults.headers.common['Authorization'] = token
  })

  return {
    token,
    isEmbeddedInMobile,
    loginRedirect,
    depositRedirect,
    sportRedirect,
    homePageRedirect,
    matchRedirect
  }
}
