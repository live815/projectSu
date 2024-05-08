<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.Commontutorials')" name="1">
        <commonMansge v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.aboutUs')" name="2">
        <aboutUs v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.CustomServiceTutorial')" name="3">
        <customer v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import commonMansge from "./components/commonMansge.vue";
import aboutUs from "./components/aboutUs.vue";
import customer from "./components/customer.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
