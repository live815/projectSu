<template>
  <!-- 头有三种状态 对应三种颜色 三个icon -->
  <div class="header" :class="getStatusClass">
    <template v-if="betCartStore.orderConfirmStatus">
      <h4>{{ $t('Sportsview.tip1') }}</h4>
      <van-loading size="22" />
    </template>
    <template v-else-if="betCartStore.orderSuccessStatus">
      <h4>{{ $t('Sportsview.betsuccess') }}</h4>
      <van-icon name="passed" />
    </template>
    <template v-else-if="betCartStore.orderFailStatus">
      <h4>{{ $t('Sportsview.Betfailed') }}</h4>
      <van-icon name="close" />
    </template>
    <template v-else>
      <h4>{{ $t('Sportsview.tip1') }}</h4>
      <van-loading size="22" />
    </template>
  </div>
  <div class="content">
    <!-- 投注的每种串关玩法的投注额与可赢额 -->
    <div
      class="multi-markets"
      v-if="betCartStore.isSelectSeries && betCartStore.canSubmitMultiBetMarkets.length"
    >
      <div class="item" v-for="(market, idx) in betCartStore.canSubmitMultiBetMarkets" :key="idx">
        <!-- left -->
        <div class="market">
          <p class="ty-odd">
            <span class="ty">{{ market.multiMarketText }}</span>
            <span class="odd">@{{ market.sodd }}</span>
          </p>
          <p class="single-can-win">
            <span>{{ $t('Sportsview.tip2') }} </span
            ><span class="amount"><CurrencyUnit />{{ market.shouldWin }}</span>
          </p>
        </div>
        <!-- right -->
        <div class="bet">
          <span>{{ $t('Sportsview.Betamount') }}{{ market.unitStake }}</span>
        </div>
      </div>
    </div>
    <!-- 注单列表 -->
    <div class="bet-list" v-if="confirmBetList.length">
      <div class="bet-item" v-for="item in confirmBetList" :key="item.id">
        <div class="info">
          <div class="left">
            <!-- 投注项目 -->
            <h4 class="bet-project">
              <!-- 是否 显示主客队 -->
              <span
                v-if="[1, 2].includes(item.betMatchMarket.optionType)"
                style="margin-right: 8px"
                >{{ item.visible.teamName }}</span
              >
              <span>{{ item.visible.betOpTitle }}</span>
            </h4>
            <!-- 盘口玩法简称 -->
            <p class="market-title">
              {{ item.visible.marketTitle }}
              <span class="re" style="margin: 0 3px;" v-if="item.re">({{ item.re }})</span>
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
            <div class="odds">
              <p class="tit">
                <span
                  >@{{ getOddFormat(item.betMatchMarket.odds, fbStore.settings.oddsFormat) }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <!-- 金额 -->
        <div class="amount-wrapper" v-if="!betCartStore.isSelectSeries">
          <div class="win-amount">
            <span>{{ $t('Sportsview.tip2') }} </span>
            <span class="red"><CurrencyUnit />{{ shouldWin(item).toFixed(2) }}</span>
          </div>
          <div class="bet-amount">
            <span>{{ $t('Sportsview.Betamount') }} </span>
            <span><CurrencyUnit />{{ Number(item.unitStake).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 底部区域 -->
  <div class="bottom-wrapper">
    <!-- 总金额计算 -->
    <div class="total-amount">
      <div class="flex-title">
        <span class="title">{{ $t('Sportsview.Betamount2') }} </span>
        <span class="title"
          ><CurrencyUnit />{{
            betCartStore.isSelectSeries ? multiTotalBet.toFixed(2) : totalBet.toFixed(2)
          }}</span
        >
      </div>
      <div class="flex-title">
        <span class="title">{{ $t('Sportsview.winamount') }} </span>
        <span class="title-red"
          ><CurrencyUnit />{{
            betCartStore.isSelectSeries ? multiTotalWin.toFixed(2) : totalWin.toFixed(2)
          }}</span
        >
      </div>
    </div>
    <div class="btn-wrapper">
      <div @click="saveBetList" class="confirm">{{ $t('Sportsview.Reservebets') }}</div>
      <v-button @click="close">{{ $t('Sportsview.sure') }}</v-button>
    </div>
  </div>
</template>

<script setup>
import { useBetCartStore } from '@/stores/betCart'
import { useFBStore } from '@/stores/fb'
import { computed } from 'vue'
import { getOddFormatText, getOddFormat } from '@/hooks/useSportDict'
const betCartStore = useBetCartStore()
const fbStore = useFBStore()

const confirmBetList = computed(() => {
  return betCartStore.isSelectSeries ? betCartStore.canMultiBetsList : betCartStore.submitBetList
})
function shouldWin(item) {
  return Number(item.unitStake) * (item.betMatchMarket.odds - 1) || 0
}
const getStatusClass = computed(() => {
  let res = ''
  if (betCartStore.orderSuccessStatus) return 'success'
  if (betCartStore.orderFailStatus) return 'fail'
  return res
})
// 单关总投注额
const totalBet = computed(() => {
  return betCartStore.submitBetList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) || 0)
  }, 0)
})
// 单关总可赢额
const totalWin = computed(() => {
  return betCartStore.submitBetList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) * (bet.betMatchMarket.odds - 1) || 0)
  }, 0)
})

