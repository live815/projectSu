<template>
  <div
    class="header"
    :class="{ fullwidth: collapse }"
    :style="{
      left: `${liveStore.indentWidth}px`,
      width: 'calc(100% - ' + liveStore.indentWidth + 'px)'
    }"
  >
    <img class="fold" :src="isShow ? foldLeft : foldRight" @click="ExCol" />
    <div :class="collapse ? 'fill' : 'fixed-box'">
      <div class="fill-left">
        <img class="harden" :src="logo" />
        <!-- <p>
          {{ $t('Components.CsportsAmbassador') }} <br />
          {{ $t('Components.Name') }}
        </p> -->
      </div>
      <div class="fill-info">
        <img class="fill-info-img" src="./img/trumpet.png" />
        <div class="fill-info-marquee">
          <Marquee :style="{ width: screenWidth + 'px' }" @click="toPopup">
            <span v-html="annTextData"></span>
          </Marquee>
        </div>
      </div>
      <div class="fill-right">
        <!-- 未登录 -->
        <div class="login-box" v-if="!isLogin">
          <button class="login" @click.stop="login">{{ $t('Components.Login') }}</button>
          <button class="register isActive" @click.stop="register">
            {{ $t('Components.Register') }}
          </button>
        </div>
        <!-- 已登录 -->
        <div class="logined-box" v-else>
          <button
            class="chrage isActive"
            @click="handleShowCharge"
            v-if="user.userInfo.role !== 1 && user.userInfo.role !== 2"
          >
            {{ $t('Components.Deposittwo', { num: '|' }) }}
          </button>
          <div class="account-info">
            <div class="account-name name" @click="router.push('/personal/3')">
              <template v-if="user.userInfo.role !== 1 && user.userInfo.role !== 2">
                <img
                  style="width: 30px; height: 30px"
                  v-if="imgList[user.userInfo.vipLevel]"
                  :src="imgList[user.userInfo.vipLevel]"
                />
              </template>
              <span>{{ user.userInfo.userName }}</span>
            </div>
            <div class="account-name" v-if="user.userInfo.role === 1">
              {{ user.userInfo.nickName }}
            </div>
            <Balance
              style="margin-top: 5px"
              v-if="user.userInfo.role !== 1 && user.userInfo.role !== 2"
            />
          </div>
          <div
            class="account-icon"
            @click="onClickActivePopup"
            @mouseenter="showSelector = true"
            @mouseleave="showSelector = false"
          >
            <template v-if="user.userInfo.role !== 1">
              <img
                class="imgAvatar"
                v-if="user.userInfo?.avatar && avatarList[user.userInfo.avatar]"
                :src="avatarList[user.userInfo.avatar].img"
              />
              <img class="imgAvatar" v-else :src="avatarList[0].img" />
            </template>
            <template v-else>
              <img
                class="imgAvatar"
                v-if="user.userInfo.avatar"
                :src="getImgUrl(user.userInfo.avatar)"
              />
            </template>
            <div class="hover-selector-containner" v-show="showSelector" @click.stop>
              <div class="selector">
                <HeaderSelector v-if="showSelector"></HeaderSelector>
              </div>
            </div>
          </div>
          <!-- 站内信 -->
          <el-badge
            style="margin-left: 15px"
            v-if="isLogin && user.userInfo.role == 0"
            @click="toLetter"
            :hidden="!announcement.totalUnread"
            :value="announcement.totalUnread"
          >
            <img class="letter" src="./img/letter.png" />
          </el-badge>
        </div>
        <!-- 语言切换 -->
        <div style="margin-left: 15px" v-if="IS_DEV && isLogin">
          <LanguageSelector />
        </div>
      </div>
    </div>
  </div>
  <CustomizeDialog
    :dialogShow="dialogShow"
    @closeBtn="closeBtn"
    :title="announcement.normalAnn[0]?.title"
    v-if="dialogShow"
    :width="454"
  >
    <div class="editor">
      <div class="ql-container">
        <div class="ql-editor">
          <div class="content" v-html="announcement.normalAnn[0].content"></div>
        </div>
      </div>
    </div>
    <div class="btnDiv">
      <div class="btn" @click="cancelBtn">{{ $t('HomeView.CloseTxt') }}</div>
      <div class="btn recharge" @click="goNotice">{{ $t('HomeView.CalNotice') }}</div>
    </div>
  </CustomizeDialog>
</template>

