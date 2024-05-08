<template>
  <div class="popup-ads-outter">
    <el-carousel indicator-position="none" arrow="never" ref="swip" @change="changeSwip">
      <el-carousel-item v-for="(item, index) in popupAdsData" :key="index">
        <el-image class="img" :src="getImgUrl(item.webUrl)" alt="" @click="toActive(item)">
          <template #placeholder>
            <DefaultImg />
          </template>
          <template #error>
            <DefaultImg />
          </template>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="bar-list-row">
      <div
        :class="currentIndex == index ? 'bar active' : 'bar'"
        v-for="(item, index) in popupAdsData"
        :key="index"
        @click="changeImgIndex(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { jumpActivity } from '@/utils/jumpActivity'
import { getImgUrl } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  popupAdsData: Array
})
const swip = ref(null)
const currentIndex = ref(0)
const changeSwip = (index) => {
  currentIndex.value = index
}
const changeImgIndex = (index) => {
  currentIndex.value = index
  swip.value.setActiveItem(index)
}
// 跳转页面
const toActive = (event) => {
  jumpActivity({ event, router })
}
</script>

<style lang="scss" scoped>
.popup-ads-outter {
  position: relative;
  width: 750px;
  height: 500px;
  border-radius: 12px;
}
.img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.bar-list-row {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 8px;
  top: -20px;
  width: 100%;
  height: 6px;
}
.bar {
  width: 18px;
  height: 6px;
  border-radius: 12px;
  background-color: rgb(209, 199, 191);
  cursor: pointer;
}
.bar.active {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
}
:deep() {
  .el-carousel__container {
    height: 500px;
  }
}
</style>
