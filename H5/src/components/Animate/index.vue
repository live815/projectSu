<template>
  <div class="animate">
    <div
      class="item"
      :style="{ animationDelay: `${item * 0.2}s`, backgroundColor: props.color }"
      v-for="(item, index) in 3"
      :key="index"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white'
  }
})
</script>

<style lang="scss" scoped>
.animate {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 10px;
  height: 10px;
  .item {
    width: 2px;
    height: 80%;
    background-color: var(--color-primary);
    animation: move 0.3s ease-in-out infinite alternate;
  }
  @keyframes move {
    from {
      height: 50%;
    }
    to {
      height: 80%;
    }
  }
}
</style>
