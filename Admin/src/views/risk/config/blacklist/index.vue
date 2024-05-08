<template>
  <div class="risk-config-black-list">
    <!-- 黑名单设置 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.blackSetting')" name="1">
        <BlackListConfig v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.blackGroupSetting')" name="2">
        <BlackListGroup v-if="activeName==='2'"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import BlackListConfig from './components/BlackListConfig.vue';
import BlackListGroup from './components/BlackListGroup.vue';
const activeName = ref("1");
</script>

<style lang="scss">
.risk-config-black-list{
  padding:20px;
}
</style>