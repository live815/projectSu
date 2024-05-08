<template>
  <div ref="matchListRef" class="match-list-wrapper">
    <div class="match-list" v-if="newLeagueMatchList.length">
      <van-collapse ref="collapse" v-model="fbStore.matchListIds" :border="false">
        <van-collapse-item
          v-for="league in newLeagueMatchList"
          :key="league.id"
          :name="league.id"
          :border="false"
          :is-link="true"
        >
          <!-- 联赛头 -->
          <template #title>
            <div class="title" @click="fbStore.isOperatedMatchListCollapse = true">
              <van-image
                :error-icon="defaultTeamIcon"
                icon-size="20"
                :src="league.lg.lurl || defaultTeamIcon"
              />
              <h4 class="van-ellipsis">{{ league.lg.na }}</h4>
            </div>
          </template>
          <!-- 联赛下的比赛列表 -->
          <div
            v-for="item in league.list"
            :key="item.id"
            class="content"
            :id="`matchId-${item.id}`"
            @click.stop="detail($event, item)"
          >
            <div class="main">
              <div class="left">
                <div class="head">
                  <!-- 收藏 -->
                  <iconCollect
                    @click.stop="fbStore.collect(item)"
                    class="svg-collect"
                    :class="{
                      followed: isFollowed(item)
                    }"
                  />
                  <!-- 赛事进行阶段 -->
                  <p class="stage-wrapper" v-if="item.mc">
                    <span class="stage">{{ getMatchStatus(item, fbStore) }}</span>
                    <!-- 走表类型 -->
                    <Counter
                      v-if="isShowMatchCounter(item)"
                      :tp="item.mc.tp"
                      :s="item.mc.s"
                      :r="item.mc.r"
                    />
                  </p>
                  <!-- 是否有视频 -->
                  <iconVideo class="svg-video" />
                </div>
                <!-- 主客队相关信息 -->
                <div class="teams" v-if="item.ts && item.ts.length">
                  <div class="item" v-for="(team, idx) in item.ts" :key="team.id">
                    <div class="main-info">
                      <!-- 球队icon -->
                      <van-image icon-size="20" :src="team.lurl || defaultTeamIcon" />
                      <!-- 球队名称 -->
                      <span class="name">{{ team.na }}</span>
                      <!-- 足球类周边得分 -->
                      <div class="cards" v-if="item.sid === SPORT_IDS.Soccer">
                        <!-- 红牌 -->
                        <div class="card red" v-if="Number(getTeamDetailByTyg(item, idx, 8, 1000))">
                          <IconCard />
                          <span>{{ getTeamDetailByTyg(item, idx, 8, 1000) }}</span>
                        </div>
                        <!-- 黄牌 -->
                        <div
                          class="card yellow"
                          v-if="Number(getTeamDetailByTyg(item, idx, 7, 1000))"
                        >
                          <IconCard />
                          <span>{{ getTeamDetailByTyg(item, idx, 7, 1000) }}</span>
                        </div>
                      </div>
                    </div>
                    <!-- 主比分 -->
                    <div class="score num">{{ getTeamScore(item, idx) || 0 }}</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <!-- 市场主流玩法 -->
                <Markets ref="marketsRefs" :match="item" />
              </div>
            </div>
            <div class="bottom">
              <div>
                <MatchBottomInfo :match="item" />
              </div>
              <div v-if="item.tms > 2" class="more">
                +{{ item.tms }} {{ $t('Sportsview.Moremarkets') }}
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <NoResult style="margin-top: 80px" v-else />
  </div>
</template>

