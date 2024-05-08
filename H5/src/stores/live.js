import { defineStore } from 'pinia'
import { getLiveList, getPresenterList, getReserveLiveList, getSatelliteLiveList } from '@/api/live'
import { ERR_OK } from '@/utils/config'
import { useUserStore } from '@/stores/user.js'

const user = useUserStore()
export const useLiveList = defineStore('liveList', {
  state: () => ({
    liveList: [], //直播列表
    streamerLive: {}, //主播列表
    reservationList: [], // 已预约直播列表
    anchorsPushOrders: [], // 主播推单列表
    matchAnchorArr: [], // 直播当前赛事的所有主播
    satelliteLive: {}, // 卫星直播列表
    isConnected: false,
    videoSource: 'video1' // video1破晓，video2 pm视频源
  }),
  actions: {
    getLiveListAction(data) {
      getLiveList(data).then((res) => {
        if (res.code === ERR_OK) {
          this.liveList = res.data.list || []
        }
      })
    },
    getStreamerLive() {
      getPresenterList().then((res) => {
        if (res.code === ERR_OK) {
          this.streamerLive = res.data || {}
        }
      })
    },
    getReserveLiveListAction() {
      getReserveLiveList(user.userInfo.id).then((res) => {
        this.reservationList = res.data
      })
    },
    getSatelliteLiveList(params) {
      getSatelliteLiveList(params).then((res) => {
        if (res.code === ERR_OK) {
          this.satelliteLive = res.data || {}
        }
      })
    },
    switchLines(line) {
      this.videoSource = line
    }
  }
})
