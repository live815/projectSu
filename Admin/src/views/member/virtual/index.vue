<template>
  <div class="add-virtual">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.virtualMemberNoQuote')" name="1">
        <VirtualMember />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.virtualProxyNoQuote')" name="2">
        <VirtualProxy />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VirtualMember from './components/VirtualMember.vue';
import VirtualProxy from './components/VirtualProxy.vue';

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.add-virtual{
  padding:20px;
}
</style>