<template>
  <div class="outter-box">
    <transition name="fade">
      <div
        class="Secondary-menu"
        @mouseleave="mouseoutDebounced"
        v-show="showMenuSecondary && currentTab && subGameList?.length"
      >
        <MenuSecondary :subGameList="subGameList"></MenuSecondary>
      </div>
    </transition>

    <el-aside
      class="sidebar"
      :class="{
        foldWidth: isCollapse
      }"
    >
      <el-menu
        default-active="2"
        background-color="transparent"
        text-color="rgba(255, 255, 255, 0.60)"
        active-text-color="#fff"
        @select="select"
      >
        <el-menu-item index="1" class="logo">
          <img v-if="!isCollapse" class="logoImg" :src="imgLogo" />
          <img v-else class="small-logo" height="30" width="30" src="./img/vi/small_logo.png" />
        </el-menu-item>

        <el-menu-item
          :index="'/'"
          class="label-item-box"
          :class="{ active: currentRouter.path === '/' }"
        >
          <div class="label-box">
            <img
              width="30"
              height="30"
              :src="imagesMap.homePage"
              :class="{ 'icon-active': currentRouter.path === '/' }"
            />
            <div class="label-text" :class="{ 'label-active': currentRouter.path === '/' }">
              <template v-if="getLocalLanguage() === 'zh-cn'">
                <span
                  v-for="(ite, idx) in handleLabel($t('Components.FrontPage'))"
                  :key="idx"
                  class="spacing"
                  >{{ ite }}</span
                >
              </template>
              <span v-else>{{ $t('Components.FrontPage') }}</span>
            </div>
          </div>
        </el-menu-item>
        <el-menu-item
          v-for="item in appStore.gameTypeList"
          :key="item.id"
          class="label-item-box"
          :class="{ active: item.path == currentRouter.path }"
          @mouseenter="mouseenterDebounced(item.id)"
        >
          <div class="label-box">
            <img width="30" height="30" :src="getImgUrl(item.pcLobbyIconTab)" />
            <div class="label-text" :class="{ 'label-active': item.path == currentRouter.path }">
              <template v-if="getLocalLanguage() === 'zh-cn'">
                <span
                  v-for="(ite, idx) in handleLabel(item.lobbyName)"
                  :key="idx"
                  class="spacing"
                  >{{ ite }}</span
                >
              </template>
              <span v-else>{{ item.lobbyName }}</span>
            </div>
          </div>
        </el-menu-item>
        <div class="fillbox"></div>
        <el-menu-item
          v-for="item in selectList"
          :key="item.id"
          :index="item.path"
          class="label-item-box"
          :class="{ active: item.path == currentRouter.path }"
          @click="demo(item)"
        >
          <div class="label-box">
            <img
              width="30"
              height="30"
              :class="{ 'icon-active': item.path == currentRouter.path }"
              :src="item.icon"
            />
            <div class="label-text" :class="{ 'label-active': item.path == currentRouter.path }">
              <template v-if="getLocalLanguage() === 'zh-cn'">
                <span
                  v-for="(ite, idx) in handleLabel(item.label)"
                  :key="idx"
                  :class="{ spacing: handleLabel(item.label).length < 3 }"
                  >{{ ite }}</span
                >
              </template>
              <span v-else>{{ item.label }}</span>
            </div>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script setup>
const demo = (v) => {
  if (v.path == ' ') {
    ElMessage('开发中...')
  }
}
import i18n from '@/i18n'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getLocalLanguage } from '@/utils/cache.js'
import { useAppStore } from '@/stores/app'
import { getImgUrl } from '@/utils'
import { useUserStore } from '@/stores/user.js'
import MenuSecondary from '@/components/MenuSecondary'
import { onUnmounted } from 'vue'
const appStore = useAppStore()
const user = useUserStore()
const router = useRouter()
let currentRouter = useRoute()
const imgLogo = computed(() => {
  return new URL(`./img/${appStore.language}/logo.png`, import.meta.url).href
})
const req = import.meta.glob('./img/*.*', { eager: true })
const imagesMap = {}
for (const key in req) {
  let name = key.split('/').slice(-1)[0].split('.')[0]
  imagesMap[name] = req[key].default
}
const isCollapse = ref(false)
const showMenuSecondary = ref(false)
const currentTab = ref()

