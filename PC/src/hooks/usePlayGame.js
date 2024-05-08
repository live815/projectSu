import i18n from '@/i18n/index'
import { entryGameApi } from '@/api/game'
import { C_SPORT_GAME_ID } from '@/utils/config'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

let gameWindow = null // 保存游戏窗口对象
export function usePlayGame(game, router) {
  const user = useUserStore()
  let isLogin = user.isLogin
  if (!isLogin) {
    user.setLoginDialogAction({
      isShowLoginDialog: true,
      currentPage: 'login'
    })
    return
  }
  if (game.isMaintain) return
  // 如果之前的游戏窗口存在且未关闭，则先关闭它
  if (gameWindow && !gameWindow.closed) {
    gameWindow.close()
  }

  if (game.hasSub) {
    router.push(`/electronic/${game.id}`)
    return
  }
  if (game.id === C_SPORT_GAME_ID) {
    // this.isClickBallType = false
    fbStore.isOperatedListCollapse = false
    fbStore.isOperatedMatchListCollapse = false
    router.push('/sports')
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  entryGameApi({
    lobbyId: game.id
  })
    .then((res) => {
      if (res.code === ERR_OK) {
        let url = res.data
        if (url) {
          // 使用新的游戏ID作为窗口名称，确保每个游戏有一个唯一的窗口
          gameWindow = window.open(url, game.id)
        } else {
          ElMessage({ type: 'warning', message: i18n.global.t('useSportDict.NoticeTips_1') })
        }
      }
      loading.close()
    })
    .catch(() => {
      loading.close()
    })
}

