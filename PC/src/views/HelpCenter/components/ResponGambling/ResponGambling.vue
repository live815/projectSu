<template>
  <div class="responGambling">
    <p>{{ $t('HelpCenter.ResponsibleGambling') }}</p>
    <!-- <div class="item-box">
      {{ $t('HelpCenter.ResponGamblingTips_1') }}
    </div> -->
    <div class="item-box">
      {{ $t('HelpCenter.ResponGamblingTips_2') }}
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.ResponGamblingTips_3') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.ResponGamblingTips_4') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_5') }}<br />{{ $t('HelpCenter.ResponGamblingTips_6')
        }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_7') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_8') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_9') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_10') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_11') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_12') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_13') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_14') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_15') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_16') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_17') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_18') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_19') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_20') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_21') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_31') }}<br />
        
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.ResponGamblingTips_22') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.ResponGamblingTips_23') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_24') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_25') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_26') }}<br />
        {{ $t('HelpCenter.ResponGamblingTips_27') }}
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">{{ $t('HelpCenter.ResponGamblingTips_28') }}</div>
      <div class="item-text">
        {{ $t('HelpCenter.ResponGamblingTips_29') }}<br />
        <div class="item-text mgbom">{{ $t('HelpCenter.ResponGamblingTips_30') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.responGambling {
  font-size: 16px;
  color: #ffffff;
  
  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 30px;
    line-height: normal;
  }
  .item-box {
    margin-bottom: 32px;
    line-height: 26px;
    color: var(-----60, rgba(255, 255, 255, 0.6));
    .item-title {
      font-weight: 500;
      margin-bottom: 16px;
      color: #ffffff !important;
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
