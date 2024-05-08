<template>
  <div class="member-manage-currency">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.currencyAddressManage')" name="1">
        <CurrencyManage v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.currencyAddressRecord')" name="2">
        <CurrencyRecord v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Currency">
import { ref } from 'vue';
import CurrencyManage from './components/CurrencyManage.vue'
import CurrencyRecord from './components/CurrencyRecord.vue'

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.member-manage-currency{
  padding: 20px;
}
</style>