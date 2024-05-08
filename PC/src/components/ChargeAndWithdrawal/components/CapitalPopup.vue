<template>
  <CustomizeDialog
    :dialogShow="isCapitalPopup"
    :width="480"
    :title="$t('DepositWithdraw.tip61')"
    v-if="isCapitalPopup"
    :alignCenter="true"
    @closeBtn="closeBtn"
  >
    <div class="popup-top">{{ $t('DepositWithdraw.tip62') }}</div>
    <div class="popup-min">
      <div class="popup-radio">
        <el-checkbox class="text" v-model="checked1">{{ $t('DepositWithdraw.tip63') }}</el-checkbox>
      </div>
      <div class="popup-radio">
        <el-checkbox class="text" v-model="checked2">{{ $t('DepositWithdraw.tip64') }}</el-checkbox>
      </div>
    </div>
    <div class="popup-footer">
      <div class="popup-footer-left" @click="closeBtn">{{ $t('DepositWithdraw.Cancel') }}</div>
      <div
        class="popup-footer-right"
        :class="{ isActive: isComputedChecked }"
        @click="onClickConfirm"
      >
        {{ $t('DepositWithdraw.Sure') }}
      </div>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import eventBus from '@/utils/eventBus'
import { getWithdrawConfirmOrder } from '@/api/withdraw'
import { useWithdrawStore } from '@/stores/withdraw'
const withdrawStore = useWithdrawStore()

const orderNo = ref('')
const isCapitalPopup = ref(false)

const checked1 = ref(false)
const checked2 = ref(false)

eventBus.on('isCapitalPopup', (val) => {
  checked1.value = false
  checked2.value = false
  isCapitalPopup.value = true
  orderNo.value = val
})

onUnmounted(() => {
  eventBus.off('isCapitalPopup')
})

const closeBtn = () => {
  isCapitalPopup.value = false
}

// 确定按钮
const onClickConfirm = () => {
  if (isComputedChecked.value) {
    getWithdrawConfirmOrder({ orderNo: orderNo.value }).then((res) => {
      if (res.code == 200) {
        withdrawStore.getWithdrawStatus(withdrawStore.withdrawDetail.orderNo)
      }
    })
    isCapitalPopup.value = false
  }
}

const isComputedChecked = computed(() => {
  if (checked1.value && checked2.value) {
    return true
  }
  return false
})
</script>
<style lang='scss' scoped>
:deep() {
  .el-dialog__header {
    padding: 12px 20px 12px 20px !important;
    margin-right: 0px !important;
    border-radius: 8px 8px 0px 0px !important;
    background: var(--unnamed, #323c6f) !important;
  }
}
.popup-top {
  color: var(-----60, rgba(255, 255, 255, 0.6));

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin: 32px 0 0 20px;
  letter-spacing: -0.01px;
}
.popup-min {
  width: 440px;
  height: 48px;
  margin: 32px auto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  .popup-radio {
    .text {
      color: var(--100, #fff);
      word-wrap: break-word;
      word-break: break-all;
      white-space: normal;
    }
  }

  span {
    color: var(--2, #ff5000);
  }
}
.popup-footer {
  display: flex;
  justify-content: flex-end;
  margin: 0 auto 20px;
  width: 440px;
  height: 32px;
  .popup-footer-left,
  .popup-footer-right {
    width: 60px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
    background: #171a2f;
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
    color: var(-----60, rgba(255, 255, 255, 0.6));
    font-size: 14px;
  }
  .popup-footer-right {
    border-radius: 4px;
    margin-left: 10px;
    opacity: 0.5;
    background: var(-----, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  }
  .isActive {
    opacity: 1;
  }
}
</style>