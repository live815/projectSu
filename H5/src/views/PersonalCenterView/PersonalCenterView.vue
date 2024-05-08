<template>
  <div class="security-center">
    <NavBar :title="$t('Pletter.safecenter')" />
    <div class="security-center-top">
      <img class="security-center-top-img" :src="securityLogo" alt="" />
      <div class="security-center-title">{{ $t('Pletter.Plettertip3') }}</div>
    </div>
    <SecurityContent></SecurityContent>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar'
import securityLogo from './img/securityLogo.png'
import SecurityContent from './componets/SecurityContent/SecurityContent'
</script>

<style lang="scss" scoped>
.security-center-top {
  position: relative;
  width: 375px;
  height: 230px;
  // background: url(./img/securityLogo.png) no-repeat;
  // background-size: 100% 100%;
  // background-attachment: fixed;
  .security-center-top-img {
    width: 100%;
    height: 100%;
  }
  .security-center-title {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%);
    width: 201px;
    min-height: 30px;
    line-height: 30px;
    text-align: center;
    color: #111;

    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    border-radius: 60px;
    background: #fff9f1;
  }
}
</style>
