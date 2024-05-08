<template>
  <div class="main-container Vip">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- 轮播内容 -->
        <div
          class="swiper-slide"
          v-for="(item, index) in vipLevelsList"
          :key="item.vipLevel"
          @click="onClickItem(item)"
        >
          <div class="swiper-item" :style="{ backgroundImage: `url(${imgBgPath(index)}` }">
            <div class="swiper-item-overlay" v-if="index !== slidesStore.getActiveSlideIndex"></div>
            <div class="swiper-item-box">
              <div class="swiper-item-box-left">
                <div class="text">
                  {{
                    user.userInfo.vipLevel >= index
                      ? $t('GeneralUserCenter.Unlocked')
                      : $t('GeneralUserCenter.ToBeUnlocked')
                  }}
                </div>
                <div class="vip">
                  <span class="span">V{{ item.vipLevel }}</span
                  ><span>{{ $t('GeneralUserCenter.Member') }}</span>
                </div>
              </div>
              <div class="swiper-item-box-right">
                <img :src="imgPath(index)" />
              </div>
            </div>
            <div class="swiper-item-title">
              <div
                class="level"
                v-if="
                  user.userInfo.vipLevel == 0 &&
                  index == 0 &&
                  slidesStore.vipReward.currentDpBet == 0
                "
              >
                <span>{{ $t('GeneralUserCenter.Finish') }}</span>
                <span class="span-two" @click.stop="onClickDepositNow">{{
                  $t('GeneralUserCenter.FirstDeposit')
                }}</span>
                <span>{{ $t('GeneralUserCenter.InitialDepositLast') }}</span>
              </div>
              <template v-else>
                <div
                  class="level"
                  v-if="item.vipLevel == user.userInfo.vipLevel && item.vipLevel > 1"
                >
                  {{ $t('GeneralUserCenter.RelegationRemaining') }}:<span class="span">{{
                    slidesStore.relegationLeastDay
                  }}</span
                  ><span class="spans">{{ $t('GeneralUserCenter.Days') }}</span>
                </div>
                <div class="level" v-else>
                  {{ $t('GeneralUserCenter.RelegationRemaining') }}:<span class="span">-</span>
                </div>
              </template>
            </div>
            <div
              class="swiper-item-progress"
              :class="{ 'swiper-item-progress-footer': slidesStore.vipReward.currentDpBet }"
            >
              <div class="swiper-item-progress-left">vip{{ index }}</div>
              <div class="swiper-item-progress-min" v-if="user.userInfo.vipLevel == index">
                <div class="swiper-item-progress-min-box">
                  <div class="swiper-item-progress-min-box-child">
                    <div
                      v-for="index in totalDots"
                      :key="index"
                      class="dot"
                      :class="{ highlight: index <= highlightCount }"
                    ></div>
                  </div>
                </div>
                <div
                  class="pointer"
                  :class="{ 'pointer-one': onComputedProgressPercentage == 100 }"
                >
                  <div class="text">{{ onComputedProgressPercentage }}%</div>
                  <img class="img" :src="pointer" />
                </div>
              </div>
              <div class="swiper-item-progress-min" v-if="user.userInfo.vipLevel > index">
                <div class="swiper-item-progress-min-box">
                  <div class="swiper-item-progress-min-box-child">
                    <div
                      v-for="index in totalDots"
                      :key="index"
                      class="dot"
                      :class="{ highlight: index <= 100 }"
                    ></div>
                  </div>
                </div>
                <div class="pointer pointer-one">
                  <div class="text">{{ 100 }}%</div>
                  <img class="img" :src="pointer" />
                </div>
              </div>
              <div class="swiper-item-progress-min" v-if="user.userInfo.vipLevel < index">
                <div class="swiper-item-progress-min-box">
                  <div class="swiper-item-progress-min-box-child">
                    <div
                      v-for="index in totalDots"
                      :key="index"
                      class="dot"
                      :class="{ highlight: index <= 0 }"
                    ></div>
                  </div>
                </div>
                <div class="pointer pointer-two">
                  <div class="text">{{ 0 }}%</div>
                  <img class="img" :src="pointer" />
                </div>
              </div>

              <div class="swiper-item-progress-right" v-if="index < 11">vip{{ index + 1 }}</div>
            </div>
            <!-- <div
              class="swiper-item-footer"
              v-if="
                user.userInfo.vipLevel == 0 && index == 0 && slidesStore.vipReward.currentDpBet == 0
              "
            >
              {{ $t('GeneralUserCenter.Finish')
              }}<span> {{ $t('GeneralUserCenter.FirstDeposit') }}</span
              >{{ $t('GeneralUserCenter.MoveToNextLevel') }}
            </div> -->
            <div class="swiper-item-footers"></div>
          </div>
        </div>
      </div>
    </div>
    <VipRecord></VipRecord>
    <VipOverview></VipOverview>
    <VipUpgrade></VipUpgrade>
    <template v-if="slidesStore.vipSwitchConfigData.rebateSwitch == '0'">
      <VipDiscount></VipDiscount>
    </template>
    <VipPrivileges></VipPrivileges>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import pointer from './img/pointer.png'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import VipRecord from './components/VipRecord.vue'
