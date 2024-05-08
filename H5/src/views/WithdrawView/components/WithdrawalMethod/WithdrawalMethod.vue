<template>
  <div class="withdrawalMethod">
    <div class="withdrawalMethod-top">
      <div class="withdrawalMethod-top-title">{{ $t('Wletter.Withdrawalmethod') }}</div>
      <div class="withdrawalMethod-top-text" @click="onClickNumberPopup">
        {{ $t('Wletter.tip115') }}
      </div>
    </div>
    <div
      class="withdrawalMethod-box"
      :class="{ active: onComputedOrdinaryCheck }"
      @click="onClickCheck(1)"
    >
      <div class="left">
        <van-checkbox v-model="ordinaryCheck" @click="onClickCheck(1)">{{
          $t('Wletter.tip116')
        }}</van-checkbox>
      </div>
      <div class="text">
        {{ $t('Wletter.tip117')
        }}<span class="span"
          ><CurrencyUnit />{{ onCmputedLargem.normalMinWd }}~{{ onCmputedLargem.normalMaxWd }}
        </span>
        <span
          v-html="
            $t('Wletter.tip118', {
              num: onCmputedLargem.normalAvailableWdTimes,
              num1: onCmputedLargem.normalMaxWdTimes
            })
          "
        ></span>
      </div>
    </div>

    <div
      class="withdrawalMethod-boxs"
      :class="{ active: onComputedLargeCheck }"
      @click="onClickCheck(2)"
    >
      <div class="left">
        <van-checkbox v-model="largeCheck" @click="onClickCheck(2)">
          {{ $t('Wletter.Largewithdrawals') }}</van-checkbox
        >
      </div>
      <div class="text">
        {{ $t('Wletter.tip117')
        }}<span class="span"
          ><CurrencyUnit />{{ onCmputedLargem.largeMinWd }}~{{ onCmputedLargem.largeMaxWd }}
        </span>
        <p style="display: inline">
          {{ $t('Wletter.tip122') }}
          <span class="withdrawalMethod-span-t2">{{
            withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes
          }}</span>
          {{ $t('Wletter.tip123') }}
          <span class="withdrawalMethod-span-t3">{{
            withdrawStore.largeWithdrawLimit?.largeMaxWdTimes
          }}</span>
          {{ $t('Wletter.tip124') }}
        </p>
      </div>
      <div class="text">
        <p style="display: inline">
          {{ $t('Wletter.tip122') }}
          <span class="withdrawalMethod-span-t2">{{
            withdrawStore.largeWithdrawLimit?.entertainmentValidBets
          }}</span>
          {{ $t('Wletter.tip123') }}
          <span class="withdrawalMethod-span-t3">{{
            withdrawStore.largeWithdrawLimit?.sportsValidBets
          }}</span>
          {{ $t('Wletter.tip124') }}
        </p>
      </div>
    </div>
  </div>
  <!-- 提现说明弹窗 -->
  <WithdrawalsNumberPopup ref="withdrawalsNumberPopupDom" />
</template>

<script setup>
import { computed, ref } from 'vue'
import WithdrawalsNumberPopup from '../WithdrawalsNumberPopup/WithdrawalsNumberPopup.vue'
import { useWithdrawStore } from '@/stores/withdraw'
const withdrawStore = useWithdrawStore()

// 定义弹窗ref
const withdrawalsNumberPopupDom = ref(null)
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

// 提现次数说明
const onClickNumberPopup = () => {
  withdrawalsNumberPopupDom.value.showhide(props.textDatas)
}
const onCmputedLargem = computed(() => {
  return props.large
})
// 普通提现
const ordinaryCheck = ref(true)
// 大额提现默认
const largeCheck = ref(false)

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
// watch(
//   // 属性的响应式引用
//   () => largeCheck.value,

//   // 监听属性变化的回调函数
//   (newValue) => {
//     if (newValue) {
//       ordinaryCheck.value = false
//     }
//   }
// )
// watch(
//   // 属性的响应式引用
//   () => ordinaryCheck.value,

//   // 监听属性变化的回调函数
//   (newValue) => {
//     if (newValue) {
//       largeCheck.value = false
//     }
//   }
// )

watch(
  () => props.inputAmount,
  (newValue) => {
    if (
      newValue < onCmputedLargem.value.normalMinWd ||
      newValue > onCmputedLargem.value.largeMaxWd ||
      newValue == 0 ||
      newValue == ''
    ) {
      largeCheck.value = false
      ordinaryCheck.value = true
      emit('checkValue', {})
    } else if (
      newValue > onCmputedLargem.value.largeMinWd &&
      newValue <= onCmputedLargem.value.largeMaxWd
    ) {
      largeCheck.value = true
      ordinaryCheck.value = false
      const obj = {
        name: 'largeCheck',
        val: largeCheck.value
      }
      emit('checkValue', obj)
    } else {
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
  if (val == 1) {
    ordinaryCheck.value = true
    largeCheck.value = false
    const obj = {
      name: 'ordinaryCheck',
      val: ordinaryCheck.value,
      id: 1
    }
    emit('checkValue', obj)
  } else {
    largeCheck.value = true
    ordinaryCheck.value = false
    const obj = {
      name: 'largeCheck',
      val: largeCheck.value,
      id: 2
    }
    emit('checkValue', obj)
  }
}
</script>
<style lang="scss" scoped>
.withdrawalMethod {
  .withdrawalMethod-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 16px;
    .withdrawalMethod-top-title {
      color: var(--gray-1, #111);
      font-weight: 600;
      font-size: 16px;
    }
    .withdrawalMethod-top-text {
      color: var(--unnamed, var(--unnamed, #486bb2));
      font-size: 12px;
      font-weight: 400;
    }
  }
  .withdrawalMethod-box {
    padding-top: 10px;
    width: 340px;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    background: #f7f7f7;
    margin: auto;
    margin-bottom: 8px;
    box-sizing: border-box;
    .left {
      margin-left: 6px;
    }
    .text {
      color: #666;
      font-size: 12px;
      font-weight: 400;
      margin: 8px 0 8px 30px;
      line-height: 13px;
      padding-right: 2px;
    }
    .span {
      color: #e56b2e;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
    }
  }
  .withdrawalMethod-boxs {
    width: 340px;
    min-height: 94px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 10px;
    border-radius: 6px;
    background: #f7f7f7;
    margin: auto;
    margin-bottom: 8px;
    padding-right: 12px;
    box-sizing: border-box;
    line-height: 16px;
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
    background: var(--4, #fff5f0);
  }
}
</style>

<style lang="scss">
.withdrawalMethod-span-t1 {
  color: #00b42a;
  font-size: 11px;
}
.withdrawalMethod-span-t2 {
  color: #e56b2e;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.withdrawalMethod-span-t3 {
  color: #e56b2e;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
</style>
