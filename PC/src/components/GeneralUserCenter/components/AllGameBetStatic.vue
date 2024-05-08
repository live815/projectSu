<template>
  <div class="AllGameBetStatic-view">
    <!-- 游戏名称 -->
    <div class="gameName" @click="goBack" v-if="curTab == 2">
      <el-icon class="arrowLeft"><ArrowLeftBold /></el-icon><span>{{ GameName }}</span>
    </div>
    <!-- 时间筛选 -->
    <div class="drop-down" v-if="curTab == 1">
      <el-form :inline="true" label-width="80px">
        <el-form-item>
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 0 }"
            @click="pickDate(0)"
            >{{ $t('GeneralUserCenter.Today') }}</el-button
          >
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 1 }"
            @click="pickDate(1)"
            >{{ $t('GeneralUserCenter.Yesterday') }}</el-button
          >
          <el-button
            type="info"
            class="customize-el-btn"
            :class="{ seactive: seactive == 6 }"
            @click="pickDate(6)"
            >{{ $t('GeneralUserCenter.SevenDays') }}</el-button
          >
        </el-form-item>
        <el-form-item>
          <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <div class="btn non-color" @click="resetFilter">{{ $t('GeneralUserCenter.Reset') }}</div>
          <el-button
            class="btn color"
            @click="handlefilter"
            :loading="loading"
            :disabled="loading"
            >{{ $t('GeneralUserCenter.Inquire') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 统计数据 -->
    <div class="total">
      <!-- 总计单数 -->
      <div class="total-one">
        <!-- {{$t('GeneralUserCenter.Total')}}：{{totalNum}}{{$t('GeneralUserCenter.Orders')}} -->
        {{ $t('GeneralUserCenter.Total', { totalNum }) }}
      </div>
      <!-- 投注额 -->
      <div class="total-two">{{ $t('GeneralUserCenter.BetAmount') }}：{{ totalBet }}</div>
      <!-- 输赢 -->
      <div class="total-three">{{ $t('GeneralUserCenter.WinLose') }}：{{ totalWin }}</div>
      <!-- 有效流水 -->
      <div class="total-four">
        {{ $t('GeneralUserCenter.EffectiveFlow') }}：{{ totalValidFlow }}
      </div>
    </div>
    <!-- 状态 -->
    <div class="status" v-if="curTab == 2">
      <div
        class="status-btn"
        :class="activeClass(0)"
        @click="change(0)"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        {{ $t('GeneralUserCenter.Unsettlement') }}
        <span v-if="Unsettled">({{ Unsettled }})</span>
      </div>
      <div
        class="status-btn"
        :class="activeClass(1)"
        @click="change(1)"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        {{ $t('GeneralUserCenter.Settled') }}
        <span v-if="Settled">({{ Settled }})</span>
      </div>
    </div>
    <!-- 所有游戏统计列表 -->
    <div class="static-box" v-if="curTab == 1">
      <div class="static-card" v-for="item in platform" :key="item.id" @click="goDetail(item)">
        <div class="card-left">
          <div class="left">
            <img :src="imgPath(item.lobbyCode)" alt="" />
          </div>
          <div class="right">
            <div>
              <p class="title">{{ item.lobbyName }}</p>
            </div>
            <div class="static">
              <div>
                <span class="label">{{ $t('GeneralUserCenter.BetoddNumbers') }}</span>
                <span class="num">{{ item.orderCount }}</span>
              </div>
              <div style="margin-left: 18px">
                <span class="label">{{ $t('GeneralUserCenter.BetAmount2') }}</span>
                <span class="num"><CurrencyUnit />{{ item.orderAmount }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-right">
          <div class="profit">
            <span class="label">{{ $t('GeneralUserCenter.WinLossAmount') }}</span>
            <span class="num"><CurrencyUnit />{{ item.profitAmount }}</span>
          </div>
          <div class="arrow">
            <el-icon><ArrowRightBold /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <!-- 单个游戏投注记录 -->
    <GameBetRecord
      v-if="curTab == 2"
      :currentGame="currentGame"
      :tabledata="gameData.value"
      :total="Median"
      :totalNum="totalNum"
      @updatePage="updatePage"
      @upadtePageSize="upadtePageSize"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import defaultImg from '../img/defaultImg.png'
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import GameBetRecord from './GameBetRecord.vue'
import { getGameBetList, getGameBetDetail } from '@/api/game'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import eventBus from '@/utils/eventBus'
import { ElLoading } from 'element-plus'
import useCurrency from '@/hooks/useCurrency'
const { Currency } = useCurrency()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const Median = ref(0) //翻页是否显示的中间值
const curPage = ref('all')
const platform = ref([])
const GameName = ref()
const currentGame = ref()
const seactive = ref(0)
const timeData = ref([])
const gameData = ref([])
const curTab = ref(1)
const totalBet = ref(0) //总投注金额
const totalWin = ref(0) //总结算派奖金额
const totalNum = ref(0) //总订单数
const totalValidFlow = ref(0) //总有效流水
const active = ref(0) //注单状态默认未结算
const currentInd = ref(0)
const pagesize = ref(10)
const activeClass = (index) => ({ actives: active.value == index })
const Unsettled = ref(0)
const Settled = ref(0)
const loading = ref(false)
const timer = ref(null) //定时器
// 引用静态图片
const imgPath = (fileName) => {
  const imageUrl = new URL(`../img/${fileName}.png`, import.meta.url).href
  return imageUrl.includes('undefined') ? defaultImg : imageUrl
}
const currentDate = new Date()
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

const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
  console.log(555555)
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 10000)
}

onMounted(() => {
  pickDate(0)
  fetchGameBetList(timeRange.value)
})

// 选择注单状态
async function change(val) {
  active.value = val
  currentInd.value = val
  try {
    const result = await fetchGameBetDetail(
      timeData.value[0] || timeRange.value.startTime,
      timeData.value[1] || timeRange.value.endTime,
      currentGame.value,
      val
    )

    const { total, records } = result

    // console.log('Total:', total);
    // console.log('Records:', records);
    gameData.value = records
    eventBus.emit('updateGameData', gameData.value)
    Median.value = total
  } catch (error) {
    console.error('Error:', error)
  }
}

//返回到所有游戏的统计页面
function goBack() {
  curTab.value = 1
  fetchGameBetList(timeRange.value)
}
// 日期选择按钮
function pickDate(days) {
  timeData.value = getTimeStampByPassDay(days)
  seactive.value = days
  timeRange.value.startTime = timeData.value[0]
  timeRange.value.endTime = timeData.value[1]
}
//日历选择
function updateTimeData(n) {
  let defaultStartTime = getDateOffset(-90).getTime() // 最近3个月
  let defaultEndTime = getDateOffset(0).getTime()
  timeData.value = n
  seactive.value = 2
  timeRange.value.startTime = timeData.value[0] || defaultStartTime
  timeRange.value.endTime = timeData.value[1] || defaultEndTime
}
// 重置
function resetFilter() {
  timeData.value = []
  handlefilter()
}
//查询按钮
function handlefilter() {
  loading.value = true
  fetchGameBetList(timeRange.value)
}
async function goDetail(item) {
  active.value = 0
  curTab.value = 2
  curPage.value = 'detail'
  GameName.value = item.lobbyName
  currentGame.value = item.lobbyCode
  totalNum.value = item.orderCount
  totalBet.value = item.orderAmount
  totalWin.value = item.profitAmount
  totalValidFlow.value = item.validBet
  try {
    // 使用 Promise.all 并行发起两次请求
    const [resultUnsettled, resultSettled] = await Promise.all([
      fetchGameBetDetail(
        timeData.value[0] || timeRange.value.startTime,
        timeData.value[1] || timeRange.value.endTime,
        currentGame.value,
        0
      ),
      fetchGameBetDetail(
        timeData.value[0] || timeRange.value.startTime,
        timeData.value[1] || timeRange.value.endTime,
        currentGame.value,
        1
      )
    ])

    // 解构获取 total 和 records
    const { total: totalUnsettled, records: recordsUnsettled } = resultUnsettled
    const { total: totalSettled, records: recordsSettled } = resultSettled

    // 处理 totalUnsettled、totalSettled、recordsUnsettled 和 recordsSettled
    // console.log('Total Unsettled:', totalUnsettled);
    // console.log('Records Unsettled:', recordsUnsettled);

    // console.log('Total Settled:', totalSettled);
    // console.log('Records Settled:', recordsSettled);

    Unsettled.value = totalUnsettled
    Settled.value = totalSettled
    Median.value = totalUnsettled
    gameData.value = recordsUnsettled
    // 确保在获取到数据后再传递给子组件
    eventBus.emit('updateGameData', gameData.value)
  } catch (error) {
    // 处理错误
    console.error('Error:', error)
  }
}
let page = 1
const size = pagesize.value
async function fetchGameBetDetail(startTime, endTime, lobbyCode, settleFlag) {
  try {
    const res = await getGameBetDetail({
      startTime,
      endTime,
      lobbyCode,
      settleFlag,
      pager: {
        current: page,
        size
      }
    })
    // console.log(res.data,'res.data',)
    if (!res.data) {
      // console.log(444444)
      // openFullScreen1()
    }
    return {
      total: res.data?.total || 0,
      records: res.data?.records || []
    }
  } catch (error) {
    console.error('Error fetching game bet detail:', error)
    throw error
  }
}
// 查询所有游戏的总投注金额，总输赢金额，总注单数
async function fetchGameBetList(val) {
  try {
    await getGameBetList(val)
      .then((res) => {
        if (res.data) {
          timer.value = setTimeout(() => {
            loading.value = false
          }, 2000)
        }

        const data = res.data
        let list = []
        data.myList.forEach((item) => {
          let name = item.lobbyName
          let code = item.lobbyCode
          if (item.lobbyCode == currentGame.value) {
            totalValidFlow.value = item.validBet
            // totalBet.value = item.orderAmount
            totalWin.value = item.profitAmount
            // totalNum.value = item.orderCount
          }
          list.push({ value: code, label: name })
        })
        // console.log(data.myList, 'data.myList')
        platform.value = data.myList
        totalNum.value = data.totalOrderCount
        totalBet.value = data.totalOrderAmount
        totalWin.value = data.totalProfitAmount
        totalValidFlow.value = data.totalValidFlow
      })
      .catch(() => {})
  } catch (error) {
    console.error('Error fetching game bet list:', error)
  }
}
// 查询某个游戏的投注记录
function getGameBetDetails() {
  gameData.value = []
  getGameBetDetail({
    startTime: timeData.value[0] || timeRange.value.startTime,
    endTime: timeData.value[1] || timeRange.value.endTime,
    lobbyCode: currentGame.value,
    settleFlag: currentInd.value,
    pager: {
      current: fbStore.queryMatchListParams.current,
      size: pagesize.value
    }
  })
    .then((res) => {
      gameData.value = res.data.records || []
      eventBus.emit('updateGameData', gameData.value)
      console.log(res, 'res')
    })
    .catch(() => {})
}

// 翻页
function updatePage(val1, val2) {
  if (val2 == 'game') {
    getGameBetDetails()
  }
}

function upadtePageSize(val1, val2) {
  pagesize.value = val1
  if (val2 == 'game') {
    getGameBetDetails()
  }
}
onBeforeUnmount(() => {
  clearTimeout(timer.value) //清除定时器
})
</script>

<style lang="scss" scoped>
.AllGameBetStatic-view {
  .drop-down {
    margin: 30px auto 0px;
    width: 93%;
    height: 58px;
    display: flex;
    flex-direction: row;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 88px;
      height: 34px;
      border-radius: 4px;

      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
    .non-color {
      color: var(--unnamed, #f35f1b);
      border: 1px solid var(--unnamed, #f35f1b);
    }
    .color {
      margin-left: 10px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
    }
    .customize-el-btn {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .seactive {
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
    }
  }
  .gameName {
    display: flex;
    align-items: center;
    height: 50px;
    width: 93%;
    margin: 10px auto;
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 20px;
    .arrowLeft {
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .total {
    height: 44px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    display: flex;
    color: var(--100, #fff);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    padding-left: 40px;
    width: 1240px;
    margin: 0 auto;
    .total-two,
    .total-three,
    .total-four {
      margin-left: 40px;
    }
  }
  .status {
    display: flex;
    align-items: center;
    height: 58px;
    width: 93%;
    margin: 10px auto;
    color: #fff;
    flex-direction: row;
    .status-btn {
      min-width: 104px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .actives {
      border: 1px solid transparent;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    }
  }
  .static-box {
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    height: auto;
    width: 1240px;
    margin: 10px auto;
    padding: 10px 10px;
    height: 450px;
    overflow: scroll;

    .static-card {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      height: 50px;
      margin-bottom: 10px;
      cursor: pointer;
      > div {
        height: 50px;
      }
      .card-left {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        .left {
          img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }
        .right {
          margin-left: 10px;
          .title {
            color: #fff;
            font-size: 16px;
          }
          .static {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: var(-----60, rgba(255, 255, 255, 0.6));
            font-size: 14px;
            margin-top: 10px;
          }
        }
      }
      .card-right {
        min-width: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content: space-between;
        color: #fff;

        .profit {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .label {
            font-size: 14px;
          }
          .num {
            color: var(-----, #f35f1b);
            font-size: 20px;
            margin-top: 5px;
          }
        }
        .arrow {
          cursor: pointer;
          margin-left: 15px;
        }
      }
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
      border: 1px solid rgba(255, 255, 255, 0.2);
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
    .btn {
      border: 1px solid var(--unnamed, #f35f1b);
      border-radius: 3px;
      color: #f35f1b;
      cursor: pointer;
      margin-top: 3px;
    }
    .el-button.is-disabled {
      background: #454859;
      border-color: #454859;
    }
    .el-button {
      // background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      border-color: #ff9000;
    }
    .el-dialog__header {
      display: none !important;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-notification {
      border-radius: 8px;
      background-color: var(--unnamed, #323c6f);
      border: none;
    }
    .el-dialog {
      border-radius: 12px;
      background: #232949;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog--center .el-dialog__body {
      text-align: center;
      color: #fff;
      min-height: 75px !important;
      border-radius: 20px;
    }
    .el-button {
      min-width: 61px;
      height: 40px;
    }
    .cancel {
      background: transparent !important;
      color: #f35f1b !important;
      border-color: #f35f1b !important;
    }
    .loadBtn {
      background: transparent;
      border: none;
      color: #f35f1b;
      font-size: 12px;
    }
    .el-button.is-loading:before {
      background-color: transparent;
    }
    .el-button > span {
      color: #fff;
    }
    .seactive,
    .el-button:active {
      color: #fff;
    }
    .el-loading-mask {
      background-color: regb(255, 255, 255 0.5);
    }
  }
}
</style>
