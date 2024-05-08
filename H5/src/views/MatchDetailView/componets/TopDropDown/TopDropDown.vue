<template>
  <div>
    <h2 class="title" @click="showHide">
      <span>{{ leagueName }}</span>
      <div class="triangle triangle-down"></div>
    </h2>
    <van-popup
      class="my-match-van-popup"
      teleport="body"
      v-model:show="showEvents"
      position="top"
      @click-overlay="showHide"
    >
      <div class="van-popup-wrapper">
        <div class="top-box">
          <div class="left-icon" @click="onClickLeft"><img :src="backIcon" /></div>
          <h2 class="title" @click="showHide">
            <span class="ellipse">{{ leagueName }}</span>
            <div class="triangle triangle-up black"></div>
          </h2>
        </div>
        <div class="scroll-container">
          <div v-for="item in dropDownList" :key="item" class="eventInfo-box">
            <div style="display: flex; justify-content: center">
              <div class="eventName">{{ item?.lg?.na }}</div>
            </div>
            <div class="vs-box" @click="router.push(`/match-detail/${item.id}`)">
              <div class="left">
                <div class="icon-box"><img :src="item?.ts[0]?.lurl || defaultIcon" /></div>
                <div class="team-name">{{ item?.ts[0]?.na }}</div>
              </div>
              <div class="center">
                <!-- 第一行 比赛状态 -->
                <div v-if="matchStatus !== 2" class="sessions">
                  {{ getMatchStatus(item, fbStore) }}
                  <!-- 走表类型 -->
                  <Counter
                    v-if="isShowMatchCounter(item)"
                    :tp="item?.mc.tp"
                    :s="item?.mc.s"
                    :r="item?.mc.r"
                  />
                </div>
                <!-- 第二行 比分 -->
                <div v-if="NotStarted(item)" class="vs">vs</div>
                <div v-else class="score">
                  {{ getTeamScore(item, 0) || 0 }} -
                  {{ getTeamScore(item, 1) || 0 }}
                </div>

                <!-- 第三行 其他阶段数据比分 -->
                <div v-if="[0, 4].includes(item.ms)" class="game-state-text">
                  - {{ getMatchStageText(item.ms) }} -
                </div>
              </div>
              <div class="right">
                <div class="icon-box">
                  <img :src="item?.ts[1]?.lurl || defaultIcon" />
                </div>
                <div class="team-name">{{ item?.ts[1]?.na }}</div>
              </div>
            </div>
            <!-- 单节比分列表 -->
            <div v-if="!NotStarted(item)" class="dropdown-single-score-list-wrapper">
              <MatchBottomInfo :isNeedShowFid="false" :match="item" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import MatchBottomInfo from '@/views/SportsView/components/MatchBottomInfo.vue'
import { ref } from 'vue'
import { useFBStore } from '@/stores/fb'
import defaultIcon from '@/assets/img/default-team-logo.png'
import backIcon from '../Top/img/iconBack.png'
import { useRouter } from 'vue-router'
import { getMatchList } from '@/api/fb.js'
import {
  NotStarted,
  getMatchStatus,
  isShowMatchCounter,
  getMatchStageText,
  getTeamScore
} from '@/hooks/useSportDict'
const fbStore = useFBStore()
const showEvents = ref(false)
const matchStatus = ref(0)
const router = useRouter()

const dropDownList = ref([])
const showHide = async () => {
  if (!showEvents.value) {
    await getMatchList({
      leagueId: fbStore.matchDetailList?.lg?.id
    }).then((res) => {
      dropDownList.value = res?.records
    })
    showEvents.value = true
  } else {
    showEvents.value = false
  }
}
const leagueName = computed(() => {
  return fbStore.matchDetailList?.lg?.na
})

const onClickLeft = () => {
  router.back()
}

defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.title {
  @include textToOmit(158px);
  line-height: 50px;
  color: #fff;
  text-align: center;

  font-weight: 500;
  font-size: 16px;
  margin-left: 15px;
  .ellipse {
    @include ellipsis();
  }
}
.triangle {
  position: absolute;
  top: 15px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin: 5px;
  &.triangle-down {
    border-top: 6px solid #fff;
    right: -20px;
  }
  &.triangle-up {
    border-bottom: 6px solid #333;
    right: -18px;
  }
}
.top-box {
  position: relative;
  background: var(--fill-1, #f5f5f5);
  .left-icon {
    position: fixed;
    left: 0;
    top: 2px;
    padding: 10px;
    img {
      width: 24px;
      height: 24px;
      filter: invert(100%);
    }
  }
  .title {
    color: var(--color-text-dark);

    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .triangle.black {
    border-top-color: red;
    position: static;
  }
}
.scroll-container {
  max-height: 380px;
  overflow: auto;
  background: var(--fill-1, #f5f5f5);
  .eventInfo-box {
    width: 351px;
    border-radius: 16px;
    background: #fff;
    color: #333;
    margin: 15px auto;
    padding:0 10px 10px;
    .eventName {
      padding: 2px 10px;
      border-radius: 0px 0px 10px 10px;
      background: var(--4, #fff5f0);
      color: #333;
      font-size: 12px;
    }
    .vs-box {
      @include center-content(space-between, center);
      margin-top: 5px;
      .left {
        width: 130px;
      }
      .right {
        width: 130px;
      }
      .icon-box {
        @include center-content();
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #f7f7f7;
        margin: auto;
        img {
          width: 40px;
          height: 40px;
        }
      }

      .center {
        color: #333;
        .sessions {
          text-align: center;

          font-size: 12px;
          font-weight: 400;
        }
        .score {
          color: #202020;
          font-family: DIN Alternate;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          margin-top: 15px;
        }
        .vs {
          color: #202020;
          text-align: center;
          font-family: DIN Alternate;
          font-size: 20px;
          font-weight: 700;
          margin: 12px 0 16px 0;
        }
        .game-state {
          color: #999;
          text-align: center;
          font-family: ONEAN;
          font-size: 11px;
          font-weight: 500;
        }
        .game-state-text {
          color: #ccc;
          text-align: center;
          font-size: 12px;
          font-weight: 400;
        }
        img {
          margin: 0 3px -2px 0;
        }
      }
      .team-name {
        @include textToOmit(130px);
        color: #333;
        font-size: 14px;
        font-weight: 500;
        margin-top: 8px;
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss">
.dropdown-single-score-list-wrapper {
  display: flex;
  justify-content: center;
  padding-top:8px;
  .each {
    color: var(--color-text-light);
    span {
      font-size: 14px;
    }
  }
}
</style>
