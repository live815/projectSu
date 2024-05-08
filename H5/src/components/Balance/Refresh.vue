<template>
  <IcoRefresh @click="refresh" :style="{ transform: `rotate(${deg}deg)` }" />
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const deg = ref(0)
function refresh() {
  deg.value += 360
  // 重新拉取用户信息,其中包含余额
  user.getBalanceAction()
}
</script>

<style lang="scss" scoped>
svg {
  width: 17px;
  height: 17px;
  transition: all 0.8s ease-in-out;
}
</style>
