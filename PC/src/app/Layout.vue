<template>
  <div class="common-layout">
    <CommonBg />
    <el-container>
      <Menu v-show="route.meta.isShowTabbar" />
      <el-container>
        <el-header v-show="!route.meta.hiddenHeader">
          <Header />
        </el-header>
        <div
          class="main"
          :style="{
            left: `${liveStore.indentWidth}px`,
            width: 'calc(100% - ' + liveStore.indentWidth + 'px)'
          }"
          ref="scrollContainer"
          @scroll="handleScroll"
        >
          <el-main>
            <router-view />
          </el-main>
          <Footer v-if="shouldShowFooter" />
        </div>
      </el-container>
    </el-container>
  </div>
  <LoginComp />
  <!-- 未绑定手机号 银行卡弹窗 -->
  <MobileDialog />
  <!-- 头像弹窗 -->
  <ActiveDialog />
  <!-- 充值弹窗 -->
  <ChargeAndWithdrawal />
  <!-- 右上选项悬浮框 -->
  <FloatingBox />
  <BackTop />
</template>

<script setup>
import { checkMaintain } from './checkMaintain'
import { processInviteCode } from './processInviteCode'
import { processReferCode } from './processReferCode'
import { tagAppStarting } from './tagAppStarting'
import eventBus from '@/utils/eventBus'
import { useRoute } from 'vue-router'
import { useLiveStore } from '@/stores/liveBroadcast'
import { initData } from './initData'
import ActiveDialog from '@/components/ActiveDialog/ActiveDialog'
import MobileDialog from '@/components/MobileDialog/MobileDaialog'

const liveStore = useLiveStore()
const route = useRoute()
const scrollContainer = ref(null)
const shouldShowFooter = computed(() => {
  return route.meta.showFooter
})
const handleScroll = () => {
  if (scrollContainer.value.scrollTop > 800) {
    liveStore.setIsUpward(true)
  } else {
    liveStore.setIsUpward(false)
  }
}

eventBus.on('isUpward', () => {
  scrollContainer.value.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
})

onUnmounted(()=>{
  eventBus.off('isUpward')
})

init()
function init() {
  initData()
  processInviteCode()
  processReferCode()
  tagAppStarting()
  checkMaintain()
}
</script>

<style lang="scss" scoped>
.el-main {
  padding-left: 5px;
}
.common-layout {
  .el-header {
    position: relative;
    height: 60px;
    padding: 0;
  }

  .main {
    position: relative;
    left: 200px;
    width: calc(100% - 200px);
    height: calc(100vh - 60px);
    overflow-y: auto; //这个不要动 是为了监听整个浏览器的高度 显示平滑滚动的
    scrollbar-width: none; //火狐浏览器 隐藏滚动条
    transition: width 0.3s ease 0s;
  }
}
// 修改弹窗样式
.el-message-box {
  background-color: #232949 !important;
  border: none !important;
}
.el-message-box__header {
  background: #323c6f !important;

  .el-message-box__title {
    color: #fff;
  }

  .el-message-box__close {
    color: #fff;
    font-size: 22px;
  }
  .el-message-box__close:hover {
    color: #fff;
  }
}
.el-message-box__content {
  .el-message-box-icon--warning {
    color: #fff;
  }
  .el-message-box__message {
    color: #fff;
  }
}
.el-message-box__btns {
  .el-button {
    border-radius: 4px;
    background: #171a2f;
    box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
    border: none !important;
    color: rgba(255, 255, 255, 0.8);
  }
  .el-button--primary {
    border-radius: 4px;
    background: linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%) !important;
    border: none !important;
    color: rgba(255, 255, 255, 0.8);
    --el-button-hover-bg-color: none;
    --el-button-hover-link-text-color: none;
    --el-button-outline-color: none;
  }
  .el-button:hover {
    border: none !important;
    color: #fff;
  }
}
</style>
