<template>
  <div class="record-view">
    <van-popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }">
      <NavBar
        :title="$t('Activity.LuckyWheel.LotteryRecords')"
        @onClickLeft="show = false"
        :isBack="false"
        :isShowRight="false"
      />
      <Table
        v-if="data.length"
        :tableData="tableData"
        height="40px"
        width="68px"
        :border="false"
        style="max-height: 90%; overflow-y: auto"
      />
      <NoResult v-else :noTxt="$t('Lletter.Nodata')" />
    </van-popup>
  </div>
</template>

<script setup>
import { getTurntableUserRecord } from '@/api/promotion.js'
import Table from '@/components/Table/Table'
import { useRoute } from 'vue-router'
import i18n from '@/i18n'
import { getToken } from '@/utils/cache'

const isLogin = getToken()
const route = useRoute()
const show = ref(false)
const data = ref([])
const showPopup = () => {
  show.value = true
}
defineExpose({ showPopup })
const init = () => {
  if (isLogin) {
    getTurntableUserRecord({ activityId: route.query.activityId }).then((res) => {
      data.value = res.data
    })
  }
}
init()
watchEffect(() => {
  if (show.value) {
    init()
  }
})
const tableData = computed(() => {
  const columns = [
    { id: 1, label: i18n.global.t('Activity.LuckyWheel.Number') },
    { id: 2, label: i18n.global.t('Activity.LuckyWheel.WinningTime') },
    { id: 3, label: i18n.global.t('Activity.LuckyWheel.PrizeWon') }
  ]

  const arr = data.value.map((item, index) => {
    return {
      index: index + 1,
      giftName: item.giftName,
      turntableTime: item.turntableTime
    }
  })
  return [{ columns, data: arr }]
})
</script>

<style scoped lang="scss">
.record-view {
  :deep() {
    .van-popup--right {
      @include mobile-padding();
      background: #fff;
    }
  }
  .table {
    margin-top: 20px;
  }
  .box {
    margin-top: 100px;
  }
}
</style>