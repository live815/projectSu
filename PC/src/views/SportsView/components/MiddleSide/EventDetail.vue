<template>
  <div class="EventDetailview">
    <div class="EventDetail-wrap">
      <div class="event-title">
        <img :src="arrowleft" alt="" class="arrow-left" @click="goback">
        <div class="tit">{{props.event?.lg?.na}}</div>
      </div>
       <div class="video bg" :class="activeClass" > 
        <div class="video-layer">
          <!-- 主队 -->
          <div class="video-item left ">
            <img :src="props.event?.ts[0]?.lurl || defaultTeamIcon"  alt="">
            <span>{{ props.event?.ts[0]?.na }}</span>
          </div>
          <div class="video-item middle">
            <div class="time">
              <!-- 第一行 比赛状态 -->
              <span  class="stage">{{ getMatchStatus(props.event, fbStore) }}</span>
              <Counter
              v-if="
                props.event?.mc?.hasOwnProperty('s') && props.event?.mc.s > 0
              "
              :tp="props.event?.mc?.tp"
              :s="props.event?.mc?.s"
              :r="props.event?.mc?.r"
            />
            </div>
            <!-- 第二行 比分 -->
            <!-- 足球全场比分 -->
            <div  v-if="showteamtools(props.event)" class="fscore">
              <div class="item">{{ getScore(props.event?.nsg, 0) || 0 }}</div>
              <div class="vs">VS</div>
              <div class="item">{{getScore(props.event?.nsg, 1) || 0}}</div>
            </div>
            <!-- 乒乓球全场比分 -->
            <div class="secondstage" v-if="showpingpong(props.event)">
              <div class="vs" v-if="NotStarted(props.event)">VS</div>
              <div class="scoreing" v-else>
                {{ getScorepingpong(props.event?.nsg, 0) || 0 }} - {{getScorepingpong(props.event?.nsg, 1) || 0}}
              </div>
            </div>
            <!-- 其他球类 -->
            <div class="secondstage" v-else>
              <div class="vs" v-if="NotStarted(props.event)">VS</div>
              <div class="scoreing" v-else>
                {{ getScore(props.event?.nsg, 0) || 0 }} - {{getScore(props.event?.nsg, 1) || 0}}
              </div>
            </div>
            
            <!-- 第三行 其他阶段数据比分 -->
            <div v-if="[0, 4].includes(props.event?.ms)" class="game-state-text">
              - {{ getMatchStageText(props.event?.ms) }} -
            </div>
            <div class="thirdstage" v-else>
              <!-- 足球 -->
              <div class="left"  v-if="showteamtools(props.event)">
                <!-- 红牌 -->
                <div class="card">
                  <img :src="redcard" :alt="$t('SportsView.RedCard')" :title="$t('SportsView.RedCard')">
                  <span>{{ Number(getTeamDetailByTyg(props.event, 0, 8))  || 0  }}-{{ Number(getTeamDetailByTyg(props.event, 1, 8))  || 0  }}</span>
                </div>
                <!-- 角球 -->
                <div>
                  <img :src="flag" :alt="$t('SportsView.CornerKick')" :title="$t('SportsView.CornerKick')">
                  <span>{{ getcornerkick(props.event, 0, 6) || 0 }}-{{ getTeamDetailByTyg(props.event, 1, 6) || 0 }}</span>
                </div>
                <!-- 半场 -->
                <div>
                  <img :src="firsthalf" :alt="$t('SportsView.HalfTime')" :title="$t('SportsView.HalfTime')">
                  <span>{{ getTeamHalfTime(props.event, 0) || 0 }}-{{ getTeamHalfTime(props.event, 1) || 0 }}</span>
                </div>
                <!-- 黄牌 -->
                <div class="card">
                  <img :src="yellowcard" :alt="$t('SportsView.YellowCard')" :title="$t('SportsView.YellowCard')">
                  <span>{{ Number(getTeamDetailByTyg(props.event, 0, 7))  || 0  }}-{{ Number(getTeamDetailByTyg(props.event, 1, 7))  || 0  }}</span>
                </div>
              </div>
              <!-- 其他球类 -->
              <ScoreTable v-else/>
            </div>
          </div>
          <!-- 客队 -->
          <div class="video-item right">
            <img :src="props.event?.ts[1]?.lurl || defaultTeamIcon" alt="">
            <span>{{ props.event?.ts[1].na }}</span>
          </div>
        </div>
      </div>
      <div class="dropdown-box" v-show="display" style="background: green;">
        <div class="matchtitle">{{ props.event?.lg?.na }}</div>
      </div>
      <div class="selects">
        <img :src="fold" alt="" class="foldicon" @click="toggleAll" :style="{ transform: `rotate(${rotation+180}deg)` }">
        <div
          v-for="item in tabList"
          :key="item.key"
          @click="handleFilter(item.key)"
          class="tab-but"
          :class="{ 'active': item.key === activeTab }"
        >
          {{ item.value }}
        </div>
      </div> 
      <RightAllHandicap ref="odds" :activeTab="activeTab" :matchid="props.event?.id" />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref, watch} from 'vue'
