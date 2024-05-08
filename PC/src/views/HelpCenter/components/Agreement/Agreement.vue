<template>
    <div class="Agreement-view">
        <div>
            <p>{{ $t('HelpCenter.UserAgreement') }}</p>
            <div class="item-text">
            {{ $t('HelpCenter.UserAgreementTips_1') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_2') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_3') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_4') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_5') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_6') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_7') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_8') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_9') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_10') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_11') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_12') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_13') }}<br />
            {{ $t('HelpCenter.UserAgreementTips_14') }}<br />
            </div>
      </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.Agreement-view{
    color: #ffffff;
  
  p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
    line-height: normal;
  }
  .item-text {
    line-height: 28px;
    text-align: justify;
    font-size: 16px;
    color: var(-----60, rgba(255, 255, 255, 0.6)) !important;
  }
}
</style>