<template>
  <div class="settled-btn-group">
    <div
      class="item-btn"
      :class="{ activeBtn: btnIndex === index }"
      v-for="(item, index) in btnList"
      :key="item.value"
      @click="timeSelect(index)"
    >
      {{ item.label }}
    </div>
  </div>
  <TimeSelect v-model:showPopup="showPopup" @messageToB="getTimeFromChild" />
</template>

<script setup>
import i18n from '@/i18n/index'
import TimeSelect from './TimeSelect.vue'
import { getDateOffset, getDateTimeStampRange } from '@/utils'
const emit = defineEmits(['update:timeRange'])

const btnList = ref([
  { label: i18n.global.t('common.today'), value: 0 },
  { label: i18n.global.t('common.yesterday'), value: 1 },
  { label: i18n.global.t('common.week'), value: 2 },
  { label: i18n.global.t('common.custom'), value: 3 }
])
const btnIndex = ref(0)
const showPopup = ref(false)

// 选中指定日期
const timeSelect = (index) => {
  btnIndex.value = index
  if (index === 3) {
    showPopup.value = true
  } else if (index === 0) {
    // 今天
    emit('update:timeRange', getDateTimeStampRange(new Date()))
  } else if (index === 1) {
    // 昨天
    emit('update:timeRange', getDateTimeStampRange(getDateOffset(-1)))
  } else if (index === 2) {
    // 7天
    const currentDate = new Date()
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(currentDate.getDate() - 6)
    const startTime = new Date(
      sevenDaysAgo.getFullYear(),
      sevenDaysAgo.getMonth(),
      sevenDaysAgo.getDate(),
      0,
      0,
      0,
      0
    ).getTime()
    const endTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    ).getTime()
    emit('update:timeRange', { startTime, endTime })
  }
}
const getTimeFromChild = (val) => {
  emit('update:timeRange', val)
}

// 初始化
timeSelect(0)
</script>

<style lang="scss" scoped>
.settled-btn-group {
  display: flex;
  .item-btn {
    width: 70px;
    height: 28px;
    color: var(--color-111);
    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    margin-right: 12px;
    border-radius: 60px;
    background: #eee;
    &:last-child {
      margin-right: 0;
    }
    &.activeBtn {
      border: 0.5px solid var(--color-primary);
      background: #fff5f0 !important;
      color: var(--color-primary) !important;
    }
  }
}
</style>
