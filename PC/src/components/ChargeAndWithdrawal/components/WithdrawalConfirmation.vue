<template>
  <CustomizeDialog
    :dialogShow="withdrawShow"
    :width="480"
    :title="$t('DepositWithdraw.WithdrawalConfirmation')"
    v-if="withdrawShow"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="popup-text">*{{ $t('DepositWithdraw.WithdrawalConfirmationTips_1') }}</div>
    <div class="popup-withdrawal">
      <div class="title">{{ $t('DepositWithdraw.WithdrawalAmount') }}</div>
      <div class="text"><CurrencyUnit />{{ withdrawStore.bankCardInfo?.amount }}</div>
      <div
        class="text-rate"
        v-if="withdrawStore.bankCardInfo?.addrId && withdrawStore.bankCardInfo?.rate"
      >
        {{ $t('DepositWithdraw.Currentreferenceexchangerate')
        }}{{ withdrawStore.bankCardInfo?.rate }}
      </div>
    </div>
    <div class="popup-handling" v-if="isHandlingShow">
      <template
        v-if="
          withdrawStore.bankCardInfo.wdWayType == '2' || withdrawStore.bankCardInfo.wdWayType == '3'
        "
      >
        <template v-if="withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes">
          <template v-if="withdrawStore.bankCardInfo.wdWayType == '2'">
            <div class="popup-handling-left">
              <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
              <div class="text">{{ toFormatNumber(Number(onUsdt)) }}<span>USDT</span></div>
            </div>
            <div class="popup-handling-right">
              <div class="title">{{ $t('DepositWithdraw.Withdrawalfee') }}</div>
              <div class="text">0</div>
            </div>
          </template>
          <template v-if="withdrawStore.bankCardInfo.wdWayType == '3'">
            <div class="popup-handling-left">
              <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
              <div class="text">
                {{ toFormatNumber(Number(withdrawStore.bankCardInfo?.amount))
                }}<span>{{ $t('DepositWithdraw.EbPay') }}</span>
              </div>
            </div>
            <div class="popup-handling-right">
              <div class="title">{{ $t('DepositWithdraw.Withdrawalfee') }}</div>
              <div class="text">0</div>
            </div></template
          >
        </template>
        <template v-else>
          <div class="popup-handling-left" v-if="withdrawStore.bankCardInfo.wdWayType == '2'">
            <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
            <div class="text">{{ toFormatNumber(Number(onComputedUsdt)) }}<span>USDT</span></div>
          </div>
          <div class="popup-handling-left" v-if="withdrawStore.bankCardInfo.wdWayType == '3'">
            <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
            <div class="text">
              {{
                toFormatNumber(
                  Number(withdrawStore.bankCardInfo?.amount - onComputedLargeWithdrawRatio)
                )
              }}<span>{{ $t('DepositWithdraw.EbPay') }}</span>
            </div>
          </div>
          <div class="popup-handling-right">
            <div class="title">{{ $t('DepositWithdraw.Withdrawalfee') }}</div>
            <div class="text">{{ toFormatNumber(Number(onComputedLargeWithdrawRatio)) }}</div>
          </div>
        </template>
      </template>

      <template v-else>
        <template v-if="withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes">
          <div class="popup-handling-left">
            <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
            <div class="text">
              {{ toFormatNumber(Number(withdrawStore.bankCardInfo?.amount)) }}
            </div>
          </div>
          <div class="popup-handling-right">
            <div class="title">{{ $t('DepositWithdraw.Withdrawalfee') }}</div>
            <div class="text">0</div>
          </div>
        </template>
        <template v-else>
          <div class="popup-handling-left">
            <div class="title">{{ $t('DepositWithdraw.Actualarrival') }}</div>
            <div class="text">
              {{
                toFormatNumber(
                  Number(withdrawStore.bankCardInfo?.amount - onComputedLargeWithdrawRatio)
                )
              }}
            </div>
          </div>
          <div class="popup-handling-right">
            <div class="title">{{ $t('DepositWithdraw.Withdrawalfee') }}</div>
            <div class="text">{{ toFormatNumber(Number(onComputedLargeWithdrawRatio)) }}</div>
          </div>
        </template>
      </template>
    </div>
    <div class="popup-limit">
      {{ $t('DepositWithdraw.WithdrawalsRemaining')
      }}<span>{{
        withdrawStore.bankCardInfo?.wdAmountType == 1
          ? withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes
          : withdrawStore.wdChannelTypeList[0]?.normalAvailableWdTimes
      }}</span>
      {{ $t('DepositWithdraw.Orders') }}
    </div>
    <div class="popup-footer">
      <div class="popup-footer-btn" @click="closeBtn">{{ $t('DepositWithdraw.Cancel') }}</div>
      <div class="popup-footer-btn" @click="onClickConfirm">
        {{ $t('DepositWithdraw.WithdrawImmediately') }}
      </div>
    </div>

    <TipsPopup @closeWithdraw="closeWithdraw"></TipsPopup>
    <VirtualPopup></VirtualPopup>
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useWithdrawStore } from '@/stores/withdraw'
import { getWithdrawOrder, getWithdrawUsdtOrder, getWithdrawEbpayOrder } from '@/api/withdraw'
import TipsPopup from './TipsPopup'
import { toFormatNumber } from '@/utils'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal'
import eventBus from '@/utils/eventBus'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
const { deviceId, optClient } = getDeviceInfo()

