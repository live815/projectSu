<template>
  <div class="vipPrivileges-content">
    <div class="vipPrivileges-content-top">
      <div class="vipPrivileges-content-top-left">
        {{ $t('GeneralUserCenter.OverviewOfPrivileges') }}
      </div>
      <div
        class="vipPrivileges-content-top-right"
        @click="onClickPrivileges(slidesStore.getActiveSlideIndex)"
      >
        <div>{{ $t('GeneralUserCenter.ViewVIPDetails') }}</div>
        <div class="svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3.81474 2.25028L7.47099 6.00028L3.81474 9.75028C3.74449 9.82053 3.70936 9.90253 3.70936 9.99628C3.70936 10.09 3.74449 10.172 3.81474 10.2423C3.88499 10.3125 3.96699 10.3477 4.06074 10.3477C4.15449 10.3477 4.23261 10.3164 4.29511 10.2539L8.18574 6.25791C8.25599 6.18766 8.29111 6.10166 8.29111 5.99991C8.29111 5.89816 8.25599 5.81216 8.18574 5.74191L4.30674 1.74591C4.23649 1.68341 4.15249 1.65216 4.05474 1.65216C3.95699 1.65216 3.87499 1.68728 3.80874 1.75753C3.74249 1.82778 3.70924 1.90978 3.70899 2.00353C3.70874 2.09728 3.74386 2.17928 3.81436 2.24953L3.81474 2.25028Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="vipPrivileges-footer">
      <img :src="grade7" class="vipPrivileges-footer-item" @click="onClickOpen(1)" />
      <img :src="grade8" class="vipPrivileges-footer-item" @click="onClickOpen(2)" />
      <img :src="grade9" class="vipPrivileges-footer-item" @click="onClickOpen(3)" />
      <img :src="grade10" class="vipPrivileges-footer-item" @click="onClickOpen(4)" />
      <img :src="grade11" class="vipPrivileges-footer-item" @click="onClickOpen(5)" />
      <img :src="grade12" class="vipPrivileges-footer-item" @click="onClickOpen(6)" />
    </div>
  </div>
  <PrivilegesPopup
    v-if="isShow"
    :activeIndex="activeIndex"
    @submitBtn="submitBtn"
  ></PrivilegesPopup>
  <VideoPopup v-if="videoShow" @submitBtn="submitVideo"></VideoPopup>
</template>

<script setup>
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user.js'
import PrivilegesPopup from './PrivilegesPopup.vue'
import VideoPopup from './VideoPopup.vue'

import { useSlidesStore } from '@/stores/vipSlides'
import { useRouter } from 'vue-router'

const slidesStore = useSlidesStore()
const appStore = useAppStore()
const isShow = ref(false)
const videoShow = ref(false)
const user = useUserStore()
const router = useRouter()

// 当前索引
const activeIndex = ref(null)
// 点击当前详情
const onClickPrivileges = (index) => {
  activeIndex.value = index
  isShow.value = true
}
// 传递过来的值
const submitBtn = (val) => {
  isShow.value = val
}

const grade7 = computed(() => {
  return new URL(`./img/${appStore.language}/grade7.png`, import.meta.url).href
})
const grade8 = computed(() => {
  return new URL(`./img/${appStore.language}/grade8.png`, import.meta.url).href
})
const grade9 = computed(() => {
  return new URL(`./img/${appStore.language}/grade9.png`, import.meta.url).href
})
const grade10 = computed(() => {
  return new URL(`./img/${appStore.language}/grade10.png`, import.meta.url).href
})
const grade11 = computed(() => {
  return new URL(`./img/${appStore.language}/grade11.png`, import.meta.url).href
})
const grade12 = computed(() => {
  return new URL(`./img/${appStore.language}/grade12.png`, import.meta.url).href
})

// 视频弹窗返回的值
const submitVideo = () => {
  videoShow.value = false
}

// 专属特权
const onClickOpen = (val) => {
  switch (val) {
    case 1:
      return router.push('/VipYacht')
    case 2:
      return (videoShow.value = true)
    case 3:
      return router.push('/VipBusinessGirl')
    case 4:
      return router.push('/VipDedicatedManager')
    case 5:
      return onClickPrivileges(slidesStore.getActiveSlideIndex)
    case 6:
      return handleShowCharge()
  }
}

// 充值
function handleShowCharge() {
  if (!user.userInfo.userName) {
    ElMessage(i18n.global.t('DepositWithdraw.NoticeTips_10'))
  } else {
    const params = {
      isOpen: true
    }
    eventBus.emit('showCharge', params)
  }
}
</script>
<style lang='scss' scoped>
.vipPrivileges-content {
  width: 1240px;
  margin: 30px auto 0;
  padding-bottom: 60px;
  .vipPrivileges-content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .vipPrivileges-content-top-left {
      color: var(--100, #fff);
      font-size: 20px;
      font-weight: 500;
    }
    .vipPrivileges-content-top-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 127px;
      height: 40px;
      border-radius: 24px;
      background: var(--unnamed, #171a2f);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      color: #fff;
      cursor: pointer;
      .svg {
        width: 12px;
        height: 12px;
      }
    }
  }
  .line {
    width: 1240px;
    height: 1px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.2);
    margin: 12px 0 26px 0;
  }
  .vipPrivileges-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .vipPrivileges-footer-item {
      width: 406px;
      height: 170px;
      border-radius: 10px;
      background-color: #fff;
      margin: 10px 0;
      cursor: pointer;
    }
  }
}
</style>