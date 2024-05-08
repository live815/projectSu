<template>
  <HeaderStep
    :bankPage="true"
    :active="active"
    :bankInfo="bankInfo"
    :setpListData="onComputedStepListData"
  ></HeaderStep>
  <div
    class="bankCard-content"
    v-if="
      onComputedBankInfo.channelTypeCode === 'BANK' ||
      onComputedBankInfo.channelTypeCode === 'C2C_BANK' ||
      onComputedBankInfo.channelTypeCode == 'VNCard' ||
      onComputedBankInfo.channelTypeCode == 'VNBank'
    "
  >
    <div class="bankCard-content-title">{{ $t('Rletter.waitpay') }}</div>
    <div class="bankCard-content-item">
      <div class="bankCard-content-item-left">
        <div class="bankCard-content-item-left-name">{{ $t('Rletter.accountname') }}</div>
        <div class="bankCard-content-item-left-text">{{ onComputedBankInfo.cardName }}</div>
      </div>
      <div class="bankCard-content-item-right" v-clipboard="onComputedBankInfo.cardName">
        {{ $t('Rletter.copy') }}
      </div>
    </div>
    <div class="bankCard-content-item">
      <div class="bankCard-content-item-left">
        <div class="bankCard-content-item-left-name">{{ $t('Rletter.bankaccount') }}</div>
        <div class="bankCard-content-item-left-text">{{ onComputedBankInfo.cardNo }}</div>
      </div>
      <div class="bankCard-content-item-right" v-clipboard="onComputedBankInfo.cardNo">
        {{ $t('Rletter.copy') }}
      </div>
      <div class="bankCard-content-item-fixed">
        <span><van-icon name="warning" color="#F53F3F" /></span>{{ $t('Rletter.rlettertip') }}
      </div>
    </div>
    <div class="bankCard-content-item">
      <div class="bankCard-content-item-left">
        <div class="bankCard-content-item-left-name">{{ $t('Rletter.Bankdeposit') }}</div>
        <div class="bankCard-content-item-left-text">{{ onComputedBankInfo.bankName }}</div>
      </div>
      <div class="bankCard-content-item-right" v-clipboard="onComputedBankInfo.bankName">
        {{ $t('Rletter.copy') }}
      </div>
    </div>
    <div class="bankCard-content-item">
      <div class="bankCard-content-item-left">
        <div class="bankCard-content-item-left-name">{{ $t('Rletter.transferamount') }}</div>
        <div class="bankCard-content-item-left-text">
          {{ toFormatNumber(Number(onComputedBankInfo.amount)) }}
        </div>
      </div>
      <div class="bankCard-content-item-right" v-clipboard="onComputedBankInfo.amount">
        {{ $t('Rletter.copy') }}
      </div>
      <div class="bankCard-content-item-fixed">
        <span><van-icon name="warning" color="#F53F3F" /></span> {{ $t('Rletter.rlettertip1') }}
      </div>
    </div>
    <div class="bankCard-content-item">
      <div class="bankCard-content-item-left">
        <div class="bankCard-content-item-left-name">{{ $t('Rletter.rlettertip2') }}</div>
        <div class="bankCard-content-item-left-text">{{ onComputedBankInfo.memo }}</div>
      </div>
      <div class="bankCard-content-item-right" v-clipboard="onComputedBankInfo.memo">
        {{ $t('Rletter.copy') }}
      </div>
    </div>
  </div>
  <div class="bankCard-order">
    <div class="bankCard-order-title">{{ $t('Rletter.orderinformat') }}</div>
    <div class="bankCard-order-item">
      <div class="bankCard-order-item-left">{{ $t('Rletter.Rechargemethod') }}</div>
      <div class="bankCard-order-item-right">
        <div class="bankCard-order-item-right-title">{{ onComputedBankInfo.channelTypeName }}</div>
      </div>
    </div>
    <div class="bankCard-order-item">
      <div class="bankCard-order-item-left">{{ $t('Rletter.Extramount') }}</div>
      <div class="bankCard-order-item-right">
        <div class="bankCard-order-item-right-title">
          {{ toFormatNumber(Number(onComputedBankInfo.addBonus)) }}
        </div>
      </div>
    </div>
    <div class="bankCard-order-item">
      <div class="bankCard-order-item-left">{{ $t('Rletter.ordernumber') }}</div>
      <div class="bankCard-order-item-right">
        <div class="bankCard-order-item-right-title">{{ onComputedBankInfo.orderNo }}</div>
        <div v-clipboard="onComputedBankInfo.orderNo" class="copy-btn">
          {{ $t('Rletter.copy') }}
        </div>
      </div>
    </div>
    <div class="bankCard-order-item">
      <div class="bankCard-order-item-left">{{ $t('Rletter.Rechargetime') }}</div>
      <div class="bankCard-order-item-right">
        <div class="bankCard-order-item-right-title">{{ onComputedBankInfo.createTime }}</div>
      </div>
    </div>
  </div>
  <!-- 提示文本渲染 -->
  <div class="bankCard-info" v-if="dpPendingContent">
    <div class="bankCard-info-title">{{ $t('Rletter.rlettertip3') }}</div>

    <p v-html="Base64.decode(dpPendingContent)"></p>
  </div>

  <template
    v-if="
      onComputedBankInfo.channelTypeCode === 'BANK' ||
      onComputedBankInfo.channelTypeCode === 'C2C_BANK' ||
      onComputedBankInfo.channelTypeCode == 'VNCard' ||
      onComputedBankInfo.channelTypeCode == 'VNBank'
    "
  >
    <DedicatedButton v-if="isOrderShow" color="primary" @click="onClickUploading">{{
      $t('Rletter.rlettertip4')
    }}</DedicatedButton>
    <DedicatedButton v-else :color="color" @click="onClickReminder"
      >{{ $t('Rletter.rlettertip5')
      }}<span v-if="!isOrderBtn">{{ formatTime }}</span></DedicatedButton
    >
  </template>
  <div class="bankCard-footer-btn" @click="onClickCancelOrder" v-if="isOrderShow">
    {{ $t('Rletter.rlettertip6') }}
  </div>
  <!-- 上传充值信息弹窗 -->
  <PermitsPopup
    ref="permitsPopupDom"
    :orderNo="onComputedBankInfo.orderNo"
    @payOrder="onPayOrder"
  ></PermitsPopup>
  <!-- 撤销充值订单弹窗 -->
  <OrderPopup ref="orderPopupDom" :orderNo="onComputedBankInfo.orderNo"></OrderPopup>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Base64 } from 'js-base64'
