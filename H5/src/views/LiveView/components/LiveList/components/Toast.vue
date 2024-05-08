<template>
  <div class="toast-view">
    <van-toast v-model:show="show" style="padding: 12px 16px">
      <template #message>
        <van-icon v-if="success" size="24" name="passed" />
        <div>{{ success ? $t('Lletter.appointsuccess') : $t('Lletter.appointcanceled') }}</div>
      </template>
    </van-toast>
  </div>
</template>

<script setup>
defineProps(['success'])
const show = ref(false)
const showToast = () => {
  show.value = true
}
defineExpose({ showToast })
</script>

<style lang="scss" scoped>
.toast-view {
  :deep() {
    .van-toast {
      height: 24px;
      background: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
    }
    .van-icon {
      margin-right: 8px;
    }
    .van-toast__text {
      display: flex;
      align-items: center;
    }
  }
}
</style>
