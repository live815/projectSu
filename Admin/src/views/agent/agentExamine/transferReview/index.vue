<!-- 转代审核 -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.firstInstancePendingReview')" name="1">
        <FirstInstanceReview v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.secondInstancePendingReview')" name="2">
        <SecondInstanceReview v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewed')" name="3">
        <Reviewed v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import FirstInstanceReview from "./components/FirstInstanceReview.vue";
import SecondInstanceReview from "./components/SecondInstanceReview.vue";
import Reviewed from "./components/Reviewed.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>