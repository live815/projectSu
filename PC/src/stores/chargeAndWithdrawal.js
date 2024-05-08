import { defineStore } from 'pinia'
import { getOrderNoStatus,getOrderNo } from '@/api/recharge.js'
// import {  setOrderInfo, removeOrderInfo } from '@/utils/cache'
import { useOpenNewWindow } from '@/hooks/useOpenNewWindow'
import router from '@/router'

// import { stopTimer } from '@/hooks/useGlobalTimer'
// const pageId = 'PageA'
const { openNewWindow,closeNewWindow } = useOpenNewWindow()

export const useChargeAndWithdrawal = defineStore('chargeAndWithdrawal', {
  state: () => {
    return {
      currentShow: 1, //当前显示的页面的状态码 1=充值页面 2=提款页面
      currentType: 0, //当前选择的类型 0=普通类型 1=虚拟币类型
      detailType:0, // 详情字段，1代表充值详情，2代表提现详情
      isRecharge:false,// 是否已经点击充值 默认false
      orderNo: '', // 订单号
      orderDetail: {}, // 当前订单详情
      orderStatus:{}, // 订单状态 
      isupLoad:0, // 0没有上传图片，1代表上传了图片
      userUploadImg: {
        receiptImg: [],
        bankSlipImg: []
      },
      timerType:true, // 定时器默认开启
      bankSupport:[], // 普通充值列表数据
      cryptoDpChannelList:[],// 虚拟币充值列表数据
      isCourse:false, // 是否显示虚拟币教程
      cardBinded:'', // 是否绑定了银行卡
      phoneBinded:'', // 是否绑定了手机号
      currentMethod: 0  // 当前充值通道索引
    }
  },
  getters: {},
  actions: {
    // 改变充值详情状态
    changeDetailType(data) {
      this.detailType =  data
    },
    // 点击切换充值类型
    changeCurrentType(val) {
      this.currentType = val
    },
    // 普通充值订单详情信息
    addOrderDetail(data){
      this.orderDetail = data
      // setOrderInfo(this.orderDetail)
      if(data.action == 'jump' || data.action == null){
        openNewWindow(data.url)
      }
    },
    // 查询查询正在进行中的充值订单的收银台详情
    getRecentlyOrder(data) {
      return getOrderNo(data).then(res=>{
        if(res.data){
            const { status } = res.data
            if (status == 1 || status == 3 || status == 4 || status == 5 || status == 6) {
              this.currentShow = 1
              this.currentType = 0
              this.detailType = 0
              this.isupLoad = 0
              this.isRecharge = false
              this.timerType = false
              if(res.data.action == 'jump' || res.data.action == null) {
                closeNewWindow()
              }
              // removeOrderInfo()
            }else {
              this.detailType = 1
              this.orderDetail = res.data || {}
              if(res.data.receiptUploaded == '1') {
                this.isupLoad = 1
              }
              router.push('/personal/1')
              // if(res.data.action == 'jump' || res.data.action == null){
              //   openNewWindow(res.data.url)
              // }
              // setOrderInfo(this.orderDetail)
            }
          }else {
            this.currentShow = 1
            this.currentType = 0
            this.detailType = 0
            this.isupLoad = 0
            this.isRecharge = false
            // removeOrderInfo()
            // stopTimer(pageId)
          }
      })
    },
   // 查询订单状态
   getOrderStatus(data) {
    return getOrderNoStatus(data).then(res=>{
      if(res.data){
        this.orderStatus = res.data
        const { status } =  res.data
        if (status == 1 || status == 3 || status == 4 || status == 5 || status == 6) {
          this.currentShow = 1
          this.currentType = 0
          this.detailType = 0
          this.isupLoad = 0
          this.isRecharge = false
          this.timerType = false
          closeNewWindow()
          // removeOrderInfo()
        }
      }
    }).catch(() =>{
        })
   }
  }
})
