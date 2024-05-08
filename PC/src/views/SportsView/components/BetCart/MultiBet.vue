<template>
  <div class="MultiBet-view">
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
        :isBooking="item.isBooking"
        :key="item.id"
        :item="item"
        :min="item.smin"
        :max="item.smax"
        :showQuick="item.showQuick"
        :amounts="item.unitStake"
        @updateAmount="updateAmount"
        @delete="deleteItem"
      />
    </div>
    </template>
    <!-- 串关底部投注栏 -->
    <FixedBotomMultiBet />
  </div>
</template>

<script setup>
import FixedBotomMultiBet from './FixedBotomMultiBet.vue'
import BetItem from './BetItem.vue'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()

//删除注单
function deleteItem(betItem) {
  betCartStore.removeBet(betItem)
}

function updateAmount(val,val1){
  val1.unitStake = val
}
watch(
  ()=>betCartStore.betList,
  ()=>{
    console.log(betCartStore.betList,5343553)
  },{deep:true,immediate:true}
)
</script>

<style lang="scss" scoped>
.MultiBet-view{
  position: relative;
  height: 100%;
  .cartCard:last-child{
    border-bottom:none;
  }

}
</style>