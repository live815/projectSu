import { usePlayGame } from '@/hooks/usePlayGame.js'
import { SLOT_TYPE_ID } from '@/utils/config'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
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
      event.jumpContent.startsWith('http')
        ? window.open(event.jumpContent)
        : router.push(event.jumpContent)
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
            router.push(`/electronic/${slotGame.id}`)
          } else {
            ElMessage({
              message: i18n.global.t('common.noSlotGame'),
              type: 'warning'
            })
          }
        } else {
          ElMessage({
            message: i18n.global.t('common.noSlotGame'),
            type: 'warning'
          })
        }
      } else {
        // 跳转游戏
        usePlayGame(game, router)
      }
      return
  }
}

function jumpByTemplateType(event, router) {
  console.log(event)
  // 首存活动
  if (event.eventTemplateType === 1) {
    router.push({
      name: 'firstCharge',
      query: {
        advertise: event.id,
        activity: event.jumpContent,
        type: event.type
      }
    })
  }
  // 赛事
  if (event.eventTemplateType === 2) {
    router.push({
      name: 'gameActivity',
      query: {
        activityId: event.jumpContent,
        advertiseId: event.id,
        type: event.type
      }
    })
  }
  // 新手任务
  if (event.eventTemplateType === 3) {
    router.push({
      name: 'newbieActivity',
      query: {
        activityId: event.jumpContent,
        advertiseId: event.id,
        type: event.type
      }
    })
  }
  // 轮盘
  if (event.eventTemplateType === 4) {
    router.push({
      name: 'luckyWheel',
      query: {
        activityId: event.jumpContent,
        advertiseId: event.id,
        type: event.type
      }
    })
  }

  if (event.eventTemplateType === 8) {
    router.push({
      name: 'rebateActivity',
      query: {
        activityId: event.jumpContent,
        advertiseId: event.id,
        type: event.type
      }
    })
  }
}
