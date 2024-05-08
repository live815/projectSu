<template>
  <div class="help-center HelpCenter-view">
    <el-container>
      <el-aside>
        <el-menu
          active-text-color="#ffffff"
          background-color="#2f3456"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @close="(e) => menus.open(e.keyPath)"
          :default-openeds="['1', '2', '3', '4']"
          ref="menus"
        >
          <!-- 关于我们 -->
          <el-sub-menu v-for="item in helpMuneList" :index="item.index" :key="item.index">
            <template #title>
              <img width="20" height="20" class="icon-img" :src="item.path" />
              <span class="menu-title">{{ item.title }}</span>
            </template>
            <el-menu-item
              class="label-item-box"
              :class="{ active: itemr.id == current }"
              v-for="itemr in item.list"
              :index="itemr.id"
              :key="itemr.id"
              @click="current = itemr.id"
            >
              <div class="label-box">{{ itemr.title }}</div>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- 关于我们 -->
        <UserAgreement v-if="helpMuneList[0].list.find((e) => e.id === current)" :tuId="current" />
        <!-- 博彩声明 -->
        <GamblingState v-if="current == '2-1'" />
        <!-- 博彩责任 -->
        <ResponGambling v-if="current == '2-2'" />
        <!-- 用户协议 -->
        <Agreement v-if="current == '2-4'" />
        <!-- 条款条约 -->
        <TermTreat v-if="current == '2-5'" />
        <!-- 隐私条款 -->
        <PrivacyPolicy v-if="current == '2-6'" />
        <DrawalTutorial
          :title="helpMuneList[2].list.find((e) => e.id === current).title"
          v-if="DrawalList.find((e) => Number(e) == current)"
          :tuId="current"
        />
        <!--投注规则 -->
        <BettingRuletwo v-if="current == '3-3'" />
        <!-- 模拟投注 -->
        <Simulatbet v-if="current == '3-4'" />
        <!-- 盘口教程 -->
        <HandicapTutor v-if="current == '3-5'" />
        <!-- 体育赛果 -->
        <!-- <Sportoutcome v-if="current == '3-6'" /> -->
        <!-- 游戏规则 -->
        <SportGamerule v-if="helpMuneList[3].list.find((e) => e.id === current)" :tuId="current" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import { useRoute } from 'vue-router'
import GamblingState from './components/GamblingState/GamblingState.vue'
import ResponGambling from './components/ResponGambling/ResponGambling.vue'
import UserAgreement from './components/UserAgreementer/UserAgreementer.vue'
import Agreement from './components/Agreement/Agreement.vue'
import TermTreat from './components/TermTreat/TermTreat.vue'
import DrawalTutorial from './components/DrawalTutorialed/DrawalTutorialed.vue'
import BettingRuletwo from './components/BettingRuletwo/BettingRuletwo.vue'
import Simulatbet from './components/Simulatbet/Simulatbet.vue'
import HandicapTutor from './components/HandicapTutor/HandicapTutor.vue'
// import Sportoutcome from './components/Sportoutcome/Sportoutcome.vue'
import SportGamerule from './components/SportGamerule/SportGamerule.vue'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy.vue'
import { getTutorialListApi } from '@/api/announcement.js'

const route = useRoute()
const menus = ref(null)
const current = ref('')
const DrawalList = ref([])

const helpMuneList = reactive([
  {
    //关于我们
    title: i18n.global.t('HelpCenter.AboutUs'),
    path: new URL('./img/Frame1.png', import.meta.url).href,
    index: '1',
    list: []
  },
  {
    //企业事务
    title: i18n.global.t('HelpCenter.CorporateAffairs'),
    path: new URL('./img/Frame2.png', import.meta.url).href,
    index: '2',
    list: [
      { title: i18n.global.t('HelpCenter.GamblingStatement'), id: '2-1' },
      { title: i18n.global.t('HelpCenter.ResponsibleGambling'), id: '2-2' },
      { title: i18n.global.t('HelpCenter.UserAgreement'), id: '2-4' },
      { title: i18n.global.t('HelpCenter.TermsTreaty'), id: '2-5' },
      { title: i18n.global.t('HelpCenter.PrivacyPolicy'), id: '2-6' }
    ]
  },
  {
    //帮助中心
    title: i18n.global.t('HelpCenter.HelpCenter'),
    path: new URL('./img/Frame3.png', import.meta.url).href,
    index: '3',
    list: [
      { title: i18n.global.t('HelpCenter.BettingRules'), id: '3-3' },
      { title: i18n.global.t('HelpCenter.SimulatedBetting'), id: '3-4' },
      { title: i18n.global.t('HelpCenter.HandicapTutorial'), id: '3-5' }
      // { title: i18n.global.t('HelpCenter.SportsResults'), id: '3-6' }
    ]
  },
  {
    //游戏规则
    title: i18n.global.t('HelpCenter.GameRules'),
    path: new URL('./img/Frame4.png', import.meta.url).href,
    index: '4',
    list: [
      { title: i18n.global.t('HelpCenter.SportsGameRules'), id: '4-1' },
      { title: i18n.global.t('HelpCenter.LiveEntertainmentRules'), id: '4-2' },
      { title: i18n.global.t('HelpCenter.ElectronicgameRules'), id: '4-3' },
      { title: i18n.global.t('HelpCenter.LotterybetRules'), id: '4-4' }
    ]
  }
])
onMounted(async () => {
  await Promise.all([
    getTutorialListApi({ configType: '1' }),
    getTutorialListApi({ configType: '2' })
  ]).then((res) => {
    res.forEach((element, index) => {
      const { data } = element
      if (index) {
        helpMuneList[0].list = data
      } else {
        DrawalList.value = data.flatMap((e) => e.id)
        helpMuneList[2].list = data.concat(helpMuneList[2].list)
      }
    })

    switch (route.query.current) {
      case '1-1':
      case '2-3':
        current.value = helpMuneList[0].list[0]?.id
        break
      case '2-5':
        current.value = helpMuneList[0].list[1]?.id
        break
      case '3-1':
        current.value = helpMuneList[0].list[0]?.id
        break
      default:
        current.value = route.query.current
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.help-center {
  min-width: 1320px;
  max-width: 1320px;
  margin: 30px auto;

  :deep() {
    .el-sub-menu .el-sub-menu__icon-arrow {
      visibility: hidden;
    }
    .el-container {
      // width: 1320px;
      height: calc(100vh - 160px);
    }
    .el-aside {
      border-radius: 8px 0px 0px 8px;
      background-color: #2f3456;
      width: 260px !important;
    }
    .el-menu {
      border: 0 !important;
      padding-bottom: 16px;
    }
    .menu-title {
      font-weight: 500;
      margin-left: 8px;
    }
    .el-main {
      // width: 1080px;
      // height: calc(100vh - 0px);
      padding: 40px !important;
      border-radius: 0px 8px 8px 0px;
      background: #272b45;
      box-sizing: border-box;
    }
  }

  .label-item-box {
    height: 62px;
    line-height: 1.5;
    color: var(--60, rgba(255, 255, 255, 0.6));
    white-space: break-spaces !important;
    .label-box {
      padding-left: 8px;
    }
  }
}
.active {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
  color: var(--100, #fff) !important;
}
</style>
