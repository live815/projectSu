<template>
  <div class="rechargeInformation">
    <NavBar :title="$t('Rletter.rechargeinformat')" :isBack="false" @click="onClickLeft" />
    <!-- 虚拟币充值信息 -->
    <template v-if="bankShow">
      <VirtualRecharge :bankInfo="bankInfo"></VirtualRecharge>
    </template>
    <template v-else>
      <BankCardRecharge :bankInfo="bankInfo"></BankCardRecharge>
    </template>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import NavBar from '@/components/NavBar/NavBar'
import VirtualRecharge from './componets/VirtualRecharge/VirtualRecharge'
import BankCardRecharge from './componets/BankCardRecharge/BankCardRecharge'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const bankShow = computed(() => {
  if (route.query.channelTypeCode == 'USDT') {
    return true
  }
  return false
})
// 银行卡充值推荐的金额
const bankInfo = reactive({})

if (route.query) {
  bankInfo.value = route.query
}

const onClickLeft = () => {
  router.push('/user-center')
}
</script>
<style lang="scss" scoped>
.rechargeInformation {
  padding: 15px;
  background: #f7f7f7;
}
</style>
