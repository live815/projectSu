<template>
  <div class="marquee" ref="marquee">
    <div ref="marqueeContainer" class="marquee-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const marqueeContainer = ref(null)
const marquee = ref(null)
const animationId = ref(null)
const scrollPosition = ref(0)
const speed = ref(1) // 调整滚动速度

const startMarquee = () => {
  animationId.value = requestAnimationFrame(scrollText)
}

const scrollText = () => {
  const container = marqueeContainer.value
  if (container) {
    scrollPosition.value -= speed.value
    container.style.transform = `translateX(${scrollPosition.value}px)`

    if (scrollPosition.value <= -container.clientWidth) {
      scrollPosition.value = marquee.value.clientWidth
    }
    animationId.value = requestAnimationFrame(scrollText)
  }
}

const stopMarquee = () => {
  cancelAnimationFrame(animationId.value)
}

onMounted(() => {
  startMarquee()
})

onBeforeUnmount(() => {
  stopMarquee()
})
</script>

<style lang="scss" scoped>
.marquee {
  display: flex;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  .icon {
    margin-right: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}

.marquee-container {
  display: inline-block;
  animation: none;
  will-change: transform;
  white-space: nowrap;
}
</style>
