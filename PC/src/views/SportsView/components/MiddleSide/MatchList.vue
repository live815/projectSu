<template>
  <div ref="matchListRef" class="MatchList"  :class="{
    'HotList': fbStore.queryMatchListParams.type === 5,
    'Today': fbStore.queryMatchListParams.type === 3,
    'Morning': fbStore.queryMatchListParams.type === 4,
    'over':fbStore.totalNum>props.pageSize && fbStore.queryMatchListParams.type == 1,
    'overs':fbStore.totalNum>props.pageSize && fbStore.queryMatchListParams.type === 4,
    'overes':fbStore.totalNum>props.pageSize && fbStore.queryMatchListParams.type === 3
  }">
    <div class="MatchList-wrap" v-if="fbStore.matchList?.length>0" >
      <el-skeleton :loading="fbStore.skeletonLoading" animated>
        <template #template>
          <Skeleton  />
        </template>

        <div class="MatchList-content" v-for="(item,index) in fbStore.objLists" :key="index">
          <!-- <el-collapse  ref="outerCollapse" v-model="fbStore.listIds" class="Menu" @change="handleChangeFirst(index,item.sid)">
            <el-collapse-item :name="Number(item.sid)" > -->
              <!-- 滚球类型 -->
              <div class="MatchList-top" v-if="ballTypeDisplay">
                  <img :src="sportIconActive[item.sid]" alt="" class="ballicon">
                  <span class="ballType">{{ getBallTypeTextById(item.sid) }}</span>
              </div>
              <!-- <template #title>
                  <img :src="sportIconActive[item.sid]" alt="" class="ballicon">
                  <span class="ballType">{{ getBallTypeTextById(item.sid) }}</span>
              </template> -->
              <div v-for="(seitem,seindex) in item.matchList" :key="seindex" class="mcontent">
                <el-collapse ref="innerCollapse" v-model="fbStore.matchListIds"  class="secMenu" @change="handleChangesecond(seitem,seitem.id)" @click="fbStore.isOperatedMatchListCollapse = true">
                    <el-collapse-item :name="seitem.id">
                      <!-- 赛事名称 -->
                      <template #title>
                        <div class="MatchList-title" @click="hide">
                          <!-- 赛事ICON -->
                          <div class="MatchList-name">
                            <img :src="seitem.lg?.lurl || defaultTeamIcon" alt="" class="MatchList-icon"> 
                            <span class="na" :title="seitem.lg?.na">{{ seitem.lg?.na }}</span>
                          </div>
                          <div class="MatchList-event" v-if="fbStore.matchListIds.includes(seitem.lg.id)">
                            <!-- 盘口名称 -->
                            <Handicap :title="seitem.list[0]"  />
                          </div>
                        </div>
                      </template>
                      <!-- 赛事盘口信息 -->
                      <div class="list-content" v-for="(it,ins) of  seitem.list" :key="ins" :class="isActiveEvent(it)?'active':''">
                        <div class="match-main-up">
                          <div class="timebox" >
                            <!-- 赛事收藏 -->
                            <img :src="isFollowed(it)?collected:uncollected" alt="" @click="clickCollect(it)">
                            <p v-if="it.mc" class="eventtitle">{{ getMatchStatus(it, fbStore) }}</p>
                            <!-- 赛事计时 -->
                            <Counter
                              v-if="it.mc.hasOwnProperty('s') && it.mc.s >= 0"
                              :tp="it.mc.tp"
                              :s="it.mc.s"
                              :r="it.mc.r"
                            />
                          </div>
                          <div class="match-main">
                            <div  class="main-up">
                              <div class="match-team" @click="toSingleEvent(it,'eventdetail')">
                                <!-- 半场比分和全场比分图标 -->
                                <div class="match-team-top">
                                  <div class="lefticon" :class="ifshowhalfscoreclass(item)">
                                    <div><img :src="firsthalf" :alt="$t('SportsView.HalfTime')" :title="$t('SportsView.Firsthalf')" v-if="ifshowhalfscore(item)"></div>
                                    <div><img style="opacity: .4;" :src="scores" :alt="$t('SportsView.Score')" :title="$t('SportsView.Score')"></div>
                                  </div>
                                </div>
                                
                                <!-- 队伍名称 -->
                                <div class="teambox" >
                                    <div class="teams" v-for="(team,idx) of it.ts" :key="team.id" >
                                      <div class="teamicon">
                                        <img :src="team.lurl || defaultTeamIcon" alt="" class="smallicon">
                                        <span class="teamsname" :title="team.na">{{ team.na }}</span>
                                      </div>
                                      <div class="teamscores">
                                        <!-- 足球半场比分 -->
                                        <div class="score Soccer"  v-if="item.sid === SPORT_IDS.Soccer || item.sid === SPORT_IDS.EFootball">
                                          <span>{{ getTeamHalfTime(it, idx) || 0 }}</span>
                                        </div>
                                        <!-- 篮球半场得分 -->
                                        <div class="score Basketball" v-if="item.sid == SPORT_IDS.Basketball" >
                                          <span>{{ getTeamHalfTimeBasketball(it, idx) || 0 }}</span>
                                        </div>
                                        <!-- <HalfScore v-else :item="it" :idx="idx"/> -->
                                        <!-- 乒乓球全场比分 -->
                                        <div class="score"  v-if="showpingpong(it)">
                                          <span>{{ getScorepingpong(it.nsg, idx) || 0 }}</span>
                                        </div>
                                        <!--全场比分所有球类  -->
                                        <div class="score" v-else>
                                          <span>{{ getTeamDetailByTyg(it, idx, 5) || 0 }}</span>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                <!-- 足球底部信息 -->
                                <div class="teamtools" v-if="showteamtools(item)">
                                  <div class="left">
                                    <!-- 角球 -->
                                    <img :src="flag" :alt="$t('SportsView.CornerKick')" :title="$t('SportsView.CornerKick')">
                                    <span>{{ getcornerkick(it, 0, 6) || 0 }}-{{ getTeamDetailByTyg(it, 1, 6) || 0 }}</span>
                                    <!-- 半场 -->
                                    <!-- <img :src="firsthalf" :alt="$t('SportsView.HalfTime')" :title="$t('SportsView.HalfTime')">
                                    <span>{{ getTeamHalfTime(it, 0) || 0 }}-{{ getTeamHalfTime(it, 1) || 0 }}</span> -->
                                    <!-- 红牌 -->
                                    <img :src="redcard" :alt="$t('SportsView.RedCard')" :title="$t('SportsView.RedCard')">
                                    <span>{{ Number(getTeamDetailByTyg(it, 0, 8))  || 0  }}-{{ Number(getTeamDetailByTyg(it, 1, 8))  || 0  }}</span>
                                    <!-- 黄牌 -->
                                    <img :src="yellowcard" :alt="$t('SportsView.YellowCard')" :title="$t('SportsView.YellowCard')">
                                    <span>{{ Number(getTeamDetailByTyg(it, 0, 7))  || 0  }}-{{ Number(getTeamDetailByTyg(it, 1, 7))  || 0  }}</span>
                                  </div>
                                  <!-- 足球底部信息 -->
                                  <div class="right">
                                    <div >
                                      <img :src="video" alt="" title="video" v-if="it.liveUrl">
                                      <img v-if="it.as" :src="cartoon" alt="" title="cartoon" @click="clickCartoon(it)">
                                    </div>
                                    <span>{{ it.tms }}</span>
                                    <el-icon><CaretRight /></el-icon>
                                  </div>
                                </div>
                                <!-- 板球底部信息 -->
                                <div class="teamtools" v-if="showteamtools1(item)">
                                  <div class="left"></div>
                                  <div class="right">
                                    <div >
                                      <img :src="video" alt="" title="video" v-if="it.liveUrl">
                                      <img v-if="it.as" :src="cartoon" alt="" title="cartoon" @click="clickCartoon(it)">
                                    </div>
                                    <span>{{ it.tms }}</span>
                                    <el-icon><CaretRight /></el-icon>
                                  </div>
                                </div>
                              </div>
                              <div class="match-market-group-main">
                                <!-- 市场主流玩法 -->
                                <Markets ref="marketsRefs" :match="it" />
                              </div>
                            </div>
                            <div class="match-main-down" >
                              <MatchBottomInfo  :event="it" />
                            </div>
                          </div>
                          <div class="match-markets" @click="changeRightSide(it)">
                            <img :src="isActiveEvent(it)?leftactive:left" alt="">
                          </div>
                        </div>
                        <!-- <div class="match-main-down" >
                          <MatchBottomInfo  :event="it" />
                        </div> -->
                        <!-- <div class="match-main-down"  v-if="it.nsg && it.nsg.length">
                          <MatchBottomInfo v-if="it.nsg && it.nsg.length" :match="it" />
                        </div> -->
                        <!-- <div v-if="it.tms > 2" class="more"  @click="toSingleEvent(it,'eventdetail')">+{{ it.tms }} 更多盘口</div> -->
                      </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            <!-- </el-collapse-item>  
          </el-collapse> -->
        </div>
      </el-skeleton>
    </div>
    <div class="nodata" v-else>
      <img :src="noData" alt="">
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import {computed, ref, watch} from 'vue'
import defaultTeamIcon from './img/default-team-logo.png'
import MatchBottomInfo from './MatchBottomInfo.vue'
import { SPORT_IDS, getMatchStatus, getBallTypeTextById } from '@/hooks/useSportDict'
import {getTeamDetailByTyg,getcornerkick,getTeamHalfTime,getScorepingpong,getTeamHalfTimeBasketball } from '@/hooks/sportsView'
import Skeleton from './Skeleton.vue'
import { sportIconActive } from '@/utils/config'
import Counter from './Counter.vue'
import left from './img/left.png'
import leftactive from './img/left-active.png'
import noData from './img/nodata.png'
import Markets from './Markets.vue'
import Handicap from './Handicap.vue'
import eventBus from '@/utils/eventBus'
import video from './img/video.png'
import cartoon from './img/cartoon.png'
import flag from './img/flag.png'
import firsthalf from './img/first-half.png'
import redcard from './img/redcard.png'
import yellowcard from './img/yellowcard.png'
import scores from './img/scores.png'
import {CaretRight} from '@element-plus/icons-vue'
import {getMatchDetail} from '@/api/fb'
import { useRoute } from 'vue-router'
const route = useRoute()
import { useRouter } from 'vue-router'
const router = useRouter()
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()

