<template>
  <div class="funds-c2c-split-index">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('funds.CToCWithdrawSplitOrderSetting')" name="1">
        <SplitOrder v-if="activeName === '1'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="C2C充值上传凭证设置" name="2">
        <UploadProvide v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane label="C2C撮合池设置" name="3">
        <CooperationSetting v-if="activeName === '3'" />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup name="Withdrawl-split-order">
import SplitOrder from './components/SplitOrder.vue';
import UploadProvide from './components/UploadProvide.vue';
import CooperationSetting from './components/CooperationSetting.vue';
const activeName = ref("1");
</script>

<style lang="scss" scoped>
.funds-c2c-split-index{
  padding:20px;
}
</style>