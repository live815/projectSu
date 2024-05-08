<template>
  <div class="main-container">
    <NavBar
      :title="$t('Hletter.CommonTutorials')"
      v-if="!isCTYWebApp() && !isIOSPure() && !token"
    />
    <div class="item-container" v-for="(item, index) in tutorialList" :key="index">
      <van-collapse v-model="activeNames" :accordion="true">
        <van-collapse-item :title="item.title" :name="index" title-class="title-text" size="large">
          <van-cell
            :title="subItem.tabName"
            is-link
            v-for="(subItem, subIndex) in tutorialSubList[index]"
            :key="subIndex"
            @click="toSubHelp(subItem.id)"
          />
        </van-collapse-item>
      </van-collapse>
    </div>
    <router-link
      :to="{
        path: '/BetRule',
        query: {
          token: token
        }
      }"
      class="item-container"
    >
      <van-collapse v-model="btn">
        <van-collapse-item :title="$t('Hletter.BetRules')" title-class="title-text" size="large">
        </van-collapse-item>
      </van-collapse>
    </router-link>
    <router-link
      :to="{
        path: '/BetMock',
        query: {
          token: token
        }
      }"
      class="item-container"
    >
      <van-collapse v-model="btn">
        <van-collapse-item :title="$t('Hletter.SimulatBet')" title-class="title-text" size="large">
        </van-collapse-item>
      </van-collapse>
    </router-link>

    <!-- <div class="item-box">
      <van-cell
        :title="item.title"
        is-link
        size="large"
        v-for="(item, index) in fixedData"
        :key="index"
      >
        <template #icon>
          <img :src="item.icon" height="27" width="22" style="margin-right: 10px" />
        </template>
      </van-cell>
    </div> -->
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/NavBar.vue'
import { getTutorialListApi, getTutoriaSublListApi } from '@/api/announcement.js'
import { useRouter, useRoute } from 'vue-router'
import i18n from '@/i18n'
import { isCTYWebApp, isIOSPure } from '@/utils'
import { useMobileEvent } from '@/hooks/useMobileEvent'
const { token } = useMobileEvent()

const router = useRouter()
const route = useRoute()
const activeNames = ref('1')
const btn = ref([])
onMounted(async () => {
  getTutorialList()
  if (route.query.activeNames) {
    activeNames.value = Number(route.query.activeNames)
  }
})

//获取一级菜单列表
const tutorialList = ref('1')
const getTutorialList = () => {
  getTutorialListApi({ configType: '1' }).then((res) => {
    tutorialList.value = res.data
    getTutoriaSublList()
  })
}
// 获取二级菜单
const tutorialSubList = ref([])
const getTutoriaSublList = async () => {
  for (const item of tutorialList.value) {
    const res = await getTutoriaSublListApi({ tuId: item.id })
    tutorialSubList.value.push(res.data)
  }
}
// 跳转至教程详情
const toSubHelp = (id) => {
  router.push({
    path: 'helpsub',
    query: {
      id,
      token: token
    }
  })
}
const fixedData = ref([
  {
    title: i18n.global.t('Hletter.BetTutorial'),
    icon: new URL('./img/bet_tutorial.png', import.meta.url).href,
    path: ''
  },
  {
    title: i18n.global.t('Hletter.BetRules'),
    icon: new URL('./img/bet_rule.png', import.meta.url).href,
    path: ''
  },
  {
    title: i18n.global.t('Hletter.SimulatBet'),
    icon: new URL('./img/mock_bet.png', import.meta.url).href,
    path: ''
  },
  {
    title: i18n.global.t('Hletter.HandicapTutorial'),
    icon: new URL('./img/handicap_tutorial.png', import.meta.url).href,
    path: ''
  },
  {
    title: i18n.global.t('Hletter.SportsResults'),
    icon: new URL('./img/sprt_resoutl.png', import.meta.url).href,
    path: ''
  }
])
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.item-container {
  width: 360px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
}

.item-box :deep() {
  .van-cell__title {
    span {
      color: #111;

      font-size: 15px;
      font-weight: 400;
      line-height: 28px;
    }
  }
}
:deep() {
  .title-text {
    font-size: 17px;
  }
}
</style>
