<template>
  <div class="container">
    <NavBar :isShowRight="false" :title="$t('Lletter.Anchor')" />
    <van-tabs class="tabs" v-model:active="active" animated title-inactive-color="#999999">
      <van-tab :title="$t('Lletter.all')"> </van-tab>
      <van-tab :title="$t('Lletter.livebroadcast')"> </van-tab>
    </van-tabs>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in tablist"
        :key="index"
        @click="navigateToAnchorInfo(item)"
      >
        <div class="avatar-box" :class="{ active: getLiveStatus(item.id) }">
          <img :class="{ active: getLiveStatus(item.id) }" :src="getImg(item.avatar)" />
        </div>

        <h1>{{ item.nickName }}</h1>
        <div class="conten-box">
          <IconHot />
          {{ item.subscriptionNum }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar/NavBar.vue'
import { useLiveList } from '@/stores/live'
import { getImg } from '@/utils'
import { getToken } from '@/utils/cache'
const route = useRoute()
const { query } = route

const isLogin = getToken()
const liveStore = useLiveList()
const active = ref(0)
const router = useRouter()

const navigateToAnchorInfo = (item) => {
  if (isLogin) {
    if (getLiveStatus(item.id)) {
      if (item.gameId) {
        router.push({
          path: `/match-detail/${item.gameId}`,
          query: {
            data: 'fromLive',
            anchorId: item.presenterId,
            videoUrl: item.status === 2 ? item.webrtcPullUrl : '',
            liveID: item.id,
            roomCode: item.roomCode
          }
        })
      } else {
        router.push({
          path: '/entertainmentLive',
          query: {
            liveID: item.id,
            anchorId: item.presenterId,
            roomCode: item.roomCode
          }
        })
      }
    } else {
      router.push(`/anchor-infor/${item.id}`)
    }
  } else {
    router.push(`/login?redirect=${route.fullPath}`)
  }
}

const liveIng = computed(() => {
  // 直播中列表
  const liveList = liveStore.liveList.filter((item) => {
    return item.status === 2
  })

  // 在直播中的所有主播
  const anchorList = liveStore.streamerLive?.list

    ?.filter((item) => liveList?.some((liveItem) => liveItem.presenterId == item.memberId))
    ?.map((anchor) => {
      const liveItem = liveList.find((liveItem) => liveItem.presenterId === anchor.memberId)
      if (liveItem) {
        // 添加主播列表字段到主播列表对象中
        anchor.id = liveItem.id
        anchor.status = liveItem.status
        anchor.gameId = liveItem.gameId
        anchor.presenterId = liveItem.presenterId
        anchor.webrtcPullUrl = liveItem.webrtcPullUrl
      }
      return anchor
    })
  return anchorList
})

const tablist = computed(() => {
  if (active.value === 0) {
    return liveStore.streamerLive.list
  } else {
    return liveIng.value
  }
})

const getLiveStatus = (id) => {
  return liveIng.value.some((item) => {
    return item.id === id
  })
}

const init = () => {
  if (!Object.keys(liveStore.streamerLive)?.length) {
    liveStore.getStreamerLive()
  }
  if (!liveStore.liveList.length) {
    liveStore.getLiveListAction()
  }
}
init()
active.value = +query.active
</script>

<style lang="scss" scoped>
@include tabStyle();
.container {
  background: white;
  :deep() {
    .van-tabs__nav {
      background: #f7f7f7;
    }
  }
}
.item {
  position: relative;
  border-radius: 2px;
  margin: 12px 16px;
  height: 48px;
  margin-bottom: 24px;
  padding-left: 64px;
  .avatar-box {
    @include center-content();
    width: 56px;
    height: 56px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    margin-top: -5px;
    img {
      border-radius: 50%;
      width: 48px;
      height: 48px;
    }
    .active {
      border: 2px solid #ff9000;
      background: lightgray 0px -32.289px / 131.944% 175.926% no-repeat,
        lightgray 0px 0px / 100% 100% no-repeat;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 144, 0, 0.4);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(255, 144, 0, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 144, 0, 0);
      }
    }
  }
  .active {
    background: linear-gradient(
      317deg,
      rgba(250, 64, 55, 0.2) 20.71%,
      rgba(255, 140, 26, 0.2) 49.29%,
      rgba(252, 202, 107, 0.2) 77.86%
    );
  }
  h1 {
    color: #333;
    font-size: 16px;
    line-height: 20px;
  }
  .conten-box {
    border-radius: 2px;
    width: max-content;
    margin-top: 5px;
    padding: 2px 3px;
    color: #8c8c8c;
    background-color: #f5f5f5;
    font-size: 9px;
    svg {
      margin-bottom: -2px;
    }
  }
}
</style>
