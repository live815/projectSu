<template>
  <div class="depositfooter" :class="{ 'depositfooter-width': !props.bankPage }">
    <div class="depositfooter-top" v-if="isSpeedup">
      <span>{{ $t('DepositView.ExtraGift') }}:</span>
      <span>
        <template v-if="onComputedSpeedup"> <CurrencyUnit /> </template
        >{{ onComputedSpeedup ? onComputedSpeedup.toFixed(2) : '--' }}</span
      >
      <span>{{ $t('DepositView.TotalGet') }}:</span>
      <span>{{ onComputedAmount ? onComputedAmount.toFixed(2) : '--' }}</span>
    </div>
    <DedicatedButton :color="color" @click="handleButtonClick">{{
      $t('DepositView.RechargeNow')
    }}</DedicatedButton>
    <div class="depositfooter-text">
      <span>{{ $t('DepositView.Advisory') }}</span>
      <span @click="selectLiveChat">{{ $t('DepositView.CustomerAssist') }}</span>
    </div>
  </div>
  <CPopup ref="CPopupDom" position="bottom" height="346px">
    <div class="popup-top-title">{{ $t('DepositView.RechargeTips') }}</div>
    <div class="popup-top-text">
      {{ $t('DepositView.DepositViewTip3') }}
    </div>
    <div class="popup-content">
      <div
        class="popup-content-item"
        v-for="item in amountList"
        :key="item.id"
        :class="{ active: item.highlighted }"
        @click="selectBank(item)"
      >
        <div class="popup-content-item-min"><CurrencyUnit />{{ item.amount }}</div>
        <img :src="icon" class="right-img" v-if="item.highlighted" />
      </div>
    </div>
    <div class="popup-footer">
      <DedicatedButton style="width: 164px" @click="onClickAmount(1)">{{
        $t('DepositView.DepositViewTip4')
      }}</DedicatedButton>
      <DedicatedButton style="width: 164px" :color="color" @click="onClickAmount(2)">{{
        $t('DepositView.DepositViewTip5')
      }}</DedicatedButton>
    </div>
  </CPopup>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import { computed, nextTick, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import CPopup from '@/components/CPopup/Cpopup'
import icon from './img/icon.png'
import { useRechargeStore } from '@/stores/recharge'
import { getVirtualOrder, getC2COrder } from '@/api/recharge'
import { showLoadingToast, closeToast } from 'vant'
import { getDeviceInfo, getClient } from '@/utils/mobileDeviceInfo'
import i18n from '@/i18n'
import { webviewBridgeRedirect } from '@/utils'
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)
const optClient = getClient()
const { deviceId } = getDeviceInfo()
const rechargeStore = useRechargeStore()

const router = useRouter()
// 按钮颜色
const color = ref('')
// 充值金额下面显示弹窗
const CPopupDom = ref(null)
const props = defineProps({
  // 加送倍数
  speedup: {
    type: Number,
    default: null
  },
  // 输入金额
  amount: {
    type: Number,
    default: null
  },
  // 是否加送显示
  isSpeedup: {
    type: Boolean,
    default: false
  },
  // 是否是银行卡页面
  bankPage: {
    type: Boolean,
    default: false
  },
  // 存款人姓名
  userName: {
    type: String,
    default: ''
  },
  // 当前项的数据
  itemObj: {
    type: Object,
    default: () => ({})
  },
  // 虚拟币通道类型
  cryptoProtocol: {
    type: String,
    default: ''
  },
  // c2c银行卡列表
  addBnakInfo: {
    type: Object,
    default: () => ({})
  },
  // c2c 银行卡是否维护
  showBankList: {
    type: Number,
    default: null
  },
  // 加送当日上限金额
  dailyLimitBalance: {
    type: Number,
    default: 0
  }
})

// 加送
const onComputedSpeedup = computed(() => {
  let dailyLimit = props.itemObj.dailyLimit
  if (dailyLimit == null || dailyLimit == -1) {
    return props.amount * props.speedup * 0.01
  } else {
    // 当前通道返回最大限额额 计算是否大于当日赠送金额
    let numCount = dailyLimit - props.dailyLimitBalance
    // 通道当前赠送金额
    let giftCount = props.amount * props.speedup * 0.01
    if (numCount > giftCount) {
      return props.amount * props.speedup * 0.01
    } else {
      return dailyLimit - props.dailyLimitBalance
    }
  }
})
// 总计到账
const onComputedAmount = computed(() => {
  let dailyLimit = props.itemObj.dailyLimit
  if (dailyLimit == null || dailyLimit == -1) {
    return props.amount * props.speedup * 0.01 + props.amount
  }
  return onComputedSpeedup.value + props.amount
})

