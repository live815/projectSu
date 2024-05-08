<template>
  <div class="filter">
    <div class="left">
      <div class="switch" @click="toggleCollapse">
        <div :class="{ collapse: isCollapse }" class="icon">
          <iconSlideUp />
        </div>
        <span>{{ isCollapse ? $t('Sportsview.Expand') : $t('Sportsview.close') }} </span>
      </div>

      <div class="sort-by">
        <div class="icon" @click="toggleSortBy">
          <iconTransfer />
        </div>
        <div style="margin-top: -2px">
          <TabText :list="list" :currentIdx="currentIdx" @select="selectSortBy" />
        </div>
      </div>
    </div>

    <div @click="openLeagueFilter" class="filter-menu-btn">
      <iconsFilter />
    </div>
  </div>
  <van-popup
    v-model:show="isShowLeagueFilter"
    position="bottom"
    :style="{ width: '100%', height: '85%' }"
    @close="closeLeagueFilter"
    round
    :title="$t('Sportsview.Leaguefilter')"
  >
    <LeagueFilter v-if="isShowLeagueFilter" @close="isShowLeagueFilter = false" ref="leagueFilterRef" />
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'
import LeagueFilter from '../LeagueFilter.vue'
import eventBus from '@/utils/eventBus'
import { useFBStore } from '@/stores/fb'
import i18n from '@/i18n'
const fbStore = useFBStore()
const currentIdx = ref(0)
const isShowLeagueFilter = ref(false)
const leagueFilterRef = ref(null)
// 是否为折叠状态
const isCollapse = computed(() => {
  return fbStore.matchListIds.length ? false : true
})

const list = [
  {
    title: i18n.global.t('Sportsview.time'),
    orderBy: 0
  },
  {
    title: i18n.global.t('Sportsview.league'),
    orderBy: 1
  }
]
function selectSortBy(idx) {
  currentIdx.value = idx
  // 切换排序
  fbStore.queryMatchListParams.orderBy = idx
}
function toggleSortBy() {
  let idx = currentIdx.value === 0 ? 1 : 0
  currentIdx.value = idx
  fbStore.queryMatchListParams.orderBy = idx
}
watchEffect(() => {
  currentIdx.value = fbStore.queryMatchListParams.orderBy
})
function toggleCollapse() {
  if (isCollapse.value) {
    // 如果是折叠状态则展开列表
    eventBus.emit('MatchListOpenAll')
  } else {
    // 如果是展开状态则折叠列表
    eventBus.emit('MatchListCloseAll')
  }
  // 标记为用户手动操作了折叠面板
  fbStore.isOperatedMatchListCollapse = true
}

async function openLeagueFilter() {
  isShowLeagueFilter.value = true
  await fbStore.getOnSaleLeagues(fbStore.queryMatchListParams)
  let t = setTimeout(() => {
    leagueFilterRef.value.scrollTop()
    clearTimeout(t)
    t = null
  }, 300)
}
function closeLeagueFilter() {
  isShowLeagueFilter.value = false
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 15px 12px;

  .left {
    display: flex;
    align-items: center;
  }
  .switch {
    display: flex;
    margin-right: 17px;
    .icon {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
      svg {
        fill: var(--color-primary);
      }
      &.collapse {
        transform: rotate(180deg);
      }
    }
    span {
      font-size: 14px;
      color: var(--color-text-dark);
    }
  }

  .sort-by {
    display: flex;
    align-items: center;
    .icon {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 1px solid #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 2px;
      svg {
        fill: var(--color-primary);
      }
    }
  }
}
</style>
