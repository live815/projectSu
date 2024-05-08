<template>
  <div class="tab-box">
    <div class="tab-bar" :class="{ styleHeght: styleHeght }">
      <div
        class="tab-bar-title"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: selectedTab === index }"
        @click="changeTab(index, item)"
      >
        <span class="img" v-if="item.img"><img :src="item.img" alt="" /> </span>
        <span class="title">{{ item.title }}</span>
        <div class="active-line" v-if="selectedTab === index"></div>
      </div>
    </div>
    <div class="tab-box-right" @click="onClickFilter">
      <img src="../../img/screenIcon.png" />
      <div class="title">{{ $t('Transactrecord.filter') }}</div>
    </div>
  </div>
  <div class="tab-content" :class="{ styleContentMargin: styleHeght }">
    <slot name="tabContent"></slot>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { computed, watch } from 'vue'

const emit = defineEmits(['index', 'filterIndex'])
const selectedTab = ref(0)
// selectedTab.value = props.activeIndex
watch(
  () => props.activeIndex,
  (newActiveIndex) => {
    selectedTab.value = newActiveIndex
  }
)

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
  styleHeght: {
    type: Boolean,
    default: false
  }
})

const tabs = computed(() => {
  return props.tabList
})

const changeTab = (index, item) => {
  if (index < 4) {
    selectedTab.value = index
  }
  emit('index', index, item)
}

const onClickFilter = () => {
  emit('filterIndex')
}
</script>
<style lang='scss' scoped>
.tab-box {
  display: flex;
  align-items: center;

  .tab-bar {
    display: flex;
    align-items: center;
    max-width: 280px;
    overflow: auto;
    height: 48.5px;
    background-color: #fff;
    box-sizing: border-box;
    .tab-bar-title {
      display: flex;
      position: relative;
      font-size: 16px;
      font-style: normal;
      color: #999;
      margin: 0 15px;
      white-space: nowrap;
      .title {
        font-weight: 600 !important;
      }
      .img {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
          height: 100%;
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
    .tab-bar-title:last-child() {
      margin-right: 15px;
    }
  }
  .tab-box-right {
    display: flex;
    align-items: center;
    min-width: 70px;
    img {
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
    .title {
      min-width: 55px;
      font-size: 16px;
      font-weight: 600 !important;
      margin-left: 5px;
      color: #999;
    }
  }
}

.styleHeght {
  height: 38px;
}
.tab-bar .active {
  // font-weight: bold;
  color: #ff5000;
}

.styleContentMargin {
  margin: 0;
}
</style>