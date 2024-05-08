<template>
  <div class="member-manage-bank">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.bankcardManage')" name="1">
        <BankManage v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.bankcardRecord')" name="2">
        <BankRecord v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Bank-card">
import { ref } from 'vue';
import BankManage from './components/BankManage.vue';
import BankRecord from './components/BankRecord.vue'

const activeName = ref('1')

</script>

<style lang="scss">
.member-manage-bank{
  padding:20px;
}
</style>