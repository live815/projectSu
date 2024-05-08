<template>
  <div class="time-select">
    <template v-for="(item, idx) in list" :key="idx">
      <div
        @click="selectTime(item, idx)"
        :class="{ active: currentIdx === idx }"
        class="item"
      >
        <p class="title" v-if="item.title">{{ item.title }}</p>
        <template v-else>
          <p class="date">{{ item.date }}</p>
          <!-- <p class="week">{{ item.week }}</p> -->
        </template>
      </div>
  </template>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useFBStore } from '@/stores/fb'
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const fbStore = useFBStore()
const currentIdx = ref(0)
const list =ref([])
const emit = defineEmits(['updatetime'])

//获取当天日期之后的一周日期的毫秒数和星期几
function selectTime(item, idx) {
  currentIdx.value = idx
  fbStore.skeletonLoading = true

  // 切换时间
  fbStore.queryMatchListParams.beginTime = item.beginTime
  fbStore.queryMatchListParams.endTime = item.endTime
  emit('updatetime',item.beginTime,item.endTime)
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
//   console.log(daysOfWeek[day],222222)
//   return daysOfWeek[day];
// }

list.value = getWeekDates();

list.value.forEach(date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // console.log(date.getDay(),111111)
  // const dayOfWeek = formatDayOfWeek(date.getDay());
  if(appStore.language=='zh-cn'){
    date.date = `${month}月${day}日`
  }else if(appStore.language=='vi'){
    date.date = `Ngày ${day} tháng ${month} `
  }
  // date.date = `${month}月${day}日`
 
  // date.week = `${dayOfWeek}`
  date.beginTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime()
  date.endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime();

})
list.value.unshift({title:i18n.global.t('SportsView.All')})//全部这个按钮放在最前面
//id发生变化选中的日期换成全部
watch(
  ()=>fbStore.queryMatchListParams.sportId,
  ()=>{
    if(fbStore.queryMatchListParams.type == 4){
      currentIdx.value = 0
    }
    // console.log(fbStore.queryMatchListParams.sportId,'fbStore.queryMatchListParams.sportId,')
  }
)
watch(
  ()=>fbStore.matchList,
  ()=>{
    // console.log(fbStore.matchList,'fbStore.matchList')
    fbStore.matchList?.forEach((item)=>{
      // console.log(item,'item')
      item.list?.forEach((seitem)=>{
        // console.log(seitem,'seitem',seitem.bt)
        const date = new Date(seitem.bt)//比赛开始的日期
        const month = date.getMonth() + 1; // 获取月份，注意月份从0开始，需要加1
        const day = date.getDate(); // 获取日期

        // console.log(curday,curmonth, month, "月", day, "日");
        
      })
    })
  },{deep:true, immediate: true}
)
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  overflow: auto;
  margin: 0 14px;
  margin-top:15px;
  .item {
    flex: none;
    min-width: 80px;
    padding: 0 4px;
    height: 36px;
    line-height: 36px;
    border-radius: 6px;
    border: 0.5px solid var(--unnamed, #1D223C);
    background: var(--unnamed, #1D223C);
    text-align: center;
    margin-right: 6px;
    font-size: 14px;
    cursor: pointer;
    .title {
      line-height: 34px;
    }
    .date {
      // margin-top: 2px;
      // margin-bottom: 3px;
      color: var(--60, rgba(255, 255, 255, 0.6));
    }
    .week{
      color: #666;
    }
    &.active {
      border-color: var(--color-primary);
      background:var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
      .date{
        color: #fff;
      }
    }
  }
}
</style>
