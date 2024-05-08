<template>
  <div class="new-black-list">
    <!-- 黑名单设置 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.account')" :name="1">
        <BlackList v-if="activeName===1" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.IPAddress')" :name="2">
        <BlackList v-if="activeName===2" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.deviceNoNoQuote')" :name="3">
        <BlackList v-if="activeName===3" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.bankcard')" :name="4">
        <BlackList v-if="activeName===4" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.virtualAddress')" :name="5">
        <BlackList v-if="activeName==5" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.virtualNumberParagraph')" :name="6">
        <BlackList v-if="activeName===6" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.phoneNumber')" :name="7">
        <BlackList v-if="activeName===7" :activeName="activeName"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="New-balck-list">
import BlackList from "./components/BlackList.vue";

const activeName = ref(1);
</script>

<style lang="scss">
.new-black-list{
  padding:20px;
}
</style>