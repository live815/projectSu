<template>
  <div class="fixed-bottom-operation">
    <!-- 头 -->
    <div class="tit">
      <div
        v-if="sos.length && sos.length > defaultShowMultiMarketLength"
        @click="collapse = !collapse"
      >
        <h4 v-if="!collapse">
          <IconCollapsed /><span>{{ $t('Sportsview.tip8') }}</span>
        </h4>
        <h4 v-else>
          <IconUnCollapse /><span>{{ $t('Sportsview.tip9') }}</span>
        </h4>
      </div>
      <p class="delete-all" @click.stop="deleteAllBetList">
        <span>{{ $t('Sportsview.deleteall') }}</span>
        <IconDelete />
      </p>
    </div>
    <div class="markets-list" v-if="filterSos.length || props.data">
      <div class="item" v-for="(market, idx) in filterSos" :key="idx">
        <Calculator
          :disabled="betCartStore.canMultiBetsList.length < 2"
          :min="market.mi"
          :max="market.mx"
          @update:modelValue="updateBetUniStake($event, market)"
          :modelValue="market.unitStake"
          :alignRight="true"
        >
          <template #label>
            <div class="market">
              <p class="ty-odd">
                <span class="ty">{{ getMarketText(market) }}</span>
                <span class="odd">@{{ market.sodd.toFixed(2) }}</span>
              </p>
              <p class="single-can-win">
                <span>{{ $t('Sportsview.winnable') }} </span
                ><span class="amount"><CurrencyUnit />{{ shouldWin(market).toFixed(2) }}</span>
              </p>
            </div>
          </template>
        </Calculator>
      </div>
    </div>
    <!-- <div style="text-align: center" v-else>
      <van-loading color="#ff5000" />
    </div> -->

    <!-- 总金额计算 -->
    <div class="total-amount">
      <div class="flex-title">
        <span class="title">{{ $t('Sportsview.Betamount2') }}</span>
        <span class="title"><CurrencyUnit />{{ totalBet.toFixed(2) }}</span>
      </div>
      <div class="flex-title">
        <span class="title">{{ $t('Sportsview.winamount') }}</span>
        <span class="title-red"><CurrencyUnit />{{ totalWin.toFixed(2) }}</span>
      </div>
    </div>

    <!-- 按钮 -->
    <v-button
      :disabled="!availableInputUniStake"
      :disabled-has-color="!availableInputUniStake"
      @click="subimtBet"
    >
      <template v-if="!loading">
        <span>{{ $t('Sportsview.bet2') }}</span>
        <span class="can-win" v-if="shouldWin"
          >({{ $t('Sportsview.tip10')
          }}<span class="symbol" v-if="appStore.language === 'vi'">₫</span
          ><span class="symbol" v-else><CurrencyUnit /></span>{{ totalWin.toFixed(2) }})</span
        >
      </template>
      <van-loading color="#fff" v-else />
    </v-button>
  </div>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import Calculator from './Calculator.vue'
import { useBetCartStore } from '@/stores/betCart'
import { useFBStore } from '@/stores/fb'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const userStore = useUserStore()
const betCartStore = useBetCartStore()
const fbStore = useFBStore()
const loading = ref(false)
const collapse = ref(true) // 默认折叠状态
const defaultShowMultiMarketLength = 3
import { showConfirmDialog } from 'vant'
import i18n from '@/i18n'
let fetchOrderStatusTimer = null

const props = defineProps(['data'])

const sos = computed(() => {
  let res = [...betCartStore.sos]
  res.sort((a, b) => a.sn - b.sn)
  if (res.length > 2) {
    res.push(res.shift())
  }
  return res
})

const filterSos = computed(() => {
  return collapse.value ? sos.value.slice(0, defaultShowMultiMarketLength) : sos.value
})

// 总投注额
const totalBet = computed(() => {
  return sos.value.reduce((accumulator, market) => {
    return accumulator + (Number(market.unitStake) || 0) * market.in
  }, 0)
})

// 总可赢额
const totalWin = computed(() => {
  return sos.value.reduce((accumulator, market) => {
    return accumulator + (Number(market.unitStake) * (market.sodd - market.in) || 0)
  }, 0)
})
const availableInputUniStake = computed(() => {
  return sos.value.some(
    (market) =>
      Number(market.unitStake) >= market.mi &&
      Number(market.unitStake) <= market.mx &&
      Number(market.unitStake) <= userStore.balance
  )
})

// 单个玩法可赢
function shouldWin(market) {
  return Number(market.unitStake) * (market.sodd - market.in) || 0
}
function deleteAllBetList() {
  showConfirmDialog({
    title: i18n.global.t('Sportsview.Kindtips'),
    message: i18n.global.t('Sportsview.tip11')
  })
    .then(() => {
      betCartStore.removeAllBets()
    })
    .catch(() => {})
}

