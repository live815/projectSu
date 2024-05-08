<template>
  <div class="deposit-content">
    <NavBar
      :title="$t('DepositView.Topup')"
      :isShowRight="false"
      :isBack="false"
      @onClickLeft="goBack"
    >
      <template #right
        ><span @click="onClickHelp">{{ $t('DepositView.Tutorial') }} </span></template
      >
    </NavBar>

    <template v-if="tabList.length > 0">
      <CTab
        v-if="tabList.length > 1 && site != 'vietnam'"
        :tabList="tabList"
        @index="onclickTab"
        :activeIndex="selectedTab"
        :styleHeght="true"
        :fixed="true"
      >
        <template #tabContent> </template>
      </CTab>
      <component :is="tabList[selectedTab].component"></component>
      <!-- 跑马灯 -->
    </template>
    <template v-else>
      <Maintain />
    </template>
    <!-- 遮罩层 -->
    <overlay
      :show="rechargeStore.isShowOverlay"
      :zIndex="10"
      className="my-overlay"
      :customStyle="{ background: 'rgba(0, 0, 0, 0.5)' }"
      @OverlayShow="onOverlayShow"
    >
      <div class="overlay-content">
        <!-- 遮罩层内容 -->
        {{ $t('DepositView.DepositViewTip1') }}
      </div>
    </overlay>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import NavBar from '@/components/NavBar/NavBar'
import CTab from '@/components/CTab/CTab'
import General from './components/General/General'
import virtual from './components/Virtual/Virtual'
import Maintain from './components/Maintain/Maintain'
import { useRechargeStore } from '@/stores/recharge'
import { useRouter } from 'vue-router'
import { useAnnouncementStore } from '@/stores/announcement'
import i18n from '@/i18n'

const announcement = useAnnouncementStore()

const router = useRouter()

const rechargeStore = useRechargeStore()

const site = import.meta.env.VITE_SITE

onMounted(async () => {
  await announcement.getAnnouncementList()
  rechargeStore.getSupport()
})

const selectedTab = ref(0)

const tabList = computed(() => {
  const tabs = []
  if (rechargeStore.dpChannelList.length > 0) {
    tabs.push({
      id: 1,
      title: i18n.global.t('DepositView.OrdinaryRecharge'),
      component: markRaw(General)
    })
  }
  if (rechargeStore.cryptoDpChannelList.length > 0) {
    tabs.push({
      id: 2,
      title: i18n.global.t('DepositView.VirtualCurrencyRecharge'),
      component: markRaw(virtual)
    })
  }
  return tabs
})
// 切换tab栏
const onclickTab = (val) => {
  selectedTab.value = val
}
// 关闭遮罩层
const onOverlayShow = () => {
  rechargeStore.ShowOverlay()
}
const goBack = () => {
  router.push('/')
}

// 跳转存款教程
const onClickHelp = () => {
  router.push({ path: '/help', query: { activeNames: 0 } })
}
</script>

<style lang="scss" scoped>
.deposit-content {
  background-color: #fff;
}
.tab-content {
  width: 100%;
}

.overlay-content {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 274px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: var(--text-icon-font-gy-190, rgba(0, 0, 0, 0.9));
  color: var(--text-icon-font-wh-1100, #fff);
  text-align: center;
  /* Body/Medium */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}
</style>
