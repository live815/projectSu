<template>
  <div class="popup">
    <CPopup ref="CPopupDom">
      <div class="popup-top">{{ $t('Wletter.Kindtips') }}</div>
      <div class="popup-min">
        {{ $t('Wletter.tip121') }}
        <span>{{ usdtMsg }}</span>
      </div>
      <div class="popup-footer">
        <div class="popup-footer-btn" @click="onClickGOHome">
          {{ $t('Wletter.sure') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
const CPopupDom = ref(null)
const usdtMsg = ref('')

const showhide = (val) => {
  usdtMsg.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })

// 确定
const onClickGOHome = () => {
  CPopupDom.value.showhide()
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
  height: 48px;
  margin: 8px auto 0;
  font-size: 16px;
  font-style: normal;
  text-align: center;
  font-weight: 400;
  line-height: 24px;
  color: #666;

  span {
    color: var(--2, #ff5000);
  }
}
.popup-footer {
  margin: 0 auto;
  width: 126px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-footer-btn {
    color: var(--2, #ff5000);
    width: 126px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
  }
}
</style>
