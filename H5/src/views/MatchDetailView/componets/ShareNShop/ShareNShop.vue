<template>
  <div>
    <van-popup v-model:show="show" position="bottom" @close="checkList = []">
      <div class="top-box">
        <div class="heat">{{ $t('Mletter.Postorders') }}</div>
        <button @click="submit">{{ $t('Mletter.sure') }}</button>
      </div>
      <div v-if="loading" class="loading-box">
        <van-loading color="#ff5000" size="50" />
      </div>
      <template v-else>
        <template v-if="list.length">
          <div v-for="item in list" :key="item.id" class="odder-box">
            <ExhibitOrders
              :data="item"
              :id="item.id"
              :isPostOrders="true"
              :checkList="checkList"
              @check="check"
            />
          </div>
        </template>
        <template v-else>
          <NoData :text="$t('Mletter.mlettertip25')" />
        </template>
      </template>
    </van-popup>
  </div>
</template>

<script setup>
import NoData from '../NoData/NoData'
import { betRecord } from '@/api/fb'
import { useRoute } from 'vue-router'
import { useTencentIM } from '@/hooks/useTencentIM.js'
import eventBus from '@/utils/eventBus'
import { useUserStore } from '@/stores/user.js'
import { pushOrderSave } from '@/api/live'
import ExhibitOrders from '../ExhibitOrders/ExhibitOrders'

const user = useUserStore()
const route = useRoute()
const show = ref(false)
const list = ref([])
const loading = ref(true)
const checkList = ref([])

const check = (item, active, id, multipleOdds) => {
  Object.assign(item, { totalOdds: multipleOdds })
  // 筛选出最终要发送的订单
  if (active) {
    checkList.value.push(item)
  } else {
    checkList.value = checkList.value.filter((item) => item.id !== id)
  }
}
const showHide = () => {
  show.value = !show.value
  if (show.value) {
    init()
  }
}
defineExpose({ showHide })

const { sendMessage } = useTencentIM()

const submit = () => {
  if (!checkList.value.length) {
    showHide()
    return
  }
  for (let i = 0; i < checkList.value.length; i++) {
    send(checkList.value[i])
  }
  showHide()
}
const send = (item) => {
  const { role, vipLevel, id } = user.userInfo
  const cloudCustomData = JSON.stringify({ role, vipLevel, userId: id })
  const data = {
    type: 'customize',
    text: 'exhibit-Order',
    description: JSON.stringify(item),
    cloudCustomData
  }
  sendMessage(data).then((res) => {
    eventBus.emit('SendMessage', res)
    savePushorder(item)
  })
}

// 保存晒单信息接口
const savePushorder = (item) => {
  // 聊天室ID
  const groupID = route.query.liveID ? route.query.liveID : route.params.id
  const data = item.ops.map((bets) => {
    return {
      betAmount: item.sat,
      betOrderState: item.st,
      winAmount: item.lwa,
      betMarket: bets.li,
      betOdds: Number(bets.bo),
      betStyle: bets.ty,
      betOrderCode: item.id,
      chatRoomId: groupID,
      cusName: bets.te[1].na,
      gameId: bets.mid,
      gameTimestamp: bets.bt,
      leagueName: bets.ln,
      mainName: bets.te[0].na,
      marketId: bets.mrid,
      matchTeam: bets.mn,
      orderTitle: bets.mgn,
      pushModel: item.sert,
      pushType: route.query.liveID ? 2 : 3,
      pushUserId: user.userInfo.id,
      pushUserName: user.userInfo.userName,
      sportsType: bets.sid,
      betStyleName: bets.onm,
      pushModelDesc: item.bt,
      subSelectNum: item.sv,
      userRole: user.userInfo.role,
      userVipLevel: user.userInfo.vipLevel,
      totalOdds: item.totalOdds
    }
  })
  pushOrderSave(data)
}

const init = async () => {
  try {
    const [settledResponse, unsettledResponse] = await Promise.all([
      betRecord({
        isSettled: true,
        current: 1,
        size: 50
      }),
      betRecord({
        isSettled: false,
        current: 1,
        size: 50
      })
    ])
    // 合并已结算和未结算的订单
    const mergedList = [...settledResponse.records, ...unsettledResponse.records]

    const arr = []
    mergedList.forEach((match) => {
      // 筛选出ops里面包含本场比赛的单注数据
      const filteredOps = match.ops.filter((op) => op.mid == route.params.id)
      if (filteredOps.length > 0 && match.sert !== 1) {
        arr.push(match)
      }
    })
    list.value = arr
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-popup {
    height: 78%;
    border-radius: 20px 20px 0px 0px;
  }
  .van-icon-cross:before {
    color: #333;
  }
}
.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid #eee;
  .heat {
    color: #333;

    font-size: 16px;
    font-weight: 600;
    margin: 17px 0 23px 0;
  }
  button {
    padding: 6px;
    border-radius: 6px;
    background: var(--2, #ff5000);
    border: none;
    color: #fff;
  }
}
.odder-box {
  margin-top: 15px;
}

.close {
  width: 34px;
  height: 34px;
  position: absolute;
  right: 35px;
  top: 25px;
  z-index: 2005;
}
.closeTop {
  top: 225px;
}
.loading-box {
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
