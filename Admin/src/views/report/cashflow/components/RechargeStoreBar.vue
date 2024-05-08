<template>
  <div class="recharge-store-bar">
    <div style="text-align: center;">
      <el-radio-group v-model="radio" @change="storeSelect" style="margin:0 auto">
          <el-radio v-for="(item,index) in list" :label="index">{{ item }}</el-radio>
        </el-radio-group>
    </div>
    <div ref="barRef" style="height: 310px" v-show="!isShow"></div>
    <el-empty :description="$t('member.noData')" v-show="isShow" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import * as echarts from "echarts";
import { nextTick, onMounted, watch } from "vue";
import { getMchNameBar } from "@/api/report/cashflow/index";

const props = defineProps(["form","list"]);
const emit = defineEmits('radio-select');

const isShow = ref(false);
const radio  = ref(0);
const barRef = ref(null);
const barInstance = shallowRef(null);
const option = ref({
  title: {
    text: i18n.global.t("report.rechargeStoreNoQuote"),
  },
  tooltip: {
    trigger: "item"
  },
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: i18n.global.t("report.rechargeStoreNoQuote"),
      type: "bar",
      data: [],
      barWidth: '20%'
    }
  ],
});

onMounted(async() => {
  nextTick(()=>{
    initLineChart();
  })
});
function queryMchNameBar(){
  return getMchNameBar({
    mchName:filterValue(radio.value),
    timeBeginStr:props.form.timeBeginStr,
    timeEndStr:props.form.timeEndStr
  }).then(res=>{
    isShow.value = res && res.length===0
    const dataX = res && res.map(item=>item.reportDay);
    const dataY = res && res.map(item=>item.depAmount);
    updateChart(dataX,dataY)
  })
}
function storeSelect(val){
  queryMchNameBar();
}
function initLineChart() {
  barInstance.value = echarts.init(barRef.value);
  window.addEventListener('resize',function(){
    barInstance.value.resize()
  })
  // updateChart(["10/01", "10/02", "10/03", "10/04", "10/05", "10:06"
  //   , "10/07", "10/08", "10/09", "10/10", "10/11", "10/12"],[100,200,300,400,500,600,100,200,300,400,500,600])
}
function updateChart(dataX,dataY){
  option.value.xAxis.data = dataX;
  option.value.series[0].data = dataY;
  nextTick(()=>{
    barInstance.value.resize()
  })
  barInstance.value.setOption(option.value);
}
function filterValue(data){
  const item = props.list.find((item,index)=>data === index);
  return item 
}
watch(()=>props.list,()=>{
  queryMchNameBar();
})
defineExpose({
  queryMchNameBar
})
</script>

<style lang="scss" scoped>
.recharge-store-bar{
  
}
</style>