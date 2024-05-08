<template>
  <div class="router-view-wrapper">
    <router-view
      v-if="isRouteAlive"
      v-slot="{ Component, route }"
      :class="[{ hasSafeAreaBottom: Boolean(getSafeAreaHeight()), index: isHomePage }, getClass]"
      class="router-view"
    >
      <transition :name="route.meta.transition">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <Tabbar v-if="isShowTabbar" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Tabbar from '@/components/Tabbar/Tabbar'
import useIOSTouchEvent from '@/hooks/useIOSTouchEvent'
import { getSafeAreaHeight } from '@/utils'
import { processInviteCode } from './processInviteCode'
import { processReferCode } from './processReferCode'
import { initData } from './initData'
import { tagAppStarting } from './tagAppStarting'
import { allowMultipleToast } from 'vant'
import { useRefresh } from './useRefresh'
import { processAppDownload } from './processAppDownload'
import { useRouterClass } from './useRouterClass'
const { getClass, isShowTabbar, isHomePage } = useRouterClass()
const { isRouteAlive } = useRefresh()
import { checkMaintain } from './checkMaintain'
// init
init()
function init() {
  initData()
  processInviteCode()
  processReferCode()
  allowMultipleToast()
  tagAppStarting()
  processAppDownload()
  checkMaintain()
}

onMounted(async () => {
  // IOS滑动动效冲突补丁
  useIOSTouchEvent()
})
</script>

<style lang="scss" scoped>
:deep() {
  .van-overlay {
    z-index: 2000 !important;
  }
}
.router-view {
  // 页面切换动效辅助属性
  background: var(--color-background);
  min-height: var(--app-height);
  position: absolute;
  width: 100%;
  &.index {
    background: rgb(236, 242, 255);
  }
}
.padding-large {
  padding-bottom: 140px;
  &.hasSafeAreaBottom {
    padding-bottom: 170px;
  }
}
.padding-mid {
  padding-bottom: 90px;
  &.hasSafeAreaBottom {
    padding-bottom: 120px;
  }
}
.padding-sm {
  padding-bottom: 50px;
  &.hasSafeAreaBottom {
    padding-bottom: 80px;
  }
}
</style>
