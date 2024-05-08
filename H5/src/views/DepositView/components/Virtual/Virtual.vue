<template>
  <div class="virtual-content" v-if="cryptoDpChannelList.length">
    <Inform></Inform>
    <template
      v-if="onComputedCardBinded == 0 && cryptoDpChannelList[selectedTab].bindCardState == 1"
    >
      <div class="addInformation-footer">
        <AddInformation></AddInformation>
      </div>
    </template>
    <template
      v-else-if="onComputedPhoneBinded == 0 && cryptoDpChannelList[selectedTab].bindPhoneState == 1"
    >
      <div class="addInformation-footer">
        <AddInformation :isPhoneShow="true"></AddInformation>
      </div>
    </template>
    <template v-else>
      <div class="virtual-box">
        <div class="virtual-banner" @click="router.push('/virtualBanner')">
          <img class="virtual-banner-left" :src="banner" />
          <div class="virtual-banner-right">
            <div class="virtual-banner-right-title">{{ $t('DepositView.DepositViewTip11') }}</div>
            <div class="virtual-banner-right-text">{{ $t('DepositView.DepositViewTip12') }}</div>
          </div>
        </div>
        <HeadlineTitle :leftTitle="$t('DepositView.WalletProtocol')"></HeadlineTitle>
        <!-- 钱包协议 -->
        <DepositList
          :list="cryptoDpChannelList[selectedTab].cryptoProtocol.split(',')"
          :depositListTab="agreementTab"
          :textsize="true"
          @onClickChildTab="onClickAgreementTab"
        ></DepositList>
        <div class="virtual-content-recharge">
          <div class="virtual-content-recharge-left">{{ $t('DepositView.RechargeAmount') }}</div>
          <div class="virtual-content-recharge-right">
            {{ $t('DepositView.ExtraGift') }}
            <span>{{ cryptoDpChannelList[selectedTab].addPercent }}%</span>
          </div>
        </div>
        <!-- 金额菜单 -->
        <DepositList
          :list="cryptoDpChannelList[selectedTab].quickAmount.split(',')"
          :depositListTab="depositListTab"
          @onClickChildTab="onClickDepositTab"
        ></DepositList>
        <DepositInput
          :placeholder="`${$t('DepositView.EnterDepositAmount')}${
            cryptoDpChannelList[selectedTab].minPayAmount
          }~${cryptoDpChannelList[selectedTab].maxPayAmount}`"
          :isInputImg="true"
          :isInputLeft="true"
          :itemObj="cryptoDpChannelList[selectedTab]"
          :modelValue="depositCount"
          @update:modelValue="updateCount"
        >
        </DepositInput>
        <div class="virtual-text">
          {{ $t('DepositView.ReferExchangeRate') }}:<span>1 USDT = {{ rate }} {{ Currency }} </span>
        </div>
        <div class="virtual-texts">
          {{ $t('DepositView.EstimatPayment') }}:
          <span>{{ toFormatNumber(Number(onComputedCoin)) }}</span> USDT
        </div>
        <!-- 提示文本渲染 -->
        <template v-if="dpInitContent">
          <p
            class="general-box-padding dpInitContent-text"
            style="margin-bottom: 15px"
            v-html="Base64.decode(dpInitContent)"
          ></p>
        </template>
        <DepositFooter
          :speedup="cryptoDpChannelList[selectedTab].addPercent"
          :amount="onComputedInput"
          :itemObj="cryptoDpChannelList[selectedTab]"
          :isSpeedup="true"
          :cryptoProtocol="cryptoProtocol"
          :dailyLimitBalance="dailyLimitBalance"
        ></DepositFooter>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Inform from '../Inform/Inform'
import { useRouter } from 'vue-router'
import banner from './img/banner.png'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import DepositInput from '../DepositInput/DepositInput'
import DepositList from '../DepositList/DepositList'
import DepositFooter from '../DepositFooter/DepositFooter'
import AddInformation from '../AddInformation/AddInformation'
import { getVirtualGetRate, getOrderText, getChannelDepositGift } from '@/api/recharge'
import { Base64 } from 'js-base64'
import { useRechargeStore } from '@/stores/recharge'
import { toFormatNumber } from '@/utils'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
const router = useRouter()
onMounted(() => {
  getCoinList()
  getText(cryptoDpChannelList.value[selectedTab.value].channelTypeId)
  getChannelDepositInfo(cryptoDpChannelList.value[selectedTab.value].channelTypeId)
})
//充值页面时展示的告知内容
const dpInitContent = ref('')

// 说明文字信息
const getText = (channelTypeId) => {
  getOrderText(channelTypeId).then((res) => {
    if (res.data.dpPendingContent) {
      dpInitContent.value = res.data.dpInitContent
    }
  })
}

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

const rechargeStore = useRechargeStore()

const selectedTab = ref(0)

// 虚拟币充值整体数据
const cryptoDpChannelList = computed(() => {
  return rechargeStore.cryptoDpChannelList
})

// 是否添加银行卡信息
const onComputedCardBinded = computed(() => {
  return rechargeStore.cardBinded
})

// 是否有手机号
const onComputedPhoneBinded = computed(() => {
  return rechargeStore.phoneBinded
})

// 输入金额值
const depositCount = ref('')
// 协议切换值
const agreementTab = ref(0)
// 当前协议
const cryptoProtocol = ref('')
// 协议默认定义第一条
cryptoProtocol.value = cryptoDpChannelList.value[0].cryptoProtocol.split(',')[0]

// 虚拟币汇率
const rate = ref(null)

// 支付金额切换值
const onClickAgreementTab = (item, index) => {
  agreementTab.value = index
  cryptoProtocol.value = item
}
// 金额列表高亮默认为空
const depositListTab = ref(null)

// 支付金额切换值
const onClickDepositTab = (item, index) => {
  depositListTab.value = index
  depositCount.value = Number(item)
}

// 输入金额返回的值
const updateCount = (val) => {
  // 根据输入值匹配数组索引实现高亮
  let index = cryptoDpChannelList.value[selectedTab.value].quickAmount
    .split(',')
    .findIndex((item) => {
      return item === val
    })
  depositListTab.value = index
  depositCount.value = val
}

// 底部金额总数
const onComputedInput = computed(() => {
  return Number(depositCount.value)
})

// 预计支付虚拟币钱
const onComputedCoin = computed(() => {
  if (Number(depositCount.value)) {
    return Number(depositCount.value) / rate.value
  }
  return 0
})

// 获取币汇率
const getCoinList = () => {
  getVirtualGetRate('1', Currency.value).then((res) => {
    if (res.data) {
      rate.value = res.data.rate
    }
  })
}
</script>
<style lang="scss" scoped>
.virtual-content {
  padding-bottom: 144px;
  .virtual-box {
    padding: 0 16px;
    overflow: hidden;
  }
  .virtual-banner {
    display: flex;
    align-items: center;
    width: 343px;
    height: 60px;
    border-radius: 8px;
    margin-top: 12px;
    background: linear-gradient(4deg, #fff9f2 3.19%, #ffede5 97.01%);
    .virtual-banner-left {
      width: 80px;
      height: 60px;
      margin: 0 10px;
    }
    .virtual-banner-right {
      .virtual-banner-right-title {
        color: #111;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .virtual-banner-right-text {
        color: #666;
        font-size: 13px;
      }
    }
  }
  .dpInitContent-text {
    height: 120px;
    overflow: scroll;
    word-wrap: break-word;
    line-height: 20px;
    margin: 10px auto 0;
  }
  .virtual-text {
    color: #999;
    font-size: 12px;
    font-weight: 400;
    margin-top: 16px;
    span {
      color: #111;
    }
  }
  .virtual-texts {
    color: #999;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
    span {
      color: #ff5000;
    }
  }
  .virtual-content-recharge {
    display: flex;
    align-items: center;
    margin: 32px 0 16px 0;
    .virtual-content-recharge-left {
      color: var(--gray-1, #111);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      margin-right: 6px;
    }
    .virtual-content-recharge-right {
      color: #fff;
      text-align: center;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      padding: 2px 6px;
      border-radius: 10px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
  }
  .addInformation-footer {
    margin-top: 60px;
    padding: 0 25px;
  }
}
</style>
