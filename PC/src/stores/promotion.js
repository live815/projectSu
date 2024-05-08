import { defineStore } from 'pinia'
import { ERR_OK } from '@/utils/config'
import { getAdvertiseApi, getAdvertiseSingleApi } from '@/api/promotion'
import { useUserStore } from '@/stores/user.js'
import { watch } from 'vue'
import { getPublicIPAddress } from '@/utils'
import { checkDailyFlag } from '@/utils/dailyFlag.js'

export const promotionStore = defineStore('promotion', () => {
  const user = useUserStore()
  const isLogin = computed(() => user.isLogin)
  const userInfo = computed(() => user.userInfo)

  const demo = () => {
    // console.log(promotionData.value.eventList)
  }
  // 判断是否显示首页弹窗
  const isShowHomeAds = ref(true)
  // 获取广告数据
  const promotionListRowData = ref()
  const getAdvertise = () => {
    if (user.isLogin) {
      getAdvertiseApi().then((res) => {
        if (res.code == ERR_OK) {
          promotionListRowData.value = res.data
          categoryData()
        } else {
          // console.log(res)
        }
      })
    } else {
      getPublicIPAddress().then((ip) => {
        getAdvertiseApi('1', ip).then((res) => {
          promotionListRowData.value = res.data
          categoryData()
        })
      })
    }
  }

  // 获取活动列表
  const getAdvertiseSingle = (obj) => {
    if (user.isLogin) {
      getAdvertiseSingleApi(obj).then(() => {})
    } else {
      obj.tenantId = 1
      getAdvertiseSingleApi(obj).then(() => {})
    }
  }
  // 分类整理数据
  const categoryData = async () => {
    // 重置数据
    Object.keys(promotionData.value).forEach((key) => {
      promotionData.value[key] = []
    })
    if (!promotionListRowData.value) {
      return
    }
    if (user.isLogin) {
      while (userInfo.value.vipLevel === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }

    promotionListRowData.value.sort((a, b) => b.weight - a.weight)

    // 数据分类
    promotionListRowData.value.forEach((item) => {
      const type = item.type
      const dataListKey = typeMapping.value[type]
      const status = item.status
      // 筛选一天一次的弹窗图

      if (dataListKey && status) {
        promotionData.value[dataListKey].push(item)
      }
    })
    Object.keys(promotionData.value).forEach((key) => {
      promotionData.value[key].sort((a, b) => b.weight - a.weight)
    })
  }

  const promotionData = ref({
    // 首页轮播图数据 =1
    homeViewImgList: null,
    // 活动列表数据 =2
    eventList: null,
    // 首页弹窗数据 =3
    AdsPopData: null,
    // 启动页数据 =4
    startPageDate: null,
    // 悬浮窗数据 =5
    floatWindowData: null,
    // 支付广告数据 =6
    paymentAdsData: null,
    // 个人中心数据 =7
    personalCenterData: null,
    // 爆料广告 = 8
    planBanner: null
  })

  // 监视登录状态重新请求
  watch(isLogin, (newValue) => {
    Object.keys(promotionData.value).forEach((key) => {
      promotionData.value[key] = []
    })
    getAdvertise()
  })

  // 广告类型map
  const typeMapping = ref({
    1: 'homeViewImgList',
    2: 'eventList',
    3: 'AdsPopData',
    4: 'startPageDate',
    5: 'floatWindowData',
    6: 'paymentAdsData',
    7: 'personalCenterData',
    8: 'planBanner'
  })

  return {
    demo,
    promotionListRowData,
    promotionData,
    isShowHomeAds,
    getAdvertise,
    getAdvertiseSingle
  }
})
