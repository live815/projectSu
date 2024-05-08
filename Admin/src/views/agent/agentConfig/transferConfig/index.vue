<template>
  <div class="app-container" id="withdraw-config">
    <el-tabs v-model="activeName">
      <el-tab-pane label="提现方式配置" name="1">
        <withdrawConfig v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane label="代存配置" name="2">
        <agentDepositConfig v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import withdrawConfig from "./components/withdrawConfig.vue";
import agentDepositConfig from "./components/agentDepositConfig.vue";
const activeName = ref("1");
</script>

<style lang="scss" scoped></style>
