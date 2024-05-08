<template>
  <div class="search-wrapper">
    <IconSearch class="icon-search" />
    <input :value="modelValue" @input.stop="onInput" :placeholder="placeholder" type="text" />
    <IconClear v-if="modelValue" @click="clear" class="icon-clear" />
  </div>
</template>

<script setup>
import IconSearch from '@/components/icons/IconSearch'
import IconClear from '@/components/icons/IconClear'
import i18n from '@/i18n/index'
const emit = defineEmits(['update:modelValue'])
const onInput = (e) => {
  emit('update:modelValue', e.target.value)
}
defineProps({
  placeholder: {
    type: String,
    default: i18n.global.t('search')
  },
  modelValue: {
    type: String,
    default: ''
  }
})

// 清空
const clear = () => {
  emit('update:modelValue', '')
}
defineExpose({ clear })
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  .icon-search {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    fill: #999;
  }
  .icon-clear {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    $height: 40px;
    height: $height;
    line-height: $height;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 6px;
    text-indent: 40px;
    font-size: 14px;
    color: #111;
    @include transition();
    &:focus {
      border-color: var(--color-primary);
    }
  }
}
</style>
