<template>
  <div class="dialog-recharge-record">
    <DepositRecord
      :activeName="activeName"
      :activeWithdrawDeposit="activeWithdrawDeposit"
      :userName="userName"
    />
  </div>
</template>

<script setup>
import DepositRecord from "@/views/member/list/components/depositwithdraw/DepositRecord.vue";
const props = defineProps(["userName"]);

const activeName = ref("8");
const activeWithdrawDeposit = ref("1");
</script>

<style lang="scss" scoped>
.dialog-recharge-record {
}
</style>
