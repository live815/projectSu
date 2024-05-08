<template>
  <div class="swipe" @click="demo">
    <van-swipe
      ref="swipeRef"
      :autoplay="3000"
      indicator-color="#333"
      v-if="images && images.length > 0"
    >
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="getImg(item.appUrl)" @click="jumpLink(item)" />
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="swipe-footer" v-else>
      <img src="./img/pay2.png" alt="" />
    </div> -->
  </div>
</template>

<script setup>
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { jumpActivity } from '@/utils/jumpActivity'
import { useRouter } from 'vue-router'
const router = useRouter()
const promotion = promotionStore()
const images = computed(() => {
  if (promotion.promotionData.paymentAdsData) {
    return promotion.promotionData.paymentAdsData
  } else {
    return null
  }
})
const jumpLink = (item) => {
  if (item.jumpContent) {
    jumpActivity({ event: item, router })
  }
}
</script>
<style lang="scss" scoped>
.swipe {
  width: 100%;
  padding: 0 16px;
  .van-swipe-item {
    height: 60px;
    width: 343px;
    border-radius: 10px;
    background: linear-gradient(4deg, #fff9f2 3.19%, #ffede5 97.01%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swipe-footer {
    width: 343px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 60px;
    }
  }
}
:deep() .van-swipe__indicators {
  /* 修改横线指示器容器的样式 */
  display: flex;
  justify-content: center;
  margin-top: 10px;
  bottom: 5px;
}

:deep() .van-swipe__indicator {
  /* 修改每个横线指示器的样式 */
  width: 12px;
  height: 2px;
  margin: 0 2px;
  border-radius: 10px;
  background-color: #333;
}
</style>
