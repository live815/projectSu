<template>
  <iframe
    id="iframeContainer"
    :src="`${url}/?url=${source}&muted=${muted}&controls=${controls}&poster=${poster}`"
    width="100%"
    height="100%"
    allow="autoplay"
    frameborder="0"
    scrolling="no"
    allowfullscreen
  />
</template>
<script setup>
const url = import.meta.env.VITE_APP_PLAYER_URL
defineProps({
  source: {
    type: String,
    required: true
  },
  controls: {
    type: Boolean,
    default: true
  },
  muted: {
    type: Boolean,
    default: false
  },
  poster: {
    type: String
  }
})
// 静音开关
const handleMuted = (v) => {
  const iframeContainer = document.getElementById('iframeContainer').contentWindow
  iframeContainer.postMessage(
    {
      action: 'toggleMuted',
      message: v
    },
    '*'
  )
}

defineExpose({
  handleMuted
})
</script>
<style lang="scss">
.tcplayer {
  height: 100%;
  width: 100%;
}
</style>
