<template>
  <div class="odds-panel">
    <div class="tab-box">
      <div class="show-hide">
        <van-icon name="arrow-up" />
      </div>
      <div class="tab-but tab-but-skeleton" v-for="item in 4" :key="item"></div>
    </div>
    <van-collapse v-model="active" :border="false">
      <van-collapse-item v-for="item in 2" :key="item" :name="item">
        <template #title>
          <div @click="fbStore.isOperatedMarketsListCollapse = true">
            <van-skeleton-paragraph style="height: 25px; width: 100px" />
          </div>
        </template>
        <template #right-icon>
          <img height="16" width="16" :src="upIcon" />
        </template>
        <div class="odds-box">
          <div class="item-line" v-for="option in 3" :key="option">
            <div class="odds-item" v-for="team in 3" :key="team"></div>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
  
  <script setup>
import { ref } from 'vue'
import upIcon from '../Odds/img/up.png'
const active = ref([1, 2])
</script>
  
  <style lang="scss" scoped>
.odds-panel {
  width: 100vw;
  height: calc(var(--app-height) - 332px);
  overflow: auto;
  padding-bottom: 50px;
  :deep() {
    .van-cell__right-icon {
      margin-right: 8px;
    }
  }
  .odds-box {
    .item-line {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
    .odds-item {
      padding: 0 8px;
      border-radius: 10px;
      background-color: #f2f2f2;
      border: 1px solid transparent;
      flex: 1;
      height: 40px;
      line-height: 40px;
    }
  }
  .tab-box {
    @include center-content();
    gap: 6px;
    flex-wrap: nowrap;
    padding-top: 15px;
    overflow-x: auto;
    max-width: 375px;
    .show-hide {
      @include center-content();
      padding: 0 12px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #ddd;
      margin-left: 15px;
      img {
        transition: transform 0.3s ease;
      }
    }
    .tab-but {
      padding: 0 11px;
      text-align: center;
      border-radius: 46px;
      line-height: 30px;
      color: var(--gray-6, #666);
      white-space: nowrap;
      border: 1px solid #eee;
    }
    .tab-but-skeleton {
      width: 80px;
      height: 30px;
      background-color: #f2f2f2;
    }
  }
}
</style>
  