<template>
  <div class="my-assets">
    <div class="box">
      <div class="asset-top">
        <div>{{ $t('UsercenterView.Totalassets') }}</div>
        <div class="more-btn" @click="router.push('/vip')">
          {{ $t('UsercenterView.tip1') }}
          <IcoArrowRight class="svg-icon" />
        </div>
      </div>
      <div class="asset-mid flex">
        <Balance v-if="user.isLogin" />
        <div @click="router.push(`/login?redirect=${$route.fullPath}`)" class="amount-more" v-else>
          {{ $t('UsercenterView.tip2') }}
        </div>
        <div class="stor-btn">
          <div @click="router.push('/withdraw')" class="pick acces">
            {{ $t('UsercenterView.withdraw') }}
          </div>
          <div @click="router.push('/deposit')" class="save acces">
            {{ $t('UsercenterView.topup') }}
          </div>
        </div>
      </div>
      <template v-if="user.isLogin">
        <div class="asset-bar">
          <div class="v-left">
            <img :src="imgPath(user.userInfo.vipLevel)" />
          </div>
          <div class="progress-box">
            <div class="progress-text" v-if="user.userInfo.vipLevel">
              {{ $t('UsercenterView.tip3') }}
              <text><CurrencyUnit />{{ toFormatNumber(Number(upgradeFlow)) }}</text>
              {{ $t('UsercenterView.tip4') }}
            </div>
            <div class="progress-text" v-else>
              {{ $t('UsercenterView.tip8') }}
            </div>
            <div class="bg-line bg">
              <div class="line inner" :style="{ width: progressBarWidth }"></div>
            </div>
          </div>
          <div class="v-left" v-if="user.userInfo.vipLevel < 11">
            <img :src="imgPath(user.userInfo.vipLevel + 1)" />
          </div>
        </div>
        <div class="asset-bot">
          <div class="bot">
            <div class="bot-icon">
              <IconRight class="svg-icon" />
            </div>
            <!-- <div class="bot-unIcon" >
              <IconUnRight class="svg-icon" />
            </div> -->
            <div>{{ $t('UsercenterView.birthdaygift') }}</div>
          </div>
          <div class="bot">
            <div class="bot-icon">
              <IconRight class="svg-icon" />
            </div>
            <div>{{ $t('UsercenterView.Upgradegift') }}</div>
          </div>
          <!-- <div class="bot">
            <div class="bot-icon">
              <IconRight class="svg-icon" />
            </div>
            <div>{{ $t('UsercenterView.Weeklygiftmoney') }}</div>
          </div> -->
          <div class="bot">
            <div class="bot-icon">
              <IconRight class="svg-icon" />
            </div>
            <div>{{ $t('UsercenterView.relegationBonus') }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useSlidesStore } from '@/stores/vipSlides'
import { toFormatNumber } from '@/utils'
const router = useRouter()
const user = useUserStore()
const slidesStore = useSlidesStore()
const getList = () => {
  slidesStore.getMemberRightList(user.userInfo.vipLevel)
}
onMounted(async () => {
  if (user.isLogin) {
    await getList()
  }
})

// 引用静态图片
const imgPath = (index) => {
  return new URL(`./img/v${index}.png`, import.meta.url).href
}

// 晋级流水
const upgradeFlow = computed(() => {
  if (user.userInfo.vipLevel == 0) {
    const countNum = slidesStore.vipReward?.upgradeLeastDp - slidesStore.vipReward?.currentDpBet
    if (countNum > 0) {
      return countNum
    } else {
      return 0
    }
  } else {
    const countNum =
      slidesStore.vipReward?.upgradeLeastTurnover - slidesStore.vipReward?.currentUpgradeBet
    if (countNum > 0) {
      return countNum
    } else {
      return 0
    }
  }
})

