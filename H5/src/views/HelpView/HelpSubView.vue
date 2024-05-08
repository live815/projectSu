<template>
  <div>
    <NavBar :title="helpData.tabName" v-if="!isCTYWebApp() && !isIOSPure() && !token" />
    <div class="load-box" v-show="loading"><van-loading /></div>
    <div class="main-content teach-content" v-html="helpContent"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar.vue'
import { getTutorialDetailApi } from '@/api/announcement.js'
import { Base64 } from 'js-base64'
import { isCTYWebApp, isIOSPure } from '@/utils'

const route = useRoute()
const token = ref('')
onMounted(() => {
  getTutorialDetail()
  if (route.query.token) {
    token.value = route.query.token
  }
})
// 加载
const loading = ref(true)
// base64转码获得内容
const helpContent = computed(() => {
  if (helpData.value.tabContent) {
    return Base64.decode(helpData.value.tabContent)
  }
})
// 获取数据
const helpData = ref({})
const getTutorialDetail = () => {
  getTutorialDetailApi({ id: route.query.id }).then((res) => {
    loading.value = false
    helpData.value = res.data

    setTimeout(() => {
      let video = document.querySelectorAll('video')
      video.forEach((video) => {
        video.load()
        // video.play()
        // video.controls = false
      }, 1)
    })
  })
}
</script>

<style lang="scss" scoped>
.scroll-wrapper iframe {
  height: 100%;
  width: 100%;
}
.load-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.main-content {
  width: 100vw;
  padding: 15px;
  white-space: pre-wrap;
}
.main-content :deep() {
  img {
    max-width: 70%;
    width: 70%;
    display: block;
    margin: 0 auto;
  }
  video {
    width: 80px;

    height: auto;
  }
}
</style>

<style lang="scss">
.teach-content {
  img {
    width: 70%;
    display: block;
    margin: 0 auto;
  }
}
</style>
