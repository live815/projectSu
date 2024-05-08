<template>
  <div class="popular-live-view">
    <div class="left" @click="showBottom = true">
      <div class="title">lựa chọn ngày</div>
      <div class="line"></div>
      <img :src="dateIcon" />
    </div>
    <div class="list-box" v-if="matchScheduleList.length">
      <div
        class="right"
        v-for="item in matchScheduleList"
        :key="item.gameId"
        @click="router.push(`/match-detail/${item.gameId}`)"
      >
        <div class="head">
          <p class="league-name">{{ item.leagueNameLocal }}</p>
        </div>
        <div class="center">
          <div class="main">
            <img :src="item.icons?.split(',')[0] || defaultIcon" />
            <p class="name">{{ item.mainNameLocal }}</p>
          </div>
          <div class="date">
            <p>{{ dayjs(item.gameTime).format('MM-DD') }}</p>
            <p>{{ dayjs(item.gameTime).format('HH:mm') }}</p>
          </div>
          <div class="cus">
            <img :src="item.icons?.split(',')[1] || defaultIcon" />
            <p class="name">{{ item.cusNameLocal }}</p>
          </div>
        </div>
        <button class="status">{{ item.gameStatus ? 'Đã bắt đầu' : 'Chưa bắt đầu' }}</button>
        <img class="ball" :src="ball" />
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
</template>

<script setup>
import ball from './img/ball.png'
import dateIcon from './img/date.png'
import dayjs from 'dayjs'
import i18n from '@/i18n'
import { getMatchListFront } from '@/api/live.js'
import defaultIcon from '@/assets/img/default-team-logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const showBottom = ref(false)
const columnsType = ref(['year', 'month', 'day'])
const minDate = new Date()
const maxDate = new Date(2030, 12, 31)
const currentDate = ref([])
const matchScheduleList = ref([])

const init = () => {
  // 获取当天的起始时刻（0点）
  const startOfDay = dayjs().startOf('day')
  // 获取当天的结束时刻（23点59分59秒）
  const endOfDay = dayjs().endOf('day')
  // 获取13位时间戳
  const gameTimeStart = startOfDay.valueOf()
  const gameTimeEnd = endOfDay.valueOf()

  getMatchListFront({ gameTimeStart, gameTimeEnd }).then((res) => {
    if (res.code === 200) {
      matchScheduleList.value = res.data.list.filter((item) => item.gameStatus !== 2)
    }
  })
}
init()

const confirmBtn = (selectedValues) => {
  const [year, month, day] = selectedValues.selectedValues
  const formattedDate = dayjs(`${year}-${month}-${day}`).toDate()
  const date = dayjs(formattedDate).format('YYYY-MM-DD')

  // 计算选择日期的起始时间戳
  const gameTimeStart = dayjs(dayjs(`${date} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')).valueOf()
  // 计算选择日期的结束时间戳
  const gameTimeEnd = dayjs(dayjs(`${date} 23:59:59`).format('YYYY-MM-DD HH:mm:ss')).valueOf()

  const param = {
    gameTimeStart,
    gameTimeEnd
  }
  getMatchListFront(param).then((res) => {
    if (res.code === 200) {
      matchScheduleList.value = res.data.list
    }
  })
  showBottom.value = false
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
</script>

<style lang="scss" scoped>
:deep() {
  [class*='van-hairline']:after {
    border: none;
  }
}
.popular-live-view {
  display: flex;
  margin: 10px 0 20px 15px;
  .left {
    width: 30px;
    border-radius: 4px;
    border: 0.5px solid #ededef;
    background: #f8fcff;
    text-align: center;
    padding: 5px 0;
    color: #333;

    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    .title {
      font-size: 10px;
      line-height: 19px;
    }
    .line {
      width: 26px;
      height: 1px;
      background: #edefee;
      margin: 4px auto;
    }
    img {
      width: 17px;
      height: 19px;
    }
  }
  .list-box {
    display: flex;
    overflow: auto;
  }
  .right {
    position: relative;
    min-width: 184px;
    border-radius: 4px;
    border: 0.5px solid #ededef;
    background: #f8fcff;
    color: #333;

    text-align: center;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
    padding: 5px 8px;
    margin-right: 10px;
    img {
      width: 24px;
      height: 24px;
    }
    .head {
      display: flex;
      justify-content: space-between;
      .league-name {
        @include textToOmit(200px);
        color: #999;
        font-size: 10px;
      }
      .dynamic {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #ff9000;
      }
    }
    .center {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      margin-top: 12px;

      .date {
        color: #666;
        font-size: 10px;
        line-height: 18px;
      }
      .name {
        @include textToOmit(60px);
      }
    }
    .status {
      position: relative;
      z-index: 1;
      height: 17px;
      border-radius: 2px;
      background: linear-gradient(90deg, #ff9000 25%, #ff5000 89.06%);
      border: none;
      color: #fff;
      font-size: 10px;
      margin-top: 5px;
    }
    .ball {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 0;
      width: 68px;
      height: 60px;
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
</style>