const mainConfig = useChargeAndWithdrawal()
const withdrawStore = useWithdrawStore()

// 提现弹窗
const withdrawShow = ref(false)

onMounted(() => {
  eventBus.on('withdrawalConfirmationOpen', () => {
    withdrawShow.value = true
  })
})

// 关闭弹窗
const closeBtn = () => {
  withdrawShow.value = false
}

const closeWithdraw = () => {
  closeBtn()
}

// 判断是否有手续费
const isHandlingShow = computed(() => {
  if (withdrawStore.bankCardInfo?.wdAmountType == 1) {
    return true
  }
  return false
})

// 手续费
const onComputedLargeWithdrawRatio = computed(() => {
  return (withdrawStore.bankCardInfo?.largeWithdrawRatio / 100) * withdrawStore.bankCardInfo?.amount
})

// 整体没有手续费的到账
const onUsdt = computed(() => {
  return withdrawStore.bankCardInfo?.amount / withdrawStore.bankCardInfo?.rate
})

// USDT实际到账到账
const onComputedUsdt = computed(() => {
  return (
    (withdrawStore.bankCardInfo?.amount - onComputedLargeWithdrawRatio.value) /
    withdrawStore.bankCardInfo?.rate
  )
})
// 创建一个ref来跟踪按钮是否被禁用
const isSubmitting = ref(false)
// 立即提现
const onClickConfirm = () => {
  if (isSubmitting.value) {
    return
  }
  isSubmitting.value = true
  // 大额提现
  if (withdrawStore.bankCardInfo?.wdAmountType == 1) {
    if (withdrawStore.bankCardInfo?.type == '0' || withdrawStore.bankCardInfo?.type == '1') {
      if (withdrawStore.bankCardInfo?.cardId) {
        const params = {
          amount: withdrawStore.bankCardInfo?.amount,
          cardId: withdrawStore.bankCardInfo?.cardId,
          wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
          wdHours: withdrawStore.bankCardInfo?.wdHours,
          wdWayType: withdrawStore.bankCardInfo?.wdWayType,
          deviceId: deviceId.value,
          optClient: optClient.value
        }
        getWithdrawOrder(params)
          .then((res) => {
            if (res.code == 1006000117) {
              isSubmitting.value = false
              // 流水不够要求打流水
              eventBus.emit('tipsData', res.data)
            } else {
              const data = res.data
              if (data.orderNo) {
                mainConfig.detailType = 2
                // 证明已经提交提现订单
                withdrawStore.isWithdraw = true
                withdrawStore.addwithdrawDetail(res.data)
                withdrawShow.value = false
              }
              isSubmitting.value = false
            }
          })
          .catch(() => {
            isSubmitting.value = false
          })
      }
    } else if (withdrawStore.bankCardInfo?.type == '2') {
      const params = {
        amount: withdrawStore.bankCardInfo?.amount,
        addrId: withdrawStore.bankCardInfo?.addrId,
        wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
        wdHours: withdrawStore.bankCardInfo?.wdHours,
        wdWayType: withdrawStore.bankCardInfo?.wdWayType,
        deviceId: deviceId.value,
        optClient: optClient.value
      }
      getWithdrawUsdtOrder(params)
        .then((res) => {
          if (res.code == 1006000117) {
            isSubmitting.value = false
            // 流水弹窗
            eventBus.emit('tipsData', res.data)
          } else if (res.code == 1002005004) {
            isSubmitting.value = false
            // 虚拟币推荐通道
            eventBus.emit('virtualPopup', res.msg)
          } else {
            const data = res.data
            if (data.orderNo) {
              mainConfig.detailType = 2
              // 证明已经提交提现订单
              withdrawStore.isWithdraw = true
              withdrawStore.addwithdrawDetail(res.data)
              withdrawShow.value = false
            }
            isSubmitting.value = false
          }
        })
        .catch(() => {
          isSubmitting.value = false
        })
    } else if (withdrawStore.bankCardInfo?.type == '3') {
      const params = {
        amount: withdrawStore.bankCardInfo?.amount,
        addrId: withdrawStore.bankCardInfo?.addrId,
        wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
        wdHours: withdrawStore.bankCardInfo?.wdHours,
        wdWayType: withdrawStore.bankCardInfo?.wdWayType,
        deviceId: deviceId.value,
        optClient: optClient.value
      }
      getWithdrawEbpayOrder(params)
        .then((res) => {
          if (res.code == 1006000117) {
            isSubmitting.value = false
            // 流水弹窗
            eventBus.emit('tipsData', res.data)
          } else if (res.code == 1002005004) {
            isSubmitting.value = false
            // 虚拟币推荐通道
            eventBus.emit('virtualPopup', res.msg)
          } else {
            const data = res.data
            if (data.orderNo) {
              mainConfig.detailType = 2
              // 证明已经提交提现订单
              withdrawStore.isWithdraw = true
              withdrawStore.addwithdrawDetail(res.data)
              withdrawShow.value = false
            }
            isSubmitting.value = false
          }
        })
        .catch(() => {
          isSubmitting.value = false
        })
    }
  } else {
    // 小额提现
    if (
      withdrawStore.bankCardInfo?.wdAmountType == 0 &&
      withdrawStore.wdChannelTypeList[0]?.normalAvailableWdTimes > 0
    ) {
      if (withdrawStore.bankCardInfo?.type == '0' || withdrawStore.bankCardInfo?.type == '1') {
        if (withdrawStore.bankCardInfo?.cardId) {
          const params = {
            amount: withdrawStore.bankCardInfo?.amount,
            cardId: withdrawStore.bankCardInfo?.cardId,
            wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
            wdHours: withdrawStore.bankCardInfo?.wdHours,
            wdWayType: withdrawStore.bankCardInfo?.wdWayType,
            deviceId: deviceId.value,
            optClient: optClient.value
          }
          getWithdrawOrder(params)
            .then((res) => {
              if (res.code == 1006000117) {
                isSubmitting.value = false
                // 流水不够要求打流水
                eventBus.emit('tipsData', res.data)
              } else {
                const data = res.data
                if (data.orderNo) {
                  mainConfig.detailType = 2
                  // 证明已经提交提现订单
                  withdrawStore.isWithdraw = true
                  withdrawStore.addwithdrawDetail(res.data)
                  withdrawShow.value = false
                }
                isSubmitting.value = false
              }
            })
            .catch(() => {
              isSubmitting.value = false
            })
        }
      } else if (withdrawStore.bankCardInfo?.type == '2') {
        const params = {
          amount: withdrawStore.bankCardInfo?.amount,
          addrId: withdrawStore.bankCardInfo?.addrId,
          wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
          wdHours: withdrawStore.bankCardInfo?.wdHours,
          wdWayType: withdrawStore.bankCardInfo?.wdWayType,
          deviceId: deviceId.value,
          optClient: optClient.value
        }
        getWithdrawUsdtOrder(params)
          .then((res) => {
            if (res.code == 1006000117) {
              isSubmitting.value = false
              // 流水弹窗
              eventBus.emit('tipsData', res.data)
            } else if (res.code == 1002005004) {
              isSubmitting.value = false
              // 虚拟币推荐通道
              eventBus.emit('virtualPopup', res.msg)
            } else {
              const data = res.data
              if (data.orderNo) {
                mainConfig.detailType = 2
                // 证明已经提交提现订单
                withdrawStore.isWithdraw = true
                withdrawStore.addwithdrawDetail(res.data)
                withdrawShow.value = false
              }
              isSubmitting.value = false
            }
          })
          .catch(() => {
            isSubmitting.value = false
          })
      } else if (withdrawStore.bankCardInfo?.type == '3') {
        const params = {
          amount: withdrawStore.bankCardInfo?.amount,
          addrId: withdrawStore.bankCardInfo?.addrId,
          wdAmountType: withdrawStore.bankCardInfo?.wdAmountType,
          wdHours: withdrawStore.bankCardInfo?.wdHours,
          wdWayType: withdrawStore.bankCardInfo?.wdWayType,
          deviceId: deviceId.value,
          optClient: optClient.value
        }
        getWithdrawEbpayOrder(params)
          .then((res) => {
            if (res.code == 1006000117) {
              isSubmitting.value = false
              // 流水弹窗
              eventBus.emit('tipsData', res.data)
            } else if (res.code == 1002005004) {
              isSubmitting.value = false
              // 虚拟币推荐通道
              eventBus.emit('virtualPopup', res.msg)
            } else {
              const data = res.data
              if (data.orderNo) {
                mainConfig.detailType = 2
                // 证明已经提交提现订单
                withdrawStore.isWithdraw = true
                withdrawStore.addwithdrawDetail(res.data)
                withdrawShow.value = false
              }
              isSubmitting.value = false
            }
          })
          .catch(() => {
            isSubmitting.value = false
          })
      }
    } else {
      isSubmitting.value = false
      return ElMessage(i18n.global.t('DepositWithdraw.WithdrawalConfirmationTips_2'))
    }
  }
}