const props = defineProps({
  pageSize: {
    type: Number,
    default: 0
  }
})
const collected = new URL('./img/collect.svg',import.meta.url).href
const uncollected = new URL('./img/nocollect.svg',import.meta.url).href
const marketsRefs = ref(null)
const collapse = ref(null)
const objList = ref({})
const showpingpong = (item) => item.sid == SPORT_IDS.TableTennis 
const showteamtools = (item) => item.sid == SPORT_IDS.Soccer  || item.sid == SPORT_IDS.EFootball
const showteamtools1 = (item) => item.sid == SPORT_IDS.Cricket 
const ifshowhalfscore = (item) => item.sid === SPORT_IDS.Soccer || item.sid === SPORT_IDS.EFootball || item.sid == SPORT_IDS.Basketball
const ifshowhalfscoreclass = (item) => ({'lefts':item.sid === SPORT_IDS.Soccer || item.sid === SPORT_IDS.EFootball || item.sid == SPORT_IDS.Basketball})
const ballTypeDisplay = computed(()=>{
  return (fbStore.queryMatchListParams.type !== 4 && fbStore.queryMatchListParams.type !== 3)
})
// const showEfootball = (item) => item.sid == SPORT_IDS.EFootball
const temporary = ref(false)


// function handleChangeFirst(index,sid){
  // fbStore.isOperatedListCollapse = false
  // console.log(fbStore.listIds,fbStore.listIds.length,'折叠1',index,sid)
 
  // if(fbStore.listIds?.length>0){
  //   // fbStore.isOperatedListCollapse = false
  //   fbStore.listIds = []
  // }else{
  //   fbStore.listIds = objList.value.map((item) => {
  //     if(item.sid == sid){
  //       console.log(item.matchList,'item',item.matchList.map(item => item.id))
  //       return item.matchList.map(item => item.id)
  //     }
  //   })
  // }
