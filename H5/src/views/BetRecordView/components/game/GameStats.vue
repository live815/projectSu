<template>
  <div class="game-stats">
    <!-- <p class="total">
      总计:<span style="margin-left: 8px">{{ totalOrderCount || 0 }}单</span>
    </p>
    <p class="win-lose">
      <span>投注额：</span>
      <span class="mr-4">{{ totalOrderAmount || 0 }}</span>
      <span>输赢：</span>
      <span class="mr-4">{{ totalProfitAmount || 0 }}</span>
      <span>有效流水：</span>
      <span class="mr-4">{{ totalValidFlow || 0 }}</span>
    </p> -->
    <div>
      <p>
        <span class="label">{{ $t('BetrecordView.Total') }}</span>
        <span class="primary">{{
          $t('BetrecordView.ListNumber', { num: totalOrderCount || 0 })
        }}</span>
      </p>
      <p>
        <span class="label">{{ $t('BetrecordView.WinLose') }}:</span>
        <span class="num">{{ totalProfitAmount || 0 }}</span>
      </p>
    </div>
    <div>
      <p>
        <span class="label">{{ $t('BetrecordView.BetAmount2') }}</span>
        <span class="num">{{ totalOrderAmount || 0 }}</span>
      </p>
      <p>
        <span class="label">{{ $t('BetrecordView.EffectiveFlow') }}:</span>
        <span class="num">{{ totalValidFlow || 0 }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalOrderAmount: {
    type: Number,
    default: 0
  },
  totalOrderCount: {
    type: Number,
    default: 0
  },
  totalProfitAmount: {
    type: Number,
    default: 0
  },
  totalValidFlow: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.game-stats {
  & > div {
    display: flex;
    p {
      flex: 1;
      line-height: 1.5;
      .label {
        color: var(--color-text-light);
        font-size: 12px;
        margin-right: 5px;
      }
      .num {
        color: var(--color-text-dark);
      }
    }
  }
}
</style>
