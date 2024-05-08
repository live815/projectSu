<template>
  <div class="tab-wrapper">
    <div class="tab">
      <div
        :class="{ active: idx === currentIndex }"
        v-for="(item, idx) in list"
        :key="idx"
        class="item"
        @click="select(idx)"
      >
        <span calss="title">
          {{ item.title }}
        </span>
        <span v-if="item.num" class="num"> ({{ item.num }}) </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import i18n from '@/i18n'

const props = defineProps(['currentIndex', 'unsettledTotal', 'settledTotal', 'bookBetTotal'])
const emit = defineEmits(['update:currentIndex'])
const list = computed(() => {
  return [
    {
      title: i18n.global.t('BetrecordView.UnsettleMent'),
      num: props.unsettledTotal
    },
    {
      title: i18n.global.t('BetrecordView.Settled'),
      num: props.settledTotal
    }
    // {
    //   title: '预约注单',
    //   num: props.bookBetTotal
    // }
  ]
})
const select = (index) => {
  emit('update:currentIndex', index)
}
</script>

<style lang="scss" scoped>
.game-tab {
  padding: 22px 48px 22px 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 60px;
  position: relative;
  .tab-uncheck > span {
    color: #666;

    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }
  .tab-uncheck {
    position: relative;
    .active {
      position: absolute;
      left: 17px;
      bottom: -23px;
      width: 50px;
      height: 3px;
      background: var(--color-primary);
      color: var(--color-primary);
    }
  }
  .fontcolor span {
    color: var(--color-primary);
  }
  .line {
    width: 1px;
    height: 20px;
    background: #eee;
  }
}

.tab-wrapper {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset, 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  margin: 0 15px;
  padding: 25px 15px;
}
.tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .item {
    font-weight: 600;
    font-size: 15px;
    position: relative;
    flex: 1;
    text-align: center;
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      height: 20px;
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
</style>
