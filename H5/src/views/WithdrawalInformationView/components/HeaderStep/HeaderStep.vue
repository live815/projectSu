<template>
  <div class="header-top">
    <van-steps :active="onComputedActive" active-icon="success" active-color="#07c160">
      <van-step v-for="(item, index) in onComputedStepList" :key="index">{{ item.name }}</van-step>
    </van-steps>
    <!-- <div class="header-text">当前确认已超时</div> -->
    <div class="header-top-title">{{ $t('Wletter.WithdrawalAmount') }}</div>
    <template v-if="onComputedBankPage">
      <div class="header-top-bank">
        <span
          ><CurrencyUnit /> {{ toFormatNumber(Number(onComputedBankWithdrawInfo.amount)) }}</span
        >
      </div>
      <div class="header-top-bank-text">
        <span>{{ $t('Wletter.Actualarrival') }}: </span>
        <span><CurrencyUnit />{{ toFormatNumber(onComputedTotal) }}</span>
      </div>
      <div class="header-top-bank-msg" :class="{ 'header-top-bank-height': onComputedActive == 0 }">
        <div class="header-top-msg-text" v-if="onComputedActive == 0">
          {{ $t('Wletter.tip80') }}
        </div>
        <div class="header-top-msg-text" v-if="onComputedActive == 1">
          {{ $t('Wletter.tip81') }}
        </div>
        <div class="header-top-bank-msg-text" v-if="onComputedActive == 2">
          请核实您的收款账户，确认资金到账无误，再点击下方<span>【确认收款】</span>按钮
        </div>
      </div>
    </template>
    <template v-else>
      <div class="header-top-virtual">
        <span>{{ toFormatNumber(Number(onComputedBankWithdrawInfo.amount)) }}</span>
        <span>{{ Currency }}</span>
      </div>
      <div class="header-top-virtual-text">
        <span v-html="$t('Wletter.tip82', { num: toFormatNumber(onComputedUsdt) })"></span>
      </div>
      <div class="header-top-virtual-title">
        ( {{ $t('Rletter.rlettertip38') }} 1USDT = {{ rate }}{{ Currency }} )
      </div>
      <div class="header-top-virtual-msg">
        <div class="header-top-virtual-msg-text">
          <div>
            {{ $t('Wletter.tip84') }}<span class="span">{{ $t('Wletter.tip85') }}</span
            >。
          </div>
          <div>({{ $t('Wletter.tip86') }})</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { toFormatNumber } from '@/utils'
import { getVirtualGetRate } from '@/api/recharge'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
onMounted(() => {
  getCoinList()
})

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
  return (
    (onComputedBankWithdrawInfo.value.amount - onComputedBankWithdrawInfo.value.wdFee) / rate.value
  )
})

const props = defineProps({
  setpListData: {
    type: Array,
    default: () => []
  },
  // 当前页是否为银行卡页面
  bankPage: {
    type: Boolean,
    default: false
  },
  sum: {
    type: String,
    default: ''
  },
  bankWithdrawInfo: {
    type: Object,
    default: () => {}
  },
  active: {
    type: Number,
    default: 0
  }
})

// 实际到账共计
const onComputedTotal = computed(() => {
  return (
    Number(onComputedBankWithdrawInfo.value.amount) - Number(onComputedBankWithdrawInfo.value.wdFee)
  )
})

// 步骤条当前高亮
const onComputedActive = computed(() => {
  return props.active
})
// 步骤条当前显示
const onComputedStepList = computed(() => {
  return props.setpListData
})

// 当前是否为银行卡
const onComputedBankPage = computed(() => {
  return props.bankPage
})

// 提现信息数据
const onComputedBankWithdrawInfo = computed(() => {
  return props.bankWithdrawInfo
})
</script>
<style lang="scss" scoped>
.header-top {
  width: 345px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  .header-text {
    color: var(--1, #f53f3f);
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
  }
  .header-top-title {
    color: #111;
    text-align: center;
    font-size: 15px;
    font-weight: 400;
    margin: 20px 0;
  }
  .header-top-bank {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #111;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      margin-right: 7px;
    }
  }
  .header-top-bank-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    > :first-child {
      color: #111;
      font-size: 14px;
      font-weight: 400;
      margin-right: 4px;
    }
    > :last-child {
      color: var(--1, #f53f3f);
      font-size: 14px;
      font-weight: 700;
    }
  }

  .header-top-bank-msg {
    width: 278px;
    height: 48px;
    margin: 12px auto 15px;
    padding: 8px 12px;
    border-radius: 10px;
    background: var(--fill-2, #f7f7f7);
    .header-top-msg-text {
      color: var(--999, #999);
      text-align: center;
      line-height: 16px;
      font-size: 12px;
    }
    .header-top-bank-msg-text {
      color: var(--999, #999);
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      span {
        color: var(--2, #ff5000);
      }
    }
  }
  .header-top-bank-height {
    min-height: 32px;
  }

  .header-top-virtual {
    display: flex;
    justify-content: center;
    align-items: center;
    > :first-child {
      color: #111;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      margin-right: 8px;
    }
    > :last-child {
      color: #111;
      font-size: 16px;
    }
  }
  .header-top-virtual-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0 8px 0;
    > :first-child {
      color: #111;
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
    color: #999;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .header-top-virtual-msg {
    width: 278px;
    height: 48px;
    margin: 12px auto 15px;
    padding: 8px 12px;
    border-radius: 10px;
    background: var(--fill-2, #f7f7f7);
    .header-top-virtual-msg-text {
      color: var(--999, #999);
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      white-space: nowrap;
      .span {
        color: var(--2, #ff5000);
      }
    }
  }
}
:deep().van-icon-success:before {
  font-size: 16px;
}
:deep().van-step__circle {
  width: 6px;
  height: 6px;
}
</style>
