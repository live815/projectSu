<template>
  <div ref="echartsWrapper" style="height: 800px; width: 100%"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import i18n from "@/i18n";
const echartsWrapper = ref(null);
onMounted(() => {
  // 参考站点: https://echarts.apache.org/zh/index.html
  initData();
});

async function initData() {
  // 获取地形JSON
  const chinaJSON = await fetch(
    "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
  ).then((res) => res.json());
  // 初始化echart实例
  var myChart = echarts.init(echartsWrapper.value);
  // 注入地图
  echarts.registerMap("china", chinaJSON);
  // 获取api数据
  const apiData = (await import("./apiData")).default;
  const option = {
    title: {
      text: i18n.global.t("system.tip135"),
      subtext: i18n.global.t("system.tip136"),
      sublink: "https://youtube.com",
    },
    tooltip: {
      trigger: "item",
    },
    visualMap: {
      left: "right",
      min: 0,
      max: 100,
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
      text: ["High", "Low"],
      calculable: true,
    },
    series: [
      {
        type: "map",
        map: "china", // 引入地图数据
        name: i18n.global.t("system.tip137"),
        label: {
          // show: true,
        },
        data: apiData, // 后端数据
      },
    ],
  };
  // 设置数据并重新渲染
  myChart.setOption(option);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
