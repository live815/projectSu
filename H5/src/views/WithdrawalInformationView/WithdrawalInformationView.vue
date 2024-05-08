<template>
  <div class="withdrawalInformation">
    <NavBar :title="$t('Wletter.Withdrawalinformat')" :isBack="false" @click="onClickLeft" />
    <template v-if="bankShow">
      <!-- 虚拟币提现信息 -->
      <VirtualWithdraw :bankWithdrawInfo="bankWithdrawInfo"></VirtualWithdraw>
    </template>
    <template v-else>
      <!-- 银行卡提现信息 -->
      <BankCardWithdraw :bankWithdrawInfo="bankWithdrawInfo"></BankCardWithdraw>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar'
import VirtualWithdraw from './components/VirtualWithdraw/VirtualWithdraw'
import BankCardWithdraw from './components/BankCardWithdraw/BankCardWithdraw'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 银行卡提现信息
const bankWithdrawInfo = ref({})

const bankShow = computed(() => {
  if (route.query.wdWayType == 2) {
    return true
  }
  return false
})
if (route.query) {
  const encodedOrderData = route.query.orderData
  Object.assign(bankWithdrawInfo.value, JSON.parse(decodeURIComponent(encodedOrderData)))
}

const onClickLeft = () => {
  router.push('/user-center')
}
</script>
<style lang="scss" scoped>
.withdrawalInformation {
  padding: 15px;
}
</style>
