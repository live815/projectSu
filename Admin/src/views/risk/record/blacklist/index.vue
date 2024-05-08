<template>
  <div class="risk-record-black-list">
    <!-- 黑名单调整记录 -->
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('risk.account')" :name="1">
        <BlackListAdjustRecord v-if="activeName===1" :activeName="activeName" />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.IPAddress')" :name="2">
        <BlackListAdjustRecord v-if="activeName===2" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.deviceNoNoQuote')" :name="3">
        <BlackListAdjustRecord v-if="activeName===3" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.bankcard')" :name="4">
        <BlackListAdjustRecord v-if="activeName===4" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.virtualAddress')" :name="5">
        <BlackListAdjustRecord v-if="activeName==5" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.virtualNumberParagraph')" :name="6">
        <BlackListAdjustRecord v-if="activeName===6" :activeName="activeName"  />
      </el-tab-pane>
      <el-tab-pane :label="$t('risk.phoneNumber')" :name="7">
        <BlackListAdjustRecord v-if="activeName===7" :activeName="activeName"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Blacklist-adjustment-record">
import BlackListAdjustRecord from './components/BlackListAdjustRecord.vue';

const activeName = ref(1);
</script>

<style lang="scss">
.risk-record-black-list{
  padding:20px;
}
</style>