<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知" name="1">
        <Notification v-if="activeName == 1" />
      </el-tab-pane>
      <el-tab-pane label="活动" name="2">
        <Activity v-if="activeName == 2" />
      </el-tab-pane>
      <el-tab-pane label="公告" name="3">
        <Announcement v-if="activeName == 3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import Notification from "./components/Notification.vue";
import Activity from "./components/Activity.vue";
import Announcement from "./components/Announcement.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped></style>
