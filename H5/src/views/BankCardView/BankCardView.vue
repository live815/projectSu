<template>
  <div class="bankCard-content">
    <NavBar :title="$t('BankcardView.WithdrawalBind')" />
    <CTab :tabList="tabListComputed" @index="onclickTab" :activeIndex="selectedTab">
      <template #tabContent>
        <component
          :is="tabListComputed[selectedTab].component"
          :bankList="bankList"
          :virtualList="virtualList"
          :ebPayList="ebPayList"
          @deleteBankItem="deleteBankItem"
          @deleteVirtuaItem="deleteVirtuaItem"
          @deleteEbPayItem="deleteEbPayItem"
        ></component>
      </template>
    </CTab>
  </div>
</template>

<script setup>
import { ref, markRaw, computed } from 'vue'
import NavBar from '@/components/NavBar/NavBar'
import CTab from '@/components/CTab/CTab'
import BackList from './components/BackList/BackList'
import VirtualList from './components/VirtualList/VirtualList'
import EbPayList from './components/EbPayList/EbPayList'

import { getBankList, getCryptocyList, getDeleteBank, getCryptocyDelete } from '@/api/bindInfo'
import i18n from '@/i18n'
import { showToast } from 'vant'

// 银行卡列表数据
const bankList = ref([])
// 虚拟币列表数据
const virtualList = ref([])
// EB币列表数据
const ebPayList = ref([])
const site = import.meta.env.VITE_SITE

onMounted(() => {
  getList()
})

const tabListComputed = computed(() => {
  if (site == 'vietnam') {
    return [
      {
        id: 1,
        title: i18n.global.t('BankcardView.BankCard'),
        component: markRaw(BackList)
      },
      {
        id: 2,
        title: i18n.global.t('BankcardView.VirtualCurrencyAddress'),
        component: markRaw(VirtualList)
      }
    ]
  } else {
    return [
      {
        id: 1,
        title: i18n.global.t('BankcardView.BankCard'),
        component: markRaw(BackList)
      },
      {
        id: 2,
        title: i18n.global.t('BankcardView.VirtualCurrencyAddress'),
        component: markRaw(VirtualList)
      },

      {
        id: 3,
        title: i18n.global.t('BankcardView.EbPay'),
        component: markRaw(EbPayList)
      }
    ]
  }
})

const getList = () => {
  getBankListData()
  getCryptocyListData()
  if (site != 'vietnam') {
    getEbCryptocyListData()
  }
}

const getBankListData = () => {
  // 获取银行卡列表
  getBankList().then((res) => {
    if (res.data) {
      bankList.value = res.data
      getTabList()
    }
  })
}

const getCryptocyListData = () => {
  // 获取虚拟币列表
  getCryptocyList('USDT').then((res) => {
    if (res.data) {
      virtualList.value = res.data
      getTabList()
    }
  })
}

const getEbCryptocyListData = () => {
  // 获取虚拟币列表
  getCryptocyList('EB').then((res) => {
    if (res.data) {
      ebPayList.value = res.data
      getTabList()
    }
  })
}

// 删除银行卡
const deleteBankItem = (id) => {
  getDeleteBank(id).then((res) => {
    if (res.data) {
      getBankListData()
      getTabList()
      showToast(i18n.global.t('Mletter.OperationSuccessful'))
    }
  })
}

// 删除虚拟币
const deleteVirtuaItem = (id) => {
  getCryptocyDelete(id).then((res) => {
    if (res.data) {
      getCryptocyListData()
      getTabList()
      showToast(i18n.global.t('Mletter.OperationSuccessful'))
    }
  })
}

// 删除虚拟币
const deleteEbPayItem = (id) => {
  getCryptocyDelete(id).then((res) => {
    if (res.data) {
      getEbCryptocyListData()
      getTabList()
      showToast(i18n.global.t('Mletter.OperationSuccessful'))
    }
  })
}

// 当前tab选择
const selectedTab = ref(0)

// 获取tab标头上的数字
const getTabList = () => {
  tabListComputed.value.forEach((item) => {
    if (item.id == 1) {
      if (bankList.value.length > 0) {
        item.text = bankList.value.length
      } else {
        item.text = ''
      }
    } else if (item.id == 2) {
      if (virtualList.value.length > 0) {
        item.text = virtualList.value.length
      } else {
        item.text = ''
      }
    } else {
      if (ebPayList.value.length > 0) {
        item.text = ebPayList.value.length
      } else {
        item.text = ''
      }
    }
  })
}

// 切换tab栏
const onclickTab = (val) => {
  selectedTab.value = val
}
</script>
<style lang="scss" scoped></style>
