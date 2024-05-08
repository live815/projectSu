<template>
  <!-- 选择银行卡 -->
  <div class="select-bank-card">
    <div class="bank-card">
      <div><img src="../img//Rectangle22464.png" /></div>
      <div>{{ $t('DepositWithdraw.SelectBankCard') }}</div>
    </div>
    <div class="add-bank">
      <div class="choose-bank">
        <div><img src="../img/bank_logo.png" /></div>
        <div>
          {{
            addBnakInfo?.bankname
              ? $t('DepositWithdraw.Depositbankcard')
              : $t('DepositWithdraw.ChooseYourBank')
          }}
        </div>
      </div>
      <div class="select-bank" @click="onClickBankCard">
        <div class="select-bank-img" v-if="addBnakInfo?.bankname">
          <img :src="getImgUrl(addBnakInfo.icon)" />
          <div class="titles">{{ addBnakInfo.bankname }}</div>
          <div>({{ $t('DepositWithdraw.Tailnumber') }}{{ addBnakInfo.cardNo.substr(-4) }})</div>
        </div>
        <div v-else class="title">{{ $t('DepositWithdraw.Pleaseaddbankcardfirst') }}</div>

        <img src="../img/bottomIcon.png" class="icon" />
      </div>
      <div class="select-bottom" v-show="isBankShowCard">
        <div class="select-bottom-top">{{ listData.length }}/10</div>
        <div class="select-bottom-min">
          <div
            class="select-bottom-min-item"
            v-for="(item, index) in listData"
            :key="index"
            :class="{ active: activeIndex === index, 'disabled-color': item.status == 1 }"
            @click="selectBank(item, index)"
          >
            <div class="select-bottom-min-item-left">
              <img :src="getImgUrl(item.icon)" class="img" />
              <div>{{ item.bankname }}</div>
              <div>({{ $t('DepositWithdraw.Tailnumber') }}{{ item.cardNo.substr(-4) }})</div>
            </div>
            <div v-if="item.status == 1" class="select-bottom-min-item-right">
              {{ $t('DepositWithdraw.Disabled') }}
            </div>
            <div
              v-if="item.statue !== 1 && activeIndex === index"
              class="select-bottom-min-item-right"
            >
              <img src="../img/checkIcon.png" />
            </div>
          </div>
        </div>
        <div class="select-bottom-footer" v-if="listData.length < 10" @click="onClickAddBank">
          + {{ $t('DepositWithdraw.Addbankcard') }}
        </div>
      </div>
    </div>
  </div>
  <!-- 提现金额 -->
  <div class="amount-module">
    <div class="withdrawal-amount">
      <div><img src="../img/Rectangle22464.png" /></div>
      <div>{{ $t('DepositWithdraw.WithdrawalAmount') }}</div>
    </div>
    <div class="amount-selection">
      <DepositList
        :list="onCmputedWdChannelTypeListItem.quickAmount.split(',')"
        :depositListTab="depositListTab"
        @onClickChildTab="onClickChildTab"
      ></DepositList>
    </div>
    <div class="deposit-amount" v-if="onCmputedWdChannelTypeListItem.isCustomizeInput == 1">
      <DepositInput
        :placeholder="$t('DepositWithdraw.Pleaseenterthewithdrawalamount')"
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
  </div>
  <!-- 选择预约时间 -->
  <div class="appointment" v-if="onCmputedWdChannelTypeListItem?.wdAppointmentList">
    <div class="appointment-one">
      <div class="appointment-flex">
        <div><img src="../img/Rectangle22464.png" /></div>
        <div>{{ $t('DepositWithdraw.WithdrawalTips_1') }}</div>
      </div>
      <div class="instructions" @click="appointmentButton = true">
        {{ $t('DepositWithdraw.WithdrawalTips_2') }}
      </div>
    </div>
    <div class="time-selection">
      <PromptDescription
        :wdAppointmentList="onCmputedWdChannelTypeListItem.wdAppointmentList"
        @Current="onCurrentValue"
      ></PromptDescription>
    </div>
  </div>
  <!-- 提现方式 -->
  <div class="method">
    <div class="withdrawal-metho">
      <div class="method-flex">
        <div><img src="../img/Rectangle22464.png" /></div>
        <div>{{ $t('DepositWithdraw.WithdrawalMthod') }}</div>
      </div>
      <div class="free-times" @click="freeWdTimesButton = true">
        {{ $t('DepositWithdraw.WithdrawalTips_3') }}
      </div>
    </div>
    <div class="select-method">
      <WithdrawalMethod
        @checkValue="onCheckValue"
        :inputAmount="bankCardDate.amount"
        :large="wdChannelTypeListItem"
      ></WithdrawalMethod>
    </div>
  </div>
  <div class="confirm-arrival" v-if="props.hintData.wdInitContent">
    <p v-html="Base64.decode(props.hintData.wdInitContent)"></p>
  </div>
  <!-- 预约提现说明弹窗 -->
  <CustomizeDialog
    :dialogShow="appointmentButton"
    :width="480"
    :title="$t('DepositWithdraw.WithdrawalTips_2')"
    v-if="appointmentButton"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="description">
      <div class="description-box">
        <div class="popup-min" v-if="textData.wdAppointmentContent">
          <p v-html="Base64.decode(textData.wdAppointmentContent)"></p>
        </div>
      </div>
      <div class="description-four">
        <div class="description-five" @click="appointmentButton = false">
          {{ $t('DepositWithdraw.Isee') }}
        </div>
      </div>
    </div>
  </CustomizeDialog>
  <!-- 如何获得免费次数弹窗 -->
  <CustomizeDialog
    :dialogShow="freeWdTimesButton"
    :width="480"
    :title="$t('DepositWithdraw.WithdrawalTips_2')"
    v-if="freeWdTimesButton"
    :alignCenter="true"
    @closeBtn="closeBtns"
  >
    <div class="description">
      <div class="description-box">
        <div class="popup-min" v-if="textData.freeWdTimesContent">
          <p v-html="Base64.decode(textData.freeWdTimesContent)"></p>
        </div>
      </div>
      <div class="description-four">
        <div class="description-five" @click="freeWdTimesButton = false">
          {{ $t('DepositWithdraw.Isee') }}
        </div>
      </div>
    </div>
  </CustomizeDialog>
  <!-- 提现确认弹窗 -->
  <WithdrawalConfirmation></WithdrawalConfirmation>
