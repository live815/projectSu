// store/slidesStore.js
import { defineStore } from 'pinia'
import { getqueryMemberRight,getQueryMemberVipLevels,getQueryMemberVipRebates,getQueryVipSwitchConfig,getQueryVipBetVerify } from '@/api/vip'
import { useUserStore } from '@/stores/user'
const user = useUserStore()


export const useSlidesStore = defineStore('vipSlides', {
  id: 'vipSlides',
  state: () => ({
    activeSlideIndex: null, // 当前轮播索引
    isSlideChanged: false,
    vipReward: {}, // 特权
    vipLevelsList: [], // vip等级列表
    vipRebates:[], // vip所有优惠
    vipSwitchConfigData:{},// vip开发配置
    relegationLeastDay:null,// 当前等级剩余天数
  }),
  getters: {
    getActiveSlideIndex: (state) => state.activeSlideIndex,
  },
  actions: {
    changeSlide(index) {
      this.activeSlideIndex = index
    },
    resetSlide() {
      this.activeSlideIndex = null
    },
    // 获取列表数据
    getList() {
      return Promise.all([getQueryMemberVipLevels(),getQueryMemberVipRebates(),getQueryVipSwitchConfig()])
        .then(([memberVipLevels,memberVipRebates,vipSwitchConfig]) => {
          this.activeSlideIndex = user.userInfo.vipLevel
          this.vipLevelsList = memberVipLevels.data
          this.vipRebates = memberVipRebates.data
          this.vipSwitchConfigData = vipSwitchConfig.data
        })
        .catch(() => {
     
        })
    },
    getMemberRightList(data){
      return getqueryMemberRight(data).then(res=>{
        this.vipReward = res.data
        if(user.userInfo.vipLevel ==  this.activeSlideIndex) {
          this.relegationLeastDay = res.data.relegationLeastDay
        }
      }) 
    }
  }
})
