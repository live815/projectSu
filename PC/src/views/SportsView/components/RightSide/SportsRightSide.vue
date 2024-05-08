<template>
  <div class="SportsRightSide">
    <div class="SportsRightSide-wrap">
      <div  class="sportcontent" v-if="fbStore.rightList" >
        <div class="sporttitle" >
          <div class="sporttitleleft"  ref="buttonRef" @click.stop="clicktitle(fbStore.rightList)">
            <img :src="fbStore.rightList.lg?.lurl || defaultTeamIcon" alt="" class="sportsicon"> 
            <span class="sportsname" :title="fbStore.rightList.nm">{{ fbStore.rightList.nm }}</span>
            <el-icon v-if="!display"  class="iocn"><CaretBottom /></el-icon>
            <el-icon v-else  class="iocn"><CaretTop /></el-icon>
          </div>
          <!-- 动画，数据，卫星直播图标 -->
          <div  class="sporttitleright">
            <!-- 直播 -->
            <img :src="[active==1?ac_video:video]" :class="[satelliteLiveUrl?'test':'']" v-if="satelliteLiveUrl" :alt="$t('SportsView.Video')"  :title="$t('SportsView.Video')" @click="changeTab(1)">
            <!-- 动画 -->
            <img :src="[active==2?ac_cartoon:cartoon]" :alt="$t('SportsView.Animation')"  :title="$t('SportsView.Animation')"  @click="changeTab(2)" v-if="fbStore.rightList.as?.length>0">
            <!-- 比分数据 -->
            <img v-if="fbStore.rightList.nsg?.length>0" :src="[active==3?ac_sp:sp]" :alt="$t('SportsView.Score')"  :title="$t('SportsView.Score')" @click="changeTab(3)">
          </div>
        </div>
        <div class="dropdown-box" v-if="display" ref="dropdown" >
          <DropDownBox ref="dropboxDiv" :lists="fbStore.rightList" :activeEvent="activeEvent" @updateactiveEvent="updateactiveEvent" v-if="display"/>
        </div>
        <!-- 卫星直播 -->
        <div class="liveVedio cartoonDiv" v-if="satelliteLiveUrl && active==1">
          <div class="cartoonDiv-wraper">
            <iframe
              :style="{ width: `${isWidth}px`, height: `${isHeight}px` }"
              v-if="satelliteLiveUrl"
              class="iframe"
              :src="satelliteLiveUrl"
              scrolling="no"
              frameborder="0"
              allow="autoplay"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>
        <!-- 动画 -->
        <div class="cartoonDiv" v-else-if="fbStore.rightList.as?.length>0 && cartoonUrl && active==2">
          <div class="cartoonDiv-wraper">
            <iframe class="iframe" :src="cartoonUrl+`&language=${language}`" frameborder="0" allowfullscreen style="vertical-align: bottom;"></iframe>
          </div>
        </div>
        <!-- 比分数据 -->
        <div class="resultData" v-else-if="fbStore.rightList?.ms == 5  && active==3">
          <ResultStage v-if="fbStore.rightList?.ms == 5" :event="fbStore.rightList"/>
        </div>
         <!-- 没有数据时展示 -->
         <div class="playbox" v-else>
         <div class="playbox-wraper">
          <video class="vid" width="100%" height="120px" style="object-fit: cover;" autoplay loop muted poster="./img/contest-bg.png" playsinline>
            <source src="./img/contest-bg.mp4" type="video/mp4" />
          </video>
         </div>
          <EventInformation :lists="fbStore.rightList" />
        </div>
        <!-- 盘口详情列表 -->
        <template v-if="isMore()">
          <div class="selects-wrap">
            <img 
            :src="fold" 
            alt="" 
            class="foldicon"
             @click.stop="toggleAll"
             :style="{ transform: `rotate(${rotation}deg)` }"
             >
            <div class="swiper-selects">
              <div class="swiper-wrapper">
                <div
                  v-for="item in tabList"
                  :key="item.key"
                  @click.stop="handleFilter(item.key)"
                  class="tab-but options"
                  :class="{ 'active': item.key === activeTab,'swiper-slideActive': item.key === activeTab, 'swiper-slide': true }"
                >
                  {{ item.value }}
                </div>
              </div>
            </div>
          </div>
          <!-- 更多盘口 -->
          <RightAllHandicap ref="odds" :activeTab="activeTab" :matchid="fbStore.curEventId" />
        </template>
        <!-- 赛事列表 -->
        <template v-if="isEventList()">
          <RightAllList  v-if="isEventList()"/>
        </template>
      </div> 
      <!-- <div class="nodata" v-else><img :src="noData" alt=""></div> -->
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, ref, watch} from 'vue'
import Swiper from 'swiper'
import { CaretBottom } from '@element-plus/icons-vue'
import { CaretTop } from '@element-plus/icons-vue'
import xgVideo from '@/components/Video/xgVideo.vue'
import ResultStage from './ResultStage.vue'
import EventInformation from './EventInformation.vue'
import DropDownBox from './DropDownBox.vue'
import defaultTeamIcon from './img/default-team-logo.png'
import RightAllList from './RightAllList.vue'
import video from './img/video.png'
import cartoon from './img/cartoon.png'
import sp from './img/sp.png'
import noData from './img/nodata.png'
import ac_cartoon from './img/ac-cartoon.png'
import ac_video from './img/ac_video.png'
import ac_sp from './img/ac_sp.png'
import fold from './img/fold.png'
import { uniq } from 'lodash'
import { iframeVider } from '@/utils/cache'
import { getSportGamePlay } from '@/hooks/useSportDict'
import {getMatchDetail} from '@/api/fb'
import RightAllHandicap from './RightAllHandicap.vue'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
// import { useLiveStore } from '@/stores/liveBroadcast'
// const liveStore = useLiveStore()

