<template>
  <div class="charge-container">
    <div class="my-balance">
      <div class="balance-title">{{ $t('DepositWithdraw.MyAssets') }}：</div>

      <Balance />
    </div>
    <div class="upper-tip" @click="handleBankCardAnnouncement">
      <img src="./img/speaker.png" />
      <template v-if="annTextData">
        <Marquee class="Marquee">
          {{ removeHtmlAndSpaces(annTextData) }}
        </Marquee>
      </template>
    </div>

    <div class="payment-type">
      <div class="withdrawal-header">
        <div class="withdrawal-type">
          <div><img src="./img/Rectangle22464.png" /></div>
          <div>{{ $t('DepositWithdraw.RechargeType') }}</div>
        </div>
        <div class="withdrawal-tutorial">
          <div><img src="./img/image169.png" /></div>
          <div @click="openCourse">{{ $t('DepositWithdraw.RechargeTutorial') }}</div>
        </div>
      </div>
      <div class="type-selet-row">
        <div
          class="type-btn"
          :class="mainConfig.currentType == 0 ? 'type-active' : ''"
          @click="onClickTypeActive(0)"
        >
          {{ $t('DepositWithdraw.OrdinaryRecharge') }}
        </div>
        <div
          class="type-btn"
          :class="mainConfig.currentType == 1 ? 'type-active' : ''"
          @click="onClickTypeActive(1)"
        >
          {{ $t('DepositWithdraw.VirtualCurrencyRecharge') }}
        </div>
      </div>
    </div>
    <template v-if="mainConfig.currentType == 0">
      <div v-if="loading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
      <template v-else-if="bankSupport.length">
        <div class="payment-way">
          <div class="title">
            <div class="title-bar"></div>
            {{ $t('DepositWithdraw.PaymentMethod') }}
          </div>
          <div class="way-select-row">
            <div
              v-for="(item, index) in bankSupport"
              :key="index"
              @click="changeMethod(item, index)"
              :class="currentMethod == index ? 'tunel-box selected-box' : 'tunel-box'"
            >
              <div
                class="icon-box"
                :class="currentMethod == index ? 'icon-box icon-box-select' : 'icon-box'"
              >
                <img :src="getImgUrl(item.icon)" width="32" height="32" />
              </div>
              <div class="tunel-name">{{ item.channelTypeName }}</div>

              <div class="tunel-bottom" v-if="item.addPercent">
                {{ $t('DepositWithdraw.ExtraGift') }} {{ item.addPercent }}%
              </div>
              <div class="tunel-tag" v-if="item.label" :title="item.label">{{ item.label }}</div>
            </div>
          </div>
        </div>
        <div class="eb-pay" v-if="imgList.length">
          <el-carousel
            height="60px"
            arrow="never"
            indicator-position="none"
            @change="changeSwip"
            ref="swip"
          >
            <el-carousel-item v-for="item in imgList" :key="item">
              <img :src="getImgUrl(item.webUrl)" @click="toActive(item)" />
            </el-carousel-item>
          </el-carousel>
          <div class="list-bar">
            <div
              :class="activeImg == index ? 'bar active' : 'bar'"
              v-for="(item, index) in imgList"
              :key="index"
              @click="changeImgIndex(index)"
            ></div>
          </div>
        </div>
        <template v-if="cardBinded == 0 && bankSupport[currentMethod].bindCardState == 1">
          <AddInformation></AddInformation
        ></template>
        <template v-else-if="phoneBinded == 0 && bankSupport[currentMethod].bindPhoneState == 1">
          <AddInformation :isPhoneShow="true"></AddInformation>
        </template>
        <template v-else>
          <div class="name-box" v-show="isNeedRealName">
            <div class="title">
              <div class="title-bar"></div>
              {{ $t('DepositWithdraw.DepositorName') }}
            </div>
            <div class="name-input-box">
              <input
                type="text"
                :placeholder="$t('DepositWithdraw.PlaceholderTips_2')"
                v-model="realName"
                :maxlength="50"
              />
              <!-- <NameSelector ref="nameSelector" @getRealName="getRealName"></NameSelector> -->
            </div>

            <div class="name-tip">{{ $t('DepositWithdraw.NoticeTips_1') }}</div>
          </div>
          <div class="bank-box" v-if="isBankShow">
            <div class="title">
              <div class="title-bar"></div>
              {{ $t('DepositWithdraw.DepositBank') }}
            </div>
            <div class="add-bank">
              <div class="select-bank" @click="onClickBankCard">
                <div class="select-bank-img" v-if="addBnakInfo?.bankName">
                  <img :src="getImgUrl(addBnakInfo.icon)" />
                  <div class="titles">{{ addBnakInfo.bankName }}</div>
                </div>
                <div v-else class="title-top">
                  {{ $t('DepositWithdraw.DepositAddBankTip') }}
                </div>

                <img src="./img/bottomIcon.png" class="icon" />
              </div>
              <div class="select-bottom" v-show="isBankShowCard">
                <div class="select-bottom-min">
                  <div
                    class="select-bottom-min-item"
                    v-for="(item, index) in bankList"
                    :key="index"
                    :class="{ active: activeIndex === index, 'disabled-color': item.status == 1 }"
                    @click="selectBank(item, index)"
                  >
                    <div class="select-bottom-min-item-left">
                      <img :src="getImgUrl(item.icon)" class="img" />
                      <div>{{ item.bankName }}</div>
                    </div>
                    <div v-if="item.status == 1" class="select-bottom-min-item-right">
                      {{ $t('DepositWithdraw.Disabled') }}
                    </div>
                    <div
                      v-if="item.statue !== 1 && activeIndex === index"
                      class="select-bottom-min-item-right"
                    >
                      <img src="./img/checkIcon.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="amount-box">
            <div class="title">
              <div class="title-bar"></div>
              {{ $t('DepositWithdraw.DepositAmount') }}
            </div>
            <div class="amount-btn-contianer">
              <div
                class="quickAmount"
                v-for="(item, index) in quickAmount"
                :key="index"
                :class="currentAmount == item ? 'quickAmount selected-quickAmount' : 'quickAmount'"
                @click="changQuickAmount(item)"
              >
                {{ item }}
              </div>
            </div>

            <div class="amount-input-container" v-if="isCustomizeInput">
              <input
                class="amount-input"
                type="text"
                oninput="value=value.replace(/[^\d]/g,'')"
                :placeholder="$t('DepositWithdraw.PlaceholderTips_1') + `${minAmount}~${maxAmount}`"
                v-model="currentAmount"
              />
              <div class="amount-input-icon">
                <CurrencyUnit style="margin-right: 0" />
              </div>
            </div>
            <div class="amount-input-error" v-if="currentAmount > maxAmount">
              {{ $t('DepositWithdraw.LimitTips_1') }}
            </div>
            <div class="amount-input-add">
              <div class="amount-input-add-left">
                {{ $t('DepositWithdraw.ExtraGift') }}：<span>
                  <template v-if="onComputedSpeedup"> <CurrencyUnit /></template
                  >{{ onComputedSpeedup ? onComputedSpeedup.toFixed(2) : '--' }}</span
                >
              </div>
              <div class="amount-input-add-right">
                {{ $t('DepositWithdraw.TotalGained') }}：<span>{{
                  onComputedAmount ? onComputedAmount.toFixed(2) : '--'
                }}</span>
              </div>
            </div>
          </div>
          <div class="lower-tip" v-if="dpInitContent">
            <p v-html="Base64.decode(dpInitContent)"></p>
          </div>
        </template>
      </template>
      <template v-else>
        <Maintain :title="$t('DepositWithdraw.OrdinaryRecharge')"></Maintain>
      </template>
    </template>
    <template v-else>
      <template v-if="cryptoDpChannelList.length">
        <Virtual
          :cardBinded="cardBinded"
          :phoneBinded="phoneBinded"
          :cryptoDpChannelList="cryptoDpChannelList"
          @virtualData="virtualData"
        ></Virtual>
      </template>
      <template v-else>
        <Maintain :title="$t('DepositWithdraw.VirtualCurrencyRecharge')"></Maintain>
      </template>
    </template>
    <BankCardAnnouncement
      :showBankCardAnnouncement="showBankCardAnnouncement"
      @closeAnnouncement="closeAnnouncement"
      :annText="annTextData"
    />
    <!-- 推荐金额弹窗 -->
    <RecommendedAmount></RecommendedAmount>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import Balance from '@/components/Balance'
