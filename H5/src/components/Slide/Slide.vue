<template>
  <div class="box">
    <slide-verify
      ref="block"
      :slider-text="text"
      :show="true"
      :imgs="imgs"
      :accuracy="accuracy"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
<!--    <van-icon name="replay" size="32" class="replay" @click="handleClick" />-->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import i18n from '@/i18n/index'
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
const emit = defineEmits(['getFinish'])
import SlideVerify from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
import img1 from './img/imgbg01.jpg'
import img2 from './img/imgbg02.jpg'
import img3 from './img/imgbg03.jpg'
const imgs = [img1, img2, img3]
const msg = ref('')
const block = ref()
const text = ref(i18n.global.t('Lletter.swipeRight'))
const accuracy = ref(1)
const onAgain = () => {
  msg.value = `${i18n.global.t('Lletter.nonHumanOperation')} try again`
  // 刷新
  block.value?.refresh()
}

const onSuccess = (times) => {
  msg.value = `login success, ${i18n.global.t('Lletter.timeConsuming')} +${(times / 1000).toFixed(1)}s`
  emit('getFinish')
  block.value?.refresh()
}

const onFail = () => {
  msg.value = i18n.global.t('Lletter.validationFailed')
}
const onRefresh = () => {
  msg.value = i18n.global.t('Lletter.refreshIconClicked')
}

// const handleClick = () => {
//   // 刷新
//   block.value?.refresh()
//   msg.value = ''
// }
</script>

<style lang="scss" scoped>
.box {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  margin: 50% auto;
  z-index: 100 !important;
}
.replay {
  margin-top: 15px;
}
</style>
