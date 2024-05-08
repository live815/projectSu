<template>
  <div class="message-management-index">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('message.messageSendRecord')" name="1">
        <MessageSend v-if="activeName==='1'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.messageSendExceptionRecord')" name="2">
        <MessageSendException v-if="activeName==='2'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.messageSendSort')" name="3">
        <MessageSendSort v-if="activeName==='3'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('message.messageUsageTotal')" name="4">
        <MessageUsageTotal v-if="activeName==='4'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from "vue";
import MessageSend from "./components/MessageSend.vue";
import MessageSendException from "./components/MessageSendException.vue";
import MessageSendSort from "./components/MessageSendSort.vue";
import MessageUsageTotal from "./components/MessageUsageTotal.vue";

const activeName = ref("1");
</script>

<style lang="scss" scoped>
.message-management-index{
  padding:20px;
}
</style>