const language = computed(() => (appStore.language === 'zh-cn' ? ' ' : 'en'))
const activeTab = ref('all')
const display = ref(false)
const matchid = ref('')
const listsId =  ref()
const isClick = ref(false)
const clickId = ref()
const odds = ref(null)
const rotation = ref(180)
const searchresult = ref([])
const buttonRef = ref()
const activeEvent = ref(0)
const virtualSlides = ref([]) 
let mySwiper = null // 保存 Swiper 实例的引用
const isBeginning = ref(true) //判断是不是开始
const isEnd = ref(false) //判断是不是结束
const dropdown = ref(null)
const active = ref(2)//默认动画
const isWidth = ref('100%')
const isHeight = ref('273')
// const show = ref(false)
const satelliteLiveUrl = ref('');//卫星直播视频源
const cartoonUrl = ref('')//动画源
const isManual = ref(false)//是否手动切换了数据显示
// 定义定时器变量
let timerId = null
let prevMatchInterval = null

// 赛事列表
const isEventList = () => {
  return fbStore.curPage == 'searchResult'  || fbStore.curPage == 'eventdetail' || fbStore.curPage == 'rightallList'  || fbStore.curPage == 'rightside'
}
// 更多游戏盘口
const isMore = () => {
  return fbStore.curPage == 'middle' || fbStore.curPage == 'allList'|| fbStore.curPage == 'searchbox'
}

