<template>
  <div class="ball-type">
    <div class="live" @click="$router.push('/live/LiveList')">
      <div class="icon">
        <span class="num">{{ liveIng }}</span>
        <iconLive />
      </div>
      <h3>{{ $t('Sportsview.Anchor') }}</h3>
    </div>
    <van-tabs @click-tab="onClickTab" v-model:active="fbStore.queryMatchListParams.sportId">
      <van-tab
        :name="item.sportId"
        v-for="item in filterList"
        :key="item"
        :disabled="Boolean(!item.c)"
      >
        <template #title>
          <div
            :class="{ active: item.sportId === fbStore.queryMatchListParams.sportId }"
            class="item"
          >
            <div class="icon">
              <span class="num">{{ getNum(item) }}</span>
              <img
                v-show="item.sportId === fbStore.queryMatchListParams.sportId"
                :src="sportIconActive[item.sportId]"
                alt=""
              />
              <img
                v-show="item.sportId !== fbStore.queryMatchListParams.sportId"
                :src="sportIcon[item.sportId]"
              />
            </div>

            <h3>
              {{ getBallTypeTextById(item.sportId) }}
            </h3>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { SPORT_IDS, getBallTypeTextById } from '@/hooks/useSportDict'
import { useFBStore } from '@/stores/fb'
import { showToast } from 'vant'
import { sportIcon, sportIconActive } from '@/utils/config'
import i18n from '@/i18n'
import { useLiveList } from '@/stores/live'

const fbStore = useFBStore()
const liveStore = useLiveList()
liveStore.getLiveListAction()
const ssl = computed(() => {
  // 关注分类从缓存获取球类总数
  if (!fbStore.queryMatchListParams.type) {
    return Object.keys(fbStore.followList).map((sid) => {
      return {
        sid: Number(sid),
        c: fbStore.followList[sid].length
      }
    })
  }
  if (fbStore.statistical.sl) {
    let res = fbStore.statistical.sl.find((item) => item.ty === fbStore.queryMatchListParams.type)
    if (res) return res.ssl
  }
  return []
})
// const total = computed(() => {
//   if (fbStore.statistical.sl) {
//     let res = fbStore.statistical.sl.find((item) => item.ty === fbStore.queryMatchListParams.type)
//     if (res) return res.tc
//   }
//   return 0
// })
const filterList = computed(() => {
  const arr = Object.entries(SPORT_IDS).map(([sport, sportId]) => ({ sportId }))

  return arr.map((item) => {
    let currObj = ssl.value.find((o) => o.sid == item.sportId)
    if (currObj) {
      item.c = currObj.c
    }
    return item
  })
})
function getNum(item) {
  let max = 999
  if (item.c > max) {
    return `${max}+`
  }
  return item.c || 0
}
function onClickTab(item) {
  if (item.disabled) {
    showToast({
      message: i18n.global.t('Sportsview.Noevent'),
      icon: 'clock-o'
    })
  }
}
const liveIng = computed(() => {
  return liveStore.liveList?.filter((item) => item.status === 2).length || 0
})
</script>

<style lang="scss" scoped>
.ball-type {
  position: relative;
  .live {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    border-radius: 0px 6px 6px 0px;
    background: #f1f1f1;
    flex: 0 0 60px;
    width: 60px;
    height: 66px;
    text-align: center;
    // border:1px solid red;
    .icon {
      width: 28px;
      height: 28px;
      margin: 10px auto 4px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      svg {
        fill: #cbced8;
      }
    }
    .num {
      position: absolute;
      left: 22px;
      top: -8px;
      font-size: 12px;
      font-weight: 700;
      @include numFrontFamily();
    }
    h3 {
      font-size: 14px;
    }
  }
}
:deep() {
  .van-tabs {
    padding-left: 60px;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 60px;
    .van-tabs__nav {
      background: transparent;
    }
  }
  .van-tabs__line {
    height: 0;
  }
  .van-tab--grow {
    padding: 0 15px;
  }
  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
}
.item {
  text-align: center;
  .icon {
    position: relative;
    margin: 7px auto 1px;
    height: 26px;
    width: 26px;
    img {
      width: 100%;
      height: 100%;
    }
    .num {
      position: absolute;
      left: 24px;
      top: -12px;
      font-size: 12px;
      font-weight: 700;
      color: var(--color-text-second-dark);
      @include numFrontFamily();
    }
  }
  h3 {
    font-size: 13px;
    line-height: 16px;
    margin-top: 4px;
  }
  &.active {
    h3 {
      color: var(--color-text-dark);
    }
  }
  &.opacity {
    opacity: 0.5;
  }
}
</style>
