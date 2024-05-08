import { defineStore } from 'pinia'
import { getCountryCodeList, getQueryDetail } from '@/api/app'
import { ERR_OK } from '@/utils/config'
import { getDefaultLanguage } from '@/i18n'
import { getGameListApi } from '@/api/game'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
const { deviceId } = getDeviceInfo()
export const useAppStore = defineStore('app', {
  state: () => ({
    language: getDefaultLanguage(),
    darkMode: false,
    countryList: [],
    gameTypeList: [],
    deviceId: deviceId,
    maintainInfo: {}
  }),
  getters: {
    getMaintainStatus() {
      const arr = this.maintainInfo?.point.split(',')
      const isMaintain = this.maintainInfo?.status === '1' && arr.includes('0')
      return isMaintain || undefined
    }
  },
  actions: {
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
      const { data } = await getQueryDetail({ point: '0' })
      this.maintainInfo = data || {
        content: '',
        endTime: '',
        id: 0,
        point: '0',
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