import HeaderStep from '../HeaderStep/HeaderStep'
import vClipboard from '@/directives/clipboard.js'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import PermitsPopup from '../PermitsPopup/PermitsPopup'
import OrderPopup from '../OrderPopup/OrderPopup'
import { getOrderText, getOrderNo } from '@/api/recharge'
import { showToast } from 'vant'
import { useRechargeStore } from '@/stores/recharge'
import { toFormatNumber } from '@/utils'
import eventBus from '@/utils/eventBus'
import i18n from '@/i18n'
const rechargeStore = useRechargeStore()

const router = useRouter()

const dpPendingContent = ref('')

onMounted(() => {
  if (onComputedBankInfo.value) {
    getOrderNo({ orderNo: '' }).then((res) => {
      if (
        res.data.receiptUploaded == '1' &&
        (res.data.channelTypeCode == 'BANK' ||
          res.data.channelTypeCode == 'C2C_BANK' ||
          res.data.channelTypeCode == 'VNCard' ||
          res.data.channelTypeCode == 'VNBank')
      ) {
        active.value = 2
        isOrderShow.value = false
      }
    })
    // 说明文字信息
    getOrderText(onComputedBankInfo.value.channelTypeId).then((res) => {
      if (res.data.dpPendingContent) {
        dpPendingContent.value = res.data.dpPendingContent
      }
    })
  }
  if (
    onComputedBankInfo.value.receiptUploaded == '1' &&
    (onComputedBankInfo.value.channelTypeCode == 'BANK' ||
      onComputedBankInfo.value.channelTypeCode == 'C2C_BANK' ||
      onComputedBankInfo.value.channelTypeCode == 'VNCard' ||
      onComputedBankInfo.value.channelTypeCode == 'VNBank')
  ) {
    active.value = 2
    isOrderShow.value = false
  }
  // 组件挂载后开始轮询订单状态
  startPolling()
})

// 定义上传充值信息弹窗ref
const permitsPopupDom = ref(null)
// 定义取消充值信息弹窗ref
const orderPopupDom = ref(null)

// 定义是否已经上传凭证
const isOrderShow = ref(true)

// 顶部步骤条 默认到第一步
const active = ref(1)
// 底部催单按钮倒计时
const footerBtnTime = ref(null)

const props = defineProps({
  bankInfo: {
    type: Object,
    default: () => {}
  }
})

const onComputedBankInfo = computed(() => {
  return props.bankInfo.value
})

// 定义催单按钮颜色
const color = ref('primary')

// 定义是都已经点击催单按钮
const isOrderBtn = ref(true)

