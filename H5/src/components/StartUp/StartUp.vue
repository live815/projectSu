<template>
  <div>
    <van-overlay :show="showStartUp" @click="demo">
      <div class="start-up-container">
        <img v-if="imageData" :src="getImg(imageData)" alt="" />
        <img v-else src="./img/starup.png" alt="" /></div
    ></van-overlay>
  </div>
</template>

<script setup>
const demo = () => {
  console.log(imageData.value)
}
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
const promotion = promotionStore()
defineProps(['showStartUp'])
const imageData = computed(() => {
  if (promotion.promotionData.startPageDate && promotion.promotionData.startPageDate.length > 0) {
    return promotion.promotionData.startPageDate[0].appUrl
  } else {
    return null
  }
})
</script>

<style lang="scss" scoped>
.start-up-container {
  width: 100vw;
  height: 100vh;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
