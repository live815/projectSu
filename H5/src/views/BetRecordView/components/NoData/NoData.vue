<template>
  <div class="no-data">
    <img src="./img/no-data.png" alt="" class="no-data-img" />
    <p class="tip">{{ $t('BetrecordView.BetrecordViewTip1') }}</p>
    <v-button v-if="!isHide" class="no-data-button" @click="goBet">{{
      $t('BetrecordView.BetNow')
    }}</v-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  isHide: {
    type: Boolean,
    default: false
  }
})
const goBet = () => {
  router.push('/sports')
}
</script>

<style lang="scss" scoped>
.no-data {
  .no-data-img {
    width: 200px;
    margin: 115px 87px 8px 88px;
  }
  .tip {
    color: #999;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-bottom: 70px;
  }
  .no-data-button {
    margin: 0 25px;
    width: calc(100% - 50px);
    color: #fff;
    text-align: center;

    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }
}
</style>