// 顶部步骤条文字
const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('Rletter.SubmitOrder')
  },
  {
    id: 2,
    name: i18n.global.t('Rletter.rlettertip7')
  },
  {
    id: 3,
    name: i18n.global.t('Rletter.rlettertip8')
  }
])
// 定义顶部状态 判断是否为银行卡
const onComputedStepListData = computed(() => {
  if (
    onComputedBankInfo.value.channelTypeCode != 'BANK' &&
    onComputedBankInfo.value.channelTypeCode != 'C2C_BANK' &&
    onComputedBankInfo.value.channelTypeCode != 'VNCard' &&
    onComputedBankInfo.value.channelTypeCode != 'VNBank'
  ) {
    stepListData.forEach((item, index) => {
      if (index == 1) {
        item.name = i18n.global.t('Rletter.rlettertip9')
      }
      if (index == 2) {
        item.name = i18n.global.t('Rletter.receivedsuccess')
      }
    })
    return stepListData
  }
  return stepListData
})

watch(footerBtnTime, (newVal) => {
  if (newVal <= 0) {
    color.value = 'primary'
    isOrderBtn.value = true
    // 倒计时结束
    // 在这里可以添加倒计时结束后的逻辑
    return
  }
  setTimeout(() => {
    footerBtnTime.value = newVal - 1 // 每秒减1
  }, 1000)
})
const formatTime = computed(() => {
  const minutes = Math.floor(footerBtnTime.value / 60)
  const seconds = footerBtnTime.value % 60
  return `(${minutes}${i18n.global.t('Rletter.point')}${seconds}${i18n.global.t('Rletter.Second')})`
})
// 点击弹出上传凭证
const onClickUploading = () => {
  permitsPopupDom.value.showhide()
  eventBus.emit('emptyImg')
}

// 上传付款凭证弹窗返回的信息
const onPayOrder = (val) => {
  active.value = 2
  isOrderShow.value = val
  getOrderNo({ orderNo: onComputedBankInfo.value.orderNo }).then((res) => {
    if (res.code == 200 && res.data) {
      rechargeStore.orderData = res.data
    }
  })
  // 银行卡上传支付凭证后开始调用轮询接口
  stopPolling() // 停止之前的轮询定时器
  startPolling() // 启动新的轮询定时器
}

// 我要催单
const onClickReminder = () => {
  if (isOrderBtn.value) {
    footerBtnTime.value = 5 * 60
    isOrderBtn.value = false
    footerBtnTime.value--
    color.value = 'disabled'
    showToast(i18n.global.t('Rletter.rlettertip10'))
  }
}

// 撤销存款订单按钮
const onClickCancelOrder = () => {
  orderPopupDom.value.showhide()
}

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
  if (intervalId) {
    return // 如果已经存在轮询定时器，则不重复创建
  }
  checkPaymentStatus() // 立即查询一次订单状态
  intervalId = setInterval(checkPaymentStatus, 5000) // 每隔 5 秒查询一次订单状态
}
onUnmounted(() => {
  stopPolling() // 组件销毁前调用停止定时器函数
})
</script>
<style lang="scss" scoped>
.bankCard-content {
  width: 345px;
  min-height: 262px;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 10px;
  padding: 15px;
  .bankCard-content-title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
  .bankCard-content-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 28px 0;
    font-size: 14px;
    font-weight: 400;
    .bankCard-content-item-left {
      display: flex;
      .bankCard-content-item-left-name {
        width: 72px;
        margin-right: 14px;
        color: #666;
      }
      .bankCard-content-item-left-text {
        color: var(--gray-1, #111);
        font-weight: 700;
      }
    }
    .bankCard-content-item-right {
      color: var(--unnamed, var(--unnamed, #486bb2));
      font-size: 14px;
    }
    .bankCard-content-item-fixed {
      max-width: 180px;
      position: absolute;
      top: 16px;
      left: 85px;
      color: var(--1, #f53f3f);
      font-size: 12px;
      > :first-child {
        width: 12px;
        height: 12px;
        margin-right: 5px;
      }
    }
  }
}
.bankCard-order {
  width: 345px;
  min-height: 180px;
  border-radius: 10px;
  background: #fff;
  padding: 15px;
  .bankCard-order-title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
  }
  .bankCard-order-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    .bankCard-order-item-left {
      color: #666;
    }
    .bankCard-order-item-right {
      display: flex;
      align-items: center;
      color: var(--gray-3, #333);
      .bankCard-order-item-right-title {
        color: #111;
      }
      .copy-btn {
        margin-left: 4px;
        color: var(--unnamed, var(--unnamed, #486bb2));
      }
    }
  }
}

.bankCard-info {
  width: 345px;
  border-radius: 10px;
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  .bankCard-info-title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
.bankCard-footer-btn {
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
