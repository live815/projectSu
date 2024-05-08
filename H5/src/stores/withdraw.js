import { defineStore } from 'pinia'
import { getLargeWithdrawLimit } from '@/api/withdraw'

export const useWithdrawStore = defineStore('withdraw',{
  id: 'withdraw',
  state:() =>({
    largeWithdrawLimit:{}, // 大额提现规则信息
    wdChannelTypeList:[]// 提现类型列表
  }),
  getters:{
  },
  actions:{
      // 拉取大额提现规则信息
      getLargeWithdrawLimitData() {
        getLargeWithdrawLimit().then((res) => {
          this.largeWithdrawLimit= res.data
        })
   .catch(() =>{
        })
    }
}
})