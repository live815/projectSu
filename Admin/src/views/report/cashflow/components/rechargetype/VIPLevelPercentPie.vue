<template>
  <div class="vip-level-percent-pie">
    <div ref="pieRef" style="height: 500px" v-show="!isShow"></div>
    <el-empty :description="$t('member.noData')" v-show="isShow" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import * as echarts from "echarts";
import { onMounted, onUnmounted, watch } from "vue";
const props = defineProps(["option"]);

const pieRef = ref(null);
const pieInstance = shallowRef(null);
const option = ref({
  legend: {
    orient:'horizontal',
    x:'center',
    y:'bottom',
    itemWidth:24,
    itemHeight:18,
    backgroundColor: '#ccc',
    selectedMode:false,
    textStyle: {
      color: '#666'
    },
    itemGap:30,
    data: [],
  },
  title: {
    text: i18n.global.t("report.viplevelPercent"),
    left: "left",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  series: [
    {
      name: i18n.global.t("report.viplevelPercent"),
      type: "pie",
      radius: "50%", // 饼图半径
      data: [
        // { value: 335, name: "Category 1" },
        // { value: 310, name: "Category 2" },
        // { value: 234, name: "Category 3" },
        // { value: 135, name: "Category 4" },
        // { value: 1548, name: "Category 5" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      label:{
        // normal:{
          postion:'inner',
          formatter:'{b}:{c}({d})%'
        // }
      }
    },
  ],
});
const isShow = ref(false)

onMounted(() => {
  nextTick(()=>{
    initLineChart();
  })
});
function initLineChart() {
  pieInstance.value = echarts.init(pieRef.value);
  window.addEventListener('resize',function(){
    pieInstance.value.resize()
  })
}
function updateChart(data) {
  option.value.series[0].data = data;
  option.value.legend.data = data;
  nextTick(() => {
    pieInstance.value.resize();
  });
  pieInstance.value?.setOption(option.value);
}
watch(
  () => props.option,
  (newVal, oldVal) => {
    nextTick(() => {
      isShow.value = props.option && props.option.length === 0
      updateChart(newVal);
    });
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.vip-level-percent-pie {
  width:50%;
}
</style>
