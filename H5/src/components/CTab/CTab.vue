<template>
  <div class="tab-bar" :class="[{ styleHeght: styleHeght, fixed: fixed }]">
    <div
      class="tab-bar-title"
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ active: selectedTab === index }"
      @click="changeTab(index, item)"
    >
      <span class="title">{{ item.title }}</span>
      <span v-if="item.text" class="text">( {{ item.text }} )</span>
      <template v-if="rightImg">
        <div class="img" v-if="activeGat === index">
          <img src="./img/heeler.png" alt="" />
        </div>
      </template>
      <div class="active-line" v-if="selectedTab === index"></div>
    </div>
  </div>
  <div class="tab-content" :class="{ styleContentMargin: styleHeght }">
    <slot name="tabContent"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['index'])
const activeGat = ref(0)
const selectedTab = ref(0)
selectedTab.value = props.activeIndex

const props = defineProps({
  tabList: {
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
  },
  styleHeght: {
    type: Boolean,
    default: false
  },
  // 是否吸顶
  fixed: {
    type: Boolean,
    default: false
  }
})

const tabs = computed(() => {
  return props.tabList
})

const changeTab = (index) => {
  selectedTab.value = index
  emit('index', index)
}
</script>
<style lang='scss' scoped>
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  background-color: #fff;
  .tab-bar-title {
    display: flex;
    position: relative;
    font-size: 16px;
    font-style: normal;
    color: #999;
    .title {
      font-weight: 600 !important;
    }
    .text {
      margin-left: 10px;
      font-weight: 600 !important;
    }

    .img {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-left: 3px;
      border-radius: 30px 30px 30px 0px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      img {
        position: absolute;
        width: 8px;
        height: 10px;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
      }
    }
    .active-line {
      width: 17px;
      height: 3px;
      background: #ff5000;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: -11px;
      border-radius: 15px;
    }
  }
}
.fixed {
  position: fixed;
  z-index: 1;
  width: 100%;
}
.styleHeght {
  height: 38px;
}
.tab-bar .active {
  // font-weight: bold;
  color: #ff5000;
}

.tab-content {
  margin-top: 10px;
}
.styleContentMargin {
  margin: 0;
}
</style>