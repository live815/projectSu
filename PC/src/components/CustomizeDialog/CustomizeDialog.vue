<template>
  <div class="customize-dialog">
    <el-dialog
      v-model="dialogShow"
      :title="props.title"
      :before-close="cancel"
      :width="props.width"
      :align-center="alignCenter"
      :apped-to-body="appendToBody"
    >
      <slot v-if="dialogShow"></slot>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
const dialogShow = ref(false)
const emit = defineEmits(['closeBtn'])
const props = defineProps({
  title: {
    type: String
  },
  width: {
    type: Number,
    default: 1000
  },
  dialogShow: {
    type: Boolean,
    default: false
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  appendToBody: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  dialogShow.value = props.dialogShow
})
onBeforeUnmount(() => {
  dialogShow.value = false
})
const cancel = () => {
  dialogShow.value = false
  emit('closeBtn', false)
}
</script>

<style lang="scss" scoped>
.customize-dialog :deep() {
  .el-dialog {
    background: var(--unnamed, #323c6f) !important;
    border-radius: 8px;
  }
  .el-dialog__header {
    padding: 12px 20px 12px 20px;
    margin-right: 0px !important;
    // padding-bottom: 20px;
    border-radius: 8px 8px 0px 0px;
    background: var(--unnamed, #323c6f) !important;
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
    border-radius: 0px 0px 8px 8px;
  }
}
</style>
