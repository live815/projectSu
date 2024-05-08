<template>
  <div class="sport-bet">
    <SprotHeader
      v-model:currentIndex="currentIndex"
      v-model:timeRange="timeRange"
      v-model:bookTypeIdx="bookTypeIdx"
      :settledTotal="settledTotal"
      :unsettledTotal="unsettledTotal"
      :bookBetTotal="bookBetTotal"
    />
    <div class="settled-list-content" v-if="betList.length">
      <!-- 已结算统计数据 -->
      <SettledStats v-if="currentIndex === 1" :betSts="betSts" :settledTotal="settledTotal" />
      <!-- 注单列表 -->
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="$t('BetrecordView.Nomore')"
        @load="onLoad"
      >
      <!-- 注单记录 -->
        <BetRecordList
           v-if="currentIndex !== 2"
          :list="betList"
          :currentIndex="currentIndex"
          :priceList="priceList"
        />
      <!-- 预约投注注单记录 -->
      <BookRecordList 
          v-if="currentIndex == 2" 
          @refreshBookBetList="getBookBetRecordList" 
          :list="booklist" 
          :priceList="priceList" 
          :currentIndex="currentIndex"/>
      </van-list>
    </div>
    <NoData v-else />
  </div>
</template>

<script setup>
import SprotHeader from './SprotHeader.vue'
import SettledStats from './SettledStats.vue'
import NoData from '../NoData/NoData.vue'
import { ref, watch, onUnmounted } from 'vue'
import { betRecord, priceRecord, bookBetRecordList } from '@/api/fb'
import  BookRecordList  from '@/components/BookRecordList/BookRecordList'
import {  getDateTimeStampRange } from '@/utils'
import {vsportBetRecord} from '@/api/game'
import { useFBStore } from '@/stores/fb'
import { showLoadingToast, closeToast } from 'vant'
import { debounce } from 'lodash'
import { getDay } from '@/utils'
import i18n from '@/i18n'

// const emit = defineEmits(['update:timeRange'])

const fbStore = useFBStore()
const currentIndex = ref(0)
const bookTypeIdx = ref(0)
// 初始化时间
const timeRange = ref({
  startTime: '',
  endTime: ''
})
// 注单列表
const betList = ref([])
// 预约注单列表
const booklist = ref([])
let page = 1 // 当前页码
const size = 50 // 每页数值
const loading = ref(false)
const finished = ref(false)
//已结算总数和输赢列表
const betSts = ref([])
//已结算的总数
const settledTotal = ref(0)
//未结算的总数
const unsettledTotal = ref(0)
// 预约注单总数
const bookBetTotal = ref(0)

//定时器
let fetchPriceTimer = null

// onMounted(() => {
//   startInterval()
// })
// 必须在async await 语法前注册onUnmounted钩子
onUnmounted(() => {
  stopInterval()
})

