<template>
  <div>
    <el-dialog :title="getTitle()" v-model="open" center :before-close="closeBtn">
      <div class="text">
        {{ getDayStr() }}
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
            <div class="popup-content-item-right">{{ $t('GeneralUserCenter.Completed') }}</div>
          </template>
          <template v-else>
            <div class="popup-content-item-right heightTitle" @click="onClickOpen">
              {{ $t('GeneralUserCenter.ToComplete') }}
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
            <div class="popup-content-item-right">{{ $t('GeneralUserCenter.Completed') }}</div>
          </template>
          <template v-else>
            <div class="popup-content-item-right heightTitle" @click="router.push('/sports')">
              {{ $t('GeneralUserCenter.ToComplete') }}
            </div>
          </template> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useSlidesStore } from '@/stores/vipSlides'
import { toFormatNumber } from '@/utils'
import eventBus from '@/utils/eventBus'
import { useRouter } from 'vue-router'
const router = useRouter()
const slidesStore = useSlidesStore()

const emit = defineEmits(['close'])

const props = defineProps({
  rowIndex: {
    type: Number
  },
  isShow: {
    type: Boolean
  }
})
const informationShow = ref(false)
const open = ref(true)

// 计算标题
const getTitle = () => {
  return props.rowIndex === 4
    ? i18n.global.t('GeneralUserCenter.CalculationTimeThisMonth')
    : i18n.global.t('GeneralUserCenter.CalculationTimeThisWeek')
}

// 计算天数字符串
const getDayStr = () => {
  return props.rowIndex === 4
    ? slidesStore.vipReward?.monthDayStr
    : slidesStore.vipReward?.weekDayStr
}

// 计算存款标题
const getDepositTitle = () => {
  return props.rowIndex === 4
    ? i18n.global.t('GeneralUserCenter.CumulativeDepositLimitThisMonth')
    : i18n.global.t('GeneralUserCenter.CumulativeDepositLimitThisWeek')
}
// 计算当前存款奖励
const getCurrentRewardDp = () => {
  return toFormatNumber(
    props.rowIndex === 4
      ? Number(slidesStore.vipReward?.monthRewardDp)
      : Number(slidesStore.vipReward?.weeklyRewardDp)
  )
}

// 计算最低存款额度
const getLeastDp = () => {
  return toFormatNumber(
    props.rowIndex === 4
      ? Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastDp)
      : Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastDp)
  )
}

// 判断存款是否已完成
const isDepositCompleted = () => {
  if (props.rowIndex === 4) {
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
  return props.rowIndex === 4
    ? i18n.global.t('GeneralUserCenter.CumulativeTurnoverThisMonth')
    : i18n.global.t('GeneralUserCenter.CumulativeTurnoverThisWeek')
}

// 计算当前流水奖励
const getCurrentRewardTu = () => {
  return toFormatNumber(
    props.rowIndex === 4
      ? Number(slidesStore.vipReward?.monthRewardTu)
      : Number(slidesStore.vipReward?.weeklyRewardTu)
  )
}

// 计算最低流水额度
const getLeastTurnover = () => {
  return toFormatNumber(
    props.rowIndex === 4
      ? Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.monthLeastTurnover)
      : Number(slidesStore.vipLevelsList[slidesStore.getActiveSlideIndex]?.weeklyLeastTurnover)
  )
}

// 判断流水是否已完成
const isTurnoverCompleted = () => {
  if (props.rowIndex === 4) {
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
// 关闭弹窗
const closeBtn = () => {
  informationShow.value = false
  emit('close', false)
}

// 打开充值
const onClickOpen = () => {
  const params = {
    isOpen: true
  }
  eventBus.emit('showCharge', params)
  emit('close', false)
}
</script>
<style lang="scss" scoped>
:deep() {
  .el-dialog {
    position: relative;
    border-radius: 2px;
    width: 480px;
    background: #272b45;

    box-shadow: 0px 14px 28px 0px rgba(0, 0, 0, 0.4);
    .el-dialog__header {
      opacity: 0.5;
      background: #3f4671;
      width: 100%;
      .el-dialog__title {
        color: #fff;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
      }
    }
  }
}
.text {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 224px;
  height: 20px;
  border-radius: 40px;
  background: #171a2f;
  color: var(--unnamed, #ff9000);
  text-align: center;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  // margin: 0 auto;
}
.popup-content {
  width: 440px;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0px 0px 12px 12px;
  background: #232949;
  .popup-content-item {
    width: 440px;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    margin: 8px 0;
    background: #323c6f;
    .popup-content-item-left {
      color: #fff;
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
      min-width: 64px;
      height: 28px;
      margin-right: 12px;
      border-radius: 90px;
      background: var(--unnamed, #1d223c);
      color: var(--60, rgba(255, 255, 255, 0.6));
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
