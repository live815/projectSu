<template>
  <HeaderStep :setpListData="stepListData" :active="active" :bankInfo="props.bankInfo"></HeaderStep>
  <div class="rechargeInformation-min">
    <div class="rechargeInformation-min-title">{{ $t('Rletter.waitpay') }}</div>
    <div class="rechargeInformation-min-sum">
      <span>{{ onComputedBankInfo.usdtNum }}</span>
      <span>USDT</span>
      <span v-clipboard="onComputedBankInfo.usdtNum" class="copy-btn">{{
        $t('Rletter.copy')
      }}</span>
    </div>
    <div class="rechargeInformation-min-account">
      {{ $t('Rletter.rlettertip37') }} <span>{{ onComputedAmount }}</span
      ><span>{{ Currency }}</span
      ><span>
        {{ $t('Rletter.Extragift') }}
        {{ toFormatNumber(Number(onComputedBankInfo.addBonus)) }}</span
      >
    </div>
    <div class="rechargeInformation-min-text">
      ( {{ $t('Rletter.rlettertip38') }} 1USDT = {{ onComputedBankInfo.rate }}{{ Currency }} )
    </div>

    <div class="rechargeInformation-min-hint">
      <span class="icon"><van-icon name="warning" color="#F53F3F" /></span>
      {{ $t('Rletter.rlettertip39') }} <span>USDT-{{ onComputedBankInfo.protocol }}</span>
      {{ $t('Rletter.rlettertip40') }}
    </div>
  </div>
  <div class="rechargeInformation-footer">
    <div class="rechargeInformation-footer-title">{{ $t('Rletter.rlettertip41') }}</div>
    <div class="rechargeInformation-footer-item">
      <div class="rechargeInformation-footer-item-left">{{ $t('Rletter.Rechargemethod') }}</div>
      <div class="rechargeInformation-footer-item-right">
        {{ onComputedBankInfo.channelTypeName }}
      </div>
    </div>
    <div class="rechargeInformation-footer-item">
      <div class="rechargeInformation-footer-item-left">{{ $t('Rletter.Rechargecurrency') }}</div>
      <div class="rechargeInformation-footer-item-right">{{ onComputedBankInfo.dpCurrency }}</div>
    </div>
    <div class="rechargeInformation-footer-item">
      <div class="rechargeInformation-footer-item-left">{{ $t('Rletter.Extraamount') }}</div>
      <div class="rechargeInformation-footer-item-right">
        {{ toFormatNumber(Number(onComputedBankInfo.addBonus)) }}
      </div>
    </div>
    <div class="rechargeInformation-footer-item">
      <div class="rechargeInformation-footer-item-left">{{ $t('Rletter.ordernumber') }}</div>
      <div class="rechargeInformation-footer-item-right">
        <div>{{ onComputedBankInfo.orderNo }}</div>
        <div v-clipboard="onComputedBankInfo.orderNo" class="copy-btn">
          {{ $t('Rletter.copy') }}
        </div>
      </div>
    </div>
    <div class="rechargeInformation-footer-item">
      <div class="rechargeInformation-footer-item-left">{{ $t('Rletter.Rechargetime') }}</div>
      <div class="rechargeInformation-footer-item-right">{{ onComputedBankInfo.createTime }}</div>
    </div>
  </div>
  <div class="rechargeInformation-footer-btn" @click="onClickCancelOrder">
    {{ $t('Rletter.rlettertip6') }}
  </div>
  <!-- 撤销充值订单弹窗 -->
  <OrderPopup ref="orderPopupDom" :orderNo="onComputedBankInfo.orderNo"></OrderPopup>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import HeaderStep from '../HeaderStep/HeaderStep'
import vClipboard from '@/directives/clipboard.js'
import OrderPopup from '../OrderPopup/OrderPopup'
import { useRechargeStore } from '@/stores/recharge'
import { toFormatNumber } from '@/utils'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
const rechargeStore = useRechargeStore()
const router = useRouter()

