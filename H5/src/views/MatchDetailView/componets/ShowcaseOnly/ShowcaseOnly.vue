<template>
  <div class="showcase-only">
    <van-popup v-model:show="showBottom" position="bottom" closeable>
      <div class="heat">{{ $t('Mletter.onlylookorder') }}</div>
      <div v-if="formattedData?.length" class="scroll-box">
        <ExhibitOrders v-for="item in formattedData" :key="item.id" :data="item" :showHead="true" />
      </div>
      <div v-else class="no-data">
        <NoData :text="$t('Mletter.mlettertip25')" />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import ExhibitOrders from '../ExhibitOrders/ExhibitOrders'
import NoData from '../NoData/NoData'
import { useRoute } from 'vue-router'
import { getPushOrderList } from '@/api/live'

const showBottom = ref(false)
const route = useRoute()
const list = ref([])
const chatRoomId = route.query.liveID ? route.query.liveID : route.params.id

const showHide = () => {
  showBottom.value = !showBottom.value
  if (showBottom.value) {
    init()
  }
}

const formattedData = computed(() => {
  const arr = list.value.map((item) => {
    const group = item.orderGroupList
    const opsArray = group.map((item) => {
      return {
        id: item.id,
        ln: item.leagueName,
        bt: item.gameTime,
        mn: item.matchTeam,
        mgn: item.orderTitle,
        onm: item.betStyleName,
        mrid: item.marketId,
        mid: item.gameId,
        ty: item.betStyle,
        od: item.betOdds
      }
    })
    return {
      st: group[0].betOrderState,
      sat: group[0].betAmount,
      mwa: group[0].winAmount,
      bt: group[0].pushModelDesc,
      sv: group[0].subSelectNum,
      ops: opsArray,
      createTime: group[0].createTime,
      pushUserName: group[0].pushUserName,
      userRole: group[0].userRole,
      vipLevel: group[0].userVipLevel,
      totalOdds: group[0].totalOdds,
      sert: group[0].pushModel,
      betOrderCode: item.betOrderCode,
      pushOrderId: group[0].id,
      chatRoomId
    }
  })
  return arr
})

const init = () => {
  getPushOrderList({
    chatRoomId
  }).then((res) => {
    if (res.code === 200 && res.data) {
      list.value = Object.values(res.data) // 转化成数组格式
    }
  })
}

defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.showcase-only {
  :deep() {
    .van-popup {
      height: 570px;
      border-radius: 20px 20px 0px 0px;
    }
    .van-icon-cross:before {
      color: #333;
    }
  }
  .heat {
    color: #333;
    text-align: center;

    font-size: 16px;
    font-weight: 600;
    margin: 17px 0 23px 0;
  }
  .scroll-box {
    @include mobile-padding();
    height: 514px;
    overflow: auto;
    padding-bottom: 10px;
  }
  .no-data {
    width: 200px;
    margin: 150px auto;
    .nodata-img {
      width: 200px;
      height: 125px;
    }
    p {
      color: #999;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
    }
  }
}
</style>
