<template>
  <div class="user-center-simple">
    <div class="info login" v-if="user.isLogin">
      <div class="user">
        <span class="username">{{ user.userInfo.userName }}</span>
        <van-tag color="#E0EBF0" round type="primary">VIP{{ user.userInfo.vipLevel }}</van-tag>
      </div>
      <h3 class="amount">
        <Balance />
      </h3>
    </div>
    <div v-else class="info logout" @click="login">
      <p class="no-login">{{ $t('common.notYetLogin') }}</p>
      <p class="login-register">{{ $t('UsercenterView.tip2') }}</p>
    </div>

    <div class="fast-way">
      <div @click="goRouter(item)" class="item" v-for="item in fastWayList" :key="item.title">
        <p>
          <img :src="item.imgSrc" alt="" />
        </p>
        <p>
          <span class="title">{{ item.title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import i18n from '@/i18n'
const router = useRouter()
const route = useRoute()
const user = useUserStore()
// 快捷通道
const fastWayList = [
  {
    title: i18n.global.t('common.deposit'),
    path: '/deposit',
    imgSrc: new URL('./img/cunkuan.png', import.meta.url).href
  },
  {
    title: i18n.global.t('common.withdrawl'),
    path: '/withdraw',
    imgSrc: new URL('./img/tikuan.png', import.meta.url).href
  },
  {
    title: 'VIP',
    path: '/vip',
    imgSrc: new URL('./img/VIP.png', import.meta.url).href
  }
]
const login = () => {
  router.push(`/login?redirect=${route.fullPath}`)
}

const goRouter = (val) => {
  router.push(val.path)
}
</script>

<style lang="scss" scoped>
.user-center-simple {
  margin-top: 4px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .logout {
    line-height: 1.5;
    .no-login {
      color: var(--color-text);
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }
    .login-register {
      color: var(--color-text-dark);
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px;
      margin-top: 6px;
    }
  }
  .login {
    span.username {
      margin-right: 10px;
      font-size: 14px;
      color: var(--color-text);
    }
    .van-tag {
      font-style: italic;
      font-weight: 600;
      color: var(--color-text-dark);
    }
    .amount {
      margin-top: 5px;
      font-weight: 600;
      color: var(--color-text-dark);
      font-size: 20px;
    }
  }
  .fast-way {
    display: flex;
    .item {
      margin-right: 10px;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }
      .title {
        color: #666;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
    }
    img {
      width: calc(75px / 62 * 28);
      height: 28px;
    }
  }
}
</style>
