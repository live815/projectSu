<template>
  <div class="giftPopUp-view">
    <van-popup v-model:show="showBottom" position="bottom" closeable>
      <div class="balance">
        <span>{{ $t('Mletter.balance') }}</span> <span class="number">{{ user.balance }}</span>
      </div>
      <van-swipe
        class="my-swipe"
        indicator-color="red"
        :show-indicators="false"
        @change="nextSwipe"
      >
        <van-swipe-item v-for="item in dividedArray" :key="item.id">
          <div class="gift-box">
            <div
              v-for="items in item.child"
              :key="items.id"
              class="gift-card"
              :class="{
                'gift-card-active': bgColor === items.id
              }"
              @click="chooseGift(items)"
            >
              <img width="50" height="50" :src="getImg(items.giftSmallImage)" />
              <div class="gift-name">{{ items.giftName }}</div>
              <div class="number"><CurrencyUnit />{{ items.payAmount }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div v-if="props.giftList > 8" class="progress-bar">
        <div
          v-for="(item, index) in dividedArray"
          :key="item"
          class="line"
          :class="{ indicator: indicator === index }"
        ></div>
      </div>
      <div class="bottom">
        <div class="stepper">
          <button class="stepper-button" :disabled="count === 1" @click="decrement">
            <van-icon name="minus" />
          </button>
          <div class="stepper-value">{{ count }}</div>
          <button class="stepper-button" @click="increment"><van-icon name="plus" /></button>
        </div>
        <div class="total">
          <span class="text">{{ $t('Mletter.total') }}</span>
          <span class="number"><CurrencyUnit />{{ total }}</span>
        </div>
        <button class="deliver" @click="deliver">{{ $t('Mletter.send') }}</button>
      </div>
    </van-popup>
    <!-- 礼物确认弹窗 -->
    <GiftConfirmation ref="giftConfirmationDom" :gift="gift" :giftTotalAmount="total" />
  </div>
</template>

<script setup>
import GiftConfirmation from './GiftConfirmation'
import { getImg } from '@/utils'
import { useTencentIM } from '@/hooks/useTencentIM.js'
import eventBus from '@/utils/eventBus'
import { useUserStore } from '@/stores/user.js'
import { giveGifts } from '@/api/chatroom.js'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const user = useUserStore()
const showBottom = ref(false)
const count = ref(1)
const indicator = ref(0)
const bgColor = ref()
const giftConfirmationDom = ref(null)
const gift = ref()
const total = ref(0)
const { sendMessage } = useTencentIM()

const props = defineProps(['giftList'])

// 将原始数组按照每8个元素分割成子数组
const dividedArray = computed(() => {
  const groupedArr = []
  for (let i = 0; i < props.giftList.length; i += 8) {
    const group = {
      id: i / 8,
      child: props.giftList.slice(i, i + 8)
    }
    groupedArr.push(group)
  }
  return groupedArr
})

const chooseGift = (item) => {
  gift.value = item
  bgColor.value = item.id
  total.value = item.payAmount
}
const increment = () => {
  if (gift.value && count.value < 99) {
    count.value++
    total.value = count.value * gift.value.payAmount
  }
}
const decrement = () => {
  if (count.value > 1) {
    count.value--
    total.value = count.value * gift.value.payAmount
  }
}
const nextSwipe = (a) => {
  indicator.value = a
}
const showHide = () => {
  if (!showBottom.value) {
    user.getBalanceAction()
  }
  showBottom.value = !showBottom.value
}
const deliver = () => {
  gift.value.avatar = user.userInfo.avatar // 添加用户头像PC端需要用到
  gift.value.giftNum = count.value // 添加礼物数量
  gift.value.vip = user.userInfo.vipLevel
  // 是否本次登录不再提示
  if (localStorage.getItem('giftConfirmation') === 'true') {
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const params = {
      giftId: gift.value.id,
      giftNum: gift.value.giftNum,
      giftTotalAmount: total.value,
      giveToTime: formattedDate,
      memberId: user.userInfo.id,
      memberName: user.userInfo.userName,
      paymentTime: formattedDate,
      presenterId: Number(route.query.anchorId),
      presenterName: route.query.presenterName,
      liveStreamId: route.query.liveID
    }
    giveGifts(params).then((res) => {
      if (res.code === 200) {
        const data = {
          type: 'customize',
          text: 'gift',
          description: JSON.stringify(gift.value)
        }
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
    showHide()
  } else {
    giftConfirmationDom.value.showHide()
    showHide()
  }
}
defineExpose({ showHide })
</script>

<style lang="scss" scoped>
.giftPopUp-view {
  :deep() {
    .van-popup {
      height: 360px;
      border-radius: 20px 20px 0px 0px;
    }
    .van-icon-cross:before {
      color: #333;
    }
  }
  .balance {
    color: #333;
    font-size: 13px;
    font-weight: 600;
    margin: 20px 16px;
    .number {
      color: #eba417;
      font-weight: 700;
    }
  }
  .my-swipe {
    .gift-box {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 33px;
      padding: 0 22px;
      .gift-card {
        width: 64px;
        min-height: 100px;
        padding-top: 10px;
        border-radius: 10px;
        text-align: center;
        flex: 0 1 calc(25% - 25px);
        .gift-name {
          color: #333;
          font-size: 12px;
          font-weight: 600;
          margin: 5px 0;
        }
        .number {
          color: #999;
          font-size: 8px;
        }
      }
      .gift-card-active {
        background: linear-gradient(
          178deg,
          rgba(255, 144, 0, 0.1) 2.11%,
          rgba(255, 80, 0, 0.1) 97.95%
        );
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    margin-top: 12px;
    .stepper {
      display: flex;
      align-items: center;
      width: 80px;
      height: 28px;
      border-radius: 6px;
      border: 0.5px solid var(--fill-3, #bbb);
      .stepper-button {
        flex: 1;
        width: 16px;
        height: 16px;
        background-color: transparent;
        border: none;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
      }
      .stepper-button:disabled {
        color: #ccc;
        cursor: not-allowed;
      }
      .stepper-value {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #333;
        font-weight: 700;
      }
    }
    .total {
      margin-right: auto;
      line-height: 26px;
      margin-left: 12px;
      .text {
        color: #999;
        font-size: 12px;
      }
      .number {
        color: #333;
        font-size: 12px;
        font-weight: 700;
      }
    }
    .deliver {
      width: 72px;
      height: 32px;
      border-radius: 6px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
      border: none;
      color: #fff;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .progress-bar {
    display: flex;
    justify-content: center;
    border-radius: 50px;
    margin-top: 12px;
    .line {
      background: #fff5f0;
      width: 20px;
      height: 2px;
    }
    .indicator {
      background: #ff5000;
    }
  }
}
</style>
