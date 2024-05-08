<template>
  <!-- 付款凭证弹窗弹窗 -->
  <div style="width: 311px">
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Rletter.rlettertip18') }}</div>
      <div class="popup-text">{{ $t('Rletter.rlettertip19') }}</div>
      <div class="popup-radio">
        <van-checkbox class="text" v-model="checked">{{ $t('Rletter.rlettertip20') }}</van-checkbox>
      </div>
      <div class="popup-footer">
        <div class="popup-footer-text" @click="onClickCancel">{{ $t('Rletter.rlettertip21') }}</div>
        <div class="popup-footer-btn" :class="{ isActive: checked }" @click="onClickConfirm">
          {{ $t('Rletter.sure') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { getCancelOrder } from '@/api/recharge'
import { useRouter } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'

import i18n from '@/i18n'
const router = useRouter()
const props = defineProps({
  orderNo: {
    type: String,
    default: ''
  }
})
const CPopupDom = ref(null)
const showhide = () => {
  CPopupDom.value.showhide()
}
defineExpose({ showhide })
const checked = ref(true)
// 取消
const onClickCancel = () => {
  CPopupDom.value.showhide()
}
// 确定撤销订单
const onClickConfirm = () => {
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  if (checked.value) {
    getCancelOrder({ orderNo: props.orderNo })
      .then(() => {
        closeToast()
        // 在需要的时候关闭窗口
        router.push('/deposit')
      })
      .catch(() => {
        closeToast()
      })
    CPopupDom.value.showhide()
  }
}
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 311px;
  min-height: 258px !important;
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
  min-height: 48px;
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
  margin: 16px auto 24px;
  border-radius: 6px;
  background: #f7f7f7;
  .text {
    color: #111;
    font-size: 16px;
    font-style: normal;
    font-weight: 500 !important;
    margin-left: 16px;
  }
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
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
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