// import eventBus from '@/utils/eventBus'
import ScoreTable from '../RightSide/ScoreTable.vue'
import { SPORT_IDS,NotStarted,getMatchStageText} from '@/hooks/useSportDict'
import {
  getTeamDetailByTyg,
  getcornerkick,
  getTeamHalfTime,getScore,
  getScorepingpong,
} from '@/hooks/sportsView'
import MatchBottomInfo from './MatchBottomInfo.vue'
import arrowleft from './img/arrow-left.png'
import fold from './img/fold.png'
import flag from './img/flag.png'
import firsthalf from './img/first-half.png'
import redcard from './img/redcard.png'
import yellowcard from './img/yellowcard.png'
import RightAllHandicap from '../RightSide/RightAllHandicap.vue'
import defaultTeamIcon from './img/default-team-logo.png'
import { uniq } from 'lodash'
import {  getMatchStatus } from '@/hooks/useSportDict'
import Counter from './Counter.vue'
import { getSportGamePlay } from '@/hooks/useSportDict'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const showteamtools = (item) => item.sid == SPORT_IDS.Soccer || item.sid == SPORT_IDS.EFootball
const showpingpong = (item) => item.sid == SPORT_IDS.TableTennis 


const display = ref(false)
const listsId = ref([])
const activeTab = ref('all')
const odds = ref(null)
const rotation = ref(0);
const props = defineProps({
  event:{
    type: Object
  }
})
// console.log(fbStore.rightList,'赛事详情页',props.event)
const active = ref(props.event?.sid || 1);
onMounted(() => {
  odds.value = ref('odds').value; // 确保 $refs.odds 已经被设置
});

// 未开赛的背景图
const sportsClassMapping = {
  1: 'football-bg',
  3: 'basketball-bg',
  177: 'football-bg',
  178: 'basketball-bg',
  5: 'Tennis-bg',
  7: 'Baseball-bg',
  13: 'Volleyball-bg',
  47: 'Badminton-bg',
  15: 'TableTennis-bg',
  19: 'Boxing-bg',
  16: 'Snooker-bg',
  6: 'AmericanFootball-bg',
  4: 'Rugby-bg',
  2: 'IceHockey-bg',
  8: 'Handball-bg',
  14: 'Cricket-bg',
  51:'BeachVolleyball-bg'
};
const activeClass = computed(() => {
  const defaultClass = 'default-bg'; // 未匹配到值时的默认类名
  const selectedClass = sportsClassMapping[active.value];
  return {
    [selectedClass || defaultClass]: true,
  };
});
const isCollapse = computed(() => {
  return fbStore.mgListIdxs.length ? false : true
})
// fbStore.isOperatedMarketsListCollapse = false // 每次进入页面重置操作状态，默认展开所有玩法
const handleFilter = (key) => {
  activeTab.value = key
}

const tabList = computed(() => {
  const mg = fbStore.matchDetailList.mg
  const mergedTps = mg?.reduce((merged, item, idx) => {
    item.idx = idx
    if (item.tps) {
      merged.push(...item.tps)
    }
    return merged
  }, [])
  const uniqueTps = uniq(mergedTps)
  const filteredArray = getSportGamePlay(i18n).filter((item) => uniqueTps.includes(item.key))
  const allItem = { key: 'all', value: i18n.global.t('SportsView.All') }
  return [allItem, ...filteredArray]
})

setTimeout(() => {
  if(props.event){
    const panelNames = props.event.mg?.map((item, index) => Number(index));
    listsId.value = panelNames;
  }
  
}, 0);

// 返回
function goback(){
  fbStore.Median = 2
  //清空路由
  nextTick(() => {
    router.replace({ path: '/sports', query: {} })
  })
  // console.log(33333,router.query,router.path)
  fbStore.curPage = 'allList'
  // fbStore.curEventId = fbStore.matchList[0].id
  fbStore.queryMatchListParams.type = 1
  fbStore.queryMatchListParams.sportId = props.event.sid
  fbStore.isShowAll = true
  fbStore.isClickBallType = false
}

// 当前玩法列表
const oddsList = computed(() => {
  if (activeTab.value === 'all') {
    return fbStore.matchDetailList.mg || []
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})
const toggleAll = () => {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    // odds.value.toggleAll(true)
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  } else {
    // 如果是展开状态则折叠列表
    // odds.value.toggleAll(false)
    fbStore.mgListIdxs = []
  }
  // 标识用户手动操作了详情页玩法列表折叠面板
  if(props.event){
    // console.log(fbStore.isOperatedMarketsListCollapse)
    fbStore.isOperatedMarketsListCollapse = true
    rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180)
  }
}

</script>

