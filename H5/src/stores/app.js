import { defineStore } from 'pinia'
import { getCountryCodeList, getQueryDetail } from '@/api'
import { getGameListApi } from '@/api/game'
import { ERR_OK, SPORT_TYPE_ID, C_SPORT_GAME_ID } from '@/utils/config'
import { getDefaultLanguage } from '@/i18n'

export const useAppStore = defineStore('app', {
  state: () => ({
    language: getDefaultLanguage(),
    menuStatus: false,
    darkMode: false,
    countryList: [],
    gameTypeList: [],
    isShowDownload: true,
    maintainInfo: {}
  }),
  getters: {
    isCSportOpen() {
      return this.gameTypeList
        .find((gameType) => gameType.id === SPORT_TYPE_ID)
        ?.gameList.find((game) => game.id === C_SPORT_GAME_ID)
    },
    getMaintainStatus() {
      const arr = this.maintainInfo?.point.split(',')
      const isMaintain = this.maintainInfo?.status === '1' && arr.includes('1')
      return isMaintain || undefined
    }
  },
  actions: {
    // 国家区号列表
    getCountryCodeList() {
      getCountryCodeList().then((res) => {
        if (res.code === ERR_OK) {
          this.countryList = res.data || []
        }
      })
    },
    // 游戏列表
    getGameTypeList() {
      getGameListApi().then((res) => {
        const data = res.data || []
        data.forEach((item, idx) => {
          // 添加维护状态字段
          item.isMaintain = isMaintain(item)
          item.gameList.forEach((subItem) => {
            subItem.isMaintain = isMaintain(subItem)
          })
          // 添加游戏类型，用于分类标识
          if (!('gameType' in item)) {
            const gameType = idx + 1
            item.gameType = gameType
            item.gameList.forEach((subItem) => {
              subItem.gameType = gameType
            })
          }
        })
        this.gameTypeList = data
      })
    },
    async getMaintainInfo() {
      const { data } = await getQueryDetail({ point: '1' })
      this.maintainInfo = data || {
        content: '',
        endTime: '',
        id: 0,
        point: '1',
        startTime: '',
        status: '0',
        title: ''
      }
    }
  }
})

function isMaintain(item) {
  let now = new Date()
  return new Date(item.startTime) < now && now < new Date(item.endTime)
}
