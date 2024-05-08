<template>
  <div
    class="general-content"
    :class="{
      'general-content-top': !rechargeStore.cryptoDpChannelList.length && site == 'vietnam'
    }"
  >
    <!-- 通知栏 -->
    <Inform></Inform>
    <div class="general-box">
      <HeadlineTitle
        class="general-box-padding"
        :leftTitle="$t('DepositView.PayMethod')"
      ></HeadlineTitle>
      <template v-if="dpChannelList.length">
        <CTabList :list="dpChannelList" @index="onclickTab" :activeIndex="selectedTab">
          <template #tabContent>
            <!-- 用户银行卡或手机号只绑定了任何一个 -->
            <template
              v-if="onComputedCardBinded == 0 && dpChannelList[selectedTab].bindCardState == 1"
            >
              <AddInformation></AddInformation>
            </template>
            <template
              v-else-if="
                onComputedPhoneBinded == 0 && dpChannelList[selectedTab].bindPhoneState == 1
              "
            >
              <AddInformation :isPhoneShow="true"></AddInformation
            ></template>
            <template v-else>
              <!-- 轮播图 -->
              <SwipeBanner></SwipeBanner>
              <template
                v-if="
                  dpChannelList[selectedTab].needRealName == 1 ||
                  dpChannelList[selectedTab].needRealName == 2
                "
              >
                <!-- 存款人名称 -->
                <HeadlineTitle
                  class="general-box-padding"
                  :leftTitle="$t('DepositView.DepositorName')"
                ></HeadlineTitle>
                <!-- 存款人姓名输入框 -->
                <div class="bankCardName-selector general-box-padding" v-if="false">
                  <div class="bankCardName-selector-left">{{ $t('DepositView.ZhangSan') }}</div>
                  <div class="bankCardName-selector-right" @click="onClickNamePopup">
                    <img :src="bottomIcon" />
                  </div>
                </div>
                <div class="general-box-padding">
                  <DepositInput
                    :placeholder="$t('DepositView.EnterDepositorName')"
                    :modelValue="username"
                    :hasErrorTip="true"
                    :verifyCodeIconRight="true"
                    :clearable="true"
                    :maxlength="50"
                    @update:modelValue="updateName"
                  ></DepositInput>
                </div>

                <div class="deposit-text general-box-padding">
                  {{ $t('DepositView.DepositViewTip9') }}
                </div>
              </template>
              <template v-if="dpChannelList[selectedTab].isC2c == '1' && showBankList == 1">
                <!-- 银行选择器 -->
                <HeadlineTitle
                  class="general-box-padding"
                  :leftTitle="$t('DepositView.DepositBank')"
                ></HeadlineTitle>
                <div class="general-box-padding">
                  <div class="bankCardWithdraw-content-addBank">
                    <div
                      class="bankCardWithdraw-content-addBank-item"
                      @click="onClickBankCardPopup"
                    >
                      <div class="bankCardWithdraw-content-addBank-item-left" v-if="isBankShow">
                        <img class="imgs" :src="getImg(addBnakInfo.icon)" />
                        <div class="texts">{{ addBnakInfo.bankName }}</div>
                      </div>
                      <div class="bankCardWithdraw-content-addBank-item-left" v-else>
                        <div class="text">{{ $t('Wletter.Choosebank1') }}</div>
                      </div>
                      <div class="bankCardWithdraw-content-addBank-item-right">
                        <template v-if="isBankShow">
                          <van-icon name="arrow" />
                        </template>
                        <template v-else>
                          <img :src="bottomIcon" />
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 存款金额 -->
              <HeadlineTitle
                class="general-box-padding"
                :leftTitle="$t('DepositView.DepositAmount')"
              ></HeadlineTitle>
              <!-- 金额菜单 -->
              <div class="general-box-padding">
                <DepositList
                  :list="dpChannelList[selectedTab].quickAmount.split(',')"
                  :depositListTab="depositListTab"
                  @onClickChildTab="onClickChildTab"
                ></DepositList>
              </div>
              <template v-if="dpChannelList[selectedTab].isCustomizeInput == 1">
                <div class="general-box-padding">
                  <DepositInput
                    :placeholder="`${$t('DepositView.EnterDepositAmount')}${
                      dpChannelList[selectedTab].minPayAmount
                    }~${dpChannelList[selectedTab].maxPayAmount}`"
                    :isInputLeft="true"
                    :itemObj="dpChannelList[selectedTab]"
                    :modelValue="depositCount"
                    @update:modelValue="updateCount"
                    :hasErrorTip="true"
                    :verifyCodeIconRight="true"
                    :clearable="true"
                    :isInputImg="true"
                    :types="'Number'"
                  >
                    <template #icon
                      ><div class="icon-left"><CurrencyUnit /></div
                    ></template>
                  </DepositInput>
                </div>
              </template>
              <!-- 提示文本渲染 -->
              <template v-if="dpInitContent">
                <p
                  class="general-box-padding dpInitContent-text"
                  style="margin-bottom: 15px"
                  v-html="Base64.decode(dpInitContent)"
                ></p>
              </template>

              <!-- 底部 -->
              <DepositFooter
                :speedup="dpChannelList[selectedTab].addPercent"
                :isSpeedup="true"
                :itemObj="dpChannelList[selectedTab]"
                :amount="onComputedInput"
                :userName="username"
                :bankPage="true"
                :addBnakInfo="addBnakInfo"
                :showBankList="showBankList"
                :dailyLimitBalance="dailyLimitBalance"
              ></DepositFooter
            ></template>
          </template>
        </CTabList>
      </template>
      <template v-else>
        <div>{{ $t('DepositView.NoChannel') }}</div>
      </template>
      <NamePopup ref="namePopupDom"></NamePopup>
      <!-- C2C银行卡弹出层 -->
      <BankCardC2CPopup ref="bankCardC2CPopupDom" @onClickConfirm="onBankChang"></BankCardC2CPopup>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Inform from '../Inform/Inform'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import SwipeBanner from '../SwipeBanner/SwipeBanner'
import CTabList from '@/components/CTabList/CTabList'
import DepositInput from '../DepositInput/DepositInput'
import DepositList from '../DepositList/DepositList'
import DepositFooter from '../DepositFooter/DepositFooter'
import AddInformation from '../AddInformation/AddInformation'
import NamePopup from '../NamePopup/NamePopup'
import BankCardC2CPopup from '../BankCardC2CPopup/BankCardC2CPopup'
import eventBus from '@/utils/eventBus'
import bottomIcon from './img/bottomIcon.png'
import { useRechargeStore } from '@/stores/recharge'
import { getOrderText, getChannelDepositGift } from '@/api/recharge'
import { Base64 } from 'js-base64'
import { getBankListC2C } from '@/api/bindInfo'
import { getImg } from '@/utils'
import i18n from '@/i18n'
const site = import.meta.env.VITE_SITE

const rechargeStore = useRechargeStore()
// 支付方式当前默认高亮第一个
const selectedTab = ref(0)
// 定义姓名弹窗ref
const namePopupDom = ref(null)
// 姓名弹窗传值
const onClickNamePopup = () => {
  namePopupDom.value.showhide(nameList)
}
eventBus.on('username', (v) => {
  username.value = v.name
})
onUnmounted(() => {
  eventBus.off('username')
})
const dpChannelList = computed(() => {
  return rechargeStore.dpChannelList
})

//充值页面时展示的告知内容
const dpInitContent = ref('')

// C2C存款银行列表
const bankList = ref([])
// 是否展示C2C存款银行栏位(0 关闭、1 打开)
const showBankList = ref(null)
onMounted(() => {
  getText(dpChannelList.value[selectedTab.value].channelTypeId)
  getBankListC2C().then((res) => {
    bankList.value = res.data.bankList
    showBankList.value = res.data.showBankList
  })
  getChannelDepositInfo(dpChannelList.value[selectedTab.value].channelTypeId)
})

// 通道剩余加送金额
const dailyLimitBalance = ref(0)

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
// 说明文字信息
const getText = (channelTypeId) => {
  getOrderText(channelTypeId).then((res) => {
    if (res.data.dpPendingContent) {
      dpInitContent.value = res.data.dpInitContent
    } else {
      dpInitContent.value = ''
    }
  })
}

// 是否添加银行卡信息
const onComputedCardBinded = computed(() => {
  return rechargeStore.cardBinded
})
// 是否有手机号
const onComputedPhoneBinded = computed(() => {
  return rechargeStore.phoneBinded
})

// 输入的姓名
const username = ref('')
// 金额列表高亮默认为空
const depositListTab = ref(null)
// 输入金额默认为空
const depositCount = ref(null)

//顶部支付方式切换
const onclickTab = (index) => {
  username.value = ''
  depositCount.value = null
  depositListTab.value = null
  selectedTab.value = index
  getText(dpChannelList.value[selectedTab.value].channelTypeId)
}

// 输入姓名返回值
const updateName = (val) => {
  username.value = val
}

// 支付金额切换值
const onClickChildTab = (item, index) => {
  depositListTab.value = index
  depositCount.value = item
}
// 输入金额返回的值
const updateCount = (val) => {
  // 根据输入值匹配数组索引实现高亮
  let index = dpChannelList.value[selectedTab.value].quickAmount.split(',').findIndex((item) => {
    return item === val
  })
  // 返回值匹配金额高亮的索引
  depositListTab.value = index
  depositCount.value = val
}
// 底部金额总数
const onComputedInput = computed(() => {
  return Number(depositCount.value)
})

const nameList = reactive([
  {
    id: 1,
    name: i18n.global.t('DepositView.ZhangSan'),
    highlighted: true
  },
  {
    id: 2,
    name: i18n.global.t('DepositView.Lisi'),
    highlighted: false
  },
  {
    id: 3,
    name: i18n.global.t('DepositView.Wangwu'),
    highlighted: false
  },
  {
    id: 4,
    name: i18n.global.t('DepositView.Liliu'),
    highlighted: false
  }
])

// 定义选择银行卡
const bankCardC2CPopupDom = ref(null)
// 打开c2c银行卡列表
const onClickBankCardPopup = () => {
  bankCardC2CPopupDom.value.showhide(bankList.value)
}

const isBankShow = ref(false)
const addBnakInfo = ref({})

// 选择添加银行卡选项
const onBankChang = (val) => {
  if (val.bankName) {
    addBnakInfo.value = val
    isBankShow.value = true
  } else {
    isBankShow.value = false
  }
}
</script>
<style lang="scss" scoped>
.general-content {
  margin-top: 38px;
  padding-bottom: 144px;
  overflow: auto;
  .deposit-text {
    color: #999;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
.general-content-top {
  margin-top: 0;
}
.general-box {
  // overflow: scroll;
  // overflow-y: auto;
  // min-height: 700px;
}
.dpInitContent-text {
  height: 120px;
  overflow: scroll;
  word-wrap: break-word;
  line-height: 20px;
  margin: 10px auto 0;
}
.general-box-padding {
  padding: 0 16px;
  .bankCardWithdraw-content-addBank {
    width: 343px;
    border-radius: 8px;
    background: #f7f7f7;

    .bankCardWithdraw-content-addBank-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 44px;
      .bankCardWithdraw-content-addBank-item-left {
        display: flex;
        align-items: center;
        .img {
          width: 16px;
          height: 16px;
          margin: 0 8px 0 16px;
        }
        .title {
          color: #111;
          font-size: 13px;
        }
        .imgs {
          width: 24px;
          height: 24px;
          margin: 0 8px 0 16px;
        }
        .text {
          color: #999;
          font-size: 16px;
          margin-left: 16px;
        }
        .texts {
          color: #111;
          font-size: 16px;
        }
      }
      .bankCardWithdraw-content-addBank-item-right {
        width: 16px;
        height: 16px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.bankCardName-selector {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  .bankCardName-selector-left {
    padding-left: 15px;
    color: #999;
  }
  .bankCardName-selector-right {
    width: 16px;
    height: 16px;
    margin-right: 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
