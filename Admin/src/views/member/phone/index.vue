<template>
  <div class="phone-management">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.checkVerityCode')" name="1">
        <CodeCheck v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.phoneAreaNumberManagement')" name="2">
        <PhoneManage v-if="activeName==='2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Phone">
import { ref } from 'vue';
import CodeCheck from './components/CodeCheck.vue';
import PhoneManage from './components/PhoneManage.vue';

const activeName = ref('1')

</script>

<style lang="scss">
.phone-management{
  padding:20px;
}
</style>