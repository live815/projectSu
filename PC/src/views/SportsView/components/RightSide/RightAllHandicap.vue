<template>
  <div class="RightAllHandicap-view" :class="fbStore.curPage">
    <div
      class="odds-panel"
      :class="oddsPanelClass"
    >
      <el-collapse
        v-if="oddsList.length"
        v-model="fbStore.mgListIdxs"
        :border="false"
        ref="collapse"
      >
        <el-collapse-item v-for="(item, index) in oddsList" :key="index" :name="item.idx" @click="fbStore.isOperatedMarketsListCollapse = true">
          <template #title>
            <div class="mty-title-wrap">
              <div class="mty-title">
                <p>
                  <span :title="item.nm" class="nm">{{ item.nm }}<label v-if="isDev">-{{ item.mty }}</label></span>
                  <el-icon class="ArrowUp"><ArrowUp /></el-icon>
                  <!-- <span v-if="isDev">-{{ item.mty }}</span> -->
                </p>
              </div>
              <div class="icon">
                <img height="24" width="24" :src="upIcon" @click.stop="moveItemToTop(index)" />
              </div>
            </div>
          </template>
          <div class="odds-box">
            <!-- 球队头信息 -->
            <div v-if="!oneInoneRow(item.mty) && hideTeamTitle(item.mty)" class="title">
              <div>
                <img height="16" width="16" :src="teamInfo[0]?.lurl || defaultTeamIcon" /><span
                  class="teamName"
                  >{{ teamInfo[0]?.na }}</span
                >
              </div>
              <div v-if="showTie(item.mty)">{{$t('SportsView.Tie')}}</div>
              <div>
                <img height="16" width="16" :src="teamInfo[1]?.lurl || defaultTeamIcon" /><span
                  class="teamName"
                  >{{ teamInfo[1]?.na }}</span
                >
              </div>
            </div>
            <!-- 某种玩法多线路 -->
            <div
              :class="{
                multiple: option.op.length > 3,
                oneInoneRow: oneInoneRow(item.mty),
                twoIineRow: twoIineRow(item.mty)
              }"
              class="item-line"
              v-for="(option, lineIdx) in item.mks"
              :key="lineIdx"
            >
              <!-- 单个线路下的2个或多个选项 -->
              <div
                :class="{
                  active: betCartStore.betList.find(
                    (bet) =>
                      `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
                      `${option.id}-${team.ty}-${team.nm}`
                  )
                }"
                class="odds-item"
                v-for="(team, idx) in option.op"
                :key="idx"
                @click="handleBetting(team, option, item, $event)"
              >
                <div class="sold" v-if="isSolding(option.ss, team.od)">
                  <div class="score-number">
                    {{ team.nm }}
                  </div>
                  <div class="odds" :class="getChangeState(team.od, idx, lineIdx, index)">
                    <div class="num">
                      {{ getOddFormat(team.od, fbStore.settings.oddsFormat) }}
                      <IconKLineUp v-if="item.changeStateClass === 'up'" />
                      <IconKLineArrow v-if="item.changeStateClass === 'down'" />
                    </div>
                    <IconKLineArrow
                      v-if="getChangeState(team.od, idx, lineIdx, index)"
                      class="arrow"
                    />
                  </div>
                </div>
                <p v-else class="ss-closed">
                  <IconLocked />
                </p>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div v-else class="nodata">
        <div><img :src="noData" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import { getOddFormat, isSolding } from '@/hooks/useSportDict'
import {ArrowUp} from '@element-plus/icons-vue'
// import noData from '../../img/noData.png'
import upIcon from './img/up.png'
import noData from './img/nodata.png'
import defaultTeamIcon from './img/default-team-logo.png'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const collapse = ref(null)
const isDev = process.env.NODE_ENV === 'development'
const viewHeight = ref(false)
const props = defineProps({
  activeTab: {
    type: String,
    default: 'all'
  },
  matchid:{
    type:[Number,String]
  }
})
// const isCollapse = computed(() => {
//   return fbStore.mgListIdxs.length ? false : true
// })
fbStore.isOperatedMarketsListCollapse = false // 每次进入页面重置操作状态，默认展开所有玩法
// 根据条件动态设置投注区域高度
const oddsPanelClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  const isFromLive = route.query.data === 'fromLive'

  if (viewHeight.value) {
    return 'odds-panel-415'
  } else if (isMatchDetail234) {
    return 'odds-panel-295'
  } else if (isFromLive) {
    return 'odds-panel-360'
  }

  return '' // 默认情况下返回空字符串
})
onUnmounted(() => {
  eventBus.off('topViewChange')
})
// 一行展示mty
function oneInoneRow(mty) {
  return [
    19004, 1109, 1110, 1028, 1101, 1103, 1104, 1105, 1106, 1033, 1012, 1030, 1032, 1115, 1031, 1079,
    3040, 3017, 3041, 3027, 3016, 1018, 5015, 6020, 6012, 6015, 51005
  ].includes(mty)
}
// 展示头部的mty
function hideTeamTitle(mty) {
  return [
    3001, 3002, 1005, 1099, 5002, 5006, 5011, 16003, 16001, 16014, 13004, 15002, 15004, 8008, 8006,
    6001, 6009, 6010, 4004, 4003, 4001, 4008, 51006, 51002, 1000, 1006
  ].includes(mty)
}
// 展示和的mty
function showTie(mty) {
  return [1042, 1009, 1005, 3001, 1005, 1099, 16014, 4003, 6009].includes(mty)
}
// 两行展示的mty
const twoIineRow = (mty) => {
  return [5006, 5011, 15004].includes(mty)
}
function getChangeState(newOd, idx, lineIdx, index) {
  let oldOd
  let mg = oldOddsList.value
  if (mg && mg.length && mg[index] && mg[index].mks && mg[index].mks.length) {
    oldOd = oldOddsList.value[index].mks[lineIdx]?.op[idx]?.od
  }
  if (newOd > oldOd) return 'up'
  if (newOd < oldOd) return 'down'
}
const teamInfo = computed(() => {
  return fbStore.matchDetailList?.ts || []
})
// 当前玩法列表
const oddsList = computed(() => {
  if (props.activeTab === 'all') {
    return fbStore.matchDetailList?.mg || []
  } else {
    return (
      fbStore.matchDetailList?.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})
// 上一份玩法列表
const oldOddsList = computed(() => {
  if (props.activeTab === 'all') {
    return fbStore.previousMatchDetailData?.mg || []
  } else {
    return (
      fbStore.previousMatchDetailData?.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})
// 选中注单
const handleBetting = (team, option, item, e) => {
  fbStore.eventChooseStatus = false//关闭赛事筛选
  if (!userStore.isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  // 未开售状态无法加入购物车
  if (!isSolding(option.ss, team.od)) return
  const matchId = props.matchid
  const match = fbStore.matchDetailList
  const betObj = {
    id: option.id,
    ss: option.ss,
    au: option.au,
    uniStake: '',
    matchId,
    betMatchMarket: {
      matchId,
      marketId: option.id, // 玩法id
      odds: team.od, // 赔率
      optionType: team.ty // 投注类型
    },
    // 展示类型数据
    visible: {
      teamName: team.na, // 球队名称
      betOpTitle: team.nm, // 投注项名称 -0/0.5
      title: match.nm, // 比赛标题 teamA vs teamB
      marketTitle: item.nm, //  盘口玩法简称
      lgName: match.lg.na, // 联赛名称
      begainTime: match.bt // 开始时间
    }
  }
  betCartStore.isOpenBetCart = true
  betCartStore.ifShowLayer = false
  betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
  eventBus.emit('quickbet',true)
}
watchEffect(() => {
  // console.log(fbStore.mgListIdxs,fbStore.isOperatedMarketsListCollapse)
  // 如果用户手动点击收起开关将列表折叠起来了，则不要随数据更新自动展开
  if (!fbStore.isOperatedMarketsListCollapse) {
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
    // console.log(11111,fbStore.mgListIdxs)
  }
})

// 置顶
const moveItemToTop = (index) => {
  if (oddsList.value && oddsList.value.length > index) {
    const itemToMove = oddsList.value.splice(index, 1)[0]
    oddsList.value.unshift(itemToMove)
  }
}
watch(
  ()=>fbStore.curEvent,
  ()=>{
    fbStore.matchDetailList = fbStore.curEvent
  },{deep:true,immediate: true}
)
</script>

<style lang="scss" scoped>
.RightAllHandicap-view{
  
  // height: 100vh;
  overflow: scroll;
  scrollbar-width: none;//火狐浏览器 隐藏滚动条
  background-color: #151525;
  .odds-panel{
    height: 100%;
    .odds-box {
      .title {
        @include center-content(space-between, center);
        text-align: center;
        color: var(--color-text);
        
        font-size: 13px;
        font-weight: 400;
        gap: 10px;
        margin: 0 10px;
        > div {
          @include center-content();
          width: 100%;
          margin-bottom: 10px;
          color: var(--40, rgba(255, 255, 255, 0.4));
        }
        img {
          margin-right: 5px;
        }
        .teamName {
          @include textToOmit();
          font-size: 14px;
          color: var(--40, rgba(255, 255, 255, 0.6));
        }
      }
      .item-line {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        margin-right: 10px;
        &.multiple {
          flex-wrap: wrap;
          .odds-item {
            flex-basis: calc(33.33% - 10px); /* 1/3 宽度，减去间隔 */
          }
        }
       
        &.oneInoneRow {
          flex-direction: column;
        }
      }
      .odds-item {
        padding: 0 8px;
        // margin: 0 15px;
        border-radius: 6px;
        background: #1D223C;
        border: 1px solid #1D223C;
        flex: 1;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        .sold {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }
        .score-number {
          
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          font-weight: 400;
          color: var(--40, rgba(255, 255, 255, 0.60));
        }
        .odds {
          display: flex;
          align-items: center;
          .num {
            color: #fff;
            font-size: 13px;
            // font-weight: 600;
          }
          .arrow {
            width: 10px;
            height: 10px;
            margin-left: 2px;
          }
          &.up {
            .num {
              color: var(--color-danger);
            }
            .arrow {
              fill: var(--color-danger);
              transform: rotateX(180deg);
            }
          }
          &.down {
            .num {
              color: #00b42a;
            }
            .arrow {
              fill: #00b42a;
              opacity: 1;
            }
          }
        }

        .ss-closed {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          svg {
            fill: #cccccc;
            width: 14px;
          }
        }
        &.active {
          color: #fff;
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
          .score-number{
            color: #fff;
          }
        }
      }

      .correct-score {
        width: 107px;
        height: 40px;
      }
      .goalDifference {
        width: 343px;
        height: 40px;
      }
    }
    .mty-title-wrap{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .mty-title{ 
      // width: 80%;
      // display: flex;
      // flex-direction: row;
      // text-align: left;
      // height: 35px;
      .nm{
        width: 100%;
        overflow: hidden;
        display: block;
        padding-left: 12px;
        font-size: 14px;
        margin-right: 10px;
      }
      p{
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .icon{
      display: flex;
      align-items: center;
    }
  }
  .nodata{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      display: block;
      width:155px;
      height: auto;
    }
  }
  :deep(){
    .el-collapse-item__arrow{
      display: none;
    }
  }
}
.eventdetail{
  height: calc(100vh - 434px);
}
.allList{
  height: calc(100vh - 367px);
}
</style>