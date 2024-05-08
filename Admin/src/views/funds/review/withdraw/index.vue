<template>
  <div class="funds-review-withdraw">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.waitForReview')" name="1">
        <FinancialWaitReview
          :riskList="riskList"
          :financalList="financalList"
          :vipLevelList="vipLevelList"
          :channelNameList="channelNameList"
          v-if="activeName === '1'"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.alreadyReview')" name="2">
        <FinancialDoneReview
          :riskList="riskList"
          :financalList="financalList"
          :vipLevelList="vipLevelList"
          :channelNameList="channelNameList"
          v-if="activeName === '2'"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Withdraw-review">
import { onMounted } from "vue";
import FinancialDoneReview from "./components/FinancialDoneReview.vue";
import FinancialWaitReview from "./components/FinancialWaitReview.vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getVIPList, getMchchannelWithdrawlList } from "@/api/funds/common";

const activeName = ref("1");
const riskList = ref([]); //风控层级
const financalList = ref([]); //财务层级
const vipLevelList = ref([]); //VIP等级
const channelNameList = ref([]); //出款方式

onMounted(() => {
  queryFinancalList();
  queryRiskList();
  queryVIPList();
  queryChannelList()
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
function queryChannelList() {
  return getMchchannelWithdrawlList().then((res) => {
    channelNameList.value = res || [];
  });
}
</script>

<style lang="scss" scoped>
.funds-review-withdraw {
  padding: 0 20px;
}
</style>
