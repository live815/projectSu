<template>
  <div>
    <div class="item-box">
      <p class="order-number">{{ $t('Wletter.ordernumber') }} {{ itemInfo.number }}</p>
      <StateIcon :stateCode="itemInfo.status" />

      <div :class="itemInfo.status == 3 ? 'expired ticket' : 'ticket'">
        <div class="left-box">
          <TicketMask :itemInfo="itemInfo" />
        </div>
        <div class="right-box">
          <div class="text-warp">
            <div class="text-box">
              <span class="title">{{ itemInfo.activityTitle }}</span>
            </div>
            <!-- <div class="fill" v-if="itemInfo.expireTime == null"></div> -->
            <div class="text-box">
              <span class="grey">{{ $t('Wletter.award') }}</span>
              <span class="orange"
                ><CurrencyUnit />{{
                  itemInfo.amount ? toFormatNumber(Number(itemInfo.amount)) : ' '
                }}</span
              >
            </div>
            <div class="fill" v-if="itemInfo.expireTime == null"></div>
            <div class="text-box">
              <span class="grey"
                >{{ $t('Wletter.Prizesource') }}
                {{
                  itemInfo.sendType == 1 ? $t('Wletter.Systemissued') : $t('Wletter.Manualrelease')
                }}
              </span>
            </div>
            <!-- 优惠券发放时间 -->
            <div class="text-box" v-if="itemInfo.sendTime">
              <span class="grey">{{ $t('Wletter.sendTime') }}{{ itemInfo.sendTime }}</span>
            </div>
            <!-- 优惠券领取时间 -->
            <div class="text-box" v-if="itemInfo.receiveTime" v-show="itemInfo.status == 2">
              <span class="grey">{{ $t('Wletter.receiveTime') }}{{ itemInfo.receiveTime }}</span>
            </div>
            <!-- 优惠券截止时间 -->
            <div class="text-box" v-if="itemInfo.expireTime != null && itemInfo.status == 1">
              <span v-if="itemInfo.expireTime != null" class="grey"
                >{{ $t('Wletter.deadline') }}{{ itemInfo.expireTime }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="btn" v-show="isShow">
        <VButton @click="handleReceiveWelfare"> {{ $t('Wletter.receive') }} </VButton>
      </div>
      <!-- <div v-if="itemInfo.state === '待领取'">
        <ShippingPage v-model:ShowShipping="ShowShipping"></ShippingPage>
        <EmptyShippingAddress
          v-model:showEmptyPage="showEmptyPage"
          v-model:changeToAdd="changeToAdd"
        >
        </EmptyShippingAddress>
        <AddShippingAddress v-model:showAddPage="showAddPage"></AddShippingAddress>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import StateIcon from './StateIconComp.vue'
import ShippingPage from './ShippingPageComp.vue'
import EmptyShippingAddress from './EmptyShippingAddressComp.vue'
import AddShippingAddress from './AddShippingAddressComp.vue'
import TicketMask from './TicketMaskComp.vue'
import { toFormatNumber } from '@/utils'

const props = defineProps(['itemInfo'])
const shippingState = ref(true) //代表有没有地址
const ShowShipping = ref(false) //选择收货地址开关
const showEmptyPage = ref(false) //空收货地址开关
const showAddPage = ref(false) //添加收货地址开关
const emit = defineEmits(['receiveWelfare'])
const handleReceiveWelfare = () => {
  emit('receiveWelfare', props.itemInfo)
}

// 接收添加地址组件传回的数据
function changeToAdd() {
  showEmptyPage.value = false
  showAddPage.value = true
}
// 判断是否显示按钮

const isShow = computed(() => {
  return props.itemInfo.status == 1 && props.itemInfo.type != 1
})
</script>

<style lang="scss" scoped>
.fill {
  height: 5px;
}
.expired {
  opacity: 0.2;
}
.item-box {
  padding-top: 6px;
  padding-bottom: 1px;
  position: relative;
  margin: 15px 15px 0 15px;
  width: 345px;
  // height: 234px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;

  .btn {
    margin: 15px 15px 15px 15px;
  }

  .order-number {
    position: relative;
    margin: 6px 0px 0px 15px;
    color: #999;

    font-size: 12px;
    font-style: normal;

    /* 233.333% */
  }

  .ticket {
    display: flex;
    overflow: hidden;
    width: 315px;
    height: 120px;
    margin: 12px 15px 15px 15px;
    border-radius: 10px;
    background-image: url(../img/Subtract.png);

    .left-box {
      position: relative;
      width: 75px;
      height: 120px;
    }
    .right-box {
      flex-grow: 1;
      .text-warp {
        margin: 5px 0 0 18px;
        .text-box {
          margin-bottom: 6px;
          .title {
            color: #111;

            font-size: 14px;
            font-style: normal;
            font-weight: 400;
          }
          .grey {
            color: #999;

            font-size: 12px;
            font-style: normal;
            font-weight: 400;
          }
          .orange {
            color: var(--1, #f53f3f);

            font-size: 12px;
            font-style: normal;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
