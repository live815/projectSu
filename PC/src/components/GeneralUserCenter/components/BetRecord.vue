<!-- 投注记录 -->
<template>
  <div class="main-container BetRecord">
    <div class="button">
      <div :class="curTab == 1 ? 'active' : ''" @click="changetab(1)">
        {{ $t('GeneralUserCenter.Sport') }}
      </div>
      <div :class="curTab == 2 ? 'active' : ''" @click="changetab(2)">
        {{ $t('GeneralUserCenter.Game') }}
      </div>
    </div>
    <!-- 体育投注记录 -->
    <SportBetRecord
      v-if="curTab == 1"
      :totalValidFlow="totalValidFlow"
      :totalWin="totalWin"
      :totalBet="totalBet"
      :tabledata="filtedList"
      :totalNum="totalNum"
      @updatePage="updatePage"
      @upadtePageSize="upadtePageSize"
      :priceList="priceList"
      :status="status"
      @updateStatus="updateStatus"
    />
    <!-- 其他游戏投注记录 -->
    <AllGameBetStatic v-else />
  </div>
</template>
<script setup>
import i18n from '@/i18n'
import { ref } from 'vue'
import SportBetRecord from './SportBetRecord.vue'
import AllGameBetStatic from './AllGameBetStatic.vue'
import { betRecord, priceRecord } from '@/api/fb'
import {vsportBetRecord} from '@/api/game'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const platform = ref([])
const timeData = ref([])
const tableData = ref() // 注单列表
const currentIndex = ref(0)
const totalBet = ref(0) //总投注金额
const totalWin = ref(0) //总结算派奖金额
const totalNum = ref(0) //总订单数
const totalValidFlow = ref(0) //总有效流水
const curTab = ref(1)
const gameData = ref()
const currentGame = ref()
const currentInd = ref()
const status = ref(0)
const filtedList = ref(tableData)
const pagesize = ref(10)
const currentDate = new Date()
const timerOne = ref(null) //定时器
//定时器
let fetchPriceTimer = null
// 初始化时间
const timeRange = ref({
  startTime: new Date(new Date().setHours(0, 0, 0, 0)) * 1,
  endTime: new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59,
    999
  ).getTime()
})
// 注单列表
// const betList = ref([])
//未结算订单的ID集合查询是否能提前结算
const orderIds = ref([])
const filtedOpt = ref({
  channelPlatform: i18n.global.t('GeneralUserCenter.Csport'),
  channelStatus: 1
})

