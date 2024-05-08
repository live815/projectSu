<template>
  <div class="competition" v-for="item in competitionItems" :key="item.id" @click="jump(item)">
    <div class="player-info">
      <p class="avatar">
        <img :src="item.presenterAvatar ? getImg(item.presenterAvatar) : defaultAvatar" />
      </p>
      <div class="discribe">{{ item.presenterName }}</div>
    </div>
    <div class="middle">
      <h1>{{ item.associatedLeague }}</h1>
      <div class="team-info">
        <img :src="item.icons?.split(',')[0] || defaultIcon" />
        <span class="text">{{ item.mainName }}</span>
        <span class="score">{{ getScore(item.gameId)?.scores[0].scores?.split(':')[0] }}</span>
      </div>
      <div class="team-info">
        <img :src="item.icons?.split(',')[1] || defaultIcon" />
        <span class="text">{{ item.cusName }}</span>
        <span class="score">{{ getScore(item.gameId)?.scores[0].scores?.split(':')[1] }}</span>
      </div>
    </div>
    <div class="rightbox">
      <template v-if="item.status === 2">
        <div class="status liveIng">
          <Animateview />
          <span>{{ $t('Lletter.livebroadcast') }}</span>
        </div>
        <div style="clear: both"></div>
      </template>
      <template v-else-if="!filterReserve(item.id) || item.reserveStatus">
        <div class="status reserve" @click.stop="reserve(item)">
          <IconClock />
          <span>{{ $t('Lletter.reserve') }}</span>
        </div>
      </template>
      <template v-else>
        <div class="status already-reserve" @click.stop="cancelReserves(item)">
          <span>{{ $t('Lletter.Alreadybooked') }}</span>
        </div>
      </template>

      <p v-if="item.status === 2" class="time">
        {{ getScore(item.gameId)?.scores[0].stageStatusName }}
      </p>
      <p v-else class="date">{{ dayjs(item.playStartTime).format('MM-DD HH:mm') }}</p>
    </div>
  </div>

  <Toast :success="success" ref="Toasts" />
</template>
<script setup>
import Animateview from '@/components/Animate'
import Toast from './Toast'
import { getImg } from '@/utils'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { setReserveLive, cancelReserve, getLiveMatchScore } from '@/api/live'
import { useUserStore } from '@/stores/user.js'
import { useLiveList } from '@/stores/live'
import defaultAvatar from './img/defaultAvatar.png'
import dayjs from 'dayjs'
import { getToken } from '@/utils/cache'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const liveStore = useLiveList()
const user = useUserStore()
const props = defineProps(['competitionItems'])
const Toasts = ref(null)
const success = ref(true)
const isLogin = getToken()
const router = useRouter()
const scoreList = ref([])

const gameIdArr = computed(() => {
  return props.competitionItems.map((item) => item.gameId)
})
const liveIng = computed(() => {
  return props.competitionItems.some((item) => item.status === 2)
})
watchEffect(() => {
  if (liveIng.value) {
    getLiveMatchScore({ matchIds: gameIdArr.value }).then((res) => {
      scoreList.value = res.data
    })
  }
})

const getScore = computed(() => {
  return (id) => {
    return scoreList.value?.find((item) => item.gameId === id)
  }
})

// 过滤函数，通过查询预约列表接口数据，判断当前直播是否已预约
const filterReserve = (id) => {
  return liveStore.reservationList?.some((item) => item.id === id)
}

const reserve = (item) => {
  if (isLogin) {
    setReserveLive({
      liveStreamId: item.id,
      memberId: user.userInfo.id
    }).then((res) => {
      if (res.code === 200) {
        liveStore.getReserveLiveListAction()
        item.reserveStatus = false
        success.value = true
        Toasts.value.showToast()
      }
    })
  } else {
    router.push(`/login?redirect=${route.fullPath}`)
  }
}
const cancelReserves = (item) => {
  cancelReserve({
    liveStreamId: item.id,
    memberId: user.userInfo.id
  }).then((res) => {
    if (res.code === 200) {
      liveStore.getReserveLiveListAction()
      item.reserveStatus = true
      success.value = false
      Toasts.value.showToast()
    }
  })
}

const jump = (item) => {
  if (isLogin) {
    if (item.gameId) {
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
    } else {
      router.push({
        path: '/entertainmentLive',
        query: {
          liveID: item.id,
          anchorId: item.presenterId,
          roomCode: item.roomCode
        }
      })
    }
  } else {
    router.push(`/login?redirect=${route.fullPath}`)
  }
}
</script>
<style lang="scss" scoped>
.competition {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 12px 12px 0 30px;
  &::after {
    position: absolute;
    content: '';
    height: 0.5px;
    background-color: #f5f5f5;
    bottom: -14px;
    left: 10px;
    right: 10px;
  }
  .player-info {
    margin-top: 15px;
    .avatar {
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .discribe {
      @include textToOmit(50px);
      color: #333;
      text-align: center;

      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px; /* 123.077% */
    }
  }
  .middle {
    margin-right: auto;
  }
  h1 {
    @include textToOmit(130px);
    color: #333;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }
  .team-info {
    width: 157px;
    display: flex;
    margin-top: 8px;
    color: #202020;
    font-family: DIN Alternate;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 114.286% */
    img {
      width: 20px;
      height: 20px;
    }
    .text {
      margin-left: 4px;
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }
  }
  .rightbox {
    position: absolute;
    right: 10px;
    .status {
      display: flex;
      width: max-content;
      padding: 5px 8px;
      color: #fff;
      border-radius: 20px;
      font-size: 10px;
      line-height: 12px;
      margin: auto;
      white-space: pre-wrap;
      overflow: hidden;
      max-width: 70px;
      text-align: center;
    }
    .liveIng {
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%)) !important;
      float: right;
    }
    .reserve {
      background: var(--1, #00b42a);
    }
    .already-reserve {
      background: var(--4, #e8ffea);
      color: var(--1, #00b42a);
    }
    .time {
      @include textToOmit(50px);
      margin-top: 8px;
      font-size: 10px;
    }
    .date {
      color: #00b42a;
      font-size: 10px;
      margin-top: 8px;
    }
  }
  :deep() {
    .van-toast {
      height: 24px;
      background: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
    }
    .van-icon {
      margin-right: 8px;
    }
    .van-toast__text {
      display: flex;
      align-items: center;
    }
  }
}
</style>
