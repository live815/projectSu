<template>
  <div class="risk-config-review-config">
    <!-- 风控审核设置 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.reviewSetting')" name="1">
        <ReviewConfig v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.riskControlPlanSetting')" name="2">
        <RiskControlPlanConfig v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.quickReasonSetting')" name="3">
        <QuickReasonConfig v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Risk-review-config">
import ReviewConfig from './components/ReviewConfig.vue';
import RiskControlPlanConfig from './components/RiskControlPlanConfig.vue';
import QuickReasonConfig from './components/QuickReasonConfig.vue';
const activeName = ref("1");
</script>

<style lang="scss" scoped>
.risk-config-review-config {
  padding:20px;
}
</style>
