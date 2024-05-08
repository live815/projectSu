<template>
  <div
    class="vipOver-content"
    v-if="
      slidesStore.getActiveSlideIndex > 0 &&
      (slidesStore.vipReward?.birthdayRewardAmounts ||
        slidesStore.vipReward?.upgradeRewardAmounts ||
        slidesStore.vipReward?.weeklyRewardAmounts ||
        slidesStore.vipReward?.monthRewardAmounts ||
        slidesStore.vipReward?.relegationRewardAmounts)
    "
  >
    <div class="title">{{ $t('GeneralUserCenter.ExclusiveVIPPrivileges') }}</div>
    <div class="line"></div>
    <div class="vipOver-min">
      <div
        class="vipOver-min-item"
        v-if="
          slidesStore.vipReward?.birthdayRewardAmounts &&
          slidesStore.vipSwitchConfigData.birthdayRewardSwitch == '0'
        "
      >
        <div class="vipOver-min-item-left">
          <img class="img" :src="grade1" />
          <div class="vipOver-min-item-left-title">
            <div>
              <CurrencyUnit />{{ slidesStore.vipReward?.birthdayRewardAmounts }}
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 0">
                {{ $t('GeneralUserCenter.Cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 1">{{
                $t('GeneralUserCenter.CashCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 2">{{
                $t('GeneralUserCenter.DepositCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 3">{{
                $t('GeneralUserCenter.TurnoverCoupons')
              }}</span>
            </div>
            <div class="text">{{ $t('GeneralUserCenter.BirthdayGiftwo') }}</div>
          </div>
        </div>
        <div
          class="vipOver-min-item-right"
          v-if="slidesStore.vipReward?.birthdayStatus == 1"
          @click="
            onClickReceive(
              1,
              slidesStore.vipReward?.birthdayRewardAmounts,
              slidesStore.vipReward?.birthdayRewardType
            )
          "
        >
          {{ $t('GeneralUserCenter.GetItRightNow') }}
        </div>
        <template v-if="slidesStore.vipReward?.birthdayStatus == 0">
          <div class="vipOver-min-item-right bg-title">
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
        </template>
        <div
          class="vipOver-min-item-right bg-title"
          v-if="slidesStore.vipReward?.birthdayStatus == 2"
        >
          {{ $t('GeneralUserCenter.Received') }}
        </div>
      </div>
      <div
        class="vipOver-min-item"
        v-if="
          slidesStore.vipReward?.upgradeRewardAmounts &&
          slidesStore.vipSwitchConfigData.upgradeRewardSwitch == '0'
        "
      >
        <div class="vipOver-min-item-left">
          <img class="img" :src="grade2" />
          <div class="vipOver-min-item-left-title">
            <div>
              <CurrencyUnit />{{ slidesStore.vipReward?.upgradeRewardAmounts }}
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 0">
                {{ $t('GeneralUserCenter.Cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 1">{{
                $t('GeneralUserCenter.CashCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 2">{{
                $t('GeneralUserCenter.DepositCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 3">{{
                $t('GeneralUserCenter.TurnoverCoupons')
              }}</span>
            </div>
            <div class="text">{{ $t('GeneralUserCenter.UpgradeGifttwo') }}</div>
          </div>
        </div>
        <div
          class="vipOver-min-item-right"
          v-if="slidesStore.vipReward?.upgradeStatus == 1"
          @click="
            onClickReceive(
              0,
              slidesStore.vipReward?.upgradeRewardAmounts,
              slidesStore.vipReward?.upgradeRewardType
            )
          "
        >
          {{ $t('GeneralUserCenter.GetItRightNow') }}
        </div>
        <template v-if="slidesStore.vipReward?.upgradeStatus == 0">
          <div class="vipOver-min-item-right bg-title">
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
        </template>
        <div
          class="vipOver-min-item-right bg-title"
          v-if="slidesStore.vipReward?.upgradeStatus == 2"
        >
          {{ $t('GeneralUserCenter.Received') }}
        </div>
      </div>
      <div
        class="vipOver-min-item"
        v-if="
          slidesStore.vipReward?.weeklyRewardAmounts &&
          slidesStore.vipSwitchConfigData.weeklyRewardSwitch == '0'
        "
      >
        <div class="vipOver-min-item-left">
          <img class="img" :src="grade3" />
          <div class="vipOver-min-item-left-title">
            <div>
              <CurrencyUnit />{{ slidesStore.vipReward?.weeklyRewardAmounts }}
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 0">
                {{ $t('GeneralUserCenter.Cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 1">{{
                $t('GeneralUserCenter.CashCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 2">{{
                $t('GeneralUserCenter.DepositCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 3">{{
                $t('GeneralUserCenter.TurnoverCoupons')
              }}</span>
            </div>
            <div
              class="text active-text"
              @click="openInformationPopup(1)"
              v-if="
                slidesStore.vipReward?.weeklyStatus == 0 || slidesStore.vipReward?.weeklyStatus == 1
              "
            >
              {{ $t('GeneralUserCenter.WeeklyGiftMoney') }}
            </div>
            <div class="text" v-else>
              {{ $t('GeneralUserCenter.WeeklyGiftMoney') }}
            </div>
          </div>
        </div>
        <div
          class="vipOver-min-item-right"
          v-if="slidesStore.vipReward?.weeklyStatus == 1"
          @click="
            onClickReceive(
              2,
              slidesStore.vipReward?.weeklyRewardAmounts,
              slidesStore.vipReward?.weeklyRewardType
            )
          "
        >
          {{ $t('GeneralUserCenter.GetItRightNow') }}
        </div>
        <template v-if="slidesStore.vipReward?.weeklyStatus == 0">
          <div
            v-if="
              user.userInfo.vipLevel ==
              slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex].vipLevel
            "
            class="vipOver-min-item-right bg-title"
          >
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
          <div class="vipOver-min-item-right bg-title" v-else>
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
        </template>
        <div
          class="vipOver-min-item-right bg-title"
          v-if="slidesStore.vipReward?.weeklyStatus == 2"
        >
          {{ $t('GeneralUserCenter.Received') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.weeklyStatus == 3"
          class="vipOver-min-item-right bg-title"
        >
          {{ $t('GeneralUserCenter.Expired') }}
        </div>
      </div>
      <div
        class="vipOver-min-item"
        v-if="
          slidesStore.vipReward?.monthRewardAmounts &&
          slidesStore.vipSwitchConfigData.monthRewardSwitch == '0'
        "
      >
        <div class="vipOver-min-item-left">
          <img class="img" :src="grade4" />
          <div class="vipOver-min-item-left-title">
            <div>
              <CurrencyUnit />{{ slidesStore.vipReward?.monthRewardAmounts }}
              <span v-if="slidesStore.vipReward?.monthRewardType == 0">
                {{ $t('GeneralUserCenter.Cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.monthRewardType == 1">{{
                $t('GeneralUserCenter.CashCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.monthRewardType == 2">{{
                $t('GeneralUserCenter.DepositCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.monthRewardType == 3">{{
                $t('GeneralUserCenter.TurnoverCoupons')
              }}</span>
            </div>
            <div
              class="text active-text"
              @click="openInformationPopup(4)"
              v-if="
                slidesStore.vipReward?.monthStatus == 0 || slidesStore.vipReward?.monthStatus == 1
              "
            >
              {{ $t('GeneralUserCenter.MonthlyGiftMoney') }}
            </div>
            <div class="text" v-else>
              {{ $t('GeneralUserCenter.MonthlyGiftMoney') }}
            </div>
          </div>
        </div>
        <div
          class="vipOver-min-item-right"
          v-if="slidesStore.vipReward?.monthStatus == 1"
          @click="
            onClickReceive(
              3,
              slidesStore.vipReward?.monthRewardAmounts,
              slidesStore.vipReward?.monthRewardType
            )
          "
        >
          {{ $t('GeneralUserCenter.GetItRightNow') }}
        </div>
        <template v-if="slidesStore.vipReward?.monthStatus == 0">
          <div
            v-if="
              user.userInfo.vipLevel ==
              slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex].vipLevel
            "
            class="vipOver-min-item-right bg-title"
          >
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
          <div class="vipOver-min-item-right bg-title" v-else>
            {{ $t('GeneralUserCenter.ToBeCollected') }}
          </div>
        </template>
        <div class="vipOver-min-item-right bg-title" v-if="slidesStore.vipReward?.monthStatus == 2">
          {{ $t('GeneralUserCenter.Received') }}
        </div>
        <div v-if="slidesStore.vipReward?.monthStatus == 3" class="vipOver-min-item-right bg-title">
          {{ $t('GeneralUserCenter.Expired') }}
        </div>
      </div>
      <div
        class="vipOver-min-item"
        v-if="
          slidesStore.vipReward?.relegationRewardAmounts &&
          slidesStore.vipSwitchConfigData.relegationRewardSwitch == '0'
        "
      >
        <div class="vipOver-min-item-left">
          <img class="img" :src="grade5" />
          <div class="vipOver-min-item-left-title">
            <div>
              <CurrencyUnit />{{ slidesStore.vipReward?.relegationRewardAmounts }}
              <span v-if="slidesStore.vipReward?.relegationRewardType == 0">
                {{ $t('GeneralUserCenter.Cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.relegationRewardType == 1">{{
                $t('GeneralUserCenter.CashCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.relegationRewardType == 2">{{
                $t('GeneralUserCenter.DepositCoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.relegationRewardType == 3">{{
                $t('GeneralUserCenter.TurnoverCoupons')
              }}</span>
            </div>
            <div class="text">{{ $t('GeneralUserCenter.relegationBonus') }}</div>
          </div>
        </div>
        <div
          class="vipOver-min-item-right"
          v-if="slidesStore.vipReward?.relegationStatus == 1"
          @click="
            onClickReceive(
              4,
              slidesStore.vipReward?.relegationRewardAmounts,
              slidesStore.vipReward?.relegationRewardType
            )
          "
        >
          {{ $t('GeneralUserCenter.GetItRightNow') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.relegationStatus == 0"
          class="vipOver-min-item-right bg-title"
        >
          {{ $t('GeneralUserCenter.ToBeCollected') }}
        </div>

        <div
          class="vipOver-min-item-right bg-title"
          v-if="slidesStore.vipReward?.relegationStatus == 2"
        >
          {{ $t('GeneralUserCenter.Received') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.relegationStatus == 3"
          class="vipOver-min-item-right bg-title"
        >
          {{ $t('GeneralUserCenter.Expired') }}
        </div>
      </div>
    </div>
  </div>
  <MsgPopup v-if="isMsgShow" :index="lookIndex" @submitBtn="submitBtn"></MsgPopup>
  <InformationPopup v-if="isShow" :rowIndex="rowIndex" @close="close"></InformationPopup>
</template>

<script setup>
import grade1 from './img/grade1.png'
import grade2 from './img/grade2.png'
import grade3 from './img/grade3.png'
import grade4 from './img/grade4.png'
import grade5 from './img/grade5.png'
import MsgPopup from './MsgPopup.vue'
import { getVipGetCoupon } from '@/api/vip'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const slidesStore = useSlidesStore()
const isMsgShow = ref(false)

// 是否显示领取弹窗
const isShow = ref(false)
// 领取提示
const rowIndex = ref(null)

// 提现倍数
const multiple = ref(null)
const lookIndex = ref(null)
const rewardExp = ref(null)
const onClickReceive = (index, rewardAmounts, type) => {
  if (index == 0) {
    multiple.value = slidesStore.vipReward?.upgradeRewardWdMultiple
    rewardExp.value = slidesStore.vipReward?.upgradeRewardExp
  }
  if (index == 1) {
    multiple.value = slidesStore.vipReward?.birthdayRewardWdMultiple
    rewardExp.value = slidesStore.vipReward?.birthdayRewardExp
  }
  if (index == 2) {
    multiple.value = slidesStore.vipReward?.weeklyRewardWdMultiple
    rewardExp.value = slidesStore.vipReward?.weeklyRewardExp
  }
  if (index == 3) {
    multiple.value = slidesStore.vipReward?.monthRewardWdMultiple
    rewardExp.value = slidesStore.vipReward?.monthRewardExp
  }
  if (index == 4) {
    multiple.value = slidesStore.vipReward?.relegationRewardWdMultiple
    rewardExp.value = slidesStore.vipReward?.relegationRewardExp
  }
  const params = {
    activeType: index,
    rewardAmounts: rewardAmounts,
    rewardType: type,
    multiple: multiple.value,
    vipLevel: slidesStore.getActiveSlideIndex,
    vipName: `VIP` + slidesStore.getActiveSlideIndex,
    rewardExp: rewardExp.value
  }

  getVipGetCoupon(params)
    .then((res) => {
      if (res.code == 200) {
        if (type) {
          // 代表劵
          lookIndex.value = 0
        } else {
          // 代表现金
          lookIndex.value = 1
        }
        isMsgShow.value = true
      }
    })
    .catch(() => {})
}
// 传递过来的值
const submitBtn = (val) => {
  isMsgShow.value = val
  slidesStore.getMemberRightList(slidesStore.activeSlideIndex)
}

// 立即解锁
const openInformationPopup = (index) => {
  isShow.value = true
  rowIndex.value = index
}

const close = (val) => {
  isShow.value = val
}
</script>
<style lang='scss' scoped>
.vipOver-content {
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
  .vipOver-min {
    display: flex;
    width: 1240px;
    // height: 60px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #4d5065 #171a2f;
    .vipOver-min-item {
      min-width: 350px;
      min-height: 60px;
      margin-left: 22px;
      border-right: 1px solid #4d5065;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;

      .vipOver-min-item-left {
        display: flex;
        align-items: center;
        .img {
          width: 60px;
          height: 60px;
          border-radius: 90px;
          background: var(--unnamed, #171a2f);
          margin-right: 10px;
        }
        .vipOver-min-item-left-title {
          color: var(--100, #fff);
          font-size: 15px;
          font-weight: 600;
          // white-space: nowrap;
          .text {
            color: var(--60, rgba(255, 255, 255, 0.6));
            margin-top: 14px;
            font-size: 14px;
            font-weight: 400;
          }
          .active-text {
            text-decoration: underline;
            color: #ff9000;
          }
        }
      }
      .vipOver-min-item-right {
        margin-right: 10px;
        width: 64px;
        height: 28px;
        border-radius: 90px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: #fff;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        line-height: 28px;
        white-space: nowrap;
        cursor: pointer;
      }
      .bg-title {
        background: #1d223c;
        color: var(--60, rgba(255, 255, 255, 0.6));
      }
    }
    .vipOver-min-item:first-child {
      margin-left: 0;
    }
    .vipOver-min-item:last-child {
      border-right: none;
    }
  }
  .vipOver-min::-webkit-scrollbar {
    height: 16px;
  }

  .vipOver-min::-webkit-scrollbar-track {
    background: #171a2f;
  }

  .vipOver-min::-webkit-scrollbar-thumb {
    background-color: #4d5065;
    border-radius: 10px;
    height: 8px;
  }

  .vipOver-min::-webkit-scrollbar-corner {
    background: transparent;
  }
}
</style>