<template>
  <div class="exception-tip">
    <ExceptionTipChild class="item-today" :title="$t('summary.exceptionDataOfToday')" :data="todayData"></ExceptionTipChild>
    <ExceptionTipYesterday class="item-yesterday" :title="$t('summary.exceptionDataOfYesterday')" :data="yesterdayData"></ExceptionTipYesterday>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ExceptionTipChild from './ExceptionTipChild.vue';
import ExceptionTipYesterday from './ExceptionTipYesterday.vue';
import { getOverallAberrant } from "@/api/summary/index";

const todayData = ref([]);
const yesterdayData = ref([]);

onMounted(()=>{
  queryOverallAberrant()
})
function queryOverallAberrant(){
  getOverallAberrant().then(res=>{
    todayData.value = res.todayAberrant;
    yesterdayData.value = res.yesAberrant;
  })
}
</script>

<style lang="scss" scoped>
.exception-tip{
  margin-top:20px;
  display:grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: auto auto; /* 自动高度 */
  gap:12px;
  .item-today{
    align-self: stretch;
  }
  .item-yesterday{
    align-self: stretch;
  }
}
</style>