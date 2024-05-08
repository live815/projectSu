<template>
  <div class="header">
    <div @click="back" class="icon-back">
      <IconArrowLeft v-if="site !== 'vietnam'" />
    </div>
    <h3 class="tit">{{ $t('serviceview.Customerservice') }}</h3>
    <!-- <div class="cellphone" @click="goCallTel">{{ $t('serviceview.Callback') }}</div> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const site = import.meta.env.VITE_SITE
const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  .icon-back {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
    svg {
      margin-left: -8px;
      fill: #000;
      transform: scale(1.2);
    }
  }
  h3.tit {
    text-align: center;
    margin-left: 10px;
    line-height: 44px;
    color: #333;
  }

  .cellphone {
    position: absolute;
    right: 0;
    top: 10px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    line-height: 28px;
  }
}
</style>
