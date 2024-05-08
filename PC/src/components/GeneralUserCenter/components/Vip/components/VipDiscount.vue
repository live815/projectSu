<template>
  <div class="vipDiscount-content">
    <div class="title">{{$t('GeneralUserCenter.VIPoffer')}}</div>
    <div class="line"></div>
    <div class="vipDiscount-min">
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.sportsRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.sportsRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.SportsRebate')}}</div>
      </div>
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.casinoRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.casinoRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.LiveRebate')}}</div>
      </div>
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.boardGamesRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.boardGamesRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.PokerRebate')}}</div>
      </div>
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.slotRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.slotRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.ElectronicRebate')}}</div>
      </div>
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.lotteryRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.lotteryRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.LotteryRebate')}}</div>
      </div>
      <div class="vipDiscount-min-item">
        <div class="title">
          {{
            slidesStore.vipRebates[slidesStore.activeSlideIndex]?.esportsRatio
              ? slidesStore.vipRebates[slidesStore.activeSlideIndex]?.esportsRatio + '%'
              : '-'
          }}
        </div>
        <div>{{$t('GeneralUserCenter.GamingRebate')}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlidesStore } from '@/stores/vipSlides'
const slidesStore = useSlidesStore()
</script>
<style lang='scss' scoped>
.vipDiscount-content {
  
  width: 1240px;
  margin: 30px auto 0;
  .title {
    color: var(--100, #fff);
    font-size: 20px;
    font-weight: 500;
  }
  .line {
    width: 1240px;
    height: 1px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.2);
    margin: 12px 0 26px 0;
  }
  .vipDiscount-min {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 1240px;
    height: 100px;
    border-radius: 10px;
    background: var(--unnamed, #1d223c);
    .vipDiscount-min-item {
      color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      text-align: center;
      .title {
        color: var(--2, #ff5000);
        font-size: 34px;
        font-weight: 700;
        margin-bottom: 20px;
      }
    }
  }
}
</style>