onMounted(() => {
  // pickDate(0)
  startInterval()
})
// 必须在async await 语法前注册onUnmounted钩子
onUnmounted(() => {
  stopInterval()
  eventBus.off('updataTime')
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
  // pickDate(0)
  // 注单列表
  await getBetRecordList()
  // 提前结算金额
  getSettlePriceList()
}

eventBus.on('updataTime', (val) => {
  timeRange.value = val
  getBetRecordList()
})

// 定时器
function startInterval() {
  fetchPriceTimer = setInterval(() => {
    // 如果查询未结算注单，需要同时获取结算报价列表
    if (currentIndex.value === 0 && curTab.value == 1) {
      getBetRecordList()
      getSettlePriceList()
    }
  }, 8000)
}

// 查询体育注单记录列表
// function getBetRecordList() {
//   return betRecord({
//     isSettled: currentIndex.value ? true : false,
//     current: fbStore.queryMatchListParams.current,
//     size: pagesize.value,
//     startTime: timeData.value[0] || timeRange.value.startTime,
//     endTime: timeData.value[1] || timeRange.value.endTime
//   })
//     .then((res) => {
//       if (res.records) {
//         timerOne.value = setTimeout(() => {
//           eventBus.emit('loading', false)
//         }, 3000)
//       }

//       tableData.value = res.records || []
//       orderIds.value = tableData.value.map((item) => item.id)
//       if (
//         res.records?.length > 0 &&
//         curTab.value == 1 &&
//         fbStore.queryMatchListParams.current == 1
//       ) {
//         totalBet.value = res.sts[0]?.sa || 0
//         totalWin.value = res.sts[0]?.cwl || 0
//         totalNum.value = res.sts[0]?.ct || 0
//       }
//     })
//     .catch((e) => {
//       console.log(e)
//       // closeToast()
//     })
// }

// 
function getBetRecordList() {
  return vsportBetRecord({
    settleFlag: currentIndex.value,
    pager:{
      current: fbStore.queryMatchListParams.current,
      size: pagesize.value,
    },
    lobbyCode: "C_SPORTS",
    startTime: timeData.value[0] || timeRange.value.startTime,
    endTime: timeData.value[1] || timeRange.value.endTime
  })
    .then((res) => {
      if (res.data.pageObj.records) {
        timerOne.value = setTimeout(() => {
          eventBus.emit('loading', false)
        }, 3000)
      }

      tableData.value = res.data.pageObj.records || []
      orderIds.value = tableData.value.map((item) => item.id)
      // if (
      //   res.data.pageObj.records?.length > 0 &&
      //   curTab.value == 1 &&
      //   fbStore.queryMatchListParams.current == 1
      // ) {
        totalBet.value = res.data?.totalOrderAmount || 0 //总投注额
        totalWin.value = res.data?.totalProfitAmount || 0 //输赢 
        totalNum.value = res.data?.totalOrderCount || 0 //总计单数
        totalValidFlow.value = res.data?.totalValidFlow || 0 //总有效流水
      // }
    })
    .catch((e) => {
      console.log(e)
      // closeToast()
    })
}
// 停止定时器
function stopInterval() {
  clearInterval(fetchPriceTimer)
  fetchPriceTimer = null
}
// 接受子组件的注单状态
const updateStatus = (newStatus) => {
  // 在这里根据新状态发起请求
  currentIndex.value = newStatus
  getBetRecordList()
}

// 切换体育和游戏按钮
function changetab(val) {
  curTab.value = val
  fbStore.queryMatchListParams.current = 1
  currentIndex.value = 0
  if (val == 2) {
    //切换到游戏
    stopInterval()
    status.value = false
    filtedOpt.value.channelPlatform = i18n.global.t('GeneralUserCenter.FBsport')
    totalNum.value = 0
    totalBet.value = 0
    totalWin.value = 0
    totalValidFlow.value = 0
    if (!currentGame.value) {
      filtedOpt.value.channelPlatform = i18n.global.t('GeneralUserCenter.FBsport')
      currentGame.value = 'FB_SPORTS'
      currentInd.value = 0
    }
    if (!timeRange.value.startTime) {
      // pickDate(-1)
    }
    // fetchGameBetList(timeRange.value)
    // fetchGameBetDetail()
  } else {
    //体育默认显示V体育
    status.value = 0
    getBetRecordList()
    startInterval()
    filtedOpt.value.channelPlatform = i18n.global.t('GeneralUserCenter.Csport')
    totalBet.value = 0
    totalNum.value = 0
  }
}

function updatePage(val1, val2) {
  if (val2 == 'sport') {
    getBetRecordList()
  }
}

function upadtePageSize(val1, val2) {
  pagesize.value = val1
  if (val2 == 'sport') {
    getBetRecordList()
  }
}

// 结算报价列表
const priceList = ref([])
const getSettlePriceList = () => {
  const orderIds = tableData.value.map((item) => item.id)
  if (orderIds.length) {
    priceRecord({
      orderIds
    }).then((res) => {
      priceList.value = res.pr || []
    })
  }
}
onBeforeUnmount(() => {
  clearTimeout(timerOne.value) //清除定时器
})
</script>

<style lang="scss" scoped>
.BetRecord {
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 5px;
  background: #272b45;
  border-radius: 8px;
  height: 761px;
  .button {
    padding-top: 30px;
    margin-left: 40px;
    display: flex;
    div {
      width: 104px;
      height: 40px;
      color: #fff;
      text-align: center;

      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 40px; /* 157.143% */
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 20px;
      cursor: pointer;
    }
    .active {
      border: 1px solid transparent;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    }
  }

  .table-spacing {
    min-width: 1240px;
    max-width: 1240px;
    margin: 0 auto;
    margin-top: 30px;
    .table-content {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .order-number {
      border: 1px solid var(--20, rgba(255, 255, 255, 0.2));
      border-radius: 2px;
      width: 100px;
      margin: 0 auto;
    }
  }
  :deep() {
    .el-table__body tr:hover > td.el-table__cell {
      background-color: #171a2f;
    }
    .el-form--inline .el-form-item {
      margin-right: 10px;
    }
    .el-form-item__label {
      color: var(--100, #fff);

      font-size: 14px;
      font-style: normal;
    }
    .el-table {
      --el-table-border-color: 1px solid rgba(255, 255, 255, 0.2);
      --el-table-header-bg-color: var(--unnamed, #171a2f);
      --el-table-border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .el-table tr {
      background-color: #272b45;
      color: var(--100, #fff);
    }
    .el-button--info {
      --el-button-hover-border-color: #f35f1b;
      --el-button-bg-color: #272b45;
      background-color: #272b45 !important;
    }
    .el-button:focus,
    .el-button:hover {
      color: #f35f1b;
    }
    .el-input {
      --el-input-bg-color: #272b45;
    }
    .el-input__inner {
      color: var(--100, #fff);
    }
    .el-input__inner:hover {
      box-shadow: none;
    }
    .el-input__wrapper {
      background-color: #272b45;
      // border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }
    .el-date-editor .el-range-separator {
      color: var(--100, #fff);
    }
    .el-date-editor .el-range-input {
      color: var(--100, #fff);
    }
    .el-select {
      --el-select-input-focus-border-color: none;
    }
    .el-range-editor.is-active:hover {
      box-shadow: none;
    }
    .el-text.el-text--danger {
      --el-text-color: #e93d3d;
    }
    .el-scrollbar__wrap {
      background: #272b45;
    }
    .el-input.is-disabled .el-input__wrapper {
      background-color: transparent;
      box-shadow: 0 0 0 1px transparent inset;
    }
    .el-form-item__label {
      justify-content: flex-start;
      // width: 84px !important;
    }
  }
}
</style>
