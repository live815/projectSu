<template>
  <van-action-sheet v-model:show="show" :title="$t('Mletter.SwitchLines')">
    <div class="content">
      <div
        class="line"
        :class="{ active: active === item.value }"
        v-for="(item, index) in lineList"
        :key="index"
        @click="switchLines(item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup>
import eventBus from '@/utils/eventBus'
import { useLiveList } from '@/stores/live'
import i18n from '@/i18n'

const liveStore = useLiveList()
const show = ref(false)
const active = ref(1)

eventBus.on('callLine', () => {
  show.value = true
})
const switchLines = (value) => {
  active.value = value
  liveStore.switchLines(`video${value}`)
  show.value = false
}
const lineList = computed(() => {
  const keys = Object.keys(liveStore.satelliteLive)
  const processedArray = keys.map((key, index) => {
    return {
      label: `${i18n.global.t('Mletter.Line')}${index + 1}`, // 生成 "线路1", "线路2" 等标签
      value: index + 1 // 生成相应的值
    }
  })

  return processedArray
})
onUnmounted(() => {
  eventBus.off('callLine')
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  padding: 0 15px 15px;
  .line {
    width: 103px;
    padding: 12px 0;
    border-radius: 8px;
    background: #f5f5f5;
    color: var(---Gray-3, #333);
    font-size: 16px;
    text-align: center;
    margin-right: 8px;
  }
  .active {
    border: 1px solid var(---1, #ff9000);
    background: var(---4, #fff5f0);
  }
}
</style>