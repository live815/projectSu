<template>
  <div class="game-bet">
    <div class="bet-records-header">
      <TimePicker @update:timeRange="updateTimeRange" />
      <GameStats
        :totalOrderAmount="totalOrderAmount"
        :totalOrderCount="totalOrderCount"
        :totalProfitAmount="totalProfitAmount"
        :totalValidFlow="totalValidFlow"
        style="margin-top: 15px"
      />
    </div>
    <GameList v-if="gameList.length" :gameList="gameList" @goDetail="goDetail" />
    <NoData :isHide="true" v-else />
    <DetailInfo :timeRange="timeRange" :currentGame="currentGame" v-model:showPopup="showPopup" />
  </div>
</template>

<script setup>
import GameStats from './GameStats.vue'
import GameList from './GameList.vue'
import DetailInfo from './DetailInfo.vue'
import NoData from '../NoData/NoData.vue'
import { ref } from 'vue'
import { getGameBetList } from '@/api/game'
import { showLoadingToast, closeToast } from 'vant'
import i18n from '@/i18n'

const timeRange = ref({
  startTime: '',
  endTime: ''
})
const totalOrderAmount = ref(0)
const totalOrderCount = ref(0)
const totalProfitAmount = ref(0)
const totalValidFlow = ref(0)

function updateTimeRange(val) {
  timeRange.value = val
}
const showPopup = ref(false)
const currentGame = ref({})
const gameList = ref([])

const goDetail = (item) => {
  currentGame.value = item
  showPopup.value = true
}
function fetchGameBetList(val) {
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  gameList.value = []
  getGameBetList(val)
    .then((res) => {
      const data = res.data
      gameList.value = data.myList
      totalOrderAmount.value = data.totalOrderAmount
      totalOrderCount.value = data.totalOrderCount
      totalProfitAmount.value = data.totalProfitAmount
      totalValidFlow.value = data.totalValidFlow
      closeToast()
    })
    .catch(() => {
      closeToast()
    })
}
watch(timeRange, (val) => {
  fetchGameBetList(val)
})
</script>

<style lang="scss" scoped>
.bet-records-header {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(255, 255, 255, 0.5) inset, 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  margin: 15px;
  padding: 15px;
}
</style>
