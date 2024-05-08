<template>
  <div class="boxBet">
    <div class="betTab">
      <div v-if="fbStore.matchDetailList.mg.length" class="betTop swiper">
        <div class="swiper-wrapper">
          <div
            class="tTab swiper-slide"
            :class="{ active: currTab == item.key }"
            @click="tabBtn(item.key)"
            v-for="(item, index) in tabList"
            :key="index"
          >
            {{ item.value }}
          </div>
        </div>
      </div>
      <div v-if="fbStore.matchDetailList.mg.length" class="moreTab" @click="goSportDetails">
        {{ $t('Components.MoreMarkets') }}
      </div>
    </div>
    <div class="betDiv">
      <el-collapse v-if="oddsList.length" v-model="fbStore.mgListIdxs" ref="collapse">
        <el-collapse-item
          v-for="(item, index) in oddsList"
          :key="index"
          :name="item.idx"
          :title="item.nm"
        >
          <div class="odds-box">
            <!-- 球队头信息 -->
            <div v-if="!oneInoneRow(item.mty) && hideTeamTitle(item.mty)" class="title">
              <div>
                <img height="24" width="24" :src="teamInfo[0]?.lurl || defaultIcon" />
                <span class="teamName">{{ teamInfo[0]?.na }}</span>
              </div>
              <div v-if="showTie(item.mty)">{{ $t('Components.Tie') }}</div>
              <div>
                <img height="24" width="24" :src="teamInfo[1]?.lurl || defaultIcon" />
                <span class="teamName">{{ teamInfo[1]?.na }}</span>
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
                  active:
                    betCartStore.anchorBetObj &&
                    betCartStore.anchorBetObj.marketId == option.id &&
                    betCartStore.anchorBetObj.betStyle == team.ty
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
                    </div>
                    <IconKLineArrow
                      v-if="getChangeState(team.od, idx, lineIdx, index)"
                      class="arrow"
                    />
                  </div>
                </div>
                <div v-else class="ss-closed">
                  <div class="score-number">
                    {{ team.nm }}
                  </div>
                  <IconLocked />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <NoList v-else class="betDiv" />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, computed, watchEffect } from 'vue'
import { useFBStore } from '@/stores/fb'
import { useBetCartStore } from '@/stores/betCart'
import { getOddFormat, isSolding, getSportGamePlay } from '@/hooks/useSportDict'
import IconKLineArrow from '@/components/icons/IconKLineArrow.vue'
import IconLocked from '@/components/icons/IconLocked.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { useUserStore } from '@/stores/user.js'
import { uniq } from 'lodash'
import NoList from '@/components/NoList/NoList.vue'
import { getToken } from '@/utils/cache'
import { useRouter } from 'vue-router'
import Swiper from 'swiper'
const router = useRouter()
const user = useUserStore()
const liveStore = useLiveStore()
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
const oddsList = computed(() => {
  if (currTab.value === 'all') {
    return fbStore.matchDetailList.mg || []
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps?.length && item.tps.includes(currTab.value)
      ) || []
    )
  }
})
const oldOddsList = computed(() => {
  if (currTab.value === 'all') {
    return fbStore.previousMatchDetailData.mg || []
  } else {
    return fbStore.previousMatchDetailData.mg?.filter((item) => item.mty == currTab.value) || []
  }
})
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
  const allItem = { key: 'all', value: i18n.global.t('Components.All') }
  return [allItem, ...filteredArray]
})

const tabList1 = () => {
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
  const allItem = { key: 'all', value: i18n.global.t('Components.All') }
  return [allItem, ...filteredArray]
}
const currTab = ref('all')
const tabBtn = (value) => {
  currTab.value = value
}
// const handleChange = () => {
//   // console.log(val)
// }
onMounted(() => {
  tabList1()
 setTimeout(()=>{
  let mySwiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
  })
  mySwiper.on()
 },1000)
})
//去V体育
const goSportDetails = () => {
  let gameId = liveStore.roomSportType == 0 ? liveStore.liveRoom.gameId : liveStore.liveRoom.id
  let sid =
    liveStore.roomSportType == 0
      ? liveStore.liveRoom.roomStyle
      : liveStore.roomSportType == 1
      ? 1
      : 3
  let page = 'live'
  // console.log(gameId,'goSportDetails')
  router.push(`/sports?gameId=${gameId}&sid=${sid}&page=${page}`)
  fbStore.Median = 1
}
// 一行展示mty
function oneInoneRow(mty) {
  return [
    19004, 1109, 1110, 1028, 1101, 1103, 1104, 1105, 1106, 1033, 1012, 1030, 1032, 1115, 1031, 1079,
    3040, 3017, 3041, 3027, 3016, 1018, 5015, 6020, 6012, 6015, 51005
  ].includes(mty)
}
// 展示头部的mty
function hideTeamTitle(mty) {
  //1005  1099
  return [
    3001, 3002, 5002, 5006, 5011, 16003, 16001, 16014, 13004, 15002, 15004, 8008, 8006, 6001, 6009,
    6010, 4004, 4003, 4001, 4008, 51006, 51002, 1000, 1006
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
  return fbStore.matchDetailList.ts || []
})
watchEffect(() => {
  // 如果用户手动点击收起开关将列表折叠起来了，则不要随数据更新自动展开
  tabList1()
  if (!fbStore.isOperatedMarketsListCollapse) {
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  }
})
// 选中注单
const handleBetting = (team, option, item) => {
  const matchId = liveStore.roomSportType == 0 ? liveStore.liveRoom.gameId : liveStore.liveRoom.id
  const match = fbStore.matchDetailList
  let isLogin = getToken()
  if (!isLogin) {
    user.setLoginDialogAction({
      isShowLoginDialog: true,
      currentPage: 'login'
    })
    return
  }
  if (user.userInfo.role === 1) {
    return
  }
  betCartStore.anchorBetType = 3
  betCartStore.anchorBetObj = {
    id: option.id,
    betMatchMarket: {
      optionType: team.ty // 投注类型
    },
    // // 展示类型数据
    visible: {
      betOpTitle: team.nm // 投注项名称 -0/0.5
    },
    marketId: option.id, // 玩法id  加个字段
    betMarket: team.nm,
    betOdds: team.od,
    cusName: fbStore.matchDetailList.ts[1].na, //客队
    gameId: matchId,
    gameTimestamp: match.bt,
    leagueName: match.lg.na,
    orderTitle: item.nm,
    mainName: fbStore.matchDetailList.ts[0].na, //主队
    pushType: 1,
    betStyle: team.ty, // 投注类型
    matchTeam: fbStore.matchDetailList.nm,
    betStyleName: team.na
  }
}
</script>

