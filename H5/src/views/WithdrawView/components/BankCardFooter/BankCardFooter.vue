<template>
  <div class="bankCardfooter">
    <DedicatedButton :color="color" @click="handleButtonClick">{{
      $t('Wletter.Withdrawimmediate')
    }}</DedicatedButton>
    <div class="bankCardfooter-text">
      <span>{{ $t('Wletter.tip91') }}</span>
      <span @click="selectLiveChat">{{ $t('Wletter.tip92') }}</span>
    </div>
  </div>

  <!-- 温馨提示弹出层 -->
  <TipsPopup ref="tipsPopupDom"></TipsPopup>
  <!-- 虚拟币温馨提示弹窗 -->
  <VirtualTipPopup ref="virtuaTipPopupDom"></VirtualTipPopup>

  <!-- 提现确认弹窗 -->
  <WithdrawalConfirmation
    ref="withdrawalConfirmationDom"
    @virtuaTip="virtuaTip"
    @tipsData="tipsData"
  ></WithdrawalConfirmation>
  <LiveChat ref="liveChat" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import TipsPopup from '../TipsPopup/TipsPopup'
import VirtualTipPopup from '../VirtualTipPopup/VirtualTipPopup'
import WithdrawalConfirmation from '../WithdrawalConfirmation/WithdrawalConfirmation'
import LiveChat from '@/components/LiveChat/LiveChat.vue'
const liveChat = ref(null)
const router = useRouter()
const color = ref('')
// 定义温馨提示ref
const tipsPopupDom = ref(null)

// 定义虚拟币温馨提示ref
const virtuaTipPopupDom = ref(null)

// 定义提现确认ref
const withdrawalConfirmationDom = ref(null)

const props = defineProps({
  isACtiveShow: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  bankCardDate: {
    type: Object,
    default: () => {}
  },
  virtualData: {
    type: Object,
    default: () => {}
  }
})

const onComputedIsACtiveShow = computed(() => {
  return props.isACtiveShow
})

// 银行卡提现传过来信息
const onComputedBankCardDate = computed(() => {
  return props.bankCardDate
})
// 虚拟币提现传过来的信息
const onComputedVirtualData = computed(() => {
  return props.virtualData
})

watchEffect(() => {
  if (onComputedIsACtiveShow.value) {
    color.value = 'primary'
  } else {
    color.value = ''
  }
})

// 立即提现按钮
const handleButtonClick = () => {
  if (color.value) {
    if (props.type) {
      withdrawalConfirmationDom.value.showhide(onComputedVirtualData.value)
    } else {
      withdrawalConfirmationDom.value.showhide(onComputedBankCardDate.value)
    }
  }
}

const tipsData = (data) => {
  withdrawalConfirmationDom.value.showhide()
  tipsPopupDom.value.showhide(data)
}

const virtuaTip = (data) => {
  withdrawalConfirmationDom.value.showhide()
  virtuaTipPopupDom.value.showhide(data)
}
const selectLiveChat = () => {
  liveChat.value.open()
}
</script>
<style lang="scss" scoped>
.bankCardfooter {
  position: fixed;
  // z-index: 1;
  bottom: 0;
  width: 100%;
  height: 112px;
  padding: 0 16px;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.05);
  border-radius: 20px 20px 0px 0px;
  .bankCardfooter-text {
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
</style>
