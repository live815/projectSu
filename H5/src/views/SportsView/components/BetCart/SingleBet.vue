<template>
  <!-- 注单列表 -->
  <template v-if="betCartStore.betList.length">
    <div
      class="bet-list"
      id="bet-item"
      :class="{
        hasMoreBetList: betCartStore.betList.length > 1,
        onekeyBetOpen: betCartStore.betList.length > 1
      }"
    >
      <BetItem
        v-for="item,index in betCartStore.betList"
        :isBooking="betCartStore.betList.some((bet) => bet.isBooking)"
        :key="item.id"
        :item="item"
        :index="index"
        @delete="deleteItem"
      />
    </div>
  </template>
  <!-- 底部投注栏 -->
  <FixedBotomOperation v-if="!betCartStore.betList.some((bet) => bet.isBooking)" />
</template>

<script setup>
import BetItem from './BetItem.vue'
import FixedBotomOperation from './FixedBotomOperation.vue'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
// 添加预约标识
betCartStore.betList.forEach((bet) => (bet.isBooking = false))
// 删除注单
function deleteItem(betItem) {
  betCartStore.removeBet(betItem)
}

</script>

<style lang="scss" scoped>
$appHeight: var(--app-height);
$popHeight: calc($appHeight * 0.9);
$headerHeight: 100px;
$fixedBottomHeight: 120px;
$fixedBottomHeightMoreBet: 210px;
$fixedBottomHeightOneKeyBetOpen: 400px;

.bet-list {
  // border: 1px solid red;
  overflow: auto;
  height: calc($popHeight - $headerHeight);
  padding-bottom: calc($fixedBottomHeight + 15px);
  &.hasMoreBetList {
    padding-bottom: calc($fixedBottomHeightMoreBet + 15px);
  }
  &.onekeyBetOpen {
    padding-bottom: calc($fixedBottomHeightOneKeyBetOpen + 15px);
  }
}
</style>
