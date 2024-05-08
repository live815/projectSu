<template>
  <div class="sports">
    <SHead />
    <van-sticky>
      <MatchType />
    </van-sticky>
    <BallType style="margin: 10px 0 15px" />
    <div class="divider"></div>
    <!-- 非冠军赛事 -->
    <template v-if="fbStore.queryMatchListParams.type !== 7">
      <!-- 过滤器 -->
      <Filter v-if="fbStore.queryMatchListParams.type" />
      <!-- 比赛列表 -->
      <van-skeleton :loading="loading">
        <template #template>
          <Skeleton />
        </template>
        <van-list
          v-model:loading="paginationLoading"
          :finished="finished"
          :finished-text="fbStore.matchList.length ? $t('Sportsview.Nomore') : ''"
          @load="onLoad"
          :immediate-check="false"
        >
          <MatchList />
        </van-list>
      </van-skeleton>
    </template>
    <!-- 冠军赛事 -->
    <template v-else>
      <van-skeleton :loading="loading">
        <template #template>
          <Skeleton />
        </template>
        <ChampionsList />
      </van-skeleton>
    </template>
    <!-- 投注购物车 -->
    <BetCart />
  </div>
</template>

<script setup>
import SHead from './components/SHead/SHead'
import MatchType from './components/MatchType/MatchType'
import BallType from './components/BallType/BallType'
import Filter from './components/Filter/Filter.vue'
import MatchList from './components/MatchList'
import BetCart from './components/BetCart/BetCart.vue'
import ChampionsList from './components/ChampionsList.vue'
import Skeleton from './components/Skeleton.vue'
import eventBus from '@/utils/eventBus'
import { onUnmounted, watch } from 'vue'
import { useFBStore } from '@/stores/fb'
import { useUserStore } from '@/stores/user'
import { useAnnouncementStore } from '@/stores/announcement'
const announcement = useAnnouncementStore()
const userStore = useUserStore()
const fbStore = useFBStore()
const loading = ref(false)
let fetchMatchListTimer = null
let prevMatchListInterval = null

let page = 1
const size = 50
const finished = ref(false)
const paginationLoading = ref(false)
onUnmounted(() => {
  StopInterval()
})
// 初始化
init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      // console.log('系统繁忙，稍后重试')
    }
  }
  // 获取比赛统计
  fbStore.getStatistical()
  // 获取比赛列表
  loading.value = true
  const { list, total } = await fetchMatchList(page)
  loading.value = false
  fbStore.matchList = list
  if (list.length >= total) {
    finished.value = true
  }
  StartInterval()
}
async function onLoad() {
  // 当加载更多比赛时，通知重置swiper
  eventBus.emit('initSwiper')
  page++
  let { list, total } = await fetchMatchList(page)
  paginationLoading.value = false
  fbStore.matchList.push(...list)
  if (fbStore.matchList.length >= total) {
    finished.value = true
  }
}
function StartInterval() {
  StopInterval()
  fetchMatchListTimer = setInterval(() => {
    updateMatchList()
  }, 8000)
}
function StopInterval() {
  clearInterval(fetchMatchListTimer)
  fetchMatchListTimer = null
}

async function updateMatchList() {
  // 更新数据前，保存上一个赛事列表用于对比赔率状态
  setPreviousMatchList()
  // 获取比赛统计
  fbStore.getStatistical()
  // 刷新余额
  userStore.getBalanceAction()
  // 获取比赛列表
  let result = []
  for (let i = 1; i < page + 1; i++) {
    const { list } = await fetchMatchList(i)
    result = result.concat(list)
  }
  fbStore.matchList = result
}
// 保存上一个赛事列表
function setPreviousMatchList() {
  fbStore.previousMatchList = [...fbStore.matchList]
  // 先清掉定时器
  if (prevMatchListInterval) {
    clearTimeout(prevMatchListInterval)
    prevMatchListInterval = null
  }
  // 启动定时器
  prevMatchListInterval = setTimeout(() => {
    fbStore.previousMatchList = []
    clearTimeout(prevMatchListInterval)
    prevMatchListInterval = null
  }, 2500)
}
// 获取比赛列表
function fetchMatchList(page) {
  const followReqData = {
    isPC: false,
    matchIds: fbStore.followList[fbStore.queryMatchListParams.sportId], //Object.values(fbStore.followList).flat(),
    orderBy: fbStore.queryMatchListParams.orderBy
  }
  let reqData = fbStore.queryMatchListParams.type ? fbStore.queryMatchListParams : followReqData

  return fbStore.getMatchList(
    Object.assign({}, reqData, {
      current: page,
      size
    })
  )
}
watch(
  () => fbStore.queryMatchListParams.type,
  () => {
    // 2.重置时间
    fbStore.queryMatchListParams.beginTime = null
    fbStore.queryMatchListParams.endTime = null
    // 3.重置球类
    fbStore.queryMatchListParams.sportId = 1
    // 4.重置排序
    fbStore.queryMatchListParams.orderBy = 0
    // 5.重置联赛leagueIds
    fbStore.queryMatchListParams.leagueIds = null
  }
)
watch(
  () => fbStore.queryMatchListParams.sportId,
  () => {
    // 2.重置时间
    fbStore.queryMatchListParams.beginTime = null
    fbStore.queryMatchListParams.endTime = null
    // 4.重置排序
    fbStore.queryMatchListParams.orderBy = 0
    // 5.重置联赛leagueIds
    fbStore.queryMatchListParams.leagueIds = null
  }
)
watch(fbStore.queryMatchListParams, async (data) => {
  // 切换分类是需要重置操作状态，自动展开折叠面板
  fbStore.isOperatedMatchListCollapse = false
  fbStore.previousMatchList = []
  // 冠军
  if (data.type === 7) {
    fbStore.matchList = []
  }
  // 获取比赛
  page = 1 // 重置页码
  loading.value = true
  const { list, total } = await fetchMatchList(page)
  loading.value = false
  fbStore.matchList = list
  if (list.length >= total) {
    finished.value = true
  } else {
    finished.value = false
  }
  // 处理关注
  if (!data.type) {
    const sid = data.sportId
    // 重置关注比赛列表
    fbStore.followList[sid] = list.map((match) => match.id)
  }
})
// 获取公共公告和站内信数据
announcement.getAnnouncementList()
</script>

<style lang="scss" scoped>
.sports {
  .divider {
    height: 10px;
    background: #f4f4f5;
  }
  :deep() {
    .van-skeleton {
      padding: 0 8px;
    }
  }
}
</style>
