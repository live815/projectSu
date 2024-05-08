<template>
  <div class="recharge-total-amount">
    <div style="text-align: center;">
        <div class="tab-list">
          <div v-for="(item,index) in tabList" 
          :key="item"
          class="child"
          :class="{active:activeBlock === index}" 
          @click="changeIndex(index)">
            {{ item }}
          </div>
        </div>
    </div>
    <div ref="barRef" style="height: 310px" v-show="!isShow"></div>
    <el-empty :description="$t('member.noData')" v-show="isShow" />
  </div>
</template>

<script setup>
import i18n from "@/i18n";
import * as echarts from "echarts";
import { nextTick, onMounted, watch } from "vue";
import { getChannelTypeNames,getChannelTypeNameAmountReport } from "@/api/report/cashflow/index";

const props = defineProps(["form"]);

const activeBlock = ref(0);
const isShow = ref(false);
const barRef = ref (null);
const barInstance = shallowRef(null);
const option = ref({
  title: {
    text: i18n.global.t("report.rechargeAmountTotal"),
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
      name: i18n.global.t("report.rechargeAmountTotal"),
      type: "bar",
      data: [],
      barWidth: '20%'
    }
  ],
});
const tabList = ref([])

onMounted(async() => {
  nextTick(()=>{
    initLineChart();
  });
  await queryMchNamesSelect();
  await queryMchNameBar();
});
function queryMchNamesSelect(){
  return getChannelTypeNames().then(res=>{
    tabList.value = res || []
  })
}
function queryMchNameBar(){
  return getChannelTypeNameAmountReport({
    channelTypeName:filterValue(activeBlock.value),
    timeBeginStr:props.form.timeBeginStr,
    timeEndStr:props.form.timeEndStr
  }).then(res=>{
    isShow.value = res && res.length===0
    const dataX = res && res.map(item=>item.reportDay);
    const dataY = res && res.map(item=>item.depAmount);
    updateChart(dataX,dataY)
  })
}
function changeIndex(index){
  activeBlock.value = index;
  queryMchNameBar();
}
function initLineChart() {
  barInstance.value = echarts.init(barRef.value);
  window.addEventListener('resize',function(){
    barInstance.value.resize()
  })
}
function updateChart(dataX,dataY){
  option.value.xAxis.data = dataX;
  option.value.series[0].data = dataY;
  nextTick(() => {
    barInstance.value.resize();
  });
  barInstance.value?.setOption(option.value);
}
function filterValue(data){
  const item = tabList.value.find((item,index)=>data === index);
  return item || "" 
}
defineExpose({
  queryMchNameBar
})
</script>

<style lang="scss" scoped>
.recharge-total-amount{
  .tab-list{
    display: flex;
    justify-content: center;
    align-items: baseline;
    .child {
      cursor: pointer;
      padding-right:12px;
      border-bottom:1px solid red;
      font-size:14px;
      line-height: 16px;
      &:first-child{
        padding-left: 8px;
      }
    }
    .active { 
      color:#409EFF;
    }
  }
}
</style>