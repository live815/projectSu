<template>
  <el-dropdown @command="handleCommand">
    <span class="current">
      <img width="24" :src="getCurrentLangIcon()" alt="" />
      <!-- <span>{{ getCurrentLang() }}</span> -->
      <el-icon><caret-bottom /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langList"
          :key="item.value"
          :command="item.value"
          :disabled="item.value === appStore.language"
        >
          <img style="margin-right: 5px" width="20" :src="item.icon" alt="" />
          <span>{{ item.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { langList, setLanguageAsync } from "@/i18n";
import useAppStore from "@/store/modules/app";
import { inject } from "vue";
const appStore = useAppStore();
const reload = inject("reload");
function handleCommand(lang) {
  appStore.language = lang;
  setLanguageAsync(lang).then(() => {
    reload();
  });
}
function getCurrentLangIcon() {
  return langList.find((lang) => lang.value === appStore.language)?.icon;
}
function getCurrentLang() {
  return langList.find((lang) => lang.value === appStore.language)?.title;
}
</script>

<style lang="scss" scoped>
.current {
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 16px;
    border: 1px solid #eee;
    padding: 4px 12px;
  }
}
</style>
