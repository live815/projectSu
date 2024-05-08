<template>
  <div class="carousel">
    <el-carousel
      ref="sildeCarousel"
      arrow="never"
      indicator-position="outside"
      height="320px"
      :pause-on-hover="false"
      @change="handleCarouselChange"
      :current-index="currentIndex"
    >
      <el-carousel-item v-for="item in images" :key="item">
        <img class="carouselImg" :key="item" :src="item" alt="Carousel Image" />
      </el-carousel-item>
    </el-carousel>
    <div class="swiper-containerBanner">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in advertisementList"
          :key="index"
          :class="[currentIndex * 1 === index * 1 ? 'item swiper-slide-active' : 'item']"
        >
          <div class="content_box" @click="goSlide(index)">
            <div class="icon_box">
              <div class="promo_img">
                <img :src="item.srcImg" class="el-image__inner" />
              </div>
            </div>
            <div class="content_right">
              <p class="title">{{ item.title }}</p>
              <p class="time">{{ item.content_box }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import i18n from '@/i18n'
import banner1 from '../../../assets/img/banner1.png'
import banner2 from '../../../assets/img/banner2.png'
import banner3 from '../../../assets/img/banner3.png'
import banner4 from '../../../assets/img/banner4.png'
import banner5 from '../../../assets/img/banner5.png'
import banner6 from '../../../assets/img/banner6.png'
import banner7 from '../../../assets/img/banner7.png'
import banner8 from '../../../assets/img/banner8.png'
const images = reactive([banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8])
let mySwiperBanner = null // 保存 Swiper 实例的引用
const virtualSlides = ref([]) // 用于存储虚拟 Slide 的数据
const sildeCarousel = ref()
const currentIndex = ref(0)
const advertisementList = reactive([
  {
    srcImg: new URL('../../../assets/img/banner2_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_1'),
    content_box: i18n.global.t('HomeView.Content_box_1')
  },
  {
    srcImg: new URL('../../../assets/img/banner2_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_2'),
    content_box: i18n.global.t('HomeView.Content_box_2')
  },
  {
    srcImg: new URL('../../../assets/img/banner3_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_3'),
    content_box: i18n.global.t('HomeView.Content_box_3')
  },
  {
    srcImg: new URL('../../../assets/img/banner4_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_4'),
    content_box: i18n.global.t('HomeView.Content_box_4')
  },
  {
    srcImg: new URL('../../../assets/img/banner5_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_5'),
    content_box: i18n.global.t('HomeView.Content_box_4')
  },
  {
    srcImg: new URL('../../../assets/img/banner6_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_6'),
    content_box: i18n.global.t('HomeView.Content_box_4')
  },
  {
    srcImg: new URL('../../../assets/img/banner7_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_7'),
    content_box: i18n.global.t('HomeView.Content_box_4')
  },
  {
    srcImg: new URL('../../../assets/img/banner8_1.png', import.meta.url).href,
    title: i18n.global.t('HomeView.Banner_7'),
    content_box: i18n.global.t('HomeView.Content_box_4')
  }
])
const handleCarouselChange = (index) => {
  currentIndex.value = index
}
const goSlide = (index) => {
  sildeCarousel.value.setActiveItem(index)
  currentIndex.value = index
}
onMounted(() => {
  mySwiperBanner = new Swiper('.swiper-containerBanner', {
    slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
    virtual: {
      slides: virtualSlides.value // 设置虚拟 Slide 数据
    },
    slidesPerGroup: 4, //几个为一组
    spaceBetween: '20', //边距20px
    grabCursor: true //光标显示手指滑动
    // noSwiping: true,// 禁止切换
    // autoplay: {
    //     delay: 3000,
    //     stopOnLastSlide:true
    // },
    // loop:true,//无限循环
    // loopedSlides :4,
    // direction:'horizontal',
  })
  // 添加虚拟 Slide 的数据，可以根据需要修改
  virtualSlides.value = advertisementList
  mySwiperBanner.on('slideChange', handleSlideChange)
})

const handleSlideChange = (objSwiper) => {
  // console.log(objSwiper.activeIndex,'objSwiper')
  sildeCarousel.value.setActiveItem(objSwiper.activeIndex)
  currentIndex.value = objSwiper.activeIndex
}
watch(
  () => currentIndex.value,
  (newCurrent) => {
    if (newCurrent == 3) {
      mySwiperBanner.slideNext()
    }
    if (newCurrent == images.length - 1) {
      mySwiperBanner.slidePrev()
    }
    // console.log(newCurrent)
  }
)
</script>

<style lang="scss" scoped>
.carousel {
  width: 1080px;
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
  width: 1080px;
  height: 320px;
  border-radius: 8px;
}
.swiper-containerBanner {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  z-index: 1;
  // border: 1px solid red;
}
.swiper-slide {
  width: 200px;
  // padding-top: 40px;
  // display: flex;
  // align-items: center;
  // overflow: hidden;
  // column-gap: 15px;
  .item {
    width: 100%;
    height: 44px;
    border-radius: 8px;
    margin-right: 12px;
    z-index: 99;
  }
  .content_box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
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
      width: 145px;
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
  background-color: #ff5000 !important;
}

.swiper-slide-active .bg_line {
  background-color: #ff5000 !important;
}

.swiper-slide-active .line_wrapper {
  width: 207px !important;
  transition: all 3s linear;
}
.carousel :deep() .is-active button {
  background: var(--2, #ff5000);
}
</style>