</template>

<script setup>
import { Base64 } from 'js-base64'
import { getBankList } from '@/api/bindInfo'
import DepositList from '../components/DepositList'
import DepositInput from '../components/DepositInput'
import PromptDescription from '../components/PromptDescription'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import WithdrawalConfirmation from '../components/WithdrawalConfirmation'
import { getImgUrl } from '@/utils'
import { useWithdrawStore } from '@/stores/withdraw'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import eventBus from '@/utils/eventBus'
const router = useRouter()
const withdrawStore = useWithdrawStore()
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

onMounted(() => {
  getList()
})
// 添加银行卡
const onClickAddBank = () => {
  const params = {
    isOpen: false
  }
  eventBus.emit('showCharge', params)
  router.push('/personal/6')
}

// 到账银行卡选择器卡片
const isBankShowCard = ref(false)
// 点击银行卡卡片
const onClickBankCard = () => {
  isBankShowCard.value = !isBankShowCard.value
}

// 高亮项
const activeIndex = ref(null)
// 选中预约时间
const tagId = ref({})
// 提现方式
const checkValue = ref({})
// 银行卡列表数据
const listData = ref([])
const getList = () => {
  // 获取银行卡列表
  getBankList().then((res) => {
    listData.value = res.data || []
  })
}

// 点击银行卡信息
const addBnakInfo = ref({})
// 点击当前项
const selectBank = (item, index) => {
  if (item.status === 1) {
    return // 不执行后续操作
  }
  activeIndex.value = index
  isBankShowCard.value = false
  bankCardDate.cardId = item.id
  addBnakInfo.value = { ...item }
}

// 提现金额列表
const onCmputedWdChannelTypeListItem = computed(() => {
  return props.wdChannelTypeListItem
})
// 底部提交信息
const bankCardDate = reactive({
  amount: null,
  cardId: null,
  wdAmountType: '0',
  wdHours: null,
  wdWayType: onCmputedWdChannelTypeListItem.value.wdWayType,
  largeWithdrawRatio: onCmputedWdChannelTypeListItem.value.largeWithdrawRatio,
  type: onCmputedWdChannelTypeListItem.value.wdWayType
})
// 金额列表高亮默认为空
const depositListTab = ref(null)
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

const appointmentButton = ref(false)
// 关闭预约说明弹窗
const closeBtn = () => {
  appointmentButton.value = false
}

const freeWdTimesButton = ref(false)
// 关闭提现次数弹窗
const closeBtns = () => {
  freeWdTimesButton.value = false
}

