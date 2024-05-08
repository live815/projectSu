import { defineStore } from 'pinia'
import { getLargeWithdrawLimit,getWithdrawOrderNoStatus,getWithdrawOrderNo } from '@/api/withdraw'
import { setWithdrawInfo, removeWithdrawInfo } from '@/utils/cache'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'


export const useWithdrawStore = defineStore('withdraw',{
  id: 'withdraw',
  state:() =>({
    largeWithdrawLimit:{}, // 大额提现规则信息
    wdChannelTypeList:[],// 提现类型列表
    isWithdraw:false,// 是否已经点击提现 默认false 
    bankCardInfo:{},// 提现信息(未提交状态)
    withdrawDetail: {}, // 当前订单详情
    orderNo: '', // 订单号
    orderStatus:{}, // 订单状态 
    withrawTimerType:true, // 提现定时器默认开启
    setpActive:1, // 步骤条顶部高亮
    subOrderList: [], // 子菜单状态
  }),
  getters:{
  },
  actions:{
      // 提现银行卡信息赋值
      getSubmitInformation(data){
        this.bankCardInfo = data
      },
      // 拉取大额提现规则信息
      getLargeWithdrawLimitData() {
       return  getLargeWithdrawLimit().then((res) => {
          this.largeWithdrawLimit= res.data
        })
   .catch(() =>{
        })
    },
      // 提现订单详情信息
      addwithdrawDetail(data){
        this.withdrawDetail = data
        setWithdrawInfo(this.withdrawDetail)
      },
      // 查询提现订单状态 轮询接口
      getWithdrawStatus(data) {
        const mainConfig = useChargeAndWithdrawal()
        return getWithdrawOrderNoStatus(data).then((res) =>{
          const orderStatus = res.data.orderStatus
          if (orderStatus == 0 || orderStatus == 1) {
            this.setpActive = orderStatus
            // this.withdrawDetail = res.data
            // setWithdrawInfo(this.withdrawDetail)
            mainConfig.changeDetailType(2)
          } else if (orderStatus == 4) {
            this.setpActive = 2
            // this.withdrawDetail = res.data
            // setWithdrawInfo(this.withdrawDetail)
            mainConfig.changeDetailType(2)
            // 订单轮询 如果有子菜单 才会取查数据
        if (res.data.subOrderStatusList?.length >= 2) {
          this.subOrderList = res.data.subOrderStatusList
      }
          } else if (orderStatus == 2 || orderStatus == 3) {
            this.withrawTimerType = false
            this.isWithdraw = false
            this.setpActive = 1
            removeWithdrawInfo()
            mainConfig.changeDetailType(0)
          }
          // const {status} = res.data
          // if (status == 4 || status == 7 || status == 9 || status == 12) {
          //   this.setpActive = 2
          //   this.withrawTimerType = false
          //   this.isWithdraw = false
          //   removeWithdrawInfo()
          //   mainConfig.changeDetailType(0)
          // } else if (status == 0 || status == 1) {
          //   this.setpActive = 0
          // } else if (status == 2) {
          //   this.setpActive = 0
          //   this.withrawTimerType = false
          //   this.isWithdraw = false
          //   removeWithdrawInfo()
          //   mainConfig.changeDetailType(0)
          // } else if (
          //   status == 3 ||
          //   status == 5 ||
          //   status == 6 ||
          //   status == 8 ||
          //   status == 10 ||
          //   status == 11 ||
          //   status == 13 ||
          //   status == 14 ||
          //   status == 15 ||
          //   status == 16
          // ) {
          //   this.setpActive = 1
          //   this.orderStatus = res.data
          // }
        })
      },
      // 查询订单
      getWithdrawOrderNoDetail(data){
        const mainConfig = useChargeAndWithdrawal()
        return getWithdrawOrderNo(data).then(res=>{
          if(res.data){
            const orderStatus = res.data.orderStatus
            if (orderStatus == 0 || orderStatus == 1) {
              this.setpActive = orderStatus
              this.withdrawDetail = res.data
              setWithdrawInfo(this.withdrawDetail)
              mainConfig.changeDetailType(2)
            } else if (orderStatus == 4) {
              this.setpActive = 2
              this.withdrawDetail = res.data
              setWithdrawInfo(this.withdrawDetail)
              mainConfig.changeDetailType(2)
            } else if (orderStatus == 2 || orderStatus == 3) {
              this.withrawTimerType = false
              this.isWithdraw = false
              this.setpActive = 1
              removeWithdrawInfo()
              mainConfig.changeDetailType(0)
            }
          }else {
            mainConfig.changeDetailType(0)
          }
        })
      }
}
})