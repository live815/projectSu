<template>
  <div class="champion-match-view">
    <NavBar :title="match.nm" :isShowRight="false" class="header-border-bottom" />
    <div class="champion-bet">
      <div class="left">{{ $t('LetterC.WinnerBet') }}</div>
      <div class="right">
        <span>{{ $t('LetterC.ExpiratDate') }}:</span>
        <span class="deadline-time">{{
          new Date(match.bt).toLocaleString().replace(/\//gi, '-')
        }}</span>
        <img src="./img/arrow-up.png" alt="" class="arrow-up" @click="collapse" v-if="isCollapse" />
        <img src="./img/arrow-down.png" alt="" class="arrow-up" @click="collapse" v-else />
      </div>
    </div>
    <div class="champion-content" v-for="(item, index) in match.mg" :key="item.id">
      <div class="title">{{ item.nm }}</div>
      <div
        class="option"
        v-for="(option, idx) in item.mks"
        :key="option.id"
        :class="{ active: betCartStore.betList.find((bet) => bet.id === option.id) }"
        @click="SelectChampions(option, item, $event)"
      >
        <div class="sold" v-if="isSolding(option.ss, option.op[0]?.od)">
          <span class="team">{{ option.op[0]?.nm }}</span>
          <div class="odds" :class="getChangeState(option.op[0]?.od, idx, index)">
            <span class="num">{{
              getOddFormat(option.op[0]?.od, fbStore.settings.oddsFormat)
            }}</span>
            <IconKLineArrow v-if="getChangeState(option.op[0]?.od, idx, index)" class="arrow" />
          </div>
        </div>
        <div v-else class="ss-closed">
          <IconLocked />
        </div>
      </div>
    </div>
    <BetCart />
  </div>
</template>

<script setup>
import BetCart from '@/views/SportsView/components/BetCart/BetCart.vue'
import { useRoute } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { getMatchDetail } from '@/api/fb'
import { reactive } from 'vue'
import { isSolding, getOddFormat } from '@/hooks/useSportDict'
import { useUserStore } from '@/stores/user'
import { useBetCartStore } from '@/stores/betCart'
import { useRouter } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'

const router = useRouter()
const betCartStore = useBetCartStore()
const userStore = useUserStore()
const fbStore = useFBStore()
const route = useRoute()
let match = reactive({})
const prevMg = ref([])
const timer = ref(null)
let prevMatchInterval = null
const isCollapse = ref(true)
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
      // console.log('系统繁忙，稍后重试')
    }
  }
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  await handleQuery()
  closeToast()
  startInterval()
}
async function handleQuery() {
  const res = await getMatchDetail({
    matchId: route.params.id
  })
  const { nm, mg, bt, lg } = res
  match.nm = nm
  match.mg = mg
  match.bt = bt
  match.lg = lg
}
function setPrevMg() {
  prevMg.value = [...match.mg]
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
const SelectChampions = (option, market, e) => {
  if (!userStore.isLogin) {
    router.push(`/login?redirect=${route.fullPath}`)
    return
  }
  const team = option.op[0]
  // 未开售状态无法加入购物车
  if (!isSolding(option.ss, team.od)) return
  const matchId = route.params.id
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
  console.log(betObj)
  let result = betCartStore.betList.find((bet) => bet.id === betObj.id)
  if (result) {
    betCartStore.removeBet(betObj)
  } else {
    betCartStore.addBet(betObj, { x: e.pageX, y: e.pageY })
  }
}
function collapse() {
  isCollapse.value = !isCollapse.value
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
</script>

<style lang="scss" scoped>
.champion-match-view {
  background: #fff;
  .header-border-bottom {
    border-bottom: 0.5px solid #f5f5f5;
    :deep() {
      .title-center {
        max-width: calc(100% - 38px);
      }
    }
  }
  .champion-bet {
    display: flex;
    justify-content: space-between;
    padding: 14px 17px 14px 15px;
    margin: 15.5px 7px 0;
    background: #f7f7f7;
    .left {
      color: #111;
      font-size: 15px;
      line-height: 16px;
    }
    .right {
      display: flex;
      align-items: center;
      .deadline-time {
        margin-left: 8px;
        margin-right: 8px;
      }
      .arrow-up {
        width: 10px;
        height: 10px;
      }
      span {
        color: #666;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  .champion-content {
    padding-bottom: 20px;
    .title {
      padding-left: 22px;
      margin-top: 20px;
      color: #111;
      font-weight: 600;
      line-height: 16px;
      font-size: 15px;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 3px;
        height: 16px;
        border-radius: 2px;
        background-color: var(--color-primary);
        transform: translateY(-50%);
        content: '';
      }
    }
    .option {
      margin: 15px 7px 0;
      padding: 14px 15px;
      border-radius: 6px;
      background: #f7f7f7;
      border: 1px solid transparent;
      .sold {
        display: flex;
        justify-content: space-between;
        padding: 0 4px;
        flex-wrap: nowrap;
        .team {
          color: #111;
          font-size: 15px;
          line-height: 16px;
        }
        .odds {
          display: flex;
          align-items: center;
          .num {
            color: var(--color-text);
            font-size: 16px;
            font-weight: 600;
          }
          .arrow {
            width: 9px;
            height: 9px;
            margin-left: 2px;
          }
          &.up {
            .num {
              color: var(--color-danger);
            }
            .arrow {
              fill: var(--color-danger);
              transform: rotateX(180deg);
            }
          }
          &.down {
            .num {
              color: #00b42a;
            }
            .arrow {
              fill: #00b42a;
              opacity: 1;
            }
          }
        }
      }
      .ss-closed {
        text-align: center;
        svg {
          fill: #cbd7e3;
        }
      }

      &.active {
        border-color: var(--color-primary);
        background: #fff5f0;
      }
    }
  }
}
</style>
