<template>
  <el-dialog
    :model-value="slideShow"
    :before-close="cancel"
    width="310"
    :align-center="true"
    :modal="false"
  >
    <template #header>
      <div class="my-header">
        <div class="title">{{ $t('Components.Notice_21') }}</div>
        <el-icon @click="handleClick"><RefreshLeft /></el-icon>
      </div>
    </template>
    <slide-verify
      ref="block"
      :slider-text="text"
      :show="false"
      :imgs="imgArr"
      :accuracy="accuracy"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
  </el-dialog>
</template>

<script setup>
// import { ElMessage } from 'element-plus'
import { RefreshLeft } from '@element-plus/icons-vue'
import i18n from '@/i18n'
import { ref } from 'vue'
import SlideVerify from 'vue3-slide-verify'
import 'vue3-slide-verify/dist/style.css'
import img1 from './img/imgbg01.jpg'
import img2 from './img/imgbg02.jpg'
import img3 from './img/imgbg03.jpg'

const dialogShow = ref(false)
const props = defineProps({
  slideShow: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeBtn', 'update:modelValue', 'getFinish'])
const msg = ref('')
const block = ref()
const text = ref(i18n.global.t('HomeView.towardsRight'))
const accuracy = ref(1)
const slideShow = ref(false)
const imgArr = [img1, img2, img3]

const onAgain = () => {
  msg.value = i18n.global.t('Components.Notice_22')
  block.value?.refresh()
  console.log(msg.value)
}

const onSuccess = (times) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`
  emit('update:modelValue', false)
  emit('getFinish')
  block.value?.refresh()
}

const onFail = () => {
  msg.value = i18n.global.t('Components.VerificationFailed')
}

const onRefresh = () => {
  msg.value = i18n.global.t('Components.ClickedTheRefreshIcon')
}

const handleClick = () => {
  // 刷新
  block.value?.refresh()
  msg.value = ''
}

const cancel = () => {
  emit('update:modelValue', false)
  emit('closeBtn', false)
}
</script>

<style lang="scss" scoped>
:deep() {
  .el-dialog {
    background: var(--unnamed, #323c6f) !important;
    border-radius: 8px;
  }
  .el-dialog__header {
    padding: 12px 20px 12px 20px;
    margin-right: 0 !important;
    // padding-bottom: 20px;
    border-radius: 8px 8px 0 0;
    background: var(--unnamed, #323c6f) !important;
    display: block;
  }
  .el-dialog__title {
    color: var(--100, #fff);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */
    opacity: 0.8;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 26px;
    color: #fff;
    top: -14px;
    svg {
      height: 20px;
      width: 20px;
    }
  }
  .el-dialog__body {
    background: #232949;
    border-radius: 0 0 8px 8px;
  }
}
.my-header {
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  .el-icon {
    cursor: pointer;
  }
}
</style>
