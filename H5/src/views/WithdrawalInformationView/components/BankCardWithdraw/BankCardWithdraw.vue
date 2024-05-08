<template>
  <HeaderStep
    :setpListData="onComputedStepListData"
    :bankWithdrawInfo="onComputedBankWithdrawInfo"
    :bankPage="true"
    :active="active"
  ></HeaderStep>
  <div class="bankCardWithdraw-min">
    <div class="bankCardWithdraw-min-title">{{ $t('Wletter.orderinformat') }}</div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Withdrawaltype') }}</div>
      <div class="bankCardWithdraw-min-item-right">
        {{ onComputedBankWithdrawInfo.wdWayTypeName }}
      </div>
    </div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Withdrawalmethod') }}</div>
      <div class="bankCardWithdraw-min-item-right">{{ onComputedBankWithdrawInfo.wdTypeName }}</div>
    </div>
    <div
      class="bankCardWithdraw-min-item"
      v-if="
        onComputedBankWithdrawInfo?.wdWayType == '0' || onComputedBankWithdrawInfo?.wdWayType == '1'
      "
    >
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Cashcardnumber') }}</div>
      <div class="bankCardWithdraw-min-item-right" v-if="onComputedBankWithdrawInfo?.cardNo">
        {{ onComputedBankWithdrawInfo.bankName }}({{
          onComputedBankWithdrawInfo?.cardNo.substr(-4)
        }})
      </div>
    </div>
    <div class="bankCardWithdraw-min-item" v-else>
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Withdrawaladdress') }}</div>
      <div class="bankCardWithdraw-min-item-right" v-if="onComputedBankWithdrawInfo?.tradeAddr">
        {{ onComputedBankWithdrawInfo?.tradeAddr.substr(0, 6) }}****{{
          onComputedBankWithdrawInfo?.tradeAddr.substr(-6)
        }}
      </div>
    </div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Appointmenttype') }}</div>
      <div
        class="bankCardWithdraw-min-item-right"
        v-if="onComputedBankWithdrawInfo.appmentHours > 0"
      >
        {{ $t('Wletter.tip66', { num: onComputedBankWithdrawInfo.appmentHours }) }}
      </div>
      <div class="bankCardWithdraw-min-item-right" v-else>{{ $t('Wletter.immediate') }}</div>
    </div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Extraamount') }}</div>
      <div class="bankCardWithdraw-min-item-right">
        {{ toFormatNumber(Number(onComputedBankWithdrawInfo.addBonus)) }}
      </div>
    </div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.handlfee') }}</div>
      <div class="bankCardWithdraw-min-item-right">
        {{
          Number(onComputedBankWithdrawInfo.wdFee) > 0
            ? toFormatNumber(Number(onComputedBankWithdrawInfo.wdFee))
            : 0
        }}
      </div>
    </div>
    <div class="bankCardWithdraw-min-item" v-if="onComputedBankWithdrawInfo.splitFlag != 1">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.ordernumber1') }}</div>
      <div class="bankCardWithdraw-min-item-right">
        <div>{{ onComputedBankWithdrawInfo.orderNo }}</div>
        <div v-clipboard="onComputedBankWithdrawInfo.orderNo" class="copy-btn">
          {{ $t('Wletter.copy') }}
        </div>
      </div>
    </div>
    <div class="bankCardWithdraw-min-item">
      <div class="bankCardWithdraw-min-item-left">{{ $t('Wletter.Withdrawaltime') }}</div>
      <div class="bankCardWithdraw-min-item-right">{{ onComputedBankWithdrawInfo.createTime }}</div>
    </div>
    <template
      v-if="
        onComputedBankWithdrawInfo.isC2c == 1 &&
        onComputedBankWithdrawInfo.splitFlag == 0 &&
        active == 2
      "
    >
      <div class="bankCardWithdraw-min-btn" @click="onClickOpenPopup">
        {{ isGivingAway ? $t('Wletter.tip67') : $t('Wletter.tip68') }}
      </div>
      <div class="bankCardWithdraw-min-footer" @click="openCustomerServiceLink">
        {{ $t('Wletter.tip69') }}
      </div>
    </template>
  </div>
  <div class="bankCardWithdraw-min-splitFlag" v-if="onComputedBankWithdrawInfo.splitFlag == 1">
    <div class="bankCardWithdraw-min-splitFlag-top">
      <span class="icon"
        ><van-icon style="font-size: 16px !important" name="warning" color="#F53F3F"
      /></span>
      <span
        v-html="
          $t('Wletter.tip126', {
            splitCount: onComputedBankWithdrawInfo.splitCount
          })
        "
      ></span>
    </div>
    <template v-if="onComputedBankWithdrawInfo.subOrderList">
      <div
        class="bankCardWithdraw-min-splitFlag-item"
        v-for="(items, index) in data.onComputedSubOrderList"
        :key="index"
      >
        <div class="title">{{ $t('Wletter.tip127') }}({{ index + 1 }})</div>
        <div class="min">
          <div class="left">
            <div><CurrencyUnit class="currency" />{{ items.subOrderAmount }}</div>
            <div
              class="text"
              v-if="items.transOrderStatus == 0"
              @click="onHandleClickStatus(items, index)"
            >
              {{ $t('Wletter.tip128') }}<span class="icon"><van-icon name="arrow-up" /></span>
            </div>
            <div
              class="text"
              v-if="items.transOrderStatus == 1"
              @click="onHandleClickStatus(items, index)"
            >
              {{ $t('Wletter.tip129') }}<span class="icon"><van-icon name="arrow-up" /></span>
            </div>
            <div
              class="text error"
              v-if="items.transOrderStatus == 2"
              @click="onHandleClickStatus(items, index)"
            >
              {{ $t('Wletter.tip130') }}<span class="icon"><van-icon name="arrow-up" /></span>
            </div>
          </div>
          <div
            class="right"
            v-if="items.transOrderStatus == 0 && items.orderStatus == 4"
            @click="onClickConfirmOrder(items)"
          >
            {{ $t('Wletter.tip131') }}
          </div>
          <div class="rights" v-if="items.transOrderStatus == 1">
            {{ $t('Wletter.tip132') }}
          </div>
          <div class="rights" v-if="items.transOrderStatus == 2">
            {{ $t('Wletter.tip130') }}
          </div>
        </div>
        <div class="footer" :class="{ hidden: !items.isStatus }" v-show="items.isStatus">
          <div class="footer-item">
            <div class="footer-left">{{ $t('Wletter.ordernumber1') }}</div>
            <div class="footer-right">
              <span>{{ items.subOrderNo }}</span>
              <span class="copy-btn" v-clipboard="items.subOrderNo">{{ $t('Wletter.copy') }}</span>
            </div>
          </div>
          <div class="footer-item">
            <div class="footer-left">{{ $t('Wletter.Withdrawaltime') }}</div>
            <div class="footer-right">
              <span>{{ items.createTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <!-- <div class="bankCardWithdraw-footer" v-if="!isBankCTwoC">
    <div class="bankCardWithdraw-footer-title">{{ $t('Wletter.Kindtips') }}</div>
    <div class="bankCardWithdraw-footer-text">
      {{ $t('Wletter.tip70') }}
    </div>
    <div class="bankCardWithdraw-footer-text">
      {{ $t('Wletter.tip71') }}
    </div>
    <div class="bankCardWithdraw-footer-text" @click="openCustomerServiceLink">
      {{ $t('Wletter.tip72') }}
    </div>
  </div> -->

  <!-- 资金到账弹窗 -->
  <CapitalPopup ref="capitalPopupDom" @paySuccess="paySuccess"></CapitalPopup>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive } from 'vue'
import HeaderStep from '../HeaderStep/HeaderStep'
import vClipboard from '@/directives/clipboard.js'
import CapitalPopup from '../CapitalPopup/CapitalPopup'
import { getWithdrawOrderNoStatus, getWithdrawOrderNo } from '@/api/withdraw'
import { toFormatNumber } from '@/utils'
import { useRouter } from 'vue-router'
import { openCustomerServiceLink } from '@/utils/customerService'
import i18n from '@/i18n'

const router = useRouter()

const props = defineProps({
  bankWithdrawInfo: {
    type: Object,
    default: () => {}
  }
})

// 顶部步骤条 默认到第一步
const active = ref(0)
// 银行卡提现信息
const onComputedBankWithdrawInfo = computed(() => {
  return props.bankWithdrawInfo
})

// 提现拆单子单列表
const onComputedSubOrderList = computed(() => {
  const bankWithdrawInfo = onComputedBankWithdrawInfo.value
  const subOrderList = bankWithdrawInfo ? bankWithdrawInfo.subOrderList : null

  let updatedSubOrderList = subOrderList ? subOrderList.map((item) => ({ ...item })) : []

  if (updatedSubOrderList) {
    updatedSubOrderList.forEach((item) => {
      item.isStatus = true
    })
  }
  return updatedSubOrderList
})

// 定义资金到账弹窗
const capitalPopupDom = ref(null)
// 是否有赠送
const isGivingAway = ref(false)

const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('Wletter.tip73')
  },
  {
    id: 2,
    name: i18n.global.t('Wletter.tip74')
  },
  {
    id: 3,
    name: i18n.global.t('Wletter.tip75')
  }
])
// 定义顶部状态 判断是否为银行卡
const onComputedStepListData = computed(() => {
  // 创建一个新的数组副本
  let updatedStepListData = stepListData.map((item) => ({ ...item }))
  if (
    onComputedBankWithdrawInfo.value.splitFlag == 1 ||
    onComputedBankWithdrawInfo.value.isC2c == 1
  ) {
    updatedStepListData.forEach((item, index) => {
      if (index == 2) {
        item.name = i18n.global.t('Wletter.tip125')
      }
    })
    const newItem = {
      id: 4,
      name: i18n.global.t('Wletter.tip75')
    }
    updatedStepListData.push(newItem)
    return updatedStepListData
  }
  return updatedStepListData
})