// 串关总投注额
const multiTotalBet = computed(() => {
  return betCartStore.sos.reduce((accumulator, market) => {
    return accumulator + (Number(market.unitStake) || 0) * market.in
  }, 0)
})

// 串关总可赢额
const multiTotalWin = computed(() => {
  return betCartStore.sos.reduce((accumulator, market) => {
    return accumulator + (Number(market.unitStake) * (market.sodd - market.in) || 0)
  }, 0)
})

// 保留选项
function saveBetList() {
  betCartStore.closeConfirmDialog()
}
function close() {
  betCartStore.closeConfirmDialog()
  betCartStore.removeAllBets()
}
</script>

<style lang="scss" scoped>
$appHeight: var(--app-height);
$popHeight: calc($appHeight * 0.75);
$headerHeight: 50px;
$fixedBottomHeight: 120px;

.header {
  display: flex;
  align-items: center;
  height: 50px;
  color: var(--color-orange);
  border-bottom: 1px solid #eee;
  @include mobile-padding();
  h4 {
    font-size: 15px;
    font-weight: 600;
  }
  .van-icon {
    font-size: 18px;
    margin-left: 6px;
  }
  .van-loading {
    margin-left: 4px;
    color: var(--color-orange);
  }

  &.success {
    color: var(--color-green);
  }
  &.fail {
    color: var(--color-danger);
  }
}
.content {
  overflow: auto;
  height: calc($popHeight - $headerHeight);
  padding-bottom: 20px;
  background: #f7f7f7;
  padding-bottom: calc($fixedBottomHeight + 40px);
  @include clearfix();
  .multi-markets {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 15px;
      line-height: 20px;
      .market {
        .ty-odd {
          font-size: 15px;
        }
        .ty {
          color: var(--color-text-dark);
          margin-right: 10px;
          font-weight: 400;
        }
        .odd {
          font-weight: 600;
          color: var(--color-orange);
        }
        .single-can-win {
          margin-top: 2px;
          span {
            font-size: 12px;
            color: var(--color-text-light);
          }
          .amount {
            color: var(--color-danger);
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
      .bet {
        color: var(--color-text-light);
        font-size: 12px;
      }
    }
  }
  .bet-item {
    margin: 10px;
    padding: 15px 15px;
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
            text-align: right;
            span {
              font-weight: 600;
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
    .amount-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-text-light);
      margin-top: 8px;
      font-size: 13px;
      .red {
        color: var(--color-danger);
        font-weight: 600;
      }
    }
  }
}
.bottom-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f7f7f7;
  @include safeAreaBottom(10px);
  .total-amount {
    @include mobile-padding();
    margin-bottom: 10px;
    margin-top: 10px;
    .flex-title {
      display: flex;
      justify-content: space-between;
      .title {
        color: #999;
        font-size: 12px;
        line-height: 1.6;
      }
      .title-red {
        color: #f53f3f;
        font-size: 12px;
        line-height: 16px;
        font-weight: 600;
      }
    }
  }
  .btn-wrapper {
    @include mobile-padding();
    display: flex;
    justify-content: space-between;
    .confirm {
      border-radius: 6px;
      border: 0.5px solid #f00;
      background: #fff;
      width: 120px;
      flex: 0 0 120px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #ff5000;
      text-align: center;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
    }
    button {
      flex: 1;
      margin-left: 10px;
    }
  }
}
</style>
