<template>
  <div>
    <div
      class="background orange"
      :class="{ 'background-vi': site === 'vietnam' }"
      v-if="type == 2"
    >
      <p>{{ $t('Wletter.cashcoupons') }}</p>
      <div class="img-box"></div>
    </div>
    <div
      class="background item"
      :class="{ 'background-vi': site === 'vietnam' }"
      v-if="type == 5"
    ></div>
    <div class="background blue" :class="{ 'background-vi': site === 'vietnam' }" v-if="type == 3">
      <p>{{ $t('Wletter.depositcertificate') }}</p>
    </div>
    <div
      class="background purple"
      :class="{ 'background-vi': site === 'vietnam' }"
      v-if="type == 4"
    >
      <p>{{ $t('Wletter.Turnovercoupons') }}</p>
    </div>
    <div
      class="background yellow"
      :class="{ 'background-vi': site === 'vietnam' }"
      v-if="type == 1"
    >
      <p>{{ $t('Wletter.cash') }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const site = import.meta.env.VITE_SITE
const props = defineProps(['itemInfo'])

const type = computed(() => {
  return props.itemInfo.type
})
</script>
<style lang="scss" scoped>
div {
  height: 100%;
  width: 100%;
  .background {
    height: 100%;
    width: 100%;
    padding: 27px 29px 0px 28px;
    p {
      color: #fff;
      text-align: center;
      font-family: TencentSans;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
      /* 122.222% */
    }
  }
  .background-vi {
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 14px;
      font-weight: 900;
    }
  }
  .orange {
    position: relative;
    background-image: url('../img/orange.png');
    background-size: cover;
    .img-box {
      position: absolute;
      top: 50%;
      left: 0;
      height: 50%;
      width: 100%;
      background-image: url('../img/money.png');
      background-size: cover;
    }
  }
  .blue {
    background-image: url('../img/blue.png');
    background-size: cover;
  }
  .purple {
    background-image: url('../img/purple.png');
    background-size: cover;
  }
  .yellow {
    padding-top: 38px;
    background-image: url('../img/yellow.png');
    background-size: cover;
  }
}
</style>
