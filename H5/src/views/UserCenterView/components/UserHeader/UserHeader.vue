<template>
  <div class="header-wrapper">
    <div class="header" :class="{ 'has-bg': !isTop }">
      <div class="left">
        <div class="avatar" @click="onClickPersonalDetails">
          <template v-if="user.userInfo.avatar && avatarList[user.userInfo.avatar]">
            <img :src="avatarList[user.userInfo.avatar].img" />
          </template>
          <template v-else>
            <img :src="avatarList[0].img" />
          </template>
        </div>
        <!--  -->
        <div class="info" v-if="user.isLogin">
          <div class="info-box">
            <div class="info-name">{{ user.userInfo.userName }}</div>
            <div class="more-btn">
              <IcoArrowRight class="svg-icon" />
            </div>
          </div>
          <div class="info-text">
            <div v-html="$t('UsercenterView.tip6', { num: user.userInfo.regDay })"></div>
          </div>
        </div>
        <div @click.stop="router.push(`/login?redirect=${route.fullPath}`)" class="login" v-else>
          {{ $t('UsercenterView.tip7') }}
        </div>
      </div>
      <div class="right">
        <div @click="onClick">
          <van-image :src="headerUrl" width="30"></van-image>
        </div>
        <van-badge :content="unreadNum" :offset="[-2, 5]" :show-zero="false">
          <div @click="toMessage" class="msg-box">
            <van-image :src="headmsg" width="30"></van-image>
          </div>
        </van-badge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import headerUrl from '@/assets/img/icon-service.png'
import headmsg from '@/assets/img/letter.png'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { avatarList } from '@/utils/config.js'
import { useFBStore } from '@/stores/fb';
const fbStore = useFBStore()

const announcement = useAnnouncementStore()
const user = useUserStore()
const router = useRouter()
const route = useRoute()
const unreadNum = computed(() => announcement.totalUnread)
const isTop = ref(true)
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
function handleScroll(e) {
  if (getIsTop(e.target)) {
    isTop.value = true
  } else {
    isTop.value = false
  }
}

function getIsTop() {
  return window.scrollY === 0 || document.documentElement.scrollTop === 0
}
const toMessage = () => {
  router.push({ name: 'message' })
}

const onClickPersonalDetails = () => {
  if (user.isLogin) {
    router.push('/personalDetails')
  }
}

function onClick(){
  router.push('/service')
  fbStore.tabId = 0
  fbStore.serviceId = 0
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 60px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 15px;
  &.has-bg {
    background: rgba(255, 255, 255, 0.8);
  }
  .left {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      border-radius: 50px;
      border: 1px solid #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      .info-box {
        display: flex;
        margin-bottom: 6px;
        .info-name {
          font-weight: 600;
          font-size: 15px;

          margin-right: 9px;
        }
        .more-btn {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 14px;
          background-color: var(--color-yellow);
          color: var(--color-background);
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          .svg-icon {
            fill: #fff;
            width: 8px;
            height: 8px;
          }
        }
      }
      .info-text {
        color: #666;
        font-size: 13px;
      }
    }
    .login {
      font-weight: 600;
      font-size: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .msg-box {
      margin-left: 15px;
    }
  }
}
.primary {
  color: var(--color-primary);
}
</style>
