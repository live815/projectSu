<template>
  <div class="Result-view">
    <div v-for="(item,index) of computedFilterList" :key="index" class="score">
      {{ item.score[0] }}-{{ item.score[1] }}
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { getResultType } from '@/hooks/useSportDict'
import i18n from '@/i18n';

const props = defineProps({
  score: {
    type: Object,
    default: () => ({})
  }
})
const list = ref()

const computedFilterList = computed(() => {
  list.value = getResultType(i18n)[props.score.sid] || []
  const result = []
  list.value.forEach((seitem) => {
    let found = false
    props.score.nsg?.forEach((item) => {
      if (item.pe === seitem.pe && item.tyg === 5) {
        const newItem = {
          name: props.score.lg.na,
          title: seitem.title,
          score: item.sc
        }
        result.push(newItem)
        found = true
      }
    })
    if (!found) {
      const it = {score:[0,0]}
      result.push(it)
    }
  })
  return result
})

</script>

<style lang="scss" scoped>
.Result-view{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 5px;
  .score{
    width: 80px;
    padding-left: 6px;
  }
}
</style>