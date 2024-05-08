<template>
  <div>
    <van-popup v-model:show="showBottom" round position="bottom">
      <div class="main-container">
        <div class="btn-box" @click="toConfirmDele">{{ $t('Mletter.delete') }}</div>
        <div class="btn-box cancel" @click="switchShowDeletPopup">{{ $t('Mletter.cancel') }}</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
const emit = defineEmits(['toShowConfirmPopup'])
const showBottom = ref(false)
const switchShowDeletPopup = () => {
  showBottom.value = !showBottom.value
}

const toConfirmDele = () => {
  switchShowDeletPopup()
  emit('toShowConfirmPopup')
}

defineExpose({ switchShowDeletPopup })
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 112px;
  .btn-box {
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.5px solid rgb(231, 231, 231);
    color: var(--1, #f53f3f);

    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }
  .cancel {
    color: #333333;
  }
}
</style>
