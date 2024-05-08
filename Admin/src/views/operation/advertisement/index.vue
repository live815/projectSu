<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('operation.tip14')" name="1">
        <Carousel v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip15')" name="2">
        <Activitys v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip16')" name="3">
        <Homepage v-if="activeName == 3" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip17')" name="4">
        <Startup v-if="activeName == 4" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip18')" name="5">
        <Levitate v-if="activeName == 5" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.Payadvert')" name="6">
        <Advertise v-if="activeName == 6" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.userCenter')" name="7">
        <Personal v-if="activeName == 7" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.breaknewsadvert')" name="8">
        <Announce v-if="activeName == 8" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

import Carousel from "./components/Carousel";
import Activitys from "./components/Activitys";
import Homepage from "./components/Homepage";
import Startup from "./components/Startup";
import Levitate from "./components/Levitate";
import Advertise from "./components/Advertise";
import Personal from "./components/Personal";
import Announce from "./components/Announce";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
