<template>
  <div class="withdrawalMethod">
    <div
      class="withdrawalMethod-box"
      :class="{ active: onComputedOrdinaryCheck }"
      @click="onClickCheck(1)"
    >
      <div class="left">
        <el-radio v-model="radio" label="1">{{$t('DepositWithdraw.OrdinaryWithdrawal')}}</el-radio>
      </div>
      <div class="text">
        {{$t('DepositWithdraw.WithdrawalLimit')}}<span class="span"
          ><CurrencyUnit />{{ onCmputedLargem.normalMinWd }}~{{ onCmputedLargem.normalMaxWd }} </span
        >{{$t('DepositWithdraw.WithdrawalTips_4')}}&nbsp;<span>
          {{ onCmputedLargem.normalAvailableWdTimes }}/{{ onCmputedLargem.normalMaxWdTimes }}</span
        >&nbsp;{{$t('DepositWithdraw.Orders')}}
      </div>
    </div>

    <div
      class="withdrawalMethod-boxs"
      :class="{ active: onComputedLargeCheck }"
      @click="onClickCheck(2)"
    >
      <div class="left">
        <el-radio v-model="radio" label="2">{{$t('DepositWithdraw.LargeWithdrawals')}}</el-radio>
      </div>
      <div class="text">
        {{$t('DepositWithdraw.WithdrawalLimit')}}<span class="span"
          ><CurrencyUnit />{{ onCmputedLargem.largeMinWd }}~{{ onCmputedLargem.largeMaxWd }} </span
        >{{$t('DepositWithdraw.WithdrawalTips_4')}}<span
          >&nbsp;{{ withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes }}/{{
            withdrawStore.largeWithdrawLimit?.largeMaxWdTimes
          }}</span
        >&nbsp;{{$t('DepositWithdraw.Orders')}}
      </div>
      <div class="text">
        {{$t('DepositWithdraw.WithdrawalTips_5')}}<span class="span">{{
          withdrawStore.largeWithdrawLimit?.entertainmentValidBets
        }}</span
        >{{$t('DepositWithdraw.WithdrawalTips_6')}}<span class="span">{{
          withdrawStore.largeWithdrawLimit?.sportsValidBets
        }}</span
        >{{$t('DepositWithdraw.WithdrawalTips_7')}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useWithdrawStore } from '@/stores/withdraw'
const withdrawStore = useWithdrawStore()

const emit = defineEmits(['checkValue'])

const props = defineProps({
  large: {
    type: Object,
    default: () => {}
  },
  inputAmount: {
    type: String,
    default: ''
  },
  textDatas: {
    type: Object,
    default: () => {}
  }
})

const onCmputedLargem = computed(() => {
  return props.large
})
// 普通提现
const ordinaryCheck = ref(true)
// 大额提现默认
const largeCheck = ref(false)

const radio = ref('1')

const onComputedLargeCheck = computed(() => {
  if (largeCheck.value) {
    return true
  } else {
    return false
  }
})
const onComputedOrdinaryCheck = computed(() => {
  if (ordinaryCheck.value) {
    return true
  } else {
    return false
  }
})

watch(
  () => props.inputAmount,
  (newValue) => {
    if (
      newValue < onCmputedLargem.value.normalMinWd ||
      newValue > onCmputedLargem.value.largeMaxWd ||
      newValue == 0 ||
      newValue == ''
    ) {
      radio.value = '1'
      largeCheck.value = false
      ordinaryCheck.value = true
      emit('checkValue', {})
    } else if (
      newValue > onCmputedLargem.value.largeMinWd &&
      newValue <= onCmputedLargem.value.largeMaxWd
    ) {
      radio.value = '2'
      largeCheck.value = true
      ordinaryCheck.value = false
      const obj = {
        name: 'largeCheck',
        val: largeCheck.value
      }
      emit('checkValue', obj)
    } else {
      radio.value = '1'
      ordinaryCheck.value = true
      largeCheck.value = false
      const obj = {
        name: 'ordinaryCheck',
        val: ordinaryCheck.value
      }
      emit('checkValue', obj)
    }
  }
)
// 点击选中复选按钮
const onClickCheck = (val) => {
  // 改变状态
  radio.value = val + ''
  if (val === 1) {
    ordinaryCheck.value = true
    largeCheck.value = false
    const obj = {
      name: 'ordinaryCheck',
      val: ordinaryCheck.value,
      id: 1
    }
    emit('checkValue', obj)
  } else if (val === 2) {
    ordinaryCheck.value = false
    largeCheck.value = true
    const obj = {
      name: 'largeCheck',
      val: largeCheck.value,
      id: 2
    }
    emit('checkValue', obj)
  }
}
</script>
 <style lang='scss' scoped>
.withdrawalMethod {
  .withdrawalMethod-box {
    width: 660px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    background: #1d223c;
    margin: auto;
    margin-bottom: 8px;
    box-sizing: border-box;
    cursor: pointer;
    .left {
      margin-left: 6px;
    }
    .text {
      color: #666;
      font-size: 12px;
      font-weight: 400;
      margin: 8px 0 8px 30px;
      line-height: 13px;
    }
    .span {
      color: #e56b2e;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }
    span {
      color: var(--1, #00b42a);
      font-size: 11px;
    }
  }
  .withdrawalMethod-boxs {
    width: 660px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    background: #1d223c;
    margin: auto;
    margin-bottom: 8px;
    padding-right: 12px;
    box-sizing: border-box;
    cursor: pointer;
    .left {
      margin-left: 6px;
    }
    .text {
      color: #666;
      font-size: 12px;
      font-weight: 400;
      margin: 8px 0 8px 30px;
      line-height: 14px;
    }
    .text:nth-child(2) {
      margin-bottom: 0;
    }
    span {
      color: var(--1, #00b42a);
      font-size: 11px;
    }
    .span {
      color: #e56b2e;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }
  }
  .active {
    border-radius: 6px;
    border: 1px solid var(--1, #ff9000);
  }
}
</style>