// 立即充值按钮
const handleButtonClick = () => {
  if (color.value) {
    if (props.bankPage) {
      // 判断是否需要提交存款人姓名
      if (props.itemObj.isC2c == 1) {
        if (props.itemObj.needRealName == 1 || props.itemObj.needRealName == 2) {
          const params = {
            amount: props.amount,
            channelTypeId: props.itemObj.channelTypeId,
            amountType: 0,
            realName: props.userName,
            deviceId: deviceId.value,
            optClient,
            bankCode: props.addBnakInfo.bankCode ? props.addBnakInfo.bankCode : ''
          }
          getC2COrder(params).then((res) => {
            // 金额匹配是否成功 成功直接进入详情否则打开金额弹窗
            if (res.code == 1006000120) {
              const sum = res.data
              amountList.value = sum.map((amount, index) => ({
                id: index + 1,
                amount: amount.toString(),
                highlighted: index === 0
              }))
              // 是否出现推荐金额弹出层
              CPopupDom.value.showhide()
            } else {
              if (res.code == 200) {
                rechargeStore.getc2cOrderList(res.data)
                router.push({ path: '/rechargeInformation', query: res.data })
              }
            }
          })
        } else {
          const params = {
            amount: props.amount,
            channelTypeId: props.itemObj.channelTypeId,
            amountType: 0,
            deviceId: deviceId.value,
            optClient,
            bankCode: props.addBnakInfo.bankCode ? props.addBnakInfo.bankCode : ''
          }
          getC2COrder(params).then((res) => {
            if (res.code == 1006000120) {
              const sum = res.data
              amountList.value = sum.map((amount, index) => ({
                id: index + 1,
                amount: amount.toString(),
                highlighted: index === 0
              }))
              // 是否出现推荐金额弹出层
              CPopupDom.value.showhide()
            } else {
              if (res.code == 200) {
                rechargeStore.getc2cOrderList(res.data)
                router.push({ path: '/rechargeInformation', query: res.data })
              }
            }
          })
        }
      } else {
        if (props.itemObj.needRealName == 1 || props.itemObj.needRealName == 2) {
          const params = {
            amount: props.amount,
            channelTypeId: props.itemObj.channelTypeId,
            realName: props.userName,
            deviceId: deviceId.value,
            optClient
          }

          getOrder(params)
        } else {
          const params = {
            amount: props.amount,
            channelTypeId: props.itemObj.channelTypeId,
            deviceId: deviceId.value,
            optClient
          }
          getOrder(params)
        }
      }
    } else {
      showLoadingToast({
        message: i18n.global.t('common.loading'),
        forbidClick: true,
        duration: 0
      })
      const params = {
        amount: props.amount,
        channelTypeId: props.itemObj.channelTypeId,
        cryptoProtocol: props.cryptoProtocol,
        deviceId: deviceId.value,
        optClient
      }
      getVirtualOrder(params)
        .then((res) => {
          if (res.code == 200) {
            router.push({ path: '/rechargeInformation', query: res.data })
            setTimeout(() => {
              webviewBridgeRedirect({ url: res.data.url, isOpenWindow: true })
            }, 500)
          }
          closeToast()
        })
        .catch(() => {
          closeToast()
        })
    }
  }
}

const getOrder = async (data) => {
  try {
    await rechargeStore.getOrders(data)
    // 订单详情数据
    const orderObj = rechargeStore.orderDataList
    if (orderObj.channelTypeCode) {
      if (orderObj.action == 'jump' || orderObj.action == null) {
        router.push({ path: '/rechargeInformation', query: orderObj })
        setTimeout(() => {
          webviewBridgeRedirect({ url: orderObj.url, isOpenWindow: true })
        }, 500)
      } else {
        router.push({ path: '/rechargeInformation', query: orderObj })
      }
    }
  } catch (err) {}
}

// 推荐金额列表
const amountList = ref([])
const checkedObj = ref({})
// 点击当前项
const selectBank = (item) => {
  amountList.value.forEach((el) => {
    if (el.amount == item.amount) {
      item.highlighted = true
    } else {
      el.highlighted = false
    }
  })
  if (item.highlighted) {
    checkedObj.value = { ...item }
  } else {
    checkedObj.value = {}
  }
}

