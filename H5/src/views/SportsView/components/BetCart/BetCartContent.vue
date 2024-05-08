<template>
  <div class="bet-cart-content">
    <BetHeader />
    <!-- tab -->
    <div class="tab-wrapper">
      <van-tabs v-model:active="activeName">
        <van-tab :title="$t('Sportsview.Singlelevel')" name="SingleBet"></van-tab>
        <van-tab
          v-if="betCartStore.betList.length > 1"
          :title="$t('Sportsview.Collusion')"
          name="MultiBet"
        ></van-tab>
        <van-tab :title="$t('Sportsview.Inprogress')" name="CurrentBetRecord"></van-tab>
      </van-tabs>
    </div>

    <!-- 页面内容 -->
    <div class="tab-content">
      <SingleBet v-if="activeName === 'SingleBet'" />
      <MultiBet v-if="activeName === 'MultiBet'" />
      <CurrentBetRecord v-if="activeName === 'CurrentBetRecord'" />
    </div>
  </div>
</template>

<script setup>
import BetHeader from './BetHeader.vue'
import SingleBet from './SingleBet.vue'
import MultiBet from './MultiBet.vue'
import CurrentBetRecord from './CurrentBetRecord.vue'
import { watchEffect } from 'vue'
import { useBetCartStore } from '@/stores/betCart'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const betCartStore = useBetCartStore()
const activeName = ref('SingleBet')
watchEffect(() => {
  betCartStore.isSelectSeries = activeName.value === 'MultiBet'
  updateOddBeforeBet()
  if (activeName.value === 'CurrentBetRecord') {
    clearInterval(refreshOddTimer)
  }
})

// 刷新投注赔率
let refreshOddTimer = null
updateOddBeforeBet()
refreshOddTimer = setInterval(() => {
  updateOddBeforeBet()
}, 5000)
onUnmounted(() => {
  clearInterval(refreshOddTimer)
})
function updateOddBeforeBet() {
  const isSelectSeries = betCartStore.isSelectSeries
  let betMatchMarketList = []
  if (isSelectSeries) {
    betMatchMarketList = betCartStore.canMultiBetsList.map((bet) => {
      const obj = bet.betMatchMarket
      obj.type = obj.optionType
      return obj
    })
  } else {
    betMatchMarketList = betCartStore.betList.map((bet) => {
      const obj = bet.betMatchMarket
      obj.type = obj.optionType
      return obj
    })
  }
  const reqData = {
    isSelectSeries, // 是否参选串关
    betMatchMarketList // 赛事盘口集合
  }
  betCartStore.updateOddBeforeBet(reqData)
}
</script>

<style lang="scss" scoped>
.bet-cart-content {
  background: #f7f7f7;
  .tab-wrapper {
    position: relative;
    z-index: 99999;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    :deep() {
      .van-tab {
        font-size: 14px;
        .van-tab__text {
          font-weight: 600;
        }
      }
      .van-tab--active {
        color: var(--color-primary);
      }
    }
  }
}
</style>
<style lang="scss">
// .bet-cart-content {
//   .van-tab {
//     font-size: 14px;
//     .van-tab__text {
//       font-weight: 600;
//     }
//   }
//   .van-tab--active {
//     color: var(--color-primary);
//   }
// }
</style>
