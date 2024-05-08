<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.singleAdjust')" name="1">
        <BatchManage />
      </el-tab-pane>
      <el-tab-pane :label="$t('funds.multiAdjust')" name="2">
        <BatchRocade />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Member-quato">
import { ref } from "vue";

import BatchManage from "./components/BatchManageAdjust.vue";
import BatchRocade from "./components/BatchRocadeAdjust.vue";

const activeName = ref("1");
</script>

<style lang="scss"></style>
