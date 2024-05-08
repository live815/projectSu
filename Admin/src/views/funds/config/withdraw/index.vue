<template>
  <div class="funds-config-withdraw-index">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.reserveWithdrawalSetting')" name="1">
        <ReserveWithdraw v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.largeWithdrawalSetting')" name="2">
        <LargeWithdraw v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.withdrawlTipSetting')" name="3">
        <WithdrawAlertConfig v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Withdraw">
import ReserveWithdraw from './components/ReserveWithdraw.vue';
import LargeWithdraw from './components/LargeWithdraw.vue';
import WithdrawAlertConfig from './components/WithdrawAlertConfig.vue';
const activeName = ref('1')
</script>

<style lang="scss" scoped>
.funds-config-withdraw-index{
  padding:20px;
}
</style>