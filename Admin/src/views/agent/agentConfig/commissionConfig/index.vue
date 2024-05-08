<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.rebatePlanConfiguration')" name="1">
        <commissionMethod v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.commissionAlgorithmConfiguration')" name="2">
        <commissonAlgorithm v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import commissionMethod from "./components/commissionMethod/index";
import commissonAlgorithm from "./components/commissonAlgorithm/commissonAlgorithm.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped></style>
