<template>
  <div class="CurrentBetRecord-view">
    <div class="list-wrapper">
      <!-- 注单列表 -->
      <BetRecordList
        v-if="list.length"
        :list="list"
        :currentIndex="0"
        :priceList="priceList"
        :orderIds="orderIds"
        :total="total"
        @expand="expand"
        @updatePage="updatePage" 
        @upadtePageSize="upadtePageSize"
      />
      <div v-if="!list.length" class="no-data" >
        <img :src="noData" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import BetRecordList from './BetRecordList.vue'
import { betRecord, priceRecord } from '@/api/fb'
import { useFBStore } from '@/stores/fb'
import { onUnmounted } from 'vue'
import noData from './img/nodata.png'

const fbStore = useFBStore()
const list = ref([])
const total = ref()
const currentPage = ref(1)
const pageSize = ref(5)


//未结算订单的ID集合查询是否能提前结算
const orderIds = ref([])
//定时器
let fetchPriceTimer = null
onMounted(() => {
  startInterval()
  fbStore.queryMatchListParams.current = currentPage.value
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
  // 获取投注记录
  await handleQuery()
  // 提前结算金额
  queryPrice()
}
// 获取投注记录
async function handleQuery() {
  const res = await betRecord({
    isSettled: false,
    current: fbStore.queryMatchListParams.current,
    size: pageSize.value
  })
  list.value = res.records || []
  total.value = res.total
  orderIds.value = list.value.map((item) => item.id)
  //获取数据之后给每个item默认一个折叠的状态，根据点击时候存储的id重新赋值isExpand
  list.value.forEach((item) => {
    item.isExpand = false
    collapseList.value.includes(item.id) && (item.isExpand = true)
  })
  //无数据时候停止定时器
  if (!res.total) {
    stopInterval()
  }
}

const checkListBtn = ref([])
const priceList = ref([])
const queryPrice = () => {
  orderIds.value = list.value.map((item) => item.id)
  priceRecord({
    orderIds: orderIds.value,
  }).then((res) => {
    priceList.value = res.pr || []
    res.pr?.forEach((child) => {
      if (child.amt) {
        !checkListBtn.value.includes(child.oid) && checkListBtn.value.push(child.oid)
      }
    })
  })
}
function startInterval() {
  fetchPriceTimer = setInterval(() => {
    handleQuery()
    // 提前结算金额
    queryPrice()
  }, 3000)
}
function stopInterval() {
  clearInterval(fetchPriceTimer)
  fetchPriceTimer = null
}
//接收content列表组件派发的id列表，根据id去开启或关闭按钮的折叠和展开
const collapseList = ref([])
const expand = (val) => {
  collapseList.value = val
}

function updatePage(){
  handleQuery()
}
function upadtePageSize(){}
</script>

<style lang="scss" scoped>
.CurrentBetRecord-view{
  display: flex;
  width: 100%;
  height: 100%;
  // align-items: center;
  justify-content: center;
  .no-data{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    img {
      width: 150px;
      height: auto;
    }
  }
}
</style>