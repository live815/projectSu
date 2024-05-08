<template>
  <div :class="{ isShowTabbar }" class="cart-head-wrapper" v-if="betCartStore.isShowBetCartHead">
    <CartHead @open="betCartStore.openBetCart()" />
  </div>

  <!-- 购物车弹框 -->
  <van-popup
    safe-area-inset-bottom
    v-model:show="betCartStore.isOpenBetCart"
    position="bottom"
    :style="{ height: '90%' }"
  >
    <BetCartContent v-if="betCartStore.isOpenBetCart" />
  </van-popup>

  <!-- 注单确认弹框 -->
  <van-popup
    safe-area-inset-bottom
    v-model:show="betCartStore.isOpenConfirmDialog"
    position="bottom"
    :style="{ height: '75%' }"
    round
    @click-overlay="clickOverlay"
    class="transparent-bg"
  >
    <BetConfirm v-if="betCartStore.isOpenConfirmDialog" />
  </van-popup>
</template>

<script setup>
import CartHead from './CartHead.vue'
import BetCartContent from './BetCartContent.vue'
import BetConfirm from './BetConfirm.vue'
import { useRoute } from 'vue-router'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
const currentRoute = useRoute()
const isShowTabbar = computed(() => currentRoute.meta && currentRoute.meta.isShowTabbar)
const userStore = useUserStore()
const betCartStore = useBetCartStore()
watchEffect(() => {
  if (betCartStore.betList.length === 0) {
    betCartStore.closeBetCart()
    // 刷新余额
    userStore.getBalanceAction()
  }
})
// 注单确认弹框关闭时
function clickOverlay() {
  betCartStore.removeAllBets()
}
</script>

<style lang="scss" scoped>
.cart-head-wrapper {
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  @include safeAreaBottom();
  background: #fff;
  &.isShowTabbar {
    bottom: 60px;
  }
}
</style>
<style>
.van-popup.transparent-bg {
  background: #f7f7f7;
}
</style>
