<template>
  <div class="recharge-store">
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
        <el-col :span="6">
          <el-form-item :label="$t('report.rechargeStore')" prop="mchNames" class="full-width">
            <el-select
              v-model="queryParams.mchNames"
              :placeholder="$t('member.pleaseSelect')"
              clearable
              class="full-width"
              multiple
              collapse-tags
              collapse-tags-tooltip
            >
              <el-option
                v-for="dict in rechargeStoreList"
                :key="dict"
                :label="dict"
                :value="dict"
              />
            </el-select>
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
              class="exoport-btn"
              >{{ $t('member.export') }}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <RechargeSoreBar ref="bar" :list="rechargeStoreList" :form="queryParams" />
    <div class="store">
      <RechargeStorePie :option="pieData" />
      <RechargeStoreTotal :option="pieData" />
    </div>
    <RechargeStoreArrival :data="tableData" :total="totalAmount" />
  </div>
</template>

<script setup>
import RechargeSoreBar from "./RechargeStoreBar.vue";
import RechargeStoreArrival from "./RechargeStoreArrival.vue";
import RechargeStorePie from "./RechargeStorePie.vue";
import RechargeStoreTotal from "./RechargeStoreTotal.vue";
import { getMchNamesSelect,getMchNamePie,getMchNameInfoList } from "@/api/report/cashflow/index";
import { onMounted } from "vue";
import { getMonthFirstAndToday } from "../common";

const props = defineProps(["activeRecharge"])
const bar = ref(null);
const queryRef = ref(null);
const queryParams = ref({
  mchNames:[], //充值商户
  timeBeginStr:getMonthFirstAndToday('first'),
  timeEndStr: getMonthFirstAndToday('now'),
});
const dateRange = ref(getMonthFirstAndToday())
const rechargeStoreList = ref([]); // 充值商户下拉
const tableData = ref([]);
const totalAmount = ref(0);
const isFirstLoad = ref(true);
const pieData = ref([
]);

onMounted(async()=>{
  if(isFirstLoad.value){
    await queryMchNamesSelect();
    await qeuryMchNamePie();
    await queryRechargeArrivalList();
    isFirstLoad.value = false
  }
})
function queryMchNamesSelect(){
  return getMchNamesSelect().then(res=>{
    rechargeStoreList.value = res || [];
  })
}
//查询商户饼图和柱图，同一个接口
function qeuryMchNamePie(){
  return getMchNamePie(queryParams.value).then(res=>{
    res && res.forEach(item=>{
      item.name = item.mchName;
      item.value = item.depAmount;
    })
    pieData.value = res 
  })
}
function queryRechargeArrivalList(){
  return getMchNameInfoList(queryParams.value).then(res=>{
    tableData.value = res.mchNameAllInfoRes || [];
    totalAmount.value = res.totalAmount || 0;
  })
}
function handleChange() {
  if ((dateRange.value && !dateRange.value.length) || dateRange.value == null) {
    queryParams.value.timeBeginStr = null;
    queryParams.value.timeEndStr = null;
  } else {
    queryParams.value.timeBeginStr = dateRange.value[0];
    queryParams.value.timeEndStr = dateRange.value[1];
  }
}
function handleQuery(){
  // queryParams.value.pageNum = 1;
  // getList();
  bar.value.queryMchNameBar();
  queryRechargeArrivalList();
  qeuryMchNamePie();
}
const handleExport = () => {
  // proxy.download(
  //   "system/user/export",
  //   {
  //     ...queryParams.value,
  //   },
  //   `user_${new Date().getTime()}.xlsx`
  // );
};
const reset = () => {
  queryRef.value.resetFields();
  dateRange.value = getMonthFirstAndToday();
  handleChange();
};
// //获取本月的第一天和当天的日期
// function getMonthFirstAndToday(type) {
//   const today = new Date();
//   const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//   // 格式化日期为 'yyyy-MM-dd'
//   const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
//   const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

//    if(type === 'first') {
//     return formattedFirstDay
//    }
//    if(type === 'now') {
//     return formattedToday
//    }
//   return [formattedFirstDay, formattedToday];
// }
onActivated(async()=>{
  if(!isFirstLoad.value){
    await queryMchNamesSelect();
    await qeuryMchNamePie();
    await queryRechargeArrivalList();
  }
})
</script>

<style lang="scss" scoped>
.recharge-store {
  .store{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap:16px
  }
}
</style>
