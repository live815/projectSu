<template>
  <div class="MyOrder-view">
    <!-- 注单类型切换 -->
    <div class="tabitem">
      <div :class="{ 'active': isUnsettledTab() }" class="tabs" @click="chooseTab('1')">{{$t('SportsView.UnsettledBets')}}
（{{unsettledTotal}}）</div>
      <div :class="{ 'active': isSettledTab() }" class="tabs" @click="chooseTab('2')">{{$t('SportsView.SettledBets')}}<span v-if="settledTotal>0">（{{settledTotal}}）</span></div>
      <div :class="{ 'active': isBookBetTab() }" class="tabs" @click="chooseTab('3')">{{$t('SportsView.ReserveBettingSlips')}}<span v-if="bookBetTotal>0">（{{ bookBetTotal }}）</span></div>
    </div>
    <div class="dayslist" v-if="isSettledTab()">
      <!-- 日期按钮 -->
      <div class="dayslist-left">
        <div class="days" v-for="day in daysList" :key="day.label" :class="{ 'active': isActiveDay(day.label) }" @click="toggleActiveDay(day.label)">
          {{ day.day }}
        </div>
      </div>
      
      <div class="dayslist-right">
        <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        <!-- 查询按钮 -->
        <el-button @click="handlefilter" class="searchbtn" :loading="loading" :diabled="loading">{{$t('SportsView.Inquire')}}</el-button>
      </div>
    </div>
    <div class="secondtab" v-if="isBookBetTab()">
      <div class="setab" v-for="(item,index) of selist" :key="index" :class="{'active':isActiveseTab(item)}" @click="toggleActiveseTab(item,item.id)">{{ item.title }}</div>
    </div>
    <!-- 预约注单 -->
    <BookRecordTable v-if="bookType" :tableData="filtedLists" :curtab="curTab" :priceList="priceList" :currentIndex="currentIndex" @refreshBookBetList="getBookBetRecordList" />
    <!-- 非预约注单 -->
    <BetRecordTable v-else :tableData="filtedLists" :curtab="curTab" :priceList="priceList" :currentIndex="currentIndex"/>
    <div class="footer">
      <Pagination
        v-if="total>0"
        class="footer-page"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {computed, ref, watch} from 'vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import { getTimeStampByPassDay } from '@/utils'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import { getDay } from '@/utils'
import BetRecordTable from './BetRecordTable.vue';
import BookRecordTable from './BookRecordTable.vue';
import { betRecord, priceRecord,bookBetRecordList } from '@/api/fb'
import {debounce} from 'lodash'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const activeName = ref(1)
const active = ref(0)
const timeData = ref([])
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
//已结算的总数
const settledTotal = ref(0)
//未结算的总数
const unsettledTotal = ref(0)
const currentIndex = ref(0)
const curTab = ref(1)
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
})
// 注单列表
const betList = ref([])
const filtedList = ref(tableData)
// 预约注单列表
const bookfiltedLists = ref([])
const listData = ref([])
const priceList = ref([])
const list = ref([])
// 预约注单总数
const bookBetTotal = ref(0)
//未结算订单的ID集合查询是否能提前结算
const orderIds = ref([])
const isUnsettledTab = () => curTab.value == 1;
const isSettledTab = () => curTab.value == 2;
const isBookBetTab = () => curTab.value == 3;
const loading = ref(false)

const daysList = [
  {label:'0',day:i18n.global.t('SportsView.Today')},
  {label:'1',day:i18n.global.t('SportsView.Yesterdy')},
  {label:'6',day:i18n.global.t('SportsView.withinSevenDays')},
]

