<template>
  <div class="ResultStage-view">
    <div class="resultData-wraper">
        <!-- 左侧第一列 -->
        <div class="resultData-info" >
          <div class="gameStatus resultData-items">
            <!-- 第一行 比赛状态 -->
            <span  class="num">{{ getMatchStatus(fbStore.rightList || [], fbStore) }}</span>
            <!-- 赛事计时 -->
            <Counter
              v-if="fbStore.rightList?.mc?.hasOwnProperty('s') && fbStore.rightList?.mc?.s >= 0"
              :tp="fbStore.rightList?.mc?.tp"
              :s="fbStore.rightList?.mc?.s"
              :r="fbStore.rightList?.mc?.r"
            />
          </div>
          <div class="resultData-items top" v-for="(it,ind) in fbStore.rightList?.ts" :key="ind">
              <span class="tnames" :title="it.na">{{ it.na }}</span>
          </div>
        </div>
        <!-- 足球 -->
        <template v-if="fbStore.rightList?.sid === SPORT_IDS.Soccer || fbStore.rightList?.sid === SPORT_IDS.EFootball">
          <div class="soccer-wraper">
            <div class="resultData-statu" >
                <span><img :src="flag" :alt="$t('SportsView.CornerKick')" :title="$t('SportsView.CornerKick')"></span>
                <span><img :src="redcard" :alt="$t('SportsView.RedCard')" :title="$t('SportsView.RedCard')"></span>
                <span><img :src="yellowcard" :alt="$t('SportsView.YellowCard')" :title="$t('SportsView.YellowCard')"></span>
                <span><img :src="firsthalf" :alt="$t('SportsView.HalfTime')" :title="$t('SportsView.Firsthalf')"></span>
                <span><img :src="score" style="opacity: .4;" :alt="$t('SportsView.Score')" :title="$t('SportsView.Score')"></span>
            </div>
            <div class="resultData-info-item"  v-if="fbStore.rightList?.sid === SPORT_IDS.Soccer || fbStore.rightList?.sid === SPORT_IDS.EFootball">
                <div class="resultData-item" v-for="(it,ind) in fbStore.rightList?.ts" :key="ind">
                    <div class="scores"  v-if="fbStore.rightList?.sid === SPORT_IDS.Soccer || fbStore.rightList?.sid === SPORT_IDS.EFootball">
                      <!-- 角球 -->
                      <span>{{ getcornerkick(fbStore.rightList, ind, 6) || 0 }}</span>
                      <!-- 红牌 -->
                      <span class="card red">{{ Number(getTeamDetailByTyg(fbStore.rightList, ind, 8))  || 0  }}</span>
                      <!-- 黄牌 -->
                      <span class="card yellow">{{ Number(getTeamDetailByTyg(fbStore.rightList, ind, 7))  || 0  }}</span>
                      <!-- 半场 -->
                      <span>{{ getTeamHalfTime(fbStore.rightList, ind) || 0 }}</span>
                      <!-- 全场比分 -->
                      <span class="card score">{{ getTeamDetailByTyg(fbStore.rightList, ind, 5) || 0  }}</span>
                    </div>
                </div>              
            </div>
          </div>
        </template>
        <!-- 其他球类 -->
        <ScoreTable v-else/>
      </div>
      
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref} from 'vue'
import Counter from '../MiddleSide/Counter.vue'
import ScoreTable from './ScoreTable.vue'
import {  getMatchStatus,SPORT_IDS } from '@/hooks/useSportDict'
import {
  getTeamDetailByTyg,
  getcornerkick,
  getTeamHalfTime,
} from '@/hooks/sportsView'
import flag from './img/flag.png'
import firsthalf from './img/first-half.png'
import redcard from './img/redcard.png'
import yellowcard from './img/yellowcard.png'
import score from './img/score.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const props = defineProps({
  event:{
    type:Object,
    default: () => {}
  }
})
// console.log(fbStore.rightList,'右侧赛事',props.event)

</script>

<style lang="scss" scoped>
.ResultStage-view{
  .resultData-wraper{
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 105px;
    width: 95%;
    margin: 5px auto;
    .resultData-info,.resultData-info-item{
      display: flex;
      align-items: center;
      height: 100%;
    }
    .resultData-info{
      width: 96px;
      display: flex;
      flex-direction: column;
      height: 105px;
      align-items: flex-start;
      font-size:12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      .gameStatus{
        width: 96px;
        height: 35px;
        display: flex;
        flex-direction: row;
        text-align: left;
        align-items: center;
        .num{
          padding-right: 3px;
        }
      }
      .resultData-items{
        height: 35px;
        display: flex;
        align-items: center;
      }
    }
    .soccer-wraper{
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 105px;
      .resultData-statu{
        height: 35px;
        display: flex;
        flex-direction: row;
        width: 100%;
        span{
          display: flex;
          height: 35px;
          align-items: center;
          justify-content: center;
          width: 20%;
          cursor: pointer;
          img{
            width: 12px;
            height: 12px;
          }
        }
      }
      .resultData-info-item{
        display: flex;
        flex-direction: column;
        width: 100%;
        .resultData-item{
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          .tnames{
            width: 96px;
            display: flex;
            height: 35px;
            align-items: center;
            font-size: 12px;
          }
          .basket{
            display:inline-flex;
            align-items:center;
            justify-content:center;
            height:100%;
            flex:1;
            span{
              display:inline-flex;
              align-items:center;
              justify-content:center;
              width:100%;
              height:100%;
              text-align:center;

            }
          }
          .scores{
            flex: 1;
            display: flex;
            flex-direction: row;
            span{
              display: flex;
              height: 35px;
              width: 20%;
              align-items: center;
              justify-content: center;
              img{
                width: 12px;
                height: 12px;
              }
            }
          }
        
        }
      }
    }
    .basket-wraper{
      flex: 1;
      display: flex;
      flex-direction: row;
      height: 105px;
      .resultData-items{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        font-size: 12px;
        flex: 1;
        .item{
          height: 35px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>