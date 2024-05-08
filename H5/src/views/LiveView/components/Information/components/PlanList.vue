<template>
  <div class="PlanList-view">
    <NavBar :title="$t('Lletter.planlist')" :isShowRight="false" />
    <Plan :data="computedList" :mastersList="planStore.mastersList" />
  </div>
</template>

<script setup>
import Plan from '@/components/Plan/Plan.vue'
import { usePlanStore } from '@/stores/plan'
import { useRoute } from 'vue-router'

const route = useRoute()
const planStore = usePlanStore()
const init = () => {
  if (!planStore.planList.length || !planStore.mastersList.length) {
    planStore.getExpertList()
    planStore.getPlanList()
  }
}
init()

const computedList = computed(() => {
  const data = planStore.planList
    .map((item) => {
      const matchedDetail = item.betContent ? JSON.parse(item.betContent) : {}
      return {
        ...item,
        matchedDetail
      }
    })
    .filter((item) => item.leagueId == route.params.id)

  return data
})
</script>

<style lang="scss" scoped>
.PlanList-view {
  padding: 0 12px;
}
</style>