<script setup>
import i18n from '@/i18n'
import Balance from '@/components/Balance'
import { useUserStore } from '@/stores/user.js'
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.vue'
import HeaderSelector from './components/HeaderSelector.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useRouter } from 'vue-router'
import { useLiveStore } from '@/stores/liveBroadcast'
import { getImgUrl } from '@/utils/cache'
import { avatarList, IS_DEV } from '@/utils/config'
import CustomizeDialog from '@/components/CustomizeDialog/CustomizeDialog.vue'
const announcement = useAnnouncementStore()
import { useAppStore } from '@/stores/app'
import { watch } from 'vue'
const appStore = useAppStore()

const router = useRouter()
const user = useUserStore()

const liveStore = useLiveStore()

const dialogShow = ref(false)
const foldLeft = new URL('./img/fold.png', import.meta.url).href
const foldRight = new URL('./img/foldRight.png', import.meta.url).href
const imgList = reactive([
  new URL('./img/vip0.png', import.meta.url).href,
  new URL('./img/vip1.png', import.meta.url).href,
  new URL('./img/vip2.png', import.meta.url).href,
  new URL('./img/vip3.png', import.meta.url).href,
  new URL('./img/vip4.png', import.meta.url).href,
  new URL('./img/vip5.png', import.meta.url).href,
  new URL('./img/vip6.png', import.meta.url).href,
  new URL('./img/vip7.png', import.meta.url).href,
  new URL('./img/vip8.png', import.meta.url).href,
  new URL('./img/vip9.png', import.meta.url).href,
  new URL('./img/vip10.png', import.meta.url).href,
  new URL('./img/vip11.png', import.meta.url).href
])
const isShow = ref(true)
// 公告内容
const annTextData = computed(() => {
  if (announcement.normalAnn) return announcement.normalAnn[0]?.content.replace(/<[^>]*>/g, '')
})
const logo = computed(() => {
  return new URL(`./img/${appStore.language}/harden.png`, import.meta.url).href
})
const showSelector = ref(false)
const collapse = ref(false)
const isLogin = computed(() => {
  return user.isLogin
})
const toPopup = () => {
  if (user.userInfo?.role === 0) {
    dialogShow.value = true
  }
}
const closeBtn = (type) => {
  dialogShow.value = type
}
const cancelBtn = () => {
  dialogShow.value = false
}
const goNotice = () => {
  dialogShow.value = false
  router.push(`/personal/7`)
}
const ExCol = () => {
  isShow.value = !isShow.value
  if (isShow.value) {
    liveStore.indentWidth = 200
  } else {
    liveStore.indentWidth = 60
  }
  collapse.value = !collapse.value
  eventBus.emit('expandCollapseMenu')
}

const screenWidth = ref(500)

