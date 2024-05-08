<template>
  <div class="addVirtual-list-wrapper">
    <div class="addVirtual-list">
      <div
        class="addVirtual-list-item"
        v-for="(item, index) in onComputedVirtualList"
        :key="item"
        :class="{ active: onComputedActiveTab === index }"
        @click="changeTab(item, index)"
      >
        <img v-if="item.icon" class="addVirtual-list-item-img" :src="item.icon" />
        <div :class="{ activeTitle: onComputedActiveTab === index }">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['onClickChildTab'])
const props = defineProps({
  virtualList: {
    type: Array,
    default: () => []
  },
  virtualListTab: {
    type: Number,
    default: null
  }
})

const onComputedVirtualList = computed(() => {
  return props.virtualList
})
const onComputedActiveTab = computed(() => {
  return props.virtualListTab
})
const changeTab = (item, index) => {
  emit('onClickChildTab', item, index)
}
</script>
<style lang='scss' scoped>
.addVirtual-list-wrapper {
  .addVirtual-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .addVirtual-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 50px;
      border-radius: 6px;
      border: 1px solid #eee;
      background: rgba(255, 255, 255, 0);
      margin: 7px;
      color: #666;

      font-size: 15px;
      font-style: normal;
      .addVirtual-list-item-img {
        width: 32px;
        height: 32px;
        margin-right: 5px;
      }
      .activeTitle {
        color: #ff5000;
      }
    }
    .active {
      border-radius: 6px;
      border: 1px solid #ff5000;
      background: #fff5f0;
    }
  }
}
</style>