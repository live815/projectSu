<template>
  <div class="list">
    <div
      class="item"
      :class="{ active: currentIdx === idx }"
      v-for="(item, idx) in list"
      :key="item.title"
      @click="select(idx)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentIdx: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['select'])
function select(idx) {
  emit('select', idx)
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: space-between;
  .item {
    flex: 1;
    height: 28px;
    line-height: 28px;
    color: var(--color-111);
    text-align: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    margin-right: 15px;
    border-radius: 60px;
    background: #eee;
    border: 1px solid transparent;
    &:last-child {
      margin-right: 0;
    }
    &.active {
      border-color: var(--color-primary);
      background: #fff5f0 !important;
      color: var(--color-primary) !important;
    }
  }
}
</style>
