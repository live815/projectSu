<template>
  <div class="odds-box">
    <!-- 球队头信息 -->
    <div
      v-if="
        !oneInoneRow(item?.mty) && hideTeamTitle(item?.mty) && !item?.tps.includes('cs') && head
      "
      class="title"
    >
      <div>
        <img class="teamIcon" :src="teamInfo[0]?.lurl || defaultIcon" /><span
          class="teamName"
          >{{ teamInfo[0]?.na }}</span
        >
      </div>
      <div v-if="showTie(item?.mty)">{{ $t('common.tie') }}</div>
      <div>
        <img class="teamIcon" :src="teamInfo[1]?.lurl || defaultIcon" /><span
          class="teamName"
          >{{ teamInfo[1]?.na }}</span
        >
      </div>
    </div>
    <!-- 某种玩法多线路 -->
    <div
      :class="{
        oneInoneRow: option.op.length !== 2 && !isWaveBile,
        twoIineRow: option.op.length === 2 && !isWaveBile
      }"
      class="item-line"
      v-for="(option, lineIdx) in item?.mks"
      :key="lineIdx"
    >
      <!-- 波胆单独处理 -->
      <template v-if="isWaveBile">
        <template v-if="!categorizeData(option.op).solo.length">
          <div
            v-for="(items, index) in ['home', 'drawn', 'away']"
            :key="index"
          >
            <div
              class="odds-item odds-cs"
              v-for="(team, idx) in categorizeData(option.op)[items]"
              :key="idx"
              @click="handleBetting(team, option, item, $event)"
              :class="{
              active: betCartStore?.betList.find(
                (bet) =>
                  `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
                  `${option.id}-${team.ty}-${team.nm}`
              )
            }"
            >
              <div class="sold" v-if="isSolding(option.ss, team.od)">
                <div class="score-number">{{ team.nm }}</div>
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
              <p v-else class="ss-closed">
                <IconLocked />
              </p>
            </div>
          </div>
        </template>
        <template v-else>
          <div>
            <div
              class="odds-item odds-cs-solo"
              v-for="(team, idx) in categorizeData(option.op).solo"
              :key="idx"
            >
              <div class="sold" v-if="isSolding(option.ss, team.od)">
                <div class="score-number">{{ team.nm }}</div>
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
              <p v-else class="ss-closed">
                <IconLocked />
              </p>
            </div>
          </div>
        </template>
      </template>
      <!-- 单个线路下的2个或多个选项 -->
      <template v-else>
        <div
          v-for="(team, idx) in option.op"
          :key="idx"
          @click="handleBetting(team, option, item, $event)"
          :class="{
            active: betCartStore?.betList.find(
              (bet) =>
                `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
                `${option.id}-${team.ty}-${team.nm}`
            ),
            recommend: betStyle === team.ty && option.id === marketId
          }"
          class="odds-item"
        >
          <div v-if="betStyle === team.ty && option.id === marketId" class="recommend-badge">
            <span>{{ $t('common.recommend') }}</span>
          </div>
          <div class="sold" v-if="isSolding(option.ss, team.od)">
            <div class="score-number">{{ team.nm }}</div>
            <div class="odds" :class="getChangeState(team.od, idx, lineIdx, index)">
              <div class="num">
                {{ getOddFormat(team.od, fbStore.settings.oddsFormat) }}
              </div>
              <IconKLineArrow v-if="getChangeState(team.od, idx, lineIdx, index)" class="arrow" />
            </div>
          </div>
          <p v-else class="ss-closed">
            <IconLocked />
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { getOddFormat, isSolding } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import defaultIcon from '@/assets/img/default-team-logo.png'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
// 波胆主队
const homeTeam = [
  110, 120, 121, 130, 131, 132, 140, 141, 142, 143, 150, 151, 152, 153, 154, 160, 161, 162, 163,
  164, 165, 170, 171, 172, 173, 174, 175, 176, 180, 181, 182, 183, 184, 185, 186, 187, 190, 191,
  192, 193, 194, 195, 196, 197, 198
]
// 波胆客队
const awayTeam = [
  101, 102, 103, 104, 105, 106, 107, 108, 109, 112, 113, 114, 115, 116, 117, 118, 119, 123, 124,
  125, 126, 127, 128, 129, 134, 135, 136, 137, 138, 139, 145, 146, 147, 148, 149, 156, 157, 158,
  159, 167, 168, 169, 178, 179, 189
]
// 波胆 和
const drawn = [100, 111, 122, 133, 144, 155, 166, 177, 188, 199, 222, 244, 277]
// 波胆数据分类
const categorizeData = (data) => {
  const result = {
    home: [],
    away: [],
    drawn: [],
    solo: []
  }

  data.forEach((item) => {
    const { ty } = item

    if (homeTeam.includes(ty)) {
      result.home.push(item)
    } else if (awayTeam.includes(ty)) {
      result.away.push(item)
    } else if (drawn.includes(ty)) {
      result.drawn.push(item)
    } else {
      result.solo.push(item)
    }
  })
  return result
}
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    default: 'all'
  },
  index: {
    type: Number
  },
  isWaveBile: {
    type: Boolean,
    required: false,
    default: false
  },
  betStyle: {
    type: Number,
    required: false
  },
  marketId: {
    type: Number,
    required: false
  },
  head: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const teamInfo = computed(() => {
  return fbStore.matchDetailList.ts || []
})

// 上一份玩法列表
const oldOddsList = computed(() => {
  if (props.activeTab === 'all') {
    return fbStore.previousMatchDetailData.mg || []
  } else {
    return (
      fbStore.previousMatchDetailData.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})

// 一行一列
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
// 选中注单
const handleBetting = (team, option, item, e) => {
  if (props.disabled) return

  if (!userStore.isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  // 未开售状态无法加入购物车
  if (!isSolding(option.ss, team.od)) return
  const matchId = route.params.id
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
  betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
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
</script>

<style scoped lang="scss">
.odds-box {
  .title {
    @include center-content(space-between, center);
    text-align: center;
    color: var(--color-text);

    font-size: 13px;
    font-weight: 400;
    gap: 10px;
    > div {
      @include center-content();
      width: 110px;
      margin-bottom: 10px;
    }
    img {
      margin-right: 5px;
    }
    .teamName {
      @include textToOmit();
    }
  }
  .item-line {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
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
    position: relative;
    padding: 0 8px;
    border-radius: 6px;
    background: #f5f6f9;
    border: 1px solid transparent;
    flex: 1;
    height: 40px;
    line-height: 40px;
    .recommend-badge {
      position: absolute;
      right: 0;
      width: 28px;
      height: 10px;
      border-radius: 0px 4px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      color: #fff;
      font-size: 9px;
      line-height: 1 !important;
      text-align: center;
    }
    .sold {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .score-number {
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text);
    }
    .odds {
      display: flex;
      align-items: center;
      .num {
        font-family: DIN Alternate;
        color: var(--color-text-dark);
        font-size: 15px;
        font-weight: 600;
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
      height: 40px;
      svg {
        fill: #cccccc;
      }
    }
    &.active {
      border-color: #ff5000;
      background: #fff0e9;
    }
  }
  .recommend {
    border: 1px solid var(--1, #ff9000);
    background: var(--4, #fff5f0);
  }
  .odds-cs {
    width: 107px;
    margin-bottom: 10px;
  }
  .odds-cs-solo {
    width: 343px;
    margin-bottom: 10px;
  }
  .correct-score {
    width: 107px;
    height: 40px;
  }
  .goalDifference {
    width: 343px;
    height: 40px;
  }
  .teamIcon{
    width: 16px;
    height: 16px;
  }
}
</style>
