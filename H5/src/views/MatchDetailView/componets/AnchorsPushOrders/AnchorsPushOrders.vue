<template>
  <div class="anchors-orders-view">
    <van-popup v-model:show="showBottom" position="bottom" closeable>
      <div class="heat">{{ $t('Mletter.Anchorpushorder') }}</div>
      <div class="content">
        <div v-for="item in liveStore.anchorsPushOrders" :key="item.id" class="order-box">
          <div class="left">
            <p class="game-type">{{ item.orderTitle }}</p>
            <div class="odds-box">
              <p class="number">{{ item.betMarket }}</p>
              <p>{{ item.betOdds }}</p>
            </div>
          </div>
          <button @click="handleBet(item)">{{ $t('Mletter.followorders') }}</button>
        </div>
      </div>
    </van-popup>
    <FollowOrder ref="followerDom" :OrderData="OrderData" from="anchorsOrders" />
  </div>
</template>

<script setup>
import FollowOrder from '../FollowOrder/FollowOrder.vue'
import { useLiveList } from '@/stores/live'

const liveStore = useLiveList()
const showBottom = ref(false)
const followerDom = ref(null)
const OrderData = ref()

const showHide = () => {
  showBottom.value = !showBottom.value
}
defineExpose({ showHide })

const handleBet = (item) => {
  const obj = {
    ty: item.betStyle,
    mrid: item.marketId,
    mid: item.gameId,
    mgn: item.orderTitle,
    ln: item.leagueName,
    mn: item.matchTeam
  }
  const data = {
    ops: [obj],
    bt: '',
    sv: '',
    pushOrderId: item.id
  }
  OrderData.value = data
  showHide()
  followerDom.value.showHide()
}
</script>

<style lang="scss" scoped>
.anchors-orders-view {
  :deep() {
    .van-popup {
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
    margin: 17px 0 15px 0;
  }
  .content {
    height: 435px;
    overflow: auto;
    .order-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      width: 343px;
      height: 72px;
      border-radius: 12px;
      background: #f7f7f7;
      margin: 8px auto;
      .left {
        .game-type {
          color: #202020;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .odds-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 134px;
          height: 24px;
          border-radius: 6px;
          border: 0.5px solid var(--2, #ff5000);
          background: var(--4, #fff5f0);
          font-family: DIN Alternate;
          color: #222;
          font-size: 13px;
          font-weight: 700;
          line-height: 24px;
          padding: 0 4px;
          .number {
            font-weight: 400;
            color: var(--2, #ff5000);
          }
        }
      }
      button {
        width: 60px;
        height: 32px;
        border-radius: 8px;
        background: linear-gradient(90deg, #ff9000 16%, #ff5000 87.23%);
        border: none;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>
