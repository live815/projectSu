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
        <p class="date">{{ item.date }}</p>
        <!-- <p class="week">{{ item.week }}</p> -->
      </template>
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useFBStore } from '@/stores/fb'
import { ref } from 'vue'
const fbStore = useFBStore()
const currentIdx = ref(0)
const list =ref([])

//获取当天日期之后的一周日期的毫秒数和星期几
function selecTime(item, idx) {
  currentIdx.value = idx
  // 切换时间
  fbStore.queryMatchListParams.beginTime = item.beginTime
  fbStore.queryMatchListParams.endTime = item.endTime
}
function getWeekDates() {
  const today = new Date();
  const weekDates = [];

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
}

// function formatDayOfWeek(day) {
//   const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//   return daysOfWeek[day];
// }

list.value = getWeekDates();

list.value.forEach(date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const dayOfWeek = formatDayOfWeek(date.getDay());
  date.date = `${month}-${day}`
  // date.week = `${dayOfWeek}`
  date.beginTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime()
  date.endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime();

})
list.value.unshift({title:i18n.global.t('SportsView.All')})
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  overflow: auto;
  margin: 0 14px;
  margin-top:15px;
  .item {
    flex: none;
    width: 80px;
    height: 33px;
    border-radius: 6px;
    border: 0.5px solid #1D223C;
    background: #1D223C;
    text-align: center;
    margin-right: 6px;
    line-height: 30px;
    cursor: pointer;
    color: var(--60, rgba(255, 255, 255, 0.70));
    .title {
      line-height: 34px;
    }
    .date {
      margin-top: 2px;
      margin-bottom: 3px;
      color: var(--60, rgba(255, 255, 255, 0.60));
      line-height: 30px;
    }
    .week{
      color: #666;
    }
    &.active {
      border-color: var(--color-primary);
      background: var(--unnamed, linear-gradient(90deg, #FF9000 25%, #F35F1B 89.06%));
      color: #fff;
    }
  }
}
</style>
