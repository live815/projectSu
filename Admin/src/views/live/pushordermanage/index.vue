<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('live.Anchorspushorders')" name="1">
        <AnchorPushorder v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.Playpushorder')" name="2">
        <PlayePushorder v-if="activeName == '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Pushordermanage">
import { ref } from "vue";
import AnchorPushorder from "./components/AnchorPushorder.vue";
import PlayePushorder from "./components/PlayePushorder.vue";

const activeName = ref("1");
const handleClick = (tab, event) => {
  activeName.value = toRaw(toRaw(tab).props).name;
};
</script>

<style lang="scss"></style>
