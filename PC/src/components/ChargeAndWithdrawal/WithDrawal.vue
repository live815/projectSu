<template>
  <div class="withdrawal-module">
    <!-- 我的资产 -->
    <div class="asset-details">
      <div class="my-assets">{{ $t('DepositWithdraw.MyAssets') }}:</div>
      <Balance />
    </div>
    <!-- 提现类型 -->
    <div class="withdrawal">
      <div class="withdrawal-header">
        <div class="withdrawal-type">
          <div><img src="./img/Rectangle22464.png" /></div>
          <div>{{ $t('DepositWithdraw.WithdrawalType') }}</div>
        </div>
        <div class="withdrawal-tutorial" @click="onClickCourse">
          <div><img src="./img/image169.png" /></div>
          <div>{{ $t('DepositWithdraw.WithdrawalTutorial') }}</div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <template v-else-if="wdChannelTypeList.length">
      <div class="withdrawal-channels">
        <div
          class="withdrawal-border withdrawal-one"
          v-for="(item, index) in wdChannelTypeList"
          :key="index"
          :class="{ active: selectedTab === index }"
          @click="changeTab(index, item)"
        >
          <div class="back"><img :src="item.img" alt="" /></div>
          <div class="title" :title="item.wdWayName">{{ item.wdWayName }}</div>
        </div>
      </div>

      <div class="withdraw-content">
        <div v-if="wdChannelTypeList[selectedTab]?.wdWayType === '0'">
          <BankCardWithraw
            :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
            :textData="textData"
            :hintData="additionalPropertiesOne"
          />
        </div>

        <div v-if="wdChannelTypeList[selectedTab]?.wdWayType === '1'">
          <Exclusive
            :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
            :textData="textData"
            :hintData="additionalPropertiesTwo"
          />
        </div>
      </div>
      <div v-if="wdChannelTypeList[selectedTab]?.wdWayType === '2'">
        <VirtualWithdraw
          :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
          :textData="textData"
          :hintData="additionalPropertiesThree"
        />
      </div>
      <div v-if="wdChannelTypeList[selectedTab]?.wdWayType === '3'">
        <EbPayWithdraw
          :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
          :textData="textData"
          :hintData="additionalPropertiesFour"
        />
      </div>
    </template>
    <template v-else>
      <Maintain :title="$t('DepositWithdraw.Withdrawfunction')"></Maintain>
    </template>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { onMounted, reactive, ref } from 'vue'
import Balance from '@/components/Balance'
import BankCardWithraw from './components/BankCardWithraw.vue'
import { getWdChannelList, getWithdrawWdContent } from '@/api/withdraw'
import { useWithdrawStore } from '@/stores/withdraw'
import Maintain from './components/Maintain.vue'
import eventBus from '@/utils/eventBus'
import { useRouter } from 'vue-router'
const router = useRouter()
const withdrawStore = useWithdrawStore()

onMounted(() => {
  getWithdrawList()
  getWithdrawText()
  withdrawStore.getLargeWithdrawLimitData()
})
const loading = ref(false)
// 提现类型数据
const wdChannelTypeList = ref([])

// 当前所选项
const selectedTab = ref(0)

// 获取提现通道
function getWithdrawList() {
  loading.value = true
  getWdChannelList()
    .then((res) => {
      if (res.data) {
        wdChannelTypeList.value = res.data.wdChannelTypeList || []
        withdrawStore.wdChannelTypeList = wdChannelTypeList.value
        if (wdChannelTypeList.value.length > 0) {
          wdChannelTypeList.value.forEach((item) => {
            switch (item.wdWayType) {
              case '0':
                item.img = new URL('./img/recharge1.png', import.meta.url).href
                break
              case '1':
                item.img = new URL('./img/recharge9.png', import.meta.url).href
                break
              case '2':
                item.img = new URL('./img/recharge4.png', import.meta.url).href
                break
              case '3':
                item.img = new URL('./img/recharge5.png', import.meta.url).href
                break
            }
          })
        }
        loading.value = false
      } else {
        loading.value = false
      }
    })
    .catch(() => {
      loading.value = false
    })
}

// 切换tab栏
const changeTab = (index, item) => {
  selectedTab.value = index
}

const textData = reactive({
  freeWdTimesContent: '', // 如何获取免费提现次数文案内容
  wdAppointmentContent: '' // 预约提现说明文案内容
})

