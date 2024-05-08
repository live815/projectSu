<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('live.Anchorlivebroad')" name="1">
        <AnchorStream v-if="activeName == '1'" />
      </el-tab-pane>
      <!-- <el-tab-pane label="卫星直播" name="2">
        <SatellitAnchor v-if="activeName == '2'" />
      </el-tab-pane> -->
      <el-tab-pane :label="$t('live.endlivebroad')" name="3">
        <EndAnchor v-if="activeName == '3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Anchormange">
import { ref, toRaw } from "vue";
import AnchorStream from "./components/AnchorStream.vue";
import EndAnchor from "./components/EndAnchor.vue";

const activeName = ref("1");
const handleClick = (tab, event) => {
  activeName.value = toRaw(toRaw(tab).props).name;
};
</script>

<style lang="scss"></style>
