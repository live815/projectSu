<template>
  <div class="SportsMiddle">
    <!-- 赛事列表页面 -->
    <div class="SportsMiddle-item SportsMiddle-wrap" v-if="isMatchList()" >
      <div class="SportsMiddle-top">
        <div class="sticky-filter-box" >
          <ul>
            <li v-text="fbStore.ballTypeName"></li>
          </ul>
          <div class="sticky-filter-right" >
            <div class="match-filter-box" v-if="isMorningTypy()">
              <div class="match-events">
                <!-- 排序时间或者联赛切换 -->
                <div class="match-sort">
                  <span :class="[activeTab==0?'active':'']" @click="selectSortBy(0)">{{$t('SportsView.Time')}}</span>
                  <!-- <el-icon class="switch" @click="toggle"><Switch /></el-icon> -->
                  <el-icon class="switch" ><Switch /></el-icon>
                  <span :class="[activeTab==1?'active':'']" @click="selectSortBy(1)">{{$t('SportsView.League')}}</span>
                </div>
              </div>
            </div>
            <!-- 赛事筛选按钮 -->
            <div class="match-filter-key">
              <span @click="chooseEvent" v-if="isMorningTypy()">{{$t('SportsView.EventChoose')}}</span>
              <!-- 赛事筛选数量显示 -->
              <span class="match-filter-key__count count1" v-if="allType">{{$t('SportsView.All')}}</span>
              <span class="match-filter-key__count  count2" v-if="countType">[{{fbStore.eventChooseNum}}]</span>
              <!-- 刷新按钮 -->
              <img 
              v-if="isMorningTypy()"
              src="@/assets/img/refresh_icon.png" 
              width="12" 
              height="12" 
              class="refresh" 
              ref="rotatingImage"
              :class="{ rotating: isRotating }"
              :style="{ transform: `rotate(${rotation}deg)` }"
              @transitionend="handleTransitionEnd"
              @click="refresh"/>
              <!-- 折叠按钮 -->
              <img class="toggle" :src="close" alt="" @click="toggleAll" v-if="fbStore.queryMatchListParams.type !== 7"  :style="{ transform: `rotate(${rotation+180}deg)` }">
              <!-- <img class="toggle" :src="close" alt="" @click="toggleAll"   :style="{ transform: `rotate(${rotation+180}deg)` }"> -->
            </div>
          </div>
        </div>
        <!-- 头部滚球类型 -->
        <div class="data-table" v-if="fbStore.isShowBallType"> 
          <BallType :id="Number(fbStore.queryMatchListParams.sportId)" :curentpage="'middle'"  v-if="fbStore.isShowBallType"/>
        </div>
        <!-- 赛事筛选 -->
        <div class="SportsMiddle-item eventChooseStatus" v-if="fbStore.eventChooseStatus">
          <EventChoose  v-if="fbStore.eventChooseStatus"/>
        </div>
        <!-- 早盘日期 -->
        <div v-if="isEarlyLine" class="timebox">
          <div class="morningTop"  v-if="isEarlyLine">
            <div class="item" @click="selectTime(item, index)" :class="{ active: currentIdx === index }" v-for="(item,index) in timeList" :key="index">
              <span v-if="item.bt">{{ item.bt }}</span>
              <!-- 全部 -->
              <span v-else>{{ item }}</span>
              <span v-if="item.c">({{ item.c }})</span>
            </div>
            <!-- 其他 -->
            <div class="item" :class="{ active: currentIdx === 'other' }" @click="selectTime(fbStore.matchCountlist?.o?.bt,'other')" v-if="fbStore.matchCountlist?.o?.c" >{{$t('SportsView.Other')}}
              <span>({{ fbStore.matchCountlist?.o?.c }})</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="matchList">
        <!-- 非冠军赛事 -->
        <template v-if="fbStore.queryMatchListParams.type !== 7">
          <el-skeleton :loading="fbStore.skeletonLoading" animated>
            <template #template>
              <Skeleton v-if="fbStore.queryMatchListParams.type !== 7"/>
            </template>
              <MatchList v-if="fbStore.queryMatchListParams.type !== 7" :pageSize="pageSize"/>            
          </el-skeleton>
        </template>
        <!-- 冠军赛事 -->
        <template v-if="fbStore.queryMatchListParams.type == 7">
          <el-skeleton :loading="fbStore.skeletonLoading" animated>
            <template #template>
              <Skeleton  />
            </template>
            <ChampionsList/>
          </el-skeleton>
        </template>
      </div>
      <div class="footer" v-if="fbStore.totalNum>pageSize && fbStore.queryMatchListParams.type !== 7">
        <Pagination
          v-if="fbStore.totalNum>50"
          :current-page="fbStore.current"
          :page-size="pageSize"
          :total="fbStore.totalNum"
          @update:current-page="handleCurrentPageUpdate"
          @update:page-size="handlePageSizeUpdate"
        />
    </div>
    </div>
    <!-- 搜索框 -->
    <div class="SportsMiddle-item searchbox" v-if="issearchbox()">
      <SearchBox  v-if="issearchbox()"/>
    </div>
    <!-- 赛事详情页面 -->
    <div class="SportsMiddle-item detail-wrap" v-if="isEventDetail()" >
      <EventDetail :event="fbStore.curEvent" v-if="isEventDetail()"/>
    </div>
    
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {computed, ref, watch, } from 'vue'
import close from './img/close.png'
import { Switch } from '@element-plus/icons-vue'
import Skeleton from './Skeleton.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
// import { Refresh } from '@element-plus/icons-vue'
import BallType from './BallType.vue'
import MatchList from './MatchList.vue'
import ChampionsList from './ChampionsList.vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import eventBus from '@/utils/eventBus'
import EventDetail from './EventDetail.vue'
import SearchBox from './SearchBox.vue'
import EventChoose from './EventChoose.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const currentIdx = ref(0)
const activeTab = computed(()=>fbStore.queryMatchListParams.orderBy)
console.log(fbStore.queryMatchListParams.orderBy,'fbStore.queryMatchListParams.orderBy')
// const loading = ref(false)
const isEarlyLine = computed(() => fbStore.queryMatchListParams.type == 4) // 早盘
const rotation = ref(0);
const isRotating = ref(false);
const isMorningTypy = () => fbStore.queryMatchListParams.type == 1 ||fbStore.queryMatchListParams.type == 3 || fbStore.queryMatchListParams.type == 4 || fbStore.queryMatchListParams.type == 7
const isMatchList = () => fbStore.curPage == 'allList' || fbStore.curPage == 'middle'
const isEventDetail = () => fbStore.curPage == 'eventdetail' || fbStore.curPage == 'searchResult'
const issearchbox = () => fbStore.curPage == 'searchbox'
const currentPage = ref(1)
const pageSize = ref(50)
const total = ref(0)
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
})
const allType = computed(()=> {
  return fbStore.queryMatchListParams.type !== 7 && fbStore.eventChoose == 1
})//显示全部
const countType = computed(()=>{
  return fbStore.eventChoose == 0 && fbStore.queryMatchListParams.type !== 7
})//显示具体数量
onMounted(
  ()=>{
    fbStore.eventChooseStatus = false//默认关闭赛事筛选
    if(fbStore.curEvent){
      const curEvent = fbStore.curEvent
      curEvent.value = curEvent || []
      if(curEvent.value.length==0){
        fbStore.curEvent = fbStore.matchList[0]
      }
    }
    
  }
)