import { ElMessage } from 'element-plus'
// import NameSelector from './components/NameSelector.vue'
import BankCardAnnouncement from './components/BankCardAnnouncement.vue'
import Maintain from './components/Maintain.vue'
import Virtual from './components/Virtual.vue'
import AddInformation from './components/AddInformation.vue'
import {
  getBankSupport,
  getBankOrder,
  getOrderText,
  getVirtualOrder,
  getc2cOrder,
  getChannelDepositGift
} from '@/api/recharge.js'
import { getImgUrl, removeHtmlAndSpaces } from '@/utils'
import { useChargeAndWithdrawal } from '@/stores/chargeAndWithdrawal'
import { promotionStore } from '@/stores/promotion'
import { computed } from 'vue'
import { Base64 } from 'js-base64'
import { jumpActivity } from '@/utils/jumpActivity'
import { getDeviceInfo } from '@/utils/mobileDeviceInfo'
import { useRouter } from 'vue-router'
import { useAnnouncementStore } from '@/stores/announcement'
import { getBankListC2C } from '@/api/bindInfo'

const { deviceId, optClient } = getDeviceInfo()
const announcement = useAnnouncementStore()
const router = useRouter()

const promotion = promotionStore()

// 充值广告轮播
const imgList = computed(() => {
  return promotion.promotionData.paymentAdsData || []
})

