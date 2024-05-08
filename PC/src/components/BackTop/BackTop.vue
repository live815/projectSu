<template>
  <div class="upTop" v-show="liveStore.isUpward">
    <div class="upward" @click="upwardBtn">
      <img src="./img/upwardImg.png" />
    </div>
  </div>
</template>

<script setup>
import { useLiveStore } from '@/stores/liveBroadcast'
import eventBus from '@/utils/eventBus'
const liveStore = useLiveStore()
const upwardBtn = () => {
  eventBus.emit('isUpward')
}
</script>

<style lang="scss" scoped>
.upTop {
  position: fixed;
  right: 28px;
  bottom: 150px;
}

.upward {
  display: flex;
  width: 48px;
  height: 48px;
  // padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: var(--unnamed, #171a2f);
  z-index: 100;
  /* Shadow/Shadow-3 上层投影 */
  cursor: pointer;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.08), 0px 16px 24px 2px rgba(0, 0, 0, 0.04),
    0px 6px 30px 5px rgba(0, 0, 0, 0.05);

  img {
    width: 24px;
    height: 24px;
  }
}
</style>
