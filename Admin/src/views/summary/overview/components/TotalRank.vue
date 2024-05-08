<template>
  <div class="total-rank">
    <div class="content-rank">
      <TotalRankChild :title="$t('summary.playerProfitRank')" :status="1"></TotalRankChild>
      <TotalRankChild :title="$t('summary.playerLossesRank')" :status="2"></TotalRankChild>
      <TotalRankChild :title="$t('summary.lobbyProfitRank')" :status="3"></TotalRankChild>
      <TotalRankChild :title="$t('summary.lobbyLossesRank')" :status="4"></TotalRankChild>
    </div>
  </div>
</template>

<script setup>
import TotalRankChild from './TotalRankChild.vue';
</script>

<style lang="scss" scoped>
.total-rank{
  margin-top:20px;
  .content-rank{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px 20px;
  }
}
</style>