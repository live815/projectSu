<template>
  <div class="member-detail-change-info">
    <el-tabs v-model="activeChangeInfo" type="card" class="demo-tabs">
      <el-tab-pane :label="$t('member.frontOperateRecord')" name="1">
        <FrontOperateRecord
          :activeChangeInfo="activeChangeInfo"
          :userName="userName"
          :activeName="activeName"
          :tenantId="tenantId"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.backOperateRecord')" name="2">
        <BackOperateRecord
          :activeChangeInfo="activeChangeInfo"
          :userName="userName"
          :activeName="activeName"
          :tenantId="tenantId"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.banRecord')" name="3">
        <BanRecord 
        :activeChangeInfo="activeChangeInfo" 
        :userName="userName" 
        :activeName="activeName"
        :tenantId="tenantId"
        :userId="userId" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.exceptionRecord')" name="4">
        <ExceptionRecord
          :activeChangeInfo="activeChangeInfo"
          :userName="userName"
          :activeName="activeName"
          :tenantId="tenantId"
        />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.VIPLevelRecord')" name="5">
        <VIPLevelRecord
          :activeChangeInfo="activeChangeInfo"
          :userName="userName"
          :tenantId="tenantId"
          :activeName="activeName"
        />
      </el-tab-pane>
      <!-- <el-tab-pane label="称号记录" name="6">
        <TitleRecord
          :activeChangeInfo="activeChangeInfo"
          :userName="userName"
          :activeName="activeName"
        />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup>
import FrontOperateRecord from "./changgechild/FrontOperateRecord.vue";
import BackOperateRecord from "./changgechild/BackOperateRecord.vue";
import BanRecord from "./changgechild/BanRecord.vue";
import ExceptionRecord from "./changgechild/ExceptionRecord.vue";
import TitleRecord from "./changgechild/TitleRecord.vue";
import VIPLevelRecord from "./changgechild/VIPLevelRecord.vue";
import { watch } from "vue";

const props = defineProps(["activeName","userName","tenantId","userId"]);
const activeChangeInfo = ref("1");
</script>

<style lang="scss" scoped>
.member-detail-change-info {
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