// 切换时间和联赛
function selectSortBy(val){
  // console.log(val)
  fbStore.skeletonLoading = true
  // activeTab.value = val
  fbStore.queryMatchListParams.orderBy = val
  // fbStore.queryMatchListParams.sportId = 0
  // fbStore.queryMatchListParams.type = 1
  refresh()
}

function chooseEvent(){
  fbStore.eventChooseStatus = !fbStore.eventChooseStatus
  if(fbStore.previousEventChooseList.length>0){
    fbStore.EventChooseList = fbStore.previousEventChooseList
  }
  // fbStore.queryMatchListParams.sportId = 0
  // fbStore.queryMatchListParams.type = 1
}
const refresh = async () => {
  fbStore.skeletonLoading = true
  if (isRotating.value) {
    return; // 防止重复点击
  }
  isRotating.value = true;
  rotation.value += 720;
  try {
    gitlist()
  } catch (error) {
    console.error('请求失败', error);
  } finally {
    setTimeout(() => {
      isRotating.value = false;
      rotation.value = 0;
    }, 800);
  } 
};
function gitlist(){
  console.log(fbStore.isClickAll,'fbStore.isClickAll',fbStore.queryMatchListParams.type)
  if(fbStore.queryMatchListParams.type == 3 || fbStore.queryMatchListParams.type == 4){
    const alldata = {
      current: 1,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      beginTime:timeRange.value.startTime,
      endTime:timeRange.value.endTime,
      sportId:fbStore.queryMatchListParams.sportId,
      size:fbStore.pageSize,
      leagueIds:fbStore.queryMatchListParams.leagueIds,
      type:fbStore.queryMatchListParams.type
    }
    fbStore.getMatchList(alldata)
  }
  else if(fbStore.queryMatchListParams.type == 7){
    const alldata = {
      current: 1,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      beginTime:timeRange.value.startTime,
      endTime:timeRange.value.endTime,
      sportId:fbStore.queryMatchListParams.sportId,
      size:fbStore.pageSize,
      leagueIds:fbStore.queryMatchListParams.leagueIds,
      type:fbStore.queryMatchListParams.type
    }
    fbStore.getMatchList(alldata)
  }
  else{
    if(fbStore.isClickAll){
      const alldata = {
        current: 1,
        isPC: true,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportsId:[],
        type:1
      }
      fbStore.getMatchList(alldata)
    }else{
      const alldata = {
        current: 1,
        isPC: true,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportId:fbStore.queryMatchListParams.sportId,
        type:1
      }
      fbStore.getMatchList(alldata)
    }    
    
  }
}

