<template>
  <div class="swiperBox">
    <swiper
      class="swiper-container"
      direction="horizontal"
      :loop="false"
      :autoplay="false"
      slidesPerView="auto"
      :spaceBetween="0"
      :centeredSlides="true"
      @slideChange="onSlideChange"
    >
      <template v-if="vipLevelsList.length">
        <swiper-slide v-for="(item, index) in vipLevelsList" :key="item.vipLevel">
          <div class="swiper-item" :style="{ backgroundImage: `url(${imgBgPath(index)}` }">
            <div class="swiper-item-box">
              <div class="swiper-item-box-left">
                <div class="text">
                  {{
                    user.userInfo.vipLevel >= index
                      ? $t('Vletter.Unlocked')
                      : $t('Vletter.Tobeunlocked')
                  }}
                </div>
                <div class="vip">
                  <span class="span">V{{ item.vipLevel }}</span
                  ><span>{{ $t('Vletter.member') }}</span>
                </div>
              </div>
              <div class="swiper-item-box-right">
                <img :src="imgPath(index)" />
              </div>
            </div>
            <div class="swiper-item-title">
              <div
                class="level"
                v-if="
                  user.userInfo.vipLevel == 0 &&
                  index == 0 &&
                  slidesStore.vipReward?.currentDpBet == 0
                "
              >
                <span>{{ $t('Vletter.Finish') }}</span>
                <span class="span-two" @click="router.push('/deposit')">{{
                  $t('Vletter.InitialDeposit')
                }}</span>
                <span>{{ $t('Vletter.InitialDepositLast') }}</span>
              </div>
              <template v-else>
                <div
                  class="level"
                  v-if="item.vipLevel == user.userInfo.vipLevel && item.vipLevel > 1"
                >
                  {{ $t('Vletter.tip30')
                  }}<span class="span">{{ slidesStore.relegationLeastDay }}</span
                  ><span class="spans"> {{ $t('Vletter.tip31') }}</span>
                </div>
                <div class="level" v-else>{{ $t('Vletter.tip30') }}<span class="span">-</span></div>
              </template>
            </div>
            <div
              class="swiper-item-progress"
              :class="{ 'swiper-item-progress-footer': slidesStore.vipReward?.currentDpBet }"
            >
              <div class="swiper-item-progress-left">vip{{ index }}</div>
              <div class="swiper-item-progress-min">
                <div class="swiper-item-progress-min-box">
                  <div class="swiper-item-progress-min-box-child">
                    <div
                      v-for="index in totalDots"
                      :key="index"
                      class="dot"
                      :class="{ highlight: index <= highlightCount }"
                    ></div>
                  </div>
                </div>

                <div class="pointer">
                  <div class="text">{{ onComputedProgressPercentage }}%</div>
                  <img class="img" :src="pointer" />
                </div>
              </div>
              <div class="swiper-item-progress-right" v-if="index < 11">vip{{ index + 1 }}</div>
            </div>
            <div class="swiper-item-footers"></div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { computed, nextTick, watch } from 'vue'
import pointer from './img/pointer.png'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const slidesStore = useSlidesStore()
const router = useRouter()
const user = useUserStore()

const images = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

// 滑动activeIndex发生改变
const onSlideChange = (event) => {
  const swiper = event.swiper
  slidesStore.changeSlide(event.activeIndex)
  slidesStore.getMemberRightList(slidesStore.activeSlideIndex)
  if (swiper) {
    if (slidesStore.activeSlideIndex === 0) {
      // 当前轮播为第一个，禁止左滑并隐藏第十二个
      swiper.allowSlidePrev = false
      hideLastSlide(swiper)
    } else if (slidesStore.activeSlideIndex === images.value.length - 1) {
      // 当前轮播为最后一个，禁止右滑并隐藏第一个
      swiper.allowSlideNext = false
      hideFirstSlide(swiper)
    } else {
      // 恢复左右滑动
      swiper.allowSlidePrev = true
      swiper.allowSlideNext = true
      showAllSlides(swiper)
    }
  }
}

// 引用静态图片
const imgPath = (index) => {
  return new URL(`./img/v${index}.png`, import.meta.url).href
}

