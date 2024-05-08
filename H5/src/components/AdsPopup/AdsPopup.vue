<!-- @click="selectBanner(item)" -->
<template>
  <van-overlay @click.stop="showAdsPopup = false" :show="showAdsPopup">
    <div class="wrapper ads-popup-wrapper" class-name="Adspopup">
      <div class="block">
        <div class="swiper-wrapper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in images" :key="index">
              <van-image
                class="swipe-img"
                lazy-load
                :src="getImg(item.appUrl)"
                @click.stop="jumpLink(item)"
              >
                <template v-slot:loading>
                  <DefaultImg />
                </template>
                <template v-slot:error>
                  <DefaultImg />
                </template>
              </van-image>
            </van-swipe-item>
            <template #indicator="item">
              <div class="indeicator-ads">
                <div
                  :class="item.active + 1 == n ? 'active bar' : 'bar'"
                  v-for="n in item.total"
                  :key="n"
                ></div>
              </div>
            </template>
          </van-swipe>
        </div>
        <img
          src="@/assets/img/AdsCloseIcon.png"
          class="closeIcon"
          width="44"
          height="44"
          @click.stop="showAdsPopup = false"
        />
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { jumpActivity } from '@/utils/jumpActivity'
import { useRouter } from 'vue-router'
import { promotionStore } from '@/stores/promotion'
import { getImg } from '@/utils'
import { checkDailyFlag } from '@/utils/dailyFlag.js'

const showAdsPopup = ref(false)
const promotion = promotionStore()
const router = useRouter()
const images = ref([])
const getImages = () => {
  if (promotion.promotionData.AdsPopData) {
    let list = []
    promotion.promotionData.AdsPopData.forEach((item) => {
      let isAdd = true
      if (item.popupType == 1) {
        isAdd = checkDailyFlag(1, item.id)
        if (isAdd) {
          list.push(item)
        }
      } else {
        list.push(item)
      }
    })
    images.value = list
  } else {
    images.value = null
  }
}
const jumpLink = (item) => {
  if (item.jumpContent) {
    jumpActivity({ event: item, router })
  }
}

watch(
  () => promotion.promotionData.AdsPopData,
  (val) => {
    getImages()
    if (images.value && images.value.length > 0 && promotion.isShowHomeAds) {
      showAdsPopup.value = true
    } else {
      showAdsPopup.value = false
    }
  }
)
</script>

<style lang="scss" scoped>
.bar {
  width: 21px;
  height: 2px;
  border-radius: 3px;
  background-color: rgb(245, 247, 250);
}
.bar.active {
  background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
}
.indeicator-ads {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  position: absolute;
  bottom: 40px;
}

// .my-swipe {
//   border-radius: 12px;
// }
$height:calc( var(--app-height) - 150px);
.swipe-img {
  // width: 339px;
  // height: 515px;
  width: calc(339px);
  height: $height;
  max-height:512px;
  max-width:339px;
}

.wrapper.ads-popup-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 100;
  .block {
    display: block;
    // margin: auto;
    width: calc(339px);
    height: $height;
    max-height:512px;
    max-width:339px;
  }
}
.closeIcon {
  display: block;
  margin: 15px auto;
  height: 44px;
  width: 44px;
}
</style>
