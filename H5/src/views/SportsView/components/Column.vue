<template>
  <div class="column" :class="getLayoutClass">
    <h4>{{ getMarketTypeText(column) }}</h4>
    <div class="list">
      <div
        :class="{
          active: betCartStore.betList.find(
            (bet) =>
              `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
              `${option.id}-${team.ty}-${team.nm}`
          )
        }"
        class="item"
        :data-id="option.id"
        v-for="(team, idx) in option.op"
        :key="team.ty"
        @click.stop="selectOption($event, team)"
      >
        <!-- 正常开售 -->
        <div class="sold" v-if="isSolding(option.ss, team.od)">
          <span class="name">{{ team.nm?.replace(/\s/g, '') }}</span>
          <div class="odds" :class="getChangeState(team.od, idx)">
            <span class="num">{{ getOddFormat(team.od, fbStore.settings.oddsFormat) }}</span>
            <IconKLineArrow v-if="getChangeState(team.od, idx)" class="arrow" />
          </div>
        </div>
        <!-- 封盘 展示锁 -->
        <p class="ss-closed" v-else-if="option.ss === 0"><IconLocked /></p>
        <!-- 其他 展示'-' -->
        <p class="ss-closed" v-else><IconLocked /></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
import { useFBStore } from '@/stores/fb'
import { getMarketTypeText, getOddFormat, isSolding } from '@/hooks/useSportDict'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const betCartStore = useBetCartStore()
const userStore = useUserStore()
const fbStore = useFBStore()
const props = defineProps({
  column: {
    type: Object,
    default: () => ({})
  },
  listing: {
    type: Array,
    default: () => []
  },
  match: {
    type: Object,
    default: () => ({})
  }
})
const prevOption = computed(() => {
  const prevMatch = fbStore.previousMatchList.find((item) => item.id === props.match.id)
  if (prevMatch) {
    const prevColumn = prevMatch.mg?.find((market) => market.mty === props.column.mty)
    if (prevColumn && prevColumn.mks.length) {
      return prevColumn.mks[0]
    }
  }
  return { op: [] }
})
const option = computed(() => {
  return (props.column.mks && props.column.mks.length && props.column.mks[0]) || { op: [{}, {}] }
})
function selectOption(e, team) {
  if (!userStore.isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  // 未开售状态无法加入购物车
  if (!isSolding(option.value.ss, team.od)) return
  // 赔率小于0不存在
  if (team.od < 0) return
  const match = props.match
  const betObj = {
    id: option.value.id, // 注单id / 玩法id
    ss: option.value.ss, // 玩法状态 1开售
    au: option.value.au, // 1支持串关
    unitStake: '', // 金额
    matchId: match.id,
    betMatchMarket: {
      matchId: match.id,
      marketId: option.value.id, // 玩法id
      odds: team.od, // 赔率
      optionType: team.ty // 投注类型
    },
    // 展示类型数据
    visible: {
      teamName: team.na, // 球队名称
      betOpTitle: team.nm, // 投注项名称 -0/0.5
      title: match.nm, // 比赛标题 teamA vs teamB
      marketTitle: getMarketTypeText(props.column), //  盘口玩法简称
      lgName: match.lg.na, // 联赛名称
      begainTime: match.bt // 开始时间
    }
  }
  // toggleBet
  betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
}
function getChangeState(newOd, idx) {
  let oldOd = prevOption.value?.op[idx]?.od
  if (newOd > oldOd) return 'up'
  if (newOd < oldOd) return 'down'
}
const getLayoutClass = computed(() => {
  let listing = props.listing
  let listingLength = listing.length
  let isOdd = listingLength % 2 !== 0
  let isLastColumn = listing.findIndex((o) => o.mty === props.column.mty) === listingLength - 1
  // 基数
  if (isOdd && option.value.op?.length === 3 && isLastColumn) {
    return 'three-in-row'
  }
  // 基数
  if (isOdd && option.value.op?.length === 2 && isLastColumn) {
    return 'two-in-row'
  }
  // 偶数
  if (!isOdd && option.value.op?.length === 3) {
    return 'three-in-column'
  }
  return ''
})
</script>

<style lang="scss" scoped>
.column {
  flex: 1;
  margin-right: 2px;
  @include numFrontFamily();
  &:last-child {
    margin-right: 0;
  }
  h4 {
    font-size: 12px;
    text-align: center;
    margin-bottom: 8px;
    @include ellipsis();
  }
  .item {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background: #f9fbff;
    margin-bottom: 2px;
    text-align: center;
    font-size: 12px;
    border: 1px solid transparent;
    flex: 1;
    .sold {
      display: flex;
      justify-content: space-between;
      padding: 0 4px;
      flex-wrap: nowrap;
    }
    .name {
      font-size: 12px;
    }
    .odds {
      display: flex;
      align-items: center;
      .num {
        color: var(--color-text-dark);
        font-size: 14px;
        font-weight: 600;
      }
      .arrow {
        width: 7px;
        height: 7px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      svg {
        fill: #cbd7e3;
      }
    }

    &.active {
      border-color: #ff5000;
      background: #fff0e9;
      // color: #fff;
      .odds {
        .num {
          // color: #fff;
        }
      }
    }
  }

  &.three-in-row {
    .list {
      display: flex;
      .item {
        height: 80px;
        margin-right: 2px;
        &:last-child {
          margin-right: 0;
        }
        .sold {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
  &.two-in-row {
    .list {
      display: flex;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        margin-right: 2px;
        &:last-child {
          margin-right: 0;
        }
        .sold {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.5;
          .name {
            font-size: 12px;
          }
          .num {
            font-size: 14px;
          }
        }
      }
    }
  }
  &.three-in-column {
    .item {
      height: 26px;
      line-height: 26px;
    }
  }
}
</style>
