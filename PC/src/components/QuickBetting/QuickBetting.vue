<template>
  <div class="boxQuickBetting" v-if="isShowBet && betCartStore.anchorBetObj" @click="betQuickBtn">
    <div class="qBet">
      <QuickBettingIcon />
      <div class="betCount">1</div>
      <div class="quickBet">{{$t('Components.QuickBet')}}</div>
    </div>
  </div>
</template>
<script setup>
import {ref, watch } from 'vue';
import QuickBettingIcon from '@/components/icons/QuickBettingIcon.vue'
import { useBetCartStore } from '@/stores/betCart'
import eventBus from '@/utils/eventBus'
const isShowBet = ref(false)
const isTab=ref(true)
const betCartStore = useBetCartStore()
watch(
  () => betCartStore.anchorBetObj,
  (newAnchorBetObj) => {
    console.log(newAnchorBetObj,'isShowBet--newAnchorBetObj')
    if (newAnchorBetObj && JSON.stringify(newAnchorBetObj) !== '{}') {
        console.log("isShowBet")
      isShowBet.value = true
    }else{
      isShowBet.value = false
    }
  }
)
const betQuickBtn=()=>{
    isTab.value=!betCartStore.anchorBetShow
    eventBus.emit('closeBetDel',isTab.value)
}
</script>
<style scoped lang="scss">
.boxQuickBetting {
  position: fixed;
  z-index: 111;
  right: 28px;
  bottom: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  .qBet {
    width: 86px;
    height: 86px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .betCount {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-radius: 50%;
      font-size: 12px;
      color: #f35f1b;
      font-weight: bold;
      font-family: 'Montserrat';
      background: #fff;
    }
    .quickBet {
      color: #fff;
      
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 4px;
    }
  }
}
</style>