//监听是否有卫星直播
watch(
  [() => fbStore.matchList, () => fbStore.rightList],
  ([matchList, rightList]) => {
    // console.log(matchList,2222, rightList,3333, satelliteLiveUrl.value);
    // 先将result设置为null或undefined
    // let result = null;
    if(!satelliteLiveUrl.value){
      // 使用find查找匹配项
      const result = matchList.find((source) => {
        // console.log(source,111,rightList)
        if (source.listid == rightList.fbId && rightList.liveUrl) {
          // show.value = true;
          return true; // 匹配到了
        }
        return false; // 未匹配到
      });

      // console.log(result, 'result');

      // 根据条件更新satelliteLiveUrl的值
      if (result) {
        // console.log(rightList.list,'rightList.list[0].liveUrl')
        satelliteLiveUrl.value = iframeVider(rightList.liveUrl, 1); // 匹配到了，更新liveUrl
      } else {
        satelliteLiveUrl.value = ''; // 未匹配到，设置为空字符串
      }
    }

    if(!cartoonUrl.value){
      cartoonUrl.value = rightList.as
    }

    if(!isManual.value){//用户没有手动切换
      if(satelliteLiveUrl.value){
        active.value = 1
      }else if(fbStore.rightList.as?.length>0){
        active.value =  2
      }else if(fbStore.rightList?.ms == 5){
        active.value =  3
      }else{
        return null
      }
    }
    
    if(rightList){//赛事更新后及时更新下拉框选中的赛事
      activeEvent.value = 0
    }
  },
  { deep: true } // 使用深度监听
);

// 在组件加载后初始化 Swiper
onMounted(() => {
  setTimeout(() => {
     // 初始化 Swiper
      mySwiper = new Swiper('.swiper-selects', {
        slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
        virtual: {
          slides: virtualSlides.value // 设置虚拟 Slide 数据
        },
        slidesPerGroup: 3, //几个为一组
        spaceBetween: '10', //边距20px
        grabCursor: true, //光标显示手指滑动
        observer: true,
        observeParents: true,
      })
      // 添加虚拟 Slide 的数据，可以根据需要修改
      // virtualSlides.value =props.tableData
      // 添加滑动事件监听器
      mySwiper.on('slideChange', handleSlideChange)
  }, 2000);
  
  document.addEventListener('click', handleClickOutside);
})
init()
function init(){
  startTimer()
}
// 创建定时器函数
function startTimer() {
  stopTimer()
  timerId = setInterval(() => {
    updateMatchDetail()
  }, 8000)
}
function updateMatchDetail() {
  // 先保存上一个赛事详情数据
  setPreviousMatch()
  // 获取赛事详情数据
  fetchMatchDetail()
}
async function fetchMatchDetail() {
  const res = await getMatchDetail({
    matchId: fbStore.rightList.id
  })
  fbStore.curEvent = res
  fbStore.rightList = res
  fbStore.matchDetailList = res
}
function setPreviousMatch() {
  fbStore.previousMatchDetailData = { ...fbStore.matchDetailList }
  // 先清掉定时器
  if (prevMatchInterval) {
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }
  // 启动定时器
  prevMatchInterval = setTimeout(() => {
    fbStore.previousMatchDetailData = {}
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }, 2500)
}
// 停止定时器
function stopTimer() {
  clearInterval(timerId)
  timerId = null
}
//切换动画，直播或者数据
function changeTab(val){
  active.value = val
  isManual.value = true
}
const isCollapse = computed(() => {
  return fbStore.mgListIdxs.length ? false : true
})
fbStore.isOperatedMarketsListCollapse = false // 每次进入页面重置操作状态，默认展开所有玩法

const lists = computed(()=>{
  if(fbStore.matchList && !isClick.value && fbStore.curPage !== 'searchResult'){
    if(fbStore.matchList.length>1){
      return fbStore.matchList[0]
    }
  }
  if(fbStore.matchList && !isClick.value && fbStore.curPage !== 'searchResult'){
    if(fbStore.matchList.length==1){
      return  fbStore.matchList[0]
    }
  }
  if(isClick.value && fbStore.curPage !== 'searchResult'){
    const clickedItem = fbStore.matchList.find(item=>item.id === clickId.value)
    if (clickedItem) {
      return clickedItem;
    }
  }
  if(fbStore.curPage == 'searchResult'){
    return searchresult.value
  }
  return false
})

