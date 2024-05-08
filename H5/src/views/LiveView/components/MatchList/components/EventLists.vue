<template>
  <div class="eventList-view">
    <div class="eventList-wrap">
      <div class="tab-box">
        <div class="iconDownList" @click="openDropDown">
          <img :src="switchIcon" />
        </div>

        <van-tabs v-model:active="active">
          <van-tab
            v-for="item in eventLists"
            :key="item.id"
            :title="item.label"
            :name="item.id"
          ></van-tab>
          <template v-if="data.length">
            <div
              class="eventCard"
              v-for="it in data"
              @click="router.push(`/match-detail/${it.gameId}`)"
              :key="it.id"
            >
              <div class="eventCard-titlle">
                <div class="tit-left">
                  <div class="time">{{ dayjs(it.gameTime).format('HH:mm') }}</div>
                  <div v-if="it.gameStatus" class="ing">{{ $t('Lletter.inProgress') }}</div>
                  <div v-else class="hasNotStarted">{{ $t('Lletter.hasNotStarted') }}</div>
                  <div class="status">{{ it.stageStatusName }}</div>
                  <div class="eventname">{{ it.leagueNameLocal }}</div>
                </div>
                <div class="tit-right">
                  <img :src="getLiveStatus(it.gameId)?.liveUrl ? vedioActive : vedio" />
                  <img :src="getLiveStatus(it.gameId)?.animationUrl ? cameraActive : camera" />
                  <template v-if="getAnchorLive(it.gameId)"
                    ><img :src="getAnchorLive(it.gameId)?.presenterAvatar || microphoneActive" />
                    <p class="liveIng">{{ $t('Lletter.livebroadcast') }}</p></template
                  >
                  <img v-else :src="microphone" />

                  <img src="../img//icon-right.png" class="iconRight" />
                </div>
              </div>
              <div class="eventCard-con">
                <div class="tname1">
                  <span>{{ it.mainNameLocal }}</span>
                  <img :src="it.icons?.split(',')[0] || defaultIcon" />
                </div>
                <div class="result">
                  <span> VS </span>
                </div>
                <div class="tname2">
                  <img :src="it.icons?.split(',')[1] || defaultIcon" />
                  <span>{{ it.cusNameLocal }}</span>
                </div>
              </div>
            </div>
          </template>
          <template v-else
            ><nodata :src="nodataimg" :noTxt="$t('Lletter.Llettertip10')"
          /></template>
        </van-tabs>
      </div>
      <transition name="fade">
        <div class="nameBox" v-show="nameBoxStatus">
          <div class="namelist">
            <ul>
              <li
                v-for="(item, index) in eventLists"
                :key="index"
                :class="item.id == active ? 'activeTwo' : ' '"
                @click="active = item.id"
              >
                {{ item.label }}
              </li>
            </ul>
          </div>
          <div class="shadow"></div>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="nameBoxStatus" @click="nameBoxStatus = !nameBoxStatus"></div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getMatchListFront } from '@/api/live.js'
import defaultIcon from '@/assets/img/default-team-logo.png'
import dayjs from 'dayjs'
import eventBus from '@/utils/eventBus'
import nodata from '@/components/NoResult/NoResult'
import nodataimg from '@/assets/img/nodata.png'
import { useLiveList } from '@/stores/live'
import vedioActive from './img/vedio-on.png'
import vedio from './img/vedio-off.png'
import camera from './img/camera-off.png'
import cameraActive from './img/camera-on.png'
import microphone from './img/microphone-off.png'
import microphoneActive from './img/microphone-on.png'
import { getBallTypeTextById } from '@/hooks/useSportDict'

const liveStore = useLiveList()
const router = useRouter()
const active = ref()
const matchScheduleList = ref([])

eventBus.on('queryByTime', (data) => {
  getMatchListFront(data).then((res) => {
    if (res.code === 200) {
      matchScheduleList.value = res.data.list
    }
  })
})
onUnmounted(() => {
  eventBus.off('queryByTime')
})
const init = async () => {
  await liveStore.getSatelliteLiveList()

  // 获取当天的起始时刻（0点）
  const startOfDay = dayjs().startOf('day')
  // 获取当天的结束时刻（23点59分59秒）
  const endOfDay = dayjs().endOf('day')
  // 获取13位时间戳
  const gameTimeStart = startOfDay.valueOf()
  const gameTimeEnd = endOfDay.valueOf()
  getMatchListFront({ gameTimeStart, gameTimeEnd }).then((res) => {
    if (res.code === 200) {
      matchScheduleList.value = res.data.list
    }
  })
}
init()

