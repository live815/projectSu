<!-- 红利发放 -->
<template>
  <div class="funds-review-recharge">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.tip147')" name="1">
        <HandApplication />
      </el-tab-pane>
      <!-- <el-tab-pane label="自动导入申请" name="2">
        <AutoApplication />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup>
import HandApplication from "./components/HandApplication.vue";
import AutoApplication from "./components/AutoApplication.vue";
const activeName = ref("1");
</script>

<style lang="scss" scoped>
.funds-review-recharge {
  padding: 0 20px;
}
</style>
