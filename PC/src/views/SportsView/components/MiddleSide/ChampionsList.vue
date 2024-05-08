<template>
  <div class="ChampionsList">
    <div class="ChampionsList-wrap">
      <div v-if="fbStore.matchList && fbStore.reqestStatus" class="champions-list-wrapper">
        <div class="list">
          <el-collapse v-model="fbStore.matchListIds" >
            <template v-for="(item,index) of fbStore.matchList" :key="index">
              <el-collapse-item class="firstitem" :title="item.nm" :name="item.id" >
                <template v-if="item.mg[0]?.mks">
                  <div class="seconditem" 
                  v-for="(sitem,sindex) of item.mg[0]?.mks" 
                  :key="sindex" 
                  :class="{
                    active: betCartStore.betList.find((bet) => bet.id === sitem.id)
                  }" >
                    <div class="threeitem" v-for="(titem,tindex) of sitem.op" 
                  :key="tindex" @click="SelectChampions(sitem, item.mg[0], $event,item.id,item.nm,item.bt,item.lg,item.mg,)">
                      <template v-if="isSolding(sitem.ss, sitem.op[0]?.od)">
                        <div class="team">{{ titem.nm }} </div>
                        <div class="odds" :class="getChangeState(sitem.op[0]?.od, sindex, index)">
                          {{getOddFormat(sitem.op[0]?.od, fbStore.settings.oddsFormat)}}
                          <IconKLineUp v-if="item.changeStateClass === 'up'" />
                          <IconKLineArrow v-if="item.changeStateClass === 'down'" />
                        </div>
                      </template>
                      <template v-else-if="sitem.ss === 0"><img :src="lock" alt=""></template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </template>
              </el-collapse-item>
            </template>
          </el-collapse>
        </div>
      </div>
      <div class="nodata" v-else><img :src="noData" alt=""></div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { isSolding,getOddFormat } from '@/hooks/useSportDict'
import { getMatchDetail } from '@/api/fb'
import lock from './img/lock.png'
import noData from './img/nodata.png'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

let match = reactive({})
const prevMg = ref([])
const timer = ref(null)
let prevMatchInterval = null
const matchid = ref(0)

onBeforeUnmount(() => {
  stopInterval()
})
init()
async function init() {
  // 没有token则先获取token
  if (!fbStore.FBConfig.FBToken) {
    try {
      await fbStore.getFBToken()
    } catch (e) {
      console.log('系统繁忙，稍后重试')
    }
  }
  await handleQuery()
  startInterval()
}

async function handleQuery() {
    await getMatchDetail({
      matchId: matchid.value || 0
    })
    // const { nm, mg, bt, lg } = res
    // console.log(match,'match')
    // match.nm = nm
    // match.mg = mg
    // match.bt = bt
    // match.lg = lg
}
function setPrevMg() {
  if(match.mg){
    prevMg.value = [...match.mg]
  }
  
  // 先清掉定时器
  if (prevMatchInterval) {
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }
  // 启动定时器
  prevMatchInterval = setTimeout(() => {
    prevMg.value = []
    clearTimeout(prevMatchInterval)
    prevMatchInterval = null
  }, 2500)
}
function updateMatchDetail() {
  // 先保存上一个赛事详情数据
  setPrevMg()
  // 获取赛事详情数据
  handleQuery()
}
function getChangeState(newOd, idx, index) {
  let oldOd
  const market = prevMg.value[index]
  if (market && market.mks && market.mks.length) {
    oldOd = market.mks[idx]?.op[0]?.od
  }
  if (newOd > oldOd) return 'up'
  if (newOd < oldOd) return 'down'
}

const SelectChampions = (option, market, e,id,nm,bt,lg,mg) => {
  betCartStore.ifShowLayer = false
  matchid.value = id
  // console.log(option, market, e,'match',match,id,nm,bt,lg,mg)
  match.nm = nm
  match.mg = mg
  match.bt = bt
  match.lg = lg
  if (!userStore.isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  const team = option.op[0]
  // 未开售状态无法加入购物车
  if (!isSolding(option.ss, team.od)) return
  const matchId = id
  const betObj = {
    id: option.id,
    ss: option.ss,
    au: option.au,
    matchId,
    betMatchMarket: {
      matchId,
      marketId: option.id, // 玩法id
      odds: team.od, // 赔率
      optionType: team.ty // 投注类型
    },
    // 展示类型数据
    visible: {
      // teamName: team.na, // 球队名称
      betOpTitle: team.nm, // 投注项名称 -0/0.5
      // title: match.nm, // 比赛标题 teamA vs teamB
      marketTitle: market.nm, //  盘口玩法简称
      lgName: match.lg.na, // 联赛名称
      begainTime: match.bt // 开始时间
    }
  }
  // console.log(betObj)
  betCartStore.isOpenBetCart = true
  let result = betCartStore.betList.find((bet) => bet.id === betObj.id)
  if (result) {
    betCartStore.removeBet(betObj)
  } else {
    betCartStore.addBet(betObj, { x: e.pageX, y: e.pageY })
  }
}
function startInterval() {
  timer.value = setInterval(() => {
    updateMatchDetail()
  }, 8000)
}
function stopInterval() {
  timer.value && clearInterval(timer.value)
  timer.value = null
}
watchEffect(() => {
  // 如果用户操作了折叠面板，则不要随数据更新自动开启
  if (!fbStore.isOperatedMatchListCollapse && fbStore.matchList) {
    fbStore.matchListIds = fbStore.matchList.map((item) => item.id)
  }
})

</script>

<style lang="scss" scoped>
.ChampionsList{
  height: calc(100vh - 242px);
  overflow-y: scroll;
  scrollbar-width: none;//火狐浏览器 隐藏滚动条
  .ChampionsList-wrap{
    .list{
      // height: 100vh;
      overflow: scroll;
      scrollbar-width: none;//火狐浏览器 隐藏滚动条
      .seconditem{
        width: calc(50% - 2px);
        background: #1D223C;
        height: 32px;
        margin-bottom: 3px;
        cursor: pointer;
        border-radius: 2px;
      }
      .threeitem{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 0 20%;
      }
      .active{
        color: #fff;
        background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
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
      }
      .el-collapse-item__header{
        border-radius: 2px;
        background: #171A2F;
        border: none;
        color: var(--60, rgba(255, 255, 255, 0.60));
        height: 36px;
        margin-bottom: 5px;
        text-indent: 20px;
      }
      .el-collapse-item__wrap{
        background: transparent;
        border: none;
        margin-bottom: 10px;
      }
      .el-collapse-item__content{
          color: var(--60, rgba(255, 255, 255, 0.60));
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          background: #171A2F;
          padding: 5px 5px;
      }
      .secondMenu{
        .el-collapse-item__arrow.is-active,.el-collapse-item__arrow{
          display: none;
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
}
</style>