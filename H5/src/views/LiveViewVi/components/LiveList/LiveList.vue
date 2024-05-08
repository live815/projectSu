<template>
  <div class="liveList-view">
    <div class="title">
      <img :src="tvIcon" />
      <span>Phát sóng trực tiếp</span>
    </div>
    <div v-if="liveList.length" class="list">
      <div class="list-item" v-for="item in liveList" :key="item.id" @click="jump(item)">
        <div class="bg" :style="{ backgroundImage: generateBackgroundStyle(item.frontCoverImage) }">
          <div v-if="item.heat" class="heat">
            <img :src="fire" />
            <p>{{ item.heat }}W</p>
          </div>
          <div class="tip">{{ displayText(item) }}</div>
        </div>
        <!-- 房间锁图标，设置直播付费金额时显示 -->
        <div v-if="item.viewPayAmount && user.userInfo.role !== 2" class="lock">
          <IconLocked style="fill: #fff" />
        </div>

        <div class="bottom">
          <p class="event-name">{{ item.associatedLeague || item.roomTitle }}</p>
          <div class="anchor">
            <img :src="item.presenterAvatar ? getImg(item.presenterAvatar) : defaultAvatar" />
            <p>{{ item.presenterName }}</p>
          </div>
        </div>
      </div>
    </div>
    <NoData v-else :imgSrc="nodataimg" :noTxt="$t('Lletter.Llettertip5')" />
  </div>
</template>

<script setup>
import { getImg } from '@/utils'
import { useUserStore } from '@/stores/user.js'
import defaultBg from '@/assets/img/defaultBg.png'
import { getToken } from '@/utils/cache'
import { useRouter } from 'vue-router'
import { frontCoverTag } from '@/utils/config.js'
import NoData from '@/components/NoResult/NoResult'
import nodataimg from '@/assets/img/nodata.png'
import i18n from '@/i18n'
import fire from './img/fire.png'
import tvIcon from './img/tv.png'

const user = useUserStore()
const isLogin = getToken()
const router = useRouter()
const httpRegex = /^(http|https):\/\/.*/
defineProps({
  liveList: {
    type: Object
  }
})

const generateBackgroundStyle = (imagePath) => {
  if (httpRegex.test(imagePath)) {
    return `url(${imagePath})`
  } else if (imagePath) {
    return `url(${getImg(imagePath)})`
  } else {
    return `url(${defaultBg})`
  }
}

const displayText = computed(() => (item) => {
  return item.roomStyle === 4
    ? i18n.global.t('Lletter.bigshow')
    : frontCoverTag(i18n)[item.frontCoverTag]
})

const jump = (item) => {
  if (isLogin) {
    if (item.gameId) {
      router.push({
        path: `/match-detail/${item.gameId}`,
        query: {
          data: 'fromLive',
          anchorId: item.presenterId,
          videoUrl: item.status === 2 ? item.webrtcPullUrl : '',
          presenterName: item.presenterName,
          liveID: item.id,
          roomCode: item.roomCode
        }
      })
    } else {
      router.push({
        path: '/entertainmentLive',
        query: {
          data: 'fromLive',
          liveID: item.id,
          presenterName: item.presenterName,
          anchorId: item.presenterId,
          roomCode: item.roomCode
        }
      })
    }
  } else {
    router.push('/Login')
  }
}
</script>

<style lang="scss" scoped>
.liveList-view {
  padding: 0 10px;
  margin-top: 20px;
  .list {
    height: calc(var(--app-height) - 380px);
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .title {
    display: flex;
    color: #333;
    font-size: 15px;

    img {
      width: 22px;
      height: 22px;
    }
  }
  .list-item {
    height: 154px;
    position: relative;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 5px;
    .bg {
      position: relative;
      width: 100%;
      height: 92px;
      background-repeat: no-repeat;
      background-size: cover;
      .heat {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        font-size: 10px;
        padding: 3px 6px 0 0;
        img {
          width: 18px;
          height: 18px;
        }
      }
      .tip {
        position: absolute;
        bottom: 10px;
        right: 0;
        height: 16px;
        padding: 0 6px;
        border-radius: 90px 0px 0px 90px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 8px;
        text-align: center;
        line-height: 16px;
      }
    }
    .lock {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .bottom {
      color: #000;

      padding: 12px 8px;
      .event-name {
        @include textToOmit(200px);
        font-size: 13px;
      }
      .anchor {
        display: flex;
        align-items: center;
        font-size: 9px;
        margin-top: 5px;
        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
  }
  .box {
    margin-top: 100px;
  }
}
</style>