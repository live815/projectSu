<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('friends.invitedList')" name="1">
        <InvitedList v-if="activeName==='1'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('friends.inviterList')" name="2">
        <InviterList v-if="activeName==='2'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('member.firstReviewWait')" name="3">
        <FirstReview v-if="activeName==='3'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('member.secondReviewWait')" name="4">
        <SecondReview v-if="activeName==='4'"/>
      </el-tab-pane>
      <el-tab-pane :label="$t('member.alreadyReview')" name="5">
        <AlreadyReview v-if="activeName==='5'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from "vue";
import InviterList from "./components/inviterList.vue";
import InvitedList from "./components/invitedList.vue";
import FirstReview from "./components/FirstReview.vue";
import SecondReview from "./components/SecondReview.vue";
import AlreadyReview from "./components/AlreadyReview.vue";

const activeName = ref("1");
</script>

<style lang="scss">
.member-manage-friend {
  padding: 20px;
}
</style>
