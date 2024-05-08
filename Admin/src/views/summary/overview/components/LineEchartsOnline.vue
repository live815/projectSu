<template>
  <div class="line-echarts-online">
    <div ref="lineRef" style="height: 310px"></div>
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import * as echarts from "echarts";
import { nextTick, onMounted, watch, watchEffect } from "vue";

const props = defineProps(["option"])
const lineRef = ref(null);
const lineInstance = ref(null);
const option = ref({
  title: {
    // text: "折线图示例",
  },
  tooltip: {
    trigger: "item"
  },
  xAxis: {
    type: "category",
    data: ["00:00", "01:00","02:00", "03:00","04:00","05:00", "06:00","07:00", "08:00","09:00", "10:00"
    , "11:00","12:00", "13:00","14:00","15:00","16:00", "17:00","18:00","19:00", "20:00","21:00", "22:00"
    ,"23:00"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: i18n.global.t("summary.onlineNumber"),
      type: "line",
      data: [],
    }
  ],
});

onMounted(() => {
  initLineChart();
});
function initLineChart() {
  lineInstance.value = echarts?.init(lineRef.value);
}
function updateChart(data){
  // const dataX = data && data.map(item=>item.hour&&(item.hour+':00'));
  const dataY = data && data.map(item=>item.onLineCount);
  // option.value.xAxis.data = dataX;
  option.value.series[0].data = dataY;
  lineInstance.value.setOption(option.value)
}
watch(()=>props.option,(newVal,oldVal)=>{
  nextTick(()=>{
    updateChart(newVal);
  })
},{immediate:true})
</script>

<style lang="scss" scoped>
.line-echarts-online {
}
</style>
