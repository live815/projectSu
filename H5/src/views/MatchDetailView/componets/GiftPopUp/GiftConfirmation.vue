<template>
  <div class="giftConfirmation-view">
    <van-popup v-model:show="showBottom" position="bottom">
      <div class="heat">{{ $t('Mletter.mlettertip22') }}</div>
      <div class="content">
        <img width="60" height="60" :src="getImg(props.gift.giftSmallImage)" />
        <div style="margin: 10px 0 25px 0">
          <span class="name">{{ props.gift.giftName }}</span>
          <span class="number">x {{ props.gift.giftNum }}</span>
        </div>
        <van-checkbox v-model="checked" icon-size="16px">{{
          $t('Mletter.mlettertip23')
        }}</van-checkbox>
      </div>
      <div class="bottom-button">
        <button class="cancel" @click="showHide">{{ $t('Mletter.cancel') }}</button>
        <button class="confirm" @click="confirm">{{ $t('Mletter.sure') }}</button>
      </div>
    </van-popup>
  </div>
  <!-- 余额不足弹窗 -->
  <InsufficientFunds ref="InsufficientFundsDom" />
</template>

<script setup>
import { useTencentIM } from '@/hooks/useTencentIM.js'
import eventBus from '@/utils/eventBus'
import { getImg } from '@/utils'
import { giveGifts } from '@/api/chatroom.js'
import { useUserStore } from '@/stores/user.js'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import InsufficientFunds from './InsufficientFunds'

const route = useRoute()
const user = useUserStore()
const { sendMessage } = useTencentIM()
const showBottom = ref(false)
const checked = ref(false)
const InsufficientFundsDom = ref(null)
const props = defineProps(['gift', 'giftTotalAmount'])

const confirm = () => {
  if (Number(user.balance) < props.giftTotalAmount) {
    const amount = props.giftTotalAmount - Number(user.balance)
    showHide()
    InsufficientFundsDom.value.showHide(amount)
    return
  }
  const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const params = {
    giftId: props.gift.id,
    giftNum: props.gift.giftNum,
    giftTotalAmount: props.giftTotalAmount,
    giveToTime: formattedDate,
    memberId: user.userInfo.id,
    memberName: user.userInfo.userName,
    paymentTime: formattedDate,
    presenterId: Number(route.query.anchorId),
    presenterName: route.query.presenterName,
    liveStreamId: route.query.liveID
  }

  // 构造消息数据，发送自定义消息到腾讯IM
  const data = {
    type: 'customize',
    text: 'gift',
    description: JSON.stringify(props.gift)
  }
  giveGifts(params).then((res) => {
    if (res.code === 200) {
      sendMessage(data).then((res) => {
        eventBus.emit('SendMessage', res)

        // 发送弹幕
        const data = JSON.parse(res.data.message.payload.description)
        const param = {
          description: data,
          name: res.data.message.from
        }
        eventBus.emit('SendBarrages', param)
      })
    }
  })

  localStorage.setItem('giftConfirmation', checked.value)
  showHide()
}
const showHide = () => {
  showBottom.value = !showBottom.value
}
defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.giftConfirmation-view {
  :deep() {
    .van-popup {
      @include mobile-padding();
      height: 284px !important;
    }
    .van-icon-cross:before {
      color: #333;
    }
  }
  .heat {
    color: var(--gray-1, #111);
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin: 17px 0 27px 0;
  }
  .content {
    text-align: center;
    .van-checkbox {
      justify-content: center;
    }
    .name {
      color: #333;
      font-size: 12px;
      font-weight: 600;
    }
    .number {
      color: var(--1, #f53f3f);
      font-size: 13px;
      font-weight: 700;
    }
  }
  .bottom-button {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    button {
      width: 164px;
      height: 40px;
      border-radius: 6px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      border: none;
    }
    .cancel {
      background: var(--gray-f-569, #f5f6f9);
      color: var(--gray-3, #333);
    }
    .confirm {
      border-radius: 6px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      color: #fff;
    }
  }
}
</style>
