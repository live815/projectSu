<template>
  <div class="user-header-view">
    <div class="top">
      <div class="left">
        <template v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]">
          <img
            class="avatar"
            :src="avatarList[user.userInfo.avatar].img"
            @click="onClickPersonalDetails"
          />
        </template>
        <template v-else>
          <img class="avatar" :src="avatarList[0].img" @click="onClickPersonalDetails" />
        </template>
        <div v-if="isLogin">
          <p class="user-name">{{ user.userInfo.userName }}</p>
          <div class="balance-box">
            <p class="balance">{{ user.balance || '0.00' }}</p>
            <Refresh class="refresh-icon" />
          </div>
        </div>
        <p v-else @click="router.push('login')">Đăng nhập/ Đăng ký</p>
      </div>
      <div class="right">
        <van-badge
          :content="unreadNum"
          :offset="[-2, 5]"
          :show-zero="false"
          @click="router.push('message')"
        >
          <img src="./img/mes.png" />
          <p>Tin Nhắn</p>
        </van-badge>
        <div class="set" @click="router.push('service')">
          <img src="./img/cust.png" />
          <p>CSKH</p>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <button class="btn withdraw" @click="router.push('/withdraw')">Rút tiền</button>
      <button class="btn top-up" @click="router.push('/deposit')">Nạp tiền</button>
    </div>
    <div class="banner">
      <p class="text">Mời bạn bè</p>
      <button class="btn" @click="router.push('/invite')">Mời ngay</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { avatarList } from '@/utils/config.js'
import { useRouter } from 'vue-router'
import { getToken } from '@/utils/cache'
import { useAnnouncementStore } from '@/stores/announcement'

const isLogin = getToken()
const router = useRouter()
const user = useUserStore()
user.getBalanceAction()
const announcement = useAnnouncementStore()
const unreadNum = computed(() => announcement.totalUnread)
const onClickPersonalDetails = () => {
  if (user.isLogin) {
    router.push('/personalDetails')
  }
}
</script>

<style lang="scss" scoped>
.user-header-view {
  position: relative;
  padding: 20px 15px 0 15px;
  width: 100%;
  height: 215px;
  background: #fafafa url('./img/bg.jpg') center top no-repeat;
  background-size: cover;
  .top {
    display: flex;
    justify-content: space-between;
    color: #fff;
    .left {
      display: flex;
      align-items: center;

      font-size: 16px;
      font-weight: 600;
      img {
        width: 44px;
        height: 44px;
        border-radius: 44px;
        border: 1px solid #fff;
        margin-right: 10px;
      }
      .user-name {
        margin-bottom: 10px;
        font-weight: 600;
      }
      .balance-box {
        display: flex;
        .balance {
          font-weight: 700;
        }
        .refresh-icon {
          fill: #FFFFFF;
          width: 16px;
          height: 16px;
          margin-left: 6px;
        }
      }
    }
    .right {
      display: flex;

      font-size: 12px;
      text-align: center;
      img {
        width: 26px;
        height: 26px;
        margin-bottom: 5px;
      }
      .set {
        margin-left: 12px;
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    .btn {
      width: 150px;
      height: 44px;

      color: #fff;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      border: none;
    }
    .withdraw {
      border: 1px solid rgba(255, 255, 255, 0.8);
      background: transparent;
      margin-right: 15px;
    }
    .top-up {
      background: #ffa228;
    }
  }
  .banner {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 345px;
    height: 52px;
    background-image: url('./img/banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    .text {
      color: #edd9b0;

      font-size: 16px;
      margin-left: 75px;
    }
    .btn {
      width: 130px;
      height: 32px;
      border-radius: 90px;
      background: linear-gradient(90deg, #ecddc3 2.24%, #e4bf87 98.13%);
      color: #1f1f1f;

      line-height: 32px;
      text-align: center;
      border: none;
      margin-right: 15px;
    }
  }
}
</style>