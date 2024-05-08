<!-- 提现记录 -->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('agent.toBeWithdrawn')" name="1">
        <WaitingForPayment v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('agent.all')" name="2">
        <Complete v-if="activeName == 2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import WaitingForPayment from "./components/WaitingForPayment.vue";
import Complete from "./components/Complete.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
