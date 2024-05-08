<template>
  <div class="vipYacht">
    <div class="vipYacht-top">
      <iframe
        id="iframeContainer"
        :src="`${appPlayerUrl}?url=${source}&muted=${muted}`"
        allow="autoplay"
        class="video"
        frameborder="0"
        v-if="source"
      />
    </div>
    <div class="vipYacht-box">
      <div class="vipYacht-box-one">
        <div class="title">— {{ $t('GeneralUserCenter.privilege') }}—</div>
        <div class="text">
          <div class="text-item" v-html="$t('GeneralUserCenter.privilegeTip1')"></div>
        </div>
      </div>
      <div class="vipYacht-box-two">
        <div class="vipYacht-box-two-list">
          <div class="vipYacht-box-two-list-item" v-for="item in flowListData" :key="item.id">
            <div class="vipYacht-box-two-list-item-title">{{ item.title }}</div>
            <div class="circle"></div>
            <div class="vipYacht-box-two-list-item-text">{{ item.text }}</div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="vipYacht-box-three">
        <div class="title">— {{ $t('GeneralUserCenter.ALLjourney') }} —</div>

        <div class="vipYacht-box-three-box">
          <img
            class="vipYacht-box-three-carousel-left"
            src="./img/leftIcon.png"
            @click="prevSlide"
          />
          <div class="swiper-container" id="mySwiper">
            <div class="swiper-wrapper">
              <div
                v-for="(item, index) in listData"
                :key="item.id"
                :class="['swiper-slide', { active: currentSlideIndex === index }]"
                v-show="currentSlideIndex === index"
                class="swiper-slide"
              >
                <img class="vipYacht-box-three-carousel-item-left" :src="item.img" />

                <div class="vipYacht-box-three-carousel-item-right">
                  <div class="vipYacht-box-three-title">{{ item.title }}</div>
                  <div class="vipYacht-box-three-text">
                    {{ item.text }}
                  </div>
                  <div class="vipYacht-box-three-img">
                    <img v-for="item in 5" :key="item" src="./img/Frame.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <img
            class="vipYacht-box-three-carousel-right"
            src="./img/rightIcon.png"
            @click="nextSlide"
          />
        </div>
        <div class="vipYacht-box-three-list-box">
          <div class="vipYacht-box-three-list">
            <div
              class="vipYacht-box-three-list-item"
              v-for="(item, index) in listData"
              :key="item.id"
              @click="onClickItem(index)"
              :class="{ 'vipYacht-box-three-list-item-active': currentSlideIndex === index }"
            >
              <img class="img" :src="item.img" />
            </div>
          </div>
        </div>
      </div>
      <div class="vipYacht-box-four">
        <div class="title">— {{ $t('GeneralUserCenter.activity') }} —</div>
        <div class="vipYacht-box-four-box">
          <p>{{ $t('GeneralUserCenter.activityTip1') }}</p>
          <p>
            {{ $t('GeneralUserCenter.activityTip2') }}
          </p>
          <p>
            {{ $t('GeneralUserCenter.activityTip3') }}
          </p>
          <p>{{ $t('GeneralUserCenter.activityTip4') }}</p>
          <p>{{ $t('GeneralUserCenter.activityTip5') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, reactive } from 'vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { appPlayerUrl } from '@/utils/config'
const source = ref('')
const muted = ref(false) //静音播放
const flowListData = reactive([
  {
    id: 1,
    title: i18n.global.t('GeneralUserCenter.flowListDataTip1'),
    text: '01'
  },
  {
    id: 2,
    title: i18n.global.t('GeneralUserCenter.flowListDataTip2'),
    text: '02'
  },
  {
    id: 3,
    title: i18n.global.t('GeneralUserCenter.flowListDataTip3'),
    text: '03'
  },
  {
    id: 4,
    title: i18n.global.t('GeneralUserCenter.flowListDataTip4'),
    text: '04'
  },
  {
    id: 5,
    title: i18n.global.t('GeneralUserCenter.flowListDataTip5'),
    text: '05'
  }
])

const listData = reactive([
  {
    id: 1,
    img: new URL('./img/img1.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip3'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip4')
  },
  {
    id: 2,
    img: new URL('./img/img2.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip5'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip6')
  },
  {
    id: 3,
    img: new URL('./img/img3.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip7'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip8')
  },
  {
    id: 4,
    img: new URL('./img/img4.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip9'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip10')
  },
  {
    id: 5,
    img: new URL('./img/img5.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip11'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip12')
  },
  {
    id: 6,
    img: new URL('./img/img6.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip13'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip14')
  },
  {
    id: 7,
    img: new URL('./img/img7.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip15'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip16')
  },
  {
    id: 8,
    img: new URL('./img/img8.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip17'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip18')
  },
  {
    id: 9,
    img: new URL('./img/img9.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip19'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip20')
  },
  {
    id: 10,
    img: new URL('./img/img10.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip21'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip22')
  },
  {
    id: 11,
    img: new URL('./img/img11.png', import.meta.url).href,
    title: i18n.global.t('GeneralUserCenter.privilegeTip23'),
    text: i18n.global.t('GeneralUserCenter.privilegeTip24')
  }
])

const prevSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value - 1 + listData.length) % listData.length
}

const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % listData.length
}

let swiper = null // 保存 Swiper 实例的引用
const currentSlideIndex = ref(0)
onMounted(() => {
  // 播放视频
  source.value = import.meta.env.VITE_APP_BASE_API + '/oms-system/yacht.mp4'
  swiper = new Swiper('#mySwiper', {
    autoplay: {
      delay: 1000, // 自动轮播的时间间隔，单位为ms
      disableOnInteraction: false // 用户操作后是否禁止自动轮播
    },
    on: {
      slideChangeTransitionEnd: () => {
        // 更新当前轮播图索引
        currentSlideIndex.value = swiper.realIndex
      }
    }
  })
})

onUnmounted(() => {
  source.value = null
})
// 点击底部进行切换
const onClickItem = (index) => {
  currentSlideIndex.value = index
}
</script>
<style lang='scss' scoped>
.vipYacht {
  background: rgba(21, 21, 37, 0.8);
  margin: 0 -15px -20px -15px;
  .vipYacht-top {
    width: 1920px;
    height: 1080px;
    video::-webkit-media-controls,
    video::-webkit-media-controls-panel,
    video::-webkit-media-controls-play-button,
    video::-webkit-media-controls-start-playback-button,
    video::-webkit-media-controls-time-remaining-display,
    video::-webkit-media-controls-current-time-display {
      display: none;
    }
    .video {
      width: 100%;
      height: 100%;
    }
  }
  .vipYacht-box {
    background-image: url('./img/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    .vipYacht-box-one,
    .vipYacht-box-two,
    .vipYacht-box-three,
    .vipYacht-box-four {
      overflow: hidden;
      .title {
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 36px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
        margin: 108px auto 24px;
      }
    }
    .vipYacht-box-one {
      .text {
        min-height: 52px;
        color: #fff;
        font-family: 'PingFang SC';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        margin: 0 auto;
        .text-item {
          display: flex;
          justify-content: center;
        }
      }
    }
    .vipYacht-box-two {
      position: relative;
      margin-top: 80px;
      .vipYacht-box-two-list {
        width: 100%;
        display: flex;
        justify-content: center;
        .vipYacht-box-two-list-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 50px;
          .vipYacht-box-two-list-item-title {
            color: #fff;
            font-family: 'PingFang SC';
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 36px; /* 150% */
          }
          .circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #fff;
            flex-shrink: 0;
            margin: 10px 0;
          }
          .vipYacht-box-two-list-item-text {
            color: var(-----, #f35f1b);
            font-family: 'PingFang SC';
            font-size: 42px;
            font-style: normal;
            font-weight: 400;
            line-height: 63px; /* 150% */
          }
        }
      }
      .line {
        position: absolute;
        top: 50px;
        width: 1920px;
        height: 1px;
        flex-shrink: 0;
        background: rgba(255, 255, 255, 0.2);
      }
      .slide {
        /* 单个轮播项的样式 */
        opacity: 0;
        transition: opacity 0.3s;
      }

      .slide.active {
        opacity: 1;
      }
    }
    .vipYacht-box-three {
      .vipYacht-box-three-box {
        display: flex;
        align-items: center;
        justify-content: center;
        .vipYacht-box-three-carousel-left,
        .vipYacht-box-three-carousel-right {
          width: 60px;
          height: 60px;
        }
        .swiper-container {
          display: flex;
          width: 932px;
          height: 440px;
          margin: 0 24px;
          padding: 30px 15px 40px 30px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
        }

        .swiper-slide {
          display: none;
          .vipYacht-box-three-carousel-item-left {
            width: 470px;
            height: 368px;
          }
          .vipYacht-box-three-carousel-item-right {
            margin-left: 15px;
            .vipYacht-box-three-title {
              color: #fff;
              font-family: 'PingFang SC';
              font-size: 28px;
              font-style: normal;
              font-weight: 500;
              line-height: 42px; /* 150% */
              margin-left: 15px;
            }
            .vipYacht-box-three-text {
              width: 325px;
              min-height: 42px;
              color: rgba(255, 255, 255, 0.8);
              font-family: 'PingFang SC';
              font-size: 18px;
              font-style: normal;
              font-weight: 400;
              line-height: 28px;
              margin-left: 15px;
              margin: 8px 0 15px 15px;
            }
            .vipYacht-box-three-img {
              display: flex;
              width: 56px;
              height: 56px;
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
        .swiper-slide.active {
          display: flex; /* 只显示当前轮播图 */
        }
      }
      .vipYacht-box-three-list-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
      }
      .vipYacht-box-three-list {
        display: flex;
        align-items: center;
        width: 1145px;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: #4d5065 #171a2f;
        cursor: pointer;
        .vipYacht-box-three-list-item {
          width: 260px;
          height: 166px;
          margin: 0 10px;
          border-radius: 15px;
          flex-shrink: 0;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .vipYacht-box-three-list-item-active {
          border: 10px solid #695761;
          width: 280px;
          height: 186px;
          flex-shrink: 0;
          border-radius: 10px;
        }
      }
      .vipYacht-box-three-list::-webkit-scrollbar {
        height: 16px;
      }

      .vipYacht-box-three-list::-webkit-scrollbar-track {
        background: #171a2f;
      }

      .vipYacht-box-three-list::-webkit-scrollbar-thumb {
        background-color: #4d5065;
        border-radius: 10px;
        height: 8px;
      }

      .vipYacht-box-three-list::-webkit-scrollbar-corner {
        background: transparent;
      }
    }
    .vipYacht-box-four {
      .vipYacht-box-four-box {
        width: 1100px;
        min-height: 220px;
        color: #fff;
        color: #fff;
        text-align: justify;
        font-family: 'PingFang SC';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 44px;
        margin: 16px auto 122px;
      }
    }
  }
}
</style>
