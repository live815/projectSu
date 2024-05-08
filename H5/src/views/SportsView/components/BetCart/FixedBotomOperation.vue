<template>
  <div class="fixed-bottom-operation">
    <template v-if="betCartStore.betList.length > 1">
      <div class="tit">
        <h4>{{ $t('Sportsview.Multiplebets') }}</h4>
        <p @click.stop="deleteAllBetList">
          <span>{{ $t('Sportsview.deleteall') }}</span>
          <!-- <IconDeleteAll /> -->
          <IconDelete />
        </p>
      </div>
      <Calculator
        style="margin-top: 0px; margin-bottom: 7px"
        :max="minMaxValue"
        :min="minMinValue"
        :disabled="!canBetOnlyList.length"
        :isOneKeyBet="true"
        v-model="oneKeyNumber"
      />
    </template>
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
    <v-button @click="subimtBet" :disabled="disabledBetBtn" :disabled-has-color="disabledBetBtn">
      <template v-if="!loading">
        <span>{{ $t('Sportsview.bet2') }}</span>
        <span class="can-win" v-if="totalWin"
          >({{ $t('Sportsview.winamount') }}
          <span class="symbol" v-if="appStore.language === 'vi'">₫</span
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
import { minBy } from 'lodash'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { liveStatistics } from '@/api/live'
import { useLiveList } from '@/stores/live'
import storage from 'good-storage'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { userFollowOrderSave } from '@/api/chatroom.js'

const appStore = useAppStore()
const route = useRoute()
const userStore = useUserStore()
const betCartStore = useBetCartStore()
const fbStore = useFBStore()
const liveStore = useLiveList()
const oneKeyNumber = ref('')
const loading = ref(false)
const disabledBetBtn = computed(() => {
  if (betCartStore.betList.length > 1) {
    if (totalBet.value < minMinValue.value || totalBet.value > userStore.balance) return true
    if (oneKeyNumber.value) {
      if (oneKeyNumber.value < minMinValue.value || oneKeyNumber.value > minMaxValue.value)
        return true
    }
  } else {
    if (
      totalBet.value < minMinValue.value ||
      totalBet.value > minMaxValue.value ||
      totalBet.value > userStore.balance
    )
      return true
  }
  return false
})
// 总投注额
const totalBet = computed(() => {
  return betCartStore.betList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) || 0)
  }, 0)
})
// 总可赢额
const totalWin = computed(() => {
  return betCartStore.betList.reduce((accumulator, bet) => {
    return accumulator + (Number(bet.unitStake) * (bet.betMatchMarket.odds - 1) || 0)
  }, 0)
})

const minMinValue = computed(() => {
  return minBy(betCartStore.betList, 'smin')?.smin || 0
})
const minMaxValue = computed(() => {
  return minBy(betCartStore.betList, 'smax')?.smax || 0
})
// 可投注且输入了投注金额的注单列表
const canBetWithAmountList = computed(() => {
  return betCartStore.betList.filter((bet) => {
    return Number(bet.unitStake) && bet.ss === 1 && bet.betMatchMarket.odds > 0
  })
})
// 可投注状态的注单列表
const canBetOnlyList = computed(() => {
  return betCartStore.betList.filter((bet) => {
    return bet.ss === 1 && bet.betMatchMarket.odds > 0
  })
})

// 是否有卫星直播
const isSatelliteLive = computed(() => {
  return liveStore.satelliteLive.some((source) => Number(source.fbId) === route.params.id)
})

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
watchEffect(() => {
  betCartStore.betList.forEach((bet) => {
    bet.unitStake = oneKeyNumber.value
  })
  if (!betCartStore.isOpenBetCart) {
    oneKeyNumber.value = ''
  }
})
let fetchOrderStatusTimer = null
async function subimtBet() {
  // 先保存将要提交的注单列表备用
  let submitBetList = canBetWithAmountList.value
  submitBetList = JSON.parse(JSON.stringify(submitBetList))
  betCartStore.submitBetList = submitBetList
  const reqData = {
    singleBetList: submitBetList.map((bet) => {
      bet.betMatchMarket.oddsFormat = fbStore.settings.oddsFormat
      let obj = {
        oddsChange: fbStore.settings.oddsChange,
        unitStake: bet.unitStake,
        betOptionList: [bet.betMatchMarket]
      }
      return obj
    })
  }
  loading.value = true
  try {
    const orderList = await betCartStore.submitSingleBet(reqData)
    let orderIds = orderList.map((item) => item.id)
    betCartStore.orderList = orderList
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
      }

      // 统计聊天室投注次数、投注金额
      const fromLive = route.query.data === 'fromLive'
      const roomCode = fromLive ? route.query.roomCode : route.params.id
      if (fromLive || isSatelliteLive.value) {
        liveStatistics({
          betCount: 1,
          betAmount: totalBet.value,
          roomCode
        })
      }
      // 统计聊天室投注总人数
      const flagged = storage.get('liveBetNum') || []
      if ((isSatelliteLive.value || fromLive) && !flagged.includes(roomCode)) {
        liveStatistics({
          betNum: 1,
          roomCode
        }).then((res) => {
          if (res.code === 200) {
            if (flagged.length >= 50) {
              flagged.length = 0 // 清空数组
            }
            flagged.push(roomCode)
            storage.set('liveBetNum', flagged)
          }
        })
      }

      // 统计爆料方案的跟单数据
      if (route.name === 'PlanDetails') {
        const param = {
          betOrderCode: orderIds[0],
          betOrderState: 0,
          followBetAmount: totalBet.value,
          followType: 3,
          followBetType: 2,
          memberId: userStore.userInfo.id,
          memberName: userStore.userInfo.userName,
          vipLevel: userStore.userInfo.vipLevel,
          pushOrderId: route.query.id
        }
        userFollowOrderSave(param)
      }
    }
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}
function updateBetOddsWhenSuccessOrdered() {
  betCartStore.submitBetList.forEach((bet) => {
    const newBet = betCartStore.orderList.find((order) => {
      order.ops[0].mid === bet.id
    })
    if (newBet && newBet.ops) {
      bet.betMatchMarket.odds = newBet.ops[0].od
    }
  })
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
  padding: 6px 15px 10px;
  @include safeAreaBottom(10px);
  background: #f7f7f7; //#f2f3f5;
  box-shadow: 0px -6px 16px rgba(0, 0, 0, 0.1);
  .tit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    margin-bottom: 4px;
    h4 {
      color: var(--color-text-dark);
      // font-size: 14px;
    }
    p {
      font-size: 12px;
      display: flex;
      align-items: center;
      color: var(--color-text-light);
      svg {
        fill: var(--color-text-light);
        margin-left: 5px;
      }
    }
  }
}
.total-amount {
  padding: 0 10px;
  margin-bottom: 5px;
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

.can-win {
  font-size: 14px;
  margin-left: 4px;
}
.symbol {
  margin: 0 5px;
}
</style>
