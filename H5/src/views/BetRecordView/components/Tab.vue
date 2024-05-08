<template>
  <div class="tab">
    <div
      class="basic"
      v-for="(item, idx) in tabList"
      :key="item.id"
      @click="tabChange(idx)"
      :class="{ active: currentIndex === idx }"
    >
      <span>{{ item.title }}</span>
      <div class="active-line" v-if="currentIndex === idx"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import i18n from '@/i18n'

const emit = defineEmits(['index'])
const currentIndex = ref(0)
const tabList = ref([
  { id: 111, title: i18n.global.t('BetrecordView.Sport') },
  { id: 222, title: i18n.global.t('BetrecordView.Game') }
])

const tabChange = (idx) => {
  currentIndex.value = idx
  emit('index', idx)
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  width: 156px;
  justify-content: space-between;
  .basic {
    position: relative;
    & span {
      color: #666;

      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }
    .active-line {
      width: 18px;
      height: 3px;
      background: #ff5000;
      margin-left: 6px;
      position: absolute;
      bottom: -8px;
      border-radius: 4px;
    }
  }
  .active span {
    color: #ff5000;
  }
}
</style>
