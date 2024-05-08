<template>
  <div class="transactionRecord">
    <NavBar :title="$t('Transactrecord.funddetails')" />
    <div class="transactionRecord-top">
      <div class="transactionRecord-top-left">
        <Tab
          :tabList="tabList"
          @index="onclickTab"
          @filterIndex="filterIndex"
          :activeIndex="selectedTab"
        >
          <template #tabContent>
            <TabItem :tab="tabList[selectedTab]" :dateIndex="dateIndex" @changeDate="changeDate" />
          </template>
        </Tab>
      </div>
    </div>
    <RightPopup v-model:show="isScreenShow" @changeStatus="changeStatus"> </RightPopup>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import Tab from './components/Tab/Tab'
import RightPopup from './components/RightPopup/RightPopup'
import TabItem from './components/TabItem/TabItem'
import { useFinancialStore } from '@/stores/financial'
import i18n from '@/i18n'

// import screenIcon from './img/screenIcon.png'
const financial = useFinancialStore()
const isScreenShow = ref(false)
const orderInfo = reactive({
  endTime: computed(() => financial.getStartTime),
  orderStatus: computed(() => financial.getOrderStatus),
  orderType: computed(() => financial.getOrderType),
  pageNum: computed(() => financial.getPageNum),
  pageSize: 10,
  startTime: computed(() => financial.getEndTime)
})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  financial.handleSetTime(0)
  if (orderInfo.startTime) {
    await financial.getList(orderInfo)
  }
}

const dateIndex = ref(0) // 日期高亮
const tabList = reactive([
  {
    id: '',
    title: i18n.global.t('Transactrecord.all')
  },
  {
    id: '1',
    title: i18n.global.t('Transactrecord.topup')
  },
  {
    id: '2',
    title: i18n.global.t('Transactrecord.withdraw')
  },
  {
    id: '3',
    title: i18n.global.t('Transactrecord.transfer')
  },
  {
    id: '5',
    title: i18n.global.t('Transactrecord.rebate')
  },
  {
    id: '6',
    title: i18n.global.t('Transactrecord.dividend')
  },
  {
    id: '7',
    title: i18n.global.t('Transactrecord.Systemadjust')
  },
  {
    id: '8',
    title: i18n.global.t('Transactrecord.livestream')
  }
])

// 当前tab选择
const selectedTab = ref(0)
// 切换tab栏
const onclickTab = (index, item) => {
  // 切换时重置信息
  financial.changeResets()

  financial.changeResetsDataList()
  // 切换顶部tab栏 日期选着值为0
  dateIndex.value = 0
  financial.handleSetTime(0)
  if (!item.id) {
    financial.changeOrderType('')
  } else {
    financial.changeOrderType(item.id)
  }
  selectedTab.value = index
  financial.getList(orderInfo)
}

// 点击筛选
const filterIndex = () => {
  isScreenShow.value = true
}

// 切换日期
const changeDate = (val) => {
  // 当前高亮值
  dateIndex.value = val
  financial.changeResetsDataList()
  switch (val) {
    case 0:
      financial.handleSetTime(0)
      break
    case 1:
      financial.handleSetTime(1)
      break
    case 2:
      financial.handleSetTime(7)
      break
    case 3:
      financial.handleSetTime(30)
      break
  }
  financial.getList(orderInfo)
}

// 切换状态筛选
const changeStatus = (index, val, type) => {
  financial.changeResetsDataList()
  if (index <= 3) {
    selectedTab.value = index
  } else {
    selectedTab.value = 0
  }
  financial.changeOrderType(type)

  if (val != undefined) {
    financial.changeOrderStatus(val)
  }
  if (dateIndex.value == 0) {
    financial.handleSetTime(0)
  } else if (dateIndex.value == 1) {
    financial.handleSetTime(1)
  } else if (dateIndex.value == 2) {
    financial.handleSetTime(7)
  } else {
    financial.handleSetTime(30)
  }
  financial.getList(orderInfo)
  isScreenShow.value = false
}

onUnmounted(() => {
  // 重置信息
  financial.changeResets()
  financial.changeResetsDataList()
})
</script>

<style lang="scss" scoped>
.transactionRecord {
  height: 100vh;
  .transactionRecord-top {
    width: 100%;
    display: flex;
    .transactionRecord-top-left {
      width: 100%;
    }
  }
}
:deep() {
  .tab-bar-title.active > span {
    color: #323233;
  }
}
</style>
