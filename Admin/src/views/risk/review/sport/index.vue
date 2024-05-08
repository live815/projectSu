<template>
  <div class="risk-review-sport-index">
    <!-- 体育相似投注审核 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.sportSimilarBetList')" name="1">
        <WaitingReview
          v-if="activeName === '1'"
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.sportSimilarBetConfig')" name="2">
        <ConditionConfig v-if="activeName === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import WaitingReview from "./components/WaitingReview.vue";
import ConditionConfig from "./components/ConditionConfig.vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getVIPList } from "@/api/funds/config/index";

const activeName = ref("1");
const vipLevelList = ref([]); //VIP等级列表
const riskList = ref([]); //风控层级列表
const financalList = ref([]); //财务层级列表

onMounted(async () => {
  await queryVIP();
  await queryRiskList();
  await queryFinancalList();
});
//查询VIP层级
async function queryVIP() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询风控层级
function queryRiskList() {
  return getRiskFinancalList(2).then((res) => {
    riskList.value = res || [];
  });
}
//查询财务层级
function queryFinancalList() {
  return getRiskFinancalList(1).then((res) => {
    financalList.value = res || [];
  });
}
</script>

<style lang="scss" scoped>
.risk-review-sport-index {
  padding: 20px;
}
</style>
