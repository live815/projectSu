<template>
  <div class="recharge-store-total">
    <div ref="barRef" style="height: 410px" v-show="!isShow"></div>
    <el-empty :description="$t('member.noData')" v-show="isShow" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import * as echarts from "echarts";
import { computed, nextTick, onMounted, onUnmounted, watch } from "vue";

const props = defineProps(["option"]);

const barRef = ref(null);
const barInstance = shallowRef(null);
const option = ref({
  title: {
    text: i18n.global.t("report.storeRechargePercent"),
    left:"left"
  },
  tooltip: {
    trigger: "item"
  },
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: [],
    axisLabel:{
      interval:0,
      rotate:'45'
    }
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

const isShow = ref(false)
onMounted(async() => {
  nextTick(()=>{
    initLineChart();
  })
});
function initLineChart() {
  barInstance.value = echarts.init(barRef.value);
  window.addEventListener('resize',function(){
    barInstance.value.resize()
  })
}
function updateChart(dataX,dataY){
  option.value.yAxis.data = dataX;
  option.value.series[0].data = dataY;
  nextTick(()=>{
    barInstance.value.resize()
  })
  barInstance.value?.setOption(option.value);
}
watch(()=>props.option,(newVal,oldVal)=>{
  nextTick(()=>{
    isShow.value = props.option && props.option.length === 0
    updateChart(newVal.map(item=>item.mchName),newVal.map(item=>item.depAmount));
  })
},{immediate:true})
</script>

<style lang="scss" scoped>
.recharge-store-total{
  
}
</style>