function mouseenter(n) {
  if (!isCollapse.value) {
    currentTab.value = n
    showMenuSecondary.value = true
  }
}
// 防抖函数
const debounce = (func, delay) => {
  let timerId

  return function () {
    const context = this
    const args = arguments

    // 清除之前的定时器
    clearTimeout(timerId)

    // 设置新的定时器
    timerId = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

const mouseenterDebounced = debounce(mouseenter, 200)

function mouseout() {
  showMenuSecondary.value = false
}
const mouseoutDebounced = debounce(mouseout, 300)
eventBus.on('expandCollapseMenu', () => {
  isCollapse.value ? (isCollapse.value = false) : (isCollapse.value = true)
})
onUnmounted(() => {
  eventBus.off('expandCollapseMenu')
})
const handleLabel = (string) => {
  return string?.split('')
}

const otherLabel = ref([
  {
    id: 8,
    label: i18n.global.t('Components.sponsor'),
    icon: imagesMap.sponsor,
    path: '/sponsor'
  },
  {
    id: 9,
    label: i18n.global.t('Components.Promotions'),
    icon: imagesMap.discount,
    path: '/activity'
  },
  {
    id: 10,
    label: i18n.global.t('Components.VIPcenter'),
    icon: imagesMap.vipCenter,
    path: '/personal/4'
  },
  {
    id: 11,
    label: i18n.global.t('Components.APPdownload'),
    icon: imagesMap.appDown,
    path: '/AppDownload'
  }
])
const otherAnchor = ref([
  {
    id: 8,
    label: i18n.global.t('Components.sponsor'),
    icon: imagesMap.sponsor,
    path: '/sponsor'
  },
  {
    id: 11,
    label: i18n.global.t('Components.APPdownload'),
    icon: imagesMap.appDown,
    path: '/AppDownload'
  }
])
const selectList = computed(() => {
  if (user.userInfo.userName) {
    if (user.userInfo.role === 0) {
      return otherLabel.value
    } else {
      return otherAnchor.value
    }
  } else {
    return otherLabel.value
  }
})
const subGameList = computed(() => {
  if (appStore.gameTypeList) {
    let temp = appStore.gameTypeList.filter((item) => {
      return item.id == currentTab.value
    })
    return temp[0]?.gameList.length ? temp : []
  } else {
    return []
  }
})

function select(key) {
  if (!key) {
    // ElMessage(i18n.global.t('Components.Notice_24'))
    console.log()
  } else if (key == 1) {
    router.push('/sports')
  } else {
    router.push(key)
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1450px) {
  .el-menu li {
    zoom: 0.9;
  }
}

.outter-box {
  position: relative;

  .Secondary-menu {
    position: fixed;
    padding-top: 80px;
    top: 0;
    left: 200px;
    z-index: 2008;
    width: 230px;
    height: 100vh;
  }
}

.logo {
  height: 90px !important;
  // margin-bottom: 30px !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  .logoImg {
    width: 168.5px;
    height: 50px;
    margin-top: 8px;
    margin-right: 6px;
  }
}

.small-logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-right: 10px;
  // left: -30px;
}

.active {
  background-image: url(./img/tabBG.png) !important;
  background-size: cover !important;
}

.label-box {
  display: flex;
  align-items: center;

  .label-text {
    margin-left: 24px;
    color: var(-----60, rgba(255, 255, 255, 0.6));
    font-size: 17px;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    // max-width: 108px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    .spacing {
      margin-right: 25px;
    }
  }

  .icon-active {
    filter: brightness(150%);
  }
}

.label-active {
  color: var(-----100, #fff) !important;
}

.label-active {
  color: var(-----100, #fff) !important;
}

.label-item-box:hover div {
  color: var(-----100, #fff) !important;
}
.label-text:hover {
  color: var(-----100, #fff) !important;
}

.sidebar {
  position: fixed;
  height: 100vw;
  top: -10px;
  width: 200px;
  transition: Width 0.5s;
  z-index: 10;
}

.foldWidth {
  width: 60px;
  transition: Width 0.5s;
}

.el-menu {
  border-right: none;
  height: 110vh;
  background: linear-gradient(142deg, rgba(27, 51, 81, 0.2) 19.63%, rgba(155, 97, 149, 0.2) 83.01%);
  box-shadow: inset 0px 10px 2px 0px rgb(28, 27, 50, 1);
  backdrop-filter: blur(30px);
}

.label-item-box {
  height: 43px;
  margin-bottom: 10px;
  background-blend-mode: overlay;
  background-image: url(./img/tabBGunact.png);
  background-position: -2px top;

  &:hover {
    background-image: url(./img/tabBG.png) !important;
    background-size: cover !important;
  }
}

.fillbox {
  height: 30px;
}
</style>