<script setup>
import eventBus from '@/utils/eventBus'
import Markets from './Markets.vue'
import MatchBottomInfo from './MatchBottomInfo.vue'
import { ref, onUnmounted, onMounted } from 'vue'
import { useFBStore } from '@/stores/fb'
import { useRouter } from 'vue-router'
import {
  SPORT_IDS,
  getMatchStatus,
  isShowMatchCounter,
  getTeamDetailByTyg,
  getTeamScore
} from '@/hooks/useSportDict'
import defaultTeamIcon from '@/assets/img/default-team-logo.png'
import Hammer from 'hammerjs'
import { factoryArr } from '@/hooks/useSportDict'
const router = useRouter()
const fbStore = useFBStore()
const collapse = ref(null)
const marketsRefs = ref(null)
const matchListRef = ref(null)
let hammer = null
// 组装二维数组
const newLeagueMatchList = computed(() => {
  let list = fbStore.matchList
  // 过滤
  list = list.filter((match) => !hideMatch(match))
  return factoryArr(list)
})
watchEffect(() => {
  // 如果用户操作了折叠面板，则不要随数据更新自动开启
  if (!fbStore.isOperatedMatchListCollapse) {
    fbStore.matchListIds = newLeagueMatchList.value.map((item) => item.id)
  }
  // 比赛详情页回退到指定比赛坐标
  const matchId = window.sessionStorage.matchId
  const hasCurrentMatch = newLeagueMatchList.value.some((league) =>
    league.list?.find((match) => match.id === Number(matchId))
  )
  if (hasCurrentMatch) {
    window.sessionStorage.removeItem('matchId')
    nextTick(() => {
      const currentMatchDom = document.getElementById(`matchId-${matchId}`)
      const pos = currentMatchDom.getBoundingClientRect()
      window.scrollTo(0,pos.top - 140)
    })
  }
})
function isFollowed(item) {
  return fbStore.followList[item.sid] && fbStore.followList[item.sid].includes(item.id)
}
// 隐藏比赛
function hideMatch(item) {
  const isFollowType = !fbStore.queryMatchListParams.type
  const isFollowed = fbStore.followList[item.sid]?.includes(item.id)
  // 在关注分类下的比赛没有被关注，则不展示
  return isFollowType && !isFollowed
}
function openAll() {
  collapse.value?.toggleAll(true)
}
function closeAll() {
  collapse.value?.toggleAll(false)
}
eventBus.on('initSwiper', initSwiper)
eventBus.on('MatchListOpenAll', openAll)
eventBus.on('MatchListCloseAll', closeAll)
function detail(e, item) {
  window.sessionStorage.matchId = item.id
  router.push(`/match-detail/${item.id}`)
}
onUnmounted(() => {
  eventBus.off('initSwiper')
  eventBus.off('MatchListOpenAll')
  eventBus.off('MatchListCloseAll')
  hammer.off('swipe')
  hammer.destroy()
  fbStore.matchList = [] // 清空列表
})
function initSwiper() {
  nextTick(() => {
    marketsRefs.value?.forEach((swipe) => {
      swipe.swipeTo(0)
    })
  })
}
watch(fbStore.queryMatchListParams, () => {
  initSwiper()
})
onMounted(() => {
  hammer = new Hammer(matchListRef.value)
  hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 })
  hammer.on('swipeleft', () => {
    marketsRefs.value.forEach((swipe) => {
      swipe.next()
    })
  })
  hammer.on('swiperight', () => {
    marketsRefs.value.forEach((swipe) => {
      swipe.prev()
    })
  })
})
</script>

<style lang="scss" scoped>
.match-list {
  margin: 0 7px;
}
// 折叠面板
:deep() {
  .van-cell {
    background: transparent;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px 10px 0px 0px;
    background: linear-gradient(180deg, #fdfdfe 0%, #e8ecf2 100%);
    .van-cell__right-icon {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .van-collapse-item {
    border: 1px solid #eee;
    border-radius: 10px;
    overflow: hidden;
  }
  .van-collapse-item__content {
    padding-left: 10px;
    padding-right: 7px;
  }
}
.van-collapse-item {
  margin-bottom: 10px;
}
.title {
  display: flex;
  align-items: center;
  .van-image {
    margin-right: 5px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
  }
  h4 {
    @include ellipsis();
    color: var(--color-text-dark);
    // span {
    //   // color:var(--color-orange);
    // }
  }
}

.content {
  color: var(--color-text);
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
  padding-bottom: 12px;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
  .main {
    display: flex;
    .left {
      flex: 6;
      margin-right: 8px;
      .head {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .svg-collect {
          width: 18px;
          height: 18px;
          fill: #ffc6ac;
          flex: 0 0 16px;
          &.followed {
            fill: var(--color-primary);
          }
        }
        .stage-wrapper {
          margin: 0 6px;
          font-size: 12px;
          display: flex;
          .stage {
            @include ellipsis();
          }
          .counter {
            margin-left: 4px;
            font-size: 13px;
          }
        }
        .svg-video {
          flex: 0 0 16px;
          fill: var(--color-orange);
        }
      }
      .teams {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          .main-info {
            display: flex;
            align-items: center;
          }
          .van-image {
            flex: 0 0 18px;
            width: 18px;
            height: 18px;
          }
          .name {
            color: var(--color-text-dark);
            margin: 0 6px;
            @include ellipsis();
          }
          .cards {
            margin-top: 5px;
            display: flex;

            .card {
              position: relative;
              svg {
                width: 18px;
                height: 18px;
              }
              &.red svg {
                fill: var(--color-danger);
              }
              &.yellow svg {
                fill: var(--color-orange);
              }
              span {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -60%, 0);
                color: #fff;
                font-size: 12px;
              }
            }
          }
          .score {
            font-size: 20px;
            color: var(--color-orange);
            font-weight: 700;
            margin-left: 3px;
          }
        }
      }
    }
    .right {
      width: 50%;
      flex: 7;
      margin-left: 0px;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    margin-top: 5px;
    .more {
      color: var(--color-orange);
      font-size: 11px;
      flex: none;
    }
  }
}
</style>