// 确认收款弹窗
const onClickOpenPopup = () => {
  capitalPopupDom.value.showhide(onComputedBankWithdrawInfo.value.orderNo)
}

// 定时器轮询接口
let timer

// 开始定时器轮询
const startPolling = () => {
  timer = setInterval(() => {
    callApi() // 调用接口
  }, 1000 * 10)
}

const stopPolling = () => {
  clearInterval(timer)
}

const callApi = async () => {
  try {
    const res = await getWithdrawOrderNoStatus(onComputedBankWithdrawInfo.value.orderNo) // 替换为你的接口地址
    const orderStatus = res.data.orderStatus
    if (orderStatus == 0 || orderStatus == 1) {
      active.value = orderStatus
    } else if (orderStatus == 4) {
      active.value = 2
      // 订单轮询 如果有子菜单 才会取查数据
      if (res.data.subOrderStatusList?.length >= 2) {
        const subOrderStatusList = res.data.subOrderStatusList
        for (let i = 0; i < data.onComputedSubOrderList.length; i++) {
          const subOrder = data.onComputedSubOrderList[i]
          const matchOrder = subOrderStatusList.find(
            (order) => order.orderNo === subOrder.subOrderNo
          )
          if (matchOrder) {
            subOrder.isStatus = true
            subOrder.orderStatus = matchOrder.orderStatus
            subOrder.transOrderStatus = matchOrder.transOrderStatus
          }
        }
      }
    } else if (orderStatus == 2 || orderStatus == 3) {
      router.push('/')
    }
  } catch (error) {
    console.error('API request error:', error)
  }
}

