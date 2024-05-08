<template>
  <div class="virtual-way">
    <div class="virtual-banner">
      <img class="virtual-banner-left" :src="banner" />
      <div class="virtual-banner-right">
        <div class="virtual-banner-right-title">{{ $t('DepositWithdraw.VirtualTips_1') }}</div>
        <div class="virtual-banner-right-text">{{ $t('DepositWithdraw.VirtualTips_2') }}</div>
      </div>
    </div>
    <template
      v-if="props.cardBinded == 0 && props.cryptoDpChannelList[virtualCurrent]?.bindCardState == 1"
    >
      <AddInformation></AddInformation
    ></template>
    <template
      v-else-if="
        props.phoneBinded == 0 && props.cryptoDpChannelList[virtualCurrent]?.bindPhoneState == 1
      "
    >
      <AddInformation :isPhoneShow="true"></AddInformation>
    </template>
    <template v-else>
      <div class="title">
        <div class="title-bar"></div>
        {{ $t('DepositWithdraw.WalletProtocol') }}
      </div>
      <div class="virtual-list" v-if="props.cryptoDpChannelList[virtualCurrent]?.cryptoProtocol">
        <div
          class="virtual-list-item"
          :class="{ active: indexCurrent === index }"
          v-for="(item, index) in props.cryptoDpChannelList[virtualCurrent]?.cryptoProtocol.split(
            ','
          )"
          :key="index"
          @click="onClickAgreementTab(item, index)"
        >
          <div class="virtual-item-title" :class="{ activeTitle: indexCurrent === index }">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="amount-box">
        <div class="title">
          <div class="title-bar"></div>
          {{ $t('DepositWithdraw.RechargeAmount') }}
          <div class="virtual-text">
            {{ $t('DepositWithdraw.ExtraGift') }}
            <span>{{ props.cryptoDpChannelList[virtualCurrent].addPercent }}%</span>
          </div>
        </div>
        <div class="amount-btn-contianer">
          <div
            class="quickAmount"
            v-for="(item, index) in quickAmount"
            :key="index"
            :class="currentAmount == item ? 'quickAmount selected-quickAmount' : 'quickAmount'"
            @click="changQuickAmount(item)"
          >
            {{ item }}
          </div>
        </div>

        <div class="amount-input-container" v-if="isCustomizeInput">
          <input
            class="amount-input"
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            :placeholder="$t('DepositWithdraw.PlaceholderTips_1') + `${minAmount}~${maxAmount}`"
            v-model="currentAmount"
          />
          <div class="amount-input-icon">
            <CurrencyUnit style="margin-right: 0" />
          </div>
        </div>
        <div class="amount-input-error" v-if="currentAmount > maxAmount">
          {{ $t('DepositWithdraw.LimitTips_1') }}
        </div>
        <div class="virtual-rate-text">
          {{ $t('DepositWithdraw.ReferenceExchangeRate') }}：<span
            >1 USDT = {{ rate }} {{ Currency }}
          </span>
        </div>
        <div class="virtual-rate-texts">
          {{ $t('DepositWithdraw.EstimatedPayment') }}:
          <span>{{ toFormatNumber(Number(onComputedCoin)) }}</span> USDT
        </div>
        <div class="amount-input-add">
          <div class="amount-input-add-left">
            {{ $t('DepositWithdraw.ExtraGift') }}:<template v-if="onComputedSpeedup !== '--'">
              <CurrencyUnit />
            </template>
            <span>{{ onComputedSpeedup }}</span>
          </div>
          <div class="amount-input-add-right">
            {{ $t('DepositWithdraw.TotalGained') }}：<span>{{
              onComputedAmount ? onComputedAmount.toFixed(2) : '--'
            }}</span>
          </div>
        </div>
      </div>
      <div class="lower-tip" v-if="dpInitContent">
        <p v-html="Base64.decode(dpInitContent)"></p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { Base64 } from 'js-base64'
import banner from '../img/banner.png'
import AddInformation from './AddInformation.vue'
import { getOrderText, getVirtualGetRate, getChannelDepositGift } from '@/api/recharge.js'
import { onMounted, watchEffect } from 'vue'
import { toFormatNumber } from '@/utils'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
const { deviceId, optClient } = getDeviceInfo()
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
const emit = defineEmits(['virtualData'])
const props = defineProps({
  cryptoDpChannelList: {
    type: Array,
    default: () => []
  },
  cardBinded: {
    type: String,
    default: ''
  },
  phoneBinded: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  getCoinList()
  getListText(props.cryptoDpChannelList[virtualCurrent.value].channelTypeId)
  getChannelDepositInfo(props.cryptoDpChannelList[virtualCurrent.value].channelTypeId)
})

