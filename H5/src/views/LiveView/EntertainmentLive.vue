<template>
  <div class="container">
    <header>
      <div @click="router.back()">
        <IconBack class="icon" />
      </div>
      <p class="title">&nbsp;&nbsp;{{ LiveInfo?.roomTitle }}</p>
    </header>
    <div class="video">
      <player v-if="LiveInfo?.status === 2" :source="LiveInfo?.webrtcPullUrl"  :muted="true" />
      <div v-else class="backImg" :style="{ backgroundImage: `url(${getVideoImg})` }"></div>
      <div class="mask" v-if="LiveInfo?.viewPayAmount && alreadyPaid && user.userInfo.role !== 2">
        <div class="icon" @click="show = true">
          <IconLocked />
        </div>
      </div>
      <div class="barrage-box" ref="barrageBox">
        <div
          class="barrage"
          v-for="item in barrageMessages"
          :key="item"
          :style="{ top: item.top + 'px' }"
        >
          {{ HandlerAccountName(item.userName)
          }}<span class="send-out">{{ $t('Lletter.send') }}</span
          >{{ item.giftName }}<img width="16" height="16" :src="getImg(item?.img)" />
        </div>
      </div>
    </div>
    <van-tabs v-model:active="activeName" v-if="chatStore.loading">
      <van-tab v-if="chatStore.chatroomConfig?.chatRoomEnable" name="chat">
        <template #title>
          <span>{{ $t('Lletter.chatroom') }}</span>
          <div class="title"></div>
        </template>
        <Chatroom :isMatch="false" />
      </van-tab>
      <van-tab :title="$t('Lletter.moreanchor')" name="more">
        <Anchor :id="LiveInfo?.presenterId"
      /></van-tab>
    </van-tabs>
    <van-action-sheet v-model:show="show" :title="$t('Lletter.paytoview')">
      <div class="content">
        <h1>{{ $t('Lletter.Llettertip1') }}</h1>
        <div class="price"><CurrencyUnit />{{ LiveInfo?.viewPayAmount }}</div>
        <div class="discrib">{{ $t('Lletter.Llettertip2') }}</div>
        <div class="btnbox">
          <van-button block style="color: #333" color="#F5F6F9" @click="show = false">{{
            $t('Lletter.close')
          }}</van-button>
          <van-button type="primary" block @click="goPlay">{{
            $t('Lletter.confirmpay')
          }}</van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-popup v-model:show="rechargeTips">
      <p class="text1">{{ $t('Lletter.Insufficientbalance') }}</p>
      <p class="text2">{{ $t('Lletter.Llettertip3') }}</p>
      <div class="btnbox">
        <button class="cancel" @click="rechargeTips = false">
          {{ $t('Lletter.cancel') }}
        </button>
        <button class="top-up" @click="router.push('/deposit')">
          {{ $t('Lletter.gorecharge') }}
        </button>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import player from '@/components/Player'
import { useRouter, useRoute } from 'vue-router'
import Chatroom from '@/views/MatchDetailView/componets/Chatroom/Chatroom'
import Anchor from '@/views/MatchDetailView/componets/Anchor/Anchor.vue'
import { getLiveInfo, getUserLivePayStatus, livePay } from '@/api/live'
import { getImg, HandlerAccountName } from '@/utils'
import defaultBg from '@/assets/img/defaultBg.png'
import { useUserStore } from '@/stores/user.js'
import { showToast } from 'vant'
import { useChatroomStore } from '@/stores/chatroom'
import eventBus from '@/utils/eventBus'
import i18n from '@/i18n'
import useWebSocket from '@/hooks/useWebSocket'
import { useLiveList } from '@/stores/live'

const liveStore = useLiveList()
const chatStore = useChatroomStore()
const user = useUserStore()
const route = useRoute()
const router = useRouter()
const show = ref(false)
const activeName = ref('chat')
const alreadyPaid = ref(true)
const LiveInfo = ref()
const barrageBox = ref(null)
const barrageMessages = ref([])
const rechargeTips = ref(false)