const ListCollapse =  computed(() => {
  // return fbStore.listIds.length ? false : true
  return fbStore.matchListIds.length ? false : true
})
const toggleAll = () => {
  // console.log(fbStore.isOperatedListCollapse,'fbStore.isOperatedListCollapse',ListCollapse.value)
  if (ListCollapse.value){
    // console.log('打开')
      // 如果是折叠状态则展开列表
    eventBus.emit('MatchListOpenAll')
  }else{
    // console.log('关闭')
    // 如果是展开状态则折叠列表
    eventBus.emit('MatchListCloseAll')
  }
  //  fbStore.matchListIds=[]
  fbStore.isOperatedListCollapse = true
  rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180)
}


// 处理分页参数更新事件
const handleCurrentPageUpdate = (newPage) => {
  currentPage.value = newPage
  fbStore.current = newPage
  fbStore.queryMatchListParams.current = newPage
  eventBus.emit('updatePage',newPage)
}
const handlePageSizeUpdate = (newSize) => {
  fbStore.pageSize = newSize
  pageSize.value = newSize
  eventBus.emit('upadtePageSize',newSize)
}
// 监听当前页面
watch(
  ()=>fbStore.curPage,
  ()=>{
    // console.log(fbStore.curPage,'fbStore.curPage',route.query,)
    if(route.query.gameId && route.query.sid && route.query.page ){
      fbStore.curPage == 'eventdetail'
    }
  },{deep:true, immediate: true}
)
// 获取赛事未来天数的赛事数量
const timeList = computed(()=>{
  let arr = []
  // console.log(fbStore.matchCountlist,'fbStore.matchCountlist')
  if(fbStore.matchCountlist){
    fbStore.matchCountlist.dl?.forEach(item=>{
      arr.push({bt:formattedDate(item.bt),c:item.c,time:item.bt})
    })
  }
  
  arr.unshift(i18n.global.t('SportsView.All'))
  return arr
})

