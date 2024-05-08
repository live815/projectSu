<template>
  <div class="data-overview">
    <TodayData></TodayData>
    <OnlineUsers></OnlineUsers>
    <ExceptionTips></ExceptionTips>
    <TotalRank></TotalRank>
  </div>
</template>

<script setup>
import ExceptionTips from "./components/ExceptionTips.vue";
import OnlineUsers from "./components/OnlineUsers.vue";
import TodayData from "./components/TodayData.vue";
import TotalRank from "./components/TotalRank.vue";
</script>

<style lang="scss" scoped>
.data-overview{
  padding:20px;
}
</style>