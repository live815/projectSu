<template>
  <div class="anchor-view" :class="anchorViewClass">
    <template v-if="liveStore.streamerLive?.list?.length">
      <div class="this-field">
        <div class="title">{{ $t('Mletter.Anchorsession') }}</div>
        <template v-if="thisAnchor">
          <img class="backImg" :src="getImg(thisAnchor?.backgroundWall)" />
          <div class="text">{{ thisAnchor?.summary }}</div>
          <div class="avatar-name" @click="router.push(`/anchor-infor/${thisAnchor.id}`)">
            <img class="active" :src="getImg(thisAnchor?.avatar)" />
            <div class="name">{{ thisAnchor?.nickName }}</div>
          </div>
        </template>
        <template v-else>
          <div class="nodData">
            <img width="200" height="125" :src="noData" />
            <div>{{ $t('Mletter.Noanchorsession') }}</div>
          </div>
        </template>
      </div>
      <div class="title more" @click="router.push('/anchor?active=2')">
        {{ $t('Mletter.moreabchor') }}
      </div>
      <div class="more-anchors">
        <div v-for="item in liveIng" :key="item.id">
          <img class="backImg" :src="getImg(item.backgroundWall)" @click="jump(item)" />
          <div class="text">{{ item.summary }}</div>
          <div class="avatar-name" @click="router.push(`/anchor-infor/${item.id}`)">
            <img class="active" :src="getImg(item.avatar)" />
            <div class="name">{{ item.nickName }}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <NoData :text="$t('Mletter.Nodata')" />
    </template>
  </div>
</template>

<script setup>
import noData from '../../img/noData.png'
import NoData from '../NoData/NoData'
import { useLiveList } from '@/stores/live'
import { getImg } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { getToken } from '@/utils/cache'

const fbStore = useFBStore()
const route = useRoute()
const liveStore = useLiveList()
const props = defineProps(['id'])
const isLogin = getToken()
const router = useRouter()

// 根据条件动态设置视图高度
const anchorViewClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  const isFromLive = route.query.data === 'fromLive'

  return {
    'anchor-view-234': isMatchDetail234 && !liveStore.matchAnchorArr.length,
    'anchor-view-300': isFromLive
  }
})

const thisAnchor = computed(() => {
  const arr = liveStore.streamerLive.list?.find((item) => {
    return item.memberId == props.id
  })
  return arr
})
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
        // 添加直播列表字段到主播列表对象中
        const obj = {
          id: liveItem.id,
          status: liveItem.status,
          gameId: liveItem.gameId,
          presenterId: liveItem.presenterId,
          webrtcPullUrl: liveItem.webrtcPullUrl
        }
        anchor.liveObj = obj
      }
      return anchor
    })

  // 去掉本场主播
  const removeThisAnchor = anchorList?.filter((item) => item.id !== thisAnchor.value?.id)

  return removeThisAnchor
})

const jump = (item) => {
  if (isLogin) {
    if (item.liveObj.gameId) {
      router.push({
        path: `/match-detail/${item.liveObj.gameId}`,
        query: {
          data: 'fromLive',
          anchorId: item.liveObj.presenterId,
          videoUrl: item.liveObj.status === 2 ? item.liveObj.webrtcPullUrl : '',
          roomCode: item.liveObj.roomCode
        }
      })
    } else {
      router.push({
        path: '/entertainmentLive',
        query: {
          liveID: item.liveObj.id,
          anchorId: item.liveObj.presenterId,
          roomCode: item.liveObj.roomCode
        }
      })
    }
  } else {
    router.push(`/login?redirect=${route?.fullPath}`)
  }
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
</script>

<style lang="scss" scoped>
.anchor-view {
  @include mobile-padding();
  height: calc(var(--app-height) - 275px);
  overflow: auto;
  .this-field {
    margin-top: 15px;
  }
  .backImg {
    width: 164px;
    height: 107px;
    border-radius: 4px;
    object-fit: cover;
  }
  .title {
    color: #111;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .more {
    margin-top: 30px;
  }
  .text {
    @include textToOmit(160px);
    color: #111;
    font-size: 14px;
    font-weight: 600;
    margin: 12px 0;
  }
  .avatar-name {
    display: flex;
    line-height: 17px;
    margin-bottom: 15px;
    .active {
      width: 18px;
      height: 18px;
      border-radius: 50%;
    }
    .name {
      @include textToOmit();
      color: #999;
      font-size: 14px;
      margin-left: 7px;
    }
  }
  .more-anchors {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .nodData {
    text-align: center;
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
}
.anchor-view-234 {
  height: calc(var(--app-height) - 234px);
}
.anchor-view-300 {
  height: calc(var(--app-height) - 300px);
}
</style>