<style lang="scss" scoped>
.EventDetailview{
  
  font-style: normal;
  background: #171A2F;
  height: calc(100vh - 138px);
  .EventDetail-wrap{
    .event-title{
      display: flex;
      width: 100%;
      height: 48px;
      align-items: center;
      border-radius: 2px 2px 0px 0px;
      background: #171A2F;
      .tit{
        flex: 1;
        font-weight: 600;
        font-size: 20px;
        color: var(--100, #FFF);
      }
      .arrow-left{
        display: block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-left: 20px;
      }
    }
    .video{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      background: rgba(0, 0, 0, 0.40);
      .video-layer{
        display: flex;
        width: 840px;
        height: 160px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.50);
        align-items: center;
        justify-content: space-around;
        .video-item{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #FFF;
          img{
            margin-bottom: 10px;
            width: 64px;
            height: 64px;
          }
          span{
            font-size: 16px;
            font-weight: 500;
            color: #FFF;
          }
          .vs{
            font-size: 20px;
            margin: 15px auto;
          }
          .left{
            display: flex;
            height: 28px;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            div{
              display: flex;
              height: 28px;
              align-items: center;
              justify-content: center;
              margin-right: 10px;
            }
            img{
              display: block;
              width:20px;
              height: 20px;
              margin-right: 5px;
              margin-top: 7px;
            }
            .card{
              img{
                margin-top: 10px;
              }
            }
          }
          
          .scores{
            // margin-top: 10px;
            width: auto;
            .basket-wraper{
              flex: 1;
              display: flex;
              flex-direction: row;
              height: 105px;
              width: auto;
              .resultData-items{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                font-size: 12px;
                margin-right: 5px;
                // flex: 1;
                .item{
                  height: 30px;
                  display: flex;
                  align-items: center;
                  // font-size: 14px;
                  .score{
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
        .middle{
          width: 50%;
          .time{
            margin-top: 5px;
            .stage{
              margin-right: 5px;
            }
          }
          .fscore{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 49%;
            .item{
              font-size: 38px;
              font-weight: bold;
              width: 45px;
              height: 45px;
              display: flex;
              align-items: center;
              justify-content: center;
              // background-color: #FFF;
              // color: black;
            }
          }
          .thirdstage{
            width: 100%;
          }
          .scoreing{
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            margin: 16px auto 10px;
          }
        }
      }
    }
    .football-bg{
      background: url('./img/football-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .basketball-bg{
      background: url('./img/basketball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Tennis-bg{
      background: url('./img/Tennis-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Baseball-bg{
      background: url('./img/Baseball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Badminton-bg{
      background: url('./img/Badminton-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Boxing-bg{
      background: url('./img/Boxing-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Snooker-bg{
      background: url('./img/Snooker-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .AmericanFootball-bg{
      background: url('./img/AmericanFootball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Rugby-bg{
      background: url('./img/Rugby-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .IceHockey-bg{
      background: url('./img/IceHockey-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .BeachVolleyball-bg{
      background: url('./img/BeachVolleyball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Handball-bg{
      background: url('./img/Handball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Cricket-bg{
      background: url('./img/Cricket-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .Volleyball-bg{
      background: url('./img/Volleyball-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .TableTennis-bg{
      background: url('./img/TableTennis-bg.png') no-repeat;
      background-size:100% 100%;
    }
    .dropdown-box{
      position: absolute;
      .matchtitle{
        margin: 0 auto;
      }
    }
    .selects{
      display: flex;
      align-items: center;
      height: 45px;
      width: 100%;
      // padding-top: 10px;
      background: #171A2F;
      .foldicon{
        display: block;
        width: 16px;
        height: 16px;
        margin: 0 10px;
        cursor: pointer;
      }
      >div{
        display: block;
        padding: 6px 15px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        border-radius: 20px;
        margin-right: 10px;
        cursor: pointer;
      }
      .active{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        color: #fff;
        border: none;
      }
      :deep(){
        .el-tabs__nav-wrap::after{
          display: none;
        }
        .el-tabs__item{
          color: var(--60, rgba(255, 255, 255, 0.60));

        }
      }
    }

    :deep(){
      .el-collapse-item__arrow{
        rotate: 90deg;
      }
      .el-collapse-item__arrow.is-active{
        transform: rotate(180deg);
      }
      .el-collapse{
        border: none;
      }
      .el-collapse-item__header{
        border-radius: 2px;
        background: #171A2F;
        border: none;
        color: var(--60, rgba(255, 255, 255, 0.60));
        height: 36px;
        margin-bottom: 5px;
        // padding: 0 15px;
        margin: 0 15px;
        color: #fff;
        border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
      }
      .el-collapse-item__wrap{
        background: transparent;
        border: none;
      }
      .el-collapse-item__content{
          color: var(--60, rgba(255, 255, 255, 0.60));
          padding-bottom: 8px;
          margin-top: 8px;
      }
      .secondMenu{
        .el-collapse-item__arrow.is-active,.el-collapse-item__arrow{
          display: none;
        }
      }
    }
  }
}
</style>