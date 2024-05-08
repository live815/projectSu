<template>
  <div class="financialDetailsView">
    <NavBar :title="$t('Fletter.FundDetails')" />
    <div class="financialDetailsView-top">
      <CurrencyUnit /> {{ toFormatNumber(Number(routerInfo.amount)) }}
    </div>
    <div class="financialDetailsView-content">
      <div class="financialDetailsView-content-item">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.Status') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div
            class="financialDetailsView-content-item-right-title"
            style="color: #f53f3f"
            v-if="routerInfo.orderStatus == 0"
          >
            {{ $t('Fletter.Processing') }}
          </div>
          <div
            class="financialDetailsView-content-item-right-title"
            style="color: #00b42a"
            v-if="routerInfo.orderStatus == 1"
          >
            {{ $t('Fletter.Sucess') }}
          </div>
          <div
            class="financialDetailsView-content-item-right-title"
            style="color: #f53f3f"
            v-if="routerInfo.orderStatus == 2"
          >
            {{ $t('Fletter.Fail') }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.TransactType') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.orderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 1">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.RechargeMethod') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 2">
        <div class="financialDetailsView-content-item-left">
          {{ $t('Fletter.WithdrawalMethod') }}
        </div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 3">
        <div class="financialDetailsView-content-item-left">
          {{ $t('Fletter.Venue') }}
        </div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.gameLobby }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 3">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.Type') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 5">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.RebateType') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 6">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.EventName') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 7">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.AdjustReason') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 8">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.ConsumptType') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.subOrderTypeName }}
          </div>
        </div>
      </div>
      <div
        class="financialDetailsView-content-item"
        v-if="routerInfo.bizType == 1 || routerInfo.bizType == 2"
      >
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.ActualArrival') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{
              Number(routerInfo.actualAmt) > 0 ? toFormatNumber(Number(routerInfo.actualAmt)) : 0
            }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.TransactAmount') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ toFormatNumber(Number(routerInfo.amount)) }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item" v-if="routerInfo.bizType == 2">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.HandFee') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.wdFee }}
          </div>
        </div>
      </div>

      <div class="financialDetailsView-content-item">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.TransactHour') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.orderTime }}
          </div>
        </div>
      </div>
      <div class="financialDetailsView-content-item">
        <div class="financialDetailsView-content-item-left">{{ $t('Fletter.OrderNumber') }}</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.orderNo }}
          </div>
          <div v-clipboard="routerInfo.orderNo" class="copy-btn">
            {{ $t('Fletter.Copy') }}
          </div>
        </div>
      </div>
      <!-- <div class="financialDetailsView-content-item" v-if="routerInfo.remark">
        <div class="financialDetailsView-content-item-left">备注</div>
        <div class="financialDetailsView-content-item-right">
          <div class="financialDetailsView-content-item-right-title">
            {{ routerInfo.remark }}
          </div>
        </div>
      </div> -->
    </div>
    <div class="financialDetailsView-footer">
      <div
        class="financialDetailsView-footer-btn1"
        v-if="
          (routerInfo.bizType == 1 &&
            routerInfo.orderStatus == 0 &&
            rechargeStore.orderDataStatus.orderTimeout == 0) ||
          (routerInfo.bizType == 2 && routerInfo.orderStatus == 0)
        "
        @click="onClickOrder"
      >
        {{ $t('Fletter.GoView') }}
      </div>
      <div
        class="financialDetailsView-footer-btn2"
        v-if="routerInfo.orderStatus == 0 && routerInfo.bizType == 1"
        @click="onClickCancelOrder"
      >
        {{ $t('Fletter.CancelOrder') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import { useRoute, useRouter } from 'vue-router'
import vClipboard from '@/directives/clipboard.js'
import { getCancelOrder } from '@/api/recharge'
import { useRechargeStore } from '@/stores/recharge'
import { toFormatNumber } from '@/utils'
import i18n from '@/i18n'

const route = useRoute()
const router = useRouter()
const routerInfo = ref({})
routerInfo.value = route.query

const rechargeStore = useRechargeStore()
// 撤销订单
const onClickCancelOrder = () => {
  getCancelOrder({ orderNo: routerInfo.value.orderNo }).then(() => {
    router.push('/transaction-record')
  })
}

onMounted(() => {
  // 调用后端接口查询订单支付状态
  if (routerInfo.value.bizType == '1') {
    rechargeStore.getOrderStatus(routerInfo.value.orderNo)
  }
})

// 前往查看
const onClickOrder = () => {
  switch (routerInfo.value.bizType) {
    case '1':
      return router.push(`/deposit?orderNo=${routerInfo.value.orderNo}`)
    case '2':
      return router.push(`/withdraw?orderNo=${routerInfo.value.orderNo}`)
    case '3':
      return i18n.global.t('Fletter.Rebate')
    case '4':
      return i18n.global.t('Fletter.SystemAdjust')
    case '5':
      return i18n.global.t('Fletter.Dividend')
    case '6':
      return i18n.global.t('Fletter.LiveStream')
    case '7':
      return i18n.global.t('Fletter.Transfer')
  }
}
</script>
<style lang="scss" scoped>
.financialDetailsView {
  position: relative;

  .financialDetailsView-top {
    height: 92.5px;
    background: #fff;
    color: #111;
    font-family: DIN Alternate;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    line-height: 92.5px;
  }
  .financialDetailsView-content {
    width: 345px;
    margin: 10px auto 0;
    border-radius: 10px;
    background: #fff;
    padding: 15px;
    .financialDetailsView-content-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      font-size: 14px;
      font-weight: 400;
      .financialDetailsView-content-item-left {
        color: #666;
      }
      .financialDetailsView-content-item-right {
        display: flex;
        align-items: center;
        color: var(--gray-3, #333);
        .financialDetailsView-content-item-right-title {
          color: #111;
        }
        .copy-btn {
          margin-left: 4px;
          color: var(--unnamed, var(--unnamed, #486bb2));
        }
      }
    }
    .financialDetailsView-content-item:first-child {
      margin-top: 0;
    }
    .financialDetailsView-content-item:last-child {
      margin-bottom: 0;
    }
  }
  .financialDetailsView-footer {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    .financialDetailsView-footer-btn1 {
      width: 345px;
      height: 44px;
      color: #fff;
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      margin: 0 auto 20px;
      border-radius: 6px;
      background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
    }
    .financialDetailsView-footer-btn2 {
      width: 345px;
      height: 44px;
      color: var(--2, #ff5000);
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      margin: 0 auto;
      border-radius: 6px;
      border: 1px solid var(--2, #ff5000);
    }
  }
}
</style>
