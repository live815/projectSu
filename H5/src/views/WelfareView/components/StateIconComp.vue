<template>
  <div>
    <div class="icon-pic-available" v-if="props.stateCode == 1">
      <img :src="imgHandler" alt="" />
    </div>
    <div class="icon-pic-unavailable" v-if="props.stateCode == 2">
      <img :src="imgHandler2" alt="" />
    </div>
    <div class="icon-pic-expired" v-if="props.stateCode == 3">
      <img :src="imgHandler3" alt="" />
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
const props = defineProps({
  stateCode: {
    default: null
  }
})

const imgHandler = computed(() => {
  return new URL(`../img/${appStore.language}/Tobecollected.png`, import.meta.url).href
})
const imgHandler2 = computed(() => {
  return new URL(`../img/${appStore.language}/received.png`, import.meta.url).href
})
const imgHandler3 = computed(() => {
  return new URL(`../img/${appStore.language}/expired.png`, import.meta.url).href
})
</script>
<style lang="scss">
img {
  width: 100%;
  height: 100%;
}
.icon-pic-available {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 0px;
  left: 281px;
  flex-shrink: 0;
  border-radius: 10px;

  .receive-state {
    position: absolute;
    top: 9px;
    left: 12px;
    transform: rotate(-30deg);
    color: var(--1, #f53f3f);

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    /* 233.333% */
  }
}

.icon-pic-unavailable {
  position: absolute;

  top: 0px;
  left: 281px;
  flex-shrink: 0;
  border-radius: 10px;

  .receive-state {
    position: absolute;
    top: 9px;
    left: 12px;
    transform: rotate(-30deg);
    color: var(--1, #ff9000);

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    /* 233.333% */
  }
}

.icon-pic-expired {
  position: absolute;
  top: 0px;
  left: 281px;
  flex-shrink: 0;
  border-radius: 10px;

  .receive-state {
    position: absolute;
    top: 9px;
    left: 12px;
    transform: rotate(-30deg);
    color: var(--999, #999);

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    /* 233.333% */
  }
}
</style>
