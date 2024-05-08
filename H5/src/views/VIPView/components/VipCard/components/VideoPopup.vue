<template>
  <!-- 视频弹窗 -->
  <div>
    <van-popup class="van-popup" v-model:show="props.isShowVideo" @click-overlay="closeVideoPopup">
      <div class="video-box" v-if="props.isShowVideo">
        <!-- <iframe
          v-if="props.isShowVideo && source"
          :src="`${appPlayerUrl}?url=${source}&muted=${muted}`"
          width="100%"
          height="100%"
          frameborder="0"
          allow="autoplay"
        /> -->
        <video
          class="popup-video"
          ref="videoPlayer"
          :src="source"
          width="100%"
          height="100%"
          autoplay
          controls
          :muted="muted"
          v-if="showVideo"
        ></video>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
// import { appPlayerUrl } from '@/utils/config'
const source = ref('')
const muted = ref(false) //静音播放
const emit = defineEmits(['close'])

const showVideo = ref(true) // 是否显示视频

const videoPlayer = ref(null) // 视频Player的引用

onMounted(() => {
  source.value = new URL('./img/videoC.mp4', import.meta.url).href
  // 自动播放，需要在用户交互事件触发后进行
  // document.addEventListener('click', startAutoPlay)
})

// const startAutoPlay = () => {
//   videoPlayer.value.play()
// }

const props = defineProps({
  isShowVideo: {
    type: Boolean,
    default: false
  }
})
const closeVideoPopup = () => {
  source.value = ''
  emit('close')
}
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 325px;
  // height: 200px !important;
  background: none;
  .video-box {
    width: 325px;
    height: 180px;
    .popup-video {
      width: 325px;
      height: 180px;
    }
  }
}
</style>
