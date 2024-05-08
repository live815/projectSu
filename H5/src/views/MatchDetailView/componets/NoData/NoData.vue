<template>
  <div class="no-data">
    <img width="200" height="125" :src="noData" />
    <div class="text">{{ text || $t('Mletter.Nodata') }}</div>
  </div>
</template>

<script setup>
import noData from './img/noData.png'

defineProps(['text'])
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
  margin-top: 120px;
  .text {
    color: #999;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