function updateBetUniStake(unitStake, market) {
  betCartStore.sos.forEach((item) => {
    if (item.id === market.id) {
      item.unitStake = unitStake
    }
  })
}

async function subimtBet() {
  const canSubmitMultiBetMarkets = sos.value.filter((market) => Number(market.unitStake))
  const betMultipleData = canSubmitMultiBetMarkets.map((market) => {
    return {
      oddsChange: fbStore.settings.oddsChange,
      itemCount: betCartStore.canMultiBetsList.length,
      seriesValue: market.sn,
      unitStake: market.unitStake
    }
  })
  // 存储提交时的投注金额与赔率与可赢额 用于注单确认框
  betCartStore.canSubmitMultiBetMarkets = canSubmitMultiBetMarkets.map((market) => {
    let obj = {
      multiMarketText: getMarketText(market), // 几串几,
      shouldWin: shouldWin(market).toFixed(2),
      unitStake: (Number(market.unitStake) * market.in || 0).toFixed(2),
      sodd: market.sodd.toFixed(2)
    }
    return obj
  })
  const reqData = {
    betMultipleData,
    betOptionList: betCartStore.canMultiBetsList.map((bet) => {
      bet.betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
      return bet.betMatchMarket
    })
  }
  loading.value = true
  try {
    const orderList = await betCartStore.submitMultiple(reqData)
    let orderIds = orderList.map((item) => item.id)
    betCartStore.orderList = orderList // 获取订单列表并保存
    if (orderList && orderList.length) {
      // 注单提交成功之后，更新注单在下单成功时的实时赔率
      updateBetOddsWhenSuccessOrdered()
      betCartStore.closeBetCart()
      let isOrderConfirmed = orderList.every((order) => order.st === 4)
      if (!isOrderConfirmed) {
        // 打开注单确认弹框
        betCartStore.openConfirmDialog()
        let reqData = {
          orderIds
        }
        betCartStore.getStakeOrderStatus(reqData)
        fetchOrderStatusTimer = setInterval(() => {
          if (!betCartStore.orderConfirmStatus) {
            clearInterval(fetchOrderStatusTimer)
            return
          }
          betCartStore.getStakeOrderStatus(reqData)
        }, 1000)
      } else {
        showToast(i18n.global.t('Sportsview.tip12'))
      }
    }
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}
function updateBetOddsWhenSuccessOrdered() {
  betCartStore.canMultiBetsList.forEach((bet) => {
    if (betCartStore.orderList.length) {
      let newBet = betCartStore.orderList[0]?.ops.find((item) => item.mid === bet.id)
      if (newBet) {
        let key = newBet.of === 1 ? 'od' : 'bod'
        bet.betMatchMarket.odds = newBet[key]
      }
    }
  })
}

// 几串几
function getMarketText(market) {
  let sn = market.sn // 比赛场次
  let combinations = market.in // 注码组合数
  const totalMatchs = betCartStore.canMultiBetsList.length
  let matchs = sn || totalMatchs
  let chuan = 1
  if (sn === 0) {
    chuan = combinations
  }
  return `${matchs}${i18n.global.t('Sportsview.string')}${chuan}*${combinations}`
}

// 关闭定时器
watchEffect(() => {
  if (!betCartStore.isOpenConfirmDialog) {
    clearInterval(fetchOrderStatusTimer)
  }
})
</script>

<style lang="scss" scoped>
.fixed-bottom-operation {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px 15px;
  background: #fff; //#f2f3f5;
  box-shadow: 0px -6px 16px rgba(0, 0, 0, 0.1);
  @include safeAreaBottom(10px);
  .tit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    h4 {
      color: var(--color-text-dark);
      // font-size: 14px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 5px;
        margin-top: 2px;
      }
    }
    p.delete-all {
      font-size: 12px;
      display: flex;
      align-items: center;
      color: var(--color-text-light);
      svg {
        fill: var(--color-text-light);
        margin-left: 5px;
      }
      margin-left: auto;
    }
  }

  .markets-list {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    max-height: 300px;
    overflow: auto;
    .item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .market {
        flex: 0 0 auto;
        min-width: 100px;
        font-size: 13px;
        line-height: 20px;
        margin-right: 8px;
        .ty-odd {
          font-size: 13px;
        }
        .ty {
          color: var(--color-text-dark);
        }
        .odd {
          color: var(--color-orange);
          font-weight: 600;
          margin-left: 2px;
        }
        .single-can-win {
          span {
            font-size: 8px;
          }
          .amount {
            color: var(--color-danger);
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
.total-amount {
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .flex-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.can-win {
  font-size: 14px;
  margin: 0 4px;
}
.symbol {
  margin: 0 5px;
}
</style>
