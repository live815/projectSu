<template>
  <div>
    <video
      ref="videoPlayer"
      controls
      width="100%"
      :height="videoHeight"
      class="video-container"
    ></video>
  </div>
</template>

<script setup>
import Hls from "hls.js";
import flvjs from 'flv.js';
import { getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance()
const videoPlayer = ref(null);
const videoHeight = ref(window.innerHeight);
//解析url中的参数
const queryString = window.location.href;
const index = queryString.indexOf('=')
const srcUrl = queryString.slice(index+1)
console.log(srcUrl,11111,typeof srcUrl)

function initHlsVideo() {
  console.log('现在加载的是m3u8')
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(srcUrl);
    hls.attachMedia(videoPlayer.value);
  //   hls.on(Hls.Events.ERROR, function (event, data) {
  //   if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
  //     proxy.$modal.msgError('视频加载失败或已经过期')
  //     console.log('网络错误,M3U8 加载失败'); // 在这里处理加载失败的逻辑
  //   }
  // })
  } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {
    videoPlayer.value.src = srcUrl
  }
}
function initFlvVideo(){
  console.log('现在加载的是flv')
  const flvPlayer = flvjs.createPlayer({
      type: 'flv', // 指定视频类型
      url: srcUrl, // 替换为你的 FLV 视频 URL
    });

    // 绑定 flv.js 播放器实例到 <video> 元素
    flvPlayer.attachMediaElement(videoPlayer.value);

    // // 监听加载失败事件
    // flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
    //   console.error('FLV 加载失败', errorType, errorDetail);
    //   // 在这里可以处理加载失败的逻辑，例如显示错误消息或进行重试操作
    //   proxy.$modal.msgError('视频加载失败或已经过期')
    // });

    // 加载并播放视频
    flvPlayer.load();
    flvPlayer.play();
}
onMounted(() => {
  srcUrl.includes('m3u8')&&initHlsVideo()
  srcUrl.includes('flv')&&initFlvVideo()
});
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
}
</style>
