import { defineStore } from 'pinia'
import {getCollectIds,setCollectIds} from '@/utils/cache'
export const useSlotGameStore = defineStore('slotGame',{
  state:()=>({
    collectIds:getCollectIds() // 收藏id列表,
    
  }),
  actions:{
    collect(gameId){
      let idx = this.collectIds.findIndex(id=>id==gameId)
       // 如果已收藏
      if(idx>-1){
        // 取消收藏
        this.collectIds.splice(idx,1)
      }else{
        // 添加收藏
        this.collectIds.push(gameId)
      }
      // 本地緩存
      setCollectIds(this.collectIds)
    }
  }
})