<style lang="scss" scoped>
.boxBet {
  padding: 15px 10px;
  .betTab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .betTop {
    max-width: 236px;
    height: 25px;
    border-radius: 90px;
    background: #232949;
    display: flex;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tTab {
    color: var(--80, rgba(255, 255, 255, 0.8));
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 25px;
    text-align: center;
    margin: 0 4px;
    padding: 0 4px;
    user-select: none;
  }
  .swiper-slide {
    width: auto !important;
  }
  .active {
    height: 24px;
    border-radius: 90px;
    color: var(--100, #fff);
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
  .moreTab {
    width: 64px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 90px;
    background: #232949;
    color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .league-menu {
    border-right: 0;
    background: none;
  }
  .el-menu :hover,
  .el-menu--inline :hover {
    background: none;
  }
}
.boxBet :deep() {
  .el-collapse,
  .el-collapse-item,
  .el-collapse-item__header,
  .el-collapse-item__wrap,
  .el-collapse-item__content {
    background: none;
    border: 0;
    color: #fff;
    padding-bottom: 2px;
  }
  .el-collapse-item__header {
    min-width: 50px;
    height: 40px;
    color: var(--100, #fff);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
  }
  .is-active i {
    transform: rotate(90deg);
  }
  .el-collapse-item__arrow {
    transform: rotate(-90deg);
    margin-left: 4px;
  }
  .el-sub-menu__title {
    display: flex;
    color: rgba(255, 255, 255, 1);
  }
  .el-sub-menu .el-sub-menu__icon-arrow {
    color: #fff;
  }
  .el-collapse-item > div:first-child {
    display: flex;
    align-items: center;
  }
}
.betDiv {
  height: 520px;
  overflow-y: auto;
  scrollbar-width: none; //火狐浏览器 隐藏滚动条
}
.odds-box {
  .title {
    @include center-content(space-between, center);
    // text-align: center;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 400;
    gap: 20px;
    // > div {
    //   @include center-content();
    //   // width: 95px;
    //   margin-bottom: 10px;
    // }
    div {
      display: flex;
      align-items: center;
      flex: 1;
      margin-bottom: 10px;
    }
    img {
      margin-right: 5px;
    }
    .teamName {
      color: var(--100, #fff);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  }
  .item-line {
    display: flex;
    margin-bottom: 10px;
    gap: 10px;
    column-gap: 20px;
    &.multiple {
      flex-wrap: wrap;
      .odds-item {
        flex-basis: calc(33.33% - 10px); /* 1/3 宽度，减去间隔 */
      }
    }
    &.twoIineRow {
      .odds-item {
        flex-basis: calc(50% - 10px);
      }
    }
    &.oneInoneRow {
      flex-direction: column;
    }
  }
  .odds-item {
    padding: 2px 8px;
    border-radius: 8px;
    background: #232949;
    border: 1px solid transparent;
    flex: 1;
    min-height: 50px;
    text-align: center;
    cursor: pointer;
    .sold {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
    .score-number {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .odds {
      display: flex;
      align-items: center;
      .num {
        color: var(--100, #fff);
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 18px; /* 100% */
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
      flex-direction: column;
      cursor: no-drop;
      height: 50px;
      svg {
        fill: #cccccc;
        margin-top: 4px;
      }
      .score-number {
        font-size: 14px;
        font-weight: 400;
        color: var(--60, rgba(255, 255, 255, 0.6));
        // margin-top: 4px;
      }
    }
    &.active {
      // border-color: #ff5000;
      border: 1px solid var(--unnamed, #f35f1b);
      color: var(--unnamed, #f35f1b);
      // background: #fff0e9;
      .score-number,
      .odds .num {
        color: var(--unnamed, #f35f1b);
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
.no-data {
  color: #666;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  width: 375px;
  margin-top: 70px;
  img {
    width: 200px;
    height: 125px;
  }
}
</style>
