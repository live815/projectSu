<!-- 常规规则 -->
<template>
  <div class="generalRules">
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.GeneralRulesTitle_1') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.GeneralRulesTips_1') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_2') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_3') }}<br />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.GeneralRulesTitle_2') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.GeneralRulesTips_4') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_5') }}<br />
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.GeneralRulesTitle_3') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.GeneralRulesTips_6') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_7') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_8') }}
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.GeneralRulesTitle_4') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.GeneralRulesTips_9') }} <br />
        {{ $t('HelpCenter.GeneralRulesTips_10') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_11') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_12') }}<br />
        {{ $t('HelpCenter.GeneralRulesTips_13') }}
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.generalRules {
  color: #ffffff;
  font-size: 16px;
  .item-box {
    margin-bottom: 32px;
    line-height: 26px;
    .item-title {
      font-weight: 500;
      margin-bottom: 16px;
    }
    .item-text {
      color: var(--60, rgba(255, 255, 255, 0.6));
      line-height: 26px;
    }
    .mgbom {
      margin-top: 16px;
    }
  }
}
</style>
