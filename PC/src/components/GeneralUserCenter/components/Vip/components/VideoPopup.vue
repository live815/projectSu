<template>
  <div class="videoPopup">
    <el-dialog
      :title="$t('GeneralUserCenter.LiveStreaming')"
      v-model="open"
      :before-close="handleClose"
    >
      <div class="videoPopup-min">
        <iframe
          id="iframeContainer"
          :src="`${appPlayerUrl}?url=${source}&muted=${muted}`"
          allow="autoplay"
          width="900"
          height="506"
          frameborder="0"
          v-if="source"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { appPlayerUrl,defaultSportVideo } from '@/utils/config'
const open = ref(true)
const emit = defineEmits(['submitBtn'])
const handleClose = () => {
  emit('submitBtn', false)
}
const source = ref('')
const muted = ref(true) //静音播放
onMounted(() => {
  source.value = defaultSportVideo
})

onUnmounted(() => {
  source.value = null
})
</script>
<style lang="scss" scoped>
.videoPopup {
  :deep() {
    .el-dialog {
      border-radius: 2px;
      background: #272b45;
      box-shadow: 0px 14px 28px 0px rgba(0, 0, 0, 0.4);
      .el-dialog__header {
        opacity: 0.5;
        background: #3f4671;
        width: 100%;
        .el-dialog__title {
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
        }
      }
      .videoPopup-min {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
