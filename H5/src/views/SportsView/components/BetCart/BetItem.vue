<template>
  <div class="bet-item">
    <!-- 主体信息 -->
    <div class="info">
      <div class="left">
        <!-- 投注项目 -->
        <h4 class="bet-project">
          <!-- 是否 显示主客队 -->
          <span v-if="[1, 2].includes(item.betMatchMarket.optionType)" style="margin-right: 8px">{{
            item.visible.teamName
          }}</span>
          <span>{{ item.visible.betOpTitle }}</span>
        </h4>
        <!-- 盘口玩法简称 -->
        <p class="market-title">
          <span v-if="item.ip == 1">{{ $t('common.sportLive') }}-</span>
          {{ item.visible.marketTitle }}
          <!-- 下注时的比分 -->
          <span class="re" style="margin: 0 3px" v-if="item.re">({{ item.re }})</span>
          [{{ getOddFormatText(fbStore.settings.oddsFormat) }}]
        </p>
        <!-- 球队 -->
        <p class="teams">
          {{ item.visible.title }}
        </p>
        <!-- 联赛 -->
        <p class="lg">
          {{ item.visible.lgName }}
        </p>
      </div>
      <div class="right">
        <div class="odds" :class="item.changeStateClass">
          <div class="tit">
            <p>@{{ getOddFormat(item.betMatchMarket.odds, fbStore.settings.oddsFormat) }}</p>
            <IconKLineUp v-if="item.changeStateClass === 'up'" />
            <IconKLineArrow v-if="item.changeStateClass === 'down'" />
          </div>
          <p class="win" v-if="shouldWin && !betCartStore.isSelectSeries">
            <span class="label"> {{ $t('Sportsview.tip1') }}{{ $t('Sportsview.winnable') }} </span>
            <span class="amount"><CurrencyUnit />{{ shouldWin.toFixed(2) }}</span>
          </p>
          <!-- <p class="odd-text" v-if="item.changeStateClass">赔率变化</p> -->
        </div>
        <p @click="deleteBetItem(item)" class="delete">
          <IconDelete />
        </p>
      </div>
    </div>

    <Calculator
      style="margin-top: 15px"
      :hasBookFunc="true"
      :min="item.smin"
      :max="item.smax"
      :bet="item"
      :index="index"
      v-model="item.unitStake"
      @updateIsBooking="updateIsBooking"
      :isBooking="item.isBooking"
      v-if="isShowCalc"
    />
    <!-- 关闭状态 -->
    <div class="close-state" v-if="!isOpenStatusCanBet">
      <span @click.stop="deleteBetItem(item)" class="box">
        <span class="text">{{ $t('Sportsview.tip3') }}</span>
        <IconDelete />
      </span>
    </div>
    <!-- 不支持串关 -->
    <div class="close-state" v-else-if="notAllowMultiBet && betCartStore.isSelectSeries">
      <span @click.stop="deleteBetItem(item)" class="box">
        <span class="text">{{ $t('Sportsview.tip4') }}</span>
        <IconDelete />
      </span>
    </div>
    <!-- 不可选择同个赛事 -->
    <div class="close-state" v-else-if="hasSameMatch">
      <span @click.stop="deleteBetItem(item)" class="box">
        <span class="text">{{ $t('Sportsview.tip5') }}</span>
        <IconDelete />
      </span>
    </div>
    <!-- 不可预约状态 -->
    <div :class="{ 'close-state': !item.isBooking && isBooking }"></div>
  </div>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import Calculator from './Calculator.vue'
import { getOddFormatText, getOddFormat } from '@/hooks/useSportDict'
import { useBetCartStore } from '@/stores/betCart'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  isShowCalc: {
    type: Boolean,
    default: true
  },
  isBooking: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number
  }
})
const emit = defineEmits(['delete', 'updateIsBooking'])
function deleteBetItem(betItem) {
  emit('delete', betItem)
}

// 开售状态，可下注
const isOpenStatusCanBet = computed(() => {
  return props.item.ss === 1 && props.item.betMatchMarket.odds > 0
})

// 不支持串关
const notAllowMultiBet = computed(() => {
  return props.item.au !== 1
})

// 存在相同赛事
const hasSameMatch = computed(() => {
  return (
    betCartStore.betList.filter((bet) => bet.matchId === props.item.matchId).length > 1 &&
    betCartStore.isSelectSeries
  )
})

// 可赢
const shouldWin = computed(() => {
  return Number(props.item.unitStake) * (props.item.betMatchMarket.odds - 1) || 0
})
// 更新isBooking状态
function updateIsBooking(isBooking, unitStake) {
  const item = props.item
  item.isBooking = isBooking
  nextTick(() => {
    item.unitStake = unitStake
  })
}
</script>

<style lang="scss" scoped>
.bet-item {
  margin: 10px 7px 0;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  line-height: 1.5;
  position: relative;
  .info {
    display: flex;
    justify-content: space-between;
    .left {
      .bet-project {
        color: var(--color-text-dark);
        font-size: 15px;
        font-weight: 600;
      }
      .market-title {
        color: var(--color-text-dark);
        margin: 4px 0;
      }
      .teams {
        @include ellipsis();
        margin-bottom: 4px;
        font-size: 12px;
        color: var(--color-text-light);
      }
      .lg {
        @include ellipsis();
        font-size: 12px;
        color: var(--color-text-light);
      }
    }
    .right {
      flex: 0 0 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .odds {
        color: var(--color-orange);
        align-self: flex-end;
        .tit {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          text-align: right;
          p {
            font-weight: 600;
            flex: 1;
          }
        }
        svg {
          width: 14px;
          height: 14px;
          margin-left: 2px;
        }
        .odd-text {
          font-size: 13px;
          text-align: center;
        }
        .win {
          text-align: right;
          font-size: 10px;
          .label {
            color: var(--color-text-light);
          }
          .amount {
            font-size: 12px;
            font-weight: 600;
            color: var(--color-danger);
          }
        }
        &.up {
          color: var(--color-danger);
          svg {
            fill: var(--color-danger);
          }
        }
        &.down {
          color: var(--color-green);
          svg {
            fill: var(--color-green);
            margin-top: 3px;
          }
        }
      }
      .delete {
        align-self: flex-end;
      }
      svg {
        fill: var(--color-text-light);
      }
    }
  }
  .close-state {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
      display: flex;
      align-items: center;
      color: var(--color-orange);
      font-size: 14px;
      .text {
        font-weight: 600;
      }
      svg {
        fill: var(--color-orange);
        width: 18px;
        height: 18px;
        margin-left: 5px;
      }
    }
  }
}
</style>