// 引入静态背景图
const imgBgPath = (index) => {
  return new URL(`./img/vip-${index}.png`, import.meta.url).href
}
const hideFirstSlide = (swiper) => {
  const firstSlide = swiper.slides[0]
  if (firstSlide) {
    firstSlide.style.display = 'none'
  }
}

const hideLastSlide = (swiper) => {
  const lastSlide = swiper.slides[swiper.slides.length - 1]
  if (lastSlide) {
    lastSlide.style.display = 'none'
  }
}

const showAllSlides = (swiper) => {
  swiper.slides.forEach((slide) => {
    slide.style.display = 'block'
  })
}

// 总共的圆点数量
const totalDots = ref(53)

// 计算高亮圆点数量的计算属性
const highlightCount = computed(() => {
  const calculatedCount = Math.round((onComputedProgressPercentage.value / 100) * totalDots.value)
  // 确保高亮圆点数量不超过总共的圆点数量
  return Math.min(calculatedCount, totalDots.value)
})

// 进度条的百分比
const onComputedProgressPercentage = computed(() => {
  const activeIndex = slidesStore.getActiveSlideIndex
  const vipLevel = slidesStore.vipLevelsList[activeIndex]
  if (!vipLevel) {
    return 0
  }

  if (user.userInfo.vipLevel == vipLevel.vipLevel) {
    if (user.userInfo.vipLevel == 0) {
      const dpBetPercentage =
        slidesStore.vipReward?.currentDpBet >= vipLevel.upgradeLeastDp ? 100 : 0
      return dpBetPercentage
    } else {
      const upgradeLeastDp = slidesStore.vipReward?.upgradeLeastDp
        ? slidesStore.vipReward?.upgradeLeastDp
        : 0
      const upgradeLeastTurnover = slidesStore.vipReward?.upgradeLeastTurnover
        ? slidesStore.vipReward?.upgradeLeastTurnover
        : 0
      const deposit = (slidesStore.vipReward?.currentDpBet / upgradeLeastDp) * 1
      const upGradeleast = (slidesStore.vipReward?.currentUpgradeBet / upgradeLeastTurnover) * 1
      let progressPercentage = 0
      if (deposit >= 1 && upGradeleast >= 1) {
        progressPercentage = 100
      } else if (deposit >= 1 && upGradeleast < 1) {
        progressPercentage = 50 + upGradeleast * 50
      } else if (deposit < 1 && upGradeleast >= 1) {
        progressPercentage = 50 + deposit * 50
      } else {
        progressPercentage = deposit * 50 + upGradeleast * 50
      }
      return `${progressPercentage.toFixed(2)}`
      // const dpBetPercentage =
      //   slidesStore.vipReward?.currentDpBet >= vipLevel.upgradeLeastDp ? 33.33 : 0
      // const upgradeBetPercentage =
      //   slidesStore.vipReward?.currentUpgradeBet >= vipLevel.upgradeLeastTurnover ? 33.33 : 0
      // const relBetPercentage =
      //   slidesStore.vipReward?.currentRelBet >= vipLevel.relegationLeastTurnover ? 33.33 : 0
      // const totalPercentage = dpBetPercentage + upgradeBetPercentage + relBetPercentage
      // return totalPercentage === 99.99 ? 100 : totalPercentage
    }
  } else if (user.userInfo.vipLevel > vipLevel.vipLevel) {
    return 100
  } else {
    return 0
  }
})

const pointerLeftOffset = computed(() => {
  if (onComputedProgressPercentage.value > 66) {
    return `${onComputedProgressPercentage.value - 1}%`
  }
  // 根据进度条的百分比来计算新的left值
  return `${onComputedProgressPercentage.value}%`
})

// 更新CSS变量的值
const updatePointerLeftOffset = () => {
  if (onComputedProgressPercentage.value > 0) {
    document.documentElement.style.setProperty('--pointer-left-offset', pointerLeftOffset.value)
  } else {
    document.documentElement.style.setProperty('--pointer-left-offset', '6.5%') // Replace '10%' with the desired value
  }
}

