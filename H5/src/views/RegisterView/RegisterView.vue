<template>
  <div class="wrapper register">
    <VHead />
    <h3 class="tit">{{ $t('Rletter.Createaccount') }}</h3>
    <van-tabs
      title-inactive-color="#BBB"
      :title-active-color="primaryColor"
      :lazy-render="true"
      v-model:active="activeName"
      background="transparent"
      line-width="28px"
      swipeable
      shrink
    >
      <van-tab :title="$t('Rletter.Registaccount')" name="username">
        <!-- 注册 -->
        <Register v-if="activeName === 'username'" />
      </van-tab>
      <van-tab :title="$t('Rletter.rlettertip42')" name="phone">
        <PhoneRegister v-if="activeName === 'phone'" />
      </van-tab>
    </van-tabs>
    <!-- 去注册 -->
    <div @click="goLogin" class="register">
      {{ $t('Rletter.rlettertip43') }}<span>{{ $t('Rletter.gologin') }}</span>
    </div>

  </div>
</template>

<script setup>
import VHead from '@/views/LoginView/components/VHead'
import Register from './components/Register.vue'
import PhoneRegister from './components/PhoneRegister.vue'
import { getCssVariableValue } from '@/utils'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const primaryColor = getCssVariableValue('--van-primary-color')
const activeName = ref('username')
const goLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
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
  // position: fixed;
  // width:100%;
  // left:0;
  // bottom :20px;
}
</style>
<style lang="scss">
.register {
  .van-tab {
    font-size: 17px;
    font-weight: 600;
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
