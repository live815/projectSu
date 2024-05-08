<template>
  <div class="funds-c2c-setting">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.c2cWithdrawalHoldSetting')" name="1">
        <WithdrawlWaitSetting v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.c2cWithdrawalHoldList')" name="2">
        <template #label>
          <span>{{ $t('funds.c2cWithdrawalHoldList') }}</span>
          <el-badge type="warning" :value="riskC2CWithdrawNum" v-if="riskC2CWithdrawNum>0"></el-badge>
        </template>
        <WithdrawlWaitList v-if="activeName === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Withdrawl-wait-setting">
import WithdrawlWaitSetting from './components/WithdrawlWaitSetting.vue';
import WithdrawlWaitList from './components/WithdrawlWaitList.vue';
import usePermissionStore from "@/store/modules/permission";

const store = usePermissionStore();
const riskC2CWithdrawNum = computed(()=>store.riskC2CWithdrawNum) //风控提现搁置

const activeName = ref("1");
</script>

<style lang="scss" scoped>
.funds-c2c-setting{
  padding:20px;
}
</style>