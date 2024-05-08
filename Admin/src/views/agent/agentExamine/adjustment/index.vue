<!-- 资金调整{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.waitFirstReview')" name="1">
        <PendingFirstInstance
          v-if="activeName == 1"
          :fund_adjust_type="fund_adjust_type"
          :agent_fund_adjust_add_reason="agent_fund_adjust_add_reason"
          :agent_fund_adjust_sub_reason="agent_fund_adjust_sub_reason"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.waitSecondReview')" name="2">
        <PendingSecondTrial
          v-if="activeName == 2"
          :fund_adjust_type="fund_adjust_type"
          :agent_fund_adjust_add_reason="agent_fund_adjust_add_reason"
          :agent_fund_adjust_sub_reason="agent_fund_adjust_sub_reason"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewed')" name="3">
        <Reviewed
          v-if="activeName == 3"
          :fund_adjust_type="fund_adjust_type"
          :agent_fund_adjust_add_reason="agent_fund_adjust_add_reason"
          :agent_fund_adjust_sub_reason="agent_fund_adjust_sub_reason"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import PendingFirstInstance from "./components/PendingFirstInstance.vue";
import PendingSecondTrial from "./components/PendingSecondTrial.vue";
import Reviewed from "./components/Reviewed.vue";

const { proxy } = getCurrentInstance();
const { fund_adjust_type } = proxy.useDict("fund_adjust_type"); //资金调整类型
const { agent_fund_adjust_add_reason } = proxy.useDict(
  "agent_fund_adjust_add_reason"
); //加额原因下拉
const { agent_fund_adjust_sub_reason } = proxy.useDict(
  "agent_fund_adjust_sub_reason"
); //减额原因下拉
const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
