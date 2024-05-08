<template>
  <div>
    <NavBar
      @onClickLeft="goBack"
      :isBack="false"
      :title="title"
      :class="{ horizontal: isLandscape }"
    />
    <div :class="{ 'iframe-wrapper': isLandscape }" id="iframeWrapper">
      <iframe
        v-if="url"
        :src="url"
        id="iframe"
        width="100%"
        height="100%"
        frameborder="0"
        name="iframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
import { useRouterStore } from '@/stores/router'
const routerStore = useRouterStore()
const route = useRoute()
const router = useRouter()
const isLandscape = ref(false)
let { title, url, redirect } = route.query
url = atob(url)
defineProps({
  isShowLeft: {
    type: Boolean,
    default: true
  },
  isShowRight: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  // handleLoad()
  // setIframeHeight()
  window.addEventListener('orientationchange', function () {
    let orientation = window.orientation

    if (orientation === 90 || orientation === -90) {
      isLandscape.value = true
    } else {
      isLandscape.value = false
    }
  })
})
const handleLoad = () => {
  let iframeDom = document.getElementById('iframe')
  showLoadingToast({
    duration: 0,
    forbidClick: true
  })
  let iframeLoad = () => {
    closeToast()
    //移除监听器
    iframeDom.removeEventListener('load', iframeLoad, true)
  }
  iframeDom.addEventListener('load', iframeLoad, true)
}
function goBack() {
  if (redirect) {
    routerStore.setIsBackStatus(true)
    router.push(redirect)
  } else {
    router.back()
  }
}
</script>

<style lang="scss" scoped>
#iframeWrapper {
  overflow: hidden;
  height: calc(var(--app-height) - 44px);
}
.iframe-wrapper {
  height: calc(var(--app-height)) !important;
}
.horizontal {
  padding-bottom: 0;
  :deep() {
    .custom-nav-bar {
      height: 20px;
      h2 {
        font-size: 8px;
      }
      .right img {
        width: 15px;
      }
    }
  }
}
</style>
