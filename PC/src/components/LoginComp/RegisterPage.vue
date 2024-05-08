<template>
  <div class="right-box">
    <div class="header" v-if="registerStepNum">{{ $t('Components.createAccount') }}</div>
    <div class="btn-row" v-else>
      <div
        class="btn-box"
        :class="loginMethod === 'account' ? 'active' : ''"
        @click="changeLogin('account')"
      >
        {{ $t('Components.RegisterAnAccount') }}
      </div>
      <div
        class="btn-box"
        :class="loginMethod === 'phone' ? 'active' : ''"
        @click="changeLogin('phone')"
      >
        {{ $t('Components.MobilePhoneVerificationCodeRegistration') }}
      </div>
    </div>
    <RegisterAccount v-if="loginMethod === 'account'"></RegisterAccount>
    <RegisterPhone v-if="loginMethod === 'phone'" v-model="registerStepNum"></RegisterPhone>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegisterAccount from './RegisterAccount.vue'
import RegisterPhone from './RegisterPhone.vue'

const loginMethod = ref('account')
const registerStepNum = ref(false)

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
  .header {
    text-align: center;
    color: var(--60, rgba(255, 255, 255, 0.6));
    
    font-size: 22px;
    font-weight: 400;
    padding-top: 58px;
  }
}
</style>
