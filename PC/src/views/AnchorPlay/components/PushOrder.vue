<template>
  <div class="boxPush">
    <div class="pushTop">
      <div class="round">
        <div class="showHide" @click="toggleAll">
          <retract :style="{ 'transform': `rotate(${rotation}deg)` }" />
        </div>
        <div class="swiper-anchor">
          <div class="swiper-wrapper pushTop">
            <div v-for="item in tabList" :key="item.key" @click.stop="activeBtn(item.key)"
              :class="{ 'active': item.key === activeTab, 'tabBtn': true }">
              {{ item.value }}
            </div>
          </div>
        </div>
        <!-- <div :class="{'active':item.key==activeTab,'tabBtn':true}" v-for="(item,index) in tabList" :key="index" @click="activeBtn(item.key)">{{ item.value }}</div> -->
      </div>
    </div>

    <div class="pushMain">
      <el-collapse v-if="oddsList.length" v-model="fbStore.mgListIdxs" ref="collapse">
        <el-collapse-item v-for="(item, index) in oddsList" :key="index" :name="item.idx" :title="item.nm">
          <div class="odds-box">
            <!-- 球队头信息 -->
            <div v-if="!oneInoneRow(item.mty) && hideTeamTitle(item.mty)" class="title">
              <div>
                <img height="24" width="24" :src="teamInfo[0]?.lurl || defaultIcon" />
                <span class="teamName">{{ teamInfo[0]?.na }}</span>
              </div>
              <div v-if="showTie(item.mty)">{{ $t('AnchorPlay.Tie') }}</div>
              <div>
                <img height="24" width="24" :src="teamInfo[1]?.lurl || defaultIcon" />
                <span class="teamName">{{ teamInfo[1]?.na }}</span>
              </div>
            </div>
            <!-- 某种玩法多线路 -->
            <div :class="{
              multiple: option.op.length > 3,
              oneInoneRow: oneInoneRow(item.mty),
              twoIineRow: twoIineRow(item.mty)
            }" class="item-line" v-for="(option, lineIdx) in item.mks" :key="lineIdx">
              <!-- 单个线路下的2个或多个选项 -->
              <div :class="{
                active: betCartStore.betList.find(
                  (bet) =>
                    `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
                    `${option.id}-${team.ty}-${team.nm}`
                )
              }" class="odds-item" v-for="(team, idx) in option.op" :key="idx"
                @click="handleBetting(team, option, item, $event)">
                <div class="sold" v-if="isSolding(option.ss, team.od)">
                  <div class="score-number">
                    {{ team.nm }}
                  </div>
                  <div class="odds" :class="getChangeState(team.od, idx, lineIdx, index)">
                    <div class="num">
                      {{ getOddFormat(team.od, fbStore.settings.oddsFormat) }}
                    </div>
                    <IconKLineArrow v-if="getChangeState(team.od, idx, lineIdx, index)" class="arrow" />
                  </div>
                </div>
                <div v-else class="ss-closed">
                  <IconLocked />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div v-else>{{ $t('AnchorPlay.NoData') }}~</div>
    </div>
    <!-- 按钮 -->
    <div class="btnDefine">
      <div class="cancelBtn" @click="removeOrderBtn">{{ $t('AnchorPlay.Cancel') }}</div>
      <div class="submitBtn" @click="pushOrderBtn">{{ $t('AnchorPlay.Sure') }}</div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import retract from '@/components/icons/retract.vue'
import { useFBStore } from '@/stores/fb'
import { uniq } from 'lodash'
import { getSportGamePlay } from '@/hooks/useSportDict'
import { getOddFormat, isSolding } from '@/hooks/useSportDict'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
import Swiper from 'swiper'
import { setPushOrder } from '@/api/liveBroadcast'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
const emit = defineEmits(['closeDialog'])
const fbStore = useFBStore()
const userStore = useUserStore()
const betCartStore = useBetCartStore()
const activeTab = ref('all')
const rotation = ref(0)
const anchorDebut = ref(JSON.parse(localStorage.getItem('AnchorDebut')))
const collapse = ref(null)
let mySwiperAnchor = null
const virtualSlides = ref([])
fbStore.isOperatedMarketsListCollapse = false // 每次进入页面重置操作状态，默认展开所有玩法
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
  const allItem = { key: 'all', value: i18n.global.t('AnchorPlay.All') }
  return [allItem, ...filteredArray]
})
const isCollapse = computed(() => {
  return fbStore.mgListIdxs.length ? false : true
})
const activeBtn = (key) => {
  activeTab.value = key
}
const toggleAll = () => {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  } else {
    fbStore.mgListIdxs = []
  }
  // 标识用户手动操作了详情页玩法列表折叠面板
  fbStore.isOperatedMarketsListCollapse = true
  rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180)
}
const oddsList = computed(() => {
  if (activeTab.value === 'all') {
    return fbStore.matchDetailList.mg || []
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps.length && item.tps.includes(activeTab.value)
      ) || []
    )
  }
})
const oldOddsList = computed(() => {
  if (activeTab.value === 'all') {
    return fbStore.previousMatchDetailData.mg || []
  } else {
    return (
      fbStore.previousMatchDetailData.mg?.filter(
        (item) => item.tps.length && item.tps.includes(activeTab.value)
      ) || []
    )
  }
})
// 一行展示mty
function oneInoneRow(mty) {
  return [].includes(mty)
}
// 展示头部的mty
function hideTeamTitle(mty) {
  //1005  1099
  return [
    3001, 3002, 5002, 5006, 5011, 16003, 16001, 16014, 13004, 15002, 15004, 8008, 8006,
    6001, 6009, 6010, 4004, 4003, 4001, 4008, 51006, 51002, 1000, 1006
  ].includes(mty)
}
// 展示和的mty
function showTie(mty) {
  return [1042, 1009, 1005, 3001, 1005, 1099, 16014, 4003, 6009].includes(mty)
}
// 两行展示的mty
const twoIineRow = (mty) => {
  return [19004, 1109, 1110, 1028, 1101, 1103, 1104, 1105, 1106, 1033, 1012, 1030, 1032, 1115, 1031, 1079,
    3040, 3017, 3041, 3027, 3016, 1018, 5015, 6020, 6012, 6015, 51005, 5006, 5011, 15004].includes(mty)
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
  if (!fbStore.isOperatedMarketsListCollapse) {
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  }
})
// 选中注单
const handleBetting = (team, option, item, e) => {
  console.log(team, option, item, e, 'team, option, item, e')
  if (!userStore.isLogin) {

    return
  }
  // 未开售状态无法加入购物车
  if (!isSolding(option.ss, team.od)) return
  const matchId = anchorDebut.value.gameId
  const match = fbStore.matchDetailList
  const betObj = {
    id: option.id,
    // ss: option.ss,
    // au: option.au,
    // uniStake: '',
    // matchId,
    betMatchMarket: {
      // matchId,
      // marketId: option.id, // 玩法id
      // odds: team.od, // 赔率
      optionType: team.ty // 投注类型
    },
    // // 展示类型数据
    visible: {
      // teamName: team.na, // 球队名称
      betOpTitle: team.nm, // 投注项名称 -0/0.5
      // title: match.nm, // 比赛标题 teamA vs teamB
      // marketTitle: item.nm, //  盘口玩法简称
      // lgName: match.lg.na, // 联赛名称
      // begainTime: match.bt // 开始时间
    },
    marketId: option.id, // 玩法id  加个字段
    betMarket: team.nm,
    betOdds: team.od,
    cusName: fbStore.matchDetailList.ts[1].na,//客队
    gameId: matchId,
    gameTimestamp: match.bt,
    leagueName: match.lg.na,
    orderTitle: item.nm,
    liveRoomTitle: anchorDebut.value.roomTitle,
    liveStreamId: anchorDebut.value.id,
    mainName: fbStore.matchDetailList.ts[0].na,//主队
    pushType: 1,
    sportsType: anchorDebut.value.roomStyle,
    pushUserId: anchorDebut.value.presenterId,
    pushUserName: anchorDebut.value.presenterName,
    betStyle: team.ty, // 投注类型
    matchTeam: fbStore.matchDetailList.nm,
    betStyleName: team.na,
    pushModel: 0
  }
  betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
  // console.log(betCartStore.betList, 'betCartStore.betList', e.pageX, e.pageY)
}
//推单
const pushOrderBtn = async () => {
  console.log('betCartStore.betList,', betCartStore.betList)
  try {
    if (betCartStore.betList && betCartStore.betList.length > 0) {
      setPushOrder(betCartStore.betList).then((res) => {
        console.log(res, '-----------')
        if (res.code == 200) {
          let obj = betCartStore.betList
          betCartStore.betList = obj
          ElMessage({
            message: i18n.global.t('AnchorPlay.SuccessfulOrder'),
            type: 'success'
          })
          emit('closeDialog')
        }
      })
    }
  } catch (e) {
    console(e)
  }
}
const removeOrderBtn = () => {
  emit('closeDialog')
}
onMounted(() => {
  mySwiperAnchor = new Swiper('.swiper-anchor', {
    slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
    virtual: {
      slides: virtualSlides.value // 设置虚拟 Slide 数据
    },
    slidesPerGroup: 3, //几个为一组
    spaceBetween: '10', //边距20px
    grabCursor: true //光标显示手指滑动
  })
  mySwiperAnchor.on('slideChange', handleSlideChange)

})
const handleSlideChange = () => {

}
</script>

<style lang="scss" scoped>
.boxPush {
  width: 100%;
  overflow: hidden;

  .pushTop {
    display: flex;
    align-items: center;
    column-gap: 10px;

    .swiper-anchor {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0 0 0 10px;
      z-index: 1;
    }

    .swiper-wrapper {
      display: flex;
      align-items: center;
      scrollbar-width: none; //火狐浏览器 隐藏滚动条
      position: relative;
      white-space: nowrap;
      flex-wrap: nowrap;
    }
    .swiper-slide{
        flex-shrink: 0;
    }
    .round {
      display: flex;
      align-items: center;
    }

    .showHide {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.60);
      cursor: pointer;
    }

    .tabBtn {
      min-width: 50px;
      height: 24px;
      border-radius: 46px;
      border: 1px solid rgba(255, 255, 255, 0.20);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: #fff;
      
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 0;
      cursor: pointer;
      padding: 0 6px;
    }

    .active {
      background: var(--1, linear-gradient(90deg, #FF9000 0.17%, #FF5000 101.4%));
      border: 0;
    }
  }

  .btnDefine {
    height: 40px;
    flex-shrink: 0;
    text-align: center;
    
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    div {
      width: 160px;
      height: 40px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cancelBtn {
      border: 1px solid var(--unnamed, #F35F1B);
      color: var(--unnamed, #F35F1B);
      cursor: pointer;

    }

    .submitBtn {
      color: #FFF;
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      margin-left: 20px;
      cursor: pointer;
    }
  }

  .pushMain {
    height: 600px;
    overflow-y: auto;
    scrollbar-width: none; //火狐浏览器 隐藏滚动条
    margin-top: 10px;
  }
}

.pushMain :deep() {

  .el-collapse,
  .el-collapse-item,
  .el-collapse-item__header,
  .el-collapse-item__wrap,
  .el-collapse-item__content {
    background: none;
    border: 0;
    color: #FFF;
    padding-bottom: 2px;
  }

  .el-collapse-item__header {
    height: 40px;
    color: var(--100, #FFF);
    
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    /* 114.286% */
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);

  }

  .is-active i {
    transform: rotate(90deg);
  }

  .el-collapse-item__arrow {
    transform: rotate(-90deg);
  }

  .el-sub-menu__title {
    display: flex;
    color: rgba(255, 255, 255, 1);
  }

  .el-sub-menu .el-sub-menu__icon-arrow {
    color: #FFF;
  }

  //   .el-collapse-item > div:first-child {
  //     width:100%;
  //     display: flex;
  //     align-items: center;
  //     justify-content:space-between;
  //   }
}

.odds-box {
  margin-top: 10px;

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
      justify-content: center;
      flex: 1;
      margin-bottom: 10px;
    }

    img {
      margin-right: 5px;
    }

    .teamName {
      color: var(--100, #FFF);
      
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      /* 114.286% */
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
        flex-basis: calc(33.33% - 10px);
        /* 1/3 宽度，减去间隔 */
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
    padding: 0 8px;
    border-radius: 8px;
    background: #1A1F37;
    border: 1px solid transparent;
    flex: 1;
    height: 32px;
    cursor: pointer;

    .sold {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
    }

    .score-number {
      
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      color: var(--60, rgba(255, 255, 255, 0.60));
    }

    .odds {
      display: flex;
      align-items: center;

      .num {
        color: var(--100, #FFF);
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        /* 100% */
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
      cursor: no-drop;

      svg {
        fill: #cccccc;
      }

      .score-number {
        
        font-size: 14px;
        font-weight: 400;
        color: var(--60, rgba(255, 255, 255, 0.60));
        margin-top: 4px;
      }
    }

    &.active {
      border-color: #353F70;
      background: #353F70;
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
}</style>