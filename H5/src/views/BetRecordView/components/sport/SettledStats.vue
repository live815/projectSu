<template>
  <div class="settled-list">
    <div class="list-header-title">
      <span class="total-title"
        >{{ $t('BetrecordView.TotalListNum', { numtwo: settledTotal }) }}
      </span>
      <p class="bet-title">
        <!-- 总计单数 -->
        <span>{{ $t('BetrecordView.Total') }}{{ Total || 0 }}</span>
        <!-- 投注额 -->
        <span>{{ $t('BetrecordView.BetAmount') }}:{{ betSize || 0 }}</span>
        <!-- 输赢 -->
        <span>{{ $t('BetrecordView.WinLose') }}:{{ loseWin || 0 }}</span>
        <!-- 有效流水 -->
        <span>{{ $t('BetrecordView.EffectiveFlow') }}:{{ validBet || 0 }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['betSts', 'settledTotal'])
const Total = computed(() => props.betSts.totalOrderCount)
const betSize = computed(() => props.betSts.totalOrderAmount)
const loseWin = computed(() => props.betSts.totalProfitAmount)
const validBet = computed(() => props.betSts.totalValidFlow)
</script>

<style lang="scss" scoped>
.settled-list {
  margin-bottom: 8px;
  .list-header-title {
    padding-left: 8px;
    .total-title {
      color: var(--color-primary);

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      border-radius: 50px;
      background: #eee;
      padding: 3px 10px;
    }
    .bet-title {
      color: #999;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      margin-top: 4px;
      display: inline-block;
      display: flex;
      flex-direction: row;
      span{
        padding-right: 10px;
        display: inline-block;
      }
    }
  }
}
</style>
