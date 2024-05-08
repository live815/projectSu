<template>
  <div class="risk-review-high-profits-index">
    <!-- 高额盈利审核 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.highAmountMemberProfits')" :name="1">
        <HighMemberProfits
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :status="activeName"
          v-if="activeName === 1"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.highAmountGameProfits')" :name="2">
        <!-- <HighGameProfits
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          v-if="activeName === 2"
        /> -->
        <HighMemberProfits
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :status="activeName"
          v-if="activeName === 2"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.highAmountLobbyProfits')" :name="3">
        <!-- <HighLobbyProfits
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          v-if="activeName === 3"
        /> -->
        <HighMemberProfits
          :vipLevelList="vipLevelList"
          :riskList="riskList"
          :financalList="financalList"
          :status="activeName"
          v-if="activeName === 3"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.conditionSetting')" :name="4">
        <ConditionSetting v-if="activeName === 4" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import HighMemberProfits from "./components/HighMemberProfits.vue";
import ConditionSetting from "./components/ConditionSetting.vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getVIPList } from "@/api/funds/config/index";
import { onMounted } from "vue";

const activeName = ref(1);
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
.risk-review-high-profits-index {
  padding: 0 20px;
}
</style>
