<template>
  <van-swipe :style="StyleObj" :touchable="false" ref="swipe">
    <van-swipe-item v-for="(marketsArr, idx) in list" :key="idx">
      <Column
        :match="match"
        :listing="listing"
        v-for="column in marketsArr"
        :key="column.mty"
        :column="column"
      />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import Column from './Column.vue'
import { chunk, merge } from 'lodash'
import { SPORT_MARKET_TYPE } from '@/hooks/useSportDict'

const swipe = ref(null)
defineExpose({
  next,
  prev,
  swipeTo
})
const props = defineProps({
  match: {
    type: Object,
    default: () => ({})
  }
})
const listing = SPORT_MARKET_TYPE[props.match.sid] || []
const list = computed(() => {
  const mg = props.match.mg
  const res = listing.map((o) => {
    let currentObj = mg.find((op) => op.mty === o.mty)
    if (currentObj) {
      o = merge({}, o, currentObj)
    }
    return o
  })
  return chunk(res, 2)
})
const StyleObj = computed(() => {
  return listing.length > 2 && { paddingBottom: '10px' }
})
function next() {
  swipe.value?.next()
}
function prev() {
  swipe.value?.prev()
}
function swipeTo(idx) {
  swipe.value?.swipeTo(idx)
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-swipe.padding {
    padding-bottom: 10px;
  }
  .van-swipe__indicators {
    position: absolute;
    bottom: -0px;
  }
  .van-swipe__indicator {
    width: 10px;
    height: 4px;
    border-radius: 2px;
    background: #aaa;
  }
  .van-swipe__indicator--active {
    background: #ff5000;
  }
  .van-swipe-item {
    display: flex;
  }
}
</style>
