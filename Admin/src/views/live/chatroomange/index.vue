<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('live.Banrecord')" name="1">
        <BanRecord v-if="activeName == '1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.ChatroomConfigurat')" name="2">
        <BlockRecord v-if="activeName == '2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.tip1013')" name="3">
        <ChatroomConfit v-if="activeName == '3'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('live.BlockRecord')" name="4">
        <SensitiveConfit v-if="activeName == '4'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Chatroomange">
import { ref } from "vue";
import BanRecord from "./components/BanRecord.vue";
import BlockRecord from "./components/BlockRecord.vue";
import ChatroomConfit from "./components/ChatroomConfit.vue";
import SensitiveConfit from "./components/SensitiveConfit.vue";

const activeName = ref("1");
const handleClick = (tab, event) => {
  activeName.value = toRaw(toRaw(tab).props).name;
};
</script>

<style lang="scss"></style>
