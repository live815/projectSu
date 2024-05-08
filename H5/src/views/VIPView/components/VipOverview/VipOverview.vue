<template>
  <template
    v-if="
      slidesStore.getActiveSlideIndex > 0 &&
      (slidesStore.vipReward?.birthdayRewardAmounts ||
        slidesStore.vipReward?.upgradeRewardAmounts ||
        slidesStore.vipReward?.weeklyRewardAmounts ||
        slidesStore.vipReward?.monthRewardAmounts ||
        slidesStore.vipReward?.relegationRewardAmounts)
    "
  >
    <HeadlineTitle class="title" :leftTitle="$t('Vletter.tip28')"></HeadlineTitle>
    <div class="content-card-vip">
      <div
        class="content-card-vip-item"
        v-if="
          slidesStore.vipReward?.birthdayRewardAmounts &&
          slidesStore.vipSwitchConfigData.birthdayRewardSwitch == '0'
        "
      >
        <div class="content-card-vip-item-left">
          <img class="img" :src="grade1" />
          <div class="text-box">
            <div class="titles">
              <CurrencyUnit />{{ slidesStore.vipReward?.birthdayRewardAmounts }}
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 0">
                {{ $t('Vletter.cash') }}</span
              >
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 1">{{
                $t('Vletter.cashcoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 2">{{
                $t('Vletter.depositcertificate')
              }}</span>
              <span v-if="slidesStore.vipReward?.birthdayRewardType == 3">{{
                $t('Vletter.Turnovercoupons')
              }}</span>
            </div>
            <div class="text">{{ $t('Vletter.birthdaygift') }}</div>
          </div>
        </div>
        <div
          class="content-card-vip-item-right"
          v-if="slidesStore.vipReward?.birthdayStatus == 1"
          @click="
            onClickReceive(
              1,
              slidesStore.vipReward?.birthdayRewardAmounts,
              slidesStore.vipReward?.birthdayRewardType
            )
          "
        >
          {{ $t('Vletter.getrightnow') }}
        </div>

        <template v-if="slidesStore.vipReward?.birthdayStatus == 0">
          <div class="content-card-vip-item-right bg-title">
            {{ $t('Vletter.Tobecollected') }}
          </div>
        </template>
        <div
          class="content-card-vip-item-right bg-title"
          v-if="slidesStore.vipReward?.birthdayStatus == 2"
        >
          {{ $t('Vletter.Received') }}
        </div>
      </div>
      <div
        class="content-card-vip-item"
        v-if="
          slidesStore.vipReward?.upgradeRewardAmounts &&
          slidesStore.vipSwitchConfigData.upgradeRewardSwitch == '0'
        "
      >
        <div class="content-card-vip-item-left">
          <img class="img" :src="grade2" />
          <div class="text-box">
            <div class="titles">
              <CurrencyUnit />{{ slidesStore.vipReward?.upgradeRewardAmounts }}
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 0">
                {{ $t('Vletter.cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 1">{{
                $t('Vletter.cashcoupons')
              }}</span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 2">{{
                $t('Vletter.depositcertificate')
              }}</span>
              <span v-if="slidesStore.vipReward?.upgradeRewardType == 3">{{
                $t('Vletter.Turnovercoupons')
              }}</span>
            </div>
            <div class="text">{{ $t('Vletter.title6') }}</div>
          </div>
        </div>
        <div
          class="content-card-vip-item-right"
          v-if="slidesStore.vipReward?.upgradeStatus == 1"
          @click="
            onClickReceive(
              0,
              slidesStore.vipReward?.upgradeRewardAmounts,
              slidesStore.vipReward?.upgradeRewardType
            )
          "
        >
          {{ $t('Vletter.getrightnow') }}
        </div>
        <template v-if="slidesStore.vipReward?.upgradeStatus == 0">
          <div class="content-card-vip-item-right bg-title">
            {{ $t('Vletter.Tobecollected') }}
          </div>
        </template>
        <div
          class="content-card-vip-item-right bg-title"
          v-if="slidesStore.vipReward?.upgradeStatus == 2"
        >
          {{ $t('Vletter.Received') }}
        </div>
      </div>
      <div
        class="content-card-vip-item"
        v-if="
          slidesStore.vipReward?.weeklyRewardAmounts &&
          slidesStore.vipSwitchConfigData.weeklyRewardSwitch == '0'
        "
      >
        <div class="content-card-vip-item-left">
          <img class="img" :src="grade3" />
          <div class="text-box">
            <div class="titles">
              <CurrencyUnit />{{ slidesStore.vipReward?.weeklyRewardAmounts }}
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 0">
                {{ $t('Vletter.cash') }}</span
              >
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 1">
                {{ $t('Vletter.cashcoupons') }}</span
              >
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 2">
                {{ $t('Vletter.depositcertificate') }}</span
              >
              <span v-if="slidesStore.vipReward?.weeklyRewardType == 3">
                {{ $t('Vletter.Turnovercoupons') }}</span
              >
            </div>
            <div
              class="text active-text"
              v-if="
                slidesStore.vipReward?.weeklyStatus == 0 || slidesStore.vipReward?.weeklyStatus == 1
              "
              @click="openInformationPopup"
            >
              {{ $t('Vletter.Weeklygiftmoney') }}
            </div>
            <div class="text" v-else>
              {{ $t('Vletter.Weeklygiftmoney') }}
            </div>
          </div>
        </div>
        <div
          class="content-card-vip-item-right"
          v-if="slidesStore.vipReward?.weeklyStatus == 1"
          @click="
            onClickReceive(
              2,
              slidesStore.vipReward?.weeklyRewardAmounts,
              slidesStore.vipReward?.weeklyRewardType
            )
          "
        >
          {{ $t('Vletter.getrightnow') }}
        </div>
        <template v-if="slidesStore.vipReward?.weeklyStatus == 0">
          <div
            v-if="
              user.userInfo.vipLevel ==
              slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex].vipLevel
            "
            class="content-card-vip-item-right bg-title"
          >
            {{ $t('Vletter.Tobecollected') }}
          </div>
          <div class="content-card-vip-item-right bg-title" v-else>
            {{ $t('Vletter.Tobecollected') }}
          </div>
        </template>
        <div
          v-if="slidesStore.vipReward?.weeklyStatus == 2"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.Received') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.weeklyStatus == 3"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.expired') }}
        </div>
      </div>
      <div
        class="content-card-vip-item"
        v-if="
          slidesStore.vipReward?.monthRewardAmounts &&
          slidesStore.vipSwitchConfigData.monthRewardSwitch == '0'
        "
      >
        <div class="content-card-vip-item-left">
          <img class="img" :src="grade4" />
          <div class="text-box">
            <div class="titles">
              <CurrencyUnit />{{ slidesStore.vipReward?.monthRewardAmounts }}
              <span v-if="slidesStore.vipReward?.monthRewardType == 0">
                {{ $t('Vletter.cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.monthRewardType == 1">
                {{ $t('Vletter.cashcoupons') }}</span
              >
              <span v-if="slidesStore.vipReward?.monthRewardType == 2">{{
                $t('Vletter.depositcertificate')
              }}</span>
              <span v-if="slidesStore.vipReward?.monthRewardType == 3">{{
                $t('Vletter.Turnovercoupons')
              }}</span>
            </div>
            <div
              class="text active-text"
              v-if="
                slidesStore.vipReward?.monthStatus == 0 || slidesStore.vipReward?.monthStatus == 1
              "
              @click="openInformationPopup(4)"
            >
              {{ $t('Vletter.monthlygiftmoney') }}
            </div>
            <div class="text" v-else>
              {{ $t('Vletter.monthlygiftmoney') }}
            </div>
          </div>
        </div>
        <div
          class="content-card-vip-item-right"
          v-if="slidesStore.vipReward?.monthStatus == 1"
          @click="
            onClickReceive(
              3,
              slidesStore.vipReward?.monthRewardAmounts,
              slidesStore.vipReward?.monthRewardType
            )
          "
        >
          {{ $t('Vletter.getrightnow') }}
        </div>
        <template v-if="slidesStore.vipReward?.monthStatus == 0">
          <div
            v-if="
              user.userInfo.vipLevel ==
              slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex].vipLevel
            "
            class="content-card-vip-item-right bg-title"
          >
            {{ $t('Vletter.Tobecollected') }}
          </div>
          <div class="content-card-vip-item-right bg-title" v-else>
            {{ $t('Vletter.Tobecollected') }}
          </div>
        </template>
        <div
          v-if="slidesStore.vipReward?.monthStatus == 2"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.Received') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.monthStatus == 3"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.expired') }}
        </div>
      </div>
      <div
        class="content-card-vip-item"
        v-if="
          slidesStore.vipReward?.relegationRewardAmounts &&
          slidesStore.vipSwitchConfigData.relegationRewardSwitch == '0'
        "
      >
        <div class="content-card-vip-item-left">
          <img class="img" :src="grade5" />
          <div class="text-box">
            <div class="titles">
              <CurrencyUnit />{{ slidesStore.vipReward?.relegationRewardAmounts }}
              <span v-if="slidesStore.vipReward?.relegationRewardType == 0">
                {{ $t('Vletter.cash') }}
              </span>
              <span v-if="slidesStore.vipReward?.relegationRewardType == 1">
                {{ $t('Vletter.cashcoupons') }}</span
              >
              <span v-if="slidesStore.vipReward?.relegationRewardType == 2">{{
                $t('Vletter.depositcertificate')
              }}</span>
              <span v-if="slidesStore.vipReward?.relegationRewardType == 3">{{
                $t('Vletter.Turnovercoupons')
              }}</span>
            </div>
            <div class="text">
              {{ $t('Vletter.relegationBonus') }}
            </div>
          </div>
        </div>
        <div
          class="content-card-vip-item-right"
          v-if="slidesStore.vipReward?.relegationStatus == 1"
          @click="
            onClickReceive(
              4,
              slidesStore.vipReward?.relegationRewardAmounts,
              slidesStore.vipReward?.relegationRewardType
            )
          "
        >
          {{ $t('Vletter.getrightnow') }}
        </div>
        <template v-if="slidesStore.vipReward?.relegationStatus == 0">
          <div
            v-if="
              user.userInfo.vipLevel ==
              slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex].vipLevel
            "
            class="content-card-vip-item-right bg-title"
          >
            {{ $t('Vletter.Tobecollected') }}
          </div>
          <div class="content-card-vip-item-right bg-title" v-else>
            {{ $t('Vletter.Tobecollected') }}
          </div>
        </template>
        <div
          v-if="slidesStore.vipReward?.relegationStatus == 2"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.Received') }}
        </div>
        <div
          v-if="slidesStore.vipReward?.relegationStatus == 3"
          class="content-card-vip-item-right bg-title"
        >
          {{ $t('Vletter.expired') }}
        </div>
      </div>
    </div>
    <MsgPopup ref="msgPopupDom" @onRefresh="onRefresh"></MsgPopup>
    <InformationPopup ref="informationPopupDom"></InformationPopup>
  </template>
