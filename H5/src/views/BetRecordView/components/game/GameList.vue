<template>
  <div class="game-list">
    <div class="item" @click="goDetail(item)" v-for="item in gameList" :key="item.id">
      <div class="body">
        <div class="left">
          <img :src="imgPath(item.lobbyCode)" alt="" />
          <div>
            <p class="title">{{ item.lobbyName }}</p>
          </div>
        </div>
        <div class="right">
          <p>
            <span class="label">{{ $t('BetrecordView.BetAmount2') }}</span>
            <span class="num"><CurrencyUnit />{{ item.orderAmount }}</span>
          </p>
          <p style="margin-top: 8px">
            <span class="label">{{ $t('BetrecordView.WinLossAmount') }}</span>
            <span class="num"><CurrencyUnit />{{ item.profitAmount }}</span>
          </p>
        </div>
      </div>
      <div>
        <span class="label">{{ $t('BetrecordView.BetoddNumbers') }}</span>
        <span class="num">{{ item.orderCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultImg from '../../img/defaultImg.png'
defineProps(['gameList'])
const emit = defineEmits(['goDetail'])

// 引用静态图片
const imgPath = (fileName) => {
  const imageUrl = new URL(`../../img/${fileName}.png`, import.meta.url).href
  return imageUrl.includes('undefined') ? defaultImg : imageUrl
}

const goDetail = (item) => {
  emit('goDetail', item)
}
</script>

<style lang="scss" scoped>
.game-list {
  min-height: calc(var(--app-height) - 232px);
  .item {
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset, 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    margin: 15px;
    padding: 15px;
    .body {
      display: flex;
      border-bottom: 1px dotted #ddd;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        .title {
          color: #111;

          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
        }
        img {
          width: 36px;
          margin-right: 16px;
        }
      }
      .right {
        flex: 1;
      }
    }
    .label {
      color: var(--color-text-light);
      font-size: 12px;
    }
    .num {
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      color: var(--color-text-dark);
      margin-left: 5px;
    }
  }
}
</style>
