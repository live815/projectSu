<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.firstInstance')" name="1">
        <FirstInstance :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.SecondInstance')" name="2">
        <SecondInstance :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip169')" name="3">
        <StatementView :activeName="activeName" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import FirstInstance from "./components/FirstInstance";
import SecondInstance from "./components/SecondInstance";
import StatementView from "./components/StatementView";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
