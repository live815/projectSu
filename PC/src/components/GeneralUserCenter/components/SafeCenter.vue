<template>
  <div class="main-container SafeCenter">
    <SafeConfigMenu v-show="currentPage === 0" @getCurrentPage="getCurrentPage" />
    <WithdrawalBind v-if="currentPage === 1" :type="typeIndex" @getCurrentPage="getCurrentPage" />
    <BankCardDisplay v-if="currentPage === 2" @goBack="goBack" />
  </div>
</template>

<script setup>
import SafeConfigMenu from './SafeConfiguration/SafeConfigMenu.vue'
import WithdrawalBind from './SafeConfiguration/WithdrawalBind.vue'
import BankCardDisplay from './SafeConfiguration/BankCardDisplay.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()

const currentPage = ref(0)
const typeIndex = ref('')

onMounted(() => {
  if (route.query.number) {
    // currentPage.value = route.query.number
  }
})
function goBack(n, val) {
  currentPage.value = n
  typeIndex.value = val
}
function getCurrentPage(n) {
  currentPage.value = n
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
.SafeCenter {
  min-width: 1320px;
  max-width: 1320px;
  height: 658px;
  padding: 0 40px;
  margin-top: 4px;
  border-radius: 8px;
  background: #272b45;
}
</style>
