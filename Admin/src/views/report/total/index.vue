<template>
  <div class="recharge-statistics-list">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('report.rechargeStatistics')" name="1">
        <RechargeStatistics v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.proxyRechargeStatistics')" name="2">
        <ProxyRechargeStatistics v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Total-recharge">
import { ref } from 'vue';
import RechargeStatistics from './components/RechargeStatistics.vue';
import ProxyRechargeStatistics from './components/ProxyRechargeStatistics.vue';

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.recharge-statistics-list {
  padding: 20px;
}
</style>