// 是否绑定银行卡
const cardBinded = ref('')
// 是否绑定手机号
const phoneBinded = ref('')
// 推荐金额列表
const amountList = ref([])

const mainConfig = useChargeAndWithdrawal()

const realName = ref('')
// 输入金额
const currentAmount = ref()

const loading = ref(false)
// 普通充值数据
const bankSupport = ref([])

// 虚拟币充值数据
const cryptoDpChannelList = ref([])

// 点击的当前普通充值项索引
const currentMethod = ref(0)
const showBankCardAnnouncement = ref(false)
// 通道剩余加送金额
const dailyLimitBalance = ref(0)
// 初始化充值页面时展示的告知内容
const dpInitContent = ref('')

// 公告内容
const annTextData = computed(() => {
  if (announcement.normalAnn?.length) {
    return announcement.deposAnn[0]?.content.replace(/<[^>]*>/g, '')
  }
  return ''
})

// 点击切换充值类型
const onClickTypeActive = (val) => {
  mainConfig.changeCurrentType(val)
}

// 名字下拉框
// function showNameSelect() {
//   nameSelector.value.handleShowSelect()
// }
// 子组件传值
// const getRealName = (name) => {
//   realName.value = name
// }
// 获取当前通道id
const currentChannel = computed(() => {
  if (bankSupport.value[currentMethod.value]) {
    return bankSupport.value[currentMethod.value].channelTypeId
  } else {
    return []
  }
})
// 获取当前通道快捷金额
const quickAmount = computed(() => {
  if (bankSupport.value[currentMethod.value]) {
    return bankSupport.value[currentMethod.value].quickAmount.split(',')
  } else {
    return []
  }
})
// 获取最小金额
const minAmount = computed(() => {
  if (bankSupport.value[currentMethod.value]) {
    return bankSupport.value[currentMethod.value].minPayAmount
  } else {
    return []
  }
})
// 最大金额
const maxAmount = computed(() => {
  if (bankSupport.value[currentMethod.value]) {
    return bankSupport.value[currentMethod.value].maxPayAmount
  } else {
    return []
  }
})
// 是否需要姓名
const isNeedRealName = computed(() => {
  if (bankSupport.value[currentMethod.value]) {
    return bankSupport.value[currentMethod.value].needRealName * 1
  } else {
    return false
  }
})

// 是否是c2c 银行卡显示
const isBankShow = computed(() => {
  if (bankSupport.value[currentMethod.value].isC2c == '1' && showBankList.value == 1) {
    return true
  }
  return false
})

// 是否可以手动输入
const isCustomizeInput = computed(() => {
  if (
    bankSupport.value[currentMethod.value] &&
    bankSupport.value[currentMethod.value].isCustomizeInput == '1'
  ) {
    return true
  }
  return false
})
// 快捷金额切换
function changQuickAmount(item) {
  currentAmount.value = item
}
// 点击切换支付方式
function changeMethod(item, index) {
  currentMethod.value = index
  // 给当前索引赋值，用于判断按钮
  mainConfig.currentMethod = index
  currentAmount.value = null
  addBnakInfo.value = {}
  getListText(item.channelTypeId)
  getChannelDepositInfo(item.channelTypeId)
}

