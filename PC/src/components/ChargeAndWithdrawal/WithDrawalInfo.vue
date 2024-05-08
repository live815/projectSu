<template>
  <div class="withdrawal-money">
    <div class="withdrawal-information">
      <div>{{ $t('DepositWithdraw.WithdrawalInformation') }}</div>
    </div>
    <div class="border-four"></div>
    <div class="withdrawal-subject">
      <div class="progress-container">
        <div class="progress-text-row">
          <div class="progress-text" v-for="item in onComputedStepListData" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="progress-line-row">
          <div class="dot">
            <img class="dot-img" v-if="withdrawStore.setpActive == 0" src="./img/time.png" />
          </div>
          <div class="dot">
            <img class="dot-img" v-if="withdrawStore.setpActive == 1" src="./img/time.png" />
          </div>
          <div class="dot">
            <img class="dot-img" v-if="withdrawStore.setpActive == 2" src="./img/time.png" />
          </div>
          <div class="dot" v-if="onComputedStepListData.length > 3">
            <img class="dot-img" v-if="withdrawStore.setpActive == 3" src="./img/time.png" />
          </div>
        </div>
        <div class="withdrawal-details">
          <div class="withdrawal-amount">{{ $t('DepositWithdraw.WithdrawalAmount') }}</div>
          <div
            class="money-text"
            :class="{ 'marign-style': withdrawStore.withdrawDetail?.wdWayType == '3' }"
          >
            <CurrencyUnit /> {{ withdrawStore.withdrawDetail?.amount }}
          </div>
          <template
            v-if="
              withdrawStore.withdrawDetail?.wdWayType == '2' ||
              withdrawStore.withdrawDetail?.wdWayType == '3'
            "
          >
            <template v-if="withdrawStore.withdrawDetail?.wdWayType == '2'">
              <div class="header-top-virtual-text">
                <span>{{ $t('DepositWithdraw.Actualarrival') }}： </span>
                <span style="color: #fff">{{ $t('DepositWithdraw.About') }}</span>
                <span class="span">{{ toFormatNumber(onComputedUsdt) }}</span>
                <span style="color: #fff">USDT</span>
              </div>
              <div class="header-top-virtual-title">
                （{{ $t('DepositWithdraw.ReferenceExchangeRate') }}：1USDT={{ rate }} {{ Currency }}
              </div>
              <div class="reminder" v-if="withdrawStore.setpActive == 1">
                <!-- 该数字仅供参考，<span style="color: var(--2, #ff5000);">以实际到账为准</span>。（三方交易所可能会收取手续费，以及汇率浮动） -->
                <div v-html="$t('DepositWithdraw.Tips_3')"></div>
              </div>
            </template>
            <template v-if="withdrawStore.withdrawDetail?.wdWayType == '3'">
              <div class="reminder" v-if="withdrawStore.setpActive == 1">
                <!-- 该数字仅供参考，<span style="color: var(--2, #ff5000);">以实际到账为准</span>。（三方交易所可能会收取手续费，以及汇率浮动） -->
                <div v-html="$t('DepositWithdraw.Tips_3')"></div>
              </div>
            </template>
          </template>
          <template
            v-if="
              withdrawStore.withdrawDetail?.wdWayType == '0' ||
              withdrawStore.withdrawDetail?.wdWayType == '1'
            "
          >
            <div class="actual-arrival">
              {{ $t('DepositWithdraw.ActualArrival') }}：
              <span> <CurrencyUnit />{{ toFormatNumber(onComputedTotal) }} </span>
            </div>
            <div class="reminder" v-if="withdrawStore.setpActive == 0">
              {{ $t('DepositWithdraw.WithdrawalTips_24') }}...
            </div>
            <div class="reminder" v-if="withdrawStore.setpActive == 1">
              {{ $t('DepositWithdraw.Tips_4') }}
            </div>
            <div class="reminder" v-if="withdrawStore.setpActive == 2">
              <!-- 请核实您的收款账户，确认资金到账无误，再点击下方<span  style="color: var(--2, #ff5000);">【确认收款】</span>按钮 -->
              <p v-html="$t('DepositWithdraw.Tips_5')"></p>
            </div>
          </template>
        </div>
      </div>
      <div class="order-information">
        <div class="order-header">
          <div><img src="./img/Rectangle22464.png" /></div>
          <div>{{ $t('DepositWithdraw.OrderInformation') }}</div>
        </div>
        <div class="message-display">
          <div>{{ $t('DepositWithdraw.WithdrawalType') }}</div>
          <div>{{ withdrawStore.withdrawDetail?.wdWayTypeName }}</div>
        </div>
        <div class="message-display">
          <div>{{ $t('DepositWithdraw.WithdrawalMthod') }}</div>
          <div>{{ withdrawStore.withdrawDetail?.wdTypeName }}</div>
        </div>
        <template
          v-if="
            withdrawStore.withdrawDetail?.wdWayType == '2' ||
            withdrawStore.withdrawDetail?.wdWayType == '3'
          "
        >
          <div class="message-display">
            <div>{{ $t('DepositWithdraw.TransactionAgreement') }}</div>
            <div>
              {{ withdrawStore.withdrawDetail?.tradeProtocol }}
            </div>
          </div>
          <div
            class="message-display"
            v-if="
              withdrawStore.withdrawDetail?.tradeAddr &&
              typeof withdrawStore.withdrawDetail?.tradeAddr === 'string'
            "
          >
            <div>{{ $t('DepositWithdraw.Withdrawaladdress') }}</div>
            <div>
              {{ withdrawStore.withdrawDetail?.tradeAddr.substr(0, 6) }}****{{
                withdrawStore.withdrawDetail?.tradeAddr.substr(-6)
              }}
            </div>
          </div>
        </template>
        <template
          v-if="
            withdrawStore.withdrawDetail?.wdWayType == '0' ||
            withdrawStore.withdrawDetail?.wdWayType == '1'
          "
        >
          <div class="message-display">
            <div>{{ $t('DepositWithdraw.CashCardNumber') }}</div>
            <div v-if="withdrawStore.withdrawDetail?.cardNo">
              {{ withdrawStore.withdrawDetail?.bankName }}({{
                withdrawStore.withdrawDetail?.cardNo.substr(-4)
              }})
            </div>
          </div>
        </template>

        <div class="message-display">
          <div>{{ $t('DepositWithdraw.AppointmentType') }}</div>
          <div v-if="withdrawStore.withdrawDetail?.appmentHours > 0">
            0~{{ withdrawStore.withdrawDetail?.appmentHours }}{{ $t('DepositWithdraw.Hour') }}
          </div>
          <div v-else>{{ $t('DepositWithdraw.Immediate') }}</div>
        </div>
        <div class="message-display">
          <div>{{ $t('DepositWithdraw.ExtraAmount') }}</div>
          <div class="orange">
            {{ toFormatNumber(Number(withdrawStore.withdrawDetail?.addBonus)) }}
          </div>
        </div>
        <div class="message-display">
          <div>{{ $t('DepositWithdraw.HandlingFee') }}</div>
          <div class="orange">
            {{
              Number(withdrawStore.withdrawDetail?.wdFee) > 0
                ? toFormatNumber(Number(withdrawStore.withdrawDetail?.wdFee))
                : 0
            }}
          </div>
        </div>
        <div
          class="message-display"
          v-if="withdrawStore.withdrawDetail?.rate || withdrawStore.withdrawDetail?.splitFlag != 1"
        >
          <div>{{ $t('DepositWithdraw.OrderNumber') }}</div>
          <div>
            {{ withdrawStore.withdrawDetail?.orderNo }}
            <span v-clipboard="withdrawStore.withdrawDetail?.orderNo">{{
              $t('DepositWithdraw.Copy')
            }}</span>
          </div>
        </div>
        <div class="message-display">
          <div>{{ $t('DepositWithdraw.WithdrawalTime') }}</div>
          <div>{{ withdrawStore.withdrawDetail?.createTime }}</div>
        </div>
      </div>
      <div class="footer-order" v-if="withdrawStore.withdrawDetail?.splitFlag == 1">
        <div class="footer-order-top">
          <img class="img" src="./img/errorMinIcon.png" />
          <div
            class="footer-order-top-title"
            v-html="
              $t('DepositWithdraw.tip54', {
                splitCount: withdrawStore.withdrawDetail?.splitCount
              })
            "
          ></div>
        </div>
        <template v-if="withdrawStore.withdrawDetail.subOrderList">
          <div
            class="footer-order-item"
            v-for="(items, index) in data.onComputedSubOrderList"
            :key="index"
          >
            <div class="footer-order-item-one">
              <div class="footer-order-item-one-left">
                <span>{{ $t('DepositWithdraw.tip55') }}({{ index }})</span>
                <span>{{ items.subOrderAmount }}</span>
                <span v-if="items.transOrderStatus == 0">( {{ $t('DepositWithdraw.tip56') }})</span>
                <span v-if="items.transOrderStatus == 1">( {{ $t('DepositWithdraw.tip57') }})</span>
                <span style="color: #e93d3d" v-if="items.transOrderStatus == 2"
                  >( {{ $t('DepositWithdraw.tip58') }} )</span
                >
              </div>
              <div
                class="footer-order-item-one-right"
                v-if="items.transOrderStatus == 0 && items.orderStatus == 4"
                @click="onClickConfirmOrder(items)"
              >
                {{ $t('DepositWithdraw.tip59') }}
              </div>
              <div
                class="footer-order-item-one-right footer-order-item-one-right-color"
                v-if="items.transOrderStatus == 1"
              >
                {{ $t('DepositWithdraw.tip60') }}
              </div>
              <div
                class="footer-order-item-one-right footer-order-item-one-right-color"
                v-if="items.transOrderStatus == 2"
              >
                {{ $t('DepositWithdraw.tip58') }}
              </div>
            </div>
            <div class="footer-order-item-two">
              <div class="footer-order-item-two-left">{{ $t('DepositWithdraw.OrderNumber') }}</div>
              <div class="footer-order-item-two-right">
                <span>{{ items.subOrderNo }}</span>
                <span v-clipboard="items.subOrderNo">{{ $t('DepositWithdraw.Copy') }}</span>
              </div>
            </div>
            <div class="footer-order-item-two">
              <div class="footer-order-item-two-left">
                {{ $t('DepositWithdraw.WithdrawalTime') }}
              </div>
              <div class="footer-order-item-two-right">{{ items.createTime }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <CapitalPopup></CapitalPopup>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { toFormatNumber } from '@/utils'
import { useWithdrawStore } from '@/stores/withdraw'
import { getVirtualGetRate } from '@/api/recharge'
import { getWithdrawInfo } from '@/utils/cache'
import vClipboard from '@/directives/clipboard'
import CapitalPopup from './components/CapitalPopup.vue'
import { computed, watchEffect } from 'vue'
// import { useGlobalTimer } from '@/hooks/useGlobalTimer'
const withdrawStore = useWithdrawStore()
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()

const rate = ref(null)
// 获取币汇率
const getCoinList = () => {
  getVirtualGetRate('2', Currency.value).then((res) => {
    if (res.data) {
      rate.value = res.data.rate
    }
  })
}

// USDT实际到账到账
const onComputedUsdt = computed(() => {
  return (withdrawStore.withdrawDetail?.amount - withdrawStore.withdrawDetail?.wdFee) / rate.value
})

// 顶部步骤条文字
const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('DepositWithdraw.SubmitOrder')
  },
  {
    id: 2,
    name: i18n.global.t('DepositWithdraw.WaitingForPayments')
  },
  {
    id: 3,
    name: i18n.global.t('DepositWithdraw.SuccessfullyReceived')
  }
])
// 定义顶部状态 判断是否为银行卡
const onComputedStepListData = computed(() => {
  if (
    withdrawStore.withdrawDetail.wdWayType == '0' ||
    withdrawStore.withdrawDetail.wdWayType == '1'
  ) {
    // 创建一个新的数组副本
    let updatedStepListData = stepListData.map((item) => ({ ...item }))
    updatedStepListData.forEach((item, index) => {
      if (index == 2) {
        item.name = i18n.global.t('DepositWithdraw.PendingConfirmationOfArrival')
      }
    })
    const newItem = {
      id: 4,
      name: i18n.global.t('DepositWithdraw.SuccessfullyReceived')
    }
    updatedStepListData.push(newItem)
    return updatedStepListData
  }
  return stepListData
})

