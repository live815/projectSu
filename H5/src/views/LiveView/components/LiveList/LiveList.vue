<template>
  <template v-if="liveIng?.length">
    <titleLink to="/live-page?active=2" :left="$t('Lletter.livebroadcast')" />
    <player :item="liveIng[0] || {}" />
    <div class="list-box">
      <List v-for="item in liveIng?.slice(1, 3)" :key="item.id" :item="item"></List>
    </div>
  </template>

  <template v-if="liveStore.liveList.length && ComingSoonList.length">
    <titleLink to="/live-page?active=3" :left="$t('Lletter.comingsoon')" />
    <div class="list-box">
      <List v-for="item in ComingSoonList" :key="item.id" :item="item"></List>
    </div>
  </template>

  <template v-if="liveStore.streamerLive.list?.length">
    <titleLink to="/anchor?active=2" :left="$t('Lletter.Anchor')" />
    <playList />
  </template>

  <van-tabs class="tabs" v-model:active="active" animated title-inactive-color="#999999">
    <van-tab>
      <template v-slot:title>
        {{ $t('Lletter.livevent') }}
        <span class="number">{{ competitionItems?.length || '' }}</span>
      </template>
    </van-tab>
    <van-tab>
      <template v-slot:title>
        {{ $t('Lletter.entertlive') }}
        <span class="number">{{ entertainmentLive?.length || '' }}</span>
      </template>
    </van-tab>
    <van-tab>
      <template v-slot:title>
        {{ $t('Lletter.anchornews') }}
      </template>
    </van-tab>
  </van-tabs>
  <template v-if="active === 0">
    <MatchList v-if="competitionItems?.length" :competitionItems="competitionItems" />
    <nodata v-else :src="nodataimg" :noTxt="$t('Lletter.Nolivevents')" />
  </template>

  <template v-else-if="active === 1">
    <div v-if="entertainmentLive?.length" class="list-box">
      <List
        v-for="item in entertainmentLive"
        :key="item.id"
        style="margin-top: 15px;"
        :item="item"
      />
    </div>
    <nodata v-else :src="nodataimg" :noTxt="$t('Lletter.Noentertainevents')" />
  </template>

  <StreamerDynamic v-else />
</template>

<script setup>
import titleLink from './components/titleLink.vue'
import player from './components/player.vue'
import List from './components/list.vue'
import MatchList from './components/matchList.vue'
import StreamerDynamic from './components/streamerDynamic.vue'
import playList from './components/playList.vue'
import nodata from '@/components/NoResult/NoResult'
import { useLiveList } from '@/stores/live'
import { getToken } from '@/utils/cache'
import nodataimg from '@/assets/img/nodata.png'

const liveStore = useLiveList()

const sortingFn = (list) => {
  if (!list?.length) {
    return []
  }
  // 将直播列表和用户已预约列表关联起来
  const mergedList = list.map((live) => {
    // 查找用户已预约的直播
    const reservedLive = liveStore.reservationList?.find((reserved) => reserved.id === live.id)
    // 将直播和预约信息合并
    return {
      ...live,
      reserved: reservedLive || null
    }
  })
  // 对合并后的列表进行排序
  const sortedList = mergedList?.sort((a, b) => {
    // 获取直播状态的辅助函数
    const getStatus = (live) => (live?.status === 2 ? 2 : live?.reserved?.status || 0)
    // 计算直播状态的差异
    const statusDiff = getStatus(b) - getStatus(a)

    // 如果直播状态不同，根据状态差异排序
    if (statusDiff !== 0) {
      return statusDiff
    }
    // 如果直播状态相同，根据播放开始时间排序
    return a.playStartTime?.localeCompare(b.playStartTime) || 0
  })

  return sortedList
}

const competitionItems = computed(() => {
  const liveList = liveStore.liveList.filter((item) => [1, 2, 3].includes(item.roomStyle))
  return sortingFn(liveList)
})
const init = () => {
  liveStore.getLiveListAction()
  liveStore.getStreamerLive()
  if (getToken()) {
    liveStore.getReserveLiveListAction()
  }
}
init()

const entertainmentLive = computed(() => {
  const liveList = liveStore.liveList.filter((item) => [4, 6].includes(item.roomStyle))
  return sortingFn(liveList)
})

// 将直播列表中未在直播的数据按照开播时间进行升序排序 （即将开播）
const ComingSoonList = computed(() => {
  const filteredList = liveStore.liveList.filter((item) => item.status !== 2)
  const sortedList = filteredList?.slice().sort((a, b) => {
    const dateA = new Date(a.playStartTime)
    const dateB = new Date(b.playStartTime)
    return dateA - dateB
  })
  const firstTwoElements = sortedList?.slice(0, 2)

  return firstTwoElements
})

const liveIng = computed(() => {
  return liveStore.liveList.filter((item) => {
    return item.status === 2
  })
})

const active = ref(0)
</script>

<style lang="scss" scoped>
@include tabStyle();

:deep() {
  .van-tabs__nav {
    background: #f7f7f7;
  }
  .van-tab--active .van-tab__text {
    color: #111;
    font-size: 16px;
  }
  .van-tab__text--ellipsis {
    font-size: 16px;
  }
}
.tit-wrapper {
  display: flex;
  align-items: center;
}

.number {
  font-family: DIN Alternate;
  font-size: 14px;
  font-weight: 700;
}
.box {
  margin-top: 30px;
}
.tabs {
  position: sticky;
  top: 42px;
}
.list-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 15px;
}
</style>
