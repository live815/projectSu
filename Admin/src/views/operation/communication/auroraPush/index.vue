<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.Pushconfigurat')" name="1">
        <pushing />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.automaticConfigurat')" name="2">
        <automatic />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import automatic from "./components/automatic.vue";
import pushing from "./components/pushing.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
