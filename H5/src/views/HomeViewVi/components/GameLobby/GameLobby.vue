<template>
  <div class="gameLobby-view" ref="gameLobbyView">
    <div class="game-tab" ref="gameTabBar">
      <div
        class="item"
        v-for="(item, index) in appStore.gameTypeList"
        :key="item.id"
        :class="{ active: active === index }"
        @click="chooseGameType(item.id, index)"
        ref="itemRef"
      >
        <img class="img" :src="getImg(item.appLobbyIconTab)" />
        <p class="title" :class="{ active: active === index }">{{ item.lobbyName }}</p>
      </div>
    </div>
    <div ref="gamesBox" class="games-box" @scroll="handleScroll">
      <div ref="gameItem" v-for="item in appStore.gameTypeList" :key="item.id">
        <div class="title-box" ref="title">
          <img :src="leftArrow" />
          <p class="title">{{ item.lobbyName.toUpperCase() }}</p>
          <img :src="rightArrow" />
        </div>
        <div class="game-list">
          <div
            class="item"
            v-for="item in item.gameList"
            :key="item.id"
            :style="{ backgroundImage: `url(${getImg(item.appLobbyIconBigcover)})` }"
            @click="usePlayGame(item, router, route)"
          >
            <p class="lobbyName">{{ item.lobbyName }}</p>
            <!-- 维护遮罩 -->
            <div class="maintain" v-if="item.isMaintain">
              <div>
                <div>{{ $t('common.fixStartTime') }}</div>
                <div>{{ item.startTime }}</div>
                <div class="line">-</div>
                <div>{{ $t('common.fixEndTime') }}</div>
                <div>{{ item.endTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { getImg } from '@/utils'
import leftArrow from './img/leftArrow.png'
import rightArrow from './img/rightArrow.png'
import { usePlayGame } from '@/hooks/usePlayGame'
import { useRouter, useRoute } from 'vue-router'
import { debounce } from 'lodash'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const active = ref(0)
const gameId = ref()
const gamesBox = ref(null)
const gameItem = ref(null)
const scrollState = ref(true)
const gameLobbyView = ref(null)
const gameTabBar = ref(null)
const itemRef = ref(null)
const title = ref(null)

const chooseGameType = (id, index) => {
  gameId.value = id
  active.value = index
  scrollState.value = false
  const firstGameDom = gameItem.value[index]
  let offset = gameItem.value[0].offsetTop

  gamesBox.value.scrollTo({
    left: 0,
    top: index ? firstGameDom.offsetTop - offset : 0,
    behavior: 'smooth'
  })

  setTimeout(() => {
    scrollState.value = true
  }, 800)
}
const debouncedSetActive = debounce((index) => {
  active.value = index
}, 500)

const handleScroll = () => {
  if (!scrollState.value) return

  // 获取gamesBox容器顶部位置
  const gamesBoxTop = gamesBox.value.getBoundingClientRect().top + 30
  gameItem.value.forEach((item, index) => {
    // 获取每个gameItem元素的顶部位置，并减去20像素的偏移
    const gameItemTop = item.getBoundingClientRect().top

    // 检查gameItem的顶部是否到达或者刚好在容器顶部位置
    if (gameItemTop <= gamesBoxTop && gameItemTop >= 0) {
      if (scrollState.value) {
        debouncedSetActive(index)
      }
    }
  })
}
let scrollXTimer = null
const startScrollXTimer = () => {
  scrollState.value = false

  let currScroll = gameTabBar.value.scrollLeft
  let aftScroll = itemRef.value[0].offsetWidth * active.value
  scrollXTimer = setInterval(function () {
    if (currScroll < aftScroll && aftScroll < gameTabBar.value.scrollWidth) {
      let temp = gameTabBar.value.scrollLeft + 4
      if (temp > aftScroll) {
        gameTabBar.value.scrollLeft = aftScroll
      } else {
        gameTabBar.value.scrollLeft = temp
      }

      currScroll = gameTabBar.value.scrollLeft
    } else if (currScroll > aftScroll && currScroll > 0) {
      let temp = gameTabBar.value.scrollLeft - 4
      if (temp < 0) {
        gameTabBar.value.scrollLeft = 0
        currScroll = gameTabBar.value.scrollLeft
      } else {
        gameTabBar.value.scrollLeft = temp
        currScroll = gameTabBar.value.scrollLeft
      }

      currScroll = gameTabBar.value.scrollLeft
    } else {
      scrollState.value = true
      clearInterval(scrollXTimer)
    }

    if (
      currScroll === 0 ||
      currScroll >= gameTabBar.value.scrollWidth - gameTabBar.value.offsetWidth
    ) {
      scrollState.value = true
      clearInterval(scrollXTimer)
    }
  }, 1)
}
watch(
  () => active.value,
  () => {
    // if (!scrollState.value) return
    clearInterval(scrollXTimer)
    startScrollXTimer()
  }
)

onBeforeUnmount(() => {
  clearInterval(scrollXTimer)
})
</script>

<style lang="scss" scoped>
.gameLobby-view {
  .game-tab {
    display: flex;
    justify-content: space-between;
    margin: 8px 0 5px 0;
    overflow: auto;
    // gap: 4px;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 72px;
      border-radius: 4px;
      border: 1px solid #eee;
      background: #fff;
      margin-right: 5px;
      height: 60px;
      box-sizing: border-box;
      .img {
        width: 30px;
        height: 30px;
      }
      .title {
        color: #666;
        font-size: 14px;
        margin-top: 2px;
      }
      .active {
        color: #fff;
      }
    }
    .active {
      background: linear-gradient(90deg, #ff9000 25%, #ff5000 89.06%);
    }
  }
  .games-box {
    height: calc(var(--app-height) - 350px);
    overflow: auto;
    padding-bottom: calc(var(--app-height) - 490px);
    // background-color: pink;
  }
  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;

    margin: 20px 0 6px 0;
    img {
      width: 86px;
      height: 22px;
    }
    .title {
      margin: 0 10px;
    }
  }
  .title-box:first-child {
    margin-top: 15px;
  }
  .game-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    .item {
      position: relative;
      width: 167px;
      height: 102px;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      border-radius: 4px;
      .lobbyName {
        align-self: flex-end;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
      }
    }
    .maintain {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: inherit;
      height: inherit;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 20px;
    }
    .line {
      line-height: 8px;
    }
  }
}

.games-box > div:first-child > .title-box {
  margin-top: 5px;
}
</style>
