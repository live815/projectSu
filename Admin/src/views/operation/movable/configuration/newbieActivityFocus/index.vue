<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <div class="active">
        {{ $t("operation.EventName") }}{{ $route.query.name }}
      </div>
      <el-tab-pane :label="$t('operation.Visitdetails')" name="1">
        <visitDetails v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.statistics')" name="2">
        <visitStatistics v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.activstatist')" name="3">
        <activityStatistics v-if="activeName == 3" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip136')" name="4">
        <activityTotalDetails v-if="activeName == 4" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip137')" name="5">
        <newbieGiftDetails v-if="activeName == 5" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip138')" name="7">
        <signGiftDetails v-if="activeName == 7" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip139')" name="8">
        <resurrectionGiftDetails v-if="activeName == 8" />
      </el-tab-pane>
      <el-tab-pane :label="$t('operation.tip140')" name="9">
        <newbieSignRecord v-if="activeName == 9" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import visitDetails from "./components/visitDetails.vue";
import visitStatistics from "./components/visitStatistics.vue";
import activityStatistics from "./components/activityStatistics.vue";
import activityTotalDetails from "./components/activityTotalDetails.vue";
import newbieGiftDetails from "./components/newbieGiftDetails.vue";
import signGiftDetails from "./components/signGiftDetails.vue";
import resurrectionGiftDetails from "./components/resurrectionGiftDetails.vue";
import newbieSignRecord from "./components/newbieSignRecord.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
.active {
  font-size: 20px;
  font-weight: bold;
}
</style>
