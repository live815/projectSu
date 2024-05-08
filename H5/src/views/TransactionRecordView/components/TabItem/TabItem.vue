<template>
  <div>
    <DateTimeTab :dateIndex="selectedTab" @changeDate="changeDate"></DateTimeTab>
    <List></List>
  </div>
</template>

<script setup>
import DateTimeTab from '../DateTimeTab/DateTimeTab'
import List from '../List/List'
const emit = defineEmits(['changeDate'])
const selectedTab = ref(0)
watch(
  () => props.dateIndex,
  (newActiveIndex) => {
    selectedTab.value = newActiveIndex
  },
  { immediate: true }
)

const props = defineProps({
  dateIndex: {
    type: Number,
    default: 0
  }
})

const changeDate = (index) => {
  emit('changeDate', index)
}
</script>
<style lang='scss' scoped>
</style>
