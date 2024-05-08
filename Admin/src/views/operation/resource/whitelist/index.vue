<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.tip217')" name="1">
        <whitelist v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.user')" name="2">
        <users v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import users from "./components/users.vue";
import whitelist from "./components/whitelist.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
