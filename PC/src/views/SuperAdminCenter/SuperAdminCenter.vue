<template>
  <div class="outter-main-container">
    <UserHeader></UserHeader>
    <InterfaceBox></InterfaceBox>
  </div>
</template>

<script setup>
import InterfaceBox from './components/InterfaceBox.vue'
import UserHeader from './components/UserHeader.vue'
</script>

<style lang="scss" scoped>
.outter-main-container {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
}
@media screen and (max-width:1450px) {
  .outter-main-container{
    zoom: 0.9;
  }
}
</style>
