<template>
  <div class="main-box">
    <div class="img-box"></div>
    <div class="text-box">{{ $t('Wletter.Nodata') }}</div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.main-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .img-box {
    height: 126px;
    width: 200px;
    background-image: url('../img/empty-icon.png');
    background-size: cover;
    margin-top: 58px;
  }

  .text-box {
    margin-top: 8px;
    color: #999;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
</style>
