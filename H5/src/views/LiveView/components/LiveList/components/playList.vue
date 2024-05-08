<template>
  <div class="payerlist">
    <div
      v-for="item in payerItems"
      :key="item.id"
      class="player-item"
      @click="navigateToAnchorInfo(item.id)"
    >
      <img :src="getImg(item.avatar)" alt="" />
      <div class="discribe">{{ item.nickName }}</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useLiveList } from '@/stores/live'
import { getImg } from '@/utils'

const route = useRouter()
const liveStore = useLiveList()
const payerItems = computed(() => {
  return liveStore.streamerLive.list
})
const navigateToAnchorInfo = (itemId) => {
  route.push(`/anchor-infor/${itemId}`)
}
</script>
<style lang="scss" scoped>
.payerlist {
  padding: 0 0 20px;
  overflow-x: auto;
  width: 100%;
  display: flex;

  .player-item {
    width: 78px;
    height: 72px;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .discribe {
      @include textToOmit(70px);
      color: #333;
      text-align: center;
      font-size: 13px;
      font-weight: 500;
      line-height: 16px; /* 123.077% */
    }
  }
}
</style>
