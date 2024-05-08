<template>
  <div class="data-rank">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('report.winLoseRank')" name="1">
        <Rank :activeName="activeName" v-if="activeName==='1'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.rechargeWithdrawRank')" name="2">
        <Rank :activeName="activeName" v-if="activeName==='2'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('report.lobbyRank')" name="3">
        <Rank :activeName="activeName" v-if="activeName==='3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Data-rank">
import Rank from "@/views/report/datarank/components/Rank.vue";
import { ref } from "vue";

const route = useRoute();
const activeName = ref(route.query.activeTab ? route.query.activeTab : "1");
</script>

<style lang="scss" scoped>
.data-rank {
  padding: 20px;
}
</style>