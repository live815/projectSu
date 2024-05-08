<template>
  <!-- 领取提示弹窗 -->
  <CPopup ref="CPopupDom">
    <div class="popup-top">
      <div class="title">{{ getTitle() }}</div>
      <div class="text">
        {{ getDayStr() }}
      </div>
    </div>
    <div class="popup-content">
      <div class="popup-content-item">
        <div class="popup-content-item-left">
          <div>
            {{ getDepositTitle() }}
          </div>
          <div class="titles">
            <span> {{ getCurrentRewardDp() }}</span>
            /{{ getLeastDp() }}
          </div>
        </div>
        <!-- <template v-if="isDepositCompleted()">
          <div class="popup-content-item-right">{{ $t('Vletter.completed') }}</div>
        </template>
        <template v-else>
          <div class="popup-content-item-right heightTitle" @click="router.push('/deposit')">
            {{ $t('Vletter.tocomplete') }}
          </div>
        </template> -->
      </div>
      <div class="popup-content-item">
        <div class="popup-content-item-left">
          <div>
            {{ getTurnoverTitle() }}
          </div>
          <div class="titles">
            <span> {{ getCurrentRewardTu() }}</span>
            / {{ getLeastTurnover() }}
          </div>
        </div>
        <!-- <template v-if="isTurnoverCompleted()">
          <div class="popup-content-item-right">{{ $t('Vletter.completed') }}</div>
        </template>
        <template v-else>
          <div class="popup-content-item-right heightTitle" @click="router.push('/sports')">
            {{ $t('Vletter.tocomplete') }}
          </div>
        </template> -->
      </div>
    </div>
  </CPopup>
</template>

<script setup>
import { ref } from 'vue'
import CPopup from '@/components/CPopup/Cpopup'
import { useSlidesStore } from '@/stores/vipSlides'
import { useRouter } from 'vue-router'
import { toFormatNumber } from '@/utils'
import i18n from '@/i18n'

const router = useRouter()
const slidesStore = useSlidesStore()
// 计算标题
const getTitle = () => {
  return index.value === 4 ? i18n.global.t('Vletter.tip19') : i18n.global.t('Vletter.tip20')
}

// 计算天数字符串
const getDayStr = () => {
  return index.value === 4 ? slidesStore.vipReward?.monthDayStr : slidesStore.vipReward?.weekDayStr
}

// 计算存款标题
const getDepositTitle = () => {
  return index.value === 4 ? i18n.global.t('Vletter.tip21') : i18n.global.t('Vletter.tip22')
}

// 计算当前存款奖励
const getCurrentRewardDp = () => {
  return toFormatNumber(
    index.value === 4
      ? Number(slidesStore.vipReward?.monthRewardDp)
      : Number(slidesStore.vipReward?.weeklyRewardDp)
  )
}

// 计算最低存款额度
const getLeastDp = () => {
  return toFormatNumber(
    index.value === 4
      ? Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastDp)
      : Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastDp)
  )
}

// 判断存款是否已完成
const isDepositCompleted = () => {
  if (index.value === 4) {
    return (
      Number(slidesStore.vipReward?.monthRewardDp) >
      Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastDp)
    )
  } else {
    return (
      Number(slidesStore.vipReward?.weeklyRewardDp) >
      Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastDp)
    )
  }
}

// 计算流水标题
const getTurnoverTitle = () => {
  return index.value === 4 ? i18n.global.t('Vletter.tip23') : i18n.global.t('Vletter.tip24')
}

// 计算当前流水奖励
const getCurrentRewardTu = () => {
  return toFormatNumber(
    index.value === 4
      ? Number(slidesStore.vipReward?.monthRewardTu)
      : Number(slidesStore.vipReward?.weeklyRewardTu)
  )
}

// 计算最低流水额度
const getLeastTurnover = () => {
  return toFormatNumber(
    index.value === 4
      ? Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastTurnover)
      : Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastTurnover)
  )
}

// 判断流水是否已完成
const isTurnoverCompleted = () => {
  if (index.value === 4) {
    return (
      Number(slidesStore.vipReward?.monthRewardTu) >
      Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastTurnover)
    )
  } else {
    return (
      Number(slidesStore.vipReward?.weeklyRewardTu) >
      Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastTurnover)
    )
  }
}

const index = ref(null)
const CPopupDom = ref(null)
// ref子组件声明的方法打开弹窗
const showhide = (val) => {
  index.value = val
  CPopupDom.value.showhide()
}
defineExpose({ showhide })
</script>
<style lang="scss" scoped>
:deep().van-popup {
  width: 345px;
  height: 258px;
}
.popup-top {
  width: 345px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('../img/mask.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-size: auto;
  border-radius: 12px 12px 0 0;
  .title {
    color: #111;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  .text {
    width: 223px;
    height: 20px;
    border-radius: 40px;
    color: var(--1, #ff9000);
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    background: #fcf0eb;
  }
}
.popup-content {
  width: 345px;
  height: 198px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0px 0px 12px 12px;
  background: #f6f7fb;
  .popup-content-item {
    width: 325px;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    margin: 5px 0;
    background: #fff;
    .popup-content-item-left {
      color: #111;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      margin-left: 12px;
      .titles {
        color: #666;
        font-size: 15px;
        margin-top: 10px;
        span {
          color: #ff5000;
        }
      }
    }
    .popup-content-item-right {
      width: 64px;
      height: 28px;
      margin-right: 12px;
      border-radius: 90px;
      background: #ccc;
      color: #fff;
      text-align: center;

      font-size: 12px;
      font-weight: 600;
      line-height: 28px;
    }
    .heightTitle {
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
  }
}
</style>
