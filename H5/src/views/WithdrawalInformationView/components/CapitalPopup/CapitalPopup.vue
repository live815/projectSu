<template>
  <!-- 付款凭证弹窗弹窗 -->
  <div>
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Wletter.tip76') }}</div>
      <div class="popup-text">{{ $t('Wletter.tip77') }}</div>
      <div class="popup-radio">
        <van-checkbox class="text" v-model="checked1">{{ $t('Wletter.tip78') }}</van-checkbox>
      </div>
      <div class="popup-radio magin-radio">
        <van-checkbox class="text" v-model="checked2">{{ $t('Wletter.tip79') }}</van-checkbox>
      </div>
      <div class="popup-footer">
        <div class="popup-footer-text" @click="onClickCancel">{{ $t('Wletter.cancel') }}</div>
        <div
          class="popup-footer-btn"
          :class="{ isActive: isComputedChecked }"
          @click="onClickConfirm"
        >
          {{ $t('Wletter.sure') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { getWithdrawConfirmOrder } from '@/api/withdraw'

const emit = defineEmits(['paySuccess'])

const CPopupDom = ref(null)

const checked1 = ref(false)
const checked2 = ref(false)
// 当订单id
const orderNo = ref('')

const showhide = (val) => {
  orderNo.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })
// 取消
const onClickCancel = () => {
  CPopupDom.value.showhide()
}
// 确定
const onClickConfirm = () => {
  if (isComputedChecked.value) {
    getWithdrawConfirmOrder({ orderNo: orderNo.value }).then((res) => {
      if (res.code == 200) {
        emit('paySuccess')
      }
    })
    checked1.value = false
    checked2.value = false
    CPopupDom.value.showhide()
  }
}

const isComputedChecked = computed(() => {
  if (checked1.value && checked2.value) {
    return true
  }
  return false
})
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 330px;
  height: 310px;
}
.popup-top {
  color: #111;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 8px 0;
}

.popup-text {
  width: 263px;
  height: 48px;
  color: #666;
  margin: 0 auto;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.popup-radio {
  display: flex;
  align-items: center;
  width: 263px;
  height: 48px;
  margin: 16px auto 0px;
  border-radius: 6px;
  background: #f7f7f7;
  .text {
    color: #333;
    font-size: 14px;
    font-style: normal;
    font-weight: 500 !important;
    margin-left: 16px;
  }
}
.magin-radio {
  margin: 4px auto 24px;
}
.popup-footer {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 0.5px solid var(--gray-gray-3, #e7e7e7);
  color: #111;
  font-size: 16px;
  font-style: normal;
  font-weight: 700 !important;
  .popup-footer-text {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 56px;
    border-right: 0.5px solid var(--gray-gray-3, #e7e7e7);
  }
  .popup-footer-btn {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 56px;
    color: var(--3, #ffc6ac);
  }
  .isActive {
    color: var(--2, #ff5000);
  }
}
</style>
