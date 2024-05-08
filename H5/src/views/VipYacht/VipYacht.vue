<template>
  <div class="vipYacht">
    <NavBar
      :title="$t('Vletter.vipYach')"
      v-if="!isCTYWebApp() && !isIOSPure() && !token"
      :isShowRight="false"
    />
    <div class="vipYacht-top">
      <video ref="videoRef" controls autoplay loop>
        <source :src="videoUrl" type="video/mp4" />
      </video>
    </div>
    <div class="vipYacht-box">
      <div class="vipYacht-box-one">
        <div class="title">— {{ $t('Vletter.privilege') }}—</div>
        <div class="text">
          <div class="text-item">{{ $t('Vletter.privilegeTip1') }}</div>
          <div class="text-item" v-html="$t('Vletter.privilegeTip2')"></div>
        </div>
      </div>
      <div class="vipYacht-box-two">
        <div class="title">— {{ $t('Vletter.flow') }} —</div>
        <div class="vipYacht-box-two-img">
          <img :src="flowImgComputed" />
        </div>
      </div>
      <div class="vipYacht-box-three">
        <div class="title">— {{ $t('Vletter.ALLjourney') }} —</div>
        <div class="vipYacht-box-three-box">
          <div class="vipYacht-box-three-carousel">
            <van-swipe
              :autoplay="5000"
              indicator-color="white"
              :initial-swipe="index"
              @change="onChange"
            >
              <van-swipe-item v-for="item in listData" :key="item.id">
                <img :src="item.img" class="img"
              /></van-swipe-item>
            </van-swipe>
          </div>
          <div class="vipYacht-box-three-title">{{ listData[index].title }}</div>
          <div class="vipYacht-box-three-text">
            {{ listData[index].text }}
          </div>
          <div class="vipYacht-box-three-img">
            <img v-for="item in 5" :key="item" src="./img/Frame.png" />
          </div>
        </div>
      </div>
      <div class="vipYacht-box-four">
        <div class="title">— {{ $t('Vletter.activity') }} —</div>
        <div class="vipYacht-box-four-box">
          <p>{{ $t('Vletter.activityTip1') }}</p>
          <p>
            {{ $t('Vletter.activityTip2') }}
          </p>
          <p>
            {{ $t('Vletter.activityTip3') }}
          </p>
          <p>{{ $t('Vletter.activityTip4') }}</p>
          <p>{{ $t('Vletter.activityTip5') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, onMounted, reactive } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import { useAppStore } from '@/stores/app'
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { token } = useMobileEvent()

const appStore = useAppStore()

const videoRef = ref(null)
const index = ref(0)
const videoUrl = import.meta.env.VITE_APP_BASE_API + '/oms-system/yacht.mp4'
const flowImgComputed = computed(() => {
  return new URL(`./img/${appStore.language}/flowImg.png`, import.meta.url).href
})

const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip3'),
    text: i18n.global.t('Vletter.privilegeTip4')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip5'),
    text: i18n.global.t('Vletter.privilegeTip6')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip7'),
    text: i18n.global.t('Vletter.privilegeTip8')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip9'),
    text: i18n.global.t('Vletter.privilegeTip10')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip11'),
    text: i18n.global.t('Vletter.privilegeTip12')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip13'),
    text: i18n.global.t('Vletter.privilegeTip14')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip15'),
    text: i18n.global.t('Vletter.privilegeTip16')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip17'),
    text: i18n.global.t('Vletter.privilegeTip18')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip19'),
    text: i18n.global.t('Vletter.privilegeTip20')
  },
  {
    id: 10,
    img: new URL('./img/img10.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip21'),
    text: i18n.global.t('Vletter.privilegeTip22')
  },
  {
    id: 11,
    img: new URL('./img/img11.png', import.meta.url).href,
    title: i18n.global.t('Vletter.privilegeTip23'),
    text: i18n.global.t('Vletter.privilegeTip24')
  }
])
const onChange = (val) => {
  index.value = val
}
// 播放视频
const playVideo = () => {
  videoRef.value.play()
}
onMounted(() => {
  playVideo()
})
</script>
<style lang='scss' scoped>
.vipYacht {
  background: rgba(21, 21, 37, 0.8);
  .vipYacht-top {
    width: 375px;
    height: 211px;
    video::-webkit-media-controls,
    video::-webkit-media-controls-panel,
    video::-webkit-media-controls-play-button,
    video::-webkit-media-controls-start-playback-button,
    video::-webkit-media-controls-time-remaining-display,
    video::-webkit-media-controls-current-time-display {
      display: none;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  .vipYacht-box {
    background-image: url('./img/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    .vipYacht-box-one,
    .vipYacht-box-two,
    .vipYacht-box-three,
    .vipYacht-box-four {
      .title {
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
        margin: 30px auto 15px;
      }
    }
    .vipYacht-box-one {
      .text {
        width: 330px;
        min-height: 52px;
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        margin: 0 auto;
        .text-item {
          display: flex;
        }
      }
    }
    .vipYacht-box-two {
      .vipYacht-box-two-img {
        width: 340px;
        height: auto;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .vipYacht-box-three {
      .vipYacht-box-three-box {
        width: 345px;
        min-height: 408px;
        flex-shrink: 0;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(20px);
        margin: 0 auto;
        overflow: hidden;
        .vipYacht-box-three-carousel {
          width: 315px;
          height: 238px;
          margin: 15px auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .vipYacht-box-three-title {
          color: #fff;
          font-family: 'PingFang SC';
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 27px;
          margin-left: 15px;
        }
        .vipYacht-box-three-text {
          width: 310px;
          min-height: 42px;
          color: rgba(255, 255, 255, 0.8);
          font-family: 'PingFang SC';
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 21px;
          margin-left: 15px;
          margin: 8px 0 15px 15px;
        }
        .vipYacht-box-three-img {
          display: flex;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          margin-left: 15px;
          align-items: center;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .vipYacht-box-four {
      .vipYacht-box-four-box {
        width: 345px;
        min-height: 296px;
        color: #fff;
        text-align: justify;
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        margin: 0 auto;
      }
    }
  }
}
</style>
