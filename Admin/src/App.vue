<template>
  <router-view v-if="isRouteAlive" />
</template>

<script setup>
import useSettingsStore from "@/store/modules/settings";
import { handleThemeStyle } from "@/utils/theme";
const isRouteAlive = ref(true);
provide("reload", () => {
  isRouteAlive.value = false;
  nextTick(() => {
    isRouteAlive.value = true;
  });
});
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme);
  });
});
</script>