// 定义取消充值信息弹窗ref
const orderPopupDom = ref(null)
// 撤销存款订单按钮
const onClickCancelOrder = () => {
  orderPopupDom.value.showhide()
}
const props = defineProps({
  bankInfo: {
    type: Object,
    default: () => {}
  }
})
const onComputedBankInfo = computed(() => {
  return props.bankInfo.value
})

// 总到账
const onComputedAmount = computed(() => {
  return Number(props.bankInfo.value.amount) + Number(props.bankInfo.value.addBonus)
})

// 当前进度条显示
const active = ref(1)

const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('Rletter.SubmitOrder')
  },
  {
    id: 2,
    name: i18n.global.t('Rletter.Payment')
  },
  {
    id: 3,
    name: i18n.global.t('Rletter.Successreceive')
  }
])

// 轮询定时器ID
let intervalId = null
const checkPaymentStatus = async () => {
  // 调用后端接口查询订单支付状态
  try {
    await rechargeStore.getOrderStatus(onComputedBankInfo.value.orderNo)
    // 订单详情数据
    if (rechargeStore.orderDataStatus.orderNo) {
      const { status } = rechargeStore.orderDataStatus
      if (status == 1 || status == 3 || status == 4 || status == 5 || status == 6) {
        stopPolling() // 订单支付成功，停止轮询
        router.push('/')
      }
    }
  } catch (err) {}
}
// 停止轮询定时器
const stopPolling = () => {
  clearInterval(intervalId)
  intervalId = null
}
const startPolling = () => {
  checkPaymentStatus() // 立即查询一次订单状态
  intervalId = setInterval(checkPaymentStatus, 5000) // 每隔 5 秒查询一次订单状态
}

onMounted(() => {
  startPolling()
})

// 在组件销毁前停止轮询
onUnmounted(stopPolling)
</script>
<style lang="scss" scoped>
.rechargeInformation-min {
  width: 100%;
  border-radius: 10px;
  background: #fff;
  margin: 10px 0;
  padding: 15px;
  .rechargeInformation-min-title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
  .rechargeInformation-min-sum {
    margin: 24px 0 15px 0;
    text-align: right;
    color: #111;
    font-weight: 700;
    > :first-child {
      font-size: 32px;
      margin-right: 8px;
    }

    > :last-child {
      color: var(--unnamed, var(--unnamed, #486bb2));
      font-size: 14px;
      font-weight: 400;
      margin-left: 75px;
    }
  }
  .rechargeInformation-min-account {
    color: #111;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    > :first-child {
      color: var(--1, #f53f3f);
      margin: 0 4px;
      font-weight: 700;
    }
    > :nth-child(2) {
      font-weight: 700;
    }

    > :last-child {
      color: var(--1, #ff9000);
      width: 67px;
      height: 16px;

      font-size: 12px;
      font-style: normal;
      padding: 5px;
      font-weight: 400;
      margin-left: 5px;
      border-radius: 2px;
      background: var(--4, #fff7e8);
    }
  }
  .rechargeInformation-min-text {
    color: #999;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    margin: 8px 0 24px 0;
  }
  .rechargeInformation-min-hint {
    text-align: center;
    color: var(--999, #f53f3f);
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    padding: 0 15px;
    margin-top: 44px;
    .icon {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
    span {
      font-weight: 700;
    }
  }
}
.rechargeInformation-footer {
  width: 100%;
  // height: 190px;
  padding: 15px;
  border-radius: 10px;
  background: #fff;
  .rechargeInformation-footer-title {
    color: #111;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .rechargeInformation-footer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    .rechargeInformation-footer-item-left {
      color: #666;
    }
    .rechargeInformation-footer-item-right {
      display: flex;
      color: var(--gray-3, #333);
      .copy-btn {
        margin-left: 4px;
        color: var(--unnamed, var(--unnamed, #486bb2));
      }
    }
  }
  .rechargeInformation-footer-item:last-child {
    margin-bottom: 5px;
  }
}
.rechargeInformation-footer-btn {
  color: #666;
  width: 343px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  margin-top: 12px;
  border-radius: 6px;
  background: #ddd;
}
</style>
