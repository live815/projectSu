<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.cash')" name="1">
        <CashCoupons v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.cashcoupons')" name="2">
        <ReadyMoney v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.depositcoupon')" name="3">
        <DepositCoupon v-if="activeName == 3" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.TurnoverCoupons')" name="4">
        <TurnoverCoupons v-if="activeName == 4" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.physicalObject')" name="5">
        <RealThing v-if="activeName == 5" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import ReadyMoney from "./components/ReadyMoney";
import CashCoupons from "./components/CashCoupons";
import DepositCoupon from "./components/DepositCoupon";
import TurnoverCoupons from "./components/TurnoverCoupons";
import RealThing from "./components/RealThing";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
