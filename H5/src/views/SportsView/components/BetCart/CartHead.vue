<template>
  <div class="bet-header" @click.stop="$emit('open')">
    <div class="left">
      <span class="bet-num">{{ betCartStore.betNums }}</span>
      <span class="bet-slip">{{ $t('Sportsview.bet') }}</span>
    </div>
    <div class="right">
      <span class="odds">@</span>
      <div class="line"></div>
      <!-- <iconSlideUp /> -->
      <img src="./img/slide-up.png" alt="" class="slide-up" />
    </div>
  </div>
</template>

<script setup>
import { useBetCartStore } from '@/stores/betCart'
const betCartStore = useBetCartStore()
</script>

<style lang="scss" scoped>
.bet-header {
  background: #fff;
  box-shadow: 0px -5px 8px -4px rgba(0, 0, 0, 0.1);
  height: 50px;
  @include mobile-padding();
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    .bet-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      color: #fff;
      margin-right: 6px;
      background: #ff5000;
    }
    .bet-slip {
      color: #111;
      font-size: 14px;
      line-height: 16px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .odds {
      color: var(--color-text-dark);
      font-size: 16px;
    }
    .line {
      width: 1px;
      height: 20px;
      margin: 0 15px;
      background: #eee;
    }
    svg {
      width: 12px;
      height: 12px;
      fill: var(--color-text-light);
    }
    .slide-up {
      width: 20px;
    }
  }
}
</style>