watchEffect(() => {
  withdrawStore.getSubmitInformation(bankCardDate)
})
</script>
<style lang='scss' scoped>
.select-bank-card {
  margin-top: 25px;
  .bank-card {
    display: flex;
    div:nth-child(2) {
      color: var(--100, #fff);

      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      margin-left: 8px;
    }
  }
  .add-bank {
    position: relative;
    margin-top: 15px;
    border-radius: 6px;
    height: 72px;
    background: var(--unnamed, #171a2f);
    .choose-bank {
      display: flex;
      gap: 8px;
      padding-top: 12px;
      padding-left: 16px;
      div:nth-child(2) {
        color: var(--40, rgba(255, 255, 255, 0.4));

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 133.333% */
      }
    }
    .select-bank {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      .title {
        margin-left: 15px;
      }
      .select-bank-img {
        display: flex;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
          margin: 0 15px;
        }
        .titles {
          color: var(--100, #fff);
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          margin-right: 5px;
        }
      }
      .icon {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
    }
    .select-bottom {
      position: absolute;
      bottom: -250px;
      width: 100%;
      height: 250px;
      background: #1d223c;
      z-index: 1;
      .select-bottom-top {
        width: 100%;
        height: 32px;
        line-height: 32px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-weight: 400;
        margin-left: 20px;
      }
      .select-bottom-min {
        max-height: 170px;
        overflow: scroll;

        .select-bottom-min-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          margin: 1px 0;
          .select-bottom-min-item-left {
            display: flex;
            align-items: center;
            color: var(--60, rgba(255, 255, 255, 0.6));
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            margin-left: 20px;
            .img {
              width: 16px;
              height: 16px;
              margin-right: 20px;
            }
          }
          .select-bottom-min-item-right {
            margin-right: 30px;
            color: var(--1, #f53f3f);
            font-size: 14px;
            font-weight: 600;
            img {
              width: 16px;
              height: 12px;
            }
          }
        }
        .active {
          background: #171a2f;
        }
        .disabled-color {
          background-color: #999;
        }
      }
      .select-bottom-footer {
        height: 48px;
        color: var(--unnamed, #f35f1b);
        font-size: 14px;
        font-style: normal;
        line-height: 48px;
        margin-left: 20px;
      }
    }
  }
}
.amount-module {
  .withdrawal-amount {
    display: flex;
    gap: 8px;
    margin-top: 25px;
    div:nth-child(2) {
      color: var(--100, #fff);

      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px; /* 100% */
    }
  }
  .amount-selection {
    margin-top: 20px;
  }
  .deposit-amount {
    display: flex;
    margin-top: 20px;
    width: 660px;
    height: 48px;
    border-radius: 6px;
    background: var(--unnamed, #171a2f);
  }
}
.appointment {
  margin-top: 25px;
  position: relative;
  .appointment-one {
    display: flex;
    .appointment-flex {
      display: flex;
      gap: 8px;
      div:nth-child(2) {
        color: var(--100, #fff);

        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px; /* 100% */
      }
    }
    .instructions {
      margin-left: auto;
      color: var(--unnamed, #409eff);

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
      cursor: pointer;
    }
  }
  .time-selection {
    width: 100%;
  }
}
//提现方式
.method {
  .withdrawal-metho {
    display: flex;
    margin-top: 25px;
    .method-flex {
      display: flex;
      gap: 8px;
      div:nth-child(2) {
        color: var(--100, #fff);

        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px; /* 100% */
      }
    }
    .free-times {
      margin-left: auto;
      color: var(--unnamed, #409eff);

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
      cursor: pointer;
    }
  }
  .select-method {
    margin-top: 15px;
    .ordinary-withdrawal {
      height: 60px;
      background: #1d223c;
      padding: 12px;
      border-radius: 8px;
    }
    .large-withdrawals {
      height: 80px;
      background: #1d223c;
      margin-top: 12px;
      padding: 12px;
      border-radius: 8px;
    }
    .select-flex {
      display: flex;
      gap: 8px;
      input {
        width: 16px;
        height: 16px;
      }
      .orange {
        color: var(--unnamed, #f35f1b);

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px; /* 100% */
      }
      .blue {
        color: var(--unnamed, #67c23a);

        font-size: 11px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px;
      }
      .select {
        color: var(--100, #fff);

        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 114.286% */
      }
      .select-one {
        color: var(--60, rgba(255, 255, 255, 0.6));

        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 100% */
      }
    }
  }
}
//
.confirm-arrival {
  width: 660px;
  height: 280px;
  overflow: scroll;
  background-color: #171a2f !important;
  border-radius: 8px;
  color: var(--60, rgba(255, 255, 255, 0.6)) !important;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  margin: 20px auto;
  padding: 25px;
}
:deep() {
  .el-dialog__header {
    padding: 12px 20px 12px 20px !important;
    margin-right: 0px !important;
    border-radius: 8px 8px 0px 0px !important;
    background: var(--unnamed, #323c6f) !important;
  }
}
.description {
  color: var(--100, #fff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin: 25px;
  .description-box {
    max-height: 190px;
    overflow: scroll;
  }
  .description-one,
  .description-two {
    margin-bottom: 25px;
  }
  .description-three {
    div:nth-child(1) {
      color: var(--1, #f53f3f);
    }
  }
  .description-four {
    margin: 0 auto;
    width: 160px;
    border-radius: 4px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    cursor: pointer;
    .description-five {
      margin-top: 25px;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>