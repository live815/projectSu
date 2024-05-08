<template>
  <div class="risk-record-warn-index">
    <!-- 风险预警记录 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.riskWarn')" name="1">
        <YestodayRiskWarn v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.conditionSetting')" name="3">
        <WarnConditionSetting v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Risk-warn-record">
import YestodayRiskWarn from "./components/YestodayRiskWarn.vue";
import WarnConditionSetting from "./components/WarnConditionSetting.vue";
const activeName = ref("1");
</script>

<style lang="scss" scoped>
.risk-record-warn-index{
  padding: 20px;
}
</style>