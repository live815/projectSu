<template>
  <div class="boxRecords">
    <div class="bodyDiv" v-for="(item, index) in orderList" :key="index">
      <div class="l1">LV {{ item.vipLevel}}</div>
      <div class="l2 txt">{{ item.memberName }}</div>
      <div class="l2 l3">{{$t('AnchorPlay.FolloweAnOrder')}}</div>
      <div class="l2 l4">{{ dayjs.unix(item.pushOrderTimeStr).format('HH:mm') }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getFollowList } from '@/api/liveBroadcast'
import dayjs from 'dayjs'
const anchorDebut = ref(JSON.parse(localStorage.getItem('AnchorDebut')))
const orderList = ref([])
const intervalId = ref(null)
onMounted(() => {
  getOrder()
  timerFun()
})
const getOrder = async () => {
  let data = {
    liveStreamId: anchorDebut.value.id,
    page: 1,
    pageSize: 999
  }
  try {
    let res = await getFollowList(data)
    orderList.value = res.data.list
  } catch (e) {
    console.log(e)
  }
}
const timerFun = () => {
  clearInterval(intervalId.value)
  intervalId.value = setInterval(getOrder, 8000) // 每3秒调用 yourMethod 方法
}
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<style lang="scss" scoped>
.boxRecords {
  margin: 20px;
  .bodyDiv {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .l1 {
      width: 40px;
      height: 16px;
      flex-shrink: 0;
      background: linear-gradient(275deg, #fa4c4c 0.69%, #fa825a 71.76%);
      border-radius: 5px 40px 40px 5px;
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .l2 {
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 12px;
    }
    .txt {
      width: 60px;
      white-space: nowrap; /* 防止文字换行 */
      overflow: hidden; /* 隐藏溢出的部分 */
      text-overflow: ellipsis; /* 显示省略号 */
      margin-left: 5px;
    }
    .l3 {
      width: 48px;
      margin-left: 20px;
    }
    .l4 {
      text-align: right;
      margin-left: 15px;
    }
  }
}
</style>
