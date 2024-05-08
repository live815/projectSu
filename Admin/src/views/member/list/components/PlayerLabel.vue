<template>
  <div class="player-label">
    <el-tabs v-model="activeLabel" type="card" class="demo-tabs">
      <el-tab-pane :label="$t('member.handLabel')" name="1">
        <HandLabelList v-if="activeLabel==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.autoLabel')" name="2"> 
        <AutoLabelList v-if="activeLabel==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HandLabelList from "./playlabel/HandLabelList.vue";
import AutoLabelList from "./playlabel/AutoLabelList.vue";
const activeLabel = ref("1");
</script>

<style lang="scss" scoped>
.player-label {
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
