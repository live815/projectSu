<template>
  <div class="odds-panel" :class="oddsPanelClass">
    <van-collapse
      v-if="oddsList.length"
      v-model="fbStore.mgListIdxs"
      :border="false"
      ref="collapse"
    >
      <van-collapse-item v-for="(item, index) in oddsList" :key="index" :name="item.idx">
        <template #title>
          <div class="mty-title" @click="fbStore.isOperatedMarketsListCollapse = true">
            <van-icon class="van-icon-arrow van-cell__right-icon" name="arrow-up" />
            <span class="">{{ item.nm }}</span>
            <span v-if="isDev">-{{ item.mty }}</span>
          </div>
        </template>
        <template #right-icon>
          <div class="icon">
            <img height="24" width="24" :src="upIcon" @click.stop="moveItemToTop(index)" />
          </div>
        </template>
        <!-- 赔率Group -->
        <OddsGroup :item="item" :index="index" :isWaveBile="item.tps?.includes('cs')" />
      </van-collapse-item>
    </van-collapse>
    <div v-else class="no-data">
      <img :src="noData" />
      <div>{{ $t('Mletter.Nodata') }}</div>
    </div>
  </div>
</template>

<script setup>
import OddsGroup from '@/components/OddsGroup/OddsGroup.vue'
import upIcon from './img/up.png'
import noData from '../../img/noData.png'
import { useFBStore } from '@/stores/fb'
import { useLiveList } from '@/stores/live'
import { useRoute } from 'vue-router'
import eventBus from '@/utils/eventBus'
const isDev = process.env.NODE_ENV === 'development'
const route = useRoute()
const fbStore = useFBStore()
const liveStore = useLiveList()
const collapse = ref(null)
const viewHeight = ref(false)
const props = defineProps({
  activeTab: {
    type: String,
    default: 'all'
  }
})
eventBus.on('topViewChange', (v) => {
  viewHeight.value = v
})

// 根据条件动态设置投注区域高度
const oddsPanelClass = computed(() => {
  const isMatchDetail234 = [0, 4].includes(fbStore.matchDetailList?.ms)
  const isFromLive = route.query.data === 'fromLive'

  if (viewHeight.value) {
    return 'odds-panel-415'
  } else if (isMatchDetail234 && !isFromLive && !liveStore.matchAnchorArr.length) {
    return 'odds-panel-295'
  } else if (isFromLive) {
    return 'odds-panel-360'
  }

  return '' // 默认情况下返回空字符串
})

onUnmounted(() => {
  eventBus.off('topViewChange')
})

// 当前玩法列表
const oddsList = computed(() => {
  if (props.activeTab === 'all') {
    return fbStore.matchDetailList.mg || []
  } else {
    return (
      fbStore.matchDetailList.mg?.filter(
        (item) => item.tps.length && item.tps.includes(props.activeTab)
      ) || []
    )
  }
})

watchEffect(() => {
  // 如果用户手动点击收起开关将列表折叠起来了，则不要随数据更新自动展开
  if (!fbStore.isOperatedMarketsListCollapse) {
    fbStore.mgListIdxs = oddsList.value.map((item) => item.idx)
  }
})
const toggleAll = (bool) => {
  collapse.value?.toggleAll(bool)
}

// 置顶
const moveItemToTop = (index) => {
  if (oddsList.value && oddsList.value.length > index) {
    const itemToMove = oddsList.value.splice(index, 1)[0]
    oddsList.value.unshift(itemToMove)
  }
}

defineExpose({
  toggleAll
})
</script>

<style lang="scss" scoped>
.odds-panel {
  width: 100vw;
  height: calc(var(--app-height) - 335px);
  overflow: auto;
  padding-bottom: 50px;
  :deep() {
    .van-cell__right-icon {
      margin-right: 8px;
    }
    .van-cell--clickable {
      height: 45px;
    }
    .van-cell__title {
      width: 330px;
    }
  }

  .mty-title {
    @include ellipsis();
  }
  .odds-box {
    .title {
      @include center-content(space-between, center);
      text-align: center;
      color: var(--color-text);

      font-size: 13px;
      font-weight: 400;
      gap: 10px;
      > div {
        @include center-content();
        width: 110px;
        margin-bottom: 10px;
      }
      img {
        margin-right: 5px;
      }
      .teamName {
        @include textToOmit();
      }
    }
    .item-line {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      &.multiple {
        flex-wrap: wrap;
        .odds-item {
          flex-basis: calc(33.33% - 10px); /* 1/3 宽度，减去间隔 */
        }
      }
      &.twoIineRow {
        .odds-item {
          flex-basis: calc(50% - 10px);
        }
      }
      &.oneInoneRow {
        flex-direction: column;
      }
    }
    .odds-item {
      padding: 0 8px;
      border-radius: 6px;
      background: #f5f6f9;
      border: 1px solid transparent;
      flex: 1;
      height: 40px;
      line-height: 40px;
      .sold {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
      }
      .score-number {
        font-size: 14px;
        font-weight: 400;
        color: var(--color-text);
      }
      .odds {
        display: flex;
        align-items: center;
        .num {
          font-family: DIN Alternate;
          color: var(--color-text-dark);
          font-size: 15px;
          font-weight: 600;
        }
        .arrow {
          width: 10px;
          height: 10px;
          margin-left: 2px;
        }
        &.up {
          .num {
            color: var(--color-danger);
          }
          .arrow {
            fill: var(--color-danger);
            transform: rotateX(180deg);
          }
        }
        &.down {
          .num {
            color: #00b42a;
          }
          .arrow {
            fill: #00b42a;
            opacity: 1;
          }
        }
      }

      .ss-closed {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        svg {
          fill: #cccccc;
        }
      }
      &.active {
        border-color: #ff5000;
        background: #fff0e9;
      }
    }

    .correct-score {
      width: 107px;
      height: 40px;
    }
    .goalDifference {
      width: 343px;
      height: 40px;
    }
  }
  .no-data {
    color: #666;
    text-align: center;

    font-size: 14px;
    font-weight: 400;
    width: 375px;
    margin-top: 70px;
    img {
      width: 200px;
      height: 125px;
    }
  }
}
.odds-panel-415 {
  height: calc(var(--app-height) - 415px);
}
.odds-panel-295 {
  height: calc(var(--app-height) - 295px);
}
.odds-panel-360 {
  height: calc(var(--app-height) - 360px);
}
</style>
