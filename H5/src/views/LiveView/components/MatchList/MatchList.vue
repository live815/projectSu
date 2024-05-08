<template>
  <div class="MatchList-views">
    <div class="matchList">
      <div class="matchlist-top">
        <div class="matchList-top-wrap">
          <div
            @click="selecTime(item, idx)"
            :class="{ active: currentIdx === idx }"
            class="item"
            v-for="(item, idx) in list"
            :key="idx"
          >
            <p class="title" v-if="item.title">{{ item.title }}</p>
            <template v-else>
              <p class="date">{{ item.date }}</p>
              <p class="week">{{ item.week }}</p>
            </template>
          </div>

          <div class="dateIcon" @click="openTimeDialog">
            <img :src="iconDate" alt="" />
          </div>
        </div>

        <!-- 日期选择器 -->
        <van-popup class="datePicker" v-model:show="showBottom" round position="bottom">
          <div class="datepicker-wrap">
            <van-date-picker
              :title="$t('Lletter.chosedate')"
              v-model="currentDate"
              :min-date="minDate"
              :max-date="maxDate"
              :columns-type="columnsType"
              @confirm="confirmBtn"
              @cancel="showBottom = false"
              :formatter="formatter"
            />
            <div class="overlay"></div>
          </div>
        </van-popup>
      </div>

      <EventLists />
    </div>
  </div>
</template>

<script setup>
import { useFBStore } from '@/stores/fb'
import { ref } from 'vue'
import iconDate from './img/dateIcon.png'
import EventLists from './components/EventLists.vue'
import dayjs from 'dayjs'
import eventBus from '@/utils/eventBus'
import i18n from '@/i18n'

const fbStore = useFBStore()
const currentIdx = ref(0)
const list = ref([])
// 日期选择器
const showBottom = ref(false)
const currentDate = ref('')
const columnsType = ref(['year', 'month', 'day'])
const minDate = new Date()
const maxDate = new Date(2030, 12, 31)

const handleTime = (date) => {
  // 计算选择日期的起始时间戳
  const gameTimeStart = dayjs(dayjs(`${date} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')).valueOf()
  // 计算选择日期的结束时间戳
  const gameTimeEnd = dayjs(dayjs(`${date} 23:59:59`).format('YYYY-MM-DD HH:mm:ss')).valueOf()
  eventBus.emit('queryByTime', {
    gameTimeStart,
    gameTimeEnd,
  })
}
//获取当天日期之后的一周日期的毫秒数和星期几
function selecTime(item, idx) {
  const formattedDate = dayjs(item).format('YYYY-MM-DD')
  handleTime(formattedDate)

  currentIdx.value = idx
  // 切换时间
  fbStore.queryMatchListParams.beginTime = item.beginTime
  fbStore.queryMatchListParams.endTime = item.endTime
}
function getWeekDates() {
  const today = new Date()
  const weekDates = []

  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let day = today.getDate()
  currentDate.value = [year, month, day] //打开选中今日

  weekDates.push(today)

  for (let i = 1; i <= 7; i++) {
    const date = new Date()
    date.setDate(today.getDate() + i)
    weekDates.push(date)
  }
  return weekDates
}

function formatDayOfWeek(day) {
  const daysOfWeek = [
    i18n.global.t('Lletter.Sunday'),
    i18n.global.t('Lletter.Monday'),
    i18n.global.t('Lletter.Tuesday'),
    i18n.global.t('Lletter.Wednesday'),
    i18n.global.t('Lletter.Thursday'),
    i18n.global.t('Lletter.Friday'),
    i18n.global.t('Lletter.Saturday')
  ]
  return daysOfWeek[day]
}

list.value = getWeekDates()

// 格式化日期和月份为两位数
const formatTwoDigitNumber = (num) => {
  return num < 10 ? `0${num}` : num.toString()
}

list.value.forEach((date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = formatDayOfWeek(date.getDay())
  const mon = formatTwoDigitNumber(month)
  const da = formatTwoDigitNumber(day)
  date.date = `${mon}.${da}`
  // date.week = `${dayOfWeek}`
  date.week = isToday(date) ? i18n.global.t('Lletter.today') : `${dayOfWeek}`
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

// 判断日期是否为今日
function isToday(date) {
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const formatter = (type, option) => {
  if (type === 'year') {
    option.text += i18n.global.t('Lletter.year')
  }
  if (type === 'month') {
    option.text += i18n.global.t('Lletter.month')
  }
  if (type === 'day') {
    option.text += i18n.global.t('Lletter.day')
  }
  return option
}

function openTimeDialog() {
  showBottom.value = true
}

function confirmBtn(selectedValues) {
  const [year, month, day] = selectedValues.selectedValues
  const formattedDate = dayjs(`${year}-${month}-${day}`).toDate()
  const formattedDates = dayjs(formattedDate).format('YYYY-MM-DD')

  handleTime(formattedDates)
  currentIdx.value = null
  showBottom.value = false
}
</script>

<style lang="scss" scoped>
:deep() {
  [class*='van-hairline']:after {
    border: none;
  }
}
.MatchList-views {
  .matchList {
    .matchlist-top {
      position: relative;
      margin: 0 auto;
      margin-top: 15px;
      width: 94%;
      .matchList-top-wrap {
        display: flex;
        overflow: auto;
        width: 85%;
      }
      .item {
        flex: none;
        width: 54px;
        height: 54px;
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
        .title {
          line-height: 34px;
        }
        .date {
          margin-top: 2px;
          margin-bottom: 3px;
          color: #666;
        }
        .week {
          color: #666;
        }
        &.active {
          border-color: #ff5000;
          background: #fff5f0;
          color: var(--color-primary);
          .date,
          .week {
            color: var(--color-primary);
          }
        }
      }
      .dateIcon {
        display: block;
        width: 54px;
        height: 54px;
        background: url('./img//dateBg.png');
        position: absolute;
        right: 0;
        img {
          display: block;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 10px;
          right: 3px;
        }
      }
      .datePicker {
        position: relative;
        .overlay {
          position: absolute;
          z-index: 2022;
          top: 50%;
          left: 15px;
          width: 92%;
          height: 15%;
          background-color: rgba(43, 42, 42, 0.1);
          pointer-events: none;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