const eventLists = computed(() => {
  const uniqueValues = new Set()
  return matchScheduleList.value.reduce((result, item) => {
    if (
      getBallTypeTextById(item.sportsType) &&
      !uniqueValues.has(getBallTypeTextById(item.sportsType))
    ) {
      const obj = {
        label: getBallTypeTextById(item.sportsType),
        id: item.sportsType
      }
      result.push(obj)
      uniqueValues.add(getBallTypeTextById(item.sportsType)) // 将已经加入result数组的值加入Set，以便后续判断重复
    }
    return result.sort((a, b) => a.id - b.id)
  }, [])
})

const nameBoxStatus = ref(false)
const switchIcon = ref(new URL('../img/icon-down.png', import.meta.url).href)
//下拉菜单
function openDropDown() {
  nameBoxStatus.value = !nameBoxStatus.value
  if (nameBoxStatus.value) {
    switchIcon.value = new URL('../img/icon-up.png', import.meta.url).href
  } else {
    switchIcon.value = new URL('../img/icon-down.png', import.meta.url).href
  }
}
const getLiveStatus = (id) => liveStore.satelliteLive[liveStore.videoSource]?.find(item => item.fbId === id);

const getAnchorLive = (id) => {
  return liveStore.liveList.find((item) => item.gameId === id)
}
const data = computed(() => {
  return matchScheduleList.value.filter((item) => item.sportsType === active.value)
})
</script>

<style lang="scss" scoped>
.eventList-view {
  .eventList-wrap {
    position: relative;
    .tab-box {
      @include tabStyle();
      margin-top: 5px;
      position: relative;
      :deep() {
        .van-tabs__wrap {
          width: 90%;
        }
        .van-tab--active {
          color: #111;
        }
        .van-tabs__line {
          width: 30px; //下划线长度
        }
        .van-tabs__content {
          @include mobile-padding();
        }
      }
      .eventCard {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 80px;
        justify-content: center;
        line-height: 45px;
        border-bottom: 0.5px solid #eee;

        .eventCard-titlle,
        .eventCard-con {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          position: relative;
        }
        .eventCard-titlle {
          height: 20px;
          .tit-left,
          .tit-right {
            display: flex;
            font-size: 12px;
            align-items: center;
            .liveIng {
              color: var(--1, #f53f3f);
              margin-left: 5px;
              overflow-wrap: break-word;
              line-height: 15px;
              width: 48px;
            }
          }
          .tit-left {
            .time {
              color: #999;
            }
            .ing {
              @include textToOmit(50px);
              color: var(--1, #00b42a);
              margin-left: 8px;
            }
            .hasNotStarted {
              color: #999;
              margin-left: 8px;
              overflow-wrap: break-word;
              line-height: 15px;
              width: 48px;
            }
            .status {
              @include textToOmit();
              margin: 0 7px;
              color: var(--1, #00b42a);
            }
            .eventname {
              @include textToOmit(90px);
              color: var(--2, #ff5000);
            }
          }
          .tit-right {
            img {
              width: 16px;
              height: 16px;
              margin-left: 12px;
            }
            .iconRight {
              width: 7px;
              height: 11px;
              margin-left: 10px;
            }
          }
        }
        .eventCard-con {
          font-size: 14px;
          font-style: normal;
          .tname1,
          .tname2 {
            display: flex;
            justify-content: space-between;
            width: 130px;
            color: #111;
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          .result {
            font-size: 18px;
            font-family: DIN Alternate;
            font-weight: 700;
            color: #ff5000;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          img {
            display: inline-block;
            height: 20px;
            width: 20px;
          }
          .tname2 {
            margin-left: auto;
            img {
              margin-right: 10px;
            }
            span {
              @include textToOmit();
            }
          }
          .tname1 {
            margin-right: auto;
            img {
              margin-left: 10px;
            }
            span {
              @include textToOmit();
            }
          }
        }
      }
      .box {
        margin-top: 100px;
      }
    }
    .iconDownList {
      position: absolute;
      right: 10px;
      top: 13px;
      width: 18px;
      height: 18px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff5f0;
      z-index: 15;
      img {
        display: block;
        width: 10px;
        height: 10px;
      }
    }
    .nameBox {
      position: absolute;
      top: 33px;
      display: block;
      width: 100%;
      background: white;
      z-index: 14;
      .namelist {
        display: block;
        width: 90%;
        margin: 20px auto;
      }
      ul {
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 76px;
          background: #f7f7f7;
          border-radius: 20px;
          margin-bottom: 10px;
          margin-right: 10px;
          color: #666;
          text-align: center;

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          // line-height: 28px;

          &:nth-child(4n) {
            margin-right: 0px;
          }
        }
        .activeTwo {
          border: 0.5px solid #ff5000;
          background: #fff5f0;
          color: var(--2, #ff5000);
        }
      }
    }
    .shadow {
      position: absolute;

      width: 100%;
      height: 800px;
      background: rgba(0, 0, 0, 0.5);
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0; /* 进入和离开时的初始透明度 */
    }
  }
}
</style>
