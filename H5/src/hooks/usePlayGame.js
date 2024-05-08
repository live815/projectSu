import { entryGameApi } from '@/api/game'
import { vueRouterWebview, webviewBridgeRedirect } from '@/utils'
import { getToken } from '@/utils/cache'
import { C_SPORT_GAME_ID } from '@/utils/config'
import { showToast, showLoadingToast } from 'vant'
import { ERR_OK,VR_LOTTERY } from '@/utils/config'
import i18n from '@/i18n/index'
export function usePlayGame(game, router, route) {
  let isLogin = getToken()
  if (!isLogin) {
    router.push(`/login?redirect=${route?.fullPath}`)
    return
  }
  if (game.isMaintain) {
    showToast(i18n.global.t('common.isMaintain'))
    return
  }
  if (game.hasSub) {
    router.push(`/sub-game/${game.id}?title=${game.lobbyName}`)
    return
  }
  if (game.id === C_SPORT_GAME_ID) {
    router.push('/sports')
    return
  }
  const loading = showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  entryGameApi({
    lobbyId: game.id
  })
    .then((res) => {
      loading.close()
      if (res.code === ERR_OK) {
        let url = res.data
        if (url) {
          let isHttps = new URL(url).protocol.includes('https')
          const noSupportIframeGame = [VR_LOTTERY].includes(game.id)
          let noSupportIframe = [!isHttps, noSupportIframeGame].some((bool) => bool)
          if (noSupportIframe) {
            webviewBridgeRedirect({ url })
          } else {
            vueRouterWebview({ url, title: game.lobbyName, router, redirect: route?.fullPath })
          }
        } else {
          showToast(i18n.global.t('common.serverBusy'))
        }
      }
    })
    .catch(() => {
      loading.close()
    })
}