// 实际到账共计
const onComputedTotal = computed(() => {
  return Number(withdrawStore.withdrawDetail?.amount) - Number(withdrawStore.withdrawDetail?.wdFee)
})

// 提现拆单子单列表
const onComputedSubOrderList = computed(() => {
  const bankWithdrawInfo = withdrawStore.withdrawDetail
  const subOrderList = bankWithdrawInfo ? bankWithdrawInfo.subOrderList : null
  let updatedSubOrderList = subOrderList ? subOrderList.map((item) => ({ ...item })) : []
  return updatedSubOrderList
})

// 从新定义一个子菜单列表
const data = reactive({
  onComputedSubOrderList: []
})

// 点击子菜单确认按钮
const onClickConfirmOrder = (items) => {
  eventBus.emit('isCapitalPopup', items.subOrderNo)
}

// 标记定时器是否已经启动
let timerStarted = false
// 轮询定时器ID
let intervalId = null
const stopPolling = () => {
  clearInterval(intervalId)
  intervalId = null
}
const startPolling = () => {
  getStatus() // 立即查询一次订单状态
  intervalId = setInterval(getStatus, 10000) // 每隔 10 秒查询一次订单状态
}

// 获取订单状态
const getStatus = () => {
  withdrawStore.getWithdrawStatus(withdrawStore.withdrawDetail?.orderNo) // 调用接口
}

