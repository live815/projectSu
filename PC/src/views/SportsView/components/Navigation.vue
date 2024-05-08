<template>
  <div  class="Navigation-view">
    <!-- 我的关注 -->
    <div class="navItem myfollow" v-show="!betCartStore.isOpenBetCart" :class="navClass(1)" @click="changeType(1)">
      <div>
        <img :src="star" alt="">
        <span>{{$t('SportsView.MyFocus')}}</span>
      </div>
      <p class="num">{{ fbStore.followListNum }}</p>
    </div>
    <!-- 快速投注 -->
    <div class="navItem quickbet" @click="toggleQuickBet(1)"  v-show="!betCartStore.isOpenBetCart">
      <div>
        <img :src="quick" alt="">
        <span>{{$t('SportsView.QuickBet')}}</span>
      </div>
      <p class="num">{{ betCartStore.betList.length }}</p>
    </div>
    <div class="betCart" v-show="betCartStore.isOpenBetCart">
      <BetCart />
    </div>
    <!-- 滚球 -->
    <div class="navItem rolling-ball " :class="navClass(3)" @click="changeType(3)"  v-show="!betCartStore.isOpenBetCart">
      <div>
        <img :src="rollball" alt="">
        <span>{{$t('SportsView.RollingBall')}}</span>
      </div>
      <p class="num">{{ fbStore.totalLive }}</p>
    </div>
    <!-- 体育菜单 -->
    <div class="navItem sportmenu" @click="toggleQuickBet(2)"  v-show="!betCartStore.isOpenBetCart">
        <div>
          <img :src="menu" alt="">
          <span>{{$t('SportsView.SportsMenu')}}</span>
        </div>
        <el-icon v-if="!fbStore.sportMenuStatus" class="btnicon"><CaretBottom /></el-icon>
        <el-icon v-else  class="btnicon"><CaretTop /></el-icon>
    </div>
    <!-- 今日和早盘按钮 -->
    <div class="sportmenulist" v-if="fbStore.sportMenuStatus && !betCartStore.isOpenBetCart">
      <div class="handicap-wrap">
        <div v-for="handicap in handicaps" :key="handicap" @click="choosehandicap(handicap)" :class="{ 'active': handicapActive == handicap }">
          {{ handicap }}
        </div>
      </div>
      <!-- 球类型列表 -->
      <ul class="balltypes" v-if="filterList.length>0">
        <li v-for="(item,index) of filterList" :key="index" @click="clicksportmenu(item,index)"  :class="sportactive==index?'active':''">
          <div class="left">
            <img :src="sportIconActive[item.sportId]" alt="">
            {{ getBallTypeTextById(item.sportId) }}
          </div>
          <div class="right">
            <span>{{ item.c }}</span>
          </div>
        </li>
      </ul> 
      <ul class="nodata" v-else><img :src="noData" alt=""></ul>
    </div>
    <!-- 冠军 -->
    <div class="navItem champion" :class="navClass(5)" @click="changeType(5)"  v-show="!betCartStore.isOpenBetCart">
      <div>
        <img :src="champions" alt="">
        <span>{{$t('SportsView.Champion')}}</span>
      </div>
      <p class="num">{{ fbStore.chanmpionNum }}</p>
    </div>
    <!-- 热门赛事 -->
    <div class="navItem hotsportmenu" @click="toggleQuickBet(3)" v-show="!betCartStore.isOpenBetCart">
      <div>
        <img :src="hot" alt=""  >
        <span>{{$t('SportsView.PopularEvents')}}</span>
      </div>
      <el-icon v-if="!fbStore.hotMenuStatus" class="btnicon"><CaretBottom /></el-icon>
      <el-icon v-else  class="btnicon"><CaretTop /></el-icon>
    </div>
    <div class="sportlist" v-if="fbStore.hotMenuStatus && !betCartStore.isOpenBetCart">
      <ul>
        <li  :class="{'hotactive':hotactive == index}" v-for="(item,index) of fbStore.statistical?.hls" :key="index" @click="chooseHotList(item,index)">
          <div class="ename">{{ item.na }}</div>
          <div class="num">{{ item.mt }}</div>
        </li>
      </ul>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {ref,computed,} from 'vue'
