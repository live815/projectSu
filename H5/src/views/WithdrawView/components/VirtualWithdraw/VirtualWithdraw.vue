<template>
  <div class="VirtualWithdraw-content">
    <HeadlineTitle class="general-box-padding" :leftTitle="$t('Wletter.tip108')"></HeadlineTitle>
    <div class="general-box-padding">
      <div class="VirtualWithdraw-content-addBank">
        <div class="VirtualWithdraw-content-addBank-item" @click="onClickBankCardPopup">
          <div class="VirtualWithdraw-content-addBank-item-left" v-if="isBankShow">
            <div class="VirtualWithdraw-content-addBank-item-left-virtual">
              <img :src="recharge4" class="imgs" />
              <div class="title">{{ addVirtualInfo.alias }}</div>
              <div class="protocol">{{ addVirtualInfo.protocol }}</div>
              <div>
                {{ addVirtualInfo.addr.substr(0, 6) }}****{{ addVirtualInfo.addr.substr(-6) }}
              </div>
            </div>
          </div>
          <div class="VirtualWithdraw-content-addBank-item-left" v-else>
            <div class="text">{{ $t('Wletter.tip109') }}</div>
          </div>
          <div class="VirtualWithdraw-content-addBank-item-right">
            <template v-if="isBankShow">
              <van-icon name="arrow" />
            </template>
            <template v-else>
              <img :src="bottomIcon" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <HeadlineTitle
      class="general-box-padding"
      style="margin-top: 20px"
      :leftTitle="$t('Wletter.WithdrawalAmount')"
    ></HeadlineTitle>
    <!-- 金额菜单 -->
    <DepositList
      :list="onCmputedWdChannelTypeListItem.quickAmount.split(',')"
      :depositListTab="depositListTab"
      @onClickChildTab="onClickChildTab"
      class="general-box-padding"
    ></DepositList>
    <template v-if="onCmputedWdChannelTypeListItem.isCustomizeInput == 1">
      <div class="general-box-padding">
        <DepositInput
          :placeholder="$t('Wletter.tip94')"
          :isInputLeft="true"
          :isInputImg="true"
          :itemObj="onCmputedWdChannelTypeListItem"
          :modelValue="virtualData.amount"
          @update:modelValue="updateCount"
          :clearable="true"
          :hasErrorTip="true"
          :types="'Number'"
        >
        </DepositInput>
      </div>
    </template>
    <div class="virtual-text general-box-padding">
      {{ $t('Wletter.tip110') }}<span>1 USDT = {{ rate }} {{ Currency }} </span>
    </div>
    <div class="virtual-texts general-box-padding">
      {{ $t('Wletter.Estimatedarrival') }}
      <span>{{ toFormatNumber(Number(onComputedCoin)) }}</span> USDT
    </div>
    <div class="general-box-padding">
      <WithdrawalMethod
        @checkValue="onCheckValue"
        :inputAmount="virtualData.amount"
        :large="wdChannelTypeListItem"
        :textDatas="props.textData"
      ></WithdrawalMethod>
    </div>

    <!-- 提示文本渲染 -->
    <div class="footer-text general-box-padding" v-if="props.hintData.wdInitContent">
      <p v-html="Base64.decode(props.hintData.wdInitContent)"></p>
    </div>
    <!-- 底部按钮 -->
    <BankCardFooter
      type="virtual"
      :virtualData="virtualData"
      :isACtiveShow="onComputedisACtiveShow"
    ></BankCardFooter>
    <!-- 选择提币地址弹出层 -->
    <VirtualPopup
      ref="virtualPopupDom"
      :currentType="'USDT'"
      @onClickConfirm="onBankChang"
    ></VirtualPopup>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import VirtualPopup from '../VirtualPopup/VirtualPopup'
import bottomIcon from './img/bottomIcon.png'
import DepositList from '../DepositList/DepositList'
import DepositInput from '../DepositInput/DepositInput'
import WithdrawalMethod from '../WithdrawalMethod/WithdrawalMethod'
import BankCardFooter from '../BankCardFooter/BankCardFooter'
import { Base64 } from 'js-base64'
import { getVirtualGetRate } from '@/api/recharge'
import { toFormatNumber } from '@/utils'
import recharge4 from './img/recharge4.png'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
onMounted(() => {
  getCoinList()
})

// 虚拟币汇率
const rate = ref(null)
// 获取币汇率
const getCoinList = () => {
  getVirtualGetRate('2', Currency.value).then((res) => {
    if (res.data) {
      rate.value = res.data.rate
      virtualData.rate = res.data.rate
    }
  })
}

const props = defineProps({
  wdChannelTypeListItem: {
    type: Object,
    default: () => {}
  },
  textData: {
    type: Object,
    default: () => {}
  },
  hintData: {
    type: Object,
    default: () => {}
  }
})

// 提现金额列表
const onCmputedWdChannelTypeListItem = computed(() => {
  return props.wdChannelTypeListItem
})