const isActiveDay = (day) => active.value == day;
const selist = [{id:0,title:i18n.global.t('SportsView.InProgress')},{id:1,title:i18n.global.t('SportsView.Expired')}]
const setab = ref(i18n.global.t('SportsView.InProgress'))
const status = ref(false)
const setabstatu = ref(false)
const isActiveseTab = (tab) => setab.value == tab.title;
const bookType = computed(()=>{
  return activeName.value == '3'
})
//定时器
let fetchPriceTimer = null
onMounted(() => {
  startInterval()
})
// 必须在async await 语法前注册onUnmounted钩子
onUnmounted(() => {
  stopInterval()
})
// 查询注单记录列表
async function getBetRecordList() {
  try {
    const res = await betRecord({
      isSettled: currentIndex.value ? true : false,
      current: currentPage.value,
      size: pageSize.value,
      startTime: timeRange.value.startTime || '',
      endTime: timeRange.value.endTime || ''
    });
    if(res){
      loading.value = false
    }
    list.value = res.records || [];
    total.value = res.total;

    if (curTab.value !== 3) {
      tableData.value = res.records || [];
      betList.value = res.records || [];
    }

    if (currentIndex.value) {
      settledTotal.value = res.total;
    } else {
      unsettledTotal.value = res.total;
    }

    return res; // 返回 Promise 结果
  } catch (e) {
    console.log(e);
    throw e; // 抛出错误
  }
}
//已结算注单
async function getSettlePriceList() {
  try {
    orderIds.value = list.value.map((item) => item.id);

    const res = await priceRecord({
      orderIds: orderIds.value,
    });

    priceList.value = res.pr || [];
    return res; // 返回 Promise 结果
  } catch (error) {
    console.error(error);
    throw error; // 抛出错误
  }
}

async function init() {
  timeData.value = getTimeStampByPassDay(active.value);

  if (timeData.value) {
    timeRange.value.startTime = timeData?.value[0];
    timeRange.value.endTime = timeData?.value[1];
  }

  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken();
    } catch (e) {
      console.log(e.message);
      throw e; // 抛出错误
    }
  }

  try {
    // 注单列表
    await getBetRecordList();

    // 提前结算金额
    await getSettlePriceList();
  } catch (error) {
    console.error(error);

  }
}

init();


function updateTimeData(n) {
  timeData.value = n
  active.value = 9
  // console.log(n,'n')
  timeRange.value.startTime = timeData.value[0]
  timeRange.value.endTime = timeData.value[1]
}
const toggleActiveDay = (days) => {
  active.value = Number(days)
  timeData.value = getTimeStampByPassDay(days);
  active.value = days;
  timeRange.value.startTime = timeData.value[0];
  timeRange.value.endTime = timeData.value[1];
  handlefilter();
};
function toggleActiveseTab(val,id){
  setab.value = val.title
  if(!id){
    setabstatu.value = false
  }else{
    setabstatu.value = true
  }
  status.value = true
  getBookBetRecordList()
}
function startInterval() {
  fetchPriceTimer = setInterval(() => {
    // 如果查询未结算注单，需要同时获取结算报价列表
    if (currentIndex.value === 0) {
      getBetRecordList()
      getSettlePriceList()
    }
  }, 8000)
}
function stopInterval() {
  clearInterval(fetchPriceTimer)
  fetchPriceTimer = null
}
// 点击查询按钮
function handlefilter() {
  loading.value = true
  if(curTab.value !== 3){
    filtedList.value = tableData.value.filter(
      (item) =>
        (timeData.value[0] == undefined ||
          (item.timestamp >= timeData.value[0] && item.timestamp <= timeData.value[1]) ||
          (item.timestamp <= timeData.value[0] && item.timestamp >= timeData.value[1]))
    )
    getBetRecordList()
  }
}

// 选择注单类型
function chooseTab(val){
  activeName.value = val
  // console.log(activeName.value,'activeName.value')
  if(val == 2){//已结算注单
    currentIndex.value = true
    curTab.value = val
    getBetRecordList()
    fbStore.queryMatchListParams.current = 1
    currentPage.value = 1
    active.value = 0//默认显示今天
    stopInterval()
  }
  else if(val == 1){//未结算注单
    currentIndex.value = 0
    curTab.value = val
    getBetRecordList()
    fbStore.queryMatchListParams.current = 1
    currentPage.value = 1
    // console.log(fbStore.languagePackage['Match Period'],'fbStore.languagePackage')
  }
  else if(val ==3){//预约投注注单
    currentIndex.value = val
    curTab.value = val
    getBookBetRecordList()//查询预约注单列表
    fbStore.queryMatchListParams.current = 1
    currentPage.value = 1
    stopInterval()
  }
  
}

// 查询预约注单列表
function getBookBetRecordList() {
  const isFailed = setabstatu.value ? true : false
  const reqData = {
    isFailed
  }
  if (isFailed) {
    reqData.startTime = getDay(-7) + ' 00:00:00'
    reqData.endTime = getDay(0) + ' 23:59:59'
  }
  return bookBetRecordList(reqData).then((res) => {
      listData.value = res || []
      bookBetTotal.value = res.length
    })
    .catch(() => {
      console.log(e)
    })
}

