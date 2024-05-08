<template>
  <div class="carousel">
    <el-carousel
      ref="sildeCarousel"
      arrow="never"
      indicator-position="none"
      height="370px"
      :pause-on-hover="true"
      @change="handleCarouselChange"
      :current-index="currentIndex"
    >
      <el-carousel-item v-for="item in bannerData" :key="item">
        <el-image
          class="carouselImg"
          :src="getImgUrl(item.webUrl)"
          alt="Carousel Image"
          @click="toActive(item)"
          loading="lazy"
        >
          <template #placeholder>
            <DefaultImg />
          </template>
          <template #error>
            <DefaultImg />
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="left_progress"></div>
    <div class="right_swipe">
      <div
        :class="[currentIndex == index ? 'item swiper-slide-active' : 'item']"
        v-for="(item, index) in bannerData"
        :key="index"
      >
        <div class="content_box" @click="goSlide(index)">
          <!-- 点 线条 -->
          <div class="dot_line">
            <div class="dot"></div>
            <div class="line_wrapper">
              <div class="bg_line"></div>
            </div>
          </div>
          <!-- 图片 -->
          <div class="icon_box">
            <div class="promo_img">
              <img :src="getImgUrl(item.webSmallUrl, item.base)" class="el-image__inner" />
            </div>
          </div>
          <!-- 文案 -->
          <div class="content_right">
            <p class="title">{{ item.title }}</p>
            <p class="time">{{ item.intro }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { promotionStore } from '@/stores/promotion'
import { jumpActivity } from '@/utils/jumpActivity'
import { getImgUrl } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const promotion = promotionStore()
onMounted(() => {
  promotion.getAdvertise()
})
const bannerData = computed(() => {
  return promotion.promotionData.homeViewImgList?.sort((a, b) => a.weight - b.weight)
})
const handleCarouselChange = (index) => {
  currentIndex.value = index
}
const sildeCarousel = ref()
const currentIndex = ref(0)
const goSlide = (index) => {
  sildeCarousel.value.setActiveItem(index)
  currentIndex.value = index
}

// 跳转页面
const toActive = (event) => {
  jumpActivity({ event, router })
}
</script>

<style lang="scss" scoped>
.carousel {
  // width: 1080px;
  width: 1320px;
  // height: 424px;
  // overflow: hidden;
  position: relative;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 1s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
.carouselImg {
  width: 1320px;
  height: 370px; //320px;
  border-radius: 8px;
}
.left_progress {
  height: 1px;
  width: 1320px;
  background: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  border-radius: 1px;
  position: absolute;
  margin-top: 15px;
  // z-index: 100;
}
.right_swipe {
  width: 100%;
  padding-top: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  column-gap: 12px;
  .item {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s linear;
    // margin-right: 12px;
    z-index: 99;
  }
  .content_box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .dot_line {
    position: absolute;
    top: -29px;
    left: 0;
    // width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #434054;
  }
  .line_wrapper {
    position: absolute;
    border-radius: 4px;
    height: 2px;
    width: 0;
    left: 50%;
    top: 50%;
  }
  .bg_line {
    height: 100%;
    width: 100%;
    background: #434054;
  }
  .icon_box {
    opacity: 0.7;
    width: 44px;
    height: 44px;
    margin-right: 8px;
    border-radius: 4px;
    img {
      width: 44px;
      height: 44px;
      border-radius: 4px;
    }
  }
  .promo_img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .content_right {
    opacity: 0.7;
    height: 48px;
    color: #fff;
    font-weight: regular;
    font-size: 12px;
    .title {
      font-size: 14px;
      margin-bottom: 4px;
      line-height: 21px;
    }
    .time {
      color: hsla(0, 0%, 100%, 0.6);
      font-weight: regular;
      font-size: 12px;
      line-height: 18px;
      width: 143.2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
    }
  }
}

.swiper-slide-active .content_right,
.swiper-slide-active .icon_box {
  opacity: 1 !important;
}

.swiper-slide-active .dot {
  opacity: 1;
  background-color: #f35f1b !important;
}

.swiper-slide-active .bg_line {
  background-color: #f35f1b !important;
}

.swiper-slide-active .line_wrapper {
  width: 207px !important;
  transition: all 3s linear;
}
.item :hover > div {
  color: #fff !important;
  opacity: 1;
}
</style>