// 预计到账虚拟币钱
const onComputedCoin = computed(() => {
  if (Number(virtualData.amount)) {
    return Number(virtualData.amount) / rate.value
  }
  return 0
})

// 判断是否为银行卡进行显示
const isBankShow = ref(false)
// 选中虚拟币信息信息
const addVirtualInfo = ref({})
// 提现方式
const checkValue = ref({})

// 底部按钮提交数据
const virtualData = reactive({
  amount: null,
  addrId: null,
  wdAmountType: '', // 提现金额类型(0普通提现 1大额提现)
  wdHours: 0,
  rate: null, // 汇率
  wdWayType: onCmputedWdChannelTypeListItem.value.wdWayType,
  largeWithdrawRatio: onCmputedWdChannelTypeListItem.value.largeWithdrawRatio
})
// 定义选择虚拟币
const virtualPopupDom = ref(null)
// 金额列表高亮默认为空
const depositListTab = ref(null)

// 选着提币地址
const onClickBankCardPopup = () => {
  virtualPopupDom.value.showhide('USDT')
}

// 底部高亮按钮
const onComputedisACtiveShow = computed(() => {
  if (isBankShow.value && addVirtualInfo.value.addr && virtualData.amount && checkValue.value.val) {
    return true
  }
  return false
})

// 输入金额返回的值
const updateCount = (val) => {
  // 根据输入值匹配数组索引实现高亮
  let index = onCmputedWdChannelTypeListItem.value.quickAmount.split(',').findIndex((item) => {
    return item === val
  })
  // 返回值匹配金额高亮的索引
  depositListTab.value = index
  virtualData.amount = val
}

// 提现金额切换值
const onClickChildTab = (item, index) => {
  depositListTab.value = index
  virtualData.amount = item
}

// 选择添加虚拟币地址信息
const onBankChang = (val) => {
  if (val.addr) {
    addVirtualInfo.value = val
    virtualData.addrId = val.id
    isBankShow.value = true
  } else {
    isBankShow.value = false
  }
}

// 提现现金额返回值
const onCheckValue = (val) => {
  if (val.name == 'ordinaryCheck') {
    virtualData.wdAmountType = '0'
    if (val.id == 1) {
      if (virtualData.amount > onCmputedWdChannelTypeListItem.value.normalMaxWd) {
        virtualData.amount = ''
        depositListTab.value = null
      }
    }
  } else {
    virtualData.wdAmountType = '1'
    if (val.id == 2) {
      if (
        virtualData.amount < onCmputedWdChannelTypeListItem.value.normalMaxWd &&
        virtualData.amount < onCmputedWdChannelTypeListItem.value.largeMinWd
      ) {
        virtualData.amount = ''
        depositListTab.value = null
      }
    }
  }
  checkValue.value = val
}
</script>
<style lang="scss" scoped>
.VirtualWithdraw-content {
  padding-bottom: 112px;
  .general-box-padding {
    padding: 0 16px;
  }
  .VirtualWithdraw-content-addBank {
    width: 343px;
    border-radius: 6px;
    background: #f7f7f7;

    .VirtualWithdraw-content-addBank-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px !important;
      .VirtualWithdraw-content-addBank-item-left {
        display: flex;
        align-items: center;
        .img {
          width: 16px;
          height: 16px;
          margin: 0 8px 0 16px;
        }
        .title {
          color: #111;
          font-size: 13px;
        }
        .imgs {
          width: 24px;
          height: 24px;
          margin: 0 8px 0 16px;
        }
        .text {
          color: #999;
          font-size: 16px;
          margin-left: 16px;
        }
        .VirtualWithdraw-content-addBank-item-left-virtual {
          width: 100%;
          display: flex;
          align-items: center;
          color: #111;
          font-size: 12px;
          .imgs {
            width: 24px;
            height: 24px;
            margin: 0 8px 0 16px;
          }
          .title {
            width: 60px;
          }
          .protocol {
            color: #666;
            margin-left: 50px;
            margin-right: 10px;
          }
        }
      }
      .VirtualWithdraw-content-addBank-item-right {
        width: 16px;
        // height: 16px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .VirtualWithdraw-content-addBank-item:nth-child(1) {
      border-bottom: 1px solid #eee;
      height: 32px;
    }
  }

  .icon-left {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    color: var(--gray-9, #999);
  }

  .errorMsg {
    color: var(--1, #f53f3f);
    font-size: 12px;
    font-weight: 400;
    margin-top: 8px;
  }

  .virtual-text {
    color: #999;
    font-size: 12px;
    font-weight: 400;
    span {
      color: #111;
    }
  }
  .virtual-texts {
    color: #999;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 400;
    span {
      color: #ff5000;
    }
  }
  .footer-text {
    width: 344px;
    height: 120px;
    overflow: scroll;
    word-wrap: break-word;
    line-height: 20px;
    margin: 10px auto 0;
  }
}
</style>
