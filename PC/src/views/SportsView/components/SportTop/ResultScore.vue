<template>
  <div class="ResultScore-view">
    <div class="ResultScore-title">
      <div class="title-left">
        <!-- 选择球类型 -->
        <el-select v-model="ballType" class="m-2" placeholder="Select" @change="changeBall">
            <template v-if="filterList">
              <el-option
                v-for="(item,ind) in filterList"
                :key="ind"
                :label="getBallTypeTextById(item.sportId)"
                :value="item.sportId"
            >{{ getBallTypeTextById(item.sportId) }}</el-option>
            </template>
        </el-select>
        <!-- 选择联赛 -->
        <!-- <Selector :data="fbStore.matchReaultlist" :selectedValue="value1"></Selector> -->
        <el-select clearable v-model="eventName" class="m-2" :placeholder="$t('SportsView.SelectaLeague')" @change="changeEvent">
          <el-option
              v-for="item in resultlist"
              :key="item.id"
              :label="item.tname"
              :value="item.id"
            >
            <span>{{ item.tname }}</span>
            </el-option>
        </el-select>
      </div>
      <!-- 日期选择器 -->
      <div class="title-right">
        <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        <!-- 刷新按钮 -->
      <div  :loading="loading" :diabled="loading" class="refreshbtn" @click="refresh">{{$t('SportsView.Refresh')}}</div>
      </div>
    </div>
    <!-- 赛事赛果比分 -->
    <div class="ResultScore-con">
      <div v-if="fbStore.matchReaultlist?.length>0">
        <el-skeleton :loading="fbStore.skeletonLoading" animated>
            <template #template>
              <Skeleton  />
            </template>
            <div v-for="(item,index) of resultlist" :key="index" class="resultList">
              <el-collapse v-model="activeNames" >
                <el-collapse-item  :name="item.id">
                  <template #title>
                    <div class="restitle">
                      <!-- 联赛名称 -->
                      <div class="tit-left">{{ item.tname }}</div>
                      <!-- 比赛状态 -->
                      <div class="tit-right">
                        <template v-for="(it,ind) of getResultType(i18n)[item.sid]" :key="ind">
                          <div>{{ it.title }}</div>
                        </template>
                      </div>
                    </div>
                  </template>
                  <div class="sedtit" v-for="(seitem,index) of item.data" :key="index">
                    <div class="sedtit-left">
                      <!-- 比赛日期和时间 -->
                      <div class="dtime">{{ changeDateTime(seitem.bt) }}</div>
                      <!-- 队伍名称 -->
                      <div class="tename">
                        <div class="first">{{ seitem.ts[0]?.na }}</div>
                        <img :src="seitem.ts[0]?.lurl || defaultTeamIcon" class="icon"/>
                        <span class="vs">VS</span>
                        <img :src="seitem.ts[1]?.lurl || defaultTeamIcon" class="icon"/>
                        <div class="second">{{ seitem.ts[1]?.na }}</div>
                      </div>
                    </div>
                    <!-- 比赛结果 -->
                    <div class="sedtit-right">
                      <Result :score="seitem"/>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-skeleton>
      </div>

      <div v-else class="nodata">
        <img :src="nodatas" alt="" >
      </div>
    </div>
    <!-- <div class="footer">
      <Pagination
        v-if="total>0"
        class="footer-page"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:current-page="handleCurrentPageUpdate"
        @update:page-size="handlePageSizeUpdate"
      />
    </div> -->
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { ref, watch} from 'vue'
// import Selector from './Selector.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import { SPORT_IDS, getBallTypeTextById } from '@/hooks/useSportDict'
import { getTimeStampByPassDay } from '@/utils'
import {getResultType} from '@/hooks/useSportDict'
import {getMatchResultPage } from '@/api/fb'
import defaultTeamIcon from './img/default-team-logo.png'
import Result from './Result.vue'
import Skeleton from './Skeleton.vue'
import nodatas from './img/nodatas.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const loading = ref(false)
const ballType = ref(i18n.global.t('SportsView.Football'))
const eventName = ref()
const timeData = ref([])
const sportId = ref(1)
const resultlist = ref([])
// const currentPage = ref(1)
// const pageSize = ref(10)
// const total = ref(0)
// const objList = ref({})
// const currentDate = new Date()
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
}) 
const activeNames = ref([])

