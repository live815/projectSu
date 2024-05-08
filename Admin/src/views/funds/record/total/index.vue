<template>
  <div class="funds-record-total-index">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.rechargeChannelTotal')" name="1"> 
        <DepositChannelTotal v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.withdrawChannelTotal')" name="2"> 
        <WithdrawlChannelTotal v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Channel-total">
import DepositChannelTotal from './components/DepositChannelTotal.vue';
import WithdrawlChannelTotal from './components/WithdrawlChannelTotal.vue';
const activeName = ref("1");
</script>

<style lang="scss" scoped>
.funds-record-total-index {
  padding: 20px;
  .btn-group {
    margin-bottom: 16px;
    .el-button {
      width: 73px;
    }
    .time-range {
      border: 1px solid rgba(127, 127, 127, 1);
      height: 32px;
      line-height: 32px;
      color: #7f7f7f;
      font-size: 13px;
      padding: 0 4px;
      border-radius: 5px;
      background: #ffffff;
    }
    & .activebtn {
      border: 1px solid red;
      color: #409eff;
    }
  }
}
</style>
