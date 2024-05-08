<template>
  <div class="live-view">
    <NavBar
      :isShowRight="false"
      background="transparent"
      :showBackIcon="false"
      :isBack="false"
      @onClickLeft="back"
    >
      <template v-slot:backIcon>
        <img class="backIcon" :src="backIcon" />
      </template>
      <template v-slot>
        <div class="top-box">
          <div class="teamName">
            <div class="text">{{ fbStore.matchDetailList?.ts?.[0]?.na }}</div>
            <img :src="fbStore.matchDetailList?.ts?.[0]?.lurl || defaultIcon" />
          </div>
          <div class="center">
            <div class="date">
              {{ getMatchStatus(fbStore.matchDetailList, fbStore) }}
              <!-- 走表类型 -->
              <Counter
                v-if="isShowMatchCounter(fbStore.matchDetailList)"
                :tp="fbStore.matchDetailList?.mc.tp"
                :s="fbStore.matchDetailList?.mc.s"
                :r="fbStore.matchDetailList?.mc.r"
              />
            </div>
            <div class="score">
              {{ getTeamScore(fbStore.matchDetailList, 0) || 0 }} -
              {{ getTeamScore(fbStore.matchDetailList, 1) || 0 }}
            </div>
          </div>
          <div class="teamName">
            <img :src="fbStore.matchDetailList?.ts?.[1]?.lurl || defaultIcon" />
            <div class="text">{{ fbStore.matchDetailList?.ts?.[1]?.na }}</div>
          </div>
        </div>
      </template>
      <template v-slot:right>
        <img class="record" :src="recordIcon" @click="router.push('/user-center-bet-record')" />
      </template>
    </NavBar>
    <!-- 播放器 -->
    <div class="video">
      <Player
        v-if="liveStore.videoSource === 'video1' || fromLive"
        :source="fromLive ? liveUrl : url"
        :muted="true"
      />
      <iframe
        v-else
        :src="iframeSrc"
        width="100%"
        height="100%"
        scrolling="no"
        allow="autoplay"
        frameborder="0"
      ></iframe>
      <div v-if="route.query.videoUrl" class="barrage-box" ref="barrageBox">
        <div
          class="barrage"
          v-for="item in barrageMessages"
          :key="item"
          :style="{ top: item.top + 'px' }"
        >
          {{ HandlerAccountName(item.userName)
          }}<span class="send-out">{{ $t('Mletter.send') }}</span
          >{{ item.giftName }}<img width="16" height="16" :src="getImg(item?.img)" />
        </div>
      </div>
      <div v-if="lineList.length > 1" class="line" @click="switchLines">
        {{ $t('Mletter.Line') }}
      </div>
    </div>

    <!-- <div class="but-box">
      <img :src="anchorIcon" />
      <img :src="bomb" />
      <img :src="dynamic" @click="play('Animation')" />
      <img @click="enterFullscreen" :src="fullScreen" />
    </div> -->
  </div>
</template>

<script setup>
// import anchorIcon from '../../img/anchor.png'
// import bomb from './img/bomb.png'
// import dynamic from './img/dynamic.png'
// import fullScreen from './img/fullScreen.png'
import defaultIcon from '@/assets/img/default-team-logo.png'
import recordIcon from '../../img/record.png'
import backIcon from '../../img/back.png'
import { getMatchStatus, isShowMatchCounter, getTeamScore } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import Player from '@/components/Player'
import { useRoute, useRouter } from 'vue-router'
import eventBus from '@/utils/eventBus'
import { getImg, HandlerAccountName } from '@/utils'
import i18n from '@/i18n'
import { useChatroomStore } from '@/stores/chatroom'
import { useLiveList } from '@/stores/live'

const chatStore = useChatroomStore()
const fbStore = useFBStore()
const route = useRoute()
const router = useRouter()
const barrageMessages = ref({})
const barrageBox = ref(null)
const props = defineProps(['url'])
const emit = defineEmits(['play'])
const showingControls = ref(false) // 控制按钮的显示
const liveStore = useLiveList()

const fromLive = computed(() => {
  return route.query.data === 'fromLive'
})

const back = () => {
  if (!fromLive.value) {
    play('Top')
  } else {
    router.back()
  }
}

const play = (v) => {
  if (!fromLive.value) {
    emit('play', v)
  } else {
    router.back()
    emit('play', v)
    chatStore.getChatroomConfig(2)
  }
}
const toggleControls = () => {
  if (showingControls.value) {
    showingControls.value = false
  } else {
    showingControls.value = true
    setTimeout(() => {
      showingControls.value = false
    }, 5000)
  }
}
const liveUrl = computed(() => {
  return route.query.videoUrl ? route.query.videoUrl : props.url
})
// 发送弹幕
const triggerBarrage = (data, name) => {
  const height = Math.floor(Math.random() * (barrageBox.value?.clientHeight - 16)) // 弹幕的随机高度

  barrageMessages.value = [
    { userName: name, giftName: data.giftName, img: data.giftSmallImage, top: height }
  ]
}
eventBus.on('SendBarrages', (res) => {
  triggerBarrage(res.description, res.name)
})

const iframeSrc = computed(() => {
  return props.url
    ? `${props.url}&load_error=${i18n.global.t('Lletter.load_error')}&refresh=${i18n.global.t(
        'Pletter.refresh'
      )}&sound=1&volume_number=50&controls=1`
    : route.params.id
})
const lineList = computed(() => {
  const keys = Object.keys(liveStore.satelliteLive)
  const processedArray = keys.map((key, index) => {
    return {
      label: `线路${index + 1}`, // 生成 "线路1", "线路2" 等标签
      value: index + 1 // 生成相应的值
    }
  })

  return processedArray
})
const switchLines = () => {
  eventBus.emit('callLine')
}
onUnmounted(() => {
  eventBus.off('SendBarrages')
})
</script>

<style lang="scss" scoped>
.live-view {
  height: 190px;
  .backIcon {
    width: 20px;
    height: 20px;
  }
  .top-box {
    @include center-content();

    .teamName {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      .text {
        @include textToOmit(70px);
      }
      img {
        width: 13px;
        height: 13px;
        margin: 0 7px;
      }
    }
    .center {
      text-align: center;
      .date {
        color: var(--2, #ff5000);

        font-size: 10px;
        font-weight: 400;
        margin: 5px 0;
      }
      .score {
        color: #fff;
        font-family: DIN Alternate;
        font-size: 13px;
        font-weight: 700;
      }
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 375px;
    transition: bottom 0.5s ease; /* 平滑过渡动画 */
    .left {
      margin-left: 15px;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }
  }

  .controls.show {
    bottom: 55px;
  }
  .record {
    width: 24px;
    height: 24px;
  }
  .video {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    .barrage-box {
      position: absolute;
      top: 0;
      width: 100%;
      height: 70px;
      .barrage {
        position: absolute;
        border-radius: 24px 0px 0px 24px;
        background: linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.5) 0.17%,
          rgba(135, 40, 255, 0.5) 52.37%,
          rgba(0, 0, 0, 0) 100.88%
        );
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        padding-left: 8px;
        animation: moveToLeft 5s linear forwards;
        .send-out {
          font-weight: 400;
          opacity: 0.7;
        }
      }
    }

    @keyframes moveToLeft {
      from {
        right: -70px;
      }
      to {
        right: 100%;
      }
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
    }
    .line {
      width: 40px;
      height: 30px;
      background: #ff5000;
      position: absolute;
      right: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      color: #fff;
    }
  }
}
</style>
