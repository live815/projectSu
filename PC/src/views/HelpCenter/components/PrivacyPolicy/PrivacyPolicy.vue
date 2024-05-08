<template>
    <div class="PrivacyPolicy-view">
        <p>{{$t('HelpCenter.PrivacyPolicy')}}</p>
        <div class="item-box">
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_1')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_2')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_3')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_4')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_5')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_6')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_7')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_8')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_9')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_10')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_11')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_12')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_13')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_14')}}</div>
            <div class="item-title">{{$t('HelpCenter.PrivacyPolicyTips_15')}}</div>
            <div class="item-text">{{$t('HelpCenter.PrivacyPolicyTips_16')}}</div>
            
        </div>
    </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.PrivacyPolicy-view{
    color: var(--60, rgba(255, 255, 255, 0.6));
    font-size: 16px;
    p {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 32px;
        line-height: normal;
        color: #fff;
    }
    .item-box {
        margin-bottom: 32px;
        line-height: 26px;
        .item-title {
        font-weight: 500;
        margin-bottom: 16px;
        color: #fff;
        }
        .item-text {
        line-height: 26px;
        margin-bottom: 16px;
        }
        .mgbom {
        margin: 16px 0 40px 0px;
        }
    }
}
</style>