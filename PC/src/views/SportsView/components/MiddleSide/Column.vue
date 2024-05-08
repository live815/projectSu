<template>
  <div class="column-view"  :style="{width:(100/ columulength )+'%', height: '25px'}">
    <div class="column" >
      <div class="list">
        <div
          class="item"
          :data-id="option.id"
          v-for="(team, idx) in option.op"
          :key="team.ty"
          @click.stop="selectOption($event, team)"
          
        >
          <!-- 正常开售 -->
          <div class="sold" v-if="isSolding(option.ss, team.od)" :class="{
            active: betCartStore.betList.find(
              (bet) =>
                `${bet.id}-${bet.betMatchMarket.optionType}-${bet.visible.betOpTitle}` ===
                `${option.id}-${team.ty}-${team.nm}`
            )
          }">
            <span class="name">{{ team.nm?.replace(/\s/g, '') }}</span>
            <div class="odds" :class="getChangeState(team.od, idx)">
              <span class="num">
                {{ getOddFormat(team.od, fbStore.settings.oddsFormat) }}
              </span>
              <!-- <IconKLineArrow v-if="item.changeStateClass == 'up' || item.changeStateClass == 'down'" class="arrow"/> -->
              <IconKLineArrow v-if="getChangeState(team.od, idx)" class="arrow" />
            </div>
          </div>
          <!-- 封盘 展示锁 -->
          <p class="ss-closed" v-else-if="option.ss === 0">
            <!-- <IconLocked /> -->
            <img :src="lock" alt="">
          </p>
          <!-- 其他 展示'-' -->
          <p class="ss-closed" v-else>
            <!-- <IconLocked /> -->
           -
          </p>
        </div>
      </div>
    </div>
  </div>
 
</template>

<script setup>
import { computed, watch } from 'vue'
import lock from './img/lock.png'
import { useBetCartStore } from '@/stores/betCart'
import { useUserStore } from '@/stores/user'
import { useFBStore } from '@/stores/fb'
import { getOddFormat, isSolding } from '@/hooks/useSportDict'
// import eventBus from '@/utils/eventBus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const betCartStore = useBetCartStore()
const userStore = useUserStore()
const fbStore = useFBStore()
const props = defineProps({
  column: {
    type: Object,
    default: () => ({})
  },
  listing: {
    type: Array,
    default: () => []
  },
  match: {
    type: Object,
    default: () => ({})
  },
  columulength:{
    type:Number,
    default:6
  },
  lengths:{
    type:Number,
    default:0
  }
})
const prevOption = computed(() => {
  const foundObj =fbStore.previousMatchList.find(item => item.list?.some(subItem => subItem.id === props.match.id));
  const result = foundObj ? foundObj.list.filter(subItem => subItem.id === props.match.id) : null;
  if (result) {
    const prevColumn = result[0].mg?.find((market) => market.mty === props.column.mty)
    if (prevColumn && prevColumn.mks.length) {
      return prevColumn.mks[0]
    }
  }
  return { op: [] }
})
const option = computed(() => {
  return (props.column.mks && props.column.mks.length && props.column.mks[0]) || { op: [{}, {}] }
})
//点击盘口投注
function selectOption(e, team) {
  fbStore.isClickColmn = true
  fbStore.ifShowLayer = false
  fbStore.eventChooseStatus = false//关闭赛事筛选
  eventBus.emit('quickbet',true)
  if(team.na){
    fbStore.hotMenuStatus = false
    fbStore.sportMenuStatus = false
    if(betCartStore.isOpenBetCart && !betCartStore.isClickBetLayer && betCartStore.submitBetList.length >0){
      betCartStore.removeAllBets()
      betCartStore.ifShowLayer = false
    }
    if (!userStore.isLogin) {
      router.push(`/login?redirect=${route.fullPath}`)
      return
    }
    
    // 未开售状态无法加入购物车
    if (!isSolding(option.value.ss, team.od)) return
    // 赔率小于0不存在
    if (team.od < 0) return
    const match = props.match
    const betObj = {
      id: option.value.id, // 注单id / 玩法id
      ss: option.value.ss, // 玩法状态 1开售
      au: option.value.au, // 1支持串关
      unitStake: '0', // 金额
      matchId: match.id,
      betMatchMarket: {
        matchId: match.id,
        marketId: option.value.id, // 玩法id
        odds: team.od, // 赔率
        optionType: team.ty // 投注类型
      },
      // 展示类型数据
      visible: {
        teamName: team.na, // 球队名称
        betOpTitle: team.nm, // 投注项名称 -0/0.5
        title: match.nm, // 比赛标题 teamA vs teamB
        marketTitle: props.column.title, //  盘口玩法简称
        lgName: match.lg.na, // 联赛名称
        begainTime: match.bt // 开始时间
      }
    }

    betCartStore.isOpenBetCart = true
    betCartStore.toggleBet(betObj, { x: e.pageX, y: e.pageY })
    betCartStore.ifShowLayer = false
  }
}
function getChangeState(newOd, idx) {
  let oldOd = prevOption.value?.op[idx]?.od
  if (newOd > oldOd) return 'up'
  if (newOd < oldOd) return 'down'
}

</script>

<style lang="scss" scoped>
.column-view{
  // margin: 0 10px;
  .column {
    flex: 1;
    margin-right: 5px;
    &:last-child {
      // margin-right: 0;
    }
    h4 {
      font-size: 12px;
      text-align: center;
      margin-bottom: 8px;
    }
    .item {
      height: 28px;
      line-height: 28px;
      border-radius: 4px;
      background: #1D223C;
      margin-bottom: 2px;
      text-align: center;
      font-size: 12px;
      border: 1px solid transparent;
      flex: 1;
      margin-top: 5px;
      cursor: pointer;
      .sold {
        display: flex;
        justify-content: space-between;
        padding: 0 4px;
        flex-wrap: nowrap;
        &.active {
          // border-color: #ff5000;
          // background: #fff0e9;
          color: #fff;
          background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
          border-radius: 4px;
          .odds {
            .num {
              // color: #fff;
            }
          }
        }
        &:hover{
          background-color: #2A3157;
        }
      }
      
      .name {
        font-size: 12px;
        margin-left: 2px;
      }
      .odds {
        display: flex;
        align-items: center;
        width: 40px;
        .num {
          // color: var(--color-text-dark);
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }
        .arrow {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-left: 3px;
          vertical-align: middle;
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

      .ss-closed {
        svg {
          fill: #cbd7e3;
        }
      }

    }

    &.three-in-row {
      .list {
        display: flex;
        .item {
          height: 80px;
          margin-right: 2px;
          &:last-child {
            margin-right: 0;
          }
          .sold {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      }
    }
    &.two-in-row {
      .list {
        display: flex;
        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          margin-right: 2px;
          &:last-child {
            margin-right: 0;
          }
          .sold {
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: 1.5;
            .name {
              font-size: 12px;
            }
            .num {
              font-size: 14px;
            }
          }
        }
      }
    }
    &.three-in-column {
      .item {
        height: 26px;
        line-height: 26px;
      }
    }
  }
}

</style>
