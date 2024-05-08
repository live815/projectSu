import { webviewBridgeRedirect } from '@/utils'
import { usePlayGame } from '@/hooks/usePlayGame.js'
import { SLOT_TYPE_ID } from '@/utils/config'
import { useAppStore } from '@/stores/app'
import { showToast } from 'vant'
import i18n from '@/i18n/index'
export function jumpActivity({ event, router }) {
  const types = {
    webUrl: 1, // 跳转外链
    none: 2, //不跳转
    event: 3, //对应活动
    game: 4 //对应场馆
  }
  let type = event.jumpType
  switch (type) {
    case types.webUrl:
      if (!event.jumpContent.startsWith('http'))
        router.push(event.jumpContent + `?title=${event.title.replace('%', '%25')}`)
      else
        webviewBridgeRedirect({
          url: event.jumpContent + `?title=${event.title.replace('%', '%25')}`
        })
      return
    case types.none:
      return
    case types.event:
      jumpByTemplateType(event, router)
      return
    case types.game:
      var game = {
        stadiumId: event.stadiumId, // 缺少游戏分类
        id: event.lobbyId,
        lobbyName: event.jumpContent,
        isMaintain: event.isMaintain // 缺少字段
      }
      // 电子游戏类型则默认选择一个正在启用状态的电子游戏
      if (game.stadiumId == SLOT_TYPE_ID) {
        var appStore = useAppStore()
        var slotType = appStore.gameTypeList.find((gameType) => gameType.id == SLOT_TYPE_ID)
        if (slotType) {
          var slotGame = slotType.gameList.find((sgame) => !sgame.isMaintain)
          if (slotGame) {
            router.push(`/sub-game/${slotGame.id}?title=${slotGame.lobbyName}`)
          } else {
            showToast(i18n.global.t('common.noSlotGame'))
          }
        } else {
          showToast(i18n.global.t('common.noSlotGame'))
        }
      } else {
        usePlayGame(game, router)
      }
      return
  }
}

function jumpByTemplateType(event, router) {
  console.log('eventTemplateType', event.eventTemplateType)
  const query = {
    advertiseId: event.id,
    activityId: event.jumpContent,
    type: event.type,
    title: event.title
  }

  // 首存活动
  if (event.eventTemplateType === 1) router.push({ path: '/first-charge', query })
  // 赛事
  if (event.eventTemplateType === 2) router.push({ path: '/game-activity', query })
  // 新手任务
  if (event.eventTemplateType === 3) router.push({ path: '/newbie-activity', query })
  // 轮盘
  if (event.eventTemplateType === 4) router.push({ path: '/luckyWheel', query })
  // 返水
  if (event.eventTemplateType === 8) router.push({ path: '/rebate-activity', query })
}
