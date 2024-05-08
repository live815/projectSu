<template>
  <div class="Typelist" v-if="list.length">
    <div
      :class="{ active: currentIdx === idx }"
      @click="select(item, idx)"
      class="item"
      v-for="(item, idx) in list"
      :key="item.title"
    >
      <h3 :class="{ vertical: hideNum(item) }">{{ item.des }}</h3>
      <p class="num" v-if="!hideNum(item)">{{ item.tc }}</p>
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
function select(item, idx) {
  emit('select', item, idx)
}
function hideNum(item) {
  return [7].includes(item.ty)
}
</script>

<style lang="scss" scoped>
.Typelist {
  display: flex;
  overflow: auto;
  // padding: 15px 0;
  margin: 0 8px;
  .item {
    flex: none;
    min-width: 20%;
    text-align: center;
    position: relative;
    color: var(--color-text-second-dark);
    padding: 0 10px;
    h3 {
      font-size: 16px;
      margin-bottom: 4px;
      height: 18px;
      &.vertical {
        margin-top: 12px;
      }
    }
    p {
      font-size: 18px;
      font-weight: bold;
      @include numFrontFamily();
    }
    &.active {
      color: var(--color-primary);
      h3 {
        font-weight: bold;
      }
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 1px;
      height: 20px;
      background: #eee;
    }
  }
}
</style>
