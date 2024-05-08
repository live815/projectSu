<template>
  <div class="app-container">
    <el-tabs v-model="activeRecharge" type="card" class="demo-tabs">
      <el-tab-pane :label="$t('report.rechargeType')" name="1">
        <RechargeType v-if="activeRecharge === '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.rechargeStoreNoQuote')" name="2">
        <RechargeStore v-if="activeRecharge === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Cash-flow">
import RechargeStore from "./components/RechargeStore.vue";
import RechargeType from "./components/RechargeType.vue";

const activeRecharge = ref("1");
</script>

<style lang="scss" scoped>
:deep() {
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #ffffff;
    color: #333333;
    border: 1px solid #e9e9e9;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    background: #cccccc;
  }
  .el-tabs__header {
    display: flex;
    justify-content: space-between;
  }

  .el-tabs__item {
    flex: 1;
    text-align: center;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    // margin-right: 10px; /* 通过调整这个值来设置选项卡之间的间距 */
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
    .el-tabs__nav {
      border: none;
    }
  }
}
</style>