// 加送
const onComputedSpeedup = computed(() => {
  if (
    bankSupport.value[currentMethod.value] &&
    bankSupport.value[currentMethod.value].addPercent &&
    currentAmount.value
  ) {
    let dailyLimit = bankSupport.value[currentMethod.value].dailyLimit
    if (dailyLimit == null || dailyLimit == -1) {
      return Number(currentAmount.value) * bankSupport.value[currentMethod.value].addPercent * 0.01
    } else {
      // 当前通道返回最大限额额 计算是否大于当日赠送金额
      let numCount = dailyLimit - dailyLimitBalance.value
      // 通道当前赠送金额
      let giftCount =
        Number(currentAmount.value) * bankSupport.value[currentMethod.value].addPercent * 0.01
      if (numCount > giftCount) {
        return (
          Number(currentAmount.value) * bankSupport.value[currentMethod.value].addPercent * 0.01
        )
      } else {
        return dailyLimit - dailyLimitBalance.value
      }
    }
  } else {
    return null
  }
})
// 总计到账
const onComputedAmount = computed(() => {
  if (bankSupport.value[currentMethod.value] && bankSupport.value[currentMethod.value].addPercent) {
    let dailyLimit = bankSupport.value[currentMethod.value].dailyLimit
    if (dailyLimit == null || dailyLimit == -1) {
      return (
        Number(currentAmount.value) * bankSupport.value[currentMethod.value].addPercent * 0.01 +
        Number(currentAmount.value)
      )
    }
    return onComputedSpeedup.value + Number(currentAmount.value)
  }
  return null
})
// 控制通知弹出框
const handleBankCardAnnouncement = () => {
  showBankCardAnnouncement.value = true
}
const closeAnnouncement = () => {
  showBankCardAnnouncement.value = false
}
onMounted(() => {
  getListBankSupport()
  announcement.getAnnouncementList()
  getBankListC2CList()
})
// 查询充值的通道
async function getListBankSupport() {
  loading.value = true
  let res = ''
  try {
    res = await getBankSupport()
    if (res.code == 200) {
      cardBinded.value = res.data.cardBinded
      phoneBinded.value = res.data.phoneBinded
      bankSupport.value = res.data.dpChannelList || []
      cryptoDpChannelList.value = res.data.cryptoDpChannelList || []
      // 将两者的数据储存用于判断按钮
      mainConfig.bankSupport = bankSupport.value
      mainConfig.cardBinded = cardBinded.value
      mainConfig.phoneBinded = phoneBinded.value
      mainConfig.cryptoDpChannelList = cryptoDpChannelList.value
      getListText(bankSupport.value[currentMethod.value].channelTypeId)
      getChannelDepositInfo(bankSupport.value[currentMethod.value].channelTypeId)
      loading.value = false
    } else {
      loading.value = false
    }
  } catch (e) {
    loading.value = false
  }
}

// 获取充值当日赠送金额
const getChannelDepositInfo = (id) => {
  const params = {
    typeId: id
  }
  getChannelDepositGift(params).then((res) => {
    if (res.data) {
      dailyLimitBalance.value = res.data
    }
  })
}
// 获取充值文案
const getListText = (channelTypeId) => {
  getOrderText(channelTypeId).then((res) => {
    if (res.code == 200) {
      dpInitContent.value = res.data.dpInitContent
    }
  })
}

// C2C存款银行列表
const bankList = ref([])
// 是否展示C2C存款银行栏位(0 关闭、1 打开)
const showBankList = ref(null)
// 获取c2c银行
const getBankListC2CList = () => {
  getBankListC2C().then((res) => {
    bankList.value = res.data.bankList
    showBankList.value = res.data.showBankList
  })
}

// 到账银行卡选择器卡片
const isBankShowCard = ref(false)
// 点击银行卡卡片
const onClickBankCard = () => {
  isBankShowCard.value = !isBankShowCard.value
}
// 银行高亮项
const activeIndex = ref(null)
// 点击银行卡信息
const addBnakInfo = ref({})
// 点击当前项
const selectBank = (item, index) => {
  if (item.status === 1) {
    return // 不执行后续操作
  }
  activeIndex.value = index
  isBankShowCard.value = false
  addBnakInfo.value = { ...item }
}

