<!-- 投注规则 -->
<template>
  <div class="bettingRule">
    <p>{{ $t('HelpCenter.BettingRules') }}</p>
    <div class="rule-box">
      <div
        class="box-btn"
        :class="{ active: item.index == current }"
        v-for="item in tabList"
        :key="item.index"
        @click="handleClick(item.index)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="content-box">
      <GeneralRules v-if="current == '1'" />
      <TotalRules v-if="current == '2'" />
    </div>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
import GeneralRules from './components/GeneralRule.vue'
import TotalRules from './components/TotalRules.vue'

const current = ref('1')
const tabList = ref([
  { label: i18n.global.t('HelpCenter.GeneralRules'), index: '1' },
  { label: i18n.global.t('HelpCenter.AllRules'), index: '2' }
])

function handleClick(index) {
  current.value = index
}
</script>

<style lang="scss" scoped>
.bettingRule {
  color: var(--60, rgba(255, 255, 255, 0.6));
  p {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: normal;
    font-style: normal;
  }
  .rule-box {
    display: flex;
    margin: 30px 0 30px 0;
    .box-btn {
      min-width: 76px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #52556a;
      border-radius: 6px;
      text-align: center;
      margin-right: 20px;
      padding: 0 12px;
    }
  }
}
.active {
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%)) !important;
  color: var(--100, #fff) !important;
  border: none;
}
</style>
