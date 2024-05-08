<template>
  <div class="rechargeInformation-top">
    <van-steps
      class="my-steps"
      :active="onComputedActive"
      active-icon="success"
      active-color="#07c160"
    >
      <van-step v-for="(item, index) in onComputedStepList" :key="index">{{ item.name }}</van-step>
    </van-steps>
    <div v-if="onComputedActive == 1" class="rechargeInformation-top-text">
      {{ $t('Rletter.rlettertip11', { num: formattedTime }) }}
    </div>
    <div
      v-if="
        onComputedBankInfo.channelTypeCode != 'BANK' &&
        onComputedBankInfo.channelTypeCode != 'C2C_BANK' &&
        onComputedBankInfo.channelTypeCode != 'VNCard' &&
        onComputedBankInfo.channelTypeCode != 'VNBank'
      "
      class="rechargeInformation-top-texts"
      :class="{ 'rechargeInformation-virtual': onComputedBankInfo.channelTypeCode == 'USDT' }"
    >
      {{ $t('Rletter.rlettertip12') }}
    </div>
    <div v-if="onComputedBankPage" class="rechargeInformation-top-bank">
      <span><CurrencyUnit /> {{ toFormatNumber(Number(onComputedBankInfo.amount)) }}</span>
    </div>
    <div v-if="onComputedBankPage" class="rechargeInformation-top-footer">
      <span class="icon"
        ><van-icon style="font-size: 16px !important" name="warning" color="#F53F3F" /></span
      ><span v-if="onComputedActive == 1" class="spans"> {{ $t('Rletter.rlettertip13') }}</span>
      <span v-else class="spans"> {{ $t('Rletter.rlettertip14') }}</span>
    </div>
    <!-- <div
      v-if="
        onComputedBankInfo.channelTypeCode != 'BANK' &&
        onComputedBankInfo.channelTypeCode != 'C2C_BANK' &&
        onComputedBankInfo.channelTypeCode != 'USDT' &&
        onComputedBankInfo.channelTypeCode != 'VNCard' &&
        onComputedBankInfo.channelTypeCode != 'VNBank'
      "
      class="rechargeInformation-top-footer"
    >
      <span class="icon">
        <van-icon style="font-size: 16px !important" name="warning" color="#F53F3F" />
      </span>
      <span @click="openCustomerServiceLink" v-html="$t('Rletter.rlettertip15')"></span>
    </div> -->
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSetpTime } from '@/hooks/useSetpTime'
import { useRouter } from 'vue-router'
import { toFormatNumber } from '@/utils'
import { getCancelOrder, getOrderNo } from '@/api/recharge'
import { openCustomerServiceLink } from '@/utils/customerService'
import { useRechargeStore } from '@/stores/recharge'
import i18n from '@/i18n'

const rechargeStore = useRechargeStore()
const router = useRouter()

const props = defineProps({
  //顶部步骤条文字
  setpListData: {
    type: Array,
    default: () => []
  },
  //倒计时时间
  remainingTime: {
    type: Number,
    default: null
  },
  // 当前页是否为银行卡页面
  bankPage: {
    type: Boolean,
    default: false
  },
  bankInfo: {
    type: Object,
    default: () => {}
  },
  active: {
    type: Number,
    default: 0
  }
})

// 订单数据
const onComputedBankInfo = ref({})
// const onComputedBankInfo = computed(() => {
//   return props.bankInfo.value
// })

// const active = ref(1)
// 步骤条当前高亮显示
const onComputedActive = computed(() => {
  return props.active
})

//顶部步骤条文字
const onComputedStepList = computed(() => {
  return props.setpListData
})

// 当前是否为银行卡顶部
const onComputedBankPage = computed(() => {
  return props.bankPage
})
// 倒计时结束后的回调方法
const countdownFinished = () => {
  if (onComputedBankInfo.value.receiptUploaded == '0') {
    // 倒计时结束 取消订单
    getCancelOrder({ orderNo: onComputedBankInfo.value.orderNo }).then(() => {
      // 回到首页
      router.push('/')
    })
  }
}
// 是否正在倒计时
const isCounting = ref(true)

const remainingTimes = ref(900)

let timer = null
// 计算倒计时显示的值，将秒格式化为分钟和秒的字符串形式
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTimes.value / 60)
  const seconds = remainingTimes.value % 60
  return `${minutes}${i18n.global.t('Rletter.point')}${seconds}${i18n.global.t('Rletter.Second')}`
})

// 开始倒计时
const startCountdown = () => {
  timer = setTimeout(() => {
    if (
      !onComputedBankInfo.value.receiptUploaded ||
      onComputedBankInfo.value.receiptUploaded == '0'
    ) {
      remainingTimes.value -= 1
      // 倒计时结束时执行回调函数
      if (remainingTimes.value > 0) {
        startCountdown() // 继续倒计时
      } else {
        isCounting.value = false
        clearTimeout(timer)
        countdownFinished()
      }
    }
  }, 1000)
}
onBeforeUnmount(() => {
  clearTimeout(timer)
})
// 初始化时开始倒计时
onMounted(() => {
  // 页面进来判断倒计时是否为零 为零直接跳转到充值页面
  if (props.bankInfo.value) {
    getOrderNo({ orderNo: props.bankInfo.value.orderNo }).then((res) => {
      if (res.code == 200 && res.data) {
        onComputedBankInfo.value = res.data
        remainingTimes.value = useSetpTime(
          onComputedBankInfo.value.createTime,
          onComputedBankInfo.value.waitPaymentTime,
          onComputedBankInfo.value.currentTime
        )
        if (remainingTimes.value > 0) {
          // 初始化时开始倒计时
          startCountdown()
        } else {
          if (
            (!onComputedBankInfo.value.receiptUploaded ||
              onComputedBankInfo.value.receiptUploaded == '0') &&
            remainingTimes.value == 0
          ) {
            countdownFinished()
          }
        }
      }
    })
  }
})
watch(
  () => rechargeStore.orderData,
  (newValue) => {
    onComputedBankInfo.value = newValue
  }
)
</script>
<style lang="scss" scoped>
.rechargeInformation-top {
  width: 345px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  .my-steps {
    :deep() .van-step__title {
      max-width: 100px;
      white-space: break-spaces; // 允许换行
    }
  }
  .rechargeInformation-top-text {
    color: #666;
    font-size: 15px;
    margin: 20px 0;
    font-weight: 400;
    text-align: center;
    span {
      color: var(--1, #f53f3f);
      font-size: 15px;
      margin: 0 2px;
      font-weight: 600;
    }
  }
  .rechargeInformation-top-texts {
    color: #666;
    text-align: center;
    font-size: 12px;
  }
  .rechargeInformation-virtual {
    margin-bottom: 15px;
  }
  .rechargeInformation-top-bank {
    margin: 12px 0;
    text-align: center;
    color: #111;
    font-size: 32px;
    font-weight: 700;
    margin-right: 6px;
  }
  .rechargeInformation-top-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    font-size: 12px;
    text-align: center;
    margin-bottom: 15px;
    .icon {
      margin-right: 5px;
    }
    .spans {
      color: var(--1, #f53f3f);
      font-size: 12px;
    }
  }
}

:deep().van-icon-success:before {
  font-size: 16px;
}
:deep().van-step__circle {
  width: 6px;
  height: 6px;
}
</style>

<style lang="scss">
.recharge-information-span {
  color: (#f53f3f);
  font-size: 12px;
  text-decoration: underline;
  margin: 0 2px;
}
</style>
