<template>
  <div class="list-box">
    <div
      class="list-item"
      :class="{ active: selectedTab === index }"
      v-for="(item, index) in onComputedList"
      :key="index"
      @click="changeTab(index, item)"
    >
      <template v-if="item.channelTypeName">
        <div class="list-item-img">
          <img :src="getImg(item.icon)" />
        </div>
        <div class="list-item-title">{{ item.channelTypeName }}</div>
        <div class="list-item-bottom" v-if="item.addPercent">
          {{ $t('common.given') }} {{ item.addPercent }}%
        </div>
        <div class="list-item-tag" v-if="item.label">{{ item.label }}</div>
      </template>
      <template v-else>
        <div class="list-item-img">
          <img :src="item.img" />
        </div>
        <div class="list-item-title">{{ item.wdWayName }}</div>
      </template>
    </div>
  </div>
  <div class="list-box-content">
    <slot name="tabContent"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getImg } from '@/utils'

const emit = defineEmits(['index'])

// 默认高亮第一个
const selectedTab = ref(0)
selectedTab.value = props.activeIndex
const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  // 默认高亮
  activeIndex: {
    type: Number,
    default: 0
  },
  // 右侧图标
  rightImg: {
    type: Boolean,
    default: false
  }
})

const onComputedList = computed(() => {
  return props.list
})

const changeTab = (index, item) => {
  selectedTab.value = index
  emit('index', index, item)
}
</script>
<style lang='scss' scoped>
.list-box {
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 16px;
  .list-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 78px;
    height: 78px;
    /* 每个item占据25%的宽度，减去margin的10px */
    margin: 3.8px;
    padding: 10px;
    border-radius: 8px;
    background: #f7f7f7;
    box-sizing: border-box;
    border: 1px solid #fff;

    .list-item-img {
      width: 32px;
      height: 32px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-item-title {
      width: 70px;
      text-align: center;
      font-size: 12px;
      color: #222;
      margin-top: 5px;
      word-break: keep-all;
      /* 不换行 */
      white-space: nowrap;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .list-item-tag {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 0px 5px 0px 8px;

      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }

    .list-item-bottom {
      position: absolute;
      bottom: -4px;
      border-radius: 10px;
      padding: 1px 6px;
      color: #fff;
      font-size: 11px;
      text-align: center;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      white-space: nowrap;
    }
  }

  .active {
    border: 1px solid var(--1, #ff9000);
    background: var(--4, #fff5f0);
  }

  .icon-left {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    color: var(--gray-9, #999);
  }
}
</style>