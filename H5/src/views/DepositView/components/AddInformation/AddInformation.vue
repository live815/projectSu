<template>
  <div class="addInformation-content">
    <img v-if="isPhoneComputed" class="addInformation-content-img" :src="cellPhone" alt="" />
    <img v-else class="addInformation-content-img" :src="bankCard" alt="" />
    <div class="addInformation-content-title">
      {{ $t('DepositView.NotAdded')
      }}{{ isPhoneComputed ? $t('DepositView.PhoneNumber') : $t('DepositView.BankCard') }}
    </div>
    <div class="addInformation-content-text">
      {{ $t('DepositView.DepositViewTip2')
      }}{{ isPhoneComputed ? $t('DepositView.PhoneNumber') : $t('DepositView.BankCard') }}
    </div>
    <DedicatedButton color="primary" @click="onClickRouter">{{
      isPhoneComputed ? $t('DepositView.AddPhoneNumber') : $t('DepositView.AddBankCard')
    }}</DedicatedButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import cellPhone from './img/cellPhone.png'
import bankCard from './img/bankCard.png'
import { computed } from 'vue'
const router = useRouter()
const props = defineProps({
  isPhoneShow: {
    type: Boolean,
    default: false
  }
})
const isPhoneComputed = computed(() => {
  return props.isPhoneShow
})
const onClickRouter = () => {
  if (props.isPhoneShow) {
    // 添加手机号
    router.push('/cellIphone')
  } else {
    // 添加银行卡
    router.push('/addBankcard')
  }
}
</script>
<style lang="scss" scoped>
.addInformation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-style: normal;
  font-weight: 400;

  padding: 0 16px;
  .addInformation-content-img {
    width: 110px;
    height: 110px;
    margin-top: 10px;
  }
  .addInformation-content-title {
    color: #111;
    font-size: 16px;
    line-height: 16px;
  }
  .addInformation-content-text {
    text-align: center;
    color: #999;
    font-size: 14px;
    line-height: 16px;
    width: 266px;
    margin: 14px 0 24px 0;
  }
}
</style>
