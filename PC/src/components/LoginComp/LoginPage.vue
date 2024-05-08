<template>
  <div>
    <div class="right-box">
      <div class="btn-row">
        <div
          class="btn-box"
          :class="loginMethod === 'account' ? 'active' : ''"
          @click="changeLogin('account')"
        >
          {{ $t('Components.Accountlogin') }}
        </div>
        <div
          class="btn-box"
          :class="loginMethod === 'phone' ? 'active' : ''"
          @click="changeLogin('phone')"
        >
          {{ $t('Components.MobilePhoneVerificationCodeLogin') }}
        </div>
      </div>
      <LoginAccount v-if="loginMethod === 'account'" />
      <LoginPhone v-if="loginMethod === 'phone'" />

      <div class="bottem-band">
        <!-- <div class="band">
          <div class="circle">
            <img src="./img/manchester.png" width="25" height="25" />
          </div>
          <span class="band-name">{{ $t('Components.PremierLeagueManchesterUnited') }}</span>
          <span class="band-detail">{{ $t('Components.GlobalSponsors') }}</span>
        </div> -->
        <div class="band">
          <div class="circle">
            <img src="./img/SerieA.png" width="40" height="40" />
          </div>
          <span class="band-name">{{ $t('Components.SerieA') }}</span>
          <span class="band-detail">{{ $t('Components.AsiaSponsor') }}</span>
        </div>
        <!-- <div class="band">
          <div class="circle">
            <img src="./img/munchen.png" width="25" height="25" />
          </div>
          <span class="band-name">{{ $t('Components.BundesligaBayernMunich') }}</span>
          <span class="band-detail">{{ $t('Components.AsiaSponsor') }}</span>
        </div> -->
      </div>
      <div class="contact">
        <span class="contact-text" @click="showChannels = true" @mouseleave="showChannels = false">
          <CSChannels :isServicePop="showChannels" style="top: -92px; left: -15px" />
          {{ $t('Components.ContactCustomerService') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginPhone from './LoginPhone.vue'
import LoginAccount from './LoginAccount.vue'
import CSChannels from '@/components/CSChannels'

const showChannels = ref(false)
const loginMethod = ref('account')
function changeLogin(v) {
  loginMethod.value = v
}
</script>

<style lang="scss" scoped>
.right-box {
  width: 442px;
  height: 100%;
  padding: 0 56px 0 56px;

  .btn-row {
    display: flex;
    width: 100%;
    height: 95px;
    padding-top: 55px;
    .btn-box {
      display: flex;
      margin-right: 30px;
      height: 40px;
      padding: 10px 20px 10px 20px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: var(--40, rgba(255, 255, 255, 0.4));

      font-size: 16px;
      font-weight: 400;
    }
    .active {
      border-radius: 200px;
      background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
      color: #fff !important;
    }
    .btn-box:hover {
      cursor: pointer;
    }
  }

  .bottem-band {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 124px;
    border-radius: 16px 8px 8px 16px;
    // background: rgba(255, 255, 255, 0.02);
  }
  .band {
    flex: 1;
    // display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    .circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-color: rgba(251, 251, 251, 0.1);
      border-radius: 50%;
      margin: 0 auto;
    }
    .band-name {
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      display: block;
      text-align: center;
      margin-top: 8px;
    }
    .band-detail {
      color: var(--20, rgba(255, 255, 255, 0.6));
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      display: block;
      text-align: center;
      margin-top: -4px;
    }
  }
  .contact {
    margin-top: 32px;
    height: 10px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .contact-text {
      position: relative;
      padding: 0 16px 0 16px;
      top: 1px;
      background-color: var(--unnamed, #232949);
      color: rgba(255, 255, 255, 0.4);

      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
}
</style>
