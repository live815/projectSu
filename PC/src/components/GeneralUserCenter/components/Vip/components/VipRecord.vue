<template>
  <div class="vipRecord-content">
    <div class="vipRecord-content-top"></div>
    <div class="vipRecord-content-min">
      <div class="vipRecord-content-min-left">
        <div class="vipRecord-content-min-left-item">
          <div>{{ $t('GeneralUserCenter.AccumulatedDeposits') }}</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: `${progress1}%` }"></div>
          </div>
          <div>
            <span>{{
              slidesStore.vipReward.currentDpBet
                ? toFormatNumber(slidesStore.vipReward.currentDpBet)
                : 0
            }}</span
            >/
            {{
              slidesStore.vipReward.upgradeLeastDp
                ? toFormatNumber(slidesStore.vipReward.upgradeLeastDp)
                : 0
            }}
          </div>
        </div>
        <div class="vipRecord-content-min-left-item" v-if="slidesStore.vipReward.vipLevel">
          <div>{{ $t('GeneralUserCenter.EffectiveFlow') }}</div>
          <div class="progress-bar-container">
            <div
              class="progress-bar"
              :style="{ width: `${progress2}%` }"
              v-if="slidesStore.vipReward.vipLevel"
            ></div>
          </div>
          <div v-if="slidesStore.vipReward.vipLevel">
            <span>{{
              slidesStore.vipReward.currentUpgradeBet
                ? toFormatNumber(slidesStore.vipReward.currentUpgradeBet)
                : 0
            }}</span
            >/{{
              slidesStore.vipReward.upgradeLeastTurnover
                ? toFormatNumber(slidesStore.vipReward.upgradeLeastTurnover)
                : 0
            }}
          </div>
        </div>
        <div
          class="vipRecord-content-min-left-item"
          v-if="slidesStore.vipReward.vipLevel && slidesStore.vipReward.vipLevel > 1"
        >
          <div>{{ $t('GeneralUserCenter.RelegationTurnover') }}</div>
          <div class="progress-bar-container">
            <div
              class="progress-bar"
              :style="{ width: `${progress3}%` }"
              v-if="slidesStore.vipReward.vipLevel"
            ></div>
          </div>
          <div v-if="slidesStore.vipReward.vipLevel">
            <span>{{
              slidesStore.vipReward.currentRelBet
                ? toFormatNumber(slidesStore.vipReward.currentRelBet)
                : 0
            }}</span
            >/{{
              slidesStore.vipReward.relegationLeastTurnover
                ? toFormatNumber(slidesStore.vipReward.relegationLeastTurnover)
                : 0
            }}
          </div>
        </div>
      </div>
      <div class="vipRecord-content-min-right">
        <div class="vipRecord-content-min-right-btn" @click="onClickDepositNow">
          {{ $t('GeneralUserCenter.DepositNow') }}
        </div>
        <div class="vipRecord-content-min-right-btn btns" @click="router.push('/sports')">
          {{ $t('GeneralUserCenter.GoToBet') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toFormatNumber } from '@/utils'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const user = useUserStore()
const router = useRouter()
const slidesStore = useSlidesStore()

const progress1 = computed(() => {
  if (slidesStore.vipReward) {
    const dividend = slidesStore.vipReward.currentDpBet
    const divider = slidesStore.vipReward.upgradeLeastDp
    if (divider === 0 && dividend === 0) {
      return 0
    } else if (dividend > 0 && divider === 0) {
      return 100
    } else {
      const count = (dividend / divider) * 100
      return count
    }
  }
  return 0
})

const progress2 = computed(() => {
  if (slidesStore.vipReward) {
    const dividend = slidesStore.vipReward.currentUpgradeBet
    const divider = slidesStore.vipReward.upgradeLeastTurnover
    if (divider === 0 && dividend === 0) {
      return 0
    } else if (dividend > 0 && divider === 0) {
      return 100
    } else {
      const count = (dividend / divider) * 100
      return count
    }
  }
  return 0
})

const progress3 = computed(() => {
  if (slidesStore.vipReward) {
    const dividend = slidesStore.vipReward.currentRelBet
    const divider = slidesStore.vipReward.relegationLeastTurnover
    if (divider === 0 && dividend === 0) {
      return 0
    } else if (dividend > 0 && divider === 0) {
      return 100
    } else {
      const count = (dividend / divider) * 100
      return count
    }
  }
  return 0
})

// 立即提现
const onClickDepositNow = () => {
  if (!user.userInfo.userName) {
    ElMessage(i18n.global.t('DepositWithdraw.NoticeTips_10'))
  } else {
    // 是否绑定手机号或者银行卡
    const params = {
      isOpen: true
    }
    eventBus.emit('showCharge', params)
  }
}
</script>
<style lang='scss' scoped>
.vipRecord-content {
  position: relative;
  margin: 0 auto;
  width: 1240px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--unnamed, #171a2f);
  z-index: 1 !important;
  .vipRecord-content-top {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 33px solid transparent;
    border-right: 33px solid transparent;
    border-bottom: 24px solid #171a2f;
  }
  .vipRecord-content-min {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1240px;
    height: 150px;
    .vipRecord-content-min-left {
      margin-left: 40px;
      color: var(--100, #fff);

      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      .vipRecord-content-min-left-item {
        display: flex;
        align-items: center;
        margin: 25px 0;
        .progress-bar-container {
          width: 340px;
          height: 8px;
          margin: 0 20px;
          border-radius: 90px;
          background: var(--20, rgba(255, 255, 255, 0.2));
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          transition: width 0.3s;
        }
        span {
          color: var(--unnamed, #f35f1b);
        }
      }
    }
    .vipRecord-content-min-right {
      margin-right: 40px;
      display: flex;
      .vipRecord-content-min-right-btn {
        width: 130px;
        height: 40px;
        color: #6f4200;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        line-height: 40px;
        flex-shrink: 0;
        border-radius: 80px;
        background: linear-gradient(93deg, #fed99a 27.5%, #fecc82 74.69%);
      }
      .btns {
        color: #fff;
        margin-left: 30px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      }
    }
  }
}
</style>