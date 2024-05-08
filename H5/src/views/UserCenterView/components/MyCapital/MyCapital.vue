<template>
  <div class="myCapital-content" v-if="isDomShow">
    <template v-if="hasDepositOrder && hasWithdrawOrder">
      <div class="myCapital-content-left">
        <div class="title">{{ $t('UsercenterView.TopUpTip') }}</div>
        <div class="text">
          {{ $t('UsercenterView.TopUpTip1') }}<span>{{ formattedTime }}</span>
          {{ $t('UsercenterView.TopUpTip2') }}
        </div>
      </div>
      <div class="myCapital-content-right" @click="router.push('/deposit')">
        <div>{{ $t('UsercenterView.Check') }}</div>
        <img src="./img/rightIcon.png" alt="" />
      </div>
    </template>
    <template v-else-if="hasDepositOrder">
      <div class="myCapital-content-left">
        <div class="title">{{ $t('UsercenterView.TopUpTip') }}</div>
        <div class="text">
          {{ $t('UsercenterView.TopUpTip1') }}<span>{{ formattedTime }}</span>
          {{ $t('UsercenterView.TopUpTip2') }}
        </div>
      </div>
      <div class="myCapital-content-right" @click="router.push('/deposit')">
        <div>{{ $t('UsercenterView.Check') }}</div>
        <img src="./img/rightIcon.png" alt="" /></div
    ></template>
    <template v-else-if="hasWithdrawOrder">
      <div class="myCapital-content-left">
        <div class="title">{{ $t('UsercenterView.WithdrawTip') }}</div>
        <div class="text">
          <span>{{ $t('UsercenterView.WithdrawTip1') }}</span>
          {{ $t('UsercenterView.WithdrawTip2') }}
        </div>
      </div>
      <div class="myCapital-content-right" @click="router.push('/withdraw')">
        <div>{{ $t('UsercenterView.Check') }}</div>
        <img src="./img/rightIcon.png" alt="" /></div
    ></template>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onMounted, ref } from 'vue'
import { useDepositOrderCheck, useWithdrawOrderCheck } from '@/hooks/usePayment'
import { useSetpTime } from '@/hooks/useSetpTime'
import { useRouter } from 'vue-router'
const router = useRouter()

// 是否有充值订单
const hasDepositOrder = ref(false)
// 充值信息
const depositDatas = ref({})
// 是否有提现订单
const hasWithdrawOrder = ref(false)
// 提现信息
const withdrawDatas = ref({})
// 获取时间
const remainingTimes = ref(null)
// 是否正在倒计时
const isCounting = ref(true)

const isDomShow = computed(() => {
  if (hasDepositOrder.value || hasWithdrawOrder.value) {
    return true
  }
  return false
})

onMounted(() => {
  getList()
})

const getList = async () => {
  const { hasOrder: hasDeposit, data: depositData } = await useDepositOrderCheck('')
  hasDepositOrder.value = hasDeposit
  Object.assign(depositDatas.value, depositData)
  const { hasOrder: hasWithdraw, data: withdrawData } = await useWithdrawOrderCheck('')
  hasWithdrawOrder.value = hasWithdraw
  withdrawDatas.value = withdrawData
  remainingTimes.value = useSetpTime(
    depositDatas.value.createTime,
    depositDatas.value.waitPaymentTime,
    depositDatas.value.currentTime
  )
  if (depositDatas.value.waitPaymentTime) {
    startCountdown()
  }
}
let timer = null
// 计算倒计时显示的值，将秒格式化为分钟和秒的字符串形式
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTimes.value / 60)
  const seconds = remainingTimes.value % 60
  return `${minutes}${i18n.global.t('UsercenterView.point')}${seconds}${i18n.global.t(
    'UsercenterView.Second'
  )}`
})

// 开始倒计时
const startCountdown = () => {
  timer = setTimeout(() => {
    remainingTimes.value -= 1
    // 倒计时结束时执行回调函数
    if (remainingTimes.value === 0) {
      isCounting.value = false
      clearTimeout(timer)
    } else {
      startCountdown() // 继续倒计时
    }
  }, 1000)
}
onBeforeUnmount(() => {
  clearTimeout(timer)
})

watch(remainingTimes, (newVal) => {
  if (newVal == 0) {
    isCounting.value = false
    clearTimeout(timer)
    hasDepositOrder.value = false
  }
})
</script>
<style lang='scss' scoped>
.myCapital-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 345px;
  min-height: 80px;
  margin-top: 15px;
  padding: 0 15px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
  .myCapital-content-left {
    .title {
      color: #111;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .text {
      color: #111;
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      span {
        color: var(---1, #f53f3f);
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
      }
    }
  }
  .myCapital-content-right {
    display: flex;
    color: var(---, #486bb2);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    img {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }
  }
}
</style>