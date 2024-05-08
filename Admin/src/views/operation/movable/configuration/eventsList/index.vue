<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.currentactivity')" name="1">
        <currentActivity v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.Activityrecord')" name="2">
        <activityRecord v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import currentActivity from "./components/currentActivity.vue";
import activityRecord from "./components/activityRecord.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