function updateTimeData(n) {
  timeData.value = n
  timeRange.value.startTime = n[0]
  timeRange.value.endTime = n[1]
}
const id = ref(1)
const leagueIds = ref()
//不够两位数的加0
function formatWithLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}
//时间转换
function changeDateTime(val){
  const date = new Date(val)
  const month = formatWithLeadingZero(date.getMonth() + 1); // 月份从0开始，所以需要加1
  const day = formatWithLeadingZero(date.getDate());
  const hours = formatWithLeadingZero(date.getHours());
  const minutes = formatWithLeadingZero(date.getMinutes());
  const seconds = formatWithLeadingZero(date.getSeconds());
  const formattedDateTime = `${month}-${day} ${hours}:${minutes}:${seconds}`;
  // console.log(formattedDateTime);
  return formattedDateTime
}

function init(){
  fbStore.skeletonLoading = true
  timeData.value = getTimeStampByPassDay(0)
  if(timeData.value){
    timeRange.value.startTime =  timeData?.value[0]
    timeRange.value.endTime = timeData?.value[1]
  }

  getBetRecordList(sportId.value)  
}
//初始化
init()
const ssl = computed(() => {
  // 关注分类从缓存获取球类总数
  if (!fbStore.queryMatchListParams.type) {
    return Object.keys(fbStore.followList).map((sid) => {
      return {
        sid: Number(sid),
        c: fbStore.followList[sid].length
      }
    })
  }
  if (fbStore.statistical.sl) {
    let res = fbStore.statistical.sl.find((item) => item.ty === fbStore.queryMatchListParams.type)
    if (res) {
      return res.ssl
    }
  }
  return []
})
const filterList = computed(() => { 
  const arr = Object.entries(SPORT_IDS).map(([sport, sportId]) => ({ sportId }))
  // console.log(ssl.value,666666)
  // 保留c不等于0的项，并保留"全部"选项
  const filteredArr = arr.map((item) => {
    let currObj = ssl.value.find((o) => o.sid == item.sportId)
    if (currObj) {
      item.c = currObj.c
    } else {
      item.c = 0
    }
    return item
  }).filter((item)=>{
    // console.log(item,fbStore.queryMatchListParams.type,'sdfhsfhaaaaaaaaf')
    // 根据条件过滤
    return item.title !== i18n.global.t('SportsView.All') && item.c !== 0;
  })

  return filteredArr;
})
// 选择球类型
function changeBall(){
  // resultlist.value = []
  fbStore.skeletonLoading = true
  // console.log(ballType.value,33333)
  sportId.value = ballType.value
  leagueIds.value = []
  getBetRecordList(ballType.value)
  eventName.value = ''  
}
// 选择赛事
function changeEvent(){
  // console.log(eventName.value,'eventName',fbStore.queryMatchListParams.sportId)
  
  let leagueId = [eventName.value]
  leagueIds.value = leagueId

  getBetRecordList(id.value)
}
//获取赛果比分
async function getBetRecordList(val){
  loading.value = true
  if(val == i18n.global.t('SportsView.Football')){
    id.value = 1
  }else{
    id.value = val
  }
  const data ={
    beginTime:timeRange.value.startTime || '',
    endTime: timeRange.value.endTime || '',
    leagueIds: leagueIds.value || [],
    sportId: id.value || 1,
  }
  fbStore.getMatchResultList(data)
  
}
//刷新
function refresh(){
  // console.log(sportId.value,'sportId.value',eventName.value)
  // ballType.value = i18n.global.t('SportsView.Football')
  // eventName.value = ''
  getBetRecordList(sportId.value)
}

watch(
  ()=>fbStore.matchReaultlist,
  ()=>{
    // console.log(fbStore.matchReaultlist,'fbStore.matchReaultlist')
    
    // resultlist.value = fbStore.matchReaultlist
    if(fbStore.matchReaultlist?.length>0){
      fbStore.skeletonLoading = false
    }

    // 组装数组

    // 创建一个空对象来存储结果
    const result = {};

    // 遍历原始数组
    fbStore.matchReaultlist?.forEach(item => {
      const lgId = item.lg.id
      if (!result[lgId]) {
        result[lgId] = {
          id: lgId,
          sid:item.sid,
          tname:item.lg.na,
          data: [item]
        };
      } else {
        result[lgId].data.push(item);
      }
    });

    // 将result对象转换为数组形式
    const finalResult = Object.values(result);

    // console.log(finalResult);
    resultlist.value = finalResult
    loading.value = false
    // 展开折叠面板
    activeNames.value = resultlist.value?.map(item=>item.id)
  }
)

