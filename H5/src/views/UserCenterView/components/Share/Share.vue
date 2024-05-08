<template>
  <div class="invit-box flex" @click="handleLinkDetails">
    <div class="invit-left">
      <img src="./img/avavt.png" />
      <div class="invit-txt">
        <div class="txt-one">{{ $t('UsercenterView.invitefriends') }}</div>
        <div class="txt-two">{{ $t('UsercenterView.tip5') }}</div>
      </div>
    </div>
    <div class="pick">{{ $t('UsercenterView.share') }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { queryInviteDepConfig } from '@/api/user'
import { ERR_OK } from '@/utils/config'
import i18n from '@/i18n'
import { showToast } from 'vant'
import { getToken } from '@/utils/cache'

const activityStatus = ref()
const router = useRouter()
const route = useRoute()
let isLogin = getToken()

const getInviteDepConfig = () => {
  queryInviteDepConfig().then((res) => {
    if (res?.['code'] === ERR_OK) {
      activityStatus.value = res?.['data']?.['status']
    }
  })
}

const handleLinkDetails = () => {
  if (!isLogin) {
    return router.push(`/login?redirect=${route?.fullPath}`)
  } else {
    activityStatus.value * 1 === 0
      ? router.push('/invite')
      : showToast(i18n.global.t('friends.inviteAlert'))
  }
}

onMounted(() => {
  getInviteDepConfig()
})
</script>

<style lang="scss" scoped>
.invit-box {
  height: 66px;
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  .invit-left {
    display: flex;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
    }
    .invit-txt {
      margin-left: 10px;
      .txt-one {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .txt-two {
        font-size: 12px;
        color: --color-text;
      }
    }
  }
  .pick {
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    min-width: 50px;
    height: 28px;
    border-radius: 6px;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
    padding: 0 5px;
  }
}
</style>
