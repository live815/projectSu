<template>
  <van-swipe :autoplay="3000" :show-indicators="false">
    <van-swipe-item v-for="(item, idx) in images" :key="idx" @click="jumpActivity({ event: item, router })">
      <img class="img-item" :src="getImg(item.appUrl)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import { getImg } from '@/utils'
import { promotionStore } from '@/stores/promotion'
import { useRouter } from 'vue-router'
import { jumpActivity } from '@/utils/jumpActivity'

const promotion = promotionStore()
promotion.getAdvertise()
const router = useRouter()

const images = computed(() => {
  if (promotion.promotionData.homeViewImgList) {
    return promotion.promotionData.homeViewImgList?.sort((a, b) => a.weight - b.weight)
  } else {
    return null
  }
})
</script>

<style lang="scss" scoped>
.img-item {
  width: 345px;
  min-height: 97px;
  border-radius: 5px;
  display: block;
  margin: auto;
  margin-top: 10px;
}
</style>