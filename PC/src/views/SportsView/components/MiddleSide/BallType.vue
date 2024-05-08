<template>
  <div class="BallType">
    <div class="BallType-wrap">
      <el-tabs type="border-card" class="demo-tabs" :class="curpage == 'rightside'?'rightside':''" v-model="activeName" @tab-change="handleTabChange(activeName)">
        <el-tab-pane v-if="fbStore.isShowAll" class="all">
          <template #label>
            <span class="custom-tabs-label">
              <div class="iconbox iconbox1">
                <img class="icon" :src="[activeName==0?AllActive:All]" alt="">
              </div>
              <span  v-if="!fbStore.isMyFollow">{{$t('SportsView.All')}}<span class="num">{{ totalC }}</span></span>
              <span  v-if="fbStore.isMyFollow">{{$t('SportsView.All')}}<span class="num">{{ fbStore.followListNum }}</span></span>
            </span>
          </template>
        </el-tab-pane>
        <!-- <template v-if="fbStore.matchList?.length>0"> -->
        <el-tab-pane v-for="(item,index) of filterList" :key="index" :value="item.title" :name="item.sportId" class="types">
          <template #label>
            <span class="custom-tabs-label">
              <div class="iconbox">
                <img
                  v-show="item.sportId === fbStore.queryMatchListParams.sportId"
                  :src="sportIconActive[item.sportId]"
                  alt=""
                  class="icon"
                />
                <img
                  v-show="item.sportId !== fbStore.queryMatchListParams.sportId"
                  :src="sportIcon[item.sportId]"
                  class="icon"
                />
              </div>
              <span >{{ getBallTypeTextById(item.sportId) }}<span class="num">{{ numList[index] }}</span></span>
            </span>
          </template>
        </el-tab-pane>
      <!-- </template> -->
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {computed, onMounted, watch,} from 'vue'
import { SPORT_IDS, getBallTypeTextById } from '@/hooks/useSportDict'
import { sportIcon, sportIconActive } from '@/utils/config'
import All from './img/all-inactive.png'
import AllActive from './img/all-active.png'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const activeName = ref(fbStore.queryMatchListParams.sportId || 0)
const curpage = ref()

const props = defineProps({
  id:Number || String,
  curentpage:String
})

onMounted(()=>{
  curpage.value = props.curentpage
})
const ssl = computed(() => {
  // 关注分类从缓存获取球类总数
  if (!fbStore.queryMatchListParams.type) {
    // console.log(576456546,fbStore.followList)
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
  // console.log(arr,1111,ssl.value,2222,fbStore.followList)
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
    // 根据条件过滤
    if (fbStore.queryMatchListParams.type === 7) {
      return item.title !== i18n.global.t('SportsView.All') && item.c !== 0;
    } 
    else if(fbStore.ballTypeName == i18n.global.t('SportsView.MyFocus')){
      return item.c !== 0;
    }
    else {
      return (item.title === i18n.global.t('SportsView.All') && !fbStore.isMyFollowe) || item.c !== 0;
    }
  })
  // console.log(filteredArr,'filteredArr')
  return filteredArr;
})
//全部滚球数
const totalC = computed(() => {
  if(fbStore.statistical.sl && !fbStore.isMyFollow){
    let res1 = fbStore.statistical.sl.find((item) => item.ty === fbStore.queryMatchListParams.type)
    return res1.ssl.reduce((sum, item) => sum + item.c, 0)
  }
  if(fbStore.isMyFollow){
    // console.log(fbStore.MyFollowList.length,fbStore.MyFollowList)
    return fbStore.MyFollowList.length
  }
  return 0
})
// fbStore.queryMatchListParams.sportId = filterList.value[0].sportId
const numList = computed(() => {
  return filterList.value.map((item) => {
    let max = 999
    if (item.c > max) {
      return `${max}+`
    }
    return item.c || 0
  })
})

