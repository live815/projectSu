<template>
  <div class="vipUpgrade-content">
    <div class="title">{{ $t('GeneralUserCenter.VIPWithdrawalLimit') }}</div>
    <div class="line"></div>
    <div class="vipUpgrade-min">
      <div class="vipUpgrade-min-item">
        <img class="img" :src="grade5" />
        <div class="vipUpgrade-min-item-right">
          <div class="title">
            <span>{{ wdTimesLimit }}</span> {{ $t('GeneralUserCenter.Times') }}
          </div>
          <div>{{ $t('GeneralUserCenter.IncreasedNumberOfWithdrawals') }}</div>
        </div>
      </div>
      <div class="vipUpgrade-min-item">
        <img class="img" :src="grade6" />
        <div class="vipUpgrade-min-item-right">
          <div class="title">
            <span>{{ wdAmountsLimit }}</span> /{{ $t('GeneralUserCenter.Day') }}
          </div>
          <div>{{ $t('GeneralUserCenter.WithdrawalLimitsIncreased') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { useSlidesStore } from '@/stores/vipSlides'
import grade5 from './img/grade5.png'
import grade6 from './img/grade6.png'
const slidesStore = useSlidesStore()
const wdTimesLimit = computed(() => {
  const activeSlide = slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]
  return activeSlide ? activeSlide.wdTimesLimit : 0
})

const wdAmountsLimit = computed(() => {
  const activeSlide = slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]
  return activeSlide ? activeSlide.wdAmountsLimit : 0
})
</script>
<style lang='scss' scoped>
.vipUpgrade-content {
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
  .vipUpgrade-min {
    display: flex;
    .vipUpgrade-min-item {
      display: flex;
      align-items: center;
      margin-right: 90px;
      .img {
        width: 65px;
        height: 50px;
        margin-right: 20px;
      }
      .vipUpgrade-min-item-right {
        color: var(--80, var(---80, rgba(255, 255, 255, 0.8)));
        font-size: 14px;
        font-weight: 400;
        .title {
          color: var(--80, rgba(255, 255, 255, 0.8));
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          margin-bottom: 14px;
          span {
            color: var(--unnamed, #f35f1b);
            font-size: 24px;
            font-style: normal;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>