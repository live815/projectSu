<template>
  <div class="member-list">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('member.allPlayer')" name="1">
        <AllPlayer v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.playerLimit')" name="2">
        <PlayerLimit v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('member.playerLabel')" name="3">
        <PlayerLabel v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Group-list">
import { ref } from 'vue';
import AllPlayer from './components/AllPlayer.vue'
import PlayerLimit from './components/PlayerLimit.vue';
import PlayerLabel from './components/PlayerLabel.vue';

const activeName = ref('1')
</script>

<style lang="scss" scoped>
.member-list{
  padding:20px;
}
</style>