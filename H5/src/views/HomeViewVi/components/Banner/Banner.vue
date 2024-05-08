<template>
  <div class="banner-view">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item
        v-for="(item, idx) in images"
        :key="idx"
        @click="jumpActivity({ event: item, router })"
      >
        <img class="img-item" :src="getImg(item.appUrl)" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
import { jumpActivity } from '@/utils/jumpActivity'

const promotion = promotionStore()

const images = computed(() => {
  if (promotion.promotionData.homeViewImgList) {
    return promotion.promotionData.homeViewImgList?.sort((a, b) => a.weight - b.weight)
  } else {
    return null
  }
})
</script>

<style lang="scss" scoped>
.banner-view {
  .img-item {
    width: 345px;
    min-height: 97px;
    border-radius: 5px;
    display: block;
    margin: auto;
    margin-top: 10px;
  }
}

:deep() {
  .van-swipe__indicator--active {
    width: 10px;
    height: 6px;
    border-radius: 2px;
    background: #ff5000;
  }
}
</style>
