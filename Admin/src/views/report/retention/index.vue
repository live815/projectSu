<template>
  <div class="retention-analysis">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('report.retentionStatistics')" name="1">
        <RetentionStatistics v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.proxyRetentionAnalysis')" name="2">
        <ProxyRetentionAnalysis v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.dailyLiveAnalysis')" name="3">
        <DailyLiveAnalysis v-if="activeName==='3'" />
      </el-tab-pane>
<!--      <el-tab-pane :label="$t('report.proxyDailyLiveAnalysis')" name="4">
        <ProxyDailyLiveAnalysis v-if="activeName==='4'" />
      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script setup name="Retention-analysis">
import { ref } from 'vue';
import RetentionStatistics from './components/RetentionStatistics.vue';
import ProxyRetentionAnalysis from './components/ProxyRetentionAnalysis.vue';
import DailyLiveAnalysis from './components/DailyLiveAnalysis.vue';
import ProxyDailyLiveAnalysis from './components/ProxyDailyLiveAnalysis.vue';

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.retention-analysis {
  padding: 20px;
}
</style>