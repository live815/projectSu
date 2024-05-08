<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.singleUserAdjustment')" name="1">
        <FundAdjustment
          v-if="activeName == 1"
          :fund_adjust_type="fund_adjust_type"
          :agent_fund_adjust_add_reason="agent_fund_adjust_add_reason"
          :agent_fund_adjust_sub_reason="agent_fund_adjust_sub_reason"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.batchAdjustment')" name="2">
        <BatchAdjustment
          v-if="activeName == 2"
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

import FundAdjustment from "./components/FundAdjustment.vue";
import BatchAdjustment from "./components/BatchAdjustment.vue";

const activeName = ref("1");

const { proxy } = getCurrentInstance();
const { fund_adjust_type } = proxy.useDict("fund_adjust_type"); //资金调整类型
const { agent_fund_adjust_add_reason } = proxy.useDict(
  "agent_fund_adjust_add_reason"
); //加额原因下拉
const { agent_fund_adjust_sub_reason } = proxy.useDict(
  "agent_fund_adjust_sub_reason"
); //减额原因下拉
</script>

<style lang="scss"></style>
