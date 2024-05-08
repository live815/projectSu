<template>
  <div v-if="gameTypeList.length" class="game-lobby">
    <!-- 游戏分类导航 -->
    <GameTab
      @chooseGameType="chooseGameType"
      :currentGameTypeIdx="currentGameTypeIdx"
      :gameTypeList="gameTypeList"
    />
    <div
      class="game-view"
      :class="{ hasSafeAreaBottom }"
      @touchstart="touchstart"
      v-if="allGameList.length"
    >
      <div
        ref="scrollWrapper"
        :class="{ hasSafeAreaBottom }"
        class="scroll-wrapper"
        @scroll.stop="handleScroll"
        @click.stop="usePlayGame(currentGame, router, route)"
      >
        <div :style="{ transform: `translateX(${translateX}px)` }" class="game-list">
          <div
            ref="itemRefs"
            :class="{ active: delayCurrentGameIdx === idx }"
            class="item"
            v-for="(item, idx) in allGameList"
            :key="item.id"
            @click.stop="usePlayGame(item, router, route)"
          >
            <div class="img-box">
              <van-image  class="img" :src="getImgUrl(item, idx)">
                <template v-slot:loading>
                  <img
                    :src="delayCurrentGameIdx === idx ? defaultUnCheckedBg : defaultUnCheckedBg"
                    alt=""
                  />
                </template>
                <template v-slot:error>
                  <img
                    :src="delayCurrentGameIdx === idx ? defaultUnCheckedBg : defaultUnCheckedBg"
                    alt=""
                  />
                </template>
              </van-image>
              <img v-show="getBageImg(item)" :src="getBageImg(item)" class="badge" alt="" />
            </div>
            <!-- 标题 -->
            <div class="title-bottom">
              <h4 class="title" :class="getClassSize(item.lobbyName)">
                {{ item.lobbyName }}
              </h4>
              <div class="text" v-if="item.promotionGuideText">{{ item.promotionGuideText }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="current-game-view" @click.stop="usePlayGame(currentGame, router, route)">
        <div class="game-box">
          <!-- 游戏图片 -->
          <p class="game-pic">
            <img :src="getImg(currentGame.appLobbyIconBigcover)" alt="" />
          </p>
          <!-- 游戏类型标题图标 -->
          <div class="title-pic">
            <img :src="getImg(gameTypeList[currentGameTypeIdx].appLobbyIconName)" alt="" />
          </div>
          <!-- 底板 -->
          <div class="bottom-bg">
            <div class="left">
              <h3 :class="getClassSize(currentGame.lobbyName)">{{ currentGame.lobbyName }}</h3>
              <div class="text" v-show="currentGame.promotionGuideText">
                {{ currentGame.promotionGuideText }}
              </div>
            </div>
            <div class="right">
              <VButton>
                <span>{{ $t('common.start') }}</span>
                <!-- <van-icon name="play" /> -->
              </VButton>
            </div>
          </div>
          <!-- 维护 -->
          <div class="main-tenance" v-if="currentGame.isMaintain">
            <div class="prompt">
              <div>{{ $t('common.fixStartTime') }}</div>
              <div>{{ currentGame.startTime }}</div>
              <div>-</div>
              <div>{{ $t('common.fixEndTime') }}</div>
              <div>{{ currentGame.endTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="skeleton-wrapper">
    <van-skeleton v-for="item in 10" :key="item">
      <template #template>
        <div class="skeleton-layout">
          <van-skeleton-avatar class="skeleton-avatar" avatar-shape="square" avatar-size="110px" />
          <div :style="{ flex: 1, marginLeft: '16px' }">
            <van-skeleton-paragraph v-for="num in 4" :key="num" round />
          </div>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script setup>
import GameTab from './components/GameTab/GameTab.vue'
import { ref, computed, watch } from 'vue'
import { debounce, throttle } from 'lodash'
import { getImg, getSafeAreaHeight } from '@/utils'
import { usePlayGame } from '@/hooks/usePlayGame'
import { useRouter, useRoute } from 'vue-router'
import eventBus from '@/utils/eventBus'
import { watchEffect } from 'vue'
import { useAppStore } from '@/stores/app'
const hasSafeAreaBottom = ref(Boolean(getSafeAreaHeight()))
const appStore = useAppStore()
appStore.getGameTypeList() // 获取游戏列表
const router = useRouter()
const route = useRoute()
// 游戏大类列表
const gameTypeList = computed(() => {
  return appStore.gameTypeList
})
// 所有子游戏列表
const allGameList = computed(() => {
  return gameTypeList.value.reduce((accumulator, item) => {
    return [...accumulator, ...item.gameList]
  }, [])
})

const itemRefs = ref([]) // 游戏列表dom
const scrollWrapper = ref(null) // 滚动容器
const currentGameTypeIdx = ref(0) // 当前游戏分类索引
const currentGameIdx = ref(0) // 当前游戏索引
const currentGame = computed(() => allGameList.value[currentGameIdx.value]) // 当前游戏
const delayCurrentGameIdx = ref(0) // 延迟选中游戏效果的索引
const translateX = ref(0)
let isClickSelected = false // 是否为用户点选游戏分类导致的滚动

// 标识用户触发滚动
const touchstart = () => {
  isClickSelected = false
}
const itemHeight = 116
const marginBottom = 10
// 滚动回调
const handleScroll = throttle(($event) => {
  const scrollTop = $event.target.scrollTop
  translateX.value = (scrollTop / (itemHeight + marginBottom)) * 10
  // 设置游戏选中项
  itemRefs.value.forEach((item, idx) => {
    // console.log(item.offsetTop, '22')
    const offsetTop = item.offsetTop
    if (scrollTop > offsetTop) {
      setGameItemSelected(idx + 1)
    } else if (scrollTop === offsetTop) {
      setGameItemSelected(idx)
    }
  })
  // 处理最后一个游戏边界
  if (currentGameIdx.value === itemRefs.value.length) {
    setGameItemSelected(itemRefs.value.length - 1)
  }
  // 设置游戏分类
  const typeIdx = gameTypeList.value.findIndex(
    (item) => item.gameType === currentGame.value.gameType
  )
  setGameType(typeIdx)

  // 选中第一个游戏或最后一个游戏时，不需要延迟选中
  const firstGame = !currentGameIdx.value
  const lastGame = currentGameIdx.value === itemRefs.value.length - 1
  const noNeedDelay = [firstGame, lastGame, isClickSelected].some((bool) => bool)
  if (noNeedDelay) {
    delayCurrentGameIdx.value = currentGameIdx.value
  }
}, 0)
// 设置游戏选中项
const setGameItemSelected = (idx) => {
  currentGameIdx.value = idx
}
// 设置游戏分类
const setGameType = (idx) => {
  currentGameTypeIdx.value = idx
}
// 点选游戏分类
const chooseGameType = (item, idx) => {
  console.log(item, idx)
  isClickSelected = true
  setGameType(idx)
  // 滚动到指定位置
  scrollToThere(idx)
}
// 根据游戏分类索引滚动到指定位置
const scrollToThere = (idx) => {
  const firstGameIdx = allGameList.value.findIndex(
    (item) => item.gameType === gameTypeList.value[idx].gameType
  )
  const firstGameDom = itemRefs.value[firstGameIdx]
  scrollWrapper.value.scrollTo({
    left: 0,
    top: firstGameDom.offsetTop
    // behavior: 'smooth'
  })
}

// 延迟高亮
watch(
  currentGameIdx,
  debounce(async () => {
    delayCurrentGameIdx.value = currentGameIdx.value
  }, 250)
)
const defaultCheckedBg = new URL('./img/default-checked-bg.png', import.meta.url).href
const defaultUnCheckedBg = new URL('./img/default-uncheck-bg.png', import.meta.url).href

const getImgUrl = (item, idx) => {
  if (delayCurrentGameIdx.value === idx) {
    return item.appLobbyIconLight ? getImg(item.appLobbyIconLight) : defaultCheckedBg
  } else {
    return item.appLobbyIconDark ? getImg(item.appLobbyIconDark) : defaultUnCheckedBg
  }
}
function getClassSize(str) {
  if (str.length > 11) {
    return 'small'
  }
}

function getBageImg(item) {
  const type = item.promotionLabel
  if (type == 1) {
    return new URL(`./img/${appStore.language}/recommend.png`, import.meta.url).href
  }
  if (type == 2) {
    return new URL(`./img/${appStore.language}/new.png`, import.meta.url).href
  }
}
const currentBgImg = computed(() => {
  return gameTypeList.value[currentGameTypeIdx.value]?.appLobbyIconBg
})

watchEffect(() => {
  if (currentBgImg.value) {
    eventBus.emit('currentGameTypeIdxChange', getImg(currentBgImg.value))
  }
})
</script>

<style lang="scss" scoped>
:deep() {
  .van-image__error,
  .van-image__loading {
    background: transparent;
  }
}
$viewportHeight: var(--app-height);
$bannerHeight: 144px;
$userWrapperHeight: 120px; // 115 + 5
$tabHeight: 45px;
$paddingBottomHeight: 60px;
$safeAreaPaddingBottomHeight: 90px;
$scrollHeight: calc(
  $viewportHeight - $bannerHeight - $userWrapperHeight - $tabHeight - $paddingBottomHeight
);
$safeAreaScrollHeight: calc(
  $viewportHeight - $bannerHeight - $userWrapperHeight - $tabHeight - $safeAreaPaddingBottomHeight
);
.game-lobby {
  .game-view {
    // border: 1px solid blue;
    position: relative;
    height: calc($scrollHeight - 30px);
    &.hasSafeAreaBottom {
      height: calc($safeAreaScrollHeight - 30px);
    }
  }
  // 滚动取撑满
  .scroll-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: $scrollHeight;
    border-radius: 8px;
    position: relative;
    z-index: 1;
    &.hasSafeAreaBottom {
      height: $safeAreaScrollHeight;
    }
    .game-list {
      padding-bottom: calc($scrollHeight - 200px);
      .item {
        width: 137px;
        height: 116px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .img-box {
          img{
            width:100%;
          }
          .img {
            img {
              width: 100%;
              height: 100%;
            }
          }
          .badge {
            position: absolute;
            left: 15px;
            top: 0;
            width: 52px;
            height: calc(89px * 52 / 111);
          }
        }
        .title-bottom {
          position: absolute;
          left: 18px;
          bottom: 12px;
          .title {
            @include SpecialItalics();
            color: var(--color-text-dark);
            font-size: 16px;
            margin-bottom: 4px;
            text-indent: 5px;
            &.small {
              font-size: 13px;
              margin-left: -6px;
            }
          }
          .text {
            width: 94px;
            text-indent: 10px;
            height: 14px;
            line-height: 14px;
            font-size: 10px;
            color: var(--color-text);
            border-radius: 50px;
            background: linear-gradient(180deg, #eef3ff 0%, #b7c3ee 100%);
            box-shadow: 0px 0.5px 0px 0px #fff inset, 0px 0.5px 0px 0px #e8eefe;
            @include ellipsis(1);
          }
        }

        &.active {
          .title-bottom {
            .title {
              color: #fff;
            }
            .text {
              color: #fff;
              background: linear-gradient(180deg, #ff7a00 0%, #ffb276 100%);
              box-shadow: 0px 0.5px 0px 0px #ffd7b3 inset, 0px 0.5px 0px 0px #ff7a0a;
            }
          }
        }
      }
      $items-count: 100;
      // 循环遍历每个 .item 元素
      @for $i from 1 through $items-count {
        .item:nth-child(#{$i}) {
          transform: translateX(#{35 - $i * 10}px);
        }
      }
    }
  }

  .current-game-view {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    z-index: 0;
    display: flex;
    align-items: center;
    // 游戏盒子
    .game-box {
      position: relative;
      width: 100%;
      min-height: calc($scrollHeight / 2);
      // 游戏图片
      .game-pic {
        // text-align: right;
        img {
          max-width: 90%;
        }
      }
      // 游戏类型标题图标
      .title-pic {
        position: absolute;
        right: 0;
        bottom: 15px;
        width: 220px;
        height: 74px;
        img {
          height: 74px;
        }
      }
      // 底板
      .bottom-bg {
        width: 234px;
        height: 64px;
        background: url('./img/bottom-bg.png');
        background-size: cover;
        position: absolute;
        bottom: -10px;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          margin-top: -7px;
          padding-left: 20px;
          h3 {
            padding-left: 10px;
            color: var(--color-text-dark);
            font-size: 16px;
            @include SpecialItalics();
            &.small {
              font-size: 14px;
            }
          }
          .text {
            padding: 0 5px;
            margin-top: 5px;
            // width: 90px;
            max-width: 120px;
            height: 14px;
            line-height: 14px;
            font-size: 10px;
            text-align: center;
            color: var(--color-text);
            border-radius: 50px;
            background: linear-gradient(180deg, #eef3ff 0%, #b7c3ee 100%);
            box-shadow: 0px 0.5px 0px 0px #fff inset, 0px 0.5px 0px 0px #e8eefe;
            @include ellipsis();
          }
        }
        .right {
          margin-top: -7px;
          padding-right: 10px;
          button {
            height: 30px;
            padding: 0 15px;
            border-radius: 15px;
            font-size: 12px;
          }
        }
      }

      .main-tenance {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 6px;
        z-index: 100;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          font-size: 15px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          margin-top: 28px;
        }
      }
    }
  }
}

.skeleton-wrapper {
  overflow: auto;
  height: $scrollHeight;
  .van-skeleton {
    margin-bottom: 15px;
  }
  .skeleton-avatar {
    border-radius: 15px;
    transform: skewX(-5deg);
  }
  .skeleton-layout {
    display: flex;
    width: 100%;
  }
}
// 设备高度小于667px
@media screen and (max-height: 667px) {
  .game-lobby {
    .current-game-view {
      .game-box {
        .game-pic {
          img {
            max-width: 85%;
          }
        }
      }
    }
  }
}
// 有底部安全区域的设备
@media screen and (min-height: 800px) {
  .game-lobby {
    .current-game-view {
      width: 232px;
      .game-box {
        .game-pic {
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
}
</style>
