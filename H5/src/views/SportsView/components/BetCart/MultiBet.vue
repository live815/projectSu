<template>
  <!-- 注单列表 -->
  <template v-if="betCartStore.betList.length">
    <div
      class="bet-list"
      :class="{
        hasMoreBetList: betCartStore.betList.length > 1,
        onekeyBetOpen: betCartStore.betList.length > 1
      }"
    >
      <BetItem
        v-for="item in betCartStore.betList"
        :key="item.id"
        :item="item"
        :isShowCalc="false"
        @delete="deleteItem"
      />
    </div>
  </template>
  <!-- 串关底部投注栏 -->
  <FixedBotomMultiBet />
</template>

<script setup>
import BetItem from './BetItem.vue'
import FixedBotomMultiBet from './FixedBotomMultiBet.vue'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
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
