<template>
  <div class="addInformation-content">
    <img v-if="isPhoneComputed" class="addInformation-content-imgs" :src="cellPhone" alt="" />
    <img v-else class="addInformation-content-img" :src="bankCard" alt="" />
    <div class="addInformation-content-title">
      <!-- {{ $t('DepositWithdraw.NotAdded')
      }}{{ isPhoneComputed ? $t('DepositWithdraw.PhoneNumbers') : $t('DepositWithdraw.BankCards') }} -->
    </div>
    <div class="addInformation-content-text">
      {{ $t('DepositWithdraw.DepositViewTip2')
      }}{{ isPhoneComputed ? $t('DepositWithdraw.PhoneNumbers') : $t('DepositWithdraw.BankCards') }}&nbsp;{{ $t('DepositWithdraw.tip70') }}
    </div>
  </div>
</template>

<script setup>

import cellPhone from '../img/cellPhone.png'
import bankCard from '../img/bankCard.png'

const props = defineProps({
  isPhoneShow: {
    type: Boolean,
    default: false
  }
})

const isPhoneComputed = computed(() => {
  return props.isPhoneShow
})
</script>
<style lang='scss' scoped>
.addInformation-content {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  
  padding: 50px 16px;
  .addInformation-content-imgs {
    width: 75px;
    height: 111px;
    margin-top: 10px;
  }
  .addInformation-content-img {
    width: 130px;
    height: 99px;
    margin-top: 20px;
  }
  .addInformation-content-title {
    color: var(-----80, var(---80, rgba(255, 255, 255, 0.8)));
    font-size: 16px;
    line-height: 16px;
    margin-top: 20px;
  }
  .addInformation-content-text {
    text-align: center;
    color: var(-----80, var(---80, rgba(255, 255, 255, 0.8)));
    font-size: 14px;
    line-height: 16px;
    width: 266px;
    margin: 14px 0 24px 0;
  }
}
</style>