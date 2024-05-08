<template>
  <div class="sport-header">
    <!-- 注单记录分类tab 未结算/已结算/预约 -->
    <div class="tab">
      <div
        :class="{ active: idx === currentIndex }"
        v-for="(item, idx) in list"
        :key="idx"
        class="item"
        @click="select(idx)"
      >
        <span calss="title" v-html="item.title"> </span>
        <span v-if="item.num" class="num"> ({{ item.num }}) </span>
      </div>
    </div>
    <!-- 已结算分类 -->
    <div v-if="currentIndex === 1" class="time-picker-wrapper">
      <TimePicker @update:timeRange="$emit('update:timeRange', $event)" />
    </div>
    <!-- 预约分类 -->
    <div v-if="currentIndex === 2" class="book-type-wrapper">
      <TabButton @select="selectBookTypeIdx" :currentIdx="bookTypeIdx" :list="bookTypeList" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import i18n from '@/i18n'

const props = defineProps([
  'currentIndex',
  'timeRange',
  'bookTypeIdx',
  'unsettledTotal',
  'settledTotal',
  'bookBetTotal'
])
const emit = defineEmits(['update:currentIndex', 'update:timeRange', 'update:bookTypeIdx'])
const list = computed(() => {
  return [
    {
      title: i18n.global.t('BetrecordView.UnsettleMent'),
      num: props.unsettledTotal
    },
    {
      title: i18n.global.t('BetrecordView.Settled'),
      num: props.settledTotal
    },
    {
      title: i18n.global.t('BetrecordView.BookReservat'),
      num: props.bookBetTotal
    }
  ]
})

const select = (idx) => {
  emit('update:currentIndex', idx)
}
const bookTypeList = [
  { label: i18n.global.t('BetrecordView.InProgress') },
  { label: i18n.global.t('BetrecordView.Expired') }
]
function selectBookTypeIdx(idx) {
  emit('update:bookTypeIdx', idx)
}
</script>

<style lang="scss" scoped>
.sport-header {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset, 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  margin: 15px;
  padding: 20px 15px;
  .tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 600;
      font-size: 15px;
      position: relative;
      flex: 1;
      height: 30px;
      text-align: center;
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 2px;
        background: #eee;
      }
      .num {
        margin-left: 4px;
      }
      &.active {
        color: var(--color-primary);
      }
    }
  }
  .time-picker-wrapper {
    margin-top: 20px;
    transform: translate3d(0, 5px, 0);
  }
  .book-type-wrapper {
    margin-top: 20px;
    transform: translate3d(0, 5px, 0);
  }
}
</style>
