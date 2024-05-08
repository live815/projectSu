<template>
  <div class="content">
    <van-skeleton :loading="skeletonLoading">
      <template #template>
        <Skeleton />
      </template>
      <div class="tab-box" style="justify-content: flex-start">
        <div class="show-hide" @click="toggleAll">
          <img
            :style="{ transform: `rotate(${rotation}deg)` }"
            height="16"
            width="16"
            :src="arrow"
          />
        </div>
        <div
          v-for="item in tabList"
          :key="item.key"
          @click="handleFilter(item.key)"
          class="tab-but"
          :class="{ 'active-tab-but': item.key === activeTab }"
        >
          {{ item.value }}
        </div>
      </div>
      <Odds ref="odds" :activeTab="activeTab" />
    </van-skeleton>
    <!-- 投注购物车 -->
    <BetCart />
  </div>
</template>

<script setup>
import BetCart from '@/views/SportsView/components/BetCart/BetCart.vue'
import Odds from '../Odds/Odds'
import arrow from './img/arrow.png'
import { useFBStore } from '@/stores/fb'
import Skeleton from '../Skeleton/Skeleton'
import { uniq } from 'lodash'
import { SPORT_GAMEPLAY } from '@/hooks/useSportDict'
import i18n from '@/i18n'

const fbStore = useFBStore()
const activeTab = ref('all')
const odds = ref(null)
const rotation = ref(180)
const isCollapse = computed(() => {
  return fbStore.mgListIdxs.length ? false : true
})
fbStore.isOperatedMarketsListCollapse = false // 每次进入页面重置操作状态，默认展开所有玩法
const tabList = computed(() => {
  const mg = fbStore.matchDetailList.mg
  const mergedTps = mg?.reduce((merged, item, idx) => {
    item.idx = idx
    if (item.tps) {
      merged.push(...item.tps)
    }
    return merged
  }, [])
  const uniqueTps = uniq(mergedTps)
  const filteredArray = SPORT_GAMEPLAY(i18n).filter((item) => uniqueTps.includes(item.key))
  const allItem = { key: 'all', value: i18n.global.t('Mletter.all') }
  return [allItem, ...filteredArray]
})
defineProps({
  skeletonLoading: {
    type: Boolean,
    default: false
  }
})

const toggleAll = () => {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    odds.value.toggleAll(true)
  } else {
    // 如果是展开状态则折叠列表
    odds.value.toggleAll(false)
  }
  // 标识用户手动操作了详情页玩法列表折叠面板
  fbStore.isOperatedMarketsListCollapse = true
  rotation.value = rotation.value === 180 ? 0 : (rotation.value += 180)
}
const handleFilter = (key) => {
  activeTab.value = key
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  :deep() {
    .van-skeleton {
      padding: 0;
    }
  }
  .tab-box {
    @include center-content();
    gap: 6px;
    flex-wrap: nowrap;
    padding-top: 15px;
    overflow-x: auto;
    max-width: 375px;
    padding-bottom: 10px;
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
    .active-tab-but {
      background: var(--1, linear-gradient(93deg, #ff9000 0%, #ff5000 100%));
      border-color: transparent;
      color: #fff;
    }
    .tab-but-skeleton {
      width: 80px;
      height: 30px;
      background-color: #f2f2f2;
    }
  }
}
</style>
