<template>
  <div class="DropDownBox-view">
    <div class="matchtitle">{{ lists.lg?.na }}</div>
    <div class="matchs" :class="{'active':active == index}" v-for="(item,index) of fbStore.rightDropDownList" :key="index" @click.stop="changeRightevent(item,index)">
      <div class="tname"><img :src="item.ts[0].lurl || defaultTeamIcon" alt=""><p  class="tsname" :title="item.ts[0].na">{{ item.ts[0].na }}</p></div>
      <div class="center">
        <div class="score">
          <!-- 第一行 比赛状态 -->
          <span v-if="item.mc" class="num">{{ getMatchStatus(item, fbStore) }}</span>
          <!-- 赛事计时 -->
          <Counter
            v-if="item.mc.hasOwnProperty('s') && item.mc.s >= 0"
            :tp="item.mc.tp"
            :s="item.mc.s"
            :r="item.mc.r"
          />
        </div>
        <!-- 第二行 比分 -->
        <div v-if="NotStarted(item)" class="vs">vs</div>
        <div v-else class="scores">
          {{ getScore(item?.nsg, 0) || 0 }}-{{ getScore(item?.nsg, 1) || 0 }}
        </div>  
        
        <!-- 第三行 其他阶段数据比分 -->
        <div v-if="[0, 4].includes(fbStore.matchDetailList?.ms)" class="game-state-text">
          - {{ getMatchStageText(fbStore.matchDetailList?.ms) }} -
        </div>
      </div>
      <div  class="tname"><img :src="item.ts[1].lurl || defaultTeamIcon" alt=""><p class="tsname" :title="item.ts[1].na">{{ item.ts[1].na }}</p></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {  getMatchStatus,NotStarted,getMatchStageText } from '@/hooks/useSportDict'
import Counter from '../MiddleSide/Counter.vue'
import defaultTeamIcon from './img/default-team-logo.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

// const dropDownList = ref([])
const active = ref(props.activeEvent)
const temporary = ref(false)
const emit = defineEmits(['updateactiveEvent'])
const props = defineProps({
  lists:{
    type:Object,
    default: () => {}
  },
  activeEvent:{
    type:[Number,String],
    default:0
  }
})
// 点击下拉框里面的赛事
function changeRightevent(val,index){
  temporary.value = true
  active.value = index
  fbStore.rightSideDropBox = false
  fbStore.rightList = val
  emit('updateactiveEvent',index,val)
}

//计算得分
const getScore = (arr, index) => {
  return arr?.find((item) => item?.tyg === 5)?.sc[index]
}


</script>

<style lang="scss" scoped>
.DropDownBox-view{
  height: calc(100vh - 174px);
  // transition: height 0.3s ease 0s;
  .matchtitle{
    margin: 4px 4px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background: linear-gradient(90deg, rgba(224, 195, 252, 0.10) 0%, rgba(142, 197, 252, 0.10) 100%);
    font-size: 12px;
    color: var(--60, rgba(255, 255, 255, 0.60));
  }
  .matchs{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 62px;
    color: var(--60, rgba(255, 255, 255, 0.60));
    border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
    margin: 4px 4px;
    cursor: pointer;
    .tname{
      width: 80px;
      display: flex;
      align-items: center;
      flex-direction: column;
      img{
        width: 14px;
        height: 14px;
        margin-bottom: 10px;
      }
      .tsname{
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis; 
        // width: 100%;
        // height: 15px;
        // line-height: 15px;
        font-size: 12px;
        // text-align: center;
      }
    }
    .center{
      width: 70px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .scores{
        margin-top: 10px;
        font-size: 14px;
      }
    }
    .score{
      font-size: 12px;
      .num{
        padding-right: 5px;
      }
      
    }
    &.active{
      border-radius: 2px;
      background: var(--unnamed, #323C6F);
      color: white;
      border-bottom: none;
    }
    &:hover{
      border-radius: 2px;
      background: var(--unnamed, #323C6F);
      color: white;
      border-bottom: none;
    }
  }
  
}
</style>