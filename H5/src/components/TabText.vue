<template>
  <div class="tab-text">
    <div
      :class="{ active: currentIdx === idx }"
      class="item"
      v-for="(item, idx) in list"
      :key="item.title"
      @click="select(idx)"
    >
      <p>{{ item.title }}</p>
      <span v-if="idx != list.length - 1">/</span>
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
.tab-text {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    p {
      padding: 0 5px;
      font-size: 12px;
      color: var(--color-text-dark);
    }
    &.active {
      p {
        color: var(--color-primary);
        font-size: 14px;
      }
    }
  }
}
</style>