// vip等级信息
const vipLevelsList = computed(() => {
  return slidesStore.vipLevelsList
})
// 在组件加载后执行设置指针位置的操作
onMounted(() => {
  nextTick(() => {
    const swiper = document.querySelector('.swiper-container') // 根据 Swiper 容器的类名选择元素
    setTimeout(() => {
      if (swiper && typeof slidesStore.getActiveSlideIndex === 'number') {
        swiper.swiper.slideTo(slidesStore.getActiveSlideIndex) // 将 Swiper 设置到指定的活动索引
      }
    }, 500)
    slidesStore.getMemberRightList(user.userInfo.vipLevel)

    updatePointerLeftOffset()
  })
})
// 必须在async await 语法前注册onUnmounted钩子
onUnmounted(() => {
  // slidesStore.resetSlide()
})

// 监听进度条变化，更新指针位置
watch(onComputedProgressPercentage, updatePointerLeftOffset)
</script>
<style lang="scss" scoped>
.swiperBox {
  position: absolute;
  top: 210px;
  left: 0;
  right: 0;
  width: 100%;
  height: 166px;
  margin: 0 auto;
  box-sizing: border-box;
}
.swiper-slide {
  width: 85%;
  height: 166px;
  margin: 0 3px;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease-in-out;
}
.swiper-slide-prev {
  transform: scale(0.95);
}
.swiper-slide-next {
  transform: scale(0.95);
}
.swiper-item {
  overflow: hidden;
  border-radius: 10px;
  .swiper-item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .swiper-item-box-left {
      .text {
        margin: 10px 0 0 13px;
        min-width: 44px;
        height: 18px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
        line-height: 18px;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);

        font-size: 12px;
        font-style: normal;
      }
      .vip {
        white-space: nowrap;
        margin: 15px 0 10px 0;
        .span {
          margin-left: 15px;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          font-family: HYYaKuHeiW;
          font-size: 30px;
          font-style: normal;
          font-weight: 400;
        }
        span {
          color: rgba(255, 255, 255, 0.9);
          text-align: center;

          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          margin-left: 8px;
        }
      }
    }
    .swiper-item-box-right {
      width: 85px;
      height: 85px;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper-item-title {
    .level {
      margin-left: 15px;
      color: rgba(255, 255, 255, 0.9);

      font-size: 12px;
      font-weight: 400;
      height: 20px;
      display: flex;
      align-items: center;
      .span-one {
        color: var(--2, #ff5000);
        font-size: 20px;
        font-weight: 600;
      }
      .span-two {
        color: var(--2, #ff5000);
        font-size: 12px;
        font-weight: 600;
        text-decoration-line: underline;
      }
      .span {
        margin-left: 5px;
        color: var(--1, #ff9000);
        font-size: 20px;
        font-weight: 600;
      }
      .spans {
        color: var(--1, #ff9000);
        font-size: 12px;
      }
    }
  }
  .swiper-item-progress {
    display: flex;
    align-items: center;

    margin: 23px 0 3px 15px;
    .swiper-item-progress-left,
    .swiper-item-progress-right {
      width: 31px;
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
    .swiper-item-progress-min {
      position: relative;
      margin: 0 5px;
      width: 215px;
      height: 6px;
      .swiper-item-progress-min-box {
        display: flex;
        align-items: center;
        padding: 0 3px;
        width: 100%;
        height: 100%;
        border-radius: 60px;
        background: rgba(255, 255, 255, 0.1);
        position: relative;
      }
      .swiper-item-progress-min-box-child {
        display: flex;
        justify-content: space-between; /* 使用Flexbox布局 */
        box-sizing: border-box;
      }
      .dot {
        width: 3px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        margin-right: 1px;
        box-sizing: border-box;
        transition: background 0.3s;
      }

      .dot.highlight {
        background: rgba(255, 255, 255, 0.7);
      }
      .pointer {
        position: absolute;
        top: -24px;
        left: calc(-18px + var(--pointer-left-offset, 0px)); /* 使用CSS变量来控制left值 */
        text-align: center;
        .text {
          color: rgba(255, 255, 255, 0.7);

          font-size: 10px;
        }
        .img {
          width: 6px;
          height: 8px;
        }
      }
    }

    .swiper-item-progress-right {
      margin-right: 16px;
    }
  }
  .swiper-item-footers {
    width: 152px;
    height: 20px;
  }
}
</style>