</template>

<script setup>
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import MsgPopup from '../MsgPopup/MsgPopup'
import InformationPopup from '../InformationPopup/InformationPopup'
import grade1 from './img/grade1.png'
import grade2 from './img/grade2.png'
import grade3 from './img/grade3.png'
import grade4 from './img/grade4.png'
import grade5 from './img/grade5.png'
import { getVipGetCoupon } from '@/api/vip'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'

const user = useUserStore()

const slidesStore = useSlidesStore()
// 定义领券后的弹窗
const msgPopupDom = ref(null)
// 定义解锁的弹窗
const informationPopupDom = ref(null)
// 区分是现金还是劵
const numIndex = ref(null)
// 提现倍数
const multiple = ref(null)
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
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })

  getVipGetCoupon(params)
    .then((res) => {
      if (res.code == 200) {
        if (type) {
          // 代表劵
          numIndex.value = 0
        } else {
          // 代表现金
          numIndex.value = 1
        }
        msgPopupDom.value.showhide(numIndex.value)
      }
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
}

// 立即解锁
const openInformationPopup = (index) => {
  informationPopupDom.value.showhide(index)
}

// 点击领取弹窗后返回刷新页面
const onRefresh = () => {
  slidesStore.getMemberRightList(slidesStore.activeSlideIndex)
}
</script>

<style lang="scss" scoped>
.title {
  margin-left: 30px;
}
.content-card-vip {
  width: 345px;
  // min-height: 300px;
  border-radius: 8px;
  background: #fff;
  margin: 10px auto 0;
  padding: 0 15px;
  .content-card-vip-item {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .content-card-vip-item-left {
      display: flex;
      align-items: center;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background: #f6f7fb;
        margin-right: 12px;
      }
      .text-box {
        .titles {
          color: #000;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .text {
          color: #000;
          font-size: 12px;
          font-weight: 400;
        }
        .active-text {
          text-decoration: underline;
          color: #ff9000;
        }
      }
    }
    .content-card-vip-item-right {
      width: 64px;
      height: 28px;
      text-align: center;
      line-height: 28px;
      color: #fff;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      border-radius: 90px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
    .bg-title {
      background: #ccc;
    }
  }
}
</style>
