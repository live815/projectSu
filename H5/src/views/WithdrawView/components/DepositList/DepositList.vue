<template>
  <div class="depositList">
    <div
      class="depositList-item"
      :class="{ active: onComputedActiveTab === index }"
      v-for="(item, index) in list"
      :key="index"
      @click="changeTab(item, index)"
    >
      <div
        class="depositList-item-title"
        :class="{ activeTitle: onComputedActiveTab === index, 'title-size': textsize }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['onClickChildTab'])
const props = defineProps({
  list: {
    type: Object,
    default: () => {}
  },
  depositListTab: {
    type: Number,
    default: null
  },
  textsize: {
    type: Boolean,
    default: false
  }
})
const changeTab = (item, index) => {
  emit('onClickChildTab', item, index)
}
const onComputedActiveTab = computed(() => {
  return props.depositListTab
})
</script>
<style lang='scss' scoped>
.depositList {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .depositList-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 32px;
    margin: 2.8px;
    padding: 10px;
    background: #f7f7f7;
    box-sizing: border-box;
    border-radius: 6px;
    line-height: 32px;
    .depositList-item-title {
      font-size: 16px;
      color: #111;
      font-weight: 700;
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
    }
    .title-size {
      font-size: 14px;
      font-weight: 400;
    }
  }
  .active {
    border: 1px solid var(--1, #ff9000);
    background: var(--4, #fff5f0);
    box-sizing: border-box;
    .activeTitle {
      color: var(--2, #ff5000);
    }
  }
}
</style>