<template>
  <div class="content-card-discount">
    <div class="content-card-discount-box">
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.sportsRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.sportsRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Sportsrebate') }}</div>
      </div>
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.casinoRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.casinoRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Liverebate') }}</div>
      </div>
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.boardGamesRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.boardGamesRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Chesscardrebate') }}</div>
      </div>
    </div>
    <div class="content-card-discount-box">
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.slotRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.slotRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Electronicrebate') }}</div>
      </div>
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.lotteryRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.lotteryRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Lotteryrebate') }}</div>
      </div>
      <div class="content-card-discount-item">
        <div class="content-card-discount-item-title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.esportsRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.esportsRatio + '%'
              : '-'
          }}
        </div>
        <div class="content-card-discount-item-text">{{ $t('Vletter.Esportsrebate') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlidesStore } from '@/stores/vipSlides'
const slidesStore = useSlidesStore()
</script>

<style lang="scss" scoped>
.content-card-discount {
  width: 345px;
  height: 168px;
  border-radius: 8px;
  background: #fff;
  padding: 20px 30px;
  margin: 0 auto;
  .content-card-discount-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content-card-discount-item {
      width: 49px;
      height: 49px;
      text-align: center;
      .content-card-discount-item-title {
        color: var(--2, #ff5000);
        font-family: DIN Alternate;
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 17px;
      }
      .content-card-discount-item-text {
        color: #666;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
      }
    }
  }
  .content-card-discount-box:last-child {
    margin-top: 30px;
  }
}
</style>
