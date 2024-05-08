<template>
  <div class="SportsView">
    <div class="SportsView-wrap">
      <template v-if="!fbStore.ifMaintain">
        <div class="SportsView-top">
          <SportTop />
        </div>
        <div class="SportsView-content">
          <SportsLeftSide class="SportsView-content-left" />
          <SportsMiddle class="SportsView-content-middle" :style="{ flexBasis: middleWidth + '%' }" />
          <SportsRightSide
            class="SportsView-content-right"
            :style="{ flexBasis: rightWidth + '%' }"
          />
        </div>
      </template>
      <!-- 维护中 -->
      <template v-else>
        <div class="maintain-view">
          <div class="right">
            <h2>{{$t('SportsView.FBSports')}}{{$t('SportsView.Maintance')}}</h2>
            <h2>{{$t('SportsView.maintainTime')}}：<span class="time">{{ fbStore.maintime }}</span></h2>
          </div>
          <div class="left">
            <img :src="maintain" alt="">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import SportsLeftSide from './components/SportsLeftSide.vue'
import SportsRightSide from './components/RightSide/SportsRightSide.vue'
import SportsMiddle from './components/MiddleSide/SportsMiddle.vue'
import maintain from './img/maintain.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
// import { debounce } from 'lodash'
import {getMatchList} from '@/api/fb'
import eventBus from '@/utils/eventBus'
import SportTop from './components/SportTop.vue'
import { useRouter } from 'vue-router'
const router = useRouter()


let fetchMatchListTimer = null
let prevMatchListInterval = null
const loading = ref(false)
// 初始化时间
const timeRange = ref({
  startTime:'',
  endTime:''
})

const rightToMiddleRatio = ref(1) // 右边div与中间div的宽度比例，默认为1
const containerWidth = ref(window.innerWidth)
// 计算中间和右边div的宽度
const middleWidth = ref(720) // 初始宽度比例，根据需要修改
const rightWidth = ref(330) // 初始宽度比例，根据需要修改
// 监听窗口大小变化，以调整比例
const resizeListener = () => {
  containerWidth.value = window.innerWidth
  updateWidths()
}
const updateWidths = () => {
  const availableWidth = containerWidth.value - 240
  const totalRatio = 1 + rightToMiddleRatio.value
  middleWidth.value = (availableWidth / totalRatio / containerWidth.value) * 100
  rightWidth.value = ((middleWidth.value * rightToMiddleRatio.value) / containerWidth.value) * 100
}
onMounted(() => {
  // 初始化
  updateWidths()
  // 添加窗口大小变化事件监听器
  window.addEventListener('resize', resizeListener)
  StopInterval()
  fbStore.isClickBallType = false
  fbStore.queryMatchListParams.sportId = 0
  fbStore.queryMatchListParams.type = 1
  fbStore.queryMatchListParams.leagueIds = false
  fbStore.isMyFollow = false
  fbStore.isShowBallType = true
})
// 监听比例变化，根据需要修改比例值
watch(rightToMiddleRatio, () => {
  updateWidths()
})

init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      console.log(e)
    }
  }
  fbStore.queryMatchListParams.type = 1
  fbStore.curPage = 'allList'
  // 获取比赛统计
  fbStore.getStatistical()
  // 重置查询参数
  // fbStore.resetQueryParams()
  // 获取比赛列表
  loading.value = true
  if (fbStore.queryMatchListParams.type == 1) {
    fbStore.queryMatchListParams.sportId = 0
    eventBus.emit('sportId', 0)
  }
  await fetchMatchList()
  loading.value = false
  StartInterval()

  //左侧子菜单的数量显示
  if (fbStore.statistical.sl) {
    let res2 = fbStore.statistical.sl.find((item) => item.ty == 3)
    eventBus.emit('ssl', res2.ssl)
    let res3 = fbStore.statistical.sl.find((item) => item.ty == 4)
    eventBus.emit('morning', res3.ssl)
  }
}

