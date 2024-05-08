<template>
  <video autoplay loop muted :poster="videoPoster" playsinline>
    <source src="./img/contest-bg.mp4" type="video/mp4" />
  </video>
  <div class="background">
    <NavBar
      :isShowRight="false"
      background="transparent"
      :showBackIcon="false"
      :isBack="false"
      @onClickLeft="router.back()"
    >
      <!-- 赛事列表下拉组件 -->
      <template v-slot>
        <TopDropDown ref="dropDownList" />
      </template>
      <template v-slot:backIcon>
        <img class="backIcon" :src="backIcon" />
      </template>
      <template v-slot:right>
        <span @click.stop="collect" class="collect-icon">
          <iconCollect v-if="isFollowed" />
          <iconUnCollect v-else />
        </span>
        <img @click="router.push('/user-center-bet-record')" class="record" :src="recordIcon" />
      </template>
    </NavBar>
    <div class="vs-box" v-if="fbStore.matchDetailList.ts && fbStore.matchDetailList.ts.length">
      <!-- 主队 -->
      <div class="left">
        <div class="icon-box">
          <img :src="fbStore.matchDetailList?.ts[0]?.lurl || defaultIcon" />
        </div>
        <div class="team-name">{{ fbStore.matchDetailList?.ts[0]?.na }}</div>
      </div>
      <!-- 球队信息 -->
      <div class="center">
        <!-- 第一行 比赛状态 -->
        <p class="stage-wrapper" v-if="fbStore.matchDetailList?.mc">
          <span class="stage">{{ getMatchStatus(fbStore.matchDetailList, fbStore) }}&nbsp; </span>
          <!-- 走表类型 -->
          <Counter
            v-if="isShowMatchCounter(fbStore.matchDetailList)"
            :tp="fbStore.matchDetailList?.mc.tp"
            :s="fbStore.matchDetailList?.mc.s"
            :r="fbStore.matchDetailList?.mc.r"
          />
        </p>
        <!-- 第二行 比分 -->
        <div class="vs" v-if="NotStarted(fbStore.matchDetailList)">vs</div>

        <div class="score" v-else>
          {{ getTeamScore(fbStore.matchDetailList, 0) || 0 }} -
          {{ getTeamScore(fbStore.matchDetailList, 1) || 0 }}
        </div>

        <!-- 第三行 比赛阶段状态 -->
        <div v-if="[0, 4].includes(fbStore.matchDetailList?.ms)" class="game-state-text">
          - {{ getMatchStageText(fbStore.matchDetailList.ms) }} -
        </div>
      </div>
      <!-- 客队 -->
      <div class="right">
        <div class="icon-box">
          <img :src="fbStore.matchDetailList?.ts[1]?.lurl || defaultIcon" />
        </div>
        <div class="team-name">{{ fbStore.matchDetailList?.ts[1]?.na }}</div>
      </div>
    </div>
    <!-- 单节比分列表 -->
    <div class="single-score-list-wrapper">
      <MatchBottomInfo
        :isNeedShowFid="false"
        v-if="!NotStarted(fbStore.matchDetailList)"
        :match="fbStore.matchDetailList"
      />
    </div>
    <!-- 视频源列表 -->
    <div
      v-if="![0, 4].includes(fbStore.matchDetailList?.ms) || liveStore.matchAnchorArr.length"
      class="but-box"
    >
      <img :src="scoreIcon" @click="dropDownList.showHide()" />
      <img v-if="props.url" @click="play('Live')" :src="playIcon" />
      <img
        v-if="fbStore.matchDetailList?.as?.length"
        @click="play('Animation')"
        :src="animationIcon"
      />
      <img
        class="anchor"
        v-for="item in liveStore.matchAnchorArr"
        :key="item.id"
        @click="jumpLive(item)"
        :src="getImg(item.presenterAvatar)"
      />
    </div>
    <!-- 默认占位 -->
    <!-- <div v-else class="blank">
    </div> -->
  </div>
</template>

