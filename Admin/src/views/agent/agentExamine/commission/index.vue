<!-- 佣金{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.waitFirstReview')" name="1">
        <PendingFirstInstance v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.waitSecondReview')" name="2">
        <PendingSecondTrial v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewed')" name="3">
        <Reviewed v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import PendingFirstInstance from "./components/PendingFirstInstance.vue";
import PendingSecondTrial from "./components/PendingSecondTrial.vue";
import Reviewed from "./components/Reviewed.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
