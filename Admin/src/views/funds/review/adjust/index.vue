<template>
  <div class="funds-review-adjust">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.waitFirstReview')" name="1">
        <FirstRview
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :activeName="activeName"
          :fund_adjust_type="fund_adjust_type"
          :fund_adjust_add_reason="fund_adjust_add_reason"
          :fund_adjust_reduce_reason="fund_adjust_reduce_reason"
          v-if="activeName === '1'"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.waitSecondReview')" name="2">
        <SecondReview
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :activeName="activeName"
          :fund_adjust_type="fund_adjust_type"
          :fund_adjust_add_reason="fund_adjust_add_reason"
          :fund_adjust_reduce_reason="fund_adjust_reduce_reason"
          v-if="activeName === '2'"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.alreadyReview')" name="3">
        <ReviewCompleted
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :activeName="activeName"
          :fund_adjust_type="fund_adjust_type"
          :fund_adjust_add_reason="fund_adjust_add_reason"
          :fund_adjust_reduce_reason="fund_adjust_reduce_reason"
          v-if="activeName === '3'"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Adjust">
import { onMounted } from "vue";
import FirstRview from "./components/FirstRview.vue";
import SecondReview from "./components/SecondReview.vue";
import ReviewCompleted from "./components/ReviewCompleted.vue";
import { getVIPList } from "@/api/funds/common";
import { getRiskFinancalList } from "@/api/risk/level/index";

const { proxy } = getCurrentInstance();
const { fund_adjust_type } = proxy.useDict("fund_adjust_type"); //资金调整类型
const { fund_adjust_add_reason } = proxy.useDict("fund_adjust_add_reason"); //加额原因下拉
const { fund_adjust_reduce_reason } = proxy.useDict(
  "fund_adjust_reduce_reason"
); //减额原因下拉
const activeName = ref("1");
const vipLevelList = ref([]);
const riskList = ref([]); //风控层级
const financalList = ref([]); //财务层级

onMounted(async () => {
  await queryFinancalList();
  await queryRiskList();
  await queryVIPList();
});
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
function queryVIPList() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
</script>

<style lang="scss" scoped>
.funds-review-adjust {
  padding: 0 20px;
}
</style>
