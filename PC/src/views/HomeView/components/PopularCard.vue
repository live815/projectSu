<template>
  <div class="boxCard">
    <div class="hot-game-list-container">
      <div
        class="hot-game-list-iner-containe"
        :style="{ transform: `translateX(${translateNum}px)` }"
      >
        <div class="hot-game-list poker">
          <div
            :class="[currentIndex === index ? 'item hover' : 'item']"
            v-for="(item, index) in subGameList"
            :key="index"
            :style="{
              transform: `translateX(${currentIndex === index ? 0 : item.translateX}px)`
            }"
            @mouseenter="handleMouseEnter(index)"
          >
            <div
              :class="[`img-cover${props.index}`, 'img-cover']"
              :style="{ backgroundImage: `url('${getImgUrl(gameData.pcLobbySmallImg)}')` }"
            >
              <div class="recoommend" v-if="getBageImg(item)">
                <img :src="getBageImg(item)" />
              </div>

              <el-image loading="lazy" style="width: 290px; height: 350px" :src="getImgUrl(item.pcFrontCoverImg)"/>
              <div class="title-wrap">
                <div class="title game-name">{{ item.lobbyName }}</div>
                <!-- <div class="text">{{ item.pcGameDesc }}</div> -->
              </div>
            </div>
            <div
              class="expand-card"
              :style="{ 'background-image': `url('${getImgUrl(gameData.pcLobbyBigImg)}')` }"
            >
              <div @click="console.log(gameData)">
                <!-- <img :src="getImgUrl(gameData.pcLobbyBigImg)" alt="" /> -->
              </div>
              <div class="expand-card-inner">
                <div class="gift-text">
                  <div class="publicity">
                    <!-- <span class="fs1">返水最高</span> -->
                    <div class="publicity-num">{{ item.promotionGuideText }}</div>
                  </div>
                </div>
                <div class="title game-name">{{ item.lobbyName }}</div>
                <div class="game-desc">{{ item.pcGameDesc }}</div>
                <div
                  :class="[`start-game-btn${props.index}`, 'start-game-btn']"
                  @click="usePlayGame(item, router)"
                >
                  {{ $t('HomeView.StartGame') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dots-wrap">
      <div
        v-for="(item, index) in warpList"
        :key="index"
        :class="item == currentIndex || (item < 2 && currentIndex == 0) ? 'item active' : 'item'"
        @click="handleMouseEnter(item)"
      >
        <div class="inner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImgUrl } from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayGame } from '@/hooks/usePlayGame.js'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const router = useRouter()
const currentIndex = ref(0)
let warpList = null
const translateNum = ref(0)
const props = defineProps({
  gameData: {
    type: Object
  },
  index: {
    type: [Number, String]
  }
})
const subGameList = computed(() => {
  return props.gameData.gameList.filter((item) => item.status == 0)
})
onMounted(() => {
  initSubGameList()
})
function initSubGameList() {
  props.gameData.gameList.forEach((item) => {
    item.translateX = '390'
  })
  function creatWarpList() {
    let temp = []
    for (let i = 0; i < subGameList.value.length - 1; i++) {
      temp.push(i + 1)
    }
    return temp
  }
  warpList = creatWarpList()
}

//光标移动
const handleMouseEnter = (index) => {
  if (subGameList.value.length <= 1) {
    return
  }
  // console.log('鼠标指的' + index, '当前index' + currentIndex.value,subGameList.value.length)
  if (index > 0) {
    translateNum.value = -320 * (index - 1)
  }
  if (index == subGameList.value.length - 1) {
    translateNum.value = -320 * (index - 2)
  }
  if (index < currentIndex.value) {
    subGameList.value[currentIndex.value].translateX = 390
    for (let i = subGameList.value.length - 1; i > index; i--) {
      subGameList.value[i].translateX = 390
      // console.log(subGameList.value[i])
    }
  } else {
    for (let i = 0; i < index; i++) {
      subGameList.value[i].translateX = 0
    }
  }

  currentIndex.value = index
}

function getBageImg(item) {
  const type = item.promotionLabel
  if (type == 1) {
    return new URL(`../img/${appStore.language}/recommend.png`, import.meta.url).href
  }
  if (type == 2) {
    return new URL(`../img/${appStore.language}/new.png`, import.meta.url).href
  }
}
</script>

<style lang="scss" scoped>
.publicity {
  position: relative;
  top: -20px;
  left: 25px;
  .publicity-num {
    // text-align: ;
    color: var(--unnamed, #ff9000);
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);

    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    margin-top: 6px;
  }
}
.recoommend {
  position: absolute;
  top: 0;
  left: -6px;
  img {
    width: 66px;
    height: 66px;
  }
}
.boxCard {
  width: 1320px;
  margin-top: 40px;
}
.hot-game-list-container {
  overflow: hidden;
  width: 1325px;
  padding-left: 5px;
}
.hot-game-list-iner-containe {
  transition: transform 1s ease;
  width: 9000px;
  padding-top: 38px;
}
.hot-game-list .item.hover .expand-card {
  transform: scale(1) translate(0);
}
.expand-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 680px;
  height: 350px;
  background-size: 100%;
  background-position: 0px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: all 0.6s ease;
  transform: scale(0) translate(30px, -30px);
  transform-origin: bottom left;
}
// .hot-game-list.poker .expand-card {
//   // background-image: url('../../../assets/img/cardBg.png');
// }
.expand-card-inner {
  position: absolute;
  right: 38px;
  top: 122px;
  width: 260px;
}

.expand-card-inner .title {
  position: absolute;
  top: -53px;
  left: 0;
  width: 116px;
}

.expand-card-inner .gift-text {
  position: absolute;
  top: -90px;
  right: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: right;
  color: #c49d69;
}

.expand-card-inner .gift-text .gift-num {
  display: block;
  height: 68px;
}

.expand-card-inner .game-desc {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  height: 126px;
  color: var(--60, rgba(255, 255, 255, 0.6));
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.expand-card-inner .start-game-btn {
  font-style: normal;
  font-weight: 600;
  margin-top: 25px;
  width: 145px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
}
.hot-game-list.poker .start-game-btn0 {
  border-radius: 60px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .start-game-btn1 {
  border-radius: 60px;
  background: linear-gradient(90deg, #ff6fa8 25%, #e72a68 89.06%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .start-game-btn2 {
  border-radius: 60px;
  background: linear-gradient(90deg, #c5b497 25%, #795337 89.06%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .start-game-btn3 {
  border-radius: 60px;
  background: linear-gradient(90deg, #f4a700 25%, #f77400 89.06%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .start-game-btn4 {
  border-radius: 60px;
  background: linear-gradient(90deg, #f26744 25%, #fa1c17 89.06%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .start-game-btn5 {
  border-radius: 60px;
  background: linear-gradient(90deg, #2cb9ff 25%, #1565f8 89.06%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}
.hot-game-list.poker .img-cover0:after {
  background: linear-gradient(
    180deg,
    rgba(233, 98, 18, 0) 45.83%,
    rgba(233, 98, 18, 0.9) 83.33%,
    #e96212
  );
}
.hot-game-list.poker .img-cover1:after {
  background: linear-gradient(
    180deg,
    rgba(232, 42, 105, 0) 45.83%,
    rgba(232, 42, 105, 0.9) 83.33%,
    #e82a69
  );
}
.hot-game-list.poker .img-cover2:after {
  background: linear-gradient(
    180deg,
    rgba(115, 80, 50, 0) 45.83%,
    rgba(115, 80, 50, 0.9) 83.33%,
    #735032
  );
}
.hot-game-list.poker .img-cover3:after {
  background: linear-gradient(
    180deg,
    rgba(225, 116, 0, 0) 45.83%,
    rgba(225, 116, 0, 0.9) 83.33%,
    #ff7400
  );
}
.hot-game-list.poker .img-cover4:after {
  background: linear-gradient(
    180deg,
    rgba(250, 32, 25, 0) 45.83%,
    rgba(250, 32, 25, 0.9) 83.33%,
    #fa2019
  );
}
.hot-game-list.poker .img-cover5:after {
  background: linear-gradient(
    180deg,
    rgba(34, 98, 245, 0) 45.83%,
    rgba(34, 98, 245, 0.9) 83.33%,
    #2262f5
  );
}
.hot-game-list {
  display: flex;
  flex-wrap: wrap;
}

.hot-game-list .game-name {
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 38px;
  white-space: nowrap;
  color: #fff;
}

.hot-game-list .item {
  position: relative;
  margin-right: 30px;
  border-radius: 6px;
  transition: transform 0.6s ease;
}

.hot-game-list .img-cover {
  position: relative;
  width: 290px;
  height: 350px;
  background-size: 101%;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 2;
  cursor: pointer;
}

.hot-game-list .img-cover:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hot-game-list .label {
  position: absolute;
  top: 0;
  left: 0;
  height: 34px;
  border-top-left-radius: 6px;
  z-index: 4;
}

.hot-game-list .title-wrap {
  position: absolute;
  bottom: 38px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 3;
  transition: all 0.3s ease;
}

.hot-game-list .title-wrap .text {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #b6bfdc;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 10px;
  margin-top: 10px;
}
.hot-game-list .item.hover {
  z-index: 3;
}

.hot-game-list .item.hover .img-cover {
  transform: translate(38px, -38px);
  transition-delay: 0.1s;
}

.hot-game-list .item.hover .img-cover:after,
.hot-game-list .item.hover .title-wrap {
  opacity: 0;
}

.hot-game-list .item.hover .expand-card {
  transform: scale(1) translate(0);
}

.hot-game-list .item.hover .img-cover {
  cursor: default;
}

// .hot-game-list {
//   transition: all 0.6s ease;
// }

.dots-wrap {
  // position: absolute;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dots-wrap .item {
  display: flex;
  align-items: center;
  width: 40px;
  height: 12px;
  padding: 0 4px;
  cursor: pointer;
}

.dots-wrap .item .inner {
  width: 100%;
  height: 3px;
  background: #3d4663;
}

.dots-wrap .item.active .inner {
  background: #f35f1b;
}
.fs1 {
  color: var(--100, #fff);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 216.667% */
  margin-right: 2px;
}
</style>