import VipOverview from './components/VipOverview.vue'
import VipUpgrade from './components/VipUpgrade.vue'
import VipDiscount from './components/VipDiscount.vue'
import VipPrivileges from './components/VipPrivileges.vue'
import { useSlidesStore } from '@/stores/vipSlides'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const slidesStore = useSlidesStore()
slidesStore.getList()
let mySwiperPush = null // 保存 Swiper 实例的引用

// 引用静态图片
const imgPath = (index) => {
  return new URL(`./img/v${index}.png`, import.meta.url).href
}

// 引入静态背景图
const imgBgPath = (index) => {
  return new URL(`./img/vip-${index}.png`, import.meta.url).href
}

// 总共的圆点数量
const totalDots = ref(53)

// 计算高亮圆点数量的计算属性
const highlightCount = computed(() => {
  const calculatedCount = Math.round((onComputedProgressPercentage.value / 100) * totalDots.value)
  // 确保高亮圆点数量不超过总共的圆点数量
  return Math.min(calculatedCount, totalDots.value)
})

// 进度条的百分比
const onComputedProgressPercentage = computed(() => {
  const activeIndex = user.userInfo.vipLevel
  const vipLevel = slidesStore.vipLevelsList[activeIndex]
  if (!vipLevel) {
    return 0
  }
  if (user.userInfo.vipLevel == 0) {
    const dpBetPercentage = userVipReward.value?.currentDpBet >= vipLevel.upgradeLeastDp ? 100 : 0
    return dpBetPercentage
  } else {
    const upgradeLeastDp = userVipReward.value.upgradeLeastDp
      ? userVipReward.value.upgradeLeastDp
      : 0
    const upgradeLeastTurnover = userVipReward.value.upgradeLeastTurnover
      ? userVipReward.value.upgradeLeastTurnover
      : 0
    const deposit = (userVipReward.value.currentDpBet / upgradeLeastDp) * 1
    const upGradeleast = (userVipReward.value.currentUpgradeBet / upgradeLeastTurnover) * 1
    let progressPercentage = 0
    if (deposit >= 1 && upGradeleast >= 1) {
      progressPercentage = 100
    } else if (deposit >= 1 && upGradeleast < 1) {
      progressPercentage = 50 + upGradeleast * 50
    } else if (deposit < 1 && upGradeleast >= 1) {
      progressPercentage = 50 + deposit * 50
    } else {
      progressPercentage = deposit * 50 + upGradeleast * 50
    }
    return `${progressPercentage.toFixed(2)}`
  }
})

const pointerLeftOffset = computed(() => {
  if (onComputedProgressPercentage.value > 66) {
    return `${onComputedProgressPercentage.value - 1}%`
  }
  // 根据进度条的百分比来计算新的left值
  return `${onComputedProgressPercentage.value}%`
})

// 更新CSS变量的值
const updatePointerLeftOffset = () => {
  if (onComputedProgressPercentage.value > 0) {
    document.documentElement.style.setProperty('--pointer-left-offset', pointerLeftOffset.value)
  } else {
    document.documentElement.style.setProperty('--pointer-left-offset', '6.5%') // Replace '10%' with the desired value
  }
}

// vip等级信息
const vipLevelsList = computed(() => {
  return slidesStore.vipLevelsList
})

// 定义自身等级的各自
const userVipReward = ref({})
onMounted(async () => {
  await slidesStore.getList()
  await slidesStore.getMemberRightList(user.userInfo.vipLevel)
  initSwiper()
})

const initSwiper = () => {
  mySwiperPush = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    initialSlide: slidesStore.getActiveSlideIndex
  })
  userVipReward.value = slidesStore.vipReward
  mySwiperPush.on('slideChange', (swiper) => handleSlideChange(swiper))
  updatePointerLeftOffset()
}

//监听滑动
const handleSlideChange = (swiper) => {
  slidesStore.changeSlide(swiper.realIndex)
  slidesStore.getMemberRightList(swiper.realIndex)
}

