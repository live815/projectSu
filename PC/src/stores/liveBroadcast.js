// src/store/modules/user.js
import { defineStore } from 'pinia'
import { getStreamList, getAnchorNum } from '@/api/liveBroadcast'
import { arrSort } from '@/utils/cache'

export const useLiveStore = defineStore('liveBroadcast', {
  state: () => ({
    dataList: [], //主播信息
    liveRoom: {}, //直播对象
    matchList: [], //卫星
    giftList: [], //送礼物的
    countAnchor: 0,
    isUpward: false,
    roomSportType: 0, //0 主播 1足球 2 篮球
    anchorStatus: 0, //是否在主播直播页面 1是 0 否
    anchorGift: [], //主播礼物记录
    anchorOrder: [], //主播跟单记录
    videoSource: [], //卫星视频源
    videoSourceGather: {},
    indentWidth: 200, //导航栏 缩进宽度
    listGift: [], //礼物列表
    liveMatchScore: [],
    liveBtn: true //聊天室全屏按钮
  }),
  actions: {
    setDataList(dataList) {
      this.dataList = dataList
    },
    setLiveRoom(liveRoom) {
      this.liveRoom = liveRoom
    },
    setIsUpward(isUpward) {
      this.isUpward = isUpward
    },
    //主播
    async getList(currenTab) {
      try {
        let res = await getStreamList({
          presenterId: currenTab.value,
          page: 1,
          pageSize: 999,
          dataResource: '4'
        })
        if (res.code == 200) {
          this.tableData = []
          let arr = res.data.list
          arr = arrSort(arr)
          this.dataList = arr
          if (arr?.length > 0) {
            this.liveRoom = this.dataList[0]
          } else {
            this.liveRoom = {}
          }
        } else {
          this.tableData = []
        }
      } catch (e) {
        // console.log(e.message)
      }
    },
    async anchorCount(presenterId) {
      try {
        let res = await getAnchorNum(presenterId)
        this.countAnchor = res.data
      } catch (error) {
        // console.log(error)
      }
    }
  }
})