import BetCart from './BetCart/BetCart.vue'
import eventBus from '@/utils/eventBus'
import quick from '../img/quick.png'
import menu from '../img/menu.png'
import champions from '../img/champion.png'
import rollball from '../img/rollball.png'
import noData from '../img/nodata.png'
import hot from '../img/hot.png'
import star from '../img/star.png'
import { CaretBottom } from '@element-plus/icons-vue'
import { SPORT_IDS,getBallTypeTextById } from '@/hooks/useSportDict'
import { sportIconActive } from '@/utils/config'
import { CaretTop } from '@element-plus/icons-vue'
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const handicaps = [i18n.global.t('SportsView.Todays'), i18n.global.t('SportsView.MorningTrading')];
const handicapActive = ref(i18n.global.t('SportsView.Todays'));//体育菜单默认今日
// const hotlists = ref([])
const ssl=computed(()=>{
  if(handicapActive.value == i18n.global.t('SportsView.Todays')){
    return fbStore.todayBall
  }else{
    return fbStore.morningBall
  }
})
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
})
const navactives = ref(3)
const sportactive = ref()
const hotactive = ref()
const navClass = (index) => ({ 'actives': navactives.value === index });
fbStore.ballTypeName = i18n.global.t('SportsView.RollingBall')

onMounted(()=>{
  fbStore.isShowAll = true
  eventBus.emit('myfollow',true)
})

const filterList = computed(()=>{
  const arr = Object.entries(SPORT_IDS).map(([sport, sportId]) => ({ sportId }))
  // console.log(arr,'arr',ssl.value,55555,fbStore.todayBall)
  const filteredArr = arr.map((item) => {
    let currObj = null 
    if(ssl.value){
      currObj = ssl.value?.find((o) => o.sid == item.sportId)
    }
    
    if (currObj) {
      item.c = currObj.c
    } else {
      item.c = 0
    }
    return item
  }).filter((item) => item.c !== 0)
  // console.log(filteredArr,'filteredArr')
  return filteredArr;
})
// 切换侧边导航
function changeType(val){
  fbStore.Median = 2
  //清空路由
  nextTick(() => {
    router.replace({ path: '/sports', query: {} })
  })
  // console.log(33333,router.query,router.path)
  fbStore.eventChoose == 1//赛事筛选显示全部
  fbStore.skeletonLoading = true
  fbStore.rightSideDropBox = false
  fbStore.isMatchResult = false
  navactives.value = val
  hotactive.value = null
  sportactive.value = null
  fbStore.eventChooseStatus = false//关闭赛事筛选
  eventBus.emit('showEventChoose',false)
  fbStore.isShowBallType = true
  fbStore.curPage = 'allList'
  fbStore.reqestStatus = false
  fbStore.skeletonLoading = true
  fbStore.isRollingBall = false
  fbStore.isMyFollow = false
  fbStore.isClickmyfollow = false
  fbStore.isOperatedMatchListCollapse = false
  fbStore.current = 1
  if(val == 5){//冠军
    fbStore.queryMatchListParams.type = 7
    fbStore.ballTypeName = i18n.global.t('SportsView.Champion')
    fbStore.queryMatchListParams.sportId = 1

    // const arr = Object.entries(SPORT_IDS).map(([sport, sportId]) => ({ sportId }))
    // let total1 = fbStore.statistical.sl?.find((item) => item.ty === 7)
    // const found = total1.ssl.find(val=>val.c>0)
    // console.log(total1.ssl,55555555,found,found.sid,arr)

    fbStore.isChampionsList = true
    fbStore.isShowAll = false
    clickgetMatchList()
  }
  if(val == 3){//滚球
    fbStore.queryMatchListParams.sportId = 0
    fbStore.queryMatchListParams.type = 1
    fbStore.ballTypeName = i18n.global.t('SportsView.RollingBall')
    fbStore.isClickHotList = false
    fbStore.isRollingBall = true
    fbStore.curPage = 'middle'
    fbStore.isShowAll = true
    fbStore.isMyFollow = false
    fbStore.isClickBallType = false
    eventBus.emit('sportId',fbStore.queryMatchListParams.sportId)
    clickgetMatchList()
  }
  if(val == 1){//我的关注
    fbStore.ballTypeName = i18n.global.t('SportsView.MyFocus')
    fbStore.isShowAll = true
    fbStore.isMyFollow = true
    fbStore.isClickmyfollow = true
    fbStore.queryMatchListParams.type = 0
    fbStore.queryMatchListParams.sportId = 0
    // 默认显示关注的第一个球类型
    // let keys = Object.keys(fbStore.followList)
    // const foundValue = ref(false);
    // for (const key of keys){
    //   const value = fbStore.followList[key];
    //   if(value.length>0){
    //     foundValue.value = true;
    //     fbStore.queryMatchListParams.sportId = Number(key)
    //     break;
    //   }
    // }

    // console.log(fbStore.followList)
    // 使用 flatMap 将对象中的值取出放进新数组
    const newArray = Object.values(fbStore.followList).flatMap(value => value);
    fbStore.matchIds = newArray
    eventBus.emit('sportId',fbStore.queryMatchListParams.sportId)
    if(fbStore.matchIds.length>0){
      getMyFollowList()
    }
    
    // HandleCollect()
  }
  
}

