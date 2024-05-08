<template>
  <div class="content-card">
    <VipRecord></VipRecord>
    <div
      class="content-card-details"
      :class="{ 'margin-style': slidesStore.getActiveSlideIndex === 0 }"
      @click="router.push('/vipDetailsView')"
    >
      {{ $t('Vletter.vipdetail') }}<span><van-icon name="arrow" /></span>
    </div>
    <VipOverview></VipOverview>
    <HeadlineTitle class="title" :leftTitle="$t('Vletter.VIPwithdrawallimit')"></HeadlineTitle>
    <VipUpgrade></VipUpgrade>

    <template v-if="slidesStore.vipSwitchConfigData.rebateSwitch == '0'">
      <HeadlineTitle class="title" :leftTitle="$t('Vletter.VIPoffer')"></HeadlineTitle>
      <VipDiscount></VipDiscount>
    </template>

    <div class="content-card-text" v-if="slidesStore.vipSwitchConfigData.rebateSwitch == '0'">
      {{ $t('Vletter.tip27')
      }}<span @click="openCustomerServiceLink">{{ $t('Vletter.onlineservice') }}</span
      >{{ $t('Vletter.consult') }}。
    </div>
    <img class="bg-img" :src="grade7" />
    <div class="content-card-footer">
      <img class="img-item" :src="grade8" @click="onClickOpen(1)" />
      <img class="img-item" :src="grade9" @click="onClickOpen(2)" />
      <div class="img-box">
        <img :src="grade10" @click="onClickOpen(3)" />
        <div class="img-box-right">
          <img class="imgs" :src="grade11" @click="onClickOpen(4)" />
          <img class="imgs" :src="grade12" @click="onClickOpen(5)" />
        </div>
      </div>
      <img class="img-item" :src="grade13" @click="onClickOpen(6)" />
    </div>
  </div>
  <VideoPopup v-if="isShowVideo" @close="closeVideo" :isShowVideo="isShowVideo"></VideoPopup>
</template>

<script setup>
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { useSlidesStore } from '@/stores/vipSlides'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import VipRecord from '../VipRecord/VipRecord'
import VipOverview from '../VipOverview/VipOverview'
import VipUpgrade from '../VipUpgrade/VipUpgrade'
import VipDiscount from '../VipDiscount/VipDiscount'
import VideoPopup from './components/VideoPopup.vue'
import { useRouter } from 'vue-router'
import { openCustomerServiceLink } from '@/utils/customerService'

const router = useRouter()
const appStore = useAppStore()

const slidesStore = useSlidesStore()

// 直播视频弹窗
const isShowVideo = ref(false)

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
const grade13 = computed(() => {
  return new URL(`./img/${appStore.language}/grade13.png`, import.meta.url).href
})

// 专属特权
const onClickOpen = (val) => {
  switch (val) {
    case 1:
      return router.push('/vipYacht')
    case 2:
      return router.push('/vipBusinessGirl')
    case 3:
      return router.push('/vipDetailsView')
    case 4:
      return (isShowVideo.value = true)
    case 5:
      return router.push('/vipDedicatedManager')
    case 6:
      return router.push('/deposit')
  }
}

const closeVideo = () => {
  isShowVideo.value = false
}
</script>

<style lang="scss" scoped>
.content-card {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-top: 70px;

  .content-card-details {
    width: 189px;
    height: 36px;
    margin: 24px auto 0;
    line-height: 36px;
    text-align: center;
    border-radius: 80px;
    background: #ddd;
    color: #111;
    font-size: 15px;
  }
  .margin-style {
    margin-top: 35px;
  }
  .title {
    margin-left: 30px;
  }

  .content-card-text {
    width: 345px;
    // height: 46px;
    margin: 14px auto;
    color: #999;

    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    span {
      color: var(--1, #f53f3f);
      font-size: 13px;
      line-height: 20px;
      text-decoration-line: underline;
    }
  }
  .bg-img {
    width: 339px;
    height: 30px;
    margin: 20px auto 0;
  }
  .content-card-footer {
    margin: 15px auto 50px;
    width: 355px;

    .img-item {
      width: 100%;
      height: 140px;
      margin-bottom: 10px;
      border-radius: 8px;
    }
    .img-box {
      display: flex;
      width: 100%;
      height: 222px;
      margin-bottom: 10px;
      img {
        width: 169px;
        height: 222px;
        margin-right: 10px;
        border-radius: 8px;
      }
      .img-box-right {
        .imgs {
          width: 176px;
          height: 106px;
          border-radius: 8px;
        }
        .imgs:last-child {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
