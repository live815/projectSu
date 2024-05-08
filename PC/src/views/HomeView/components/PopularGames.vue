<template>
  <div class="box">
    <div class="box_bmain">
      <div class="tabList">
        <div
          :class="[currentIndex == index ? 'match-tab active' : 'match-tab']"
          v-for="(item, index) in appStore.gameTypeList"
          :key="index"
          @click="getCurrentType(index)"
        >
          {{ item.lobbyName }}
        </div>
      </div>
    </div>
    <PopularCard
      v-for="(item, index) in appStore.gameTypeList"
      :key="index"
      v-show="currentIndex == index"
      :gameData="item"
      :index="index"
    />
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import PopularCard from './PopularCard.vue'
const appStore = useAppStore()
const currentIndex = ref(0)
const getCurrentType = (index) => {
  currentIndex.value = index
}
</script>

<style lang="scss" scoped>
.box {
  min-width: 1320px;
  max-width: 1320px;
  margin: 0 auto;
  .box_bmain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tabList {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .match-tab {
    display: flex;
    // width: 114px;
    height: 46px;
    padding: 14px 26px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #383e4d;
    background: linear-gradient(180deg, rgba(41, 48, 70, 0.8) 0%, rgba(28, 33, 49, 0.8) 100%);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.6);

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-right: 34px;
    cursor: pointer;
  }

  .active {
    border: 1px solid #fa882e;
    background: linear-gradient(180deg, #f35d25 0%, #f28225 100%);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    color: #fff;
  }
}
.tabList :hover {
  color: #fff !important;
  opacity: 1;
}
</style>
