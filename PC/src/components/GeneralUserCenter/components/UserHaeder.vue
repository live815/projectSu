<template>
  <div class="main-container UserHaeder">
    <div class="left-box">
      <div class="user-icon">
        <img
          v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]"
          :src="avatarList[user.userInfo.avatar].img"
          alt=""
        />
        <img v-else :src="avatarList[0].img" />
      </div>
      <div class="user_info-box">
        <div class="user-name">
          <span>{{ user.userInfo.userName }}</span>
          <!-- <label class="level-icon"><img src="../img/lv1_icon.png" width="20" height="20" /></label> -->
        </div>

        <div class="user-level">
          <div>VIP{{ user.userInfo.vipLevel }}</div>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: `${progressBarWidth}` }"></div>
          </div>
          <div v-if="user.userInfo.vipLevel < 11">VIP{{ user.userInfo.vipLevel + 1 }}</div>
        </div>
        <div class="user-info-title">
          <div class="user-info-title-text" v-if="user.userInfo.vipLevel">
            {{ $t('GeneralUserCenter.UserInfoTip1') }}
            <text><CurrencyUnit />{{ toFormatNumber(Number(upgradeFlow)) }}</text>
            {{ $t('GeneralUserCenter.UserInfoTip2') }}
          </div>
          <div
            class="user-info-title-text"
            v-else
            v-html="$t('GeneralUserCenter.UserInfoTip3')"
          ></div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="text-box">
        <span class="account-balance">{{ $t('GeneralUserCenter.AccountBalance') }}：</span>
        <Balance />
      </div>
      <div class="btn-row">
        <div class="changre-btn" @click="onClickOpen(1)">
          {{ $t('GeneralUserCenter.Deposit') }}
        </div>
        <div class="withdraw-btn" @click="onClickOpen(2)">
          {{ $t('GeneralUserCenter.Withdraw') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Balance from '@/components/Balance'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal.js'
import eventBus from '@/utils/eventBus'
import { avatarList } from '@/utils/config'
import { getqueryMemberRight } from '@/api/vip'
import { useSlidesStore } from '@/stores/vipSlides'
import { toFormatNumber } from '@/utils'

const slidesStore = useSlidesStore()

const mainConfig = useChargeAndWithdrawal()
const user = useUserStore()

// 当前等级数据
const currentVipLevel = ref({})

onMounted(async () => {
  await getList()
})

const getList = () => {
  getqueryMemberRight(user.userInfo.vipLevel).then((res) => {
    currentVipLevel.value = res.data
  })
}

// 计算进度条宽度样式
const progressBarWidth = computed(() => {
  if (user.userInfo.vipLevel == 0) {
    if (currentVipLevel.value?.currentDpBet >= currentVipLevel.value?.upgradeLeastDp) {
      return `100%`
    } else {
      return 0
    }
  }

  const upgradeLeastTurnover = currentVipLevel.value?.upgradeLeastTurnover
    ? currentVipLevel.value?.upgradeLeastTurnover
    : 0
  const upGradeleast = (currentVipLevel.value?.currentUpgradeBet / upgradeLeastTurnover) * 1
  let progressPercentage = 0
  if (upGradeleast >= 1) {
    progressPercentage = 100
  } else {
    progressPercentage = upGradeleast * 100
  }
  return `${progressPercentage.toFixed(2)}%`
})

// 点击打开充值提现
const onClickOpen = (val) => {
  if (val == 1) {
    // 是否绑定手机号或者银行卡
    mainConfig.currentShow = 1
    const params = {
      isOpen: true,
      current: 1
    }
    eventBus.emit('showCharge', params)
  } else {
    // 是否绑定手机号或者银行卡
    mainConfig.currentShow = 2
    const params = {
      isOpen: true,
      current: 2
    }
    eventBus.emit('showCharge', params)
  }
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
</script>

<style lang="scss" scoped>
.UserHaeder {
  display: flex;
  min-width: 1320px;
  max-width: 1320px;
  height: 128px;
  border-radius: 8px;
  background: #272b45;
  margin-top: 30px;
}
.left-box {
  display: flex;
  width: 385px;
  height: 100%;
  padding: 24px 0 28px 32px;
  .user-icon {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user_info-box {
    padding-top: 12px;
    flex-grow: 1;
    margin-left: 24px;
    border-right: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
    .user-name {
      margin-bottom: 15px;
      color: var(--100, #fff);

      font-size: 20px;
      font-weight: 400;
      .level-icon {
      }
    }
    .user-level {
      display: flex;
      align-items: center;
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 14px;
      font-weight: 400;
      .progress-bar-container {
        width: 61px;
        height: 6px;
        margin: 0 10px;
        border-radius: 50px;
        background: var(--20, rgba(255, 255, 255, 0.2));
        .progress-bar {
          height: 100%;
          background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
          transition: width 0.3s;
        }
      }
    }
    .user-info-title {
      margin-top: 4px;
      color: var(-----60, rgba(255, 255, 255, 0.6));
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text {
        color: var(-----, #ff9000);
      }
    }
  }
}
.right-box {
  flex-grow: 1;
  height: 100%;
  padding: 31px 0 0 56px;
  .text-box {
    display: flex;
    height: 28px;
    align-items: center;

    .account-balance {
      color: var(--60, rgba(255, 255, 255, 0.6));

      font-size: 14px;
      font-weight: 400;
    }
    .money-num {
      color: var(--100, #fff);

      font-size: 20px;
      font-weight: 600;
      margin-right: 10px;
    }
  }
  .btn-row {
    display: flex;
    margin-top: 8px;
    gap: 16px;
    .changre-btn {
      width: 96px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      flex-shrink: 0;
      border-radius: 4px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      // padding: 9px 0 0 34px;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
    }
    .withdraw-btn {
      width: 96px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      flex-shrink: 0;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #f35f1b);
      // padding: 9px 0 0 34px;
      color: var(--unnamed, #f35f1b);
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
