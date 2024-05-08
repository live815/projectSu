<template>
  <div class="security-center-box">
    <template v-for="item in securityList" :key="item.id">
      <div class="security-center-box-list" @click="onClickSkip(item.id)">
        <div class="security-center-box-list-left">
          <div class="security-center-box-list-left-logo">
            <img :src="item.img" />
          </div>
          <div class="security-center-box-list-left-info">
            <div class="security-center-box-list-left-info-title">{{ item.title }}</div>

            <template v-if="item.id == 1">
              <div
                class="security-center-box-list-left-info-text"
                :class="{ activeText: !item.text }"
              >
                {{ item.text ? item.text : $t('Pletter.Plettertip4') }}
              </div>
            </template>
            <template v-if="item.id == 2">
              <div
                class="security-center-box-list-left-info-text"
                :class="{ activeText: !item.text }"
              >
                {{ item.text ? item.text : $t('Pletter.Plettertip5') }}
              </div>
            </template>
            <template v-if="item.id == 3">
              <div
                class="security-center-box-list-left-info-text"
                :class="{ activeText: !item.text }"
              >
                {{ $t('Pletter.Plettertip6') }}
              </div>
            </template>
            <template v-if="item.id == 4 || item.id == 5">
              <div class="security-center-box-list-left-info-text">
                {{ item.text }}
              </div>
            </template>
            <template v-if="item.id == 6">
              <div class="security-center-box-list-left-info-text">
                {{ item.text }}
              </div>
            </template>
          </div>
        </div>
        <div class="security-center-box-list-right">
          <template v-if="item.id == 1 || item.id == 2">
            <div v-if="item.text" class="title">{{ $t('Pletter.Plettertip7') }}</div>
            <img v-else class="img" :src="errorIcon" />
          </template>
          <template v-if="item.id == 3">
            <div v-if="item.text" class="title">
              {{ $t('Pletter.Plettertip8', { num: item.text }) }}
            </div>
            <img v-else class="img" :src="errorIcon" />
          </template>

          <div v-if="item.id === 4" class="title">{{ $t('Pletter.edit') }}</div>
          <div v-if="item.id === 5" class="title">{{ $t('Pletter.add') }}</div>
          <template
            v-if="
              (item.id == 1 && item.text == '') ||
              (item.id == 2 && item.text == '') ||
              item.id == 3 ||
              item.id == 4 ||
              item.id == 5
            "
          >
            <van-icon name="arrow" />
          </template>
          <template v-if="item.id === 6">
            <!-- 刷新按钮 -->
            <div class="code" @click="onClickRefresh">{{ $t('Pletter.refresh') }}</div>
          </template>
          <!-- <van-icon
          v-if="(item.id === 1 && item.text) || (item.id === 2 && item.text)"
          name="arrow"
        /> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import errorIcon from './img/errorIcon.png'
import { useUserStore } from '@/stores/user'
import { getUserRefreshIdentityCode } from '@/api/user.js'
import { showLoadingToast, closeToast } from 'vant'
import { maskPhoneNumber } from '@/utils'
import i18n from '@/i18n'
const store = useUserStore()
const user = useUserStore()
const router = useRouter()
//定时器
let fetchPriceTimer = null
onMounted(async () => {
  await store.getUserInfoAction()
  // 数据获取完成后，您可以访问user.userInfo.mobile
  if (user.userInfo) {
    securityList[0].text = maskPhoneNumber(user.userInfo.mobile)
    securityList[1].text = user.userInfo.email
    securityList[2].text = user.userInfo.bankCardCount + user.userInfo.cryptoCount
    securityList[5].text = user.userInfo.identityCode
  }
  startInterval()
})

const securityList = reactive([
  {
    id: 1,
    img: new URL('./img/secure_icon1.png', import.meta.url).href,
    title: i18n.global.t('Pletter.bindphonenum'),
    text: ''
  },
  {
    id: 2,
    img: new URL('./img/secure_icon2.png', import.meta.url).href,
    title: i18n.global.t('Mletter.bindemail'),
    text: ''
  },
  {
    id: 3,
    img: new URL('./img/secure_icon3.png', import.meta.url).href,
    title: i18n.global.t('Pletter.bindbankcard'),
    text: ''
  },
  {
    id: 4,
    img: new URL('./img/secure_icon4.png', import.meta.url).href,
    title: i18n.global.t('Pletter.editloginpassword'),
    text: i18n.global.t('Pletter.Plettertip9')
  },
  {
    id: 5,
    img: new URL('./img/secure_icon5.png', import.meta.url).href,
    title: i18n.global.t('Pletter.Plettertip10')
  },
  {
    id: 6,
    img: new URL('./img/secure_icon6.png', import.meta.url).href,
    title: i18n.global.t('Pletter.identityCode'),
    text: ''
  }
])
const onClickSkip = (id) => {
  switch (id) {
    case 1:
      if (user.userInfo.mobile) return
      return router.push('/cellIphone')
    case 2:
      if (user.userInfo.email) return
      return router.push('/mail')
    case 3:
      return router.push('/bankcard')
    case 4:
      return router.push('/passwordInfo')
    case 5:
      return router.push('/address')
  }
}

// 刷新识别码
const onClickRefresh = () => {
  showLoadingToast({
    message: i18n.global.t('common.loading'),
    forbidClick: true,
    duration: 0
  })
  getUserRefreshIdentityCode()
    .then(() => {
      closeToast()
      store.getUserInfoAction()
    })
    .catch(() => {
      closeToast()
    })
}
// 每十分钟请求一次识别码
function startInterval() {
  fetchPriceTimer = setInterval(() => {
    getUserRefreshIdentityCode()
      .then(() => {
        store.getUserInfoAction()
      })
      .catch(() => {})
  }, 600000)
}
// 清理定时器
onBeforeUnmount(() => {
  clearTimeout(fetchPriceTimer)
})
watch(
  () => user.userInfo.identityCode,
  (newVal, oldVal) => {
    securityList[5].text = newVal
  }
)
</script>
<style lang="scss" scoped>
.security-center-box {
  width: 100%;
  height: 514px;
  border-radius: 20px 20px 0px 0px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-evenly;
  .security-center-box-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 345px;
    height: 80px;
    border-radius: 10px;
    background: #fff;
    margin: 7.5px 0;
    .security-center-box-list-left {
      display: flex;
      margin-left: 15px;
      .security-center-box-list-left-logo {
        width: 44px;
        height: 44px;
        img {
          width: 44px;
          height: 44px;
        }
      }
      .security-center-box-list-left-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        font-size: 15px;
        .security-center-box-list-left-info-title {
          color: #111;
          font-size: 15px;
          margin-bottom: 2px;
        }
        .security-center-box-list-left-info-text {
          font-size: 12px;
          color: var(--999, #999);
        }
        .activeText {
          font-size: 12px;
          color: var(--1, #f53f3f);
        }
      }
      .security-center-box-list-left-info-code {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .security-center-box-list-right {
      display: flex;
      margin-right: 15px;
      align-items: center;
      .title {
        color: #ff5000;
        font-size: 12px;
        margin-right: 6px;
        white-space: nowrap;
      }
      .img {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
      .code {
        min-width: 70px;
        height: 34px;
        flex-shrink: 0;
        border-radius: 60px;
        border: 1px solid var(---2, #ff5000);
        color: #ff5000;
        font-size: 12px;
        text-align: center;
        line-height: 34px;
      }
    }
  }
  .security-center-box-list:first-child {
    margin-top: 20px;
  }
  .security-center-box-list:last-child {
    margin-bottom: 34px;
  }
}
</style>
