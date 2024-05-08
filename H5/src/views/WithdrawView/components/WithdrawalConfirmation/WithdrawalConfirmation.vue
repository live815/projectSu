<template>
  <!-- 选择银行卡弹窗 -->
  <div>
    <CPopup ref="CPopupDom" position="bottom">
      <div class="popup-top">{{ $t('Wletter.Withdrawalconfirmat') }}</div>
      <div class="popup-text">{{ $t('Wletter.tip111') }}</div>
      <div class="popup-withdrawal">
        <div class="title">{{ $t('Wletter.WithdrawalAmount') }}</div>
        <div class="text"><CurrencyUnit />{{ withdrawalInformation.amount }}</div>
        <div class="text-rate" v-if="withdrawalInformation.rate">
          {{ $t('Wletter.tip112') }}{{ withdrawalInformation.rate }}
        </div>
      </div>
      <div class="popup-handling" v-if="isHandlingShow">
        <template
          v-if="withdrawalInformation.wdWayType == '2' || withdrawalInformation.wdWayType == '3'"
        >
          <template v-if="withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes">
            <template v-if="withdrawalInformation.wdWayType == '2'">
              <div class="popup-handling-left">
                <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
                <div class="text">{{ toFormatNumber(Number(onUsdt)) }}<span>USDT</span></div>
              </div>
              <div class="popup-handling-right">
                <div class="title">{{ $t('Wletter.Withdrawalfee') }}</div>
                <div class="text">0</div>
              </div>
            </template>
            <template v-if="withdrawalInformation.wdWayType == '3'">
              <div class="popup-handling-left">
                <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
                <div class="text">
                  {{ toFormatNumber(Number(withdrawalInformation.amount))
                  }}<span>{{ $t('Wletter.EbPay') }}</span>
                </div>
              </div>
              <div class="popup-handling-right">
                <div class="title">{{ $t('Wletter.Withdrawalfee') }}</div>
                <div class="text">0</div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="popup-handling-left" v-if="withdrawalInformation.wdWayType == '2'">
              <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
              <div class="text">{{ toFormatNumber(Number(onComputedUsdt)) }}<span>USDT</span></div>
            </div>

            <div class="popup-handling-left" v-if="withdrawalInformation.wdWayType == '3'">
              <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
              <div class="text">
                {{
                  toFormatNumber(
                    Number(withdrawalInformation.amount - onComputedLargeWithdrawRatio)
                  )
                }}<span>{{ $t('Wletter.EbPay') }}</span>
              </div>
            </div>
            <div class="popup-handling-right">
              <div class="title">{{ $t('Wletter.Withdrawalfee') }}</div>
              <div class="text">{{ toFormatNumber(Number(onComputedLargeWithdrawRatio)) }}</div>
            </div>
          </template>
        </template>

        <template v-else>
          <template v-if="withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes">
            <div class="popup-handling-left">
              <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
              <div class="text">
                {{ toFormatNumber(Number(withdrawalInformation.amount)) }}
              </div>
            </div>
            <div class="popup-handling-right">
              <div class="title">{{ $t('Wletter.Withdrawalfee') }}</div>
              <div class="text">0</div>
            </div>
          </template>
          <template v-else>
            <div class="popup-handling-left">
              <div class="title">{{ $t('Wletter.Actualarrival') }}</div>
              <div class="text">
                {{
                  toFormatNumber(
                    Number(withdrawalInformation.amount - onComputedLargeWithdrawRatio)
                  )
                }}
              </div>
            </div>
            <div class="popup-handling-right">
              <div class="title">{{ $t('Wletter.Withdrawalfee') }}</div>
              <div class="text">{{ toFormatNumber(Number(onComputedLargeWithdrawRatio)) }}</div>
            </div>
          </template>
        </template>
      </div>
      <div class="popup-limit">
        {{ $t('Wletter.tip113')
        }}<span>{{
          withdrawalInformation.wdAmountType == 1
            ? withdrawStore.largeWithdrawLimit?.largeAvailableWdTimes
            : withdrawStore.wdChannelTypeList[0]?.normalAvailableWdTimes
        }}</span>
        {{ $t('Wletter.tip1133') }}
      </div>
      <div class="popup-footer">
        <div class="popup-footer-btn" @click="onClickCancel">{{ $t('Wletter.cancel') }}</div>
        <div class="popup-footer-btn" @click="onClickConfirm">
          {{ $t('Wletter.Withdrawimmediate') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CPopup from '@/components/CPopup/Cpopup'
import { getWithdrawOrder, getWithdrawUsdtOrder, getWithdrawEbpayOrder } from '@/api/withdraw'
import { useWithdrawStore } from '@/stores/withdraw'
import { toFormatNumber } from '@/utils'
import { showToast } from 'vant'
import i18n from '@/i18n'
import { getDeviceInfo, getClient } from '@/utils/mobileDeviceInfo'
const { deviceId } = getDeviceInfo()
const withdrawStore = useWithdrawStore()
const emit = defineEmits(['tipsData', 'virtuaTip'])
const optClient = getClient()
const router = useRouter()

// 提现详情
const withdrawalInformation = ref({})
// 是否有手续费显示
const CPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = (val) => {
  if (val) {
    withdrawalInformation.value = val
  }
  CPopupDom.value.showhide()
}
defineExpose({ showhide })

// 判断是否有手续费
const isHandlingShow = computed(() => {
  if (withdrawalInformation.value.wdAmountType == 1) {
    return true
  }
  return false
})

// 手续费
const onComputedLargeWithdrawRatio = computed(() => {
  return (withdrawalInformation.value.largeWithdrawRatio / 100) * withdrawalInformation.value.amount
})

// 整体没有手续费的到账
const onUsdt = computed(() => {
  return withdrawalInformation.value.amount / withdrawalInformation.value.rate
})

// USDT实际到账到账
const onComputedUsdt = computed(() => {
  return (
    (withdrawalInformation.value.amount - onComputedLargeWithdrawRatio.value) /
    withdrawalInformation.value.rate
  )
})
// 立即提现
const onClickConfirm = () => {
  // 大额提现
  if (withdrawalInformation.value.wdAmountType == 1) {
    if (
      withdrawalInformation.value.wdWayType == '2' ||
      withdrawalInformation.value.wdWayType == '3'
    ) {
      const params = {
        amount: withdrawalInformation.value.amount,
        addrId: withdrawalInformation.value.addrId,
        wdAmountType: withdrawalInformation.value.wdAmountType,
        wdHours: withdrawalInformation.value.wdHours,
        wdWayType: withdrawalInformation.value.wdWayType,
        deviceId: deviceId.value,
        optClient
      }
      if (withdrawalInformation.value.wdWayType == '2') {
        getWithdrawUsdtOrder(params).then((res) => {
          if (res.code == 1006000117) {
            // 流水弹窗
            emit('tipsData', res.data)
          } else if (res.code == 1002005004) {
            // 虚拟币推荐通道
            emit('virtuaTip', res.msg)
          } else {
            const data = res.data
            if (data.orderNo) {
              const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
              router.push({
                path: '/withdrawalInformation',
                query: { orderData: encodedOrderData }
              })
              CPopupDom.value.showhide()
            }
          }
        })
      } else {
        getWithdrawEbpayOrder(params).then((res) => {
          if (res.code == 1006000117) {
            emit('tipsData', res.data)
          } else {
            const data = res.data
            if (data.orderNo) {
              const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
              router.push({
                path: '/withdrawalInformation',
                query: { orderData: encodedOrderData }
              })
              CPopupDom.value.showhide()
            }
          }
        })
      }
    } else {
      const params = {
        amount: withdrawalInformation.value.amount,
        cardId: withdrawalInformation.value.cardId,
        wdAmountType: withdrawalInformation.value.wdAmountType,
        wdHours: withdrawalInformation.value.wdHours,
        wdWayType: withdrawalInformation.value.wdWayType,
        deviceId: deviceId.value,
        optClient
      }
      getWithdrawOrder(params).then((res) => {
        if (res.code == 1006000117) {
          emit('tipsData', res.data)
        } else {
          const data = res.data
          if (data) {
            const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
            router.push({ path: '/withdrawalInformation', query: { orderData: encodedOrderData } })
            CPopupDom.value.showhide()
          }
        }
      })
    }
  } else {
    // 小额提现
    // 如果当前是大额提现或者普通提现,提现次数必须大于0才能提现
    if (
      withdrawalInformation.value.wdAmountType == 0 &&
      withdrawStore.wdChannelTypeList[0]?.normalAvailableWdTimes > 0
    ) {
      if (
        withdrawalInformation.value.wdWayType == '2' ||
        withdrawalInformation.value.wdWayType == '3'
      ) {
        const params = {
          amount: withdrawalInformation.value.amount,
          addrId: withdrawalInformation.value.addrId,
          wdAmountType: withdrawalInformation.value.wdAmountType,
          wdHours: withdrawalInformation.value.wdHours,
          wdWayType: withdrawalInformation.value.wdWayType,
          deviceId: deviceId.value,
          optClient
        }
        if (withdrawalInformation.value.wdWayType == '2') {
          getWithdrawUsdtOrder(params).then((res) => {
            if (res.code == 1006000117) {
              // 流水弹窗
              emit('tipsData', res.data)
            } else if (res.code == 1002005004) {
              // 虚拟币推荐通道
              emit('virtuaTip', res.msg)
            } else {
              const data = res.data
              if (data.orderNo) {
                const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
                router.push({
                  path: '/withdrawalInformation',
                  query: { orderData: encodedOrderData }
                })
                CPopupDom.value.showhide()
              }
            }
          })
        } else {
          getWithdrawEbpayOrder(params).then((res) => {
            if (res.code == 1006000117) {
              emit('tipsData', res.data)
            } else {
              const data = res.data
              if (data.orderNo) {
                const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
                router.push({
                  path: '/withdrawalInformation',
                  query: { orderData: encodedOrderData }
                })
                CPopupDom.value.showhide()
              }
            }
          })
        }
      } else {
        const params = {
          amount: withdrawalInformation.value.amount,
          cardId: withdrawalInformation.value.cardId,
          wdAmountType: withdrawalInformation.value.wdAmountType,
          wdHours: withdrawalInformation.value.wdHours,
          wdWayType: withdrawalInformation.value.wdWayType,
          deviceId: deviceId.value,
          optClient
        }
        getWithdrawOrder(params).then((res) => {
          if (res.code == 1006000117) {
            emit('tipsData', res.data)
          } else {
            const data = res.data
            if (data.orderNo) {
              const encodedOrderData = encodeURIComponent(JSON.stringify(toRaw(data)))
              router.push({
                path: '/withdrawalInformation',
                query: { orderData: encodedOrderData }
              })
              CPopupDom.value.showhide()
            }
          }
        })
      }
    } else {
      return showToast(i18n.global.t('Wletter.tip114'))
    }
  }
}
// 取消按钮
const onClickCancel = () => {
  CPopupDom.value.showhide()
}
</script>
<style lang="scss" scoped>
.popup-top {
  color: #111;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 8px 0;
}
.popup-text {
  color: rgba(0, 0, 0, 0.6);
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
  }
  .text {
    font-size: 36px;
    font-weight: 700;
  }
  .text-rate {
    color: var(--999, #999);
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
    color: #111;
    text-align: center;
    .title {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 8px;
    }
    .text {
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
  color: #111;
  text-align: center;
  line-height: 36px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 6px;
  background: #fff5f0;
  span {
    color: #ff5000;
  }
}

.popup-footer {
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-footer-btn {
    color: var(--text-icon-font-wh-1100, #fff);
    width: 164px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .popup-footer-btn:first-child {
    color: #111;
    border-radius: 6px;
    background: var(--gray-f-569, #f5f6f9);
    margin-right: 15px;
  }
}
</style>
