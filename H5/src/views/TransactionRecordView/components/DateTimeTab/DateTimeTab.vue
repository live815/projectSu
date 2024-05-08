<template>
  <div class="date-content">
    <div
      class="date-content-item"
      :class="{ active: selectedTab === index }"
      v-for="(item, index) in dateData"
      :key="index"
      @click="onClickTabDate(item, index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import i18n from '@/i18n'

const emit = defineEmits(['changeDate'])
const props = defineProps({
  dateIndex: {
    type: Number,
    default: 0
  }
})

const selectedTab = ref(0)
watch(
  () => props.dateIndex,
  (newActiveIndex) => {
    selectedTab.value = newActiveIndex
  },
  { immediate: true }
)

const dateData = reactive([
  {
    id: 1,
    title: i18n.global.t('Transactrecord.today')
  },
  {
    id: 2,
    title: i18n.global.t('Transactrecord.yesterday')
  },
  {
    id: 3,
    title: i18n.global.t('Transactrecord.sevendays')
  },
  {
    id: 4,
    title: i18n.global.t('Transactrecord.tip1')
  }
])

// 点击tab切换
const onClickTabDate = (item, index) => {
  selectedTab.value = index
  emit('changeDate', index)
}
</script>
<style lang="scss" scoped>
.date-content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  height: 48.5px;
  background-color: #fff;

  .date-content-item {
    min-width: 70px;
    height: 28px;
    border-radius: 60px;
    text-align: center;
    font-size: 12px;
    line-height: 28px; /* 133.333% */
    background: #eee;
  }
  .active {
    border: 0.5px solid #ff5000;
    background: #fff5f0;
    color: #ff5000;
    color: #ff5000;
  }
}
</style>
