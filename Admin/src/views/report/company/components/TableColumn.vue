<template>
  <el-table-column :label="$t('report.date')" align="center" prop="dateTimeStr" width="130">
  </el-table-column>
  <el-table-column v-if="activeName==='2'" :label="$t('report.deviceType')" align="center" prop="deviceType" width="130">
  </el-table-column>
  <el-table-column v-if="activeName==='3'" :label="$t('report.vipLevel')" align="center" prop="vipLevel" width="130">
  </el-table-column>
  <el-table-column v-else :label="$t('report.accessCount')" align="center" prop="accessCount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName==='1'" :label="$t('report.regCount')" align="center" prop="regCount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName!=='3'" :label="$t('report.firstDepCount')" align="center" prop="firstDepCount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName!=='3'" :label="$t('report.convertPer')" align="center" width="130">
    <template #default="{ row }">
      <span>{{ row.convertPer }}%</span>
    </template>
  </el-table-column>
  <el-table-column v-if="activeName!=='3'" :label="$t('report.firstDpAmount')" align="center" prop="firstDpAmount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName!=='3'" :label="$t('report.avgFirstDepAmount')" align="center" prop="avgFirstDepAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.longinCount')" align="center" prop="longinCount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.depositCount')" align="center" prop="rechargeCount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.withdrawlCount')" align="center" prop="withdrawCount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.rechargeAmountPaper')" align="center" prop="rechargeAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.withdrawAmount')" align="center" prop="withdrawAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.rechargeWithdrawAmount')" align="center" prop="rechargeWithdrawAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.rechargeWithdrawPer')" align="center" width="130">
    <template #default="{ row }">
      <span>{{ row.rechargeWithdrawPer }}%</span>
    </template>
  </el-table-column>
  <el-table-column :label="$t('report.orderCount')" align="center" prop="orderCount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.orderAmountPaper')" align="center" prop="orderAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.validBetAmount')" align="center" prop="validBetAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.settleAmount')" align="center" prop="settleAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.platformWinPaper')" align="center" prop="platformWin" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.windPer')" align="center" width="130">
    <template #default="{ row }">
      <span>{{ row.windPer }}%</span>
    </template>
  </el-table-column>
  <el-table-column :label="$t('report.adjustment')" align="center" prop="adjustment" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.bonusAmount')" align="center" prop="bonusAmount" width="130">
  </el-table-column>
  <el-table-column :label="$t('report.rebateAmount')" align="center" prop="rebateAmount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName==='1'" :label="$t('report.proxyAmount')" align="center" prop="proxyAmount" width="130">
  </el-table-column>
  <el-table-column v-if="activeName==='1'" :label="$t('report.profitAmount')" align="center" prop="profitAmount" width="130">
  </el-table-column>
  <el-table-column v-else :label="$t('report.spreadAmount')" align="center" prop="spreadAmount" width="130">
  </el-table-column>
</template>

<script setup>
defineProps(["activeName"]);

</script>

<style lang="scss" scoped>

</style>