// 使用全局定时器轮询
// const { startTimer, stopTimer } = useGlobalTimer(pageId, getStatus, 5000)

onMounted(() => {
  if (!withdrawStore.withdrawDetail) {
    withdrawStore.withdrawDetail = getWithdrawInfo()
  }
  if (!timerStarted) {
    // 只在第一次页面进入时启动定时器
    startPolling()
    timerStarted = true
  }
  // 将 onComputedSubOrderList 的响应式对象存储到 data 中
  nextTick(() => {
    data.onComputedSubOrderList = onComputedSubOrderList.value
  })
  getCoinList()
  eventBus.emit('updateBalnce', '2')
})

// 在组件销毁前停止轮询
onBeforeUnmount(() => {
  stopPolling()
})

watchEffect(() => {
  if (withdrawStore.subOrderList.length > 0) {
    for (let i = 0; i < data.onComputedSubOrderList.length; i++) {
      const subOrder = data.onComputedSubOrderList[i]
      const matchOrder = withdrawStore.subOrderList.find(
        (order) => order.orderNo === subOrder.subOrderNo
      )
      if (matchOrder) {
        subOrder.orderStatus = matchOrder.orderStatus
        subOrder.transOrderStatus = matchOrder.transOrderStatus
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.withdrawal-money {
  overflow: auto;
  min-height: 880px;
  .withdrawal-information {
    color: #fff;

    font-size: 18px;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    line-height: 60px; /* 88.889% */
  }
  .border-four {
    width: 720px;
    height: 4px;
    flex-shrink: 0;
    background: #1d223e;
  }
  .withdrawal-subject {
    width: 660px;
    margin: 0 auto;

    .progress-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: auto;
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
      .withdrawal-details {
        margin-top: 34px;
        .withdrawal-amount {
          color: var(--60, rgba(255, 255, 255, 0.6));
          text-align: center;

          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 133.333% */
        }
        .money-text {
          margin-top: 8px;
          color: var(--100, #fff);
          text-align: center;
          font-size: 32px;
          font-style: normal;
          font-weight: 700;
          line-height: 32px; /* 100% */
        }
        .marign-style {
          margin-bottom: 20px;
        }
        .header-top-virtual-text {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 15px 0 8px 0;
          > :first-child {
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 14px;
            font-weight: 400;
            margin-right: 4px;
          }
          .span {
            color: var(--1, #f53f3f);
            font-size: 14px;
            font-weight: 700;
          }
          > :last-child {
            color: #111;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .header-top-virtual-title {
          text-align: center;
          margin-bottom: 20px;
        }
        .actual-arrival {
          margin-top: 12px;
          color: var(--60, rgba(255, 255, 255, 0.6));
          text-align: center;

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 114.286% */
          span {
            color: var(--unnamed, #e93d3d);
          }
        }
        .reminder {
          display: flex;
          gap: 10px;
          padding: 10px;
          margin: 20px 0;
          justify-content: center;
          align-items: center;
          border-radius: 6px;
          background: #1d223e;
          color: var(--80, rgba(255, 255, 255, 0.8));
          font-size: 12px;
          font-weight: 400;
          span {
            color: var(--2, #ff5000);
          }
        }
      }
    }
    .order-information {
      padding-bottom: 25px;
      border-bottom: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      .order-header {
        display: flex;
        margin-top: 25px;
        gap: 8px;
        div:nth-child(2) {
          color: var(--100, #fff);

          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px; /* 100% */
        }
      }
      .message-display {
        display: flex;
        div {
          margin-top: 20px;
        }
        div:nth-child(1) {
          color: var(--60, rgba(255, 255, 255, 0.6));

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 114.286% */
        }
        div:nth-child(2) {
          color: var(--100, #fff);
          text-align: right;

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 114.286% */
          margin-left: auto;
        }
        span {
          color: var(--unnamed, #409eff);
          cursor: pointer;
        }
        .orange {
          color: var(--unnamed, #ff9000) !important;
        }
      }
    }
    .footer-order {
      // width: 100%;
      margin-top: 10px;
      .footer-order-top {
        min-width: 316px;
        display: flex;
        padding: 8px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        background: #1d223e;
        margin-bottom: 10px;
        .img {
          width: 12px;
          height: 12px;
        }
        .footer-order-top-title {
          color: #999;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px; /* 100% */
          span {
            color: var(-----, #e93d3d);
          }
        }
      }
      .footer-order-item {
        display: flex;
        // height: 80px;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid var(-----20, rgba(255, 255, 255, 0.2));
        .footer-order-item-one,
        .footer-order-item-two {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 0;
        }
        .footer-order-item-one {
          .footer-order-item-one-left {
            span {
              color: #fff;
              font-size: 14px;
              font-weight: 500;
              margin: 0 10px;
            }
            span:first-child {
              margin-left: 0;
            }
            span:last-child {
              color: var(---1, #00b42a);
              font-size: 12px;
              font-weight: 400;
            }
          }
          .footer-order-item-one-right {
            min-width: 118px;
            height: 36px;
            flex-shrink: 0;
            color: #fff;
            text-align: center;
            font-size: 15px;
            line-height: 36px; /* 133.333% */
            border-radius: 46px;
            background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          }
          .footer-order-item-one-right-color {
            background: none;
            color: var(-----60, rgba(255, 255, 255, 0.6));
          }
        }
        .footer-order-item-two {
          color: var(-----60, rgba(255, 255, 255, 0.6));
          font-size: 14px;
          .footer-order-item-two-right {
            color: var(-----100, #fff);
            font-size: 14px;
            span:last-child {
              color: var(-----, #409eff);
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
        .footer-order-item-two:last-child {
          margin-bottom: 20px;
        }
      }
      .footer-order-item:last-child {
        border: none;
      }
    }
  }
}
</style>