function StartInterval() {
  StopInterval()
  fetchMatchListTimer = setInterval(() => {
    fbStore.previoustotalLive = fbStore.totalLive
    updateMatchList()
  }, 8000)
}
function StopInterval() {
  clearInterval(fetchMatchListTimer)
  fetchMatchListTimer = null
}
function updateMatchList() {
  // 更新数据前，保存上一个赛事列表用于对比赔率状态
  setPreviousMatchList()
  // 获取比赛列表
  fetchMatchList()
  // 获取比赛统计
  fbStore.getStatistical()
  // 刷新余额
  userStore.getBalanceAction()
}
// 保存上一个赛事列表
function setPreviousMatchList() {
  fbStore.previousMatchList = [...fbStore.matchList]

  // 先清掉定时器
  if (prevMatchListInterval) {
    clearTimeout(prevMatchListInterval)
    prevMatchListInterval = null
  }
  // 启动定时器
  prevMatchListInterval = setTimeout(() => {
    fbStore.previousMatchList = []
    clearTimeout(prevMatchListInterval)
    prevMatchListInterval = null
  }, 2500)
}
eventBus.on('updateDate',(val)=>{
  // console.log(val.value,val.value.startTime)
  timeRange.value.startTime = val.value.startTime
  timeRange.value.endTime = val.value.endTime

})
// 获取比赛列表
function fetchMatchList() {
  // console.log(fbStore.queryMatchListParams.type,'fbStore.queryMatchListParams.type')
  fbStore.isClickRightTitle = false
  if (!fbStore.queryMatchListParams.leagueIds && !fbStore.isMyFollow) {
    //获取全部赛事
    if (fbStore.queryMatchListParams.sportId == 0 && fbStore.queryMatchListParams.type == 1) {
      const alldata = {
        current: fbStore.current,
        isPC: true,
        orderBy: fbStore.queryMatchListParams.orderBy,
        sportIds: [],
        type: 1,
        size: fbStore.pageSize
      }
      return fbStore.getMatchList(alldata)
    }
  }

  // 赛事筛选
  if (fbStore.queryMatchListParams.leagueIds && !fbStore.isMyFollow) {
    if (fbStore.queryMatchListParams.type == 1) {
      let data = []
      if (fbStore.queryMatchListParams.sportId == 0) {
        data = {
          current: 1,
          isPC: true,
          leagueIds: fbStore.queryMatchListParams.leagueIds,
          orderBy: fbStore.queryMatchListParams.orderBy,
          type: 1
        }
      } else {
        data = {
          current: fbStore.current,
          isPC: true,
          leagueIds: fbStore.queryMatchListParams.leagueIds,
          orderBy: fbStore.queryMatchListParams.orderBy,
          sportId: fbStore.queryMatchListParams.sportId,
          type: 1
        }
      }
      return fbStore.getMatchList(data)
    }
  }
  // //获取冠军赛事
  if(fbStore.queryMatchListParams.type == 7 ){
    const alldata = {
      current: fbStore.current,
      isPC: true,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportId:fbStore.queryMatchListParams.sportId,
      type:7
    }
    return fbStore.getMatchList(alldata)
  }
  // // 体育菜单
  if(fbStore.queryMatchListParams.type == 3 || fbStore.queryMatchListParams.type == 4){
    const alldata = {
      current: fbStore.current,
      isPC: true,
      beginTime:timeRange.value.startTime,
      endTime:timeRange.value.endTime,
      size:fbStore.pageSize,
      leagueIds:fbStore.queryMatchListParams.leagueIds,
      orderBy: fbStore.queryMatchListParams.orderBy,
      sportId:fbStore.queryMatchListParams.sportId,
      type:fbStore.queryMatchListParams.type
    }
    return fbStore.getMatchList(alldata)
  }
  // // 热门赛事
  if(fbStore.queryMatchListParams.leagueId  && fbStore.queryMatchListParams.type == 5){
    let  data = {
      current: fbStore.current,
        isPC: true,
        leagueId:fbStore.queryMatchListParams.leagueId,
        orderBy: fbStore.queryMatchListParams.orderBy,
        type:5
    }
    return fbStore.getMatchList(data)
  }
  //获取我的关注赛事列表
  const followReqData = {
    current: 1,
    size: 50, // 每页大小, 默认50，一页最多50
    isPC: true,
    // matchIds: fbStore.followList[fbStore.queryMatchListParams.sportId],
    matchIds: fbStore.matchIds || fbStore.followList[fbStore.queryMatchListParams.sportId],
    orderBy: fbStore.queryMatchListParams.orderBy
  }

  let reqData = fbStore.queryMatchListParams.type ? fbStore.queryMatchListParams : followReqData
  return fbStore.getMatchList(reqData)
}
//监听滚球数量及时更新我的关注赛事数量
watch(
  ()=>fbStore.totalLive,
  ()=>{
    if(fbStore.queryMatchListParams.type == 1){
      const arr1 = JSON.parse(localStorage.getItem('__FOLLOW_LIST__'))//缓存里面的数据
      const newArray1 = Object.values(fbStore.followList).flatMap(value => value);//store里面存的收藏
      const newArray2 = ref()
      if(arr1){
        newArray2.value = Object.values(arr1).flatMap(value => value);//缓存里面取到的收藏
      }
      
      if(fbStore.totalLive !== fbStore.previoustotalLive && fbStore.queryMatchListParams.type == 1){
        // if(newArray1?.length>0){
          fbStore.matchIds = newArray1
          if(fbStore.matchIds?.length>0){
            const followReqData = {
              current: 1,
              size: 50, // 每页大小, 默认50，一页最多50
              isPC: true,
              // matchIds: fbStore.followList[fbStore.queryMatchListParams.sportId],
              matchIds: fbStore.matchIds,
              orderBy: fbStore.queryMatchListParams.orderBy
            }
            getMatchList(followReqData).then((res)=>{
              fbStore.MyFollowList = res.records
              if(res.records.length == 0){
                fbStore.followListNum = 0
                localStorage.removeItem('__FOLLOW_LIST__')// 清空名为 __FOLLOW_LIST__ 的 localStorage 缓存
              }
              if(res.records.length == newArray1?.length && newArray1?.length == newArray2.value.length){
                fbStore.followListNum = res.records.length
              }
              if(newArray1?.length !== newArray2.value.length  && res.records.length !== newArray1?.length){
                // 从  中提取唯一的 ID
                let idsFromList = new Set(res.records.map(item => item.id));
                // 循环  删除不存在的数据
                for (let key in fbStore.followList) {
                  fbStore.followList[key] = fbStore.followList[key].filter(id => idsFromList.has(id));
                }
                // 使用 Object.keys 遍历  的键
                Object.keys(fbStore.followList).forEach(key => {
                  // 如果值是空数组，则删除该键值对
                  if (fbStore.followList[key].length === 0) {
                    delete fbStore.followList[key];
                  }
                });
                localStorage.setItem('__FOLLOW_LIST__',JSON.stringify(fbStore.followList))
              }
              if(newArray1?.length == newArray2.value.length  && res.records.length !== newArray1?.length){
                let idsFromList = new Set(res.records.map(item => item.id));
                for (let key in fbStore.followList) {
                  fbStore.followList[key] = fbStore.followList[key].filter(id => idsFromList.has(id));
                }
                // 使用 Object.keys 遍历  的键
                Object.keys(fbStore.followList).forEach(key => {
                  // 如果值是空数组，则删除该键值对
                  if (fbStore.followList[key].length === 0) {
                    delete fbStore.followList[key];
                  }
                });
                localStorage.setItem('__FOLLOW_LIST__',JSON.stringify(fbStore.followList))
              }
            })
          }
      }
    }
  },{deep:true, immediate: true}
)
// 监听sportid
watch(
  () => fbStore.queryMatchListParams.sportId,
  () => {
    // 切换分类是需要重置操作状态，自动展开折叠面板
    // fbStore.isOperatedMatchListCollapse = false
    // 2.重置时间
    fbStore.queryMatchListParams.beginTime = null
    fbStore.queryMatchListParams.endTime = null
    // 4.重置排序
    fbStore.queryMatchListParams.orderBy = 0

    // 6.清空之前的赛事筛选表
    fbStore.previousEventChooseList = []
    if (!fbStore.isMatchResult || !fbStore.rightSideDropBox) {
      // 5.重置联赛leagueIds
      fbStore.queryMatchListParams.leagueIds = null
      fbStore.queryMatchListParams.leagueId = null
      fetchMatchList()
    }
  }
)
watch(
  () => fbStore.current,
  () => {
    fetchMatchList()
  }
)
watch(
  () => fbStore.pageSize,
  () => {
    fetchMatchList()
  }
)
onBeforeUnmount(() => {
  StopInterval()
  betCartStore.betList = []
  betCartStore.anchorBetOdss = []
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .SportsView-content-middle{
    
    min-width: 660px !important;
  }
}

.SportsView {
  // height: calc(100vh - 80px);
  // height: 100vh;
  // padding-top: 10px;
  .SportsView-wrap {
    height: 100%;
    .SportsView-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 52px;
      width: 100%;
      color: var(--80, rgba(255, 255, 255, 0.8));
      
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      background: #171a2f;
      .top-left,
      .top-right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;

        > div {
          margin-left: 13px;
          cursor: pointer;
        }
      }
      .top-left {
        div:hover {
          color: #f35f1b;
        }
      }
      .top-right {
        margin-right: 10px;
        .item {
          display: flex;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 40px;
          padding: 7px 13px;
          margin-left: 20px;
          span {
            margin-right: 5px;
          }
          .flag {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .handicaps,
        .language,
        .setting {
          position: relative;
        }
        .hidebox {
          position: absolute;
          top: 37px;
          left: 0;
          z-index: 99;
          width: 100%;
          ul {
            list-style: none;
            padding: 0;
            border-radius: 4px;
            background: #232949;
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.18);
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 5px 5px;
            li {
              display: flex;
              height: 30px;
              width: 100%;
              align-items: center;
              justify-content: center;
              background: #171a2f;
              font-size: 14px;
              color: var(--60, rgba(255, 255, 255, 0.6));
              margin-bottom: 5px;
              &:hover {
                background: var(--unnamed, #323c6f);
              }
            }
          }
        }
        .settingbox {
          display: flex;
          width: 320px;
          height: 294px;
          border-radius: 4px;
          background: #2b3259;
          box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
          left: unset;
          right: 0;
        }
      }
    }
    .SportsView-content {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      height: calc(100vh - 137px);
      width: 100%;
      justify-content: space-between;
      min-height: 65vh;
      color: var(--60, rgba(255, 255, 255, 0.6));
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 12px;
      .SportsView-content-left {
        width: 240px;
        min-width: 240px;
        // height: calc(100vh - 76px);
        // background-color: #222744;
        background-color: #151525;
        height: 100%;
        overflow: scroll;
        scrollbar-width: none; //火狐浏览器 隐藏滚动条
      }
      .SportsView-content-layout {
        flex: 1;
        display: flex;
      }
      .SportsView-content-middle {
        // position: relative;
        flex: 1;
        // background: #171A2F;
        margin-left: 5px;
        min-width: 933px;
      }
      .SportsView-content-right {
        // height: 100%;
        flex: 1;
        min-width: 330px;
        // background: #171A2F;
        height: calc(100vh - 137px);
        overflow: scroll;
      }
    }
    .maintain-view{
      height: calc(100vh - 80px);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .left{

        img{
          width: 700px;
        }
      }
      .right{
        color: white;
        text-align: center;
        h2{
          margin-bottom: 10px;
        }
        .time{
          color: red;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-main {
  --el-main-padding: 20px 20px 0 20px;
}
</style>
