<template>
  <!-- 维护 -->
  <div class="maintain-content">
    <img class="maintain-content-img" :src="maintain" />
    <div class="maintain-content-title">{{ $t('Wletter.tip101') }}</div>
    <div class="maintain-content-text">
      <p>{{ $t('Wletter.tip102') }}</p>
      <p>{{ $t('Wletter.tip103') }}</p>
    </div>
    <DedicatedButton color="primary" @click="openCustomerServiceLink">{{
      $t('Wletter.ContactCustomerService')
    }}</DedicatedButton>
  </div>
</template>

<script setup>
import maintain from './img/maintain.png'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { openCustomerServiceLink } from '@/utils/customerService'
</script>
<style lang="scss" scoped>
.maintain-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  font-style: normal;
  font-weight: 400;

  .maintain-content-img {
    width: 200px;
    height: 200px;
    margin-top: 10px;
  }
  .maintain-content-title {
    color: #111;
    font-size: 16px;
    line-height: 16px;
  }
  .maintain-content-text {
    text-align: center;
    color: #999;
    font-size: 14px;
    line-height: 16px;
    width: 266px;
    margin: 14px 0 24px 0;
  }
}
</style>