// 点击进行跳转滑动
const onClickItem = (item) => {
  slidesStore.changeSlide(item.vipLevel)
  slidesStore.getMemberRightList(item.vipLevel)
}

// 立即存款
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

<style lang="scss" scoped>
.Vip {
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 5px;
  background: #272b45;
  border-radius: 8px;
  min-height: 500px;

  .swiper-container {
    display: flex;
    align-items: center;
    height: 213px;
    overflow: auto;
    .swiper-wrapper {
      align-items: center;
    }
    .swiper-slide {
      width: 335px;
      height: 170px;
      margin: 0 20px;
      .swiper-item {
        overflow: hidden;
        border-radius: 10px;
        height: 100%;
        .swiper-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
        }
        .swiper-item-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .swiper-item-box-left {
            .text {
              margin: 10px 0 0 13px;
              min-width: 44px;
              height: 18px;
              border-radius: 4px;
              background: rgba(255, 255, 255, 0.1);
              line-height: 18px;
              text-align: center;
              color: rgba(255, 255, 255, 0.5);

              font-size: 12px;
              font-style: normal;
            }
            .vip {
              margin: 15px 0 10px 0;
              .span {
                margin-left: 15px;
                color: rgba(255, 255, 255, 0.9);
                text-align: center;
                font-family: HYYaKuHeiW;
                font-size: 30px;
                font-style: normal;
                font-weight: 400;
              }
              span {
                color: rgba(255, 255, 255, 0.9);
                text-align: center;

                font-size: 15px;
                font-style: normal;
                font-weight: 400;
                margin-left: 8px;
              }
            }
          }
          .swiper-item-box-right {
            min-width: 85px;
            height: 85px;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .swiper-item-title {
          .level {
            margin-left: 15px;
            color: rgba(255, 255, 255, 0.9);

            font-size: 12px;
            font-weight: 400;
            .span-one {
              color: var(--2, #ff5000);
              font-size: 20px;
              font-weight: 600;
            }
            .span-two {
              color: var(--2, #ff5000);
              font-size: 12px;
              font-weight: 600;
              text-decoration-line: underline;
            }
            .span {
              margin-left: 5px;
              color: var(--1, #ff9000);
              font-size: 20px;
              font-weight: 600;
            }
            .spans {
              color: var(--1, #ff9000);
              font-size: 12px;
            }
          }
        }
        .swiper-item-progress {
          display: flex;
          align-items: center;

          margin: 23px 0 3px 15px;
          .swiper-item-progress-left,
          .swiper-item-progress-right {
            width: 31px;
            text-align: center;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            font-size: 12px;
            font-weight: 400;
          }
          .swiper-item-progress-min {
            position: relative;
            margin: 0 5px;
            width: 215px;
            height: 6px;
            .swiper-item-progress-min-box {
              display: flex;
              align-items: center;
              padding: 0 3px;
              width: 100%;
              height: 100%;
              border-radius: 60px;
              background: rgba(255, 255, 255, 0.1);
              position: relative;
            }
            .swiper-item-progress-min-box-child {
              display: flex;
              justify-content: space-between; /* 使用Flexbox布局 */
              box-sizing: border-box;
            }
            .dot {
              width: 3px;
              height: 4px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              margin-right: 1px;
              box-sizing: border-box;
              transition: background 0.3s;
            }

            .dot.highlight {
              background: rgba(255, 255, 255, 0.7);
            }
            .pointer {
              position: absolute;
              top: -24px;
              left: calc(-16px + var(--pointer-left-offset, 0px)); /* 使用CSS变量来控制left值 */
              text-align: center;
              .text {
                color: rgba(255, 255, 255, 0.7);

                font-size: 10px;
              }
              .img {
                width: 6px;
                height: 8px;
              }
            }
            .pointer-one {
              left: 200px;
            }
            .pointer-two {
              left: -5px;
            }
          }

          .swiper-item-progress-right {
            margin-right: 16px;
          }
        }
        .swiper-item-progress-footer {
          margin-bottom: 23px;
        }
        .swiper-item-footer {
          width: 152px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 60px;
          margin: 0 auto 3px;
          background: linear-gradient(281deg, #ffe4ba 23.66%, #ffe4ba 73.84%);
          color: #111;

          font-size: 12px;
          span {
            color: var(--2, #ff5000);
            font-weight: 600;
          }
        }
        .swiper-item-footers {
          width: 152px;
          height: 20px;
        }
      }
    }
  }
}
</style>