//点击tab栏切换
const handleTabChange = () => {
    fbStore.skeletonLoading = false
    fbStore.objLists = []
    fbStore.isOperatedMatchListCollapse = false
    if(activeName.value == 0){
      fbStore.isClickBallType = false
      fbStore.isClickAll = true
    }else{
      fbStore.isClickBallType = true
      fbStore.isClickAll = false
    }
    
    fbStore.isData = false
    if(fbStore.ClickComingSoon){//点击即将开始后切换球类型
      fbStore.queryMatchListParams.type = 3
    }
    fbStore.isMatchResult = false
    fbStore.queryMatchListParams.sportId = activeName.value
    fbStore.isOperatedListCollapse = false    
    fbStore.rightSideDropBox = false
    if(!activeName.value){
      eventBus.emit('temporary',false)
    }
    // console.log(fbStore.isMyFollow,'fbStore.isMyFollow')
    // 我的关注页面
    if(fbStore.isMyFollow){
      fbStore.isClickmyfollow = false
      if(activeName.value !== 0){
        fbStore.matchIds = fbStore.followList[activeName.value]
      }
      if(activeName.value == 0){
        const newArray = Object.values(fbStore.followList).flatMap(value => value);
        fbStore.matchIds = newArray
        // console.log(fbStore.matchIds)
        getMyFollowList()
      }
    }
}
function getMyFollowList(){
  //获取我的关注赛事列表
  const followReqData = {
    current: 1,
    size: 50, // 每页大小, 默认50，一页最多50
    isPC: true,
    // matchIds: fbStore.followList[fbStore.queryMatchListParams.sportId],
    matchIds: fbStore.matchIds || fbStore.followList[fbStore.queryMatchListParams.sportId],
    orderBy: fbStore.queryMatchListParams.orderBy
  }
  return fbStore.getMatchList(followReqData)
}
eventBus.on('sportId',(val)=>{
  activeName.value = val
})
// watch(
//   ()=>fbStore.queryMatchListParams.type,
//   ()=>{
//     // console.log(fbStore.queryMatchListParams.sportId,'bStore.queryMatchListParams.sportId')
//     if(fbStore.queryMatchListParams.type == 7){
//       activeName.value = fbStore.queryMatchListParams.sportId
//       fbStore.isMyFollow = true
//     }
//     else{
//       activeName.value = fbStore.queryMatchListParams.sportId
//     }
//   },
//   { deep: true }
// )
watch(
  ()=>fbStore.ClickComingSoon,
  ()=>{
    if(fbStore.ClickComingSoon){
      activeName.value = 1
      fbStore.isShowAll = false
    }
    if(fbStore.clickProcess){
      activeName.value = 0
      fbStore.queryMatchListParams.type = 1
    }
  }
)
onUnmounted(()=>{
  eventBus.off('sportId')
})
</script>

<style lang="scss" scoped>
.BallType{
  background-color: #171A2F;
  display: block;
  width: 100%;
  .BallType-wrap{
    .iconbox{
      display: block;
      height: 24px;
      width: 24px;
      margin: 10px auto;
    }
    .icon{
      display: block;
      width: 100%;
      height: 100%;
    }
    .num{
      margin-left: 5px;
    }
    :deep(){
      .el-tabs--border-card{
        background-color: #171A2F;
        border: 1px solid transparent;
        width: auto;
      }
      .rightside{
        height: 50px;
        // display: flex;
        align-items: center;
        margin-top: 15px;
      }
      .el-tabs--border-card>.el-tabs__header{
        background-color: #171A2F;
        border-bottom: none;
      }
      .el-tabs__nav-wrap.is-scrollable,.el-tabs__nav{
        background-color: #171A2F;
      }
      .el-tabs__nav{
        height: 60px;
      }
      .el-tabs__nav-prev,.el-tabs__nav-next{
        background: rgba(255, 255, 255, 0.2);
        margin-top: 7px;
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background-color: #171A2F;
        border: 1px solid transparent;
      }
      .el-tabs--border-card>.el-tabs__content{
        display: none;
        // background-color: #171A2F;
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        color: var(--100, #FFF);
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
        color: var(--100, #FFF);
      }
      .el-tabs--border-card>.el-tabs__header .el-tabs__item{
        margin-top: 2px;
      }
    }
  }
}
</style>