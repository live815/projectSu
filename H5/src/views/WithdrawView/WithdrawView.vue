<template>
  <div class="withdraw-content">
    <NavBar :title="$t('Wletter.withdraw')" :isShowRight="false">
      <template #right
        ><span @click="onClickHelp">{{ $t('Wletter.Tutorial') }}</span></template
      >
    </NavBar>
    <div class="content">
      <template v-if="onComptuedWithdraw">
        <div class="general-box-padding">
          <MyAssets></MyAssets>
        </div>
        <HeadlineTitle
          class="general-box-padding"
          :leftTitle="$t('Wletter.Withdrawaltype')"
        ></HeadlineTitle>
        <CTabList :list="wdChannelTypeList" @index="onclickTab" :activeIndex="selectedTab">
          <template #tabContent>
            <div v-if="wdChannelTypeList[selectedTab].wdWayType === '0'">
              <BankCardWithraw
                :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
                :textData="textData"
                :hintData="additionalPropertiesOne"
              />
            </div>
            <div v-if="wdChannelTypeList[selectedTab].wdWayType === '1'">
              <Exclusive
                :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
                :textData="textData"
                :hintData="additionalPropertiesTwo"
              />
            </div>
            <div v-if="wdChannelTypeList[selectedTab].wdWayType === '2'">
              <VirtualWithdraw
                :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
                :textData="textData"
                :hintData="additionalPropertiesThree"
              />
            </div>
            <div v-if="wdChannelTypeList[selectedTab].wdWayType === '3'">
              <EbPayWithdraw
                :wdChannelTypeListItem="wdChannelTypeList[selectedTab]"
                :textData="textData"
                :hintData="additionalPropertiesFour"
              />
            </div>
          </template>
        </CTabList>
      </template>
      <template v-else>
        <Maintain></Maintain>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar'
import MyAssets from './components/MyAssets/MyAssets'
import HeadlineTitle from '@/components/HeadlineTitle/HeadlineTitle'
import CTabList from '@/components/CTabList/CTabList'
import BankCardWithraw from './components/BankCardWithdraw/BankCardWithdraw'
import VirtualWithdraw from './components/VirtualWithdraw/VirtualWithdraw'
import EbPayWithdraw from './components/EbPayWithdraw/EbPayWithdraw'
import Maintain from './components/Maintain/Maintain'
import Exclusive from './components/Exclusive/Exclusive'
import { getWdChannelList, getWithdrawWdContent } from '@/api/withdraw'
import { useWithdrawStore } from '@/stores/withdraw'
import { useRouter } from 'vue-router'
import i18n from '@/i18n'

const router = useRouter()
const withdrawStore = useWithdrawStore()
withdrawStore.getLargeWithdrawLimitData()
getWithdrawList()
getWithdrawText()
const selectedTab = ref(0)
// 点击切换提现类型
const onclickTab = (val) => {
  selectedTab.value = val
}

// 提现类型数据
const wdChannelTypeList = ref([])

// 获取提现通道
function getWithdrawList() {
  getWdChannelList().then((res) => {
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
  })
}

const textData = reactive({
  freeWdTimesContent: '', // 如何获取免费提现次数文案内容
  wdAppointmentContent: '' // 预约提现说明文案内容
})

const additionalPropertiesOne = ref({}) // 银行卡提现类型页面文案内容
const additionalPropertiesTwo = ref({}) //  专属提现类型页面文案内容
const additionalPropertiesThree = ref({}) // USDT提现类型页面文案内容
const additionalPropertiesFour = ref({}) // ebpay提现类型页面文案内容

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

// 涂璇是否处于维护状态
const onComptuedWithdraw = computed(() => {
  if (wdChannelTypeList.value.length > 0) {
    return true
  }
  return false
})

// 跳转提现教程
const onClickHelp = () => {
  router.push({ path: '/help', query: { activeNames: 1 } })
}
</script>

<style lang="scss" scoped>
.withdraw-content {
  background: #fff;
  overflow: hidden;
  .content {
    margin-top: 10px;
  }
}
.general-box-padding {
  padding: 0 16px;
}
</style>
