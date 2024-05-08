<template>
  <!-- 付款凭证弹窗弹窗 -->
  <div style="width: 320px">
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Wletter.tip99') }}</div>
      <!-- <div class="popup-min">
      <div class="text">V体育不会向您索要验证码、处理充提，谨防诈骗。</div>
      <div class="text" style="margin-top: 20px">为了提现极速到账，请务必按规则操作！</div>
      <div class="text">1.选择金额发起提现</div>
      <div class="text">2. 等待收款账户到账(建议使用有短信提示功能的卡)</div>
      <div class="text">3. 提现完成</div>
      <div class="text" style="color: var(--1, #f53f3f); margin-top: 20px">
        *重要：收款账户到账无误后，请务必点击【确认到账】
      </div>
      <div class="text">(若未到账或到账金额有误，请联系客服协助)</div>
    </div> -->
      <!-- 提示文本渲染 -->
      <div class="popup-min" v-if="textData.wdAppointmentContent">
        <p v-html="Base64.decode(textData.wdAppointmentContent)"></p>
      </div>
      <div class="popup-footer">
        <DedicatedButton color="primary" @click="handleButtonClick">{{
          $t('Wletter.tip100')
        }}</DedicatedButton>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import DedicatedButton from '@/components/VButton/DedicatedButton'
import { Base64 } from 'js-base64'
const CPopupDom = ref(null)
const textData = ref({})
const showhide = (val) => {
  textData.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })
// 取消
const handleButtonClick = () => {
  CPopupDom.value.showhide()
}
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 320px;
}
.popup-top {
  color: #111;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 25px 0 8px 0;
}

.popup-min {
  width: 263px;
  height: 273px;
  overflow: scroll;
  margin: 8px auto 0;
  line-height: 28px;

  .text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
}
.popup-footer {
  margin: 15px auto;
  width: 263px;
  // height: 40px;
}
</style>
