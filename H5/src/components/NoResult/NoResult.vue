<template>
  <div class="box">
    <img :src="props.imgSrc" />
    <div class="txt">{{ props.noTxt || $t('common.noData') }}</div>
  </div>
</template>

<script setup>
import defaultimage from './img/default.png'
const props = defineProps({
  noTxt: {
    type: String
  },
  imgSrc: {
    default: defaultimage
  }
})
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
  }
  .txt {
    color: #999;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    margin-top: 10px;
  }
}
</style>
