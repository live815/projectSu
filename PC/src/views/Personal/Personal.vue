<template>
  <div class="box">
    <GeneralUserCenter></GeneralUserCenter>
  </div>
</template>

<script setup>
import GeneralUserCenter from '@/components/GeneralUserCenter/GeneralUserCenter.vue'
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  // padding: 0px 180px 0px 180px;
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
}
@media screen and (max-width:1450px) {
  .box{
    zoom: 0.9;
  }
}
</style>

