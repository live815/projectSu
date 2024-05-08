<template>
  <BTitle>{{ $t('BusinessAgentView.TitleFive') }}</BTitle>
  <div class="all-support-excel">
    <div class="support">
      <img src="./img/support.png" alt="error" class="img-support" />
      <p class="support-title">{{ $t('BusinessAgentView.TitleFive') }}</p>
      <p class="support-paragrah">{{ $t('BusinessAgentView.TitleSix') }}</p>
    </div>
    <div class="excel">
      <img src="./img/data-excel.png" alt="" class="img-excel" />
      <p class="support-title">{{ $t('BusinessAgentView.Titleseven') }}</p>
      <p class="support-paragrah">{{ $t('BusinessAgentView.Titleight') }}</p>
    </div>
  </div>
</template>

<script setup>
import BTitle from '../BTitle.vue'
</script>

<style lang="scss" scoped>
.all-support-excel {
  margin-top: 17px;
  display: flex;
  background: #f3f3f3;
  margin-top: 20px;
  .support {
    background: #fff;
    width: 164px;
    border-radius: 10px;
    margin-right: 17px;
    padding: 0 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-support {
      width: 70px;
      height: 70px;
    }
  }
  .excel {
    background: #fff;
    width: 164px;
    border-radius: 10px;
    padding: 0 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-excel {
      width: 70px;
      height: 70px;
    }
  }
  .support-title {
    color: #111;
    font-size: 15px;
    font-weight: 600;
    line-height: 28px;
  }
  .support-paragrah {
    color: #000;
    font-size: 12px;
    line-height: 20px;
    height: 100px;
  }
}
</style>