const filtedLists = computed(()=>{
  if(Number(curTab.value)!== 3){
    return filtedList.value
  }else{
    return listData.value
  }
})


watch([currentIndex, timeRange], debounce(() => {
  // console.log(currentIndex.value)
  // 点选指定日期范围时加载列表
  betList.value = []
  // 预约注单列表
  if (currentIndex.value === 3) {
    getBookBetRecordList()
  } else {
    // 已结算/未结算
    getBetRecordList()
  }
},10))

// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  // console.log(newPage, 'newPage')
  currentPage.value = newPage
  fbStore.queryMatchListParams.current = newPage

  eventBus.emit('updatePage',newPage)
  getBetRecordList()
}
const handlePageSizeUpdate = (newSize) => {
  // console.log(newSize, 'newSize')
  pageSize.value = newSize
  eventBus.emit('upadtePageSize',newSize)
}
onBeforeUnmount(() => {
  stopInterval()
});
</script>

<style lang="scss" scoped>
.MyOrder-view{
  // height: 480px;
  overflow: scroll;
  scrollbar-width: none;//火狐浏览器 隐藏滚动条
  padding:10px 20px;
  .tabitem{
    display: flex;
    flex-direction: row;
    .tabs{
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 135px;
      width: auto;
      padding: 0 5px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.20));
      margin-right: 10px;
      color: var(--60, rgba(255, 255, 255, 0.60));
      margin-bottom: 15px;
      cursor: pointer;
      &:hover{
        color: #fff;
        border-radius: 4px;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      }
    }
    .active{
      color: #fff;
      border-radius: 4px;
      border: none;
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
    }
  }
  .footer{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .dayslist{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 20px;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    .dayslist-left{
      display: flex;
      flex-direction: row;
      .days{
        display:flex;
        min-width: 60px;
        width: auto;
        padding: 0 5px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        border: 1px solid var(--20, rgba(255, 255, 255, 0.20));
        color: #fff;
        margin-right: 10px;
        cursor: pointer;
        &:hover{
          border: 1px solid var(--unnamed, #F35F1B);
          color: var(--unnamed, #F35F1B);
        }
      }
      .active{
        border: 1px solid var(--unnamed, #F35F1B);
        color: var(--unnamed, #F35F1B);
      }
    }
    .dayslist-right{
      display: flex;
      flex-direction: row;
      align-items: center;
      .searchbtn{
        display:flex;
        width: 60px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        background-color: #F35F1B;
        color: #fff;
        cursor: pointer;
        margin-left: 10px;
        border: none;
      }
    }
  }
  .secondtab{
    display:flex;
    flex-direction: row;
    margin-bottom: 10px;
    .setab{
      display:flex;
      width: 160px;
      height: 30px;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      border: 1px solid var(--20, rgba(255, 255, 255, 0.20));
      color: #fff;
      margin-right: 10px;
      cursor: pointer;
      &:hover{
        border: 1px solid var(--unnamed, #F35F1B);
        color: var(--unnamed, #F35F1B);
      }
    }
    .active{
      border: 1px solid var(--unnamed, #F35F1B);
      color: var(--unnamed, #F35F1B);
    }
  }
  :deep(){
    .el-table{
      background: #272B45;
      --el-table-border-color: #4F546D !important;
      border-bottom:1px solid #4F546D ;
      color: #fff;
      font-size:12px ;
    }
    .el-table tr{
      background-color: transparent !important;
    }
    .el-table tr:hover{
      background-color: transparent !important;
    }
    .el-table__header{
      background: #272B45;
    }
    .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
      background: #272B45;
    }
    .el-table__body tr:hover>td.el-table__cell{
        background-color:#232949;
    }
    .copybtn{
      color: var(--unnamed, #409EFF);
      cursor: pointer;
      margin-left: 5px;
    }
    .bigtitle{
      font-size: 14px;
    }
    .smalltitle{
      color: var(--60, rgba(255, 255, 255, 0.60));
    }
    .cell{
      text-align: center;
    }
    .rate{
      color: var(--unnamed, #F35F1B);
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .el-input__wrapper{
      border-radius: 4px !important;
    }
    .el-date-editor .el-range-input{
      line-height: 26px;
    }
    .footer-page{
      .el-input{
        width: 97px !important;
        min-width: 32px !important;
      }
    }
  }
  
}
</style>