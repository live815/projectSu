<template>
  <div class="myAssets">
    <div class="myAssets-title">{{ $t('Wletter.myassets') }}</div>
    <div class="myAssets-box">
      <Balance />
    </div>
  </div>
</template>

<script setup>
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.myAssets {
  height: 70px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('./img/balance.png');
  .myAssets-title {
    color: #111;
    font-size: 14px;
    font-weight: 400;
    margin: 16px 0 8px 20px;
  }
  .myAssets-box {
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: #111;
    font-size: 20px;
    font-weight: 700;
    .myAssets-box-money {
      font-size: 24px;
      margin: 0 8px;
    }
  }
}
</style>
