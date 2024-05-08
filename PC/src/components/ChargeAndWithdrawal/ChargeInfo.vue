<template>
  <div class="chargeInfo-container">
    <div class="title">
      <div class="title-text">{{ $t('DepositWithdraw.RechargeInformation') }}</div>
      <div class="cancel-btn" @click="onClickRevocationPopup">
        {{ $t('DepositWithdraw.CancelRechargeOrder') }}
      </div>
    </div>
    <div class="main-box">
      <div class="progress-container">
        <div class="progress-text-row">
          <div class="progress-text" v-for="item in onComputedStepListData" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="progress-line-row">
          <div class="dot"></div>
          <div class="dot">
            <img class="dot-img" v-if="active == 1" src="./img/time.png" />
          </div>
          <div class="dot">
            <img class="dot-img" v-if="active == 2" src="./img/time.png" />
          </div>
        </div>
        <div class="counter-box" v-if="active == 1">
          <div v-html="$t('DepositWithdraw.NoticeTips_5', { formattedTime })"></div>
        </div>
        <div
          class="money-text"
          :class="{ 'money-texts': mainConfig.orderDetail?.receiptUploaded == 1 }"
          v-if="mainConfig.orderDetail?.channelTypeCode != 'USDT'"
        >
          <CurrencyUnit />{{
            toFormatNumber(mainConfig.orderDetail?.amount /*+ mainConfig.orderDetail?.addBonus*/)
          }}
        </div>
        <div class="reminder">
          <img class="img" src="./img/errorMaxIcon.png" />

          <div v-if="mainConfig.orderDetail?.channelTypeCode == 'USDT'">
            {{ $t('DepositWithdraw.Tips_1') }}
          </div>
          <div v-else>{{ $t('DepositWithdraw.NoticeTips_7') }}</div>
        </div>
      </div>
      <div
        class="payment-detail-container"
        v-if="
          mainConfig.orderDetail?.channelTypeCode == 'BANK' ||
          mainConfig.orderDetail?.channelTypeCode == 'C2C_BANK' ||
          mainConfig.orderDetail?.channelTypeCode == 'VNCard' ||
          mainConfig.orderDetail?.channelTypeCode == 'VNBank'
        "
      >
        <div class="sub-title">
          <div class="sub-title-bar"></div>
          {{ $t('DepositWithdraw.WaitingForPayments') }}
        </div>
        <div class="info-box">
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.AccountName') }}</div>
            <div class="content">{{ mainConfig.orderDetail?.cardName }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.cardName">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.BankAccount') }}</div>
            <div class="content underline-text">{{ mainConfig.orderDetail?.cardNo }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.cardNo">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
            <div class="content-text">
              <span><img src="./img/errorMinIcon.png" alt="" /></span
              >{{ $t('DepositWithdraw.NoticeTips_8') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.BankOfDeposit') }}</div>
            <div class="content">{{ mainConfig.orderDetail?.bankName }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.bankName">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.TransferAmount') }}</div>
            <div class="content underline-text">{{ mainConfig.orderDetail?.amount }}</div>
            <div
              class="copy-btn"
              v-if="mainConfig.orderDetail?.amount"
              v-clipboard="mainConfig.orderDetail?.amount.toString()"
            >
              {{ $t('DepositWithdraw.Copy') }}
            </div>
            <div class="content-text">
              <span><img src="./img/errorMinIcon.png" alt="" /></span>
              {{ $t('DepositWithdraw.NoticeTips_9') }}
            </div>
          </div>
          <div class="info-row" v-if="mainConfig.orderDetail?.memo">
            <div class="label">
              {{ $t('DepositWithdraw.Postscript') }}/{{ $t('DepositWithdraw.Remark') }}
            </div>
            <div class="content">{{ mainConfig.orderDetail?.memo }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.memo">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="virtual-detail-container"
        v-if="mainConfig.orderDetail?.channelTypeCode == 'USDT'"
      >
        <div class="sub-title">
          <div class="sub-title-bar"></div>
          {{ $t('DepositWithdraw.WaitingForPayments') }}
        </div>
        <div class="virtual-detail-container-box">
          <div class="virtual-detail-container-box-top">
            <div class="virtual-detail-container-box-top-title">
              <span class="span">{{ mainConfig.orderDetail?.usdtNum }}</span>
              <span>USDT</span>
            </div>
            <div class="virtual-detail-container-box-top-text">
              <span>{{ $t('DepositWithdraw.ActualArrival') }}:</span>
              <span class="span">
                <CurrencyUnit />{{
                  toFormatNumber(mainConfig.orderDetail?.amount + mainConfig.orderDetail?.addBonus)
                }}</span
              >
            </div>
            <div class="rate-text">
              ({{ $t('DepositWithdraw.ReferenceExchangeRate') }}：1USDT= {{ Currency
              }}{{ mainConfig.orderDetail?.rate }})
            </div>
          </div>
          <!-- <div class="virtual-detail-container-box-item">
            <div class="virtual-detail-container-box-item-left">钱包协议</div>
            <div class="virtual-detail-container-box-item-right">ERC20</div>
          </div>
          <div class="virtual-detail-container-box-item">
            <div class="virtual-detail-container-box-item-left">钱包地址</div>
            <div class="virtual-detail-container-box-item-right">
              <div>0x45ca7b1896eacb1eb8f93c618a942c3df4f85279</div>
              <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.channelTypeName">复制</div>
            </div>
          </div> -->
          <div class="virtual-detail-container-box-footer">
            <img class="img" src="./img/errorMaxIcon.png" />
            <div v-html="$t('DepositWithdraw.Tips_2', { virtualName })"></div>
          </div>
        </div>
      </div>
      <div class="order-detail-container">
        <div class="sub-title">
          <div class="sub-title-bar"></div>
          {{ $t('DepositWithdraw.OrderMessage') }}
        </div>
        <div class="info-box">
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.RechargeMethod') }}</div>
            <div class="content">{{ mainConfig.orderDetail?.channelTypeName }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.channelTypeName">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.ExtraAmount') }}</div>
            <div class="content" style="color: var(--unnamed, #ff9000)">
              {{ toFormatNumber(Number(mainConfig.orderDetail?.addBonus)) }}
            </div>
            <div
              class="copy-btn"
              v-if="mainConfig.orderDetail?.addBonus"
              v-clipboard="mainConfig.orderDetail?.addBonus.toString()"
            >
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.OrderNumber') }}</div>
            <div class="content">{{ mainConfig.orderDetail?.orderNo }}</div>
            <div class="copy-btn" v-clipboard="mainConfig.orderDetail?.orderNo">
              {{ $t('DepositWithdraw.Copy') }}
            </div>
          </div>
          <div class="info-row">
            <div class="label">{{ $t('DepositWithdraw.RechargeTime') }}</div>
            <div class="content">{{ mainConfig.orderDetail?.createTime }}</div>
          </div>
        </div>
      </div>
      <div class="agreement-container" v-if="dpPendingContent">
        <div class="sub-title">
          <div class="sub-title-bar"></div>
          {{ $t('DepositWithdraw.OrderMessage') }}
        </div>
        <p v-html="Base64.decode(dpPendingContent)"></p>
      </div>
    </div>
    <UploadCertificate
      :isShowUpload="isShowUpload"
      :orderNo="mainConfig.orderDetail?.orderNo"
      @close="changeShowUpload"
    />
    <!-- 撤销充值订单弹窗 -->
    <OrderPopup :orderNo="mainConfig.orderDetail?.orderNo"></OrderPopup>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useSetpTime } from '@/hooks/day.js'
import { getOrderText, getCancelOrder } from '@/api/recharge.js'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import vClipboard from '@/directives/clipboard'
import OrderPopup from './components/OrderPopup.vue'
import { toFormatNumber } from '@/utils'
import { Base64 } from 'js-base64'
import eventBus from '@/utils/eventBus'
// import { getOrderInfo } from '@/utils/cache'
import useCurrency from '@/hooks/useCurrency'
import { useOpenNewWindow } from '@/hooks/useOpenNewWindow'
import { computed, nextTick, watch } from 'vue'
const { Currency } = useCurrency()
const { closeNewWindow } = useOpenNewWindow()
const mainConfig = useChargeAndWithdrawal()
// 重要提醒消息
const dpPendingContent = ref('')

// 进度条高亮显示
const active = ref(1)
// 顶部步骤条文字
const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('DepositWithdraw.SubmitOrder')
  },
  {
    id: 2,
    name: i18n.global.t('DepositWithdraw.Payment')
  },
  {
    id: 3,
    name: i18n.global.t('DepositWithdraw.SuccessfullyReceived')
  }
])
// 定义顶部状态 判断是否为银行卡
const onComputedStepListData = computed(() => {
  if (
    mainConfig.orderDetail?.channelTypeCode == 'BANK' ||
    mainConfig.orderDetail?.channelTypeCode == 'C2C_BANK' ||
    mainConfig.orderDetail?.channelTypeCode == 'VNCard' ||
    mainConfig.orderDetail?.channelTypeCode == 'VNBank'
  ) {
    stepListData.forEach((item, index) => {
      if (item.id == 1) {
        item.name = i18n.global.t('DepositWithdraw.SubmitOrder')
      }
      if (item.id == 2) {
        item.name = i18n.global.t('DepositWithdraw.Payanduploadvoucher')
      }
      if (item.id == 3) {
        item.name = i18n.global.t('DepositWithdraw.WaitingForPayment')
      }
    })
    return stepListData
  }
  return stepListData
})

// 轮询定时器ID
let intervalId = null
const checkPaymentStatus = async () => {
  // 调用后端接口查询订单支付状态
  try {
    await mainConfig.getOrderStatus(mainConfig.orderDetail?.orderNo)
    if (mainConfig.orderStatus) {
      if (
        (mainConfig.orderDetail?.channelTypeCode == 'BANK' ||
          mainConfig.orderDetail?.channelTypeCode == 'C2C_BANK' ||
          mainConfig.orderDetail?.channelTypeCode == 'VNCard' ||
          mainConfig.orderDetail?.channelTypeCode == 'VNBank') &&
        mainConfig.orderDetail?.receiptUploaded == 1
      ) {
        remainTime.value = 900
      } else {
        remainTime.value = useSetpTime(
          mainConfig.orderStatus.createTime,
          mainConfig.orderStatus.waitPaymentTime,
          mainConfig.orderStatus.currentTime
        )
      }

      if (!mainConfig.timerType) {
        // 订单支付成功，停止轮询
        stopPolling()
        // 关闭订单
        countdownFinished()
        eventBus.emit('updateBalnce', '1')
      }
    }
  } catch (err) {}
}

// 停止轮询定时器
const stopPolling = () => {
  clearInterval(intervalId)
  intervalId = null
}
// 开始定时器
const startPolling = () => {
  checkPaymentStatus() // 立即查询一次订单状态
  intervalId = setInterval(checkPaymentStatus, 5000) // 每隔 5 秒查询一次订单状态
}
// 标记定时器是否已经启动
let timerStarted = false

// 上传凭证开关
const isShowUpload = ref(false)
eventBus.on('isShowUpload', () => {
  isShowUpload.value = true
})
onUnmounted(() => {
  eventBus.off('isShowUpload')
})
// 上传凭证开关返回信息
const changeShowUpload = () => {
  isShowUpload.value = false
}

const getText = (id) => {
  // 说明文字信息
  getOrderText(id).then((res) => {
    if (res.data.dpPendingContent) {
      dpPendingContent.value = res.data.dpPendingContent
    }
  })
}

// 是否正在倒计时
const isCounting = ref(true)
// 计算剩余时间
let timer = null
const remainTime = ref(900) //单位秒的剩余时间
// 计算倒计时显示的值，将秒格式化为分钟和秒的字符串形式
const formattedTime = computed(() => {
  const minutes = Math.floor(remainTime.value / 60)
  const seconds = remainTime.value % 60
  return `${minutes}${i18n.global.t('DepositWithdraw.Minute')}${seconds}${i18n.global.t(
    'DepositWithdraw.Second'
  )}`
})

// 虚拟币通道同步的TRC20
const virtualName = computed(() => {
  return mainConfig.orderDetail?.protocol
})
// 开始倒计时
const startCountdown = () => {
  timer = setTimeout(() => {
    if (!mainConfig.orderDetail?.receiptUploaded || mainConfig.orderDetail?.receiptUploaded == 0) {
      remainTime.value -= 1
      // 倒计时结束时执行回调函数
      if (remainTime.value === 0) {
        isCounting.value = false
        clearTimeout(timer)
      } else {
        startCountdown() // 继续倒计时
      }
    } else {
      active.value = 2
    }
  }, 1000)
}

onMounted(() => {
  // 定时器开始轮询查订单
  if (!timerStarted) {
    // startTimer() // 只在第一次页面进入时启动定时器
    startPolling()
    timerStarted = true
  }
  nextTick(() => {
    getText(mainConfig.orderDetail?.channelTypeId)
  })
  startCountdown()
  eventBus.emit('updateBalnce', '1')
})
// 销毁到0的定时器
onBeforeUnmount(() => {
  clearTimeout(timer)
  stopPolling()
})

watch(remainTime, (newVal) => {
  if (newVal <= 0) {
    isCounting.value = false
    clearTimeout(timer)
    cancelOrder()
  }
})

// 倒计时结束后的回调方法
const countdownFinished = () => {
  const params = {
    isOpen: false
  }
  eventBus.emit('showCharge', params)
}

// 撤销弹窗
const onClickRevocationPopup = () => {
  eventBus.emit('isRevocationShow', true)
}

// 判断如果是已上传订单照片，让进度条变成2高亮
const isupLoad = ref(mainConfig.isupLoad)
watch(isupLoad, (newValue) => {
  if (newValue == 1) {
    active.value = 2
  }
})
// 撤销订单
const cancelOrder = () => {
  getCancelOrder({ orderNo: mainConfig.orderDetail?.orderNo }).then(() => {
    const params = {
      isOpen: false
    }
    eventBus.emit('showCharge', params)
    closeNewWindow()
    eventBus.emit('updateBalnce', '1')
  })
}
</script>

<style lang="scss" scoped>
.sub-title {
  height: 18px;
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  align-items: center;
  text-justify: center;
  font-size: 16px;
  font-weight: 500;
  .sub-title-bar {
    display: inline-block;
    width: 4px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 0px 4px 4px 0px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
}
.info-box {
  display: flex;
  flex-direction: column;
  gap: 28px;
  .info-row {
    position: relative;
    display: flex;
    gap: 4px;
    font-size: 14px;
    line-height: 16px;
    .label {
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .content {
      margin-left: auto;
      margin-right: 5px;
      color: var(--100, #fff);
    }
    .copy-btn {
      color: var(--unnamed, #409eff);
    }
    .content-text {
      position: absolute;
      display: flex;
      align-items: center;
      right: 32px;
      bottom: -15px;
      color: var(--1, #f53f3f);

      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
      span {
        img {
          margin-right: 5px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
.underline-text {
  text-decoration-line: underline;
}
.chargeInfo-container {
  color: var(--100, #fff);

  .title {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    border-bottom: 4px solid #1d223e;
    .title-text {
      font-size: 18px;
      line-height: 16px;
      white-space: nowrap;
    }
    .cancel-btn {
      margin-left: 195px;
      margin-right: 15px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 16px;
      line-height: 16px;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  .main-box {
    padding: 0px 30px 30px 30px;
    .progress-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 228px;
      border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      .progress-text-row {
        display: flex;
        justify-content: space-between;
        width: 534px;
        height: 12px;
        margin-top: 24px;

        .progress-text {
          color: var(--100, #fff);
          font-size: 12px;
          line-height: 12px;
        }
      }
      .progress-line-row {
        display: flex;
        justify-content: space-between;
        width: 490px;
        margin-top: 18px;
        border-bottom: 1px dashed green;
        .dot {
          position: relative;
          top: 3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--unnamed, #67c23a);
          .dot-img {
            width: 20px;
            height: 20px;
            position: relative;
            top: -7px;
            left: -5px;
          }
        }
      }
      .counter-box {
        margin-top: 24px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        text-align: center;
        font-size: 15px;
        line-height: 20px;
        span {
          color: var(--unnamed, #e93d3d);
        }
      }
      .money-text {
        margin-top: 8px;
        font-size: 32px;
        font-weight: 700;
        line-height: 32px;
      }
      .money-texts {
        margin-top: 25px;
      }
      .reminder {
        display: flex;
        width: 400px;
        gap: 10px;
        padding: 10px;
        margin-top: 19px;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background: #1d223e;
        color: var(--unnamed, #e93d3d);
        font-size: 12px;
        font-weight: 400;
        .img {
          width: 18px;
          height: 18px;
        }
      }
    }
    .payment-detail-container {
      height: 272px;
      padding-top: 24px;
      border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
    }
    .order-detail-container {
      height: 228px;
      padding-top: 24px;
      border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
    }
    .agreement-container {
      margin-top: 24px;
      p {
        color: var(--60, rgba(255, 255, 255, 0.6));
        text-align: justify;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
    .virtual-detail-container {
      margin-top: 20px;
      .virtual-detail-container-box {
        width: 660px;
        // height: 264px;
        border-radius: 6px;
        background: var(--unnamed, #1d223c);
        overflow: hidden;
        .virtual-detail-container-box-top {
          margin: 30px 0 20px 0;
          text-align: center;
          .virtual-detail-container-box-top-title {
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            .span {
              font-size: 36px;
              font-style: normal;
              font-weight: 700;
              margin-right: 8px;
            }
          }
          .virtual-detail-container-box-top-text {
            color: #fff;
            font-size: 16px;
            font-weight: 400;
            margin: 16px 0 10px 0;
            .span {
              color: var(--unnamed, #e93d3d);
              font-size: 16px;
              font-weight: 700;
              margin-left: 8px;
            }
          }
          .rate-text {
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
          }
        }
        .virtual-detail-container-box-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 0;
          color: var(--60, rgba(255, 255, 255, 0.6));
          font-size: 14px;
          .virtual-detail-container-box-item-left {
            margin-left: 20px;
          }
          .virtual-detail-container-box-item-right {
            margin-right: 20px;
            display: flex;
            align-items: center;
            .copy-btn {
              color: var(--unnamed, #409eff);
              margin-left: 5px;
              font-size: 14px;
            }
          }
        }
        .virtual-detail-container-box-footer {
          display: flex;
          width: 406px;
          height: 28px;
          justify-content: center;
          align-items: center;
          color: #f53f3f;
          font-size: 14px;
          border-radius: 6px;
          background: #232949;
          margin: 20px auto 30px;
          .img {
            width: 12px;
            height: 12px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