// 通道剩余加送金额
const dailyLimitBalance = ref(0)
// 获取充值当日赠送金额
const getChannelDepositInfo = (id) => {
  const params = {
    typeId: id
  }
  getChannelDepositGift(params).then((res) => {
    if (res.data) {
      dailyLimitBalance.value = res.data
    }
  })
}
// 获取币汇率
const getCoinList = () => {
  getVirtualGetRate('1', Currency.value).then((res) => {
    if (res.data) {
      rate.value = res.data.rate
    }
  })
}

// 输入金额
const currentAmount = ref(null)
const indexCurrent = ref(0)
// 点击当前虚拟币充值项索引
const virtualCurrent = ref(0)
// 虚拟币汇率
const rate = ref(null)
// 预计支付虚拟币钱
const onComputedCoin = computed(() => {
  if (Number(currentAmount.value)) {
    return Number(currentAmount.value) / rate.value
  }
  return 0
})

// 当前协议
const cryptoProtocol = ref('')
// cryptoProtocol.value = props.cryptoDpChannelList.value[0].cryptoProtocol.split(',')[0]
// 充值文案
const dpInitContent = ref('')
// 支付金额切换值
const onClickAgreementTab = (item, index) => {
  indexCurrent.value = index
  cryptoProtocol.value = item
}

// 是否可以手动输入
const isCustomizeInput = computed(() => {
  if (
    props.cryptoDpChannelList[virtualCurrent.value] &&
    props.cryptoDpChannelList[virtualCurrent.value].isCustomizeInput == '1'
  ) {
    return true
  }
  return false
})

// 获取充值文案
const getListText = (channelTypeId) => {
  getOrderText(channelTypeId).then((res) => {
    if (res.code == 200) {
      dpInitContent.value = res.data.dpInitContent
    }
  })
}

