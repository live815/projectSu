<template>
  <div class="EventInformation-view">
    <div class="vs-box" v-if="lists.ts && lists.ts.length">
      <div class="left">
        <div class="icon-box">
          <img :src="lists.ts[0]?.lurl || defaultIcon" />
        </div>
        <div class="team-name" :title="lists?.ts[0]?.na">{{ lists?.ts[0]?.na }}</div>
      </div>
      <div class="center">
        <template v-if="lists?.ms !== 0">
          <div v-if="lists?.ms === 4" class="sessions sessions1">
            {{ formatTimestamp(lists?.bt) }}
          </div>
          <div v-else class="sessions sessions2">
            <!-- 比赛阶段 -->
            <span>{{ getMatchStatus(lists, fbStore) }}</span>
            <!-- 滚球走表信息 -->
            <Counter
              v-if="
                lists?.mc.hasOwnProperty('s') && lists?.mc.s > 0
              "
              :tp="lists?.mc.tp"
              :s="lists?.mc.s"
              :r="lists?.mc.r"
            />
          </div>
        </template>
        <template v-if="lists?.ms !== 4 && lists?.nsg.length">
          <!-- 比分 -->
          <div class="score">
            {{ getScore(lists?.nsg, 0) || 0 }}-{{
              getScore(lists?.nsg, 1) || 0
            }}
          </div>
        </template>
        <template v-if="lists?.ms === 4 || !lists?.nsg.length">
          <div class="vs">vs</div>
        </template>

        <!-- // -4未开赛，5-进行中	，0、-已结束 -->
        <template v-else>
          <div class="game-state-text">
            {{
              lists?.ms === 4
                ? '- 未开始 -'
                : lists?.ms === 0
                ? '- 完赛 -'
                : ''
            }}
          </div>
        </template>
      </div>

      <div class="right">
        <div class="icon-box">
          <img :src="lists?.ts[1]?.lurl || defaultIcon" />
        </div>
        <div class="team-name"  :title="lists?.ts[0]?.na">{{ lists?.ts[1]?.na }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import defaultIcon from './img/default-team-logo.png'
import Counter from '../MiddleSide/Counter.vue'
import { formatTimestamp } from '@/utils'
import {  getMatchStatus } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const props = defineProps({
  lists:{
    type:Object
  }
})
// console.log(props.lists,'props.lists',fbStore.matchDetailList,fbStore.curEvent)
watch(
  ()=>fbStore.rightList,
  ()=>{
    // console.log(fbStore.rightList,2222222,fbStore.curEvent)
  }
)

//计算得分
const getScore = (arr, index) => {
  return arr?.find((item) => item?.tyg === 5)?.sc[index]
}
</script>

<style lang="scss" scoped>
.EventInformation-view{
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  .vs-box {
    // margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .left {
      width: 130px;
    }
    .right {
      width: 130px;
    }
    .icon-box {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 37px;
        height: 37px;
      }
    }

    .center {
      color: #fff;
      .sessions {
        text-align: center;
        
        font-size: 12px;
        font-weight: 400;
        .counter{
          margin: 10px 10px;
          display: block;
        }
      }
      .score {
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0 10px 0;
        text-align: center;
      }
      .vs {
        color: #fff;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        margin: 12px 0 16px 0;
      }
      .game-state {
        color: rgb(182, 157, 166);
        text-align: center;
        font-family: ONEAN;
        font-size: 11px;
        font-weight: 500;
      }
      .game-state-text {
        color: #fff;
        text-align: center;
        
        font-size: 12px;
        font-weight: 400;
      }
      img {
        margin: 0 3px -2px 0;
      }
    }
    .team-name {
      color: #fff;
      
      font-size: 13px;
      font-weight: 500;
      margin-top: 8px;
      line-height: 17px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>