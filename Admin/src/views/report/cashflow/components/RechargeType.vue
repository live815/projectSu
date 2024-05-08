<template>
  <div class="recharge-type">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="$t('report.chooseDateTime')" class="full-width">
            <el-date-picker
              v-model="dateRange"
              value-format="YYYY-MM-DD"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t('member.beginTime')"
              :end-placeholder="$t('member.endTime')"
              @change="handleChange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="full-width">
            <el-button
              type="primary"
              icon="Search"
              @click="handleQuery"
              >{{ $t('member.search') }}</el-button
            >
            <el-button icon="Refresh" @click="reset">{{ $t('member.reset') }}</el-button>
            <el-button
              icon="download"
              @click="handleExport"
              class="export-btn"
              >{{ $t('member.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <RechargeTotalAmount ref="totalRef" :form="queryParams" />
    <div class="pie-percent">
      <RechargeWayPercentPie :option="pieDataRechargeType" />
      <VIPLevelPercentPie :option="peiDataVipPercent" />
    </div>
    <RechargeArrivalTotalAmount :data="tableData" :total="totalAmount" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getMonthFirstAndToday } from "../common";
import { getAmountPerReport,getVipLevelAmountPerReport,getChannelTypeNameInfoAllReport } from "@/api/report/cashflow/index";
import RechargeTotalAmount from "./rechargetype/RechargeTotalAmount.vue";
import RechargeWayPercentPie from "./rechargetype/RechargeWayPercentPie.vue";
import VIPLevelPercentPie from "./rechargetype/VIPLevelPercentPie.vue";
import RechargeArrivalTotalAmount from "./rechargetype/RechargeArrivalTotalAmount.vue";

const queryRef = ref(null);
const totalRef = ref(null);
const queryParams = ref({
  timeBeginStr:getMonthFirstAndToday('first'),
  timeEndStr: getMonthFirstAndToday('now'),
});
const dateRange = ref(getMonthFirstAndToday());
const pieDataRechargeType = ref([]);
const peiDataVipPercent = ref([]);
const tableData = ref([]);
const totalAmount = ref(null);
const isFirstLoad = ref(true);

onMounted(async()=>{
  if(isFirstLoad.value){
    await queryRechargeTypePie();
    await queryVipPercentPie();
    await queryChannelTypeNameInfoAllReport();
    isFirstLoad.value = false
  }
})
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.timeBeginStr = null;
    queryParams.value.timeEndStr = null;
  } else {
    queryParams.value.timeBeginStr = dateRange.value[0];
    queryParams.value.timeEndStr = dateRange.value[1];
  }
}
//查询充值类型-充值方式占比-饼图
function queryRechargeTypePie(){
  return getAmountPerReport(queryParams.value).then(res=>{
    res && res.forEach(item=>{
      item.name = item.channelTypeName;
      item.value = item.depAmount;
    })
    pieDataRechargeType.value = res 
  })
}
//查询充值类型-vip等级占比-饼图
function queryVipPercentPie(){
  return getVipLevelAmountPerReport(queryParams.value).then(res=>{
    res && res.forEach(item=>{
      item.name = `vip${item.vipLevel}`;
      item.value = item.depAmount;
    })
    peiDataVipPercent.value = res 
  })
}
//查询充值到账金额总计
function queryChannelTypeNameInfoAllReport(){
  return getChannelTypeNameInfoAllReport(queryParams.value).then(res=>{
    tableData.value = res.channelTypeNameAllInfoRes || [];
    totalAmount.value = res.totalAmount || 0;
  })
}
function handleQuery(){
  totalRef.value.queryMchNameBar();
  queryRechargeTypePie();
  queryVipPercentPie();
  queryChannelTypeNameInfoAllReport();
}
function reset(){
  queryRef.value.resetFields();
  dateRange.value = getMonthFirstAndToday();
  handleChange();
}
function handleExport(){
  
}
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryRechargeTypePie();
    await queryVipPercentPie();
    await queryChannelTypeNameInfoAllReport();
  }
})
</script>

<style lang="scss" scoped>
.recharge-type{
  .pie-percent{
    // display: grid;
    // grid-template-columns:repeat(2,1fr);
    // gap:20px;
    display:flex;
    justify-content: space-between;
  }
}
</style>