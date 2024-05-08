<template>
  <div class="list-wrapper">
    <!-- 注单列表 -->
    <van-list
      v-if="betList.length"
      v-model:loading="loading"
      :finished="finished"
      :finished-text="$t('Sportsview.Nomore')"
      @load="onLoad"
    >
      <!-- <BetRecordList :list="betList" :currentIndex="0" :priceList="priceList" /> -->
      <CurrentRecordList :list="betList" :currentIndex="0" :priceList="priceList" />
    </van-list>
    <NoResult :imgSrc="noRecordImg" v-else style="margin-top: 100px" />
  </div>
</template>

<script setup>
import noRecordImg from '@/components/NoResult/img/records.png'
import { betRecord, priceRecord } from '@/api/fb'
import { useFBStore } from '@/stores/fb'
import { onUnmounted } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'

const fbStore = useFBStore()

// 注单列表
const betList = ref([])
let page = 1 // 当前页码
const size = 50 // 每页数值
const loading = ref(false)
const finished = ref(false)
//定时器
let fetchPriceTimer = null
onMounted(() => {
  startInterval()
})
// 必须在async await 语法前注册onUnmounted钩子
onUnmounted(() => {
  stopInterval()
})
init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    await fbStore.getFBToken()
  }
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  const { list, total } = await handleQuery(page)
  betList.value = list
  if (list.length >= total) {
    finished.value = true
  }
  // 提前结算金额
  queryPrice()
}
// 滚动加载回调
async function onLoad() {
  page++
  let { list, total } = await handleQuery(page)
  loading.value = false
  betList.value.push(...list)
  if (betList.value.length >= total) {
    finished.value = true
  }
}
// 查询投注记录
async function handleQuery(page) {
  const res = await betRecord({
    isSettled: false,
    current: page,
    size
  })
  closeToast()
  const total = res.total
  const list = res.records || []
  return { list, total }
}

function startInterval() {
  fetchPriceTimer = setInterval(async () => {
    queryPrice()
    let result = []
    for (let i = 1; i < page + 1; i++) {
      const { list } = await handleQuery(i)
      result = result.concat(list)
    }
    betList.value = result
  }, 8000)
}
function stopInterval() {
  clearInterval(fetchPriceTimer)
  fetchPriceTimer = null
}

// 提前结算报价
const priceList = ref([])
const queryPrice = () => {
  const orderIds = betList.value.map((item) => item.id)
  priceRecord({
    orderIds
  }).then((res) => {
    priceList.value = res.pr || []
  })
}
</script>

<style lang="scss" scoped>
$appHeight: var(--app-height);
$popHeight: calc($appHeight * 0.9);
$headerHeight: 95px;
.list-wrapper {
  padding-top: 15px;
  // border:1px solid red;
  height: calc($popHeight - $headerHeight);
  overflow: auto;
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