// 创建一个ref来跟踪按钮是否被禁用
const isSubmitting = ref(false)
// 充值
const toWithdarw = async () => {
  if (isSubmitting.value) {
    return
  }
  isSubmitting.value = true
  if (!currentAmount.value) {
    ElMessage({
      type: 'warning',
      message: i18n.global.t('DepositWithdraw.NoticeTips_2')
    })
    isSubmitting.value = false
    return
  }
  if (currentAmount.value < minAmount.value) {
    ElMessage({
      type: 'warning',
      message: i18n.global.t('DepositWithdraw.NoticeTips_3')
    })
    isSubmitting.value = false
    return
  }
  if (currentAmount.value > maxAmount.value) {
    ElMessage({
      type: 'warning',
      message: i18n.global.t('DepositWithdraw.NoticeTips_4')
    })
    isSubmitting.value = false
    return
  }
  if (
    bankSupport.value[currentMethod.value].needRealName == '1' ||
    bankSupport.value[currentMethod.value].needRealName == '2'
  ) {
    if (!realName.value) {
      ElMessage({
        type: 'warning',
        message: i18n.global.t('DepositWithdraw.DepositorNames')
      })
      isSubmitting.value = false
      return
    }
  }
  if (
    bankSupport.value[currentMethod.value].isC2c == '1' &&
    !addBnakInfo?.value.bankName &&
    showBankList.value == 1
  ) {
    ElMessage({
      type: 'warning',
      message: i18n.global.t('DepositWithdraw.DepositAddBankTip')
    })
    isSubmitting.value = false
    return
  }

  let data = {}
  if (realName.value) {
    data = {
      amount: currentAmount.value,
      channelTypeId: currentChannel.value,
      realName: realName.value,
      deviceId: deviceId.value,
      optClient: optClient.value
    }
  } else {
    data = {
      amount: currentAmount.value,
      channelTypeId: currentChannel.value,
      deviceId: deviceId.value,
      optClient: optClient.value
    }
  }
  try {
    // 判断点击的是不是C2C
    if (bankSupport.value[currentMethod.value].isC2c == '1') {
      const params = {
        amount: currentAmount.value,
        channelTypeId: currentChannel.value,
        amountType: 0,
        realName: realName.value,
        deviceId: deviceId.value,
        optClient: optClient.value,
        bankCode: addBnakInfo?.value.bankCode ? addBnakInfo?.value.bankCode : ''
      }
      let res = await getc2cOrder(params)
      if (res.code == 1006000120) {
        const sum = res.data
        amountList.value = sum.map((amount, index) => ({
          id: index + 1,
          amount: amount.toString(),
          highlighted: index === 0
        }))
        const amountObj = {
          amount: currentAmount.value,
          channelTypeId: currentChannel.value,
          amountType: 0,
          realName: realName.value,
          deviceId: deviceId.value,
          optClient: optClient.value,
          amountList: amountList.value,
          bankCode: addBnakInfo?.value.bankCode ? addBnakInfo?.value.bankCode : ''
        }
        isSubmitting.value = false
        // 是否出现推荐金额弹出层
        eventBus.emit('isRecommendedPopup', amountObj)
      } else {
        if (res.code == 200 && res.data) {
          mainConfig.OrderNo = res.data.orderNo
          mainConfig.detailType = 1
          // 证明已经开始充值
          mainConfig.isRecharge = true
          mainConfig.addOrderDetail(res.data)
        }
        isSubmitting.value = false
      }
    } else {
      let res = await getBankOrder(data)
      if (res.code == 200 && res.data) {
        mainConfig.OrderNo = res.data.orderNo
        mainConfig.detailType = 1
        // 证明已经开始充值
        mainConfig.isRecharge = true
        mainConfig.addOrderDetail(res.data)
      }
      isSubmitting.value = false
    }
  } catch (e) {
    isSubmitting.value = false
  }
}

