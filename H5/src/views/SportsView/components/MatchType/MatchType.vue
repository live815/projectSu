<template>
  <div class="match-type-wrapper">
    <div class="match-type" :class="{ activebg: isEarlyLine }">
      <TypeList :list="filterList" :currentIdx="currentIdx" @select="select" />
      <TimeSelect v-if="isEarlyLine" />
    </div>
  </div>
</template>

<script setup>
import TypeList from './TypeList.vue'
import TimeSelect from './TimeSelect.vue'
import { computed } from 'vue'
import { useTypeList } from './useTypeList'
import { useFBStore } from '@/stores/fb'
const fbStore = useFBStore()
const { currentIdx, filterList, select } = useTypeList()
const isEarlyLine = computed(() => fbStore.queryMatchListParams.type == 4) // 早盘
</script>

<style lang="scss" scoped>
.match-type-wrapper {
  padding-top: 2px;
  background: var(--color-background);
}
.match-type {
  border-radius: 10px;
  background: url('./img/hide.png') no-repeat center;
  background-size: cover;
  padding: 20px 0 20px;
  margin-top: 1px;
}
.activebg {
  background-image: url('./img/bg.png');
  background-size: 100% 100%;
}
</style>
