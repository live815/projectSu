<template>
  <HeaderStep
    :setpListData="stepListData"
    :active="active"
    :bankWithdrawInfo="onComputedVirtualWithdrawInfo"
  ></HeaderStep>
  <div class="virtualWithdraw-min">
    <div class="virtualWithdraw-min-title">{{ $t('Wletter.orderinformat') }}</div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.Withdrawalmethod') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{ onComputedVirtualWithdrawInfo.wdTypeName }}
      </div>
    </div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.Withdrawaltype') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{ onComputedVirtualWithdrawInfo.wdWayTypeName }}
      </div>
    </div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.transactagree') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{ onComputedVirtualWithdrawInfo.tradeProtocol }}
      </div>
    </div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.Withdrawaladdress') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{ onComputedVirtualWithdrawInfo.tradeAddr.substr(0, 6) }}****{{
          onComputedVirtualWithdrawInfo.tradeAddr.substr(-6)
        }}
      </div>
    </div>
    <!-- <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">预约类型</div>
      <div
        class="virtualWithdraw-min-item-right"
        v-if="onComputedVirtualWithdrawInfo.appmentHours > 0"
      >
        0~{{ onComputedVirtualWithdrawInfo.appmentHours }}小时
      </div>
      <div class="virtualWithdraw-min-item-right" v-else>即时</div>
    </div> -->
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.handlfee') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{
          Number(onComputedVirtualWithdrawInfo.wdFee) > 0
            ? toFormatNumber(Number(onComputedVirtualWithdrawInfo.wdFee))
            : 0
        }}
      </div>
    </div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.ordernumber1') }}</div>
      <div class="virtualWithdraw-min-item-right">
        <div>{{ onComputedVirtualWithdrawInfo.orderNo }}</div>
        <div v-clipboard="onComputedVirtualWithdrawInfo.orderNo" class="copy-btn">
          {{ $t('Wletter.copy') }}
        </div>
      </div>
    </div>
    <div class="virtualWithdraw-min-item">
      <div class="virtualWithdraw-min-item-left">{{ $t('Wletter.Rechargetime') }}</div>
      <div class="virtualWithdraw-min-item-right">
        {{ onComputedVirtualWithdrawInfo.createTime }}
      </div>
    </div>
  </div>
  <div class="virtualWithdraw-footer" @click="openCustomerServiceLink">
    {{ $t('Wletter.tip87') }}
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import HeaderStep from '../HeaderStep/HeaderStep'
import vClipboard from '@/directives/clipboard.js'
import { getWithdrawOrderNoStatus } from '@/api/withdraw'
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
const active = ref(1)

// 虚拟币提现信息
const onComputedVirtualWithdrawInfo = computed(() => {
  return props.bankWithdrawInfo
})

const stepListData = reactive([
  {
    id: 1,
    name: i18n.global.t('Wletter.SubmitOrder')
  },
  {
    id: 2,
    name: i18n.global.t('Wletter.waitpayment')
  },
  {
    id: 3,
    name: i18n.global.t('Wletter.Withdrawalcomplet')
  }
])

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
    const res = await getWithdrawOrderNoStatus(onComputedVirtualWithdrawInfo.value.orderNo) // 替换为你的接口地址
    const { status } = res.data
    if (status == 4 || status == 7 || status == 9 || status == 12) {
      active.value = 2
      router.push('/withdraw')
    } else if (status == 0 || status == 1) {
      active.value = 0
    } else if (status == 2) {
      active.value = 0
      router.push('/withdraw')
    } else if (
      status == 3 ||
      status == 5 ||
      status == 6 ||
      status == 8 ||
      status == 10 ||
      status == 11 ||
      status == 13 ||
      status == 14 ||
      status == 15 ||
      status == 16
    ) {
      active.value = 1
    }
    // response.value = data // 更新接口返回结果
  } catch (error) {
    console.error('API request error:', error)
  }
}

// 在组件挂载时启动轮询
onMounted(() => {
  callApi()
  startPolling()
})

// 在组件销毁前停止轮询
onUnmounted(stopPolling)
</script>
<style lang="scss" scoped>
.virtualWithdraw-min {
  width: 345px;
  height: 334px;
  padding: 15px;
  margin-top: 10px;
  border-radius: 10px;
  background: #fff;
  .virtualWithdraw-min-title {
    color: #111;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .virtualWithdraw-min-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    .virtualWithdraw-min-item-left {
      color: #666;
    }
    .virtualWithdraw-min-item-right {
      display: flex;
      color: var(--gray-3, #333);
      .copy-btn {
        margin-left: 4px;
        color: var(--unnamed, var(--unnamed, #486bb2));
      }
    }
  }
}
.virtualWithdraw-footer {
  color: #486bb2;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  margin-top: 61px;
}
</style>
