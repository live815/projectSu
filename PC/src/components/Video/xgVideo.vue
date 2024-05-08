<template>
  <div class="match-tips" :style="{ width: `${props.width}px`, height: `${props.height}px` }">
    <p class="t1">{{ $t('Components.Notice_23') }}...</p>
    <p class="t2">
      {{
        formatTime(
          liveStore.roomSportType === 0 ? liveStore.liveRoom.startTimestamp : liveStore.liveRoom?.bt
        )
      }}
    </p>
    <p class="t2" style="font-size: 16px; margin-top: 2px; font-weight: 400">
      {{
        liveStore.roomSportType === 0
          ? liveStore.liveRoom.associatedLeague
          : liveStore.liveRoom.lg?.na
      }}
    </p>
    <!-- 主播直播 -->
    <div
      class="ranks"
      v-if="
        (liveStore.liveRoom.roomStyle == 1 || liveStore.liveRoom.roomStyle == 2) &&
        liveStore.roomSportType === 0
      "
    >
      <div class="r1">{{ liveStore.liveRoom.mainName }}</div>
      <img :src="getIntercept(liveStore.liveRoom.icons, 0)" style="margin-left: 8px" />
      <div class="score" style="margin-left: 35px" v-if="liveStore.liveRoom.status == 2">
        {{ getScore(liveStore.liveRoom.score, 0) }}
      </div>
      <div class="have">
        <span class="r1" style="font-size: 12px; margin-left: 4px">VS</span>
      </div>
      <div class="score" style="margin-right: 40px" v-if="liveStore.liveRoom.status == 2">
        {{ getScore(liveStore.liveRoom.score, 1) }}
      </div>
      <img :src="getIntercept(liveStore.liveRoom.icons, 1)" />
      <div class="r1" style="margin-left: 8px">{{ liveStore.liveRoom.cusName }}</div>
    </div>
    <div class="ranks" v-else>
      <div class="r1" style="font-size: 16px">{{ liveStore.liveRoom.roomTitle }}</div>
    </div>
    <!-- 卫星直播 -->
    <div class="ranks" v-if="liveStore.roomSportType !== 0">
      <div class="r1" v-if="liveStore.liveRoom.ts">{{ liveStore.liveRoom.ts[0]?.na }}</div>
      <img
        v-if="liveStore.liveRoom.ts"
        :src="liveStore.liveRoom.ts[0]?.lurl"
        style="margin-left: 8px"
      />
      <!-- <div class="score" style="margin-left: 35px;" v-if="liveStore.liveRoom.status==2">{{getScore(liveStore.liveRoom.score,0)}}</div> -->
      <div class="have">
        <span class="r1" style="font-size: 12px; margin-left: 4px">VS</span>
      </div>
      <!-- <div class="score" style="margin-right: 40px;" v-if="liveStore.liveRoom.status==2">{{getScore(liveStore.liveRoom.score,1)}}</div> -->
      <img v-if="liveStore.liveRoom.ts" :src="liveStore.liveRoom.ts[1]?.lurl" />
      <div v-if="liveStore.liveRoom.ts" class="r1" style="margin-left: 8px">
        {{ liveStore.liveRoom.ts[1]?.na }}
      </div>
    </div>
    <div class="imgAnchor" v-if="liveStore.roomSportType === 0">
      <span class="r1">{{ $t('Components.Anchor') }}：</span>
      <div class="nameAnchor">
        <img
          v-if="liveStore.liveRoom.presenterAvatar"
          class="fcImg"
          :src="getImgUrl(liveStore.liveRoom.presenterAvatar)"
        />
        <p style="max-width: 100px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">
          {{ liveStore.liveRoom.presenterName }}
        </p>
      </div>
    </div>
  </div>
  <!-- <video id="playerReservation" 
      :width="props.width"
      :height="props.height"
      preload="auto"
      playsinline
      webkit-playsinline></video> -->
  <iframe
    id="iframeContainer"
    :src="`${appPlayerUrl}?url=${source}&muted=${muted}`"
    :width="props.width"
    :height="props.height"
    allow="autoplay"
    frameborder="0"
    v-if="source"
  />
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { getImgUrl, getIntercept, getScore, formatTime } from '@/utils/cache'
import { useLiveStore } from '@/stores/liveBroadcast'
import { appPlayerUrl, defaultSportVideo } from '@/utils/config'
const liveStore = useLiveStore()
const props = defineProps({
  width: {
    type: [Number, String],
    default: 989
  },
  height: {
    type: [Number, String],
    default: 555
  },
  anchorUrl: {
    type: [Object, String]
  },
  anchorType: {
    type: Number,
    default: 0
  }
})
const videoC = ref('')
const source = ref('')
const muted = ref(true) //静音播放
const playerData = ref(null)
onMounted(() => {
  videoC.value = defaultSportVideo
  if (liveStore.liveRoom.status == 1 || liveStore.roomSportType !== 0) {
    source.value = videoC.value
    // playerData.value= TCPlayer('playerReservation', {
    // sources: [{
    //         src: source.value,//https://veox.chuejqv11.com/resource/front/livebglq-zh-CN.mp4
    //     }],
    //     licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1320778720_1/v_cube.license',
    //     autoplay:true,
    //     muted:true,
    //     loop:true,
    //     controlBar:{
    //         playToggle:false,
    //         progressControl:false,
    //         volumePanel:false,
    //         currentTimeDisplay:false,
    //         durationDisplay:false,
    //         timeDivider:false,
    //         playbackRateMenuButton:false,
    //         fullscreenToggle:false,
    //         QualitySwitcherMenuButton:false
    //     }
    // })
  }
})
watch(
  () => liveStore.liveRoom?.webrtcPullUrl,
  () => {
    console.log('webrtcPullUrl.mp4')
    if (liveStore.liveRoom.status == 1) {
      source.value = videoC.value
      // console.log('134')
      // playerData.value && playerData.value.src(videoC.value);
    }
  }
)
onUnmounted(() => {
  console.log('销毁playerData', playerData.value)
  if (playerData.value) {
    playerData.value.dispose()
    playerData.value = null
  }
})
</script>

<style lang="scss" scoped>
.imgBgVideo {
  position: absolute;
  z-index: 1;
  cursor: pointer;
}
:deep() .btnPlay {
  cursor: pointer;
  z-index: 10;
}
#playerReservation {
  width: 100%;
  max-width: 100%;
  height: 100%;
}
.match-tips {
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  .t1 {
    color: var(--unnamed, #f35f1b);

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 12px; /* 50% */
  }
  .t2 {
    color: var(--100, #fff);

    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 20px;
  }
  .ranks {
    display: flex;
    align-items: center;
    margin-top: 10px;

    img {
      width: 48px;
      height: 48px;
    }
    .score {
      color: var(--100, #fff);
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .have {
      display: flex;
      align-items: center;
      margin: 0 30px;
    }
  }
  .r1 {
    color: var(--100, #fff);
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .imgAnchor {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .nameAnchor {
    height: 50px;
    flex-shrink: 0;
    border-radius: 90px;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border: 2px solid var(--unnamed, #f35f1b);
      border-radius: 50%;
    }
    p {
      color: #fff;

      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 0 10px 0 6px;
    }
  }
}
</style>