const handleResize = () => {
  screenWidth.value = window.innerWidth
  if (isLogin.value) {
    if (screenWidth.value > 1660) {
      screenWidth.value = 650
    } else if (screenWidth.value > 1540) {
      screenWidth.value = 520
    } else if (screenWidth.value > 1500) {
      screenWidth.value = 500
    } else if (screenWidth.value > 1440) {
      screenWidth.value = 400
    } else if (screenWidth.value > 1380) {
      screenWidth.value = 390
    } else if (screenWidth.value > 1330) {
      screenWidth.value = 350
    } else {
      screenWidth.value = 250
    }
  } else {
    // 这里可以根据你的需求设置具体的宽度
    if (screenWidth.value > 1600) {
      screenWidth.value = 750
    } else if (screenWidth.value > 1500) {
      screenWidth.value = 700
    } else if (screenWidth.value > 1440) {
      screenWidth.value = 550
    } else {
      screenWidth.value = 400
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
// 充值按钮
function handleShowCharge() {
  if (!user.userInfo.userName) {
    ElMessage(i18n.global.t('DepositWithdraw.NoticeTips_10'))
  } else {
    const params = {
      isOpen: true,
      current: 1
    }
    eventBus.emit('showCharge', params)
    // 是否绑定手机号或者银行卡
    // if (!user.userInfo.mobile || !user.userInfo.bankCardCount) {
    //   eventBus.emit('isShowMobile')
    // } else {
    //   const params = {
    //     isOpen: true
    //   }
    //   eventBus.emit('showCharge', params)
    // }
  }
}
function login() {
  user.setLoginDialogAction({
    isShowLoginDialog: true,
    currentPage: 'login'
  })
}
function register() {
  user.setLoginDialogAction({
    isShowLoginDialog: true,
    currentPage: 'register'
  })
}
// 跳转至站内信
const toLetter = () => {
  router.push('/personal/7')
}

// 打开头像弹窗
const onClickActivePopup = () => {
  if (user.userInfo.role !== 1) {
    eventBus.emit('isActiveShow')
  }
}
watch(isLogin, (newValue, oldValue) => {
  if (newValue) {
    // 登录后重新拉去尺寸
    handleResize()
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: 80px;
  // width: 100%;
  left: 200px;
  z-index: 999;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: radial-gradient(
      63.94% 63.94% at 50% 0%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(6px);
  transition: transform 0.5s ease;
  .fold {
    width: 28px;
    height: 36px;
    position: absolute;
    left: -14px;
    top: 25px;
    z-index: 9999;
    cursor: pointer;
  }
  .fill {
    width: 100%;
    display: flex;
    position: fixed;
    transition: Width 0.3s ease 0s;
  }

  .fixed-box {
    width: 100%;
    display: flex;
    position: fixed;
    transform: translateX(0px);
    transition: transform 0.5s ease;
  }
  .fill-left {
    width: 200px;
    height: 80px;
    .harden {
      width: auto;
      height: 80px;
      margin-left: 20px;
    }
    p {
      padding-bottom: 4px;
      color: var(--100, #fff);
      font-size: 10px;
      line-height: 12px;
      font-weight: 400;
      white-space: nowrap;
    }
  }
  .fill-info {
    display: flex;
    height: 80px;
    margin-left: 80px;
    align-items: center;
    .fill-info-img {
      width: 20px;
      height: 20px;
    }
    .fill-info-marquee {
      // width: 800px;
      color: #fff;
      cursor: pointer;
      padding-left: 10px;
    }
  }
  .fill-right {
    display: flex;
    align-items: center;
    margin-left: 90px;
    max-width: 350px;
    .login-box,
    .logined-box {
      display: flex;
      align-items: center;

      button {
        width: 100px;
        height: 40px;
        border-radius: 60px;

        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
      }

      .login {
        border: 1px solid var(--unnamed, #f35f1b);
        background-color: transparent;
        color: var(--unnamed, #f35f1b);
        margin-right: 18px;
      }

      .register {
        border: none;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: #fff;
      }
      .account-info {
        margin-left: 15px;
      }
    }
    .logined-box {
      .chrage {
        border: none;
        background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
        color: #fff;
        // width: 120px;
        display: flex;
        margin-right: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .account-name {
        color: var(--100, #fff);

        font-size: 14px;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin: 0 0 6px 0;
        span {
          color: var(--100, #fff);
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 6px;
        }
      }
      .name {
        cursor: pointer;
      }

      .acount-load {
        color: var(--100, #fff);
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
        }

        span {
          margin-right: 6px;
        }
      }

      .account-icon {
        position: relative;
        height: 50px;
        width: 50px;
        margin-left: 20px;
        border-radius: 50px;
        cursor: pointer;

        .hover-selector-containner {
          position: absolute;
          left: -80px;
          top: 50px;
          width: 220px;
          max-height: 596px;
          border-radius: 10px;
          cursor: default;

          .selector {
            margin-top: 10px;
            width: 220px;
            max-height: 586px;
            border-radius: 10px;
            background: #232949;
            padding-bottom: 10px;
          }
        }
      }
    }
    .letter {
      width: 28px;
      height: 30px;
      cursor: pointer;
    }
  }
}

.isActive {
  animation: shockwaveJump 1s ease-out infinite;
}

.isActive:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 16px;
  animation: shockwave 1s 0.65s ease-out infinite;
}

.isActive:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 16px;
  animation: shockwave 1s 0.5s ease-out infinite;
}

.imgAvatar {
  width: 46px;
  height: 46px;
  border: 1px solid #fff;
  border-radius: 50%;
}
.cont {
  color: rgba(255, 255, 255, 0.8);

  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
}

.btnDiv {
  display: flex;
  column-gap: 12px;
  margin-top: 20px;
  justify-content: end;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 32px;
  border-radius: 4px;
  background: var(--unnamed, #171a2f);
  box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
  color: var(--60, rgba(255, 255, 255, 0.6));

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 0 6px;
  cursor: pointer;
}
.recharge {
  min-width: 60px;
  height: 32px;
  color: var(--color-white, #fff);
  box-shadow: none;
  background: var(--unnamed, linear-gradient(90deg, #ff9000 25%, #f35f1b 89.06%));
}

@keyframes shockwaveJump {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.08);
  }

  50% {
    transform: scale(0.98);
  }

  55% {
    transform: scale(1.02);
  }

  60% {
    transform: scale(0.98);
  }

  to {
    transform: scale(1);
  }
}

@keyframes shockwave {
  0% {
    transform: scale(1);
    box-shadow: 0 0 2px #faca46a6, inset 0 0 1px #faca46f2;
  }

  95% {
    box-shadow: 0 0 16px #faca4626, inset 0 0 16px #faca4626;
  }

  to {
    transform: scale(1.3);
  }
}
:deep() {
  p {
    color: var(--100, #fff);
  }
}
</style>