// 获取当前通道快捷金额
const quickAmount = computed(() => {
  if (props.cryptoDpChannelList[virtualCurrent.value]) {
    return props.cryptoDpChannelList[virtualCurrent.value].quickAmount.split(',')
  } else {
    return []
  }
})
// 获取最小金额
const minAmount = computed(() => {
  if (props.cryptoDpChannelList[virtualCurrent.value]) {
    return props.cryptoDpChannelList[virtualCurrent.value].minPayAmount
  } else {
    return []
  }
})
// 最大金额
const maxAmount = computed(() => {
  if (props.cryptoDpChannelList[virtualCurrent.value]) {
    return props.cryptoDpChannelList[virtualCurrent.value].maxPayAmount
  } else {
    return []
  }
})
// 快捷金额切换
const changQuickAmount = (item) => {
  currentAmount.value = item
}
// 加送
const onComputedSpeedup = computed(() => {
  if (
    props.cryptoDpChannelList[virtualCurrent.value] &&
    props.cryptoDpChannelList[virtualCurrent.value].addPercent &&
    currentAmount.value
  ) {
    let dailyLimit = props.cryptoDpChannelList[virtualCurrent.value].dailyLimit
    if (dailyLimit == null || dailyLimit == -1) {
      return (
        Number(currentAmount.value) *
        props.cryptoDpChannelList[virtualCurrent.value].addPercent *
        0.01
      ).toFixed(2)
    } else {
      // 当前通道返回最大限额额 计算是否大于当日赠送金额
      let numCount = dailyLimit - dailyLimitBalance.value
      // 通道当前赠送金额
      let giftCount =
        Number(currentAmount.value) *
        props.cryptoDpChannelList[virtualCurrent.value].addPercent *
        0.01
      if (numCount > giftCount) {
        return (
          Number(currentAmount.value) *
          props.cryptoDpChannelList[virtualCurrent.value].addPercent *
          0.01
        )
      } else {
        return dailyLimit - dailyLimitBalance.value
      }
    }
  }
  return '--'
})
// 总计到账
const onComputedAmount = computed(() => {
  if (
    props.cryptoDpChannelList[virtualCurrent.value] &&
    props.cryptoDpChannelList[virtualCurrent.value]?.addPercent &&
    currentAmount.value
  ) {
    let dailyLimit = props.cryptoDpChannelList[virtualCurrent.value].dailyLimit
    if (dailyLimit == null || dailyLimit == -1) {
      return (
        Number(currentAmount.value) *
          props.cryptoDpChannelList[virtualCurrent.value]?.addPercent *
          0.01 +
        Number(currentAmount.value)
      )
    }
    return onComputedSpeedup.value + Number(currentAmount.value)
  }
  return null
})
watchEffect(() => {
  if (currentAmount.value >= minAmount.value && currentAmount.value <= maxAmount.value) {
    const params = {
      amount: currentAmount.value,
      channelTypeId: props.cryptoDpChannelList[virtualCurrent.value].channelTypeId,
      cryptoProtocol: cryptoProtocol.value
        ? cryptoProtocol.value
        : props.cryptoDpChannelList[virtualCurrent.value].cryptoProtocol.split(',')[0],
      deviceId: deviceId.value,
      optClient: optClient.value
    }
    emit('virtualData', params)
  }
})
</script>
<style lang='scss' scoped>
.virtual-way {
  margin-top: 28px;
  .virtual-banner {
    display: flex;
    align-items: center;
    width: 660px;
    height: 60px;
    margin-top: 24px;
    margin-bottom: 25px;
    border-radius: 6px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);

    .virtual-banner-left {
      width: 61px;
      height: 48px;
      margin: 0 7px;
    }
    .virtual-banner-right {
      .virtual-banner-right-title {
        color: var(--100, #fff);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .virtual-banner-right-text {
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  .virtual-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 14px;
    .virtual-list-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 102px;
      height: 40px;
      margin: 0 8px;
      border-radius: 6px;
      background: #1d223c;
      line-height: 40px;
      .virtual-item-title {
        color: var(--100, #fff);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
    }
    .active {
      border-radius: 6px;
      border: 1px solid #ff9000;
      background: var(--unnamed, #1d223c);
      .activeTitle {
        color: var(--2, #ff5000);
      }
    }
  }
  input {
    width: 660px;
    height: 48px;
    padding-left: 14px;
    margin-top: 20px;
    border-radius: 6px;
    background: var(--unnamed, #171a2f);
    color: white;
  }
  .title {
    height: 18px;
    display: flex;
    gap: 8px;
    color: var(--100, #fff);

    font-size: 16px;
    font-weight: 500;
  }

  .title-bar {
    display: inline-block;
    width: 4px;
    height: 18px;
    flex-shrink: 0;
    border-radius: 0px 4px 4px 0px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
  .virtual-text {
    color: #fff;
    text-align: center;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    padding: 2px 6px;
    border-radius: 10px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .amount-box {
    position: relative;
    margin-top: 25px;

    .amount-btn-contianer {
      display: flex;
      flex-wrap: wrap;
      gap: 22px;
      margin-top: 15px;

      .quickAmount {
        display: flex;
        width: 148px;
        height: 40px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background: #2b3257;
        color: var(--80, rgba(255, 255, 255, 0.8));
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        cursor: pointer;
      }

      .selected-quickAmount {
        border: 1px solid #ff9000;
        color: #fff;
      }
    }

    .amount-input-container {
      position: relative;
      .amount-input {
        padding-left: 50px;
      }
      .amount-input-icon {
        position: absolute;
        top: 34px;
        left: 17px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background-color: var(--1, #ff9000);
      }
    }
    .amount-input-error {
      color: #f53f3f;
      font-size: 12px;
      margin-top: 5px;
      font-style: normal;
      font-weight: 400;
    }
    .virtual-rate-text {
      color: #999;
      font-size: 12px;
      font-weight: 400;
      margin-top: 16px;
      span {
        color: var(--100, #fff);
      }
    }
    .virtual-rate-texts {
      color: #999;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 10px;
      span {
        color: #ff5000;
      }
    }

    .amount-input-add {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 14px;
      .amount-input-add-left {
        color: var(--unnamed, #f35f1b);
        font-weight: 700;
      }
      .amount-input-add-right {
        color: var(--100, #fff);
        font-weight: 700;
      }
    }
  }
  .lower-tip {
    margin-top: 20px;
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }
}
</style>