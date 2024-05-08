<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('friends.friendRecommend')" name="1">
        <FriendManage v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('friends.turnoverDivide')" name="2">
        <FriendRecord v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('friends.friendVIPAward')" name="3">
        <FriendAward v-if="activeName==='3'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('friends.friendInviteLink')" name="4">
        <InviteLink v-if="activeName==='4'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Friends">
import { ref } from "vue";
import FriendManage from "./components/FriendManage.vue";
import FriendRecord from "./components/FriendRecord.vue";
import FriendAward from "./components/FriendAward.vue";
import InviteLink from "./components/inviteLink.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
