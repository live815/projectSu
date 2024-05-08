<template>
  <div class="list">
    <div class="list-item" @click="jump(item)">
      <img
        class="show-logo"
        :src="
          httpRegex.test(item.frontCoverImage)
            ? item.frontCoverImage
            : item.frontCoverImage
            ? getImg(item.frontCoverImage)
            : defaultBg
        "
      />
      <!-- 房间锁图标，设置直播付费金额时显示 -->
      <div v-if="item.viewPayAmount && user.userInfo.role !== 2 && alreadyPaid" class="lock">
        <IconLocked style="fill: #fff" />
      </div>
      <!-- 左上角直播中动画 -->
      <Animateview v-if="item.status === 2" color="#ff5000" />
      <!-- 预约和已预约图标，根据预约状态切换点击事件 -->
      <div
        v-else-if="!filterReserve(item.id) || item.reserveStatus"
        class="icon"
        @click.stop="handleReserve(item)"
      >
        <IconClockActive />
        <div class="title-box">
          <div>{{ $t('Lletter.reserve') }}</div>
          <div class="line">|</div>
          {{ dayjs(item?.playStartTime).format('MM-DD HH:mm') }}
        </div>
      </div>
      <div v-else class="icon" @click.stop="cancelReserves(item)">
        <p>
          <span>{{ $t('Lletter.Alreadybooked') }}</span> <span>|</span>
          {{ dayjs(item?.playStartTime).format('MM-DD HH:mm') }}
        </p>
      </div>
      <!-- 封面标签类型，根据不同类型应用不同背景颜色 -->
      <div
        class="livetype"
        :class="{
          entertainment: isEntertainment(item),
          'cust-serv': isCustServ(item),
          sporting: isSporting(item)
        }"
      >
        {{ displayText(item) }}
      </div>
      <!-- 详情组件，显示在播放容器底部 -->
      <detail :data="item" class="bottom" />
    </div>
    <Toast :success="success" ref="Toasts" />
  </div>
</template>
<script setup>
import Animateview from '@/components/Animate'
import detail from './detail.vue'
import Toast from './Toast'
import { getImg } from '@/utils'
import { frontCoverTag } from '@/utils/config.js'
import { useLiveList } from '@/stores/live'
import { useUserStore } from '@/stores/user.js'
import { setReserveLive, cancelReserve,getUserLivePayStatus } from '@/api/live'
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router'
import { getToken } from '@/utils/cache'
import defaultBg from '@/assets/img/defaultBg.png'
import i18n from '@/i18n'
const router = useRouter()
const route = useRoute()
const isLogin = getToken()
const user = useUserStore()
const liveStore = useLiveList()
const httpRegex = /^(http|https):\/\/.*/
const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
})
const emit = defineEmits(['updatePropData'])
const Toasts = ref(null)
const success = ref(true)
const alreadyPaid = ref(true)

if (isLogin) {
  getUserLivePayStatus({
    liveStreamId: props.item.id,
    memberId: user.userInfo.id
  }).then((res) => {
    alreadyPaid.value = !res.data
  })
}

const isEntertainment = computed(() => (item) => {
  return item.roomStyle === 4
})
const isCustServ = computed(
  () => (item) => item.frontCoverTag === 3 && !isEntertainment.value(item)
)
const isSporting = computed(
  () => (item) => item.frontCoverTag === 2 && !isEntertainment.value(item)
)
const displayText = computed(() => (item) => {
  return isEntertainment.value(item)
    ? i18n.global.t('Lletter.bigshow')
    : frontCoverTag(i18n)[item.frontCoverTag]
})

// 过滤函数，通过查询预约列表接口数据，判断当前直播是否已预约
const filterReserve = (id) => {
  return liveStore.reservationList?.some((item) => item.id === id)
}
const handleReserve = (item) => {
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
      emit('updatePropData', item.id)
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
          presenterName: item.presenterName,
          liveID: item.id,
          roomCode: item.roomCode
        }
      })
    } else {
      router.push({
        path: '/entertainmentLive',
        query: {
          data: 'fromLive',
          liveID: item.id,
          presenterName: item.presenterName,
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
.list {
  // padding: 0px 16px 0px;
  // display: flex;
  // flex-wrap: wrap;
  // gap: 11px;
  .list-item {
    // flex: 0 0 calc(50% - 10px);
    height: 156px;
    position: relative;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;

    .show-logo {
      height: 92px;
      width: 166px;
      overflow: hidden;
      object-fit: cover;
    }
    .lock {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .icon {
      display: flex;
      position: absolute;
      top: 4px;
      left: 4px;
      padding: 2px 4px;
      border-radius: 20px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 10px;

      > div {
        margin-right: 4px;
      }
      .title-box {
        display: flex;
        align-items: center;
        .line {
          margin: 0 8px;
        }
      }
    }
    .animate {
      position: absolute;
      top: 4px;
      left: 4px;
    }
    .livetype {
      position: absolute;
      left: 4px;
      top: 72px;
      padding: 0 4px;
      height: 16px;
      border-radius: 10px;
      background: var(--4, linear-gradient(90deg, #00f0ff 0.17%, #2e68ff 101.4%));
      color: #fff;
      font-size: 10px;
      line-height: 18px;
    }
    .entertainment {
      background: var(--1, linear-gradient(90deg, #8728ff 0.17%, #f00 101.4%));
    }
    .cust-serv {
      background: var(--2, linear-gradient(90deg, #d3d803 0.17%, #04d13e 101.4%));
    }
    .sporting {
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
.box {
  margin-top: 200px;
}
</style>
