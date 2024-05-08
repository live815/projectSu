<template>
  <div class="bankCardWithdraw-content">
    <HeadlineTitle
      class="general-box-padding"
      :leftTitle="$t('Wletter.Selectbankcard')"
    ></HeadlineTitle>
    <div class="general-box-padding">
      <div class="bankCardWithdraw-content-addBank">
        <div class="bankCardWithdraw-content-addBank-item">
          <div class="bankCardWithdraw-content-addBank-item-left">
            <img class="img" :src="cardIcon" />
            <div class="title">
              {{ isBankShow ? $t('Wletter.Depositsbankcard') : $t('Wletter.Chooseyourbank') }}
            </div>
          </div>
          <div class="bankCardWithdraw-content-addBank-item-right"></div>
        </div>
        <div class="bankCardWithdraw-content-addBank-item" @click="onClickBankCardPopup">
          <div class="bankCardWithdraw-content-addBank-item-left" v-if="isBankShow">
            <img class="imgs" :src="getImg(addBnakInfo.icon)" />
            <div class="texts">{{ addBnakInfo.bankname }}</div>
          </div>
          <div class="bankCardWithdraw-content-addBank-item-left" v-else>
            <div class="text">{{ $t('Wletter.tip93') }}</div>
          </div>
          <div class="bankCardWithdraw-content-addBank-item-right">
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
          :modelValue="bankCardDate.amount"
          @update:modelValue="updateCount"
          :clearable="true"
          :hasErrorTip="true"
          :types="'Number'"
        >
        </DepositInput>
      </div>
    </template>
    <div class="general-box-padding" v-if="onCmputedWdChannelTypeListItem.wdAppointmentList">
      <PromptDescription
        :wdAppointmentList="onCmputedWdChannelTypeListItem.wdAppointmentList"
        @Current="onCurrentValue"
        :textData="props.textData"
      ></PromptDescription>
    </div>
    <!-- 提现方式 -->
    <div class="general-box-padding">
      <WithdrawalMethod
        @checkValue="onCheckValue"
        :inputAmount="bankCardDate.amount"
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
      :isACtiveShow="oncomputedisACtiveShow"
      :bankCardDate="bankCardDate"
    ></BankCardFooter>
    <!-- 选择银行卡弹出层 -->
    <BankCardPopup ref="bankCardPopupDom" @onClickConfirm="onBankChang"></BankCardPopup>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import cardIcon from './img/cardIcon.png'
import bottomIcon from './img/bottomIcon.png'
import BankCardPopup from '../BankCardPopup/BankCardPopup'
import DepositList from '../DepositList/DepositList'
import DepositInput from '../DepositInput/DepositInput'
import PromptDescription from '../PromptDescription/PromptDescription'
import WithdrawalMethod from '../WithdrawalMethod/WithdrawalMethod'
import BankCardFooter from '../BankCardFooter/BankCardFooter'
import { getImg } from '@/utils'
import { Base64 } from 'js-base64'

const props = defineProps({
  bankCardList: {
    type: Array,
    default: () => []
  },
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

const isBankShow = ref(false)
// 选中银行信息
const addBnakInfo = ref({})
// 选中预约时间
const tagId = ref({})
// 提现方式
const checkValue = ref({})
// 定义选择银行卡
const bankCardPopupDom = ref(null)

const onClickBankCardPopup = () => {
  bankCardPopupDom.value.showhide()
}

const bankCardDate = reactive({
  amount: null,
  cardId: null,
  wdAmountType: '',
  wdHours: null,
  wdWayType: onCmputedWdChannelTypeListItem.value.wdWayType,
  largeWithdrawRatio: onCmputedWdChannelTypeListItem.value.largeWithdrawRatio
})
// 金额列表高亮默认为空
const depositListTab = ref(null)

// 底部按钮高亮
const oncomputedisACtiveShow = computed(() => {
  if (onCmputedWdChannelTypeListItem.value.wdAppointmentList) {
    if (
      isBankShow.value &&
      addBnakInfo.value.bankname &&
      bankCardDate.amount &&
      bankCardDate.wdHours &&
      checkValue.value.val
    ) {
      return true
    }
    return false
  } else {
    if (
      isBankShow.value &&
      addBnakInfo.value.bankname &&
      bankCardDate.amount &&
      checkValue.value.val
    ) {
      return true
    }
    return false
  }
})
// 提现金额切换值
const onClickChildTab = (item, index) => {
  depositListTab.value = index
  bankCardDate.amount = item
}
// 输入金额返回的值
const updateCount = (val) => {
  // 根据输入值匹配数组索引实现高亮
  let index = onCmputedWdChannelTypeListItem.value.quickAmount.split(',').findIndex((item) => {
    return item === val
  })
  // 返回值匹配金额高亮的索引
  depositListTab.value = index
  bankCardDate.amount = val
}

// 选择添加银行卡选项
const onBankChang = (val) => {
  if (val.bankname) {
    bankCardDate.cardId = val.id
    addBnakInfo.value = val
    isBankShow.value = true
  } else {
    isBankShow.value = false
  }
}

// 点击提现速度选择
const onCurrentValue = (val) => {
  tagId.value = val
  bankCardDate.wdHours = val.wdHours
}

// 提现复现金额返回值
const onCheckValue = (val) => {
  if (val.name == 'ordinaryCheck') {
    bankCardDate.wdAmountType = '0'
    if (val.id == 1) {
      if (bankCardDate.amount > onCmputedWdChannelTypeListItem.value.normalMaxWd) {
        bankCardDate.amount = ''
        depositListTab.value = null
      }
    }
  } else {
    bankCardDate.wdAmountType = '1'
    if (val.id == 2) {
      if (
        bankCardDate.amount < onCmputedWdChannelTypeListItem.value.normalMaxWd &&
        bankCardDate.amount < onCmputedWdChannelTypeListItem.value.largeMinWd
      ) {
        bankCardDate.amount = ''
        depositListTab.value = null
      }
    }
  }
  checkValue.value = val
}
</script>
<style lang="scss" scoped>
.bankCardWithdraw-content {
  padding-bottom: 112px;
  .general-box-padding {
    padding: 0 16px;
  }
  .bankCardWithdraw-content-addBank {
    width: 343px;
    border-radius: 8px;
    background: #f7f7f7;

    .bankCardWithdraw-content-addBank-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      .bankCardWithdraw-content-addBank-item-left {
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
        .texts {
          color: #111;
          font-size: 16px;
        }
      }
      .bankCardWithdraw-content-addBank-item-right {
        width: 16px;
        height: 16px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .bankCardWithdraw-content-addBank-item:nth-child(1) {
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
