<template>
  <div class="funds-review-recharge">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.waitForReview')" name="1">
        <Recieve v-if="activeName==='1'"
        :vipLevelList="vipLevelList"
        :rechargeTypeList="rechargeTypeList"
        :channelTypeIdList="channelTypeIdList" 
        :riskList="riskList"
        :financalList="financalList"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.alreadyReview')" name="2">
        <Audited v-if="activeName==='2'" 
        :vipLevelList="vipLevelList"
        :rechargeTypeList="rechargeTypeList"
        :channelTypeIdList="channelTypeIdList"
        :riskList="riskList"
        :financalList="financalList"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Recharge">
import Recieve from './components/Recieve.vue'
import Audited from './components/Audited.vue'
import {
  getVIPList,
  getChannelList,
  getDpMchinfoList,
} from "@/api/funds/common";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { onMounted } from 'vue';
const activeName = ref('1')
const vipLevelList = ref([])
const riskList = ref([]); // 风控层级数组
const financalList = ref([]); //财务层级数组
const rechargeTypeList = ref([])
const channelTypeIdList = ref([])

onMounted(async () => {
  await queryVIPList();
  await queryRiskList();
  await queryFinancalList()
  await queryDpMchinfoList();
  await queryChannelList();
});
function queryVIPList() {
  return getVIPList().then((res) => {
    vipLevelList.value = res || [];
  });
}
//查询风控层级
function queryRiskList(){
  return getRiskFinancalList(2).then(res=>{
    riskList.value = res || [];
  })
}
//查询财务层级
function queryFinancalList(){
  return getRiskFinancalList(1).then(res=>{
    financalList.value = res || [];
  })
}
function queryDpMchinfoList() {
  return getDpMchinfoList().then((res) => {
    rechargeTypeList.value = res || [];
  });
}
function queryChannelList() {
  return getChannelList().then((res) => {
    channelTypeIdList.value = res || [];
  });
}
</script>

<style lang="scss" scoped>
.funds-review-recharge{
  padding:0 20px;
}
</style>