// 日期格式
const formattedDate = (val) =>{
  const date = new Date(val);
  const month = date.getMonth() + 1; // 月份
  const day = date.getDate(); // 日期

  if(appStore.language=='zh-cn'){
    return `${month < 10 ? '0' + month : month}月${day < 10 ? '0' + day : day}日`
  }else if(appStore.language=='vi'){
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`
  }
  
}

// 选择日期
function selectTime(item,index){
  // console.log(item,index)
  currentIdx.value = index
  fbStore.skeletonLoading = true
  // 时间戳转换成位数为999结尾的
  const milliseconds = 23 * 60 * 60 * 1000+59 * 60 * 1000 + 59 * 1000 + 999;

  if(index == 0){
    timeRange.value.startTime =  ''
    timeRange.value.endTime = ''
  }
  else if(index =='other'){
    timeRange.value.startTime =  item
    timeRange.value.endTime = ''
  }
  else{
    timeRange.value.startTime =  item.time
    timeRange.value.endTime = milliseconds+item.time
  }
  fbStore.queryMatchListParams.beginTime = timeRange.value.startTime
  fbStore.queryMatchListParams.endTime = timeRange.value.endTime

  eventBus.emit('updateDate',timeRange)//日期传到定时器页面
  gitlist()
}
eventBus.on('updatecur',(val)=>{
  currentIdx.value = val
})
</script>

<style lang="scss" scoped>
@media screen and (max-width:1450px) {
  .SportsMiddle-top{
    zoom: 0.9;
  }
}
.SportsMiddle{
  position: relative;
  .SportsMiddle-wrap{
    position: relative;
    .SportsMiddle-top{
      position: relative;
      width: 100%;
      margin-bottom: 4px;
      background: #171A2F;
      border-radius: 4px;
      .sticky-filter-box{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        position: relative;
        ul{
          list-style-type: none;
          padding: 0 10px;
          li{
            color: var(--100, #FFF);
            
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }
        }
        .sticky-filter-right{
          display: flex;
          align-items: center;
          .match-sort{
            margin-right: 20px;
            display: flex;
            align-items: center;
            .active{
              color: var(--unnamed, #F35F1B);
            }
            span{
              display: block;
              cursor: pointer;
            }
          }
          .switch{
            margin: 0 10px;
            // cursor: pointer;
          }
          .match-filter-key,.match-events{
            display: flex;
            align-items: center;
          }
          .match-filter-key{
            position: relative;
            span{
              cursor: pointer;
            }
            .match-filter-key__count{
              margin-left: 10px;
              cursor: pointer;
              border-radius: 4px;
              background: var(--unnamed, #1D223C);
              padding: 5px 7px;
              color: var(--unnamed, #F35F1B);
            }
            .refresh{
              margin: 0 20px;
              cursor: pointer;
            }
            /* 添加旋转的动画效果 */
            .rotating {
              animation: rotateAnimation 1s infinite linear;
            }
            @keyframes rotateAnimation {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .toggle{
              margin-right: 20px;
              cursor: pointer;
            }
          }
        }
      }
      .timebox{
        padding-bottom: 10px;
        .morningTop{
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          .item{
            min-width: 80px;
            padding: 0 10px;
            height: 36px;
            line-height: 36px;
            border-radius: 6px;
            border: 0.5px solid var(--unnamed, #1D223C);
            background: var(--unnamed, #1D223C);
            text-align: center;
            margin-right: 6px;
            font-size: 14px;
            cursor: pointer;
            &.active {
              border-color: var(--color-primary);
              background:var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
              color: #fff;
              .date{
                color: #fff;
              }
            }
          }
        }
      }
    }
    .matchList{
      margin: 5px 0;
      position: relative;
    }
    .footer{
    position: absolute;
    bottom: 0;
    height: 60px;
    background: #171A2F;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box; /* 让宽度包括 padding 和 border */
    z-index: 999;
  }
  }
  .SportsMiddle-item{
    // height: 100vh;
    height: calc(100vh - 137px);
    background: #151525;
  }
  .eventChooseStatus{
    position: absolute;
    top: 40px;
    z-index: 9999;
    background: #222744;
    width: 100%;
    // height: 100%;
    height: calc(100vh - 176px);
  }
}
</style>