<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.notify')" name="1">
        <notification v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.Activity')" name="2">
        <mobile v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.event')" name="3">
        <event v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import event from "./components/event.vue";
import mobile from "./components/mobile.vue";
import notification from "./components/notification.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
