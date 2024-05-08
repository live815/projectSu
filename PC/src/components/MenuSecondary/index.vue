<template>
  <div class="outter-box">
    <div class="list-box">
      <div v-show="item.status == 0" class="list-item" v-for="(item, index) in useData"
        @mouseenter="isActiveHandle(item.id)" @mouseleave="isActiveHandle(null)" :key="index" :style="{
          'background-image':
            isActiveItem == item.id
              ? 'url(' + currBackground.bgImgSele + ')'
              : 'url(' + currBackground.bgImg + ')'
        }">
        <div class="img-box">
          <!-- <div>{{ item }}</div> -->
          <img :src="getImgUrl(item.pcLobbyIconTab)" />
        </div>

        <div class="text-box">
          <p class="header">{{ item.lobbyName }}</p>
          <div class="text" style="margin-top: 4px;">{{ item.promotionGuideText }}</div>
          <button @click="usePlayGame(item, router)">{{ $t('Components.EnterTheGame') }}</button>
        </div>
        <div class="main-tenance" v-if="item.isMaintain">
          <div class="prompt">
            <div>{{ $t('Components.fixStartTime') }}</div>
            <div>{{ item.startTime }}</div>
            <div>-</div>
            <div>{{ $t('Components.fixEndTime') }}</div>
            <div>{{ item.endTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayGame } from '@/hooks/usePlayGame.js'
import { getImgUrl } from '@/utils'
onMounted(() => { })
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  subGameList: {
    type: Array,
    default: null
  }
})
const isActiveItem = ref('')
const useData = computed(() => {
  if (props.subGameList[0] && props.subGameList) {
    return props.subGameList[0].gameList
  } else {
    return []
  }
})
const currBackground = computed(() => {
  if (props.subGameList[0] && props.subGameList) {
    let currTab = props.subGameList[0].sort
    currBackground.bgImg = new URL(`./img/${currTab}_0.png`, import.meta.url).href
    currBackground.bgImgSele = new URL(`./img/${currTab}_1.png`, import.meta.url).href
    return currBackground
  } else {
    return []
  }
})

function isActiveHandle(id) {
  isActiveItem.value = id
}
</script>

<style lang="scss" scoped>
.img-box {
  width: 120px;
  height: 140px;
}

.img-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.outter-box {
  height: 92vh;
  overflow: scroll;
  scrollbar-width: none; //火狐浏览器 隐藏滚动条
  background: rgba(11, 14, 31, 0.5);
  backdrop-filter: blur(10px);

  .list-box {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    margin: 20px 0;

    .list-item {
      display: flex;
      height: 140px;
      // margin-top: 25px;
      background-size: cover;
      position: relative;

      .header {
        // margin-top: 40px;
        color: var(--100, #fff);
        
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }

      .text-box {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 12px;
        font-weight: 400;
      }

      button {
        width: 80px;
        height: 26px;
        margin-top: 18px;
        border-radius: 30px;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: var(--100, #fff);
        border: none;
        cursor: pointer;
      }
    }
  }
}

.main-tenance {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, .7);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
}
</style>
