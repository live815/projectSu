<template>
  <div class="animation-view">
    <NavBar :isShowRight="false" background="transparent" :showBackIcon="false" :isBack="false">
      <template v-slot:backIcon>
        <img class="backIcon" :src="backIcon" @click="play('Top')" />
      </template>
      <template v-slot>
        <div class="top-box">
          <div class="teamName">
            <div class="text">{{ fbStore.matchDetailList?.ts[0]?.na }}</div>
            <img :src="fbStore.matchDetailList?.ts[0]?.lurl || defaultIcon" />
          </div>
          <div class="center">
            <div class="date">
              {{ getMatchStatus(fbStore.matchDetailList, fbStore) }}
              <!-- 走表类型 -->
              <Counter
                v-if="isShowMatchCounter(fbStore.matchDetailList)"
                :tp="fbStore.matchDetailList?.mc.tp"
                :s="fbStore.matchDetailList?.mc.s"
                :r="fbStore.matchDetailList?.mc.r"
              />
            </div>
            <div class="score">
              {{ getTeamScore(fbStore.matchDetailList, 0) || 0 }} -
              {{ getTeamScore(fbStore.matchDetailList, 1) || 0 }}
            </div>
          </div>
          <div class="teamName">
            <img :src="fbStore.matchDetailList?.ts[1]?.lurl || defaultIcon" />
            <div class="text">{{ fbStore.matchDetailList?.ts[1]?.na }}</div>
          </div>
        </div>
      </template>
      <template v-slot:right>
        <img
          @click.stop="router.push('/user-center-bet-record')"
          width="24"
          height="24"
          class="record"
          :src="recordIcon"
        />
      </template>
    </NavBar>
    <iframe
      width="100%"
      height="100%"
      :src="fbStore.matchDetailList?.as[0] + language"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
    ></iframe>
    <!-- <div class="but-box">
      <img :src="anchorIcon" @click="fn" />
      <img @click="play('Live')" :src="playIcon" />
    </div> -->
  </div>
</template>

<script setup>
// import playIcon from '../../img/play.png'
// import anchorIcon from '../../img/anchor.png'
import backIcon from '../../img/back.png'
import recordIcon from '../../img/record.png'
import { getMatchStatus, isShowMatchCounter, getTeamScore } from '@/hooks/useSportDict'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { useRouter } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import eventBus from '@/utils/eventBus'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const fbStore = useFBStore()
const router = useRouter()
const emit = defineEmits(['play'])

const play = (v) => {
  emit('play', v)
}

const language = computed(() => {
  switch (appStore.language) {
    case 'zh-cn':
      return ''
    case 'vi':
      return '&language=vi'
    case 'en':
      return '&language=en'
  }
})

onBeforeUnmount(() => {
  eventBus.emit('topViewChange', false)
})
</script>

<style lang="scss" scoped>
.animation-view {
  width: 375px;
  height: 300px;
  .backIcon {
    width: 20px;
    height: 20px;
  }
  .but-box {
    @include center-content();
    position: absolute;
    top: 210px;
    right: 0;
    > img {
      width: 28px;
      height: 28px;
      margin: 30px 16px 0 0;
    }
  }
  .top-box {
    @include center-content();

    .teamName {
      color: #202020;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      .text {
        @include textToOmit(70px);
        color: #fff;
      }
      img {
        width: 13px;
        height: 13px;
        margin: 0 7px;
      }
    }

    .center {
      text-align: center;
      .date {
        color: var(--2, #ff5000);

        font-size: 10px;
        font-weight: 400;
        margin: 5px 0;
      }
      .score {
        color: #fff;
        font-family: DIN Alternate;
        font-size: 13px;
        font-weight: 700;
      }
    }
  }
}
</style>
