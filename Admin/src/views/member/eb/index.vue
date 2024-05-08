<template>
  <div class="member-manage-eb">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.EBCoinAddrManage')" name="1">
        <AddrManage v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.EBCoinAddrRecord')" name="2">
        <AddrRecord v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Eb-coin">
import { ref } from 'vue';
import AddrManage from './components/AddrManage.vue'
import AddrRecord from './components/AddrRecord.vue'

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.member-manage-eb{
  padding: 20px;
}
</style>