<!-- 代理转账审核 -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.waitFirstReview')" name="1">
        <FirstTrialOfTransfer v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.waitSecondReview')" name="2">
        <SecondReviewOfTransfer v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewed')" name="3">
        <AuditRecords v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import FirstTrialOfTransfer from './components/FirstTrialOfTransfer.vue'
import SecondReviewOfTransfer from './components/SecondReviewOfTransfer.vue'
import AuditRecords from './components/AuditRecords.vue'

const activeName = ref('1')
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
