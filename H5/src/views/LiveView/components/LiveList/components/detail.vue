<template>
  <div class="detail">
    <div v-if="[4, 6].includes(data?.roomStyle)" class="vs">{{ data?.roomTitle }}</div>
    <div v-else class="vs">{{ data?.mainName }} VS {{ data?.cusName }}</div>
    <p class="info">
      <img
        class="avatar"
        :src="data?.presenterAvatar ? getImg(data?.presenterAvatar) : defaultAvatar"
      />
      {{ data?.presenterName }}
    </p>
  </div>
</template>
<script setup>
import { getImg } from '@/utils'
import defaultAvatar from './img/defaultAvatar.png'
defineProps(['data'])
</script>
<style lang="scss" scoped>
.detail {
  padding: 8px;
  .vs {
    @include textToOmit(200px);
    color: #333;

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 114.286% */
  }
  .info {
    @include textToOmit(100px);
    margin-top: 10px;
    color: #333;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 100% */
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #ff9000;
      margin-right: 4px;
      vertical-align: top;
    }
  }
}
</style>
