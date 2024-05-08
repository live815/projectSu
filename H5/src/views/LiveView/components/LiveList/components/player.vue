<template>
  <div class="live">
    <div class="video-box">
      <div class="video">
        <Player
          v-if="computedItem?.status === 2"
          :source="computedItem?.webrtcPullUrl || ''"
          ref="playerFirst"
          :muted="true"
          :controls="false"
          :poster="posterImg"
        />
      </div>
      <div v-if="showMask" class="mask" :style="dynamicStyles">
        <div class="lock" @click="jump">
          <IconLocked style="fill: #fff" />
        </div>
        <IconNoVolume v-if="noVolume" class="volume" @click.stop="changeVolume" />
        <IconVolume v-else class="volume" @click.stop="changeVolume" />
      </div>

      <div class="icon">
        <Animateview color="#ff5000" />
      </div>
      <div
        class="livetype"
        :class="{ entertainment: isEntertainment, 'cust-serv': isCustServ, sporting: isSporting }"
      >
        {{ displayText }}
      </div>
      <IconNoVolume v-if="noVolume" class="volume" @click.stop="changeVolume" />
      <IconVolume v-else class="volume" @click.stop="changeVolume" />
      <div class="transparent-layer" @click="jump"></div>
    </div>
    <detail :data="item" />
  </div>
</template>

<script setup>
import detail from './detail.vue'
import Player from '@/components/Player'
import Animateview from '@/components/Animate'
import { frontCoverTag } from '@/utils/config.js'
import { useRouter, useRoute } from 'vue-router'
import { getImg, isCTYWebApp, AppH5InteractionMethod } from '@/utils'
import { getToken } from '@/utils/cache'
import defaultBg from '@/assets/img/defaultBg.png'
import { getUserLivePayStatus } from '@/api/live'
import { useUserStore } from '@/stores/user.js'
import i18n from '@/i18n'

const user = useUserStore()
const httpRegex = /^(http|https):\/\/.*/
const alreadyPaid = ref(false)
const playerFirst = ref(null)
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => {}
  }
})
const noVolume = ref(true)
const router = useRouter()
const route = useRoute()
const isLogin = getToken()

onMounted(()=>{
  AppH5InteractionMethod('handleSound', true)
})

const computedItem = computed(() => {
  const item = props.item || {}
  return {
    ...item,
    webrtcPullUrl: item.webrtcPullUrl || '',
    roomStyle: item.roomStyle || '',
    frontCoverTag: item.frontCoverTag || ''
  }
})

const showMask = computed(() => {
  if (isLogin) {
    return computedItem.value?.viewPayAmount && alreadyPaid.value && user.userInfo.role !== 2
  } else {
    return computedItem.value?.viewPayAmount
  }
})

if (isLogin) {
  getUserLivePayStatus({
    liveStreamId: computedItem.value.id,
    memberId: user.userInfo.id
  }).then((res) => {
    alreadyPaid.value = !res.data
  })
}

const dynamicStyles = computed(() => {
  const defaultBgImg = {
    backgroundImage: `url(${defaultBg})` // 默认背景图片
  }
  const backgroundImage = computedItem.value?.viewPayAmount
    ? {
        backgroundImage: `url(${
          httpRegex.test(computedItem.value?.frontCoverImage)
            ? computedItem.value?.frontCoverImage
            : getImg(computedItem.value?.frontCoverImage)
        })`
      }
    : {}
  return computedItem.value?.frontCoverImage === '' ? defaultBgImg : backgroundImage
})
const posterImg = computed(() => {
  const defaultBgImg = window.location.origin + defaultBg
  const backgroundImage = httpRegex.test(computedItem.value?.frontCoverImage)
    ? computedItem.value?.frontCoverImage
    : import.meta.env.VITE_APP_BASE_API + computedItem.value?.frontCoverImage
  return computedItem.value?.frontCoverImage ? backgroundImage : defaultBgImg
})
const changeVolume = () => {
  if (!isCTYWebApp()) {
    noVolume.value = !noVolume.value
    playerFirst.value.handleMuted(noVolume.value)
  } else {
    noVolume.value = !noVolume.value
    AppH5InteractionMethod('handleSound', !noVolume.value)
  }
}
const jump = () => {
  if (isLogin) {
    if (props.item.gameId) {
      router.push({
        path: `/match-detail/${props.item.gameId}`,
        query: {
          data: 'fromLive',
          anchorId: props.item.presenterId,
          videoUrl: computedItem?.value.webrtcPullUrl,
          presenterName: props.item.presenterName,
          liveID: props.item.id,
          roomCode: props.item.roomCode
        }
      })
    } else {
      router.push({
        path: '/entertainmentLive',
        query: {
          data: 'fromLive',
          videoUrl: computedItem.value?.webrtcPullUrl,
          presenterName: props.item.presenterName,
          liveID: props.item.id,
          anchorId: props.item.presenterId,
          roomCode: props.item.roomCode
        }
      })
    }
  } else {
    router.push(`/login?redirect=${route?.fullPath}`)
  }
}

const isEntertainment = computed(() => computedItem.value.roomStyle === 4)
const isCustServ = computed(() => computedItem.value.frontCoverTag === 3 && !isEntertainment.value)
const isSporting = computed(() => computedItem.value.frontCoverTag === 2 && !isEntertainment.value)
const displayText = computed(() =>
  isEntertainment.value
    ? i18n.global.t('Lletter.bigshow')
    : frontCoverTag(i18n)[computedItem.value.frontCoverTag]
)
</script>
<style lang="scss" scoped>
.live {
  margin: 0 15px;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 10px;
  .video-box {
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16/9;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .video {
      width: 100%;
      aspect-ratio: 16/9;
    }
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    top: 0;
    z-index: 1001;
    .lock {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .icon {
    position: absolute;
    top: 4px;
    left: 4px;
    padding: 4px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.6);
  }
  .livetype {
    position: absolute;
    top: 6px;
    right: 8px;
    padding: 0 4px;
    height: 16px;
    border-radius: 10px;
    background: var(--4, linear-gradient(90deg, #00f0ff 0.17%, #2e68ff 101.4%));
    color: #fff;
    font-size: 10px;
    line-height: 18px;
  }
  .entertainment {
    background: var(--1, linear-gradient(90deg, #8728ff 0.17%, #f00 101.4%));
  }
  .cust-serv {
    background: var(--2, linear-gradient(90deg, #d3d803 0.17%, #04d13e 101.4%));
  }
  .sporting {
    background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
  }
  .volume {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 2;
  }
  .transparent-layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
