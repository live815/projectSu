<!-- 合营招商 -->
<template>
  <div class="VentureInvest-fix">
    <div class="VentureInvest-container">
      <div class="fc-outter-container">
        <div class="ven-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <FirstPage></FirstPage>
            </div>
            <div class="swiper-slide">
              <SecondPage></SecondPage>
            </div>
            <div class="swiper-slide">
              <ThirdPage></ThirdPage>
            </div>
          </div>
          <div class="swiper-pagination">
            <div
              class="swiper-pagination-bullet"
              :class="{ 'swiper-pagination-bullet-active': activeIndex == 0 }"
              @click="handleClick(0)"
            ></div>
            <div
              class="swiper-pagination-bullet"
              :class="{ 'swiper-pagination-bullet-active': activeIndex == 1 }"
              @click="handleClick(1)"
            ></div>
            <div
              class="swiper-pagination-bullet"
              :class="{ 'swiper-pagination-bullet-active': activeIndex == 2 }"
              @click="handleClick(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'
import ThirdPage from './components/ThirdPage.vue'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'

let VenturleSwiper = null
const activeIndex = ref(0)
onMounted(() => {
  VenturleSwiper = new Swiper('.ven-swiper', {
    slidesPerView: 'auto', // 设置每个 Slide 自动适应容器宽度
    // grabCursor: true, //光标显示手指滑动
    direction: 'vertical', //设置纵向滑动

    mouseWheel: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    } //分页
  })
  VenturleSwiper.on('slideChange', handleSlideChange)
  VenturleSwiper.enable()
})

function handleSlideChange(objSwiper) {
  activeIndex.value = objSwiper.activeIndex
}
function handleClick(val) {
  VenturleSwiper.slideTo(val, 300, true)
}
</script>
<style lang="scss" scoped>
.VentureInvest-fix {
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  z-index: 1;
  .VentureInvest-container {
    width: 100%;
    position: relative;
    min-height: 2000px;
    background-image: url('./img/bigbackground.jpg') !important;
    background-size: 100% 100%;
    .fc-outter-container {
      width: 100%;
      box-sizing: border-box;
      margin: 80px 0 0 0;
      .ven-swiper {
        width: 100%;
        height: 1000px;
        overflow: hidden;
        :deep() {
          .swiper-pagination {
            display: flex;
            flex-direction: column;
            top: 430px;
            right: 60px;
            .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              margin-bottom: 30px;
              background-color: var(-----40, rgba(255, 255, 255, 0.4));
            }
            .swiper-pagination-bullet-active {
              background: linear-gradient(to right, #ff9000, #f35f1b);
              position: relative;
            }
            .swiper-pagination-bullet-active::before {
              content: '';
              position: absolute;
              left: -4.6px;
              top: -4px;
              width: 23px;
              height: 23px;
              border-radius: 23px;
              border: 1px solid #f35f1b;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1450px) {
  .VentureInvest-container {
    zoom: 0.9;
  }
  .fc-outter-container {
    margin: 0 !important;
  }
}
</style>
