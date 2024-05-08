<template>
  <div class="service-view">
    <Head v-if="!appFlag && site != 'vietnam'" />
    <Tip />
    <Agent @selectLiveChat="selectLiveChat" />
    <DownloadService v-if="site != 'vietnam'" />
    <Question />
    <Guidebook />
    <Tabbar v-if="site === 'vietnam'" />
    <LiveChat ref="liveChat" />
  </div>
</template>

<script setup>
import Head from './components/Head/Head.vue'
import Tip from './components/Tip/Tip.vue'
import Agent from './components/Agent/Agent.vue'
import DownloadService from './components/DownloadService/DownloadService.vue'
import Question from './components/Question/Question.vue'
import Tabbar from '@/components/Tabbar/Tabbar'
import Guidebook from './components/Guidebook/Guidebook.vue'
import LiveChat from '@/components/LiveChat/LiveChat.vue'

const liveChat = ref(null)
const appFlag = computed(() => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('app') === 'true'
})
const site = import.meta.env.VITE_SITE
//电话回拨按钮

const selectLiveChat = () => {
  liveChat.value.open()
}
</script>

<style scoped lang="scss">
.service-view {
  background: #f7f7f7 url('./img/header-bg.png') no-repeat center -70px;
  background-size: 100%;
  @include mobile-padding();
  // padding-top: 15px;
  padding-bottom: 70px;
}
</style>
