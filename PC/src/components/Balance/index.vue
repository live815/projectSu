<template>
  <div class="balance-refresh">
    <CurrencyUnit class="currency" />
    <Amount class="amount" />
    <Refresh class="refresh-icon" />
  </div>
</template>

<script setup>
import Amount from '@/components/Balance/Amount'
import Refresh from '@/components/Balance/Refresh'
</script>

<style lang="scss" scoped>
.balance-refresh {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  @include numFrontFamily();
  .refresh-icon {
    margin-left: 5px;
  }
}
</style>
