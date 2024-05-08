<template>
  <ul>
    <li
      :class="{ active: currentGameTypeIdx === idx, free: appStore.language !== 'zh-cn' }"
      class="item"
      v-for="(item, idx) in gameTypeList"
      :key="item.lobbyName"
      @click="emit('chooseGameType', item, idx)"
    >
      <img class="icon" :src="getImg(item.appLobbyIconTab)" v-if="currentGameTypeIdx === idx" />
      <span>{{ item.lobbyName }}</span>
    </li>
  </ul>
</template>

<script setup>
import { getImg } from '@/utils'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const emit = defineEmits(['chooseGameType'])
defineProps({
  currentGameTypeIdx: { type: Number, default: 0 },
  gameTypeList: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 8px;
  background: url('./img/tab-bg.png') no-repeat;
  background-size: 100%;
  height: 45px;
  margin: 0 5px;
  @include SpecialItalics();

  li {
    margin-top: 2px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    line-height: 18px;
    width: calc(100% / 6);

    &.free {
      flex: auto;
    }

    img {
      width: 18px;
      height: 18px;
      margin-right: 5px;
    }

    &.active {
      background: url('./img/tab-active-bg.png') no-repeat center;
      background-size: contain;
      color: #fff;
      width: 75px;
    }
  }
}
</style>