onUnmounted(() => {
  // 关闭弹窗
  withdrawShow.value = false
  // eventBus.off('withdrawalConfirmationOpen')
})

watchEffect(() => {
  // if (withdrawShow.value === false) {
  //   eventBus.off('withdrawalConfirmationOpen')
  // }
})
</script>
<style lang='scss' scoped>
:deep() {
  .el-dialog__header {
    padding: 12px 20px 12px 20px !important;
    margin-right: 0px !important;
    border-radius: 8px 8px 0px 0px !important;
    background: var(--unnamed, #323c6f) !important;
  }
}
.popup-top {
  color: #111;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 8px 0;
}
.popup-text {
  color: var(--60, rgba(255, 255, 255, 0.6));

  text-align: center;
  font-size: 12px;
  font-weight: 400;
  margin: 21px 0 32px 0;
}

.popup-withdrawal {
  width: 113px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  color: #111;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: var(--60, rgba(255, 255, 255, 0.6));
  }
  .text {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
  }
  .text-rate {
    color: #fff;
    font-size: 12px;
    margin-top: 12px;
  }
}
.popup-handling {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  .popup-handling-left,
  .popup-handling-right {
    // width: 99px;
    height: 44px;
    color: var(--60, rgba(255, 255, 255, 0.6));
    text-align: center;
    .title {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .text {
      color: #fff;

      font-size: 20px;
      font-weight: 700;
      span {
        font-size: 12px;
      }
    }
  }
  .popup-handling-right {
    margin-left: 25px;
  }
}
.popup-limit {
  width: 343px;
  height: 36px;
  margin: 22px auto 32px;
  color: var(--60, rgba(255, 255, 255, 0.6));
  text-align: center;
  line-height: 36px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 6px;
  background: #1d223e;
  span {
    color: #ff5000;
  }
}
.popup-footer {
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .popup-footer-btn {
    color: var(--text-icon-font-wh-1100, #fff);
    width: 88px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .popup-footer-btn:first-child {
    color: var(--60, rgba(255, 255, 255, 0.6));
    border-radius: 6px;
    background: var(--unnamed, #171a2f);
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
    margin-right: 15px;
  }
  .popup-footer-btn:last-child {
    margin-right: 15px;
  }
}
</style>