const additionalPropertiesOne = ref({}) // 银行卡提现类型页面文案内容
const additionalPropertiesTwo = ref({}) //  专属提现类型页面文案内容
const additionalPropertiesThree = ref({}) // USDT提现类型页面文案内容
const additionalPropertiesFour = ref({}) // ebpa提现类型页面文案内容
// 获取提现文案
function getWithdrawText() {
  getWithdrawWdContent().then((res) => {
    textData.freeWdTimesContent = res.data.freeWdTimesContent
    textData.wdAppointmentContent = res.data.wdAppointmentContent
    const wdTypeContentMap = res.data.wdTypeContentMap
    Object.keys(wdTypeContentMap).forEach((key) => {
      if (wdTypeContentMap[key].wdWayType == 0) {
        additionalPropertiesOne.value = wdTypeContentMap[key]
      }
      if (wdTypeContentMap[key].wdWayType == 1) {
        additionalPropertiesTwo.value = wdTypeContentMap[key]
      }
      if (wdTypeContentMap[key].wdWayType == 2) {
        additionalPropertiesThree.value = wdTypeContentMap[key]
      }
      if (wdTypeContentMap[key].wdWayType == 3) {
        additionalPropertiesFour.value = wdTypeContentMap[key]
      }
    })
  })
}

// 定义提现的事件
const getWithraw = () => {
  // 匹配数组返回的对象
  const currentObj = withdrawStore.wdChannelTypeList.find(
    (item) => item.wdWayType === withdrawStore.bankCardInfo?.type
  )
  //withdrawStore.bankCardInfo?.type(0-银行卡提现, 1-专属提现, 2-USDT提现, 3-EBpay提现, 4-电子钱包提现)
  if (withdrawStore.bankCardInfo?.type == '0' || withdrawStore.bankCardInfo?.type == '1') {
    if (!withdrawStore.bankCardInfo?.cardId) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('DepositWithdraw.Pleaseaddbankcard')
      })
      return
    }
    if (!withdrawStore.bankCardInfo?.amount) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('DepositWithdraw.Withdrawalamountcannotbeempty')
      })
      return
    }
    // 判断是否有预约时间
    if (currentObj.wdAppointmentList) {
      if (!withdrawStore.bankCardInfo?.wdHours) {
        ElMessage({
          type: 'warning',
          message: i18n.global.t('DepositWithdraw.Pleaseselectanappointmenttime')
        })
        return
      }
    }
  } else if (withdrawStore.bankCardInfo?.type == '2' || withdrawStore.bankCardInfo?.type == '3') {
    if (!withdrawStore.bankCardInfo?.addrId) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('DepositWithdraw.Pleaseselectavirtualcurrencyaddress')
      })
      return
    }
    if (!withdrawStore.bankCardInfo?.amount) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('DepositWithdraw.Withdrawalamountcannotbeempty')
      })
      return
    }
  }
  eventBus.emit('withdrawalConfirmationOpen')
}
defineExpose({ getWithraw })

// 点击教程
const onClickCourse = () => {
  const params = {
    isOpen: false
  }
  eventBus.emit('showCharge', params)
  router.push({
    path: '/HelpCenter',
    query: { current: '37' }
  })
}
</script>

<style lang="scss" scoped>
.withdrawal-module {
  padding: 30px 0 30px 0;
  width: 660px;
  margin: 0 auto;

  // 我的资产
  .asset-details {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 44px;
    border-radius: 6px;
    background: linear-gradient(90deg, rgba(106, 17, 203, 0.8) 0%, rgba(37, 117, 252, 0.8) 100%);
    .my-assets {
      color: #fff;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 44px; /* 114.286% */
    }
    .amount {
      margin-left: auto;
      color: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 44px; /* 88.889% */
    }
    .refresh {
      margin: 15px;
      cursor: pointer;
    }
  }
  // 提现类型
  .withdrawal {
    .withdrawal-header {
      display: flex;
      margin-top: 30px;
      .withdrawal-type {
        display: flex;
        div:nth-child(2) {
          color: var(--100, #fff);

          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: 16px;
          margin-left: 8px;
        }
      }
      .withdrawal-tutorial {
        display: flex;
        margin-left: auto;
        div:nth-child(2) {
          color: var(--60, rgba(255, 255, 255, 0.6));

          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px; /* 114.286% */
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .withdrawal-channels {
    display: flex;
    gap: 22px;
    margin-top: 20px;
    .withdrawal-border {
      width: 92px;
      height: 98px;
      border-radius: 8px;
      background-color: #2b3257;
      cursor: pointer;
      box-sizing: border-box;
      .back {
        width: 92px;
        height: 60px;
        background: url(./img/tunel-bg-recommend.png);
        text-align: center;
        padding-top: 15px;
        img {
          width: 32px;
          height: 32px;
        }
      }
      .title {
        background: var(--unnamed, #1d223c);
        color: var(--60, rgba(255, 255, 255, 0.6));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        font-style: normal;
        text-align: center;
        height: 36px;
        line-height: 36px;
        font-weight: 400;
        border-radius: 0 0 8px 8px;
      }
    }
    .active {
      border-radius: 8px;
      border: 1px solid #ff9000;
      background: var(--unnamed, #1d223c);
    }
  }
  loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: transparent;
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 48%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top: 4px solid #fff;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
