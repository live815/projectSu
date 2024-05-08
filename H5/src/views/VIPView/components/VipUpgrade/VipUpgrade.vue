<template>
  <div class="content-card-drawing-amount">
    <div class="content-card-drawing-amount-left">
      <img :src="grade5" />
      <div class="text-box">
        <div class="titles">
          <span class="span">{{ wdTimesLimit }}</span
          >{{ $t('Vletter.Secondrate') }}
        </div>
        <div class="text">{{ $t('Vletter.tip33') }}</div>
      </div>
    </div>
    <div class="content-card-drawing-amount-right">
      <img :src="grade6" />
      <div class="text-box">
        <div class="titles">
          <span class="span">{{ wdAmountsLimit }}</span>
          <span>{{ $t('Vletter.tip34') }}</span>
        </div>
        <div class="text">{{ $t('Vletter.tip35') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlidesStore } from '@/stores/vipSlides'
import grade5 from './img/grade5.png'
import grade6 from './img/grade6.png'
const slidesStore = useSlidesStore()

const wdTimesLimit = computed(() => {
  const activeSlide = slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]
  return activeSlide?.wdAmountsLimit ? activeSlide.wdTimesLimit : 0
})

const wdAmountsLimit = computed(() => {
  const activeSlide = slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]
  return activeSlide?.wdAmountsLimit ? activeSlide.wdAmountsLimit : 0
})
</script>

<style lang="scss" scoped>
.content-card-drawing-amount {
  width: 345px;
  // height: 78px;
  margin: 0 auto;
  padding: 14px 13px;
  border-radius: 8px;
  background: #fff;
  .content-card-drawing-amount-left,
  .content-card-drawing-amount-right {
    // width: 152px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    background: #f6f7fb;
    img {
      width: 43.258px;
      height: 33px;
      margin-left: 6px;
    }
    .text-box {
      color: #999;
      font-size: 12px;
      font-weight: 400;
      margin-left: 10px;
      .titles {
        color: #000;
        margin-bottom: 6px;
        .span {
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .content-card-drawing-amount-right {
    margin-top: 14px;
  }
}
</style>