function toggleQuickBet(val){
  fbStore.isMatchResult = false
  fbStore.rightSideDropBox = false
  fbStore.eventChooseStatus = false//关闭赛事筛选
  fbStore.eventChoose == 1//赛事筛选显示全部
  if(val == 1){//快速投注
    betCartStore.isOpenBetCart = !betCartStore.isOpenBetCart
    fbStore.sportMenuStatus = false
    fbStore.hotMenuStatus = false
  }
  if(val == 2){//体育菜单
    fbStore.sportMenuStatus = !fbStore.sportMenuStatus
  }
  if(val == 3){//热门赛事
    fbStore.hotMenuStatus = !fbStore.hotMenuStatus
  }
}
// 选择热门赛事
function chooseHotList(val1,val2){
  fbStore.eventChooseStatus = false//关闭赛事筛选
  fbStore.Median = 2
  //清空路由
  nextTick(() => {
    router.replace({ path: '/sports', query: {} })
  })
  // console.log(33333,router.query,router.path)

  fbStore.skeletonLoading = true
  fbStore.rightSideDropBox = false
  fbStore.isMatchResult = false
  hotactive.value = val2
  sportactive.value = null
  navactives.value = null
  fbStore.queryMatchListParams.type = 5
  fbStore.queryMatchListParams.leagueId = val1.id
  fbStore.isShowBallType = false
  fbStore.ballTypeName = i18n.global.t('SportsView.PopularEvents')
  fbStore.curEvent = val1
  fbStore.curPage = 'allList'
  fbStore.isOperatedListCollapse = false
  fbStore.isClickHotList = true
  fbStore.defaultActiveEvent = val1.id
  fbStore.isOperatedMatchListCollapse = false
  clickgetMatchList()
}
// 切换今日和早盘
function choosehandicap(val){
  fbStore.eventChoose == 1//赛事筛选显示全部
  fbStore.eventChooseStatus = false//关闭赛事筛选
  // 切换分类是需要重置操作状态，自动展开折叠面板
  fbStore.isOperatedListCollapse = false
  fbStore.isOperatedMatchListCollapse = false
  sportactive.value = null
  fbStore.rightSideDropBox = false
  fbStore.isMatchResult = false
  navactives.value = null
  hotactive.value = null
  // fbStore.isShowBallType = false
  // fbStore.skeletonLoading = true
  fbStore.current = 1
  if(val==i18n.global.t('SportsView.Todays') ){//今日
    handicapActive.value=i18n.global.t('SportsView.Todays')
    // ssl.value = fbStore.todayBall
    // fbStore.queryMatchListParams.type = 3
    // fbStore.queryMatchListParams.sportId = filterList.value[0]?.sportId
    // fbStore.ballTypeName = i18n.global.t('SportsView.Todays')
  }
  if(val==i18n.global.t('SportsView.MorningTrading') ){//早盘
    handicapActive.value=i18n.global.t('SportsView.MorningTrading')
    // ssl.value = fbStore.morningBall
    // fbStore.queryMatchListParams.type = 4
    // fbStore.queryMatchListParams.sportId = filterList.value[0]?.sportId
    // fbStore.ballTypeName = i18n.global.t('SportsView.MorningTrading')
    // console.log(filterList.value,'filterList',filterList.value[0].sportId)
  }
  // clickgetMatchList()
}
// 点击体育菜单里面的球类
function clicksportmenu(val,index){
  fbStore.eventChooseStatus = false//关闭赛事筛选
  fbStore.skeletonLoading = true
  fbStore.isMatchResult = false
  fbStore.rightSideDropBox = false
  navactives.value = null
  sportactive.value = index
  hotactive.value = null
  fbStore.queryMatchListParams.leagueId = null
  fbStore.isOperatedMatchListCollapse = false
  fbStore.current = 1
  fbStore.Median = 2

  eventBus.emit('updatecur',0)//更新被选中的标签为全部
  fbStore.queryMatchListParams.sportId = val.sportId
  fbStore.isShowBallType = false
  fbStore.ballTypeName = handicapActive.value
  fbStore.curPage = 'allList'
  fbStore.isOperatedListCollapse = false

  timeRange.value.startTime =  ''
  timeRange.value.endTime = ''

  eventBus.emit('updateDate',timeRange)
  //清空路由
  nextTick(() => {
    router.replace({ path: '/sports', query: {} })
  })


  if(handicapActive.value==i18n.global.t('SportsView.MorningTrading')){//早盘
    fbStore.queryMatchListParams.type = 4
    getMatchCountLists()
  }else{//今日
    fbStore.queryMatchListParams.type = 3
  }
  
}
// 获取赛事未来天数的赛事数量
function getMatchCountLists(){
  const data = {
    sportId:fbStore.queryMatchListParams.sportId,
    days:7,
  }
  return fbStore.getMatchCountList(data)
}
function clickgetMatchList(){
  fbStore.skeletonLoading = true
  //获取全部赛事
  if(fbStore.queryMatchListParams.sportId == 0 && fbStore.queryMatchListParams.type == 1 ){
      const alldata = {
        current: 1,
        isPC: true,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportIds:[],
        type:1
      }
      return fbStore.getMatchList(alldata)
    }
  // 体育菜单
  if(fbStore.queryMatchListParams.type == 3 || fbStore.queryMatchListParams.type == 4){
    const alldata = {
      current: 1,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportId:fbStore.queryMatchListParams.sportId,
      type:fbStore.queryMatchListParams.type
    }
    return fbStore.getMatchList(alldata)
  }
  // 热门赛事
  if(fbStore.queryMatchListParams.leagueId  && fbStore.queryMatchListParams.type == 5){
    let  data = {
        current: 1,
        isPC: true,
        leagueId:fbStore.queryMatchListParams.leagueId,
        orderBy: fbStore.queryMatchListParams.orderBy,
        type:5
    }
    return fbStore.getMatchList(data)
  }
  //获取冠军赛事
  if(fbStore.queryMatchListParams.type == 7 ){
      const alldata = {
        current: 1,
        isPC: true,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportId:fbStore.queryMatchListParams.sportId,
        type:7
      }
      return fbStore.getMatchList(alldata)
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
// watch(
//   ()=>fbStore.totalLive,
//   ()=>{
//     if(fbStore.totalLive == 0){
//       navactives.value = 0
//       sportactive.value = 0
//       fbStore.queryMatchListParams.type = 3
//     }
//   },{deep:true, immediate: true }
// )
</script>
<style lang="scss" scoped>
.Navigation-view{
  .navItem{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 38px;
    margin-top: 5px;
    border-radius: 2px;
    cursor: pointer;
    background: #171A2F;
    margin-bottom: 5px;
    >div{
      height: 38px;
      line-height: 38px;
      width: 100%;
      display: flex;
      align-items: center;
      // margin-top: 5px;
      margin-left: 8px;
      img{
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
      .num{
        display: block;
        width: 30px;
        height: 25px;
        line-height: 25px;
        align-items: center;
        font-size: 12px;
        background: var(--unnamed, #1D223C);
        margin-right: 5px;
        justify-content: center;
      }
    }
    .btnicon{
      margin-right: 7px;
      width: 15px;
    }
    &:hover{
      background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0) 100%);
      margin-bottom: 5px;
      .num{
        background: var(--unnamed, #F35F1B);
        color: #fff;
      }
    }
    .num{
      display: flex;
      width: 30px;
      height: 25px;
      align-items: center;
      font-size: 12px;
      background: var(--unnamed, #1D223C);
      margin-right: 5px;
      justify-content: center;
      
    }
  }
  .actives{
    background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0) 100%);
    margin-bottom: 5px;
    .num{
      border-radius: 2px;
      background: var(--unnamed, #F35F1B);
      color: #fff;
    }
  }
  .sportlist{
    ul{
      list-style: none;
      width: 100%;
      padding: 0 0;
      li{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        height: 35px;
        align-items: center;
        background: #171A2F;
        padding: 0 5px 0 8px;
        cursor: pointer;
        &:hover{
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0.00) 100%);
        }
        &:hover .num{
          border-radius: 2px;
          background: var(--unnamed, #F35F1B);
          color: #fff;
        }
        .ename{
          width: 83%;
          text-align: left;
        }
        .num{
          display: flex;
          width: 25px;
          height: 25px;
          align-items: center;
          font-size: 12px;
          background: var(--unnamed, #1D223C);
          margin-right: 0px;
          justify-content: center;
        }
      }
      .hotactive{
        border-radius: 2px;
        background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0.00) 100%);
      }
    }
  }
  .sportmenulist{
    filter: drop-shadow(0px -8px 10px rgba(0,0,0,0.03));
    background: #171A2F;
    margin-bottom: 5px;
    padding-bottom: 10px;
    .handicap-wrap{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-top: 10px;
      >div{
        border-radius: 30px;
        flex: 1;
        height: 30px;
        line-height: 30px;
        background:#0D0F1C;
        margin: 0 5px;
        cursor: pointer;
      }
      .active{
        color: white;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      }
    }
    ul{
      list-style: none;
      padding: 0 0px;
      li{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        padding: 0 5px 0 8px;
        cursor: pointer;
        &:hover{
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0.00) 100%);
        }
        
        &:hover .right span{
          border-radius: 2px;
          background: var(--unnamed, #F35F1B);
          color: #fff;
        }
        div{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        img{
          display: block;
          height: 18px;
          width: 18px;
          margin-right: 5px;
        }
        .right{
          span{
            display: block;
            width: auto;
            padding: 0 5px;
            height: 25px;
            line-height: 25px;
            border-radius: 2px;
            background: var(--unnamed, #1D223C);
          }
        }
      }
      .active{
        border-radius: 2px;
        background: linear-gradient(90deg, rgba(255, 144, 1, 0.25) 1.25%, rgba(254, 172, 75, 0.00) 100%);
      }
    }
    .nodata{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        display: block;
        width: 155px;
        height: 100%;
        padding: 15px;
      }
    }
  }
}
</style>