// 点击推荐金额
const onClickAmount = (val) => {
  if (val == 1) {
    const params = {
      amount: props.amount,
      channelTypeId: props.itemObj.channelTypeId,
      amountType: 2,
      realName: props.userName,
      deviceId: deviceId.value,
      optClient,
      bankCode: props.addBnakInfo.bankCode ? props.addBnakInfo.bankCode : ''
    }
    getC2COrder(params)
      .then((res) => {
        if (res.code == 200) {
          rechargeStore.getc2cOrderList(res.data)
          router.push({ path: '/rechargeInformation', query: res.data })
        } else {
          CPopupDom.value.showhide()
        }
      })
      .catch((err) => {})
  } else {
    const params = {
      amount: checkedObj.value.amount ? checkedObj.value.amount : amountList.value[0].amount,
      channelTypeId: props.itemObj.channelTypeId,
      amountType: 1,
      realName: props.userName,
      deviceId: deviceId.value,
      optClient,
      bankCode: props.addBnakInfo.bankCode ? props.addBnakInfo.bankCode : ''
    }
    getC2COrder(params).then((res) => {
      if (res.code == 200) {
        rechargeStore.getc2cOrderList(res.data)
        router.push({ path: '/rechargeInformation', query: res.data })
      } else {
        CPopupDom.value.showhide()
      }
    })
  }
}

watchEffect(() => {
  if (props.itemObj.channelTypeCode === 'BANK' || props.itemObj.channelTypeCode === 'C2C_BANK') {
    if (props.itemObj.isC2c == '1' && props.showBankList == 1) {
      if (props.itemObj.needRealName == 1 || props.itemObj.needRealName == 2) {
        if (
          props.amount > props.itemObj.maxPayAmount ||
          props.amount < props.itemObj.minPayAmount ||
          !props.userName ||
          !props.addBnakInfo?.bankName
        ) {
          color.value = ''
        } else {
          color.value = 'primary'
        }
      } else {
        if (
          props.amount > props.itemObj.maxPayAmount ||
          props.amount < props.itemObj.minPayAmount
        ) {
          color.value = ''
        } else {
          color.value = 'primary'
        }
      }
    } else {
      if (props.itemObj.needRealName == 1 || props.itemObj.needRealName == 2) {
        if (
          props.amount > props.itemObj.maxPayAmount ||
          props.amount < props.itemObj.minPayAmount ||
          !props.userName
        ) {
          color.value = ''
        } else {
          color.value = 'primary'
        }
      } else {
        if (
          props.amount > props.itemObj.maxPayAmount ||
          props.amount < props.itemObj.minPayAmount
        ) {
          color.value = ''
        } else {
          color.value = 'primary'
        }
      }
    }
  } else {
    if (props.itemObj.needRealName == 1 || props.itemObj.needRealName == 2) {
      if (
        props.amount > props.itemObj.maxPayAmount ||
        props.amount < props.itemObj.minPayAmount ||
        !props.userName
      ) {
        color.value = ''
      } else {
        color.value = 'primary'
      }
    } else {
      if (props.amount > props.itemObj.maxPayAmount || props.amount < props.itemObj.minPayAmount) {
        color.value = ''
      } else {
        color.value = 'primary'
      }
    }
  }
})
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>
<style lang="scss" scoped>
.depositfooter {
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 100%;
  height: 144px;
  flex-shrink: 0;
  padding: 0 16px;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  .depositfooter-top {
    text-align: center;
    color: var(--gray-3, #333);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-top: 12px;
    span:nth-child(2n) {
      font-size: 16px;
      font-weight: 700;
      margin: 0 10px;
    }
    span:nth-child(2) {
      color: var(--2, #ff5000);
    }
  }
  .depositfooter-btn {
    width: 100%;
    height: 44px;
    border-radius: 6px;
    background: #dbdbdb;
    margin-top: 12px;
  }
  .depositfooter-text {
    margin: 28px 0 12px 0;
    text-align: center;
    color: #111;

    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    span:last-child {
      color: #486bb2;
    }
  }
}

.popup-top-title {
  color: var(--gray-1, #111);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0;
}
.popup-top-text {
  width: 343px;
  color: #666;
  text-align: center;
  margin: 0 auto;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 150% */
}
.popup-content {
  .popup-content-item {
    position: relative;
    width: 343px;
    height: 48px;
    margin: 8px auto;
    border-radius: 8px;
    background: #f9f9f9;
    .popup-content-item-min {
      color: #111;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      line-height: 48px;
    }
    .right-img {
      position: absolute;
      right: 0;
      top: 0;
      width: 43px;
      height: 43px;
    }
  }
  .active {
    background: #fff5f0;
  }
}
.depositfooter-width {
  width: 343px;
}
.popup-footer {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