// 在组件挂载时启动轮询
onMounted(() => {
  callApi()
  // 将 onComputedSubOrderList 的响应式对象存储到 data 中
  nextTick(() => {
    data.onComputedSubOrderList = onComputedSubOrderList.value
  })
  startPolling()
})

// 在组件销毁前停止轮询
onUnmounted(stopPolling)

// 更新数据
const updateData = () => {
  getWithdrawOrderNo({ orderNo: onComputedSubOrderList.value.orderNo }).then((res) => {
    data.onComputedSubOrderList = res.data.subOrderList || []
  })
}

const data = reactive({
  onComputedSubOrderList: []
})

// 点击当前状态
const onHandleClickStatus = (items, index) => {
  data.onComputedSubOrderList[index].isStatus = !items.isStatus
}

// 确认收款
const onClickConfirmOrder = (item) => {
  capitalPopupDom.value.showhide(item.subOrderNo)
}

// 确认收款成功
const paySuccess = () => {
  updateData()
  // setTimeout(() => {
  //   showNotify({ type: 'success', message: '提现成功' })
  // }, 1000)
}
</script>
<style lang="scss" scoped>
.bankCardWithdraw-min {
  width: 345px;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fff;
  .bankCardWithdraw-min-title {
    color: #111;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .bankCardWithdraw-min-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    .bankCardWithdraw-min-item-left {
      color: #666;
    }
    .bankCardWithdraw-min-item-right {
      display: flex;
      color: var(--gray-3, #333);
      .copy-btn {
        margin-left: 4px;
        color: var(--unnamed, var(--unnamed, #486bb2));
      }
    }
  }
  .bankCardWithdraw-min-btn {
    width: 315px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 16px;
    color: #fff;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .bankCardWithdraw-min-footer {
    color: #486bb2;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
  }
}
.bankCardWithdraw-footer {
  width: 345px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 10px 0;
  .bankCardWithdraw-footer-title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .bankCardWithdraw-footer-text {
    color: #666;
    text-align: justify;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px; /* 150% */
  }
}
.bankCardWithdraw-min-splitFlag {
  width: 345px;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fff;
  .bankCardWithdraw-min-splitFlag-top {
    width: 316px;
    padding: 8px 5px;
    border-radius: 12px;
    color: #111;
    font-size: 12px;
    background: var(---4, #ffece8);
    .icon {
      margin-right: 3px;
    }
  }
  .bankCardWithdraw-min-splitFlag-item {
    width: 311px;
    margin: 12px 0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    .title {
      color: #111;
      font-size: 14px;
      font-weight: 500;
    }
    .min {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0;
      .left {
        color: #111;
        font-family: DIN Alternate;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        .text {
          color: var(---1, #00b42a);
          font-size: 12px;
          margin-top: 6px;
          .icon {
            width: 12px;
            height: 12px;
            margin-left: 5px;
          }
        }
        .error {
          color: #f53f3f;
        }
      }
      .right,
      .rights {
        width: 96px;
        height: 36px;
        text-align: center;
        color: #666;
        line-height: 36px;
        font-size: 15px;
        border-radius: 46px;
      }
      .right {
        color: #fff;
        background: var(---1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      }
    }
    .footer {
      opacity: 1;
      transition-duration: 0.5s;
      &.hidden {
        opacity: 0;
      }
      .footer-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }
      .footer-left {
        color: #666;
        font-size: 14px;
      }
      .footer-right {
        color: #111;
        font-size: 13px;
        .copy-btn {
          color: var(---, var(---, #486bb2));
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