// }

  
// 收藏
function isFollowed(item) {
  let len = Object.values(fbStore.followList).flat().length
  if(fbStore.matchList?.length>0){
    fbStore.followListNum = len
  }else{
    fbStore.followListNum = 0
  }
  return fbStore.followList[item.sid] && fbStore.followList[item.sid].includes(item.id)
}
//直播间跳转和活动跳转
onMounted(() =>{
  // fbStore.isOperatedListCollapse = true
  // console.log(route.query.gameId,'route.params',route.query.sid,route.query.page,route.query)
  fbStore.isOperatedMatchListCollapse = false
  if(route.query.gameId && route.query.sid && route.query.page && fbStore.Median == 1){//直播间跳转和活动跳转
    // console.log(route.query.gameId,'route.params',route.query.sid,fbStore.curPage)
    getMatchDetail({
      matchId: route.query.gameId
    }).then((res) => {
      // console.log(res, 'res', res.id)
      const gameId = route.query.gameId
      // const sid = route.query.sid
      fbStore.rightSideDropBox = false
      fbStore.isOperatedMarketsListCollapse = false
      fbStore.curPage = 'eventdetail'
      fbStore.curEventId = gameId
      fbStore.defaultActiveEvent = gameId
      fbStore.curEvent = res
      fbStore.rightList = res
      fbStore.matchDetailList = res
    })

  }
})
// const clickhandleChangesecond = ref(1)
// 点击赛事名称栏折叠当前赛事
function handleChangesecond(item,id){
  // console.log(item,id)
}
// 监听赛事，判断是否需要折叠
watch(
  ()=>fbStore.matchList,
  () => {

  // 监听折叠全部赛事
  if(!fbStore.isOperatedListCollapse && !fbStore.isOperatedMatchListCollapse){
    // console.log(111111,fbStore.isOperatedMatchListCollapse,'fbStore.isOperatedMatchListCollapse')
    fbStore.listIds = []
    Object.values(objList.value).forEach((item) => {
      fbStore.listIds.push(item.sid)
    });
    fbStore.matchListIds = fbStore.matchList.map((item) => item.id)
    // console.log(fbStore.matchListIds,'fbStore.matchListIds')
    if(fbStore.queryMatchListParams.type == 7){
      // console.log()
    }
  }
},{deep:true, immediate: true})

