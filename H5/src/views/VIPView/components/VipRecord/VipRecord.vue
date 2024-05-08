<template>
  <div class="content-card-top" v-if="slidesStore.getActiveSlideIndex > 0">
    <div class="content-card-top-item">
      <div class="content-card-top-item-left">{{ $t('Vletter.tip5') }}</div>
      <div class="content-card-top-item-right">
        <span>{{
          slidesStore.vipReward?.currentDpBet
            ? toFormatNumber(slidesStore.vipReward?.currentDpBet)
            : 0
        }}</span
        >/
        {{
          slidesStore.vipReward?.upgradeLeastDp
            ? toFormatNumber(slidesStore.vipReward?.upgradeLeastDp)
            : 0
        }}
      </div>
    </div>
    <div class="content-card-top-item">
      <div class="content-card-top-item-left">{{ $t('Vletter.Effectiveflow') }}</div>
      <div class="content-card-top-item-right">
        <span>{{
          slidesStore.vipReward?.currentUpgradeBet
            ? toFormatNumber(slidesStore.vipReward?.currentUpgradeBet)
            : 0
        }}</span
        >/{{
          slidesStore.vipReward?.upgradeLeastTurnover
            ? toFormatNumber(slidesStore.vipReward?.upgradeLeastTurnover)
            : 0
        }}
      </div>
    </div>
    <div class="content-card-top-item" v-if="slidesStore.getActiveSlideIndex > 1">
      <div class="content-card-top-item-left">{{ $t('Vletter.Relegaturnover') }}</div>
      <div class="content-card-top-item-right">
        <span>{{
          slidesStore.vipReward?.currentRelBet
            ? toFormatNumber(slidesStore.vipReward?.currentRelBet)
            : 0
        }}</span
        >/{{
          slidesStore.vipReward?.relegationLeastTurnover
            ? toFormatNumber(slidesStore.vipReward?.relegationLeastTurnover)
            : 0
        }}
      </div>
    </div>
    <div class="content-card-top-footer">
      <div class="content-card-top-footer-left" @click="router.push('/deposit')">
        {{ $t('Vletter.Depositnow') }}
      </div>
      <div class="content-card-top-footer-right" @click="router.push('/sports')">
        {{ $t('Vletter.gotobet') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlidesStore } from '@/stores/vipSlides'
import { useRouter } from 'vue-router'
import { toFormatNumber } from '@/utils'

const router = useRouter()
const slidesStore = useSlidesStore()
</script>

<style lang="scss" scoped>
.content-card-top {
  width: 320px;
  // height: 209px;
  flex-shrink: 0;
  border-radius: 0px 0px 10px 10px;
  background: #fff;
  padding: 10px 12px 20px 12px;
  margin: 0 auto;
  .content-card-top-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    .content-card-top-item-left {
      color: #111;
    }
    .content-card-top-item-right {
      color: #666;
      font-weight: 600;
      span {
        color: var(--2, #ff5000);
        font-weight: 600;
      }
    }
  }
  .content-card-top-footer {
    display: flex;
    align-items: center;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    .content-card-top-footer-left {
      width: 155px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #6f4200;
      border-radius: 80px 0px 0px 80px;
      background: linear-gradient(93deg, #fed99a 27.5%, #fecc82 74.69%);
    }
    .content-card-top-footer-right {
      width: 155px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 0px 80px 80px 0px;
      background: linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%);
    }
  }
}
</style>
