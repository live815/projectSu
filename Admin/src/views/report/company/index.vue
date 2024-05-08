<template>
  <div class="company-dailyPager">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('report.dailyPaper')" name="1">
        <DailyPager :activeName="activeName" v-if="activeName==='1'" />
      </el-tab-pane>
<!--      <el-tab-pane :label="$t('report.deviceDailyPager')" name="2">
        <DailyPager :activeName="activeName" v-if="activeName==='2'" />
      </el-tab-pane>-->
      <el-tab-pane :label="$t('report.vipDailyPaper')" name="3">
        <DailyPager :activeName="activeName" v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Company-day-report">
import DailyPager from "@/views/report/company/components/DailyPager.vue";
import { ref } from "vue";

const activeName = ref('1');
</script>

<style lang="scss" scoped>
.company-dailyPager {
  padding: 20px;
}
</style>