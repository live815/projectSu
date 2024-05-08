<template>
  <div class="time-select">
    <div
      @click="selecTime(item, idx)"
      :class="{ active: currentIdx === idx }"
      class="item"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <p class="title" v-if="item.title">{{ item.title }}</p>
      <template v-else>
        <p>{{ item.date }}</p>
        <p>{{ item.week }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useFBStore } from '@/stores/fb'
import { ref } from 'vue'
import i18n from '@/i18n'
const fbStore = useFBStore()
const currentIdx = ref(0)
const list = ref([])

//获取当天日期之后的一周日期的毫秒数和星期几
function selecTime(item, idx) {
  currentIdx.value = idx
  // 切换时间
  fbStore.queryMatchListParams.beginTime = item.beginTime
  fbStore.queryMatchListParams.endTime = item.endTime
}
function getWeekDates() {
  const today = new Date()
  const weekDates = []

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    weekDates.push(date)
  }

  return weekDates
}

function formatDayOfWeek(day) {
  const daysOfWeek = [
    i18n.global.t('Sportsview.Sunday'),
    i18n.global.t('Sportsview.Monday'),
    i18n.global.t('Sportsview.Tuesday'),
    i18n.global.t('Sportsview.Wednesday'),
    i18n.global.t('Sportsview.Thursday'),
    i18n.global.t('Sportsview.Friday'),
    i18n.global.t('Sportsview.Saturday')
  ]
  return daysOfWeek[day]
}

onMounted(() => {
  list.value = getWeekDates()

  list.value.forEach((date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dayOfWeek = formatDayOfWeek(date.getDay())
    date.date = `${month}/${day}`
    date.week = `${dayOfWeek}`
    date.beginTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    ).getTime()
    date.endTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    ).getTime()
  })
  list.value.unshift({ title: i18n.global.t('Sportsview.all') })
})
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  overflow: auto;
  margin: 0 14px;
  margin-top: 15px;
  .item {
    flex: none;
    width: 50px;
    height: 35px;
    border-radius: 6px;
    border: 0.5px solid #dee3ec;
    background: #fff;
    text-align: center;
    margin-right: 6px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      line-height: 17.5px;
    }

    &.active {
      border-color: var(--color-primary);
      background: #fff5f0;
      color: var(--color-primary);
    }
  }
}
</style>
