<template>
  <!-- 付款凭证弹窗弹窗 -->
  <div style="width: 320px">
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Wletter.tip120') }}</div>
      <!-- 提示文本渲染 -->
      <div class="popup-min" v-if="textData.freeWdTimesContent">
        <p v-html="Base64.decode(textData.freeWdTimesContent)"></p>
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
  height: 427px;
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