<script setup>
import MatchBottomInfo from '@/views/SportsView/components/MatchBottomInfo.vue'
import videoPoster from './img/contest-bg.png'
import scoreIcon from '../../img/score.png'
import playIcon from '../../img/play.png'
import animationIcon from '../../img/animation.png'
import backIcon from './img/iconBack.png'
import recordIcon from '../../img/record.png'
import TopDropDown from '../TopDropDown/TopDropDown'
import defaultIcon from '@/assets/img/default-team-logo.png'
import {
  NotStarted,
  getMatchStatus,
  isShowMatchCounter,
  getMatchStageText,
  getTeamScore
} from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import { useLiveList } from '@/stores/live'
import { useRouter } from 'vue-router'
import eventBus from '@/utils/eventBus'
import { getImg } from '@/utils'
import { useChatroomStore } from '@/stores/chatroom'
const chatStore = useChatroomStore()
const router = useRouter()
const fbStore = useFBStore()
const liveStore = useLiveList()
const dropDownList = ref(null)
const emit = defineEmits(['play'])
const props = defineProps(['url'])

const jumpLive = (item) => {
  router.push({
    path: `/match-detail/${item.gameId}`,
    query: {
      data: 'fromLive',
      anchorId: item.presenterId,
      videoUrl: item.status === 2 ? item.webrtcPullUrl : '',
      liveID: item.id,
      roomCode: item.roomCode
    }
  })
  chatStore.getChatroomConfig(1)
}

const play = (v) => {
  emit('play', v)
  if (v === 'Animation') {
    eventBus.emit('topViewChange', true)
  }
}
const isFollowed = computed(() => {
  const { sid, id } = fbStore.matchDetailList
  return fbStore.followList[sid] && fbStore.followList[sid].includes(id)
})
function collect() {
  const { sid, id } = fbStore.matchDetailList
  fbStore.collect({ sid, id })
}
</script>

<style lang="scss" scoped>
video {
  position: fixed;
  top: 0px;
  width: 375px;
  height: 300px;
  z-index: -10;
}
.background {
  width: 375px;
  height: 300px;
  position: fixed;
  top: 0;
  z-index: 1;
  .backIcon {
    width: 24px;
    height: 24px;
    margin-top: 5px;
  }
  .collect-icon {
    margin-right: 10px;
    svg {
      width: 24px;
      height: 24px;
      fill: #fff;
    }
  }
  .record {
    width: 24px;
    height: 24px;
  }
  .vs-box {
    @include center-content(space-between, center);
    margin-top: 30px;
    padding: 0 10px;
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
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
      margin: auto;
      img {
        width: 40px;
        height: 40px;
      }
    }

    .center {
      color: #fff;
      .stage-wrapper {
        text-align: center;
      }
      .sessions {
        text-align: center;

        font-size: 12px;
        font-weight: 400;
      }
      .score {
        font-family: DIN Alternate;
        font-size: 24px;
        font-weight: 700;
        margin-top: 15px;
        text-align: center;
      }
      .vs {
        color: #fff;
        text-align: center;
        font-family: DIN Alternate;
        font-size: 24px;
        font-weight: 700;
        margin: 12px 0 16px 0;
      }
      .game-state {
        color: rgb(182, 157, 166);
        text-align: center;
        font-family: ONEAN;
        font-size: 11px;
        font-weight: 500;
      }
      .game-state-text {
        color: #fff;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        margin-top: 4px;
      }
      img {
        margin: 0 3px -2px 0;
      }
    }
    .team-name {
      @include textToOmit(130px);
      color: #fff;

      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      line-height: 17px;
      text-align: center;
    }
  }
  .but-box {
    @include center-content();
    > img {
      width: 28px;
      height: 28px;
      // margin: 20px 12px 0 0;
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
    .anchor {
      width: 25.667px;
      height: 25.667px;
      border-radius: 50%;
      background: url(<path-to-image>), lightgray 0px 0px / 100% 100% no-repeat;
    }
  }
  .blank {
    height: 20px;
  }
}
</style>
<style lang="scss">
.single-score-list-wrapper {
  display: flex;
  justify-content: center;
  margin: 8px 0;
  // 篮球半场
  .ht.basketball {
    color: #fff;
    svg {
      fill: #fff;
    }
  }

  .extra-info {
    // 足球半场
    .ht {
      color: #ddd;
      svg {
        fill: #ddd;
      }
    }
    // 费足球单节比分
    .each {
      color: #ddd;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
