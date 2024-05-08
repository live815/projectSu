<template>
  <div class="head-view">
    <img v-if="!isLogin" class="logo" :src="logo" />
    <div class="right" :class="{ width: isLogin }">
      <div v-if="isLogin" style="width: 200px">
        <div style="display: flex">
          <p class="userName">{{ user.userInfo.userName }}</p>
          <p class="vip">VIP{{ user.userInfo.vipLevel }}</p>
        </div>
        <div class="number-box">
          <p class="balance">{{ user.balance || '0.00' }}</p>
          <Refresh class="refresh-icon" />
        </div>
      </div>
      <!-- <p class="" v-else @click="router.push('/login')">Bạn chưa đăng nhập</p> -->
      <div v-if="isLogin" style="white-space: nowrap">
        <button class="top-up" @click="router.push('/deposit')">Nạp Tiền</button>
        <button @click="router.push('/withdraw')">Rút Tiền</button>
      </div>
      <div v-else>
        <button class="top-up login" @click="router.push('/login')">Đăng Nhập</button>
        <button class="top-up resign" @click="router.push('/login')">Đăng Ký</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/cache'
import logo from './img/logo.png'

const isLogin = getToken()
const user = useUserStore()
const router = useRouter()

onMounted(async () => {
  // 一键回收
  await user.getCollectAction()
  // 拉取余额
  user.getBalanceAction()
})
</script>

<style lang="scss" scoped>
.head-view {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 15px;
  .logo {
    width: 90px;
    height: 25px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
    .userName {
      @include textToOmit(160px);
      font-weight: 600;
    }
    .vip {
      font-weight: 600;
    }
    .number-box {
      display: flex;
      align-items: center;
      margin-top: 5px;
      font-weight: 600;

      .balance {
        color: #ff9000;
      }
      .refresh-icon {
        fill: var(--22, #ff9000);
        width: 14px;
        height: 14px;
        margin: 0 5px;
      }
    }
    button {
      height: 28px;
      border-radius: 4px;
      background: transparent;
      border: 1px solid #ddd;
      color: #666;
      font-size: 13px;
      line-height: 28px;
    }
    .top-up {
      background: linear-gradient(90deg, #ff9000 25%, #ff5000 89.06%);
      border: none;
      margin: 0 4px;
      color: #fff;
    }
    .login {
      font-size: 12px;
    }
    .resign {
      border-radius: 4px;
      background: transparent;
      border: 1px solid #ddd;
      color: #666;
      font-size: 12px;
      line-height: 28px;
    }
  }
  .width {
    width: 100%;
  }
}
</style>
