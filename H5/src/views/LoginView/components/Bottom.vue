<template>
  <div class="bottom">
    <!-- <div class="item">
      <p>
        <img src="./img/yingchao.png" alt="" />
      </p>
      <p class="tit1">{{ $t('Lletter.title1') }}</p>
      <p class="tit2">{{ $t('Lletter.title2') }}</p>
    </div> -->
    <div class="item">
      <p>
        <img src="./img/agentingH5.png" alt="" />
      </p>
      <p class="tit1">{{ $t('Lletter.title3') }}</p>
      <p class="tit2">{{ $t('Lletter.title2') }}</p>
    </div>
    <!-- <div class="item">
      <p>
        <img src="./img/dejia.png" alt="" />
      </p>
      <p class="tit1">{{ $t('Lletter.title4') }}</p>
      <p class="tit2">{{ $t('Lletter.title2') }}</p>
    </div> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: space-around;
  .item {
    text-align: center;
    line-height: 1.5;
    img {
      width: 50px;
    }
    .tit1 {
      color: #070707;
      font-size: 11px;
    }
    .tit2 {
      color: #a7a7a7;
      font-size: 10px;
    }
  }
}
</style>