function openAll() {
  fbStore.matchListIds = fbStore.matchList.map((item) => item.id)
  // console.log('open',objList.value,fbStore.matchListIds)
}
function closeAll() {
  collapse.value?.toggleAll(false)
  // console.log('close',)
  fbStore.matchListIds = []
  // console.log(fbStore.matchListIds,'fbStore.matchListIds')
}
eventBus.on('MatchListOpenAll', openAll)
eventBus.on('MatchListCloseAll', closeAll)


onUnmounted(() => {
  eventBus.off('MatchListOpenAll')
  eventBus.off('MatchListCloseAll')
  eventBus.off('temporary')
})
//点击盘口旁边的箭头
async function changeRightSide(val){
  temporary.value = true
  fbStore.rightSideDropBox = false
  eventBus.emit('curEventId',val.id)
  fbStore.curEventId = val.id
  fbStore.defaultActiveEvent = val.id
  fbStore.isOperatedMarketsListCollapse = false
  fbStore.rightList = val
  if(val.as){
    fbStore.isCartoon = true
  }else{
    fbStore.isCartoon = false
  }
  await fbStore.getMatchDetail({
    	matchId: val.id
  })
}
// 赛事选中状态
function isActiveEvent(val){
  return fbStore.defaultActiveEvent == val.id
}
//点击队伍名称
async function toSingleEvent(val1,val2){
  // router.push('/sports/sportsdetail')
  router.push(`/sports/sportsdetail?gameId=${val1.id}&sid=${val1.sid}&page=${val2}`)
  // console.log(val1,'val1')
  fbStore.rightSideDropBox = false
  fbStore.isOperatedMarketsListCollapse = false
  fbStore.curEvent = val1
  fbStore.curPage = val2
  fbStore.curEventId = val1.id
  fbStore.rightList = val1
  fbStore.defaultActiveEvent = val1.id
  
  await fbStore.getMatchDetail({
    	matchId: val1.id
  })
}
eventBus.on('temporary',(val)=>{
  temporary.value = val
})
watch(
  ()=>fbStore.matchList,
  ()=>{
    // console.log(fbStore.matchList,'fbStore.matchList[0]',fbStore.matchList[0]?.list)
    if(fbStore.matchList && fbStore.matchList[0]?.list){
      // 组装数组
      objList.value= fbStore.matchList.reduce((acc, cur) => {
        // console.log(acc,cur)
        // 检查是否已存在包含相同 sid 的对象
        let existingObj = acc.find(item => item.sid === cur.sid);

        // 如果不存在，创建一个新的对象
        if (!existingObj) {
          existingObj = { sid: cur.sid, matchList: [] };
          acc.push(existingObj);
        }

        // 将当前对象添加到 matchList 中
        existingObj.matchList.push(cur);

        return acc;
      }, []);
      fbStore.objLists = objList.value

      let arr = []
      fbStore.matchList.forEach(item=>{
        item.list.forEach(seitem=>{
          arr.push(seitem.id)
        })
        
      })
      // 判断选中的赛事是否存在
      const ifHas = arr.includes(fbStore.defaultActiveEvent)
      // console.log(fbStore.defaultActiveEvent,'fbStore.defaultActiveEvent',ifHas,88,fbStore.isClickBallType,22,fbStore.curPage,111,temporary.value)
      // 第一次进来默认选中第一个
      if(fbStore.defaultActiveEvent == 0 && fbStore.matchList.length>0){
        fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
      }
      // 默认在接口返回的数据中不存在
      if(!ifHas){
        fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
        // console.log(fbStore.matchList[0]?.list[0]?.id,22222)
        fbStore.rightList = fbStore.matchList[0]?.list[0]
        fbStore.getMatchDetail({
          matchId: fbStore.matchList[0]?.list[0]?.id
        })
      }
      //切换投注区顶部球类型
      if(fbStore.queryMatchListParams.sportId !== 0 && !ifHas && fbStore.matchList.length>0 && fbStore.isClickBallType){
        // fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0].id
        fbStore.rightList = fbStore.matchList[0]?.list[0]
        fbStore.getMatchDetail({
            matchId: fbStore.matchList[0]?.list[0].id
        })
        // console.log(fbStore.rightList,'fbStore.rightList',fbStore.matchDetailList)
        if(fbStore.rightList?.as){
          fbStore.isCartoon = true
        }else{
          fbStore.isCartoon = false
        }
      }
      //右侧赛事默认第一个
      if(fbStore.rightList  && fbStore.matchList.length>0 && !fbStore.defaultActiveEvent){
        if(fbStore.rightList.length == 0){
          fbStore.rightList = fbStore.matchList[0]?.list[0]
          
          if(fbStore.rightList?.as){
            fbStore.isCartoon = true
          }else{
            fbStore.isCartoon = false
          }
        }
      }
      // 点击全部赛事右侧默认显示第一个赛事
      // if(fbStore.isClickAll){
      //   fbStore.rightList = fbStore.matchList[0]?.list[0]
      //   fbStore.matchDetailList = fbStore.matchList[0]?.list[0]
      //   // fbStore.rightDropDownList =  fbStore.matchList[0]?.list[0]
      //   fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
      //   if(fbStore.rightList?.as && !fbStore.isData){
      //     fbStore.isCartoon = true
      //   }else{
      //     fbStore.isCartoon = false
      //   }
      // }
      
      // 点击全部类型的时候
      if(!fbStore.queryMatchListParams.sportId && !temporary.value && fbStore.matchList?.length>0 && !fbStore.defaultActiveEvent){
        fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
        fbStore.curEventId = fbStore.matchList[0]?.list[0].id
      }
      //  左侧导航点击热门赛事
      if(fbStore.ballTypeName == i18n.global.t('SportsView.PopularEvents') && fbStore.matchList.length>0 && !fbStore.defaultActiveEvent){
        fbStore.rightList = fbStore.matchList[0]?.list[0]
        fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
      }
      // 右侧默认盘口
      if(!fbStore.matchDetailList?.id && fbStore.matchList.length>0 && !ifHas){
        fbStore.defaultActiveEvent = fbStore.matchList[0]?.list[0]?.id
        fbStore.matchDetailList = fbStore.matchList[0]?.list[0]
        fbStore.curEventId = fbStore.matchList[0]?.list[0].id
      }
      
      if(fbStore.matchIds?.length>0 && fbStore.isMyFollow && fbStore.isClickmyfollow){
        HandleCollect()
      }
      // console.log(fbStore.followList,'followList')
      }
      // console.log(fbStore.languagePackage,'languagePackage')
      // 被选中的右侧赛事结束了，就默认选中第一个赛事
      if(fbStore.rightList.ms == 0){
        fbStore.rightList = fbStore.matchList[0]?.list[0]
        fbStore.curEventId = fbStore.matchList[0]?.list[0].id
      }
      
  },{deep:true, immediate: true})
