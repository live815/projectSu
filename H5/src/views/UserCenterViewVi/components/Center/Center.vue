<template>
  <div class="record-view">
    <div @click="router.push('user-center-bet-record')">
      <img src="./img/record.png" />
      <p>Lịch Sử</p>
    </div>
    <div class="line"></div>
    <div @click="router.push('transaction-record')">
      <img src="./img/details.png" />
      <p>Chi Tiết</p>
    </div>
    <div class="line"></div>
    <div @click="router.push('live')">
      <img src="./img/live.png" />
      <p>Trực Tiếp</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
.record-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 37px;
  color: #333;
  text-align: center;
  background: #fff;

  img {
    width: 42px;
    height: 42px;
  }
  .line {
    width: 1px;
    height: 46px;
    background: #eee;
  }
}
</style>