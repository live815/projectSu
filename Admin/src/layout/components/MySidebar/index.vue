<template>
  <!-- <p>{{ sidebarRouters }}</p> -->
  <div
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground,
    }"
  >
    <div class="main-menu-wrapper">
      <logo />
      <div class="list">
        <div
          v-for="(item, idx) in typeList"
          class="item"
          :class="{ active: currentIdx === idx }"
          @click="selectMenu(idx, item)"
        >
         
          <div>
            <svg-icon :icon-class="item.icon" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="sub-menu" :class="{ collapse: isCollapse }">
      <el-scrollbar
        wrap-class="scrollbar-wrapper"
        v-if="currentType.children && currentType.children.length"
      >
        <el-menu
          :default-active="activeMenu"
          background-color="transparent"
          :text-color="
            sideTheme === 'theme-dark'
              ? variables.menuColor
              : variables.menuLightColor
          "
          :unique-opened="true"
          :active-text-color="theme"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item
            v-for="(route, index) in currentType.children"
            :key="route.path + index"
            :item="route"
            :base-path="currentType.path + '/' + route.path"
          />
        </el-menu>
      </el-scrollbar>
      <template v-else>
        <div class="no-data">{{ $t('common.noChildMenu') }}</div>
      </template>

      <!-- 折叠菜单 -->
      <div class="fixed-switch" @click="appStore.toggleSideBar()">
        <!-- <el-button
          @click="appStore.toggleSideBar()"
          size="small"
          plain
          type="primary"
          :icon="appStore.sidebar.opened ? 'ArrowLeftBold' : 'ArrowRightBold'"
        ></el-button> -->
        <el-icon v-if="appStore.sidebar.opened"><ArrowLeft /></el-icon>
        <el-icon v-else><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "../Sidebar/Logo";
import SidebarItem from "../Sidebar/SidebarItem";
import useAppStore from "@/store/modules/app";

import useSettingsStore from "@/store/modules/settings";
import variables from "@/assets/styles/variables.module.scss";
import usePermissionStore from "@/store/modules/permission";
import { computed, watch } from "vue";
import { isExternal } from "@/utils/validate";
import { deepClone } from "@/utils";
const route = useRoute();
const appStore = useAppStore();
const isCollapse = computed(() => !appStore.sidebar.opened);
const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const permissionStore = usePermissionStore();
const sidebarRouters = computed(() => {
  let routes = permissionStore.sidebarRouters.filter((item) => {
    return !item.hidden;
  });
  return routes;
});
const typeList = computed(() => {
  return sidebarRouters.value.map((item) => {
    let icon = item.meta && item.meta.icon;
    let title = item.meta && item.meta.title.slice(0, 2);
    let noConfigPath = !/^\/.+/.test(item.path);
    let noMeta = !item.meta;
    if (noConfigPath || noMeta) {
      if (item.children) {
        icon = item.children[0].meta.icon;
        title = item.children[0].meta.title.slice(0, 2);
      }
    }
    return {
      icon,
      title,
      path: item.path,
    };
  });
});
const currentIdx = ref(0);
const currentType = computed(() => {
  return sidebarRouters.value[currentIdx.value];
});

function selectMenu(idx, item) {
  if (item && isExternal(item.path)) {
    window.open(item.path);
    return;
  }
  currentIdx.value = idx;
  appStore.openSideBar({ withoutAnimation: false });
}

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

// 初始化主菜单
function initMainMenuIdx() {
  const { path } = route;
  let idx = sidebarRouters.value.findIndex((item) => {
    let match_path = item.path;
    if (!/^\/.+/.test(item.path)) {
      match_path = item.children[0].path;
    }
    return path.startsWith(match_path);
  });
  // 匹配不到路由重置为首页
  if (idx < 0) {
    idx = 0;
  }
  selectMenu(idx);
}
initMainMenuIdx();
watch(route, initMainMenuIdx);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.no-data {
  text-align: center;
  margin-top: 20px;
  color: #999;
}
.fixed-switch {
  position: absolute;
  z-index: 99999;
  left: 199px;
  top: 50%;
  transition: all 0.28s;
  width: 12px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: #aaa;
  background-color: $base-menu-background;
  color: #fff;
  border-radius: 0 12px 12px 0;
  border-radius: 0 12px 12px 0;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
