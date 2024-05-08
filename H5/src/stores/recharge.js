import { defineStore } from 'pinia'
import { getBankSupport, getBankOrder, getOrderNoStatus } from '@/api/recharge'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n/index'

export const useRechargeStore = defineStore('recharge', {
  id: 'recharge',
  state: () => ({
    isShowDeposit: false, // 充值页面是否维护中
    isShowOverlay: false, // 支付充值风险提示弹窗
    cardBinded: '', // 是否绑定银行卡
    dpChannelList: [], // 普通充值列表通道
    cryptoDpChannelList: [], // 虚拟币充值通道
    phoneBinded: '', // 是否绑定手机号
    orderData: {}, // 订单详情信息
    orderStatus: {}, // 订单状态
  }),
  getters: {
    orderDataList() {
      return this.orderData
    },
    orderDataStatus() {
      return this.orderStatus
    }
  },

  actions: {
    // 获取银行卡通道充值
    getSupport() {
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      return getBankSupport()
        .then((res) => {
          if (res.data) {
            this.dpChannelList = res.data.dpChannelList || []
            ;(this.cryptoDpChannelList = res.data.cryptoDpChannelList || []),
              (this.cardBinded = res.data.cardBinded)
            this.phoneBinded = res.data.phoneBinded
          } else {
            this.isShowDeposit = true
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    },
    ShowOverlay() {
      this.isShowOverlay = !this.isShowOverlay
    },
    // 普通充值
    getOrders(data) {
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      return getBankOrder(data)
        .then((res) => {
          if (res.data && res.code == 200) {
            this.orderData = res.data
          }else {
            this.orderData = {}
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    },
    // 查询订单状态
    getOrderStatus(data) {
      return getOrderNoStatus(data)
        .then((res) => {
          if (res.data) {
            this.orderStatus = res.data
          }
        })
        .catch(() => {})
    },
    // c2c 充值
    getc2cOrderList(data) {
      this.orderData = data
    }
  }
})
