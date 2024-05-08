<!-- 博彩声明 -->
<template>
  <div class="gamblingState">
    <p>{{ $t('HelpCenter.GamblingStatement') }}</p>
    <div class="item-text">
      {{ $t('HelpCenter.GamblingStateTips_1') }}<br />
      {{ $t('HelpCenter.GamblingStateTips_2') }}<br />
      {{ $t('HelpCenter.GamblingStateTips_3') }}<br />
      {{ $t('HelpCenter.GamblingStateTips_4') }}。
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.gamblingState {
  color: #ffffff;
  
  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    line-height: normal;
  }
  .item-text {
    line-height: 28px;
    text-align: justify;
    font-size: 16px;
    color: var(-----60, rgba(255, 255, 255, 0.6)) !important;
  }
}
</style>
