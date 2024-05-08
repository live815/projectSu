<template>
  <!-- 领取提示弹窗 -->
  <div>
    <CPopup ref="CPopupDom">
      <div class="popup-top">
        {{ index == 1 ? $t('Vletter.tip25') : $t('Vletter.tip26') }}
      </div>
      <div class="popup-footer">
        <div class="popup-footer-left" @click="onClickCancel">{{ $t('Vletter.cancel') }}</div>
        <div class="popup-footer-right" @click="onClickGo">
          {{ index == 1 ? $t('Vletter.look') : $t('Vletter.exchange') }}
        </div>
      </div>
    </CPopup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['onRefresh'])
const index = ref(null)
const CPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = (val) => {
  index.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })

const onClickCancel = () => {
  CPopupDom.value.showhide()
  emit('onRefresh')
}

const onClickGo = () => {
  if (index.value == 1) {
    router.push('/user-center')
  } else {
    router.push('/welfare')
  }
}
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 311px;
  height: 144px;
}
.popup-top {
  color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
  text-align: center;

  font-size: 16px;
  font-style: normal;
  margin-top: 32px;
  margin-bottom: 24px;
}
.popup-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin: 15px 0;
  .popup-footer-left,
  .popup-footer-right {
    width: 110px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: var(--2, #ff5000);
    border-radius: 6px;
    background: var(--4, #fff5f0);
  }
  .popup-footer-right {
    color: var(--text-icon-font-wh-1100, #fff);
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    margin-left: 12px;
  }
}
</style>
