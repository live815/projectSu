<template>
  <span>{{ user.balance || '0.00' }}</span>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const user = useUserStore()
onMounted(async () => {
  // 一键回收
  await user.getCollectAction()
  // 拉取余额
  user.getBalanceAction()
})
</script>

<style lang="scss" scoped></style>
