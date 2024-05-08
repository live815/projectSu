<template>
  <div class="send-code">
    <span @click="sendCode" v-if="modelValue">{{ $t('common.getCode') }}</span>
    <p v-else>
      <van-count-down @finish="onFinish" :time="time">
        <template #default="timeData">
          <span class="block"> {{ $t('common.resend', { num: timeData.seconds }) }}</span>
        </template>
      </van-count-down>
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue', 'sendCode'])
const time = ref(60 * 1000)
const onFinish = () => {
  emits('update:modelValue', true)
}
const sendCode = () => {
  emits('sendCode')
}
</script>

<style lang="scss" scoped>
.send-code {
  color: var(--color-primary);
  display: flex;
  align-items: center;
  word-spacing: 0;
  letter-spacing: 0;
  :deep().van-count-down {
    line-height: 100%;
    color: var(--color-primary);
  }
}
</style>
