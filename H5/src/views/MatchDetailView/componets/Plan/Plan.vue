<template>
  <div class="plan-view" :class="planViewClass">
    <template v-if="computedList.length">
      <Plan :data="computedList" :mastersList="planStore.mastersList" />
    </template>
    <template v-else>
      <NoData :text="$t('Mletter.Noplanyet')" />
    </template>
    <!-- 投注购物车 -->
    <BetCart />
  </div>
</template>

<script setup>
import NoData from '../NoData/NoData'
import { useRoute } from 'vue-router'
import { useFBStore } from '@/stores/fb'
import { getPlanList } from '@/api/live'
import Plan from '@/components/Plan/Plan.vue'
import BetCart from '@/views/SportsView/components/BetCart/BetCart.vue'
import { useLiveList } from '@/stores/live'
import { usePlanStore } from '@/stores/plan'

const planStore = usePlanStore()
const liveStore = useLiveList()
const fbStore = useFBStore()
const route = useRoute()
const list = ref([])

const init = async () => {
  if (!planStore.mastersList.length) {
    await planStore.getExpertList()
  }

  getPlanList({
    leagueId: route.params.id
  }).then((res) => {
    if (res.code === 200) {
      list.value = res.data
    }
  })
}
init()

const computedList = computed(() => {
  // 通过方案列表的玩法id，去赛事详情列表里匹配对应的赔率列表
  const mappedList = (list?.value || [])
    .map((item) => {
      const matchedDetail = fbStore.matchDetailList.mg.find((detail) => {
        return detail.mks.some((mksItem) => mksItem.id === item.marketId)
      })

      if (matchedDetail) {
        return {
          ...item,
          matchedDetail: matchedDetail || null
        }
      } else {
        // 过滤掉匹配不到详情的项
        return null
      }
    })
    .filter(Boolean) // 过滤掉为 null 的项
  return mappedList ? mappedList : []
})

// 根据条件动态设置视图高度
const planViewClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  const isFromLive = route.query.data === 'fromLive'

  return {
    'plan-view-234': isMatchDetail234 && !liveStore.matchAnchorArr.length,
    'plan-view-300': isMatchDetail234 && isFromLive
  }
})
</script>

<style lang="scss" scoped>
.plan-view {
  @include mobile-padding();
  height: calc(var(--app-height) - 275px);
  overflow: auto;
}
.plan-view-234 {
  height: calc(var(--app-height) - 234px);
}
.plan-view-300 {
  height: calc(var(--app-height) - 300px);
}
</style>
