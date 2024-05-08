<template>
  <div class="game-category">
    <div class="item-box" @scroll="handleScroll">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="usePlayGame(item, router, route)"
      >
        <img :src="getImg(item.appHotIconModule)" />
        <p>{{ item.lobbyName }}</p>
      </div>
    </div>
    <div class="line-box">
      <div
        class="line"
        v-for="(item, index) in groupedArray"
        :key="index"
        :class="{ active: index === activeIndex }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { usePlayGame } from '@/hooks/usePlayGame'
import { useAppStore } from '@/stores/app'
import { getImg } from '@/utils'
import { useRouter, useRoute } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
// 当前活跃的游戏组索引
const activeIndex = ref(0)
const list = computed(() => {
  return appStore.gameTypeList
    .map((gameType) => gameType.gameList.filter((game) => game.isHotGame === 0))
    .flat()
})
const groupedArray = computed(() => {
  let result = []
  for (let i = 0; i < list.value.length; i += 4) {
    result.push(list.value?.slice(i, i + 4))
  }
  return result
})
const handleScroll = (event) => {
  const scrollLeft = event.target.scrollLeft
  const newIndex = Math.floor(scrollLeft / (70 * 4))
  if (newIndex !== activeIndex.value) {
    activeIndex.value = newIndex
  }
}
</script>

<style lang="scss" scoped>
.game-category {
  color: #666;

  font-size: 12px;
  text-align: center;
  margin-top: 12px;
  .item-box {
    display: flex;
    overflow-x: auto;
    align-items: center;
    white-space: nowrap;
    gap: 5px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .item {
      min-width: 70px;
      min-height: 50px;
      line-height: 18px;
    }
  }
  .line-box {
    display: flex;
    justify-content: center;
    gap: 8px;
    .line {
      width: 10px;
      height: 2px;
      background: #dddddd;
      margin-top: 10px;
    }
    .line.active {
      background: #ff5000;
    }
  }
}
</style>