// 计算进度条宽度样式
const progressBarWidth = computed(() => {
  if (user.userInfo.vipLevel == 0) {
    console.log(slidesStore.vipReward?.currentDpBet, slidesStore.vipReward?.upgradeLeastDp)
    if (slidesStore.vipReward?.currentDpBet >= slidesStore.vipReward?.upgradeLeastDp) {
      return `100%`
    } else {
      return 0
    }
  }
  const upgradeLeastTurnover = slidesStore.vipReward?.upgradeLeastTurnover
    ? slidesStore.vipReward?.upgradeLeastTurnover
    : 0
  const upGradeleast = (slidesStore.vipReward?.currentUpgradeBet / upgradeLeastTurnover) * 1
  let progressPercentage = 0
  if (upGradeleast >= 1) {
    progressPercentage = 100
  } else {
    progressPercentage = upGradeleast * 100
  }
  return `${progressPercentage.toFixed(2)}%`
})
</script>

<style lang="scss" scoped>
.my-assets {
  margin-top: 13px;
  .box {
    background: url('./img/Rectangle.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 8px;
    padding: 15px 15px 3px 15px;
    .asset-top {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 10px;
      .more-btn {
        color: var(--color-text);
        font-size: 12px;
        font-weight: 400;
        .svg-icon {
          width: 8px;
          height: 8px;
        }
      }
    }
    .asset-mid {
      display: flex;
      align-items: center;
      margin-bottom: 19px;
      .amount {
        font-size: 22px;
        font-weight: 700;
        color: #000;
      }
      .amount-more {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      .acces {
        // width: 50px;
        width: auto;
        padding: 0 5px;
        height: 28px;
        border-radius: 6px;
        line-height: 28px;
        font-size: 14px;
        text-align: center;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      }
      .stor-btn {
        display: flex;
        .pick {
          color: var(--color-primary);
          border: 1px solid var(--color-primary);
        }
        .save {
          color: #fff;
          background: linear-gradient(93deg, #ff9000 0%, #ff5000 100%);
          margin-left: 14px;
        }
      }
    }
    .asset-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      // width: 100%;
      .v-left {
        width: 11%;
        height: 40px;
        img {
          width: 38px;
          height: 40px;
          // width: 100%;
          // height: 100%;
        }
      }
      .progress-box {
        width: 78%;
        margin: 0 8px 0 11px;
        .progress-text {
          color: #666;
          text-align: center;
          font-size: 12px;
          margin-bottom: 4px;
          text {
            color: #f53f3f;
          }
        }
        .bg {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .bg-line {
          background: rgba(0, 0, 0, 0.1);
        }

        .inner {
          height: 100%;
          border-radius: 4px;
          transition: all 0.5s cubic-bezier(0, 0.64, 0.36, 1);
        }

        .line {
          background-color: var(--color-orange);
        }
      }
    }
    .asset-bot {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: var(--color-text);
      font-size: 10px;
      margin-bottom: 10px;
      .bot {
        // flex: 1;
        display: flex;
        align-items: center;
        // margin-right: 28px;
        .bot-icon {
          width: 14px;
          height: 14px;
          line-height: 14px;
          border-radius: 14px;
          background: var(--color-orange);
          margin-right: 4px;
          text-align: center;
          .svg-icon {
            width: 8px;
            height: 8px;
            fill: var(--color-background);
          }
        }
        .bot-unIcon {
          width: 14px;
          height: 14px;
          line-height: 14px;
          border-radius: 14px;
          border: 0.5px solid #666;
          margin-right: 4px;
          text-align: center;
          .svg-icon {
            width: 8px;
            height: 8px;
            fill: var(--color-background);
          }
        }
      }
    }

    .label {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
    .amount {
      display: flex;
      align-items: center;
      h3 {
        font-weight: 600;
        line-height: 30px;
      }
      .svg-icon {
        width: 22px;
        height: 22px;
        fill: red;
        color: red;
        margin-left: 4px;
        margin-top: -2px;
        transition: all 1s ease-in;
      }
    }
    .van-button {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
