<template>
  <div>
    <van-popup v-model:show="showConfirm" round>
      <div class="main-container">
        <div class="title">{{ $t('Mletter.Kindtips1') }}</div>
        <div class="text">{{ $t('Mletter.Kindtips2') }}</div>
        <div class="btn-row">
          <div class="btn light" @click="switchShowConfirm">{{ $t('Mletter.cancel') }}</div>
          <div class="btn orange" @click="confirmDete">{{ $t('Mletter.sure') }}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
const emit = defineEmits(['deleLetter'])
// 弹出框开关
const showConfirm = ref(false)
const switchShowConfirm = () => {
  showConfirm.value = !showConfirm.value
}
// 确认删除
const confirmDete = () => {
  emit('deleLetter')
  showConfirm.value = !showConfirm.value
}

defineExpose({ switchShowConfirm })
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 331px;
  min-height: 178px;
  padding: 32px 24px 0 24px;
  color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));

  font-size: 18px;
  font-weight: 600;
  line-height: 26px;

  .title {
    margin-bottom: 8px;
  }
  .text {
    color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 24px;
  }
  .btn-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
    .btn {
      width: 125px;
      display: flex;
      padding: 8px 16px;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
    }
    .light {
      color: var(--2, #ff5000);
      background: var(--4, #fff5f0);
    }
    .orange {
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      color: var(--text-icon-font-wh-1100, #fff);
    }
  }
}
</style>
