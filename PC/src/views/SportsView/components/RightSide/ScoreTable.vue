<template>
  <div class="ScoreTable-view">
    <!-- 篮球 -->
    <template v-if="fbStore.rightList?.sid === SPORT_IDS.Basketball" >
      <div class="basket-wraper">
        <div class="resultData-items body" v-for="(eachone, idx) in getBasketBallStagesScore" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getBasketBallStagesScore.length - 1 }]" >
          <div class="pe item">{{ getStageType(eachone) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 电竞篮球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.EBasketball" >
      <div class="basket-wraper">
        <div class="resultData-items body" v-for="(eachone, idx) in getEBasketballScore" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getEBasketballScore.length - 1 }]">
          <div class="pe item">{{ getStageTypeEBasketball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 网球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Tennis"  >
      <div class="basket-wraper tennis">
        <div class="resultData-items" v-for="(eachone, idx) in getTennisScore" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getTennisScore.length - 1 }]">
          <div class="pe item">{{ getStageTypeOne(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
        <div class="resultData-items">
          <div class="pe item">{{$t('SportsView.pan')}}</div>
          <div class="score item">{{gettennispan(fbStore.rightList,0,5) || 0}}</div>
          <div class="score item">{{gettennispan(fbStore.rightList,1,5) || 0}}</div>
        </div>
        <div class="resultData-items">
          <div class="pe item">{{$t('SportsView.Point')}}</div>
          <div class="score item">{{gettenniswhole(fbStore.rightList,0,5559) || '-'}}</div>
          <div class="score item">{{gettenniswhole(fbStore.rightList,1,5559) || '-'}}</div>
        </div>
      </div>

    </template>
    <!-- 乒乓球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.TableTennis"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in gettabletennies" :key="idx"  :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === gettabletennies.length - 1 }]">
          <div class="pe item">{{ getStageTypepingpong(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 排球 -->
    <template  v-else-if="fbStore.rightList?.sid === SPORT_IDS.Volleyball">
      <div class="basket-wraper tennis">
        <div class="resultData-items" v-for="(eachone, idx) in getVolleyball" :key="idx"  :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getVolleyball.length - 1 }]">
          <div class="pe item">{{ getStageTypeVolleyball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
        <!-- 全场 -->
        <div class="resultData-items" >
          <div class="pe item">{{$t('SportsView.Wholegame')}}</div>
          <div class="score item">{{getVolleyballscore(fbStore.rightList,0,5) || 0}}</div>
          <div class="score item">{{getVolleyballscore(fbStore.rightList,1,5) || 0}}</div>
        </div>
      </div>
    </template>
    <!-- 棒球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Baseball"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getBaseball" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getBaseball.length - 1 }]">
          <div class="pe item">{{ getStageTypeBaseball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 斯诺克 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Snooker"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getSnooker" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getSnooker.length - 1 }]">
          <div class="pe item">{{ getStageTypeSnooker(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 手球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Handball"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getHandball" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getHandball.length - 1 }]">
          <div class="pe item">{{ getStageTypeHandball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 冰球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.IceHockey"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getIceHockey" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getIceHockey.length - 1 }]">
          <div class="pe item">{{ getStageTypeIceHockey(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 橄榄球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Rugby" >
      <div class="basket-wraper">
        <div class="resultData-items body" v-for="(eachone, idx) in getRugby" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getRugby.length - 1 }]">
          <div class="pe item">{{ getStageType(eachone) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 美式足球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.AmericanFootball"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getAmericanFootball" :key="idx"  :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getAmericanFootball.length - 1 }]">
          <div class="pe item">{{ getStageTypeAmericanFootball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
    <!-- 羽毛球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.Badminton"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getBadminton" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getBadminton.length - 1 }]">
          <div class="pe item">{{ getStageTypeBadminton(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
        <!-- 全场 -->
        <div class="resultData-items">
          <div class="pe item">{{$t('SportsView.Wholegame')}}</div>
          <div class="score item">{{getBeachBadminton(fbStore.rightList,0,5) || '-'}}</div>
          <div class="score item">{{getBeachBadminton(fbStore.rightList,1,5) || '-'}}</div>
        </div>
      </div>
    </template>
    <!-- 沙滩排球 -->
    <template v-else-if="fbStore.rightList?.sid === SPORT_IDS.BeachVolleyball"  >
      <div class="basket-wraper tabletennies">
        <div class="resultData-items" v-for="(eachone, idx) in getScoreBeachVolleyball" :key="idx"  :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getScoreBeachVolleyball.length - 1 }]">
          <div class="pe item">{{ getStageTypeBeachVolleyball(eachone.pe) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
        <!-- 全场 -->
        <div class="resultData-items" >
          <div class="pe item">{{$t('SportsView.Wholegame')}}</div>
          <div class="score item">{{getBeachVolleyball(fbStore.rightList,0,5) || '-'}}</div>
          <div class="score item">{{getBeachVolleyball(fbStore.rightList,1,5) || '-'}}</div>
        </div>
      </div>
    </template>
    <!-- 其他球 -->
    <template v-else >
      <div class="basket-wraper others">
        <div class="resultData-items" v-for="(eachone, idx) in getOtherBallStagesScore" :key="idx" :class="[fbStore.curPage=='eventdetail'?'kd':'',{active: idx === getOtherBallStagesScore.length - 1 }]">
          <div class="pe item">{{ getStageType(eachone) }}</div>
          <div class="score item" >
            {{ eachone.score[0] }}
          </div>
          <div class="score item" >
            {{ eachone.score[1] }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {  SPORT_IDS } from '@/hooks/useSportDict'
import {
  getStageTypeSnooker,
  getStageType,
  getVolleyballscore,
  getStageTypeVolleyball,
  getStageTypepingpong,
  gettenniswhole,
  gettennispan,
  getStageTypeOne,
  getStageTypeBaseball,
  getStageTypeHandball,
  getStageTypeAmericanFootball,
  getStageTypeBeachVolleyball,
  getBeachVolleyball,
  getOtherBallStagesScore,
  getScoreBeachVolleyball,
  getAmericanFootball,
  getRugby,
  getHandball,
  getSnooker,
  getVolleyball,
  getBaseball,
  gettabletennies,
  getTennisScore,
  getBasketBallStagesScore,
  getBadminton,
  getStageTypeBadminton,
  getBeachBadminton,
  getStageTypeIceHockey,
  getIceHockey,
  getEBasketballScore,
  getStageTypeEBasketball
} from '@/hooks/sportsView'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()


</script>

<style lang="scss" scoped>
.ScoreTable-view{
  width: 100%;
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
    .active{
      color: var(--unnamed, #F35F1B);
    }
  }
}
</style>