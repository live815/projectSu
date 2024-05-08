<template>
  <div class="member-detail-deposit-withdrawl-info">
    <el-tabs v-model="activeWithdrawDeposit" type="card" class="demo-tabs">
      <el-tab-pane :label="$t('member.depositRecord')" name="1">
        <DepositRecord
          :activeName="activeName"
          :activeWithdrawDeposit="activeWithdrawDeposit"
          :userName="userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.withdrawRecord')" name="2">
        <WithdrawRecord
          :activeName="activeName"
          :activeWithdrawDeposit="activeWithdrawDeposit"
          :userName="userName"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import DepositRecord from "./depositwithdraw/DepositRecord.vue";
import WithdrawRecord from "./depositwithdraw/WithdrawRecord.vue";
import { watch } from "vue";

const props = defineProps(["activeName", "userName"]);
const activeWithdrawDeposit = ref("1");
</script>

<style lang="scss" scoped>
.member-detail-deposit-withdrawl-info {
  :deep() {
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: #fff;
      background: #383838;
    }
    .el-tabs__header {
      display: flex;
      justify-content: space-between;
    }

    .el-tabs__item {
      flex: 1;
      text-align: center;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      margin-right: 10px; /* 通过调整这个值来设置选项卡之间的间距 */
    }
    .el-tabs--card > .el-tabs__header {
      border-bottom: none;
      .el-tabs__nav {
        border: none;
      }
    }
  }
}
</style>
