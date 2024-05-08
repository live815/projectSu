<!-- 提现风控{{$t('agent.review')}} -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.waitReview')" name="1">
        <PendingReview v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewOnHold')" name="2">
        <ReviewOnHold v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.reviewed')" name="3">
        <Reviewed v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PendingReview from "./components/PendingReview.vue";
import ReviewOnHold from "./components/ReviewOnHold.vue";
import Reviewed from "./components/Reviewed.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
