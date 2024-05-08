<template>
  <div class="invite-conten">
    <NavBar :title="$t('Iletter.InviteFriend')" v-if="!token" />
    <div class="back-img" :style="{ backgroundImage: `url(${imgHandler})` }">
      <div class="conten">
        <!-- 跑马灯 -->
        <Marquee :iconPath="trumpet" />
        <!-- 我的奖励 -->
        <Award :vipConfig="vipConfig" @getInviteInfo="getInviteInfo" />
        <!-- 邀请链接 -->
        <InviteLink />
        <!-- 活动-表格 -->
        <Activity />
        <div class="footer">
          <van-button class="left-button" @click="handleDetailsClick">{{
            $t('Iletter.InvitatDetails')
          }}</van-button>
          <van-button class="right-button" @click="handleLink">{{
            $t('Iletter.WelfareCenter')
          }}</van-button>
        </div>
      </div>
      <img :src="imgHandler2" class="detailsBtn" @click="dialog.showPopup()" />
    </div>
    <Dialog
      ref="dialog"
      class="dialog"
      :title="$t('Iletter.EventDetails')"
      :butText="$t('Iletter.Sure')"
      height="400"
      width="315"
    >
      <template v-slot:content>
        <span v-html="dialogContent"></span>
      </template>
    </Dialog>
    <Details ref="details" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Marquee from '@/components/Marquee/Marquee'
import Award from './components/Award/Award'
import InviteLink from './components/InviteLink/InviteLink'
import Activity from './components/Activity/Activity'
import Dialog from '@/components/Dialog/Dialog'
import Details from './components/Details/Details'
import trumpet from './img/trumpet.png'
import { queryInviteInfo } from '@/api/user'
import i18n from '@/i18n'
import { useAppStore } from '@/stores/app'
import { ERR_OK } from '@/utils/config'
import { getToken } from '@/utils/cache'
import { useMobileEvent } from '@/hooks/useMobileEvent'

const { token } = useMobileEvent()
const router = useRouter()
const appStore = useAppStore()
const dialogContent = i18n.global.t('Iletter.dialogContent')
const isLogin = getToken()
const dialog = ref(null)
const details = ref(null)
const vipConfig = ref('')
// const inviteLinkUrl = ref('')

const handleDetailsClick = () => {
  details.value.showPopup()
}

const imgHandler = computed(() => {
  return new URL(`./img/${appStore.language}/invite-bg.png`, import.meta.url).href
})

const imgHandler2 = computed(() => {
  return new URL(`./img/${appStore.language}/details.png`, import.meta.url).href
})

const getInviteInfo = () => {
  if (isLogin || token) {
    console.log('token', token)
    queryInviteInfo().then((res) => {
      if (res?.['code'] === ERR_OK) {
        vipConfig.value = res?.data || {}
        // inviteLinkUrl.value = res?.data?.['domainName'] || ''
      }
    })
  }
}

const handleLink = () => {
  console.log('token', token)
  router.push({ path: '/welfare', query: { token } })
}

onMounted(() => {
  getInviteInfo()
})
</script>

<style lang="scss" scoped>
.invite-conten {
  overflow-x: hidden;
  .back-img {
    width: 375px;
    height: 451px;
    background-size: cover;
    background-repeat: no-repeat;
    .conten {
      @include mobile-padding();
      padding-top: 20px;
      position: absolute;
      top: 460px;
      width: 375px;
      border-radius: 20px 20px 0 0;
      background: rgba(255, 252, 238, 0.6);
      box-shadow: 0 4px 6px 3px rgba(255, 253, 245, 0.55) inset, 0 1px 0 0 #fffdf4 inset;
      backdrop-filter: blur(25px);
      .footer {
        @include center-content(space-between, center);
        //position: fixed;
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.1);
        .left-button {
          //position: fixed;
          width: 160px;
          height: 44px;
          border-radius: 6px;
          border: 0.5px solid #ff5000;
          background: #fff;
          color: #ff5000;
          font-size: 15px;
          font-weight: 600;
        }
        .right-button {
          //position: fixed;
          right: 20px;
          width: 160px;
          height: 44px;
          border-radius: 6px;
          background: linear-gradient(90deg, #ff9000 0%, #ff5000 100%);
          color: #fff;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
          border: none;
        }
      }
    }
    .detailsBtn {
      position: absolute;
      right: 15px;
      top: 380px;
      width: 44px;
      height: 44px;
    }
  }
}
</style>
