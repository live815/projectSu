<template>
  <div>
    <div
      @click.stop="usePlayGame(item, $router, $route)"
      v-for="item in dataList"
      :key="item.id"
      class="item"
    >
      <div v-if="item.status == 0">
        <!-- 收藏 -->
        <img
          @click.stop="slotGameStore.collect(item.id)"
          :src="slotGameStore.collectIds.includes(item.id) ? collected : uncollected"
          alt=""
          class="collect"
        />
        <!-- 游戏图片 -->
        <div class="img-box" :class="{ defaultIconWrapper: !item.appLobbySlotIcon }">
          <img
            class="game-img"
            v-lazy="item.appLobbySlotIcon ? getImg(item.appLobbySlotIcon) : defaultGame"
          />
        </div>
        <!-- 标题 -->
        <h3>{{ item.lobbyName }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import defaultGame from '@/assets/img/default-game.png'
import { usePlayGame } from '@/hooks/usePlayGame'
import { getImg } from '@/utils'
import { useSlotGameStore } from '@/stores/slotGame'
import { createApp } from 'vue'
import { Lazyload } from 'vant'

const app = createApp()
app.use(Lazyload)

// 注册时可以配置额外的选项
app.use(Lazyload, {
  // lazyComponent: true,
  loading: defaultGame
})
const slotGameStore = useSlotGameStore()
defineProps(['dataList'])
const collected = new URL('../img/collect.svg', import.meta.url).href
const uncollected = new URL('../img/nocollect.svg', import.meta.url).href
</script>

<style lang="scss" scoped>
.item {
  width: 110px;
  border-radius: 0px 0px 6px 6px;
  background: #fff;
  // border:1px solid red;
  margin-top: 15px;
  float: left;
  margin-left: 8px;
  position: relative;
  .collect {
    position: absolute;
    right: 0;
    top: 0;
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 0 0 0 6px;
  }
  .img-box {
    border-radius: 6px 6px 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    &.defaultIconWrapper {
      padding: 10px;
    }
    .game-img {
      max-width: 100%;
      max-height: 100%;
      &[lazy='loaded'] {
        animation: rubberBand 0.8s 1;
      }
    }
  }
  h3 {
    color: #111;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 200% */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    // border:1px solid red;
  }
}
</style>