//获取赛事id
watch(
  ()=>fbStore.curEventId,
  ()=>{
    clickId.value = fbStore.curEventId
    isClick.value = true
  }
)
watch(
  ()=>fbStore.curPage,
  ()=>{
    if(fbStore.curPage == 'searchResult'){
      searchresult.value = fbStore.curPage 
    }
    clickId.value = fbStore.curPage.id
  }
)
watchEffect(
  ()=>{
    if(fbStore.curPage == 'searchResult'){
      isClick.value = false
    }
    if(fbStore.curPage !== 0 && lists.value.id && fbStore.curPage !== 'searchResult'){
      matchid.value = lists.value.id
    }
  }
)

const tabList = computed(() => {
  const mg = fbStore.matchDetailList?.mg
  const mergedTps = mg?.reduce((merged, item, idx) => {
    item.idx = idx
    if (item.tps) {
      merged.push(...item.tps)
    }
    return merged
  }, [])
  const uniqueTps = uniq(mergedTps)
  const filteredArray = getSportGamePlay(i18n).filter((item) => uniqueTps.includes(item.key))
  const allItem = { key: 'all', value: i18n.global.t('SportsView.All') }
  return [allItem, ...filteredArray]
})
const handleFilter = (key) => {
  activeTab.value = key
}
// 打开下拉框
function clicktitle(val){
  display.value = !display.value
  fbStore.rightSideDropBox = true
  // console.log(val,display.value)
  if(display.value){
    fbStore.queryMatchListParams.leagueId = val.lg.id
    fbStore.queryMatchListParams.oddsType = 2
    fbStore.isClickRightTitle = true
    fbStore.rightSideDropBox = true
    getlists()
  }
}
// 获取下拉框里面的赛事
function getlists(){
  let data = {
    leagueId:fbStore.queryMatchListParams.leagueId,
    oddsType:fbStore.queryMatchListParams.oddsType
  }
  // console.log(3333,fbStore.rightList)
  return fbStore.getMatchList(data)
}

watch(() => lists.value?.mg, (newValue) => {
  const panelNames = newValue?.map((item, index) => Number(index));
  listsId.value = panelNames;
});
// 当前玩法列表
const oddsList = computed(() => {
  if (activeTab.value === 'all') {
    return fbStore.matchDetailList.mg || []
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})
const toggleAll = () => {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    // odds.value.toggleAll(true)
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  } else {
    // 如果是展开状态则折叠列表
    // odds.value.toggleAll(false)
    fbStore.mgListIdxs = []
  }
  // 标识用户手动操作了详情页玩法列表折叠面板
  fbStore.isOperatedMarketsListCollapse = true
  rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180)
}

function updateactiveEvent(val1,val2){
  activeEvent.value = val1
  if(val2.id){
    fbStore.getMatchDetail({
      matchId: val2.id
    })
  }
}

watch(
  ()=>fbStore.rightSideDropBox,
  ()=>{
    if(!fbStore.rightSideDropBox){
      display.value = false
    }
  }
)
//监听滑动
const handleSlideChange = (objSwiper) => {
  // activeIndex.value = objSwiper.activeIndex
  // 处理滑动事件
  isBeginning.value = objSwiper.isBeginning
  isEnd.value = objSwiper.isEnd
  // console.log('Slide 已切换',objSwiper);
}
const handleClickOutside = (event) => {
  const dropdowns = dropdown.value
  if (dropdowns && !dropdowns.contains(event.currentTarget)) {
    fbStore.rightSideDropBox = false;
  }
}
// watch(
//   ()=>fbStore.curEvent,
//   ()=>{
//     console.log(fbStore.curEvent,'fbStore.curEvent')
//   },{deep:true, immediate: true}
// )
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
onBeforeUnmount(()=>{
  stopTimer()
  clearInterval(timerId)
})
</script>

