<template>
  <div class="swiperDiv">
    <div class="banmerDiv">
      <BannerOld />
    </div>
    <div style="margin-top: 24px">
    </div>
  </div>
</template>

<script setup>
import BannerOld from './BannerOld.vue'
// import Endorsement from './Endorsement.vue'
</script>

<style lang="scss" scoped>
.swiperDiv {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
  .banmerDiv {
    display: flex;
  }
}
</style>
