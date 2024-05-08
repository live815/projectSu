<template>
  <div class="wrapper login">
    <VHead />
    <h3 class="tit" :class="{ veit: site == 'vietnam' }">{{ $t('Lletter.Llettertip11') }}</h3>
    <!-- 登录方式 -->
    <van-tabs
      title-inactive-color="#BBB"
      :title-active-color="primaryColor"
      v-model:active="activeName"
      background="transparent"
      line-width="28px"
      swipeable
      shrink
    >
      <van-tab :title="$t('Lletter.accountlogin')" name="username">
        <UsernameLogin v-if="activeName === 'username'" />
      </van-tab>
      <van-tab :title="$t('Lletter.title5')" name="phone">
        <PhoneLogin v-if="activeName === 'phone'" />
      </van-tab>
    </van-tabs>
    <!-- 去注册 -->
    <div @click="register" class="register">
      {{ $t('Lletter.Llettertip12') }}<span>{{ $t('Lletter.signupnow') }}</span>
    </div>

    <div class="bottom-wrapper">
      <Bottom />
    </div>
  </div>
</template>

<script setup>
import VHead from './components/VHead.vue'
import { ref } from 'vue'
import { getCssVariableValue } from '@/utils'
import UsernameLogin from './components/UsernameLogin.vue'
import PhoneLogin from './components/PhoneLogin.vue'
import Bottom from './components/Bottom'
import { useRouter } from 'vue-router'
const router = useRouter()
const primaryColor = getCssVariableValue('--van-primary-color')
const activeName = ref('username')

const register = () => {
  router.push('/register')
}

const site = import.meta.env.VITE_SITE
</script>

<style lang="scss" scoped>
.veit.tit {
  font-size: 23px !important;
}
.wrapper {
  padding: 10px 25px 0;
  // background: #fefdfc;
  background: url('@/assets/img/login-bg.png') center no-repeat;
  background-size: 100% 100%;
  min-height: var(--app-height);
  .tit {
    font-size: 25px;
    font-weight: 600;
    color: #111;
    margin-top: 14px;
    margin-bottom: 20px;
  }
  .register {
    text-align: center;
    margin-top: 17px;
    line-height: 22px;
    span {
      color: var(--color-primary);
    }
  }
}
.bottom-wrapper {
  margin-top: 50px;
}
</style>
<style lang="scss">
.login {
  .van-tab {
    font-size: 17px;
  }
  .van-tab__text {
    font-weight: 600;
  }
  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  .van-tab--shrink {
    padding: 0;
    margin-right: 25px;
  }
  .van-tabs__content--animated {
    padding-top: 40px;
  }
}
</style>
