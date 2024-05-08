<template>
  <div class="sub-game">
    <NavBar border :isBack="false" @onClickLeft="backHome" :isShowRight="false">
      <template #left>
        <span class="title">{{ title }}</span>
      </template>
      <template #right>
        <div class="boxRight">
          <div class="money">
            <div style="display: flex; align-items: center">
              <div class="bg"><CurrencyUnit /></div>
              <div class="txt">
                <Amount />
              </div>
            </div>
          </div>
          <Refresh />
        </div>
      </template>
    </NavBar>
    <div class="v-search-wrapper">
      <!-- 線路 -->
      <div class="tabList">
        <div
          class="tab-search"
          :class="{ active: lineType === item.type }"
          v-for="item in LineTypeList"
          :key="item.id"
          @click="lineType = item.type"
        >
          {{ item.name }}
        </div>
      </div>
      <IconSearch @click="onSearch" />
    </div>
    <!-- 電子類型 -->
    <van-tabs v-model:active="slotType" @click-tab="onClickTab">
      <van-tab
        v-for="(item, index) of gameSlotTypeList"
        :key="index"
        :title="item.name"
        :name="item.type"
      ></van-tab>
    </van-tabs>
    <van-popup :show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
      <SubSearch :showRight="showRight" :dataList="filterGameList" @seachBtn="seachBtn" />
    </van-popup>
    <div class="list" v-if="filterGameList.length">
      <SubList :dataList="filterGameList" />
    </div>
    <NoResult v-else :noTxt="$t('SubgameView.Nodata')" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { getSubGameListApi } from '@/api/game'
import SubSearch from './components/SubSearch.vue'
import SubList from './components/SubList.vue'
import NoResult from './components/NoResult.vue'
import { useSlotGameStore } from '@/stores/slotGame'
import { useRouterStore } from '@/stores/router'
import { showLoadingToast } from 'vant'
import i18n from '@/i18n'
const routerStore = useRouterStore()
const slotGameStore = useSlotGameStore()
const LineTypeList = ref([
  { type: 0, name: i18n.global.t('SubgameView.all') },
  { type: 1, name: i18n.global.t('SubgameView.name1') },
  { type: 2, name: i18n.global.t('SubgameView.name2') },
  { type: 3, name: i18n.global.t('SubgameView.name3') }
])
const gameSlotTypeList = ref([
  { type: 0, name: i18n.global.t('SubgameView.all') },
  { type: 100, name: i18n.global.t('SubgameView.collect') },
  { type: 1, name: i18n.global.t('SubgameView.name4') },
  { type: 2, name: i18n.global.t('SubgameView.name5') },
  { type: 3, name: i18n.global.t('SubgameView.name6') },
  { type: 4, name: i18n.global.t('SubgameView.boardgames') },
  { type: 5, name: i18n.global.t('SubgameView.arcadegames') }
])
const lineType = ref(0)
const route = useRoute()
const router = useRouter()
const id = route.params.id
const title = route.query.title
const gameList = ref([])
const slotType = ref(0)
const showRight = ref(false)

// 过滤游戏列表
const filterGameList = computed(() => {
  const allLines = !lineType.value // 全部线路类型
  const allSlotName = !slotType.value //全部电子类型
  const isCollectType = slotType.value === 100
  if (isCollectType) {
    // 获取收藏列表
    return gameList.value.filter((game) => slotGameStore.collectIds.includes(game.id))
  } else {
    return gameList.value.filter(
      (game) =>
        // 线路过滤
        (game.lineType === lineType.value || allLines) &&
        // 电子类型过滤
        (slotType.value == game.slotType || allSlotName)
    )
  }
})

// 获取电子游戏列表
fetchSubGameList()
function fetchSubGameList() {
  const loading = showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  getSubGameListApi(id)
    .then((res) => {
      loading.close()
      let list = res.data || []
      // 处理线路分类
      list.forEach((game) => {
        game.lineType = getLineType(Number(game.line))
      })
      gameList.value = list
    })
    .catch(() => {
      loading.close()
    })
}

function getLineType(line) {
  if (line >= -1 && line <= 20) {
    return 1
  }
  if (line >= 21 && line <= 50) {
    return 2
  }
  if (line >= 51) {
    return 3
  }
}

const onSearch = () => {
  showRight.value = true
}
const seachBtn = () => {
  showRight.value = false
}
const onClickTab = (type) => {
  slotType.value = type.name
}
function backHome() {
  routerStore.setIsBackStatus(true)
  router.push('/')
}
</script>

<style lang="scss" scoped>
.v-search-wrapper {
  background: #fff;
  @include mobile-padding();
  padding: 10px 15px;
  display: flex;
  align-items: center;

  .tabList {
    width: 100%;
    display: flex;
    overflow-x: auto;
  }

  .tab-search {
    // width: 70px;
    // flex-basis: 70px;
    white-space: nowrap;
    flex-shrink: 0;
    height: 28px;
    background-color: #eeeeee;
    color: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 60px;
    float: left;
    padding: 10px 10px;
    border: 1px solid transparent;
  }

  .active {
    border-radius: 60px;
    border: 0.5px solid #ff5000;
    background: #fff5f0;
    color: #ff5000;
  }
}

.tabTxt {
  background-color: #fff;
  display: flex;
  padding: 13px 15px;
}

.list {
  width: calc(100% - 14px);
  margin: 0 6.5px 0 6.5px;
}
.title {
  margin-left: 5px;
  font-size: 16px;
  color: var(--color-text-second-dark);
}
.boxRight {
  display: flex;
  align-items: center;
}

.boxRight .money {
  padding: 0 12px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 60px;
  border: 1px solid #eee;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boxRight .bg {
  width: 17px;
  height: 17px;
  background: linear-gradient(93deg, #ff9000 0%, #ff5000 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.boxRight .txt {
  color: #111;
  text-align: center;
  font-family: DIN Alternate;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  /* 160% */
  margin-left: 4px;
}

@include tabStyle();
</style>