watch(
  ()=>timeData.value,
  ()=>{
    if(ballType.value !== sportId.value){
      getBetRecordList(ballType.value)
    }else{
      getBetRecordList(sportId.value)
    }
    
  }
)
// // 处理分页参数更新事件
// const handleCurrentPageUpdate = (newPage) => {
//   // console.log(newPage, 'newPage')
//   currentPage.value = newPage
//   fbStore.queryMatchListParams.current = newPage

//   eventBus.emit('updatePage',newPage)
//   getBetRecordList()
// }
// const handlePageSizeUpdate = (newSize) => {
//   // console.log(newSize, 'newSize')
//   pageSize.value = newSize
//   eventBus.emit('upadtePageSize',newSize)
// }
</script>

<style lang="scss" scoped>
.ResultScore-view{
  padding: 10px 10px;
  .ResultScore-title{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    margin-bottom: 15px;
    .title-right{
      display: flex;
      flex-direction: row;
    }
    .refreshbtn{
      width: 64px;
      height: 30px;
      border-radius: 4px;
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      cursor: pointer;
    }
  }
  .ResultScore-con{
    height: 500px;
    overflow-y: scroll;
    .icon{
      width: 16px;
      height: 16px;
    }
    .restitle{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 36px;
      align-items: center;
      .tit-right{
        display: flex;
        flex-direction: row;
        height: 36px;
        align-items: center;
        div{
          width: 80px;
          text-align: center;
        }
      }
    }
    .sedtit{
      display: flex;
      align-items: center;
      height: 100%;
      width: 98%;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .dtime{
        margin-right: 20px;
      }
      .tename{
        display: flex;
        align-items: center;
        height: 100%;
        .first{
          margin-right: 5px;
        }
        .second{
          margin-left: 5px;
        }
      }
      .vs{
        margin: 0 15px;
        display: inline-block;
        text-align: center;
      }
      .sedtit-left{
        display: flex;
        flex-direction: row;
      }
    }
    .nodata{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        display: block;
        width:155px;
        height: auto;
      }
    }
  }
  .footer{
    display: flex;
    justify-content: flex-end;
  }
  :deep(){
    .el-select{
      margin: 10px;
    }
    .el-select {
      .el-input{
        width: 274px !important;
      }
    }
    .el-input__inner{
      color: #fff;
      line-height: 28px;
    }
    .el-input__wrapper{
      border-radius: 4px !important;
    }
    .el-date-editor .el-range-input{
      line-height: 28px;
    }
    .el-form-item{
      margin-bottom: 0;
      margin: 0 10px;
    }
    .el-input__wrapper:hover{
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    }
    .el-collapse-item__arrow{
      rotate: 90deg;
    }
    .el-collapse-item__arrow.is-active{
        transform: rotate(180deg);
      }
    .el-collapse{
      border: none;
    }
    .el-collapse-item__header{
      border-radius: 2px;
      border: 1px solid var(--unnamed, rgba(255, 255, 255, 0.10));
      background: #171A2F;
      color: var(--60, rgba(255, 255, 255, 0.60));
      height: 36px;
      margin-bottom: 5px;
      text-indent: 15px;
    }
    .el-collapse-item__content{
        color: var(--60, rgba(255, 255, 255, 0.60));
        padding-bottom: 2px;
        background: #272B45;
    }
    .el-select__popper.el-popper{
      border: 1px solid #1D223C;
      background-color: #1D223C !important;
    }
    .el-select-dropdown__empty{
      background-color: #1D223C !important;
    }
    .el-collapse-item__wrap{
      background: transparent;
      border: 1px solid transparent;
    }
    .el-skeleton.is-animated .el-skeleton__item{
      background: linear-gradient(90deg, var(#1D223C) 25%, var(#393b42) 37%, var(#1D223C) 63%);
      animation: el-skeleton-loading 1.4s ease infinite;
      background-size: 400% 100%;
    }
    @keyframes el-skeleton-loading {
      0% {
          background-position: 100% 50%;
      }
      100% {
          background-position: 0 50%;
      }
    }
    .el-pagination{
      .el-input{
        width: 100px !important;
        min-width:100px !important;
      }
    }
  }
  
}
</style>
<style>
.el-select__popper.el-popper {
  /* 下拉框颜色样式修改 */
  background: var(--unnamed, #1D223C);
  border: 1px solid #1d223c;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color:#171a2f;
}
.el-select-dropdown__item {
  /* 字体 */
  color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
  
  font-size: 14px;
  font-style: normal;
}
.el-popper.is-light .el-popper__arrow::before {
  /* 三角形背景颜色 */
  background: var(--unnamed, #1d223c);
  border: 1px solid #1d223c;
}
</style>