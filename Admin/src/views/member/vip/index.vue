<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.vipLevelConfig')" name="1">
        <VipLevel v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.vipRightsConfig')" name="2">
        <VipRights v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.vipRebateConfig')" name="3">
        <VipRebate v-if="activeName==='3'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.vipLevelChangeRecord')" name="4">
        <VipChange v-if="activeName==='4'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="VIP">
import { ref } from "vue";

import VipLevel from "./components/VipLevel.vue"; //等级配置
import VipRights from "./components/VipRights.vue"; //权益配置
import VipRebate from "./components/VipRebate.vue"; //返水配置
import VipChange from "./components/VipChange.vue"; //等级更换记录

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-invite {
  padding: 20px;
}
</style>
