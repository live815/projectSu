<template>
  <div class="qrcode-box">
    <div class="title">
      <img class="arrow" :src="arrowLeft" />
      <span>{{ $t('Iletter.Invitationlink') }}</span>
      <img class="arrow" :src="arrowRight" />
    </div>
    <div class="url-box">
      <div id="url" class="url">{{ inviteLink }}</div>
      <van-button class="copy-but" data-clipboard-target="#url">{{
        $t('Iletter.copy')
      }}</van-button>
    </div>
    <template v-if="isCTYWebApp()">
      <div class="qrcode" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <vue-qr ref="qrCode" :text="inviteLink" :logoSrc="logoImg" />
      </div>
    </template>
    <template v-else>
      <div class="qrcode">
        <vue-qr ref="qrCode" :text="inviteLink" :logoSrc="logoImg" />
      </div>
    </template>
    <span class="text">{{ $t('Iletter.Ilettile16') }}</span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import logoImg from './img/logo.png'
import Clipboard from 'clipboard'
import arrowLeft from '../../img/arrow-left.png'
import arrowRight from '../../img/arrow-right.png'
import { generateReferralCode } from '@/api/user'
import { ERR_OK } from '@/utils/config'
import { AppH5InteractionMethod, isCTYWebApp } from '@/utils'
import { getToken } from '@/utils/cache'
import { useMobileEvent } from '@/hooks/useMobileEvent'
import { showToast } from 'vant'
import i18n from '@/i18n'

const { token } = useMobileEvent()
// const props = defineProps(['inviteLinkUrl'])
const clipboard = new Clipboard('.copy-but')
const inviteLink = ref('')
const pressTimer = ref(null)
const qrCode = ref(null)
const isLogin = getToken()

clipboard.on('success', (e) => {
  showToast(i18n.global.t('common.copySuccess'))
  e.clearSelection()
})
clipboard.on('error', () => {})

const getInviteLink = () => {
  if (isLogin || token) {
    generateReferralCode().then((res = []) => {
      if (res?.['code'] === ERR_OK) {
        // inviteLink.value = `${n}?referCode=${res?.['data']}`
        inviteLink.value =
          res?.['data']?.['domainName'] + '/?referCode=' + res?.['data']?.['referCode']
      }
    })
  }
}

// watch(
//   () => props.inviteLinkUrl,
//   (newVal) => {
//     !!newVal && getInviteLink(newVal)
//   },
//   { immediate: true }
// )

const handleLongPress = () => {
  if (isCTYWebApp()) AppH5InteractionMethod('downloadQrCode', qrCode.value.imgUrl)
}

const startTimer = () => {
  // 清除之前的定时器（如果有）
  clearTimeout(pressTimer.value)
  // 设置新的定时器
  pressTimer.value = setTimeout(handleLongPress, 1000) // 长按1秒触发
}

const clearTimer = () => {
  clearTimeout(pressTimer.value)
}

const handleTouchStart = () => {
  startTimer()
}
const handleTouchEnd = () => {
  clearTimer(inviteLink.value)
}
onMounted(() => {
  getInviteLink()
})
onUnmounted(() => {
  clearTimer()
})
</script>

<style lang="scss" scoped>
.qrcode-box {
  .title {
    @include center-content();
    margin-top: 15px;
    span {
      margin: 0 10px 0 10px;
      color: #111;
      font-size: 16px;
      font-weight: 600;
    }
    .arrow {
      width: 102px;
      height: 15px;
    }
  }
  padding: 15px;
  margin-top: 30px;
  width: 345px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 6px 0 rgba(172, 139, 96, 0.2);
  text-align: center;
  color: #666;
  font-weight: 400;

  .url-box {
    @include center-content();
    margin-top: 25px;
    .url {
      width: 236px;
      height: 44px;
      border-radius: 4px 0 0 4px;
      background: #fff9f1;
      text-align: left;
      font-size: 12px;
      padding-left: 12px;
      padding-top: 10px;
      padding-bottom: 5px;
    }
    .copy-but {
      width: 79px;
      height: 44px;
      color: #fff;
      font-size: 16px;
      border-radius: 0 4px 4px 0;
      background: linear-gradient(180deg, #ff9000 0%, #ff5000 100%);
      border: none;
    }
  }
  .qrcode {
    @include center-content();
  }
  .text {
    color: #666;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
