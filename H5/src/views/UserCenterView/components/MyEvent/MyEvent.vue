<template>
  <div class="event-img">
    <van-swipe
      ref="swipeRef"
      :autoplay="3000"
      indicator-color="#333"
      v-if="images && images.length > 0"
    >
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <!-- <img
          :src="getImg(item.appUrl, item.base)"
          width="343"
          height="60"
          @click="jumpLink(item)"
        /> -->
        <van-image class="img-item" lazy-load :src="getImg(item.appUrl)" @click="jumpLink(item)">
          <template v-slot:loading>
            <DefaultImg styleObj="height:60px"/>
          </template>
          <template v-slot:error>
            <DefaultImg />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { useRouter } from 'vue-router'
import { jumpActivity } from '@/utils/jumpActivity'
const router = useRouter()
const promotion = promotionStore()

const images = computed(() => {
  if (
    promotion.promotionData.personalCenterData &&
    promotion.promotionData.personalCenterData.length > 0
  ) {
    return promotion.promotionData.personalCenterData
  } else {
    return null
  }
})
const jumpLink = (item) => {
  jumpActivity({ event: item, router })
}
</script>

<style lang="scss" scoped>
.event-img {
  margin: 15px 0;
  border-radius: 8px;
  img {
    width: 100%;
    height: 100%;
  }
  .img-item {
    width: 100%;
    height: 100px;
    border-radius: 6px;
    overflow:hidden;
  }
}
</style>