const handleNewMessage = (message) => {
  try {
    const newData = JSON.parse(message)
    // 更新直播列表
    if (newData.businessType === 'liveStream') {
      liveStore.liveList = newData.businessContent
      // 判断最新的直播列表是否有当前直播，没有表示为关闭了直播
      const isCloseLive = newData.businessContent.some((item) => item.id == route.query.liveID)
        if (!isCloseLive) {
          router.back()
        }
    } else if (newData.businessType === 'chatRoomConfig') {
      chatStore.updateChatroomConfig(newData.businessContent[0])
    } else if (newData.businessType === 'memberUntie') {
      chatStore.updateMemberUntie(newData.businessContent[0])
    }
  } catch {
    console.error(message)
  }
}
const { initWs, close } = useWebSocket(import.meta.env.VITE_WS, handleNewMessage)

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

const goPlay = () => {
  if (Number(user.balance) < LiveInfo.value.viewPayAmount) {
    show.value = false
    rechargeTips.value = true
    return
  }

  const data = {
    amount: LiveInfo.value?.viewPayAmount,
    liveStreamId: LiveInfo.value?.id,
    memberId: user.userInfo.id,
    memberName: user.userInfo.userName
  }
  livePay(data).then((res) => {
    if (res.data) {
      showToast(i18n.global.t('Lletter.paysuccessful'))
      alreadyPaid.value = false
    } else {
      showToast(res.msg)
    }
  })
  show.value = false
}
const getVideoImg = computed(() => {
  return LiveInfo.value?.frontCoverImage ? getImg(LiveInfo?.value.frontCoverImage) : defaultBg
})
const init = () => {
  getLiveInfo(Number(route.query.liveID)).then((res) => {
    if (res.code === 200) {
      LiveInfo.value = res.data
    }
  })
  getUserLivePayStatus({
    liveStreamId: Number(route.query.liveID),
    memberId: user.userInfo.id
  }).then((res) => {
    alreadyPaid.value = !res.data
  })

  const chatRoomType = route.query.liveID ? 1 : 2
  chatStore.getChatroomConfig(chatRoomType)

  if (!liveStore.isConnected) {
    initWs() // 初始化ws连接
  }
}

init()
onUnmounted(() => {
  close()
  eventBus.off('SendBarrages')
})
</script>
<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  p,
  span {
    color: #202020;
    font-size: 14px;
    font-weight: 600;
  }
  .title {
    @include textToOmit(320px);
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}

.video {
  position: relative;
  height: 213px;
  .backImg {
    widows: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 40px;
      background: rgba(0, 0, 0, 0.3);
    }
  }
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
}
.content {
  padding: 8px 16px;
  h1 {
    color: #333;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
  }
  .price {
    margin-top: 39px;
    color: #333;
    text-align: center;
    font-family: DIN Alternate;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 100% */
  }
  .discrib {
    color: #999;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }
  .btnbox {
    margin-top: 43px;
    display: flex;
    gap: 15px;
  }
}
header {
  padding: 12px;
  color: #202020;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  .icon {
    vertical-align: text-top;
    margin-right: 10px;
  }
}
:deep() {
  .van-popup--center {
    width: 310px;
    border-radius: 12px;
    text-align: center;
    padding: 32px 0 24px 0;
    .text1 {
      color: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
      font-size: 18px;
      font-weight: 600;
    }
    .text2 {
      color: var(--text-icon-font-gy-260, rgba(0, 0, 0, 0.6));
      font-size: 16px;
      padding: 18px 0 30px 0;
    }
    button {
      width: 125px;
      height: 40px;
      border-radius: 6px;
      font-size: 16px;
      border: none;
    }
    .cancel {
      background: var(--4, #fff5f0);
      color: var(--2, #ff5000);
      margin-right: 12px;
    }
    .top-up {
      color: var(--text-icon-font-wh-1100, #fff);
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
  }
}
</style>
