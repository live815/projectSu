<template>
  <div class="outter-box">
    <div class="main-container WelfareCenter">
      <div class="filter-bar">
        <Selector
          :label="$t('GeneralUserCenter.Type')"
          :data="welfareTypeData"
          :selectedValue="welfareType"
          :width="200"
          @updateSelectedValue="updateWelfareTypeValue"
        ></Selector>
        <Selector
          :label="$t('GeneralUserCenter.State')"
          :data="welfareStateData"
          :selectedValue="welfareState"
          :width="200"
          @updateSelectedValue="updateWelfareStateValue"
        ></Selector>
        <TimePicker :timeData="timeData" @updateTimeData="updateTimeData"></TimePicker>
        <div class="btn non-color" @click="resetFilter">{{ $t('GeneralUserCenter.Reset') }}</div>
        <div class="btn color" @click="toFilte">{{ $t('GeneralUserCenter.Inquire') }}</div>
      </div>
      <div class="amount-bar" v-show="welfareType == 1">
        <div class="white-text">
          {{ $t('GeneralUserCenter.ToBeCollected') }}：<span
            ><CurrencyUnit />{{ unaccalimed }}</span
          >
        </div>
        <div class="white-text">
          {{ $t('GeneralUserCenter.AccumulatedCollection') }}：<CurrencyUnit />{{ totalAmount }}
        </div>
      </div>
      <div
        class="ticket-container"
        v-for="(item, index) in welfareListData"
        :key="index"
        :class="{ expired: item.status == 3 }"
        v-show="welfareListData.length != 0"
      >
        <div class="ticket-code-bar">
          {{ $t('GeneralUserCenter.OrderNumber') }}：{{ item.number }}
          <!-- <span class="state" :class="{ 'disable-text': !item.state }">待领取</span> -->
        </div>
        <div class="ticket-content">
          <div
            class="img-container"
            :class="{
              yellow: item.type == 1,
              orange: item.type == 2,
              blue: item.type == 3,
              purple: item.type == 4,
              dark: item.type == 5
            }"
          >
            {{ voucherType(item.type) }}
          </div>
          <div class="describe-container">
            <div class="title">
              {{ item.activityTitle }}
            </div>
            <div class="description small-text">
              {{ $t('GeneralUserCenter.PrizeSource') }}：{{
                item.sendType == 1
                  ? $t('GeneralUserCenter.SystemIssued')
                  : $t('GeneralUserCenter.ManualRelease')
              }}<br />
              {{ $t('GeneralUserCenter.Award') }}：<span class="red-text">
                <CurrencyUnit />{{ item.amount ? toFormatNumber(Number(item.amount)) : '' }}</span
              >
            </div>
          </div>
          <div class="btn-container" v-if="(item.type == 1 && item.status != 1) || item.type != 1">
            <div
              class="btn"
              :class="{ 'disable-btn': item.status !== 1 }"
              @click="showDialog(item)"
            >
              {{ collectionStatus(item.status) }}
            </div>
            <!-- 优惠券发放时间 -->
            <div class="sendTime small-text" v-if="item.sendTime">
              {{ $t('GeneralUserCenter.sendTime') }}： {{ item.sendTime }}
            </div>
            <!-- 领取时间 -->
            <div class="receiveTime small-text" v-if="item.receiveTime && item.status == 2">
              {{ $t('GeneralUserCenter.receiveTime') }}： {{ item.receiveTime }}
            </div>
            <!-- 优惠券截止时间 -->
            <div class="expire small-text" v-if="item.expireTime != null && item.status == 1">
              {{ $t('GeneralUserCenter.Deadline') }}： {{ item.expireTime }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="empty-container" v-show="welfareListData.length == 0">
        <img src="../img/empty-icon.png" width="237" height="180" />
        <span>{{$t('GeneralUserCenter.NoData')}}</span>
      </div> -->
      <NoList v-if="welfareListData.length == 0" />
    </div>

    <CustomizeDialog
      :dialogShow="isShowDialog.shippingLog"
      :width="490"
      :title="$t('GeneralUserCenter.MyShippingAddress')"
      v-if="isShowDialog.shippingLog"
      @closeBtn="closeBtn"
      :alignCenter="true"
    >
      <div style="height: 305px">
        <MyAddress />
      </div>
    </CustomizeDialog>

    <!-- <CustomizeDialog
      :dialogShow="isShowDialog.editLog"
      :width="490"
      :title="$t('GeneralUserCenter.EditShippingAddress')"
      v-if="isShowDialog.editLog"
      @closeBtn="closeBtn"
    >
      <EditAddress></EditAddress>
    </CustomizeDialog> -->
  </div>
</template>

<script setup>
import i18n from '@/i18n'
// import EditAddress from './ShippingPage/EditAddress.vue'
import MyAddress from './ShippingPage/MyAddress.vue'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'
import Selector from '@/components/Selector/Selector.vue'
import { getWelfareListApi, receiveWelfareApi, getWelfareStatisticApi } from '@/api/welfare'
import { toFormatNumber } from '@/utils'
import NoList from '@/components/NoList/NoList.vue'
const welfareType = ref(0)
const welfareState = ref(0)
const timeData = ref([])
const totalAmount = ref(0)
const unaccalimed = ref(0)
const welfareListData = ref([])
// const hasAddress = ref(false)
const isShowDialog = ref({
  shippingLog: false,
  editLog: false
})
// 初始化请求
const loading = ref(true)
const formData = ref({
  pageNum: 1,
  pageSize: 30,
  sendTimeEnd: '',
  sendTimeStart: '',
  status: '',
  type: ''
})

onMounted(() => {
  getWelfareList()
})

// 获取数据
// const rowList = ref([])
const getWelfareList = () => {
  getWelfareListApi(formData.value)
    .then((res) => {
      if (res.data) {
        welfareListData.value = res.data.records
        //累计领取
        if (welfareType.value == 1) {
          getWelfareStatisticApi(1).then((res) => {
            if (res.code === 200) {
              totalAmount.value = res.data[0].total
            }
          })
        }
      } else {
        welfareListData.value = []
        totalAmount.value = '0.00'
        unaccalimed.value = '0.00'
      }
      loading.value = false
    })
    .catch((rej) => {
      console.log(rej)
    })
}

function showDialog(item) {
  if (item.status == 1) {
    if (item.type == 5) {
      // 打开收货地址
      console.log(666)
      isShowDialog.value.shippingLog = true
    } else {
      getWelfareList()
      receiveWelfareApi(item.id).then((res) => {
        if (res.code == 200) {
          getWelfareList()
          ElMessage.success(i18n.global.t('GeneralUserCenter.Notice_13'))
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  }
}

const closeBtn = () => {
  for (const key in isShowDialog.value) {
    isShowDialog.value[key] = false
  }
}
// 查询按钮
function toFilte() {
  getWelfareList()
}

const welfareTypeData = ref([
  {
    label: i18n.global.t('GeneralUserCenter.All'),
    value: 0
  },
  {
    label: i18n.global.t('GeneralUserCenter.CashCoupons'),
    value: 2
  },
  {
    label: i18n.global.t('GeneralUserCenter.PhysicalObject'),
    value: 5
  },
  {
    label: i18n.global.t('GeneralUserCenter.DepositCoupons'),
    value: 3
  },
  {
    label: i18n.global.t('GeneralUserCenter.TurnoverCoupons'),
    value: 4
  },
  {
    label: i18n.global.t('GeneralUserCenter.Cash'),
    value: 1
  }
])
const welfareStateData = ref([
  {
    label: i18n.global.t('GeneralUserCenter.All'),
    value: 0
  },
  {
    label: i18n.global.t('GeneralUserCenter.ToBeCollected'),
    value: 1
  },
  {
    label: i18n.global.t('GeneralUserCenter.Received'),
    value: 2
  },
  {
    label: i18n.global.t('GeneralUserCenter.Expired'),
    value: 3
  }
])
//重置
function resetFilter() {
  welfareType.value = 0
  welfareState.value = 0
  timeData.value = []
  formData.value = {
    pageNum: 1,
    pageSize: 30,
    sendTimeEnd: '',
    sendTimeStart: '',
    status: '',
    type: ''
  }
  toFilte()
}
// 类型
function updateWelfareTypeValue(val) {
  welfareType.value = val
  if (val == 0) {
    formData.value.type = ''
    formData.value.status = ''
  } else {
    formData.value.type = val
  }

  getWelfareList()
}
// 状态
function updateWelfareStateValue(val) {
  welfareState.value = val
  if (val == 0) {
    formData.value.status = ''
    formData.value.type = ''
  } else {
    formData.value.status = val
  }
  getWelfareList()
}
// 时间
function updateTimeData(n) {
  if (n.length == 0) {
    timeData.value = n
    formData.value.sendTimeStart = ''
    formData.value.sendTimeEnd = ''
  } else {
    timeData.value = n
    formData.value.sendTimeStart = getFormatDate(timeData.value[0])
    formData.value.sendTimeEnd = getFormatDate(timeData.value[1])
  }
}
// 转换时间格式
function getFormatDate(val) {
  const date = new Date(val)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
// function goEdit() {
//   closeBtn()
//   isShowDialog.value.editLog = true
// }
//领取状态
function collectionStatus(val) {
  switch (val) {
    case 1:
      return i18n.global.t('GeneralUserCenter.Unaccalimed')
    case 2:
      return i18n.global.t('GeneralUserCenter.Received')
    case 3:
      return i18n.global.t('GeneralUserCenter.Expired')
    case 4:
      return i18n.global.t('GeneralUserCenter.Used')
  }
}
// 券类型
function voucherType(val) {
  switch (val) {
    case 1:
      return i18n.global.t('GeneralUserCenter.Cash')
    case 2:
      return i18n.global.t('GeneralUserCenter.CashCoupons')
    case 3:
      return i18n.global.t('GeneralUserCenter.DepositCoupons')
    case 4:
      return i18n.global.t('GeneralUserCenter.TurnoverCoupons')
    case 5:
      return i18n.global.t('GeneralUserCenter.PhysicalObject')
  }
}

// 领取福利
// const receiveWelfare = (item) => {
//   receiveWelfareApi(item.id).then((res) => {
//     getWelfareList()
//   })
// }
</script>

<style lang="scss" scoped>
.outter-box {
  min-width: 1320px;
  max-width: 1320px;
  margin-top: 4px;
  padding-bottom: 35px;
  .small-text {
    color: var(--60, rgba(255, 255, 255, 0.6));

    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
  .red-text {
    color: var(--unnamed, #e93d3d);
  }
  .expired {
    opacity: 0.4;
  }
  .disable-btn {
    cursor: not-allowed;
    background: var(--20, rgba(255, 255, 255, 0.2)) !important;
  }
  .disable-text {
    color: var(--60, rgba(255, 255, 255, 0.6)) !important;
  }
}
.WelfareCenter {
  padding: 30px 40px 14px 40px;
  border-radius: 8px;
  background: #272b45;
  min-height: 500px;
  .filter-bar {
    display: flex;
    gap: 16px;
    height: 40px;
    margin-bottom: 30px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 88px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid var(--unnamed, #f35f1b);
      cursor: pointer;
    }
    .non-color {
      margin-left: auto;
      color: var(--2, #ff5000);
      text-align: center;

      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }
    .color {
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff;
      text-align: center;

      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }
  }
  .amount-bar {
    display: flex;
    gap: 30px;
    height: 44px;
    padding: 14px 0 0 46px;
    margin-bottom: 30px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    .white-text {
      color: var(--100, #fff);

      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      span {
        color: var(--2, #ff5000);

        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
      }
    }
  }
  .ticket-container {
    overflow: hidden;
    height: 166px;
    margin-bottom: 20px;
    border: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
    border-radius: 4px;
    .ticket-code-bar {
      display: flex;
      height: 37px;
      padding: 0px 20px 0 20px;
      border-bottom: 1px solid var(--unnamed, rgba(255, 255, 255, 0.1));
      background: var(--unnamed, #1d223c);
      color: var(--100, #fff);
      text-align: center;

      font-size: 12px;
      font-weight: 400;
      line-height: 28px;
      align-items: center;
      .state {
        color: var(--unnamed, #f35f1b);
        margin-left: auto;
      }
    }
    .ticket-content {
      display: flex;
      height: 130px;
      padding: 0 20px 0 20px;
      .img-container {
        display: flex;
        width: 110px;
        height: 70px;
        margin-top: 29px;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-family: TencentSans;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
      }
      .dark {
        background: #1d223c;
      }
      .orange {
        background: linear-gradient(180deg, #ff0029 0%, #ff8451 100%);
      }
      .blue {
        background: linear-gradient(180deg, #3a7fff 0%, #44adff 100%);
      }
      .purple {
        background: linear-gradient(180deg, #5136ff 0%, #8b82ff 100%);
      }
      .yellow {
        background: linear-gradient(180deg, #ff7804 0%, #ffa53f 100%);
      }
      .describe-container {
        margin: 31px 0 0 20px;
        .title {
          color: var(--100, #fff);

          font-size: 16px;
          font-weight: 400;
          line-height: 16px;
        }
        .description {
          margin-top: 12px;
        }
      }
      .btn-container {
        display: flex;
        flex-direction: column;
        align-items: end;
        margin-left: auto;
        cursor: pointer;
        justify-content: center;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          height: 40px;
          // margin-top: 20px;
          border-radius: 4px;
          background: var(--unnamed, #ff9000);
          color: #fff;
          margin-bottom: 10px;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
        }
        .expire {
          // margin-top: 5px;
        }
      }
    }
  }
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 800px;
    img {
      margin-top: 48px;
    }
  }
}

// 弹出框样式
.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: ;
  height: 400px;
  color: var(--100, #fff);

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  img {
    margin-top: 36px;
  }
  .add-btn {
    margin-top: 21px;
  }
}
</style>
