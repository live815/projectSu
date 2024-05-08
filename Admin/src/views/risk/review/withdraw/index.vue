<template>
  <div class="risk-review-withdraw-index">
    <!-- 提现风控审核 -->
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <template #label>
          <span>{{ $t('risk.waitForReview') }}</span>
          <el-badge type="warning" :value="riskNoAuditNum" v-if="riskNoAuditNum>0"></el-badge>
        </template>
        <WaitReview 
          v-if="activeName==='1'" 
          ref="waitRef" 
          :financalList="financalList"
          :riskList="riskList"
          :riskTypeList="riskTypeList"
          />
        <WaitReviewReceive 
          :financalList="financalList"
          :riskList="riskList"
          v-if="activeName==='1'" 
          :riskTypeList="riskTypeList"
          @onfresh="freshWaitReviewList" 
          />
      </el-tab-pane>
      <el-tab-pane name="2">
        <template #label>
          <span>{{ $t('risk.holdOnReview') }}</span>
          <el-badge type="warning" :value="holdTotal" v-if="holdTotal>0"></el-badge>
        </template>
        <ReviewOnHold 
          :financalList="financalList"
          :riskList="riskList"
          :riskTypeList="riskTypeList"
          v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.all')" name="3">
        <AlreadyReview 
          :financalList="financalList"
          :riskList="riskList"
          :riskTypeList="riskTypeList"
          v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Withdraw-control">
import WaitReview from './components/WaitReview.vue';
import WaitReviewReceive from "./components/WaitReviewReceive.vue";
import ReviewOnHold from "./components/ReviewOnHold.vue";
import AlreadyReview from "./components/AlreadyReview.vue";
import { getRiskFinancalList } from "@/api/risk/level/index";
import { getRiskTypeList } from "@/api/risk/review/index";
import { getWithdrawlOrderList } from "@/api/risk/review/index";
import usePermissionStore from "@/store/modules/permission";
import { computed } from 'vue';

const activeName = ref("1");
const waitRef = ref(null);
const financalList = ref([]); //财务层级下拉列表
const riskList = ref([]); //风控层级下拉列表
const riskTypeList  = ref([]); //风险类型下拉列表
const store = usePermissionStore();

const holdTotal = computed(()=>store.riskShelveNum) //风控提现搁置
const riskNoAuditNum = computed(()=>store.riskNoAuditNum) //风控提现待审核数,

onMounted(async ()=>{
  await queryRiskList();
  await queryFinancalList();
  await queryRiskTypeList();
})
//领取之后刷新待审核列表
function freshWaitReviewList(){
  waitRef.value.handleQuery();
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
//查询风险类型
function queryRiskTypeList(){
  return getRiskTypeList().then(res=>{
    riskTypeList.value =  res || [];
  })
}
</script>

<style lang="scss" scoped>
.risk-review-withdraw-index {
  padding:20px;
}
</style>
