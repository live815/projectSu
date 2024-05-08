<template>
  <div class="member-detail-running-detail-info">
    <el-tabs v-model="activeRunning" type="card" class="demo-tabs">
      <el-tab-pane :label="$t('member.turnoverAuditList')" name="1">
        <RunningUncheckList
          :activeName="activeName"
          :activeRunning="activeRunning"
          :userName="userName"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.turnoverAuditedList')" name="2">
        <RunningCheckList
          :activeName="activeName"
          :activeRunning="activeRunning"
          :userName="userName"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import RunningUncheckList from "./RunningUncheckList.vue";
import RunningCheckList from "./RunningCheckList.vue";
import { watch } from "vue";

const props = defineProps(["activeName", "userName"]);
const activeRunning = ref("1");
</script>

<style lang="scss" scoped>
.member-detail-running-detail-info {
  :deep() {
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: #fff;
      background: #383838;
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
      margin-right: 10px; /* 通过调整这个值来设置选项卡之间的间距 */
    }
    .el-tabs--card > .el-tabs__header {
      border-bottom: none;
      .el-tabs__nav {
        border: none;
      }
    }
  }
}
</style>