init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      console.log(e.message)
    }
  }
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  const currentDate = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(currentDate.getDate() - 30)
  const startTime = new Date(
    sevenDaysAgo.getFullYear(),
    sevenDaysAgo.getMonth(),
    sevenDaysAgo.getDate(),
    0,
    0,
    0,
    0
  ).getTime()
  const endTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59,
    999
  ).getTime()
  timeRange.value.startTime = startTime
  timeRange.value.endTime = endTime
  // 注单列表
  const { list, total } = await getBetRecordList(page)
  betList.value = list
  if (list.length >= total) {
    finished.value = true
  }
  // 提前结算金额
  getSettlePriceList()
}
// 滚动加载回调
async function onLoad() {
  page++
  let { list, total } = await getBetRecordList(page)
  // const res = getBetRecordList(page)
  loading.value = false
  betList.value.push(...list)
  if (betList.value.length >= total) {
    finished.value = true
  }
}
watch(
  [currentIndex, timeRange, bookTypeIdx],
  debounce(async () => {
    // 点选指定日期范围时加载列表
    showLoadingToast({
      message: i18n.global.t('common.loading'),
      forbidClick: true,
      duration: 0
    })
    betList.value = []
    // 预约注单列表
    if (currentIndex.value === 2) {
      getBookBetRecordList()
    } else {
      // 重置页码
      page = 1
      // 已结算/未结算
      const { list, total } = await getBetRecordList(page)
      // const res = getBetRecordList(page)
      if (list.length >= total) {
        finished.value = true
      } else {
        finished.value = false
      }
      betList.value = list
    }
  }, 10)
)
// 查询注单记录列表
// function getBetRecordList(page) {
//   console.log(21342)
//   return betRecord({
//     isSettled: currentIndex.value ? true : false,
//     current: page,
//     size: size,
//     startTime: currentIndex.value ? timeRange.value.startTime : '',
//     endTime: currentIndex.value ? timeRange.value.endTime : ''
//   })
//     .then((res) => {
//       closeToast()
//       const total = res.total
//       const list = res.records || []
//       if (currentIndex.value) {
//         settledTotal.value = total
//         betSts.value = res.sts || []
//       } else {
//         unsettledTotal.value = total
//       }
//       return { list, total }
//     })
//     .catch(() => {
//       closeToast()
//     })
// }
// 获取注单
function getBetRecordList() {
  return vsportBetRecord({
    settleFlag: currentIndex.value,
    pager:{
      current: page,
      size: size,
    },
    lobbyCode: "C_SPORTS",
    startTime: timeRange.value.startTime,
    endTime: timeRange.value.endTime
  })
    .then((res) => {
      closeToast()
      const total = res.data.totalOrderCount
      const list = res.data?.pageObj?.records || []
      if (currentIndex.value) {
        settledTotal.value = total
        betSts.value = res.data || []
      } else {
        unsettledTotal.value = total
      }
      return { list, total }
      // orderIds.value = tableData.value.map((item) => item.id)
      // if (
      //   res.data.pageObj.records?.length > 0 &&
      //   curTab.value == 1 &&
      //   fbStore.queryMatchListParams.current == 1
      // ) {
      //   totalBet.value = res.data.totalOrderAmount || 0 //总投注额
      //   totalWin.value = res.data.totalProfitAmount || 0 //输赢 
      //   totalNum.value = res.data.totalOrderCount || 0 //总计单数
      //   totalValidFlow.value = res.data.totalValidFlow || 0 //总有效流水
      // }
    })
    .catch((e) => {
      closeToast()
      console.log(e)
    })
}
// 查询预约注单列表
function getBookBetRecordList() {
  const isFailed = bookTypeIdx.value ? true : false
  const reqData = {
    isFailed
  }
  if (isFailed) {
    reqData.startTime = getDay(-7) + ' 00:00:00'
    reqData.endTime = getDay(0) + ' 23:59:59'
  }
  return bookBetRecordList(reqData)
    .then((res) => {
      betList.value = res || []
      booklist.value = res || []
      bookBetTotal.value = res.length
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
}

// function startInterval() {
//   fetchPriceTimer = setInterval(async () => {
//     // 如果查询未结算注单，需要同时获取结算报价列表
//     if (currentIndex.value === 0) {
//       getSettlePriceList()
//       let result = []
//       for (let i = 1; i < page + 1; i++) {
//         const { list } = await getBetRecordList(i)
//         result = result.concat(list)
//       }
//       betList.value = result
//     }
//   }, 8000)
// }
function stopInterval() {
  clearInterval(fetchPriceTimer)
  fetchPriceTimer = null
}

// 结算报价列表
const priceList = ref([])
const getSettlePriceList = () => {
  const orderIds = betList.value.map((item) => item.id)
  if (orderIds.length) {
    priceRecord({
      orderIds
    }).then((res) => {
      priceList.value = res.pr || []
    })
  }
}
</script>

<style lang="scss" scoped>
.sport-bet {
  .settled-list-content {
    padding: 0 7px 15px;
  }
}
</style>
