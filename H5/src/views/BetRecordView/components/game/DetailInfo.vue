<template>
  <div class="detail-info">
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ width: '100%', height: '100%', background: '#F7F7F7' }"
    >
      <NavBar :isBack="false" @onClickLeft="closePopup">
        <span class="nav-title">{{ currentGame.lobbyName }}</span>
      </NavBar>
      <div class="sts-wrapper">
        <GameStats
          :totalOrderAmount="currentGame.orderAmount"
          :totalOrderCount="currentGame.orderCount"
          :totalProfitAmount="currentGame.profitAmount"
          :totalValidFlow="currentGame.validBet"
        />
      </div>
      <GameTab
        :unsettledTotal="unsettledTotal"
        :settledTotal="settledTotal"
        v-model:currentIndex="currentIndex"
      />
      <div class="bet-record-list-wrapper" v-if="betList.length">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="$t('BetrecordView.Nomore')"
          @load="onLoad"
        >
          <BetListContent :betList="betList" />
        </van-list>
      </div>
      <NoData :isHide="true" v-else />
    </van-popup>
  </div>
</template>

<script setup>
import GameStats from './GameStats.vue'
import GameTab from './GameTab.vue'
import BetListContent from './BetListContent.vue'
import NoData from '../NoData/NoData.vue'
import { ref, computed } from 'vue'
import { getGameBetDetail } from '@/api/game'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'

const props = defineProps({
  showPopup: {
    type: Boolean
  },
  currentGame: {
    type: Object,
    default: () => ({})
  },
  timeRange: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['update:showPopup'])
const show = computed({
  get() {
    return props.showPopup
  },
  set(value) {
    emit('update:showPopup', value)
  }
})

const currentIndex = ref(0)
const unsettledTotal = ref(0)
const settledTotal = ref(0)

const betList = ref([])
let page = 1
const size = 100
const loading = ref(false)
const finished = ref(false)
async function onLoad() {
  page++
  const noLoading = true
  const { list, total } = await fetchGameBetDetail(currentIndex.value, noLoading)
  loading.value = false
  betList.value.push(...list)
  if (betList.value.length >= total) {
    finished.value = true
  }
}
const closePopup = () => {
  show.value = false
}
function fetchGameBetDetail(settleFlag, noLoading) {
  if (!noLoading) {
    showLoadingToast({
      message: i18n.global.t('common.loading'),
      forbidClick: true,
      duration: 0
    })
  }
  const { startTime, endTime } = props.timeRange
  return getGameBetDetail({
    startTime,
    endTime,
    lobbyCode: props.currentGame.lobbyCode,
    settleFlag,
    pager: {
      current: page,
      size
    }
  })
    .then((res) => {
      closeToast()
      const total = res.data.total
      const list = res.data.records || []
      if (settleFlag) {
        settledTotal.value = total
      } else {
        unsettledTotal.value = total
      }
      return { list, total }
    })
    .catch(() => {
      closeToast()
    })
}
watch(show, async (val) => {
  if (val) {
    // 重置
    settledTotal.value = 0
    unsettledTotal.value = 0
    currentIndex.value = 0
    // 未结算
    const { list, total } = await fetchGameBetDetail(0)
    betList.value = list
    if (list.length >= total) {
      finished.value = true
    }
    // 已结算
    await fetchGameBetDetail(1)
  }
})
watch(currentIndex, async (val) => {
  // 重置页码
  page = 1
  const { list, total } = await fetchGameBetDetail(val)
  betList.value = list
  if (list.length >= total) {
    finished.value = true
  } else {
    finished.value = false
  }
})
</script>

<style lang="scss" scoped>
.detail-info {
  background: #f7f7f7;
  .sts-wrapper {
    padding: 15px;
  }
  .nav-title {
    color: #333;
    font-size: 16px;
    line-height: 28px;
    font-weight: 400;
  }
  .bet-record-list-wrapper {
    margin-top: 15px;
    // border:1px solid red;
    height: calc(var(--app-height) - 200px);
    overflow: auto;
  }
}
</style>
