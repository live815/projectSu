<template>
  <div class="popup">
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Wletter.Kindtips') }}</div>
      <div class="popup-min">
        <div class="text">{{ $t('Wletter.Flowrequirements') }}{{ tipsData.totalBetRequest }}</div>
        <div class="text">
          {{ $t('Wletter.Remainingturnover') }}{{ tipsData.totalBetUnFinished }}
        </div>
        <!-- <div class="text" v-if="tipsData.totalBetFinished < tipsData.totalBetRequest">
          {{ $t('Wletter.Pipelinecompleted') }}<span>{{ tipsData.totalBetFinished }}</span
          >/{{ tipsData.totalBetRequest }}
        </div> -->
        <div class="text" style="margin-top: 25px"><span>*</span> {{ $t('Wletter.tip107') }}</div>
      </div>
      <div class="popup-footer">
        <div class="popup-footer-btn" @click="onClickCancel">
          {{ $t('Wletter.cancel') }}
        </div>
        <div class="popup-footer-btn" @click="onClickGOHome">
          {{ $t('Wletter.tocomplete') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import CPopup from '@/components/CPopup/Cpopup'
const router = useRouter()
const CPopupDom = ref(null)
const tipsData = ref({})

const showhide = (val) => {
  tipsData.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })
// 取消
const onClickCancel = () => {
  CPopupDom.value.showhide()
}
// 去完成
const onClickGOHome = () => {
  CPopupDom.value.showhide()
  router.push('/')
}
</script>
<style lang="scss" scoped>
.popup {
  width: 311px;
}
:deep().van-popup {
  width: 311px;
  height: 337px;
}
.popup-top {
  color: #111;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 8px 0;
}

.popup-min {
  width: 263px;
  min-height: 183px;
  margin: 8px auto 0;
  .text:nth-child(2) {
    color: var(--2, #ff5000);
  }
  .text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));

    span {
      color: var(--2, #ff5000);
    }
  }
}
.popup-footer {
  margin: 0 auto;
  width: 311px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-footer-btn {
    color: var(--text-icon-font-wh-1100, #fff);
    width: 126px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .popup-footer-btn:first-child {
    color: var(--2, #ff5000);
    border-radius: 6px;
    background: var(--4, #fff5f0);
    margin-right: 12px;
  }
}
</style>