<style lang="scss" scoped>
.SportsRightSide{
  background: #171A2F;
  border-radius: 2px 2px 0px 0px;
  margin-left: 5px;
  width: 100%;
  position: relative;
  .SportsRightSide-wrap{
    width: 100%;
    height: 100%;
    // position: relative;
    .sportcontent{
      width: 100%;
      height: 100%;
      // position: relative;
      background: #151525;
    }
    .sporttitle{
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .sporttitleleft{
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 100%;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;   /* 显示省略号 */
        // margin-right: 30px;
        .sportsname{
          // width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;   /* 显示省略号 */
          height: 100%;
          line-height: 36px;
          display: block;
          font-size: 14px;
          color: #fff;
          font-weight: 600;
        }
      }
      .sporttitleright{
        display: flex;
        img{
          width: 12px;
          height: 12px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
    .sportsicon{
      display: block;
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
    .dropdown-box{
      position: absolute;
      height: auto;
      width: 100%;
      background: #272B45;
      z-index: 999;
      overflow-y: auto; //这个不要动 是为了监听整个浏览器的高度 显示平滑滚动的
      scrollbar-width: none; //火狐浏览器 隐藏滚动条
      height: calc(100vh - 174px);
    }
    .playbox{
      height: 120px;
      width: 100%;
      background: transparent;
      margin-bottom: 10px;
      position: relative;
      margin-bottom: 10px;
      padding: 0;
      .playbox-wraper{
        width: 100%;
        height: 100%;
        position: absolute;
      }
      video {
        // position: fixed;
        top: 0px;
        width: 100%;
        height:100%;
        // position: absolute;
        left: 0;
        // z-index: -10;
      }
    }
    .cartoonDiv{
      .cartoonDiv-wraper{
        width: 100%;
        min-height: 244px;
        border: none;
        .iframe{
          width: 99.6%;
          border-radius: 5px;
          border: none;
          height: calc(22vw - 150px);
          min-height: 260px;
          max-height: 339px;

        }
      }
    }
    .resultData{
      
    }
    .selects-wrap{
      display: flex;
      width: 100%;
      align-items: center;
      .foldicon{
        display: block;
        width: 16px;
        height: 16px;
        margin: 0 10px;
        cursor: pointer;
        margin-top: -8px;
      }
    }
    .selects,.swiper-wrapper{
      display: flex;
      align-items: center;
      height: 36px;
      width: 85%;
      margin-top: 10px;
      // overflow-x: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      position: relative;
      margin-bottom: 10px;
      white-space: nowrap;
      flex-wrap: nowrap;
      flex: 1;
      .options{
        padding: 6px 15px;
        border: 1px solid rgba(255, 255, 255, 0.20);
        border-radius: 20px;
        margin-right: 10px;
        cursor: pointer;
        white-space: nowrap;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        width: auto;
      }
         
      .active{
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        width: auto;
      }
      :deep(){
        .el-tabs__nav-wrap::after{
          display: none;
        }
        .el-tabs__item{
          color: var(--60, rgba(255, 255, 255, 0.60));

        }
      }
    }
    .swiper-selects {
      // margin-left: auto;
      // margin-right: auto;
      position: relative;
      overflow: hidden;
      list-style: none;
      padding: 0 10px 0 0;
      z-index: 1;
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
  :deep(){
      .el-collapse-item__arrow{
        rotate: 90deg;
      }
      .el-collapse-item__arrow.is-active{
        transform: rotate(180deg);
      }
      .el-collapse{
        border: none;
        background-color: #151525;
      }
      .el-collapse-item__header{
        border-radius: 2px;
        background: #171A2F;
        border: none;
        color: var(--60, rgba(255, 255, 255, 0.60));
        height: 36px;
        margin-bottom: 5px;
        // padding: 0 15px;
        margin: 0 15px;
        color: #fff;
        border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
        overflow: hidden;
        white-space: nowrap;
      }
      .el-collapse-item__wrap{
        background: transparent;
        border: none;
      }
      .el-collapse-item__content{
          color: var(--60, rgba(255, 255, 255, 0.60));
          padding-bottom: 8px;
          margin-top: 8px;
      }
      .secondMenu{
        .el-collapse-item__arrow.is-active,.el-collapse-item__arrow{
          display: none;
        }
      }
    }
}
</style>