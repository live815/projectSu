<template>
  <div class="swiper-wrapper">
    <van-swipe :autoplay="5000" height="auto" v-if="images && images.length" lazy-render>
      <van-swipe-item v-for="(item, idx) in images" :key="idx">
        <div class="img-bg" @click="jumpLink(item)">
          <van-image class="img-item" lazy-load :src="getImg(item.appUrl)">
            <template v-slot:loading>
              <DefaultImg/>
            </template>
            <template v-slot:error>
              <DefaultImg/>
            </template>
          </van-image>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { jumpActivity } from '@/utils/jumpActivity'
const promotion = promotionStore()
const router = useRouter()
const images = computed(() => {
  if (promotion.promotionData.homeViewImgList) {
    return promotion.promotionData.homeViewImgList?.sort((a, b) => a.weight - b.weight)
  } else {
    return null
  }
})
const jumpLink = (item) => {
  jumpActivity({ event: item, router })
}
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  height: 155px;
  overflow: hidden;
  .van-swipe {
    .img-bg {
      height: 155px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 20px;
        width: 100%;
        @include linear-gradient(180deg, transparent, #ecf2fe);
      }
    }
  }
  :deep() {
    .van-swipe__indicators {
      position: absolute;
      bottom: 5px;
    }
    .van-swipe__indicator {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #333;
    }
    .van-swipe__indicator--active {
      width: 10px;
      height: 4px;
      border-radius: 2px;
      background: #ff5000;
    }
  }
}
.default-img {
  width: 100%;
  height: 170px;
}
.img-item {
  width: 100%;
  height: 100%;
}
</style>
