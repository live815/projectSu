<template>
  <div class="maintain">
    <img class="img" src="../img/maintain.png" />
    <div class="title">{{ props.title }}&nbsp;{{ $t('DepositWithdraw.MaintainTips_1') }}</div>
    <div class="text">{{ $t('DepositWithdraw.MaintainTips_2') }}</div>
    <div class="text">{{ $t('DepositWithdraw.MaintainTips_3') }}</div>
    <div class="maintain-btn" @click="openCustomerServicePop">
      {{ $t('DepositWithdraw.ContactCustomerService') }}
    </div>
  </div>
</template>

<script setup>
import { openCustomerServicePop } from '@/utils/customerService'

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style lang='scss' scoped>
.maintain {
  color: var(-----80, rgba(255, 255, 255, 0.8));
  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  .img {
    width: 140px;
    height: 140px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    margin: 14px 0 10px 0;
  }
  .text {
    font-size: 14px;
    font-weight: 400;
    margin: 10px 0;
  }
  .maintain-btn {
    margin-top: 20px;
    width: 530px;
    height: 50px;
    color: var(-----100, #fff);
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    border-radius: 6px;
    background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
</style>