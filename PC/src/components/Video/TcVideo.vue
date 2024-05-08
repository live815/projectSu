<template>
  <!-- <img @click="onImageClick" @dragstart="onDragStart"  @dragover.prevent  
        :src="getImgUrl(liveStore.liveRoom.frontCoverImage)"
        v-if="showCover & props.anchorType==0 && liveStore.liveRoom.frontCoverImage" class="imgBgVideo" 
        :style="{width:`${props.width}px`,height:`${props.height}px`}"
    /> -->
  <!-- 付费直播 -->
  <div
    class="payMoney"
    :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    v-if="
      liveStore.liveRoom.viewPayAmount > 0 &&
      payStatus &&
      !(liveStore.liveRoom.presenterId == user.userInfo.id) &&
      user.userInfo.role !== 2
    "
  >
    <LivePay
      v-if="
        liveStore.liveRoom.viewPayAmount > 0 &&
        payStatus &&
        !(liveStore.liveRoom.presenterId == user.userInfo.id) &&
        user.userInfo.role !== 2
      "
      @paySuccess="paySuccess"
    />
  </div>
  <!-- <video id="player-container-id" :width="props.width" :height="props.height" preload="auto" playsinline
    webkit-playsinline></video> -->
  <iframe
    id="iframeContainer"
    :src="`${appPlayerUrl}?url=${source}&muted=${muted}&controls=${controls}&language=${language}&loop=${loop}`"
    :width="props.width"
    :height="props.height"
    allow="autoplay"
    allowfullscreen="true"
    frameborder="0"
    v-if="source"
  />
</template>
<script setup>
import { onUnmounted, onMounted } from 'vue'
import { appPlayerUrl } from '@/utils/config'
import LivePay from '@/components/LivePay/LivePay.vue'
import { useLiveStore } from '@/stores/liveBroadcast'
import { useUserStore } from '@/stores/user.js'
import { getIsFee } from '@/api/liveBroadcast'
import { getToken } from '@/utils/cache'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const liveStore = useLiveStore()
const user = useUserStore()
const payStatus = ref(true) //是否支付
const source = ref('')
const muted = ref(true) //静音播放
const controls = ref(true) //显示按键
const emit = defineEmits(['startPlay'])
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
  },
  loop: {
    type: Boolean,
    default: true
  }
})
const player = ref(null)
onMounted(() => {
  // const Button = TCPlayer.getComponent('Button')
  // const BigPlayButton = TCPlayer.getComponent('BigPlayButton')
  // BigPlayButton.prototype.createEl = function () {
  //   var el = Button.prototype.createEl.call(this)
  //   let _html =
  //     '<button class="btnPlay"><svg t="1644397862160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="64" height="64"><path d="M298.666667 247.04V682.666667a42.666667 42.666667 0 0 1-85.333334 0V170.666667a42.666667 42.666667 0 0 1 65.024-36.352l554.666667 341.333333a42.666667 42.666667 0 0 1 0 72.704l-554.666667 341.333333a42.666667 42.666667 0 0 1-44.714666-72.704L729.258667 512 298.666667 247.04z" p-id="3096" fill="#ffffff"></path></svg></button>'

  //   el.appendChild(
  //     TCPlayer.dom.createEl('div', {
  //       className: 'vjs-button-icon',
  //       innerHTML: _html
  //     })
  //   )
  //   return el
  // }
  // player.value = TCPlayer('player-container-id', {
  //   sources: [
  //     {
  //       src: props.anchorType == 1 ? props.anchorUrl : liveStore.liveRoom.webrtcPullUrl
  //     }
  //   ],
  //   licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1320778720_1/v_cube.license',
  //   autoplay: true,
  //   muted:true,
  //   volume: 0.5
  // })
  source.value = props.anchorType == 1 ? props.anchorUrl : liveStore.liveRoom.webrtcPullUrl
  let isLogin = getToken()
  if (liveStore.liveRoom.viewPayAmount > 0 && isLogin) {
    getIsPay()
  }
})
// const initPlayViedo = () => {
//   console.log('initPlayViedo',player.value)
//   player.value = TCPlayer('player-container-id', {
//     sources: [
//       {
//         src: props.anchorType == 1 ? props.anchorUrl : liveStore.liveRoom.webrtcPullUrl
//       }
//     ],
//     licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1320778720_1/v_cube.license',
//     autoplay: true,
//     volume: 0.5
//   })
//   console.log(player.value,'之后')
// }
watch(
  () => liveStore.liveRoom.webrtcPullUrl,
  (webrtcPullUrl, oldWebrtcPullUrl) => {
    console.log(webrtcPullUrl, oldWebrtcPullUrl, 'prevWebrtcPullUrl', liveStore.liveRoom.status)
    if (liveStore.liveRoom.status == 2) {
      // console.log("jinliamei1")
      // player.value && player.value.src(webrtcPullUrl)
      source.value = webrtcPullUrl
    }
  }
)
watch(
  () => liveStore.liveRoom.viewPayAmount,
  (viewPayAmount) => {
    let isLogin = getToken()
    console.log(viewPayAmount, 'viewPayAmount', isLogin)
    if (viewPayAmount > 0 && isLogin) {
      getIsPay()
    }
  }
)
watch(
  () => user.userInfo.userName,
  (newName) => {
    if (newName) {
      if (liveStore.liveRoom.viewPayAmount > 0) {
        getIsPay()
      }
    }
  }
)
//支付成功回调
const paySuccess = () => {
  getIsPay()
}
//查询是否付费
const getIsPay = async () => {
  const data = {
    liveStreamId: liveStore.liveRoom.id,
    memberId: user.userInfo.id
  }
  try {
    let res = await getIsFee(data)
    payStatus.value = !res.data
  } catch (e) {
    console.log(e)
  }
}
onUnmounted(() => {
  console.log('销毁pplayer')
  if (player.value) {
    player.value.dispose()
    player.value = null
  }
})
window.addEventListener('message', function (event) {
  if (event.data === 'startPlay') {
    emit('startPlay')
  }
})
const language = computed(() => (appStore.language === 'zh-cn' ? 'zh-CN' : 'en'))
</script>

<style lang="scss" scoped>
#iframeContainer {
  object-fit: fill;
}
.imgBgVideo {
  position: absolute;
  z-index: 1;
  cursor: pointer;
}

:deep() .btnPlay {
  cursor: pointer;
  z-index: 10;
}

#player-container-id {
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
    line-height: 12px;
    /* 50% */
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

.marginTop {
  margin-top: 73px;
}

.payMoney {
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);

  .payMain {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  }

  .lock {
    display: flex;
    width: 80px;
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 40px;
    background: rgba(0, 0, 0, 0.3);
  }

  .pay1 {
    color: var(--unnamed, #f35f1b);

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    margin-top: 20px;
  }

  .pay2 {
    color: var(--100, #fff);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 10px 0;
  }

  .pay3 {
    color: var(--100, #fff);

    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .pay4 {
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .pay5 {
    width: 300px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 6px;
    background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
    color: #fff;
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