watch(
  ()=>fbStore.queryMatchListParams.sportId,
  ()=>{
    // console.log(fbStore.queryMatchListParams.sportId,'fbStore.queryMatchListParams.sportId')
  if(fbStore.queryMatchListParams.sportId && fbStore.queryMatchListParams.type != 7){
    // console.log( objList.value,' objList.value',objList.value.length)
    if(objList.value.length>0){
      let val = objList.value?.filter(item=>item.sid = fbStore.queryMatchListParams.sportId)
      objList.value = val 
    }
  }
},{deep:true, immediate: true})
// 点击动画
function clickCartoon(val){
  fbStore.curEvent = val
  fbStore.isCartoon = true
}
// 点击关注
function clickCollect(val){
  fbStore.collect(val)
  // HandleCollect()
  if(fbStore.ballTypeName == i18n.global.t('SportsView.MyFocus')){
    fbStore.getStatistical()
    const followReqData = {
      current: 1,
      size: 50, // 每页大小, 默认50，一页最多50
      isPC: true,
      matchIds: fbStore.followList[fbStore.queryMatchListParams.sportId],
      orderBy: fbStore.queryMatchListParams.orderBy
    }
    fbStore.getMatchList(followReqData)
  }
  
}
// 处理关注赛事列表数据
function HandleCollect(){
  // console.log(fbStore.followList,fbStore.MyFollowList)
// 保留在 list2 中存在的键值对
fbStore.followList = Object.fromEntries(
  Object.entries(fbStore.followList).map(([key, value]) => {
    const filteredValues = value.filter(id => fbStore.MyFollowList.some(obj => obj.id === id));
    return [key, filteredValues.length > 0 ? filteredValues : undefined];
  }).filter(([key_, value]) => value !== undefined)
);
// console.log(fbStore.followList,'fbStore.followList');
}