const virtualObj = ref({})
// 组件传过来的值
const virtualData = (data) => {
  virtualObj.value = data
}
// 虚拟币充值
const getVirtualAdd = async () => {
  if (isSubmitting.value) {
    return
  }
  isSubmitting.value = true
  try {
    if (Object.keys(virtualObj.value).length !== 0) {
      let res = await getVirtualOrder(virtualObj.value)
      if (res.code == 200 && res.data) {
        mainConfig.OrderNo = res.data.orderNo
        mainConfig.detailType = 1
        mainConfig.addOrderDetail(res.data)
        // 证明已经开始充值
        mainConfig.isRecharge = true
        isSubmitting.value = false
        // openNewWindow(res.data.url)
      } else {
        isSubmitting.value = false
      }
    }
  } catch (e) {
    isSubmitting.value = false
  }
}

// 广告轮播
const activeImg = ref(0)
const swip = ref(null)
const changeSwip = (index) => {
  activeImg.value = index
}
// 点击指示器切换轮播图
const changeImgIndex = (index) => {
  swip.value.setActiveItem(index)
}
// 跳转至活动页面
const toActive = (event) => {
  jumpActivity({ event, router })
}
defineExpose({ toWithdarw, getVirtualAdd })

// 打开虚拟币教程
const openCourse = () => {
  if (mainConfig.currentType == 1) {
    mainConfig.isCourse = true
  } else {
    const params = {
      isOpen: false
    }
    eventBus.emit('showCharge', params)
    router.push({
      path: '/HelpCenter',
      query: { current: '20' }
    })
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 660px;
  height: 48px;
  padding-left: 14px;
  margin-top: 20px;
  border-radius: 6px;
  background: var(--unnamed, #171a2f);
  color: white;
}
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

.title {
  height: 18px;
  display: flex;
  gap: 8px;
  align-items: center;
  text-justify: center;
  color: var(--100, #fff);
  font-size: 16px;
  font-weight: 500;
}

.title-bar {
  display: inline-block;
  width: 4px;
  height: 18px;
  flex-shrink: 0;
  border-radius: 0px 4px 4px 0px;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
}

.charge-container {
  padding: 30px 30px;
  // height: 600px;
  color: #fff;

  .my-balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 9px;
    width: 660px;
    height: 44px;
    padding: 0 15px 0 15px;
    border-radius: 6px;
    background: linear-gradient(90deg, rgba(106, 17, 203, 0.8) 0%, rgba(37, 117, 252, 0.8) 100%);

    .balance-title {
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .amount {
      margin-left: auto;
      color: #fff;
      text-align: right;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 16px;
    }
  }

  .upper-tip {
    width: 100%;
    margin-top: 18px;
    height: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    span {
      color: var(--80, rgba(255, 255, 255, 0.8));
      font-size: 12px;
      line-height: 16px;
    }
  }

  .payment-type {
    margin-top: 23px;
    .type-selet-row {
      display: flex;
      margin-top: 15px;
      .type-btn {
        display: flex;
        width: 120px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background: #1d223c;
        margin-right: 12px;
        color: var(--60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        cursor: pointer;
      }

      .type-btn.type-active {
        border: 1px solid #ff9000;
        color: #fff;
      }
    }
  }

  .payment-way {
    margin-top: 28px;
    .way-select-row {
      display: flex;
      flex-wrap: wrap;
      width: 660px;
      margin-top: 15px;

      .tunel-box.selected-box {
        border: 1px solid #ff9000 !important;
      }

      .tunel-box.selected-box .icon-box.icon-box-select {
        background-image: url(./img/tunel-bg-recommend.png);
      }

      .tunel-box {
        position: relative;
        width: 92px;
        height: 98px;
        margin: 12px;
        flex-shrink: 0;
        border-radius: 8px;
        background: #1d223c;
        cursor: pointer;

        .icon-box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 61px;
          background-color: #2b3257;
          background-image: url(./img/tunel-bg-normal.png);
          border-radius: 8px 8px 0 0;
        }

        .tunel-name {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 31px;
          background: #1d223c;
          color: var(--100, #fff);
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
        }
        .tunel-bottom {
          position: absolute;
          left: 50%;
          bottom: -4px;
          transform: translate(-50%);
          border-radius: 10px;
          padding: 1px 6px;
          color: #fff;
          font-size: 11px;
          white-space: nowrap;
          text-align: center;
          background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
        }
        .tunel-tag {
          position: absolute;
          top: 0;
          right: 0;
          padding: 2px 4px;
          border-radius: 0px 5px 0px 8px;

          background: var(--1, linear-gradient(90deg, #ff9000 0.17%, #ff5000 101.4%));
        }
      }
    }
  }

  .eb-pay {
    cursor: pointer;
    width: 660px;
    height: 60px;
    margin-top: 26px;
    border-radius: 6px;
    // overflow: hidden;

    img {
      width: 660px;
      height: 60px;
    }
  }

  .name-box {
    margin-top: 25px;

    .name-input-box {
      position: relative;
    }

    .name-tip {
      margin-top: 7px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 12px;
    }
  }
  .bank-box {
    margin-top: 25px;
    .add-bank {
      position: relative;
      margin-top: 15px;
      border-radius: 6px;
      background: var(--unnamed, #171a2f);
      .choose-bank {
        display: flex;
        gap: 8px;
        padding-top: 12px;
        padding-left: 16px;
        div:nth-child(2) {
          color: var(--40, rgba(255, 255, 255, 0.4));

          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px; /* 133.333% */
        }
      }
      .select-bank {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        color: var(-----60, rgba(255, 255, 255, 0.6));
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        .title-top {
          margin-left: 15px;
        }
        .select-bank-img {
          display: flex;
          align-items: center;
          img {
            width: 18px;
            height: 18px;
            margin: 0 15px;
          }
          .titles {
            margin-right: 5px;
          }
        }
        .icon {
          width: 30px;
          height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }
      }
      .select-bottom {
        position: absolute;
        bottom: -250px;
        width: 100%;
        height: 250px;
        background: #1d223c;
        z-index: 1;
        .select-bottom-top {
          width: 100%;
          height: 32px;
          line-height: 32px;
          color: var(--60, rgba(255, 255, 255, 0.6));
          font-size: 14px;
          font-weight: 400;
          margin-left: 20px;
        }
        .select-bottom-min {
          max-height: 170px;
          overflow: scroll;

          .select-bottom-min-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 48px;
            margin: 1px 0;
            .select-bottom-min-item-left {
              display: flex;
              align-items: center;
              color: var(--60, rgba(255, 255, 255, 0.6));
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              margin-left: 20px;
              .img {
                width: 16px;
                height: 16px;
                margin-right: 20px;
              }
            }
            .select-bottom-min-item-right {
              margin-right: 30px;
              color: var(--1, #f53f3f);
              font-size: 14px;
              font-weight: 600;
              img {
                width: 16px;
                height: 12px;
              }
            }
          }
          .active {
            background: #171a2f;
          }
          .disabled-color {
            background-color: #999;
          }
        }
        .select-bottom-footer {
          height: 48px;
          color: var(--unnamed, #f35f1b);
          font-size: 14px;
          font-style: normal;
          line-height: 48px;
          margin-left: 20px;
        }
      }
    }
  }

  .amount-box {
    position: relative;
    margin-top: 25px;
    .amount-btn-contianer {
      display: flex;
      flex-wrap: wrap;
      gap: 22px;
      margin-top: 15px;

      .quickAmount {
        display: flex;
        width: 148px;
        height: 40px;
        padding: 10px;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background: #2b3257;
        color: var(--80, rgba(255, 255, 255, 0.8));
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        cursor: pointer;
      }

      .selected-quickAmount {
        border: 1px solid #ff9000;
        color: #fff;
      }
    }

    .amount-input-container {
      position: relative;
      .amount-input {
        padding-left: 50px;
      }
      .amount-input-icon {
        position: absolute;
        top: 34px;
        left: 17px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background-color: var(--1, #ff9000);
      }
    }
    .amount-input-error {
      color: #f53f3f;
      font-size: 12px;
      margin-top: 5px;
      font-style: normal;
      font-weight: 400;
    }
    .amount-input-add {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      color: var(--60, rgba(255, 255, 255, 0.6));
      font-size: 14px;
      .amount-input-add-left {
        color: var(--unnamed, #f35f1b);
        font-weight: 700;
      }
      .amount-input-add-right {
        color: var(--100, #fff);
        font-weight: 700;
      }
    }
  }

  .lower-tip {
    margin-top: 20px;
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
  }
}

.list-bar {
  position: relative;
  top: -8px;
  display: flex;
  justify-content: center;
  gap: 5px;
  height: 5px;

  .bar {
    width: 12px;
    border-radius: 10px;
    opacity: 0.5;
    background: #000;
  }

  .bar.active {
    background: var(--100, #fff);
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
</style>