</script>

<style lang="scss" scoped>
@media screen and (max-width:1450px) {
  .MatchList-wrap{
    zoom: 0.9;
  }
}
.MatchList{
  margin: 5px 0;
  height: calc(100vh - 243px);
  overflow-y: scroll;
  scrollbar-width: none;//火狐浏览器 隐藏滚动条
  // background: #171A2F;
  background-color: #151525;
  position: relative;
  .MatchList-wrap{
    height: 100%;
    .titleicon{
      width: 18px;
      height: 18px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .num{
      margin-left: 10px;
    }
    .MatchList-content{
      .MatchList-top{
        text-align: left;
        display: flex;
        align-items: center;
        height: 32px;
        img{
          margin-right: 5px;
        }
      }
      .ballicon{
        width: 20px;
        height: 20px;
        margin-left: 15px;
      }
      .ballType{
        color: #fff;
        font-weight: 600;
      }
      .MatchList-icon{
        width: 20px;
        height: 20px;
      }
      .na{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .MatchList-title{
        height: 32px;
        border-radius: 2px;
        background: #232949;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        text-indent: 5px;
        width: 100%;
        .MatchList-name{
          height: 32px;
          width: 270px;
          text-align: left;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #fff;
          font-weight: 600;
        }
        .MatchList-event{
          flex: 1;
          margin-right: 30px;
        }
        .blankblock{
          height: 100%;
          width: 32px;
        }
      }
      .list-content{
        // height: 130px;
        min-height: 108px;
        background: #171A2F;
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;
        position: relative;
        .match-main-up{
          width: 100%;
          display: flex;
          flex-direction: row;
          flex: 1;
        }
        .match-main-down{
          // height: 30px;
          // width: 100%;
          display: flex;
          align-items: center;
          margin-left: 63px;
          margin-right: 17px;
          //border-left: 0.5px dotted #2E3660;
        }
        .timebox{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          // text-indent: 10px;
          width: 64px;
          border-right: 0.5px dotted #2E3660;
          cursor: pointer;
          padding-left: 3px;
          .eventtitle{
            font-size: 12px;
            display: flex;
            flex-wrap: wrap;
            padding: 0 5px;
          }
        }
        .match-main{
          flex: 1;
          display: flex;
          flex-direction: column;
          .main-up{
            display: flex;
            flex-direction: row;
          }
          .match-main-down{
            // height: 30px;
            // width: 100%;
            display: flex;
            align-items: center;
            margin-left: 0;
            margin-right: 17px;
            // border-left: 0.5px dotted #2E3660;
          }
        }
        
        .match-team{
          width: 218px;
          .match-team-top{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding: 0px 5px 0px 5px;
          }
          .lefticon{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-top: 5px;
            width: 64px;
            text-align: right;
            img{
              display: block;
              width: 14px;
              height: 14px;
              cursor: pointer;
            }
            div{
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          // .lefts{
          //   padding-left: 154px;
          // }
          .teambox{
            // padding: 10px 5px 5px 5px;
            padding: 0px 5px 5px 5px;
            cursor: pointer;
          }
          .teambox{
            .teams{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              color: var(--60, rgba(255, 255, 255, 0.60));
              
              margin-bottom: 5px;
              >div{
                display: flex;
                align-items: center;
              }
              .teamsname{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;   /* 显示省略号 */
                width: 118px;
                text-align: left;
                font-size: 14px;
              }
              .teamscores{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                text-align: center;
                width: 100%;
              }
            }
            .smallicon{
              width: 16px;
              height: 16px;
              margin-right: 5px;
              margin-left: 5px;
            }
            .score{
              display: block;
              width:32px;
              height: 100%;
              // margin-left: 5px;
              color: var(--100, #FFF);
              // margin-right: 15px;
              >span{
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
          .teamtools{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            div{
              display: flex;
              align-items: center;
            }
            span{
              display: inline-block;
              
            }
            img{
              margin: 1px 5px 0;
              width: 14px;
              height: 14px;
            }
            .el-icon{
              cursor: pointer;
            }
            .right{
              cursor: pointer;
              margin-right: 5px;
            }
          }
        }
        .match-market-group-main{
          flex: 1;
        }
        .match-markets{
          display: flex;
          align-items: center;
          margin: 0 5px;
          cursor: pointer;
        }
        .more{
          display: flex;
          justify-content: flex-start;
          padding-left: 65px;
          cursor: pointer;
          margin: 5px 0;
        }
      }
      .active{
        &::before{
          content: '';
          position: absolute;
          bottom: 50%;
          transform: translateY(50%);
          width: 4px;
          height: 92%;
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
          border-radius: 100px 0 0 100px;
          left: 0;
          animation: ad_height 0.2s linear forwards;
        }
        @keyframes ad_height {
          0%{
            height: 0;
          }
          100%{
            height: 92%;
          }
        }
      }
    }
    :deep(){
      .el-collapse-item__arrow{
        rotate: 90deg;
        display: none;
      }
      .el-collapse-item__arrow.is-active{
        transform: rotate(180deg);
      }
      .el-collapse{
        border: none;
      }
      .el-collapse-item__header{
        border-radius: 2px;
        background: #171A2F;
        border: none;
        color: var(--60, rgba(255, 255, 255, 0.60));
        height: 36px;
        margin-bottom: 5px;
        text-indent: 15px;
      }
      .el-collapse-item__wrap{
        background: transparent;
        border: none;
      }
      .el-collapse-item__content{
          color: var(--60, rgba(255, 255, 255, 0.60));
          padding-bottom: 2px;
      }
      .secMenu{
        .el-collapse-item__arrow.is-active,.el-collapse-item__arrow{
          display: none;
        }
      }
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
.HotList{
  height: calc(100vh - 180px);
}
.Today{
  height: calc(100vh - 193px);
}
.over{
  height: calc(100vh - 300px);
}
.overs{
  height: calc(100vh - 300px);
}
.overes{
  height: calc(100vh - 